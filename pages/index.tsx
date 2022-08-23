// Import things
import { useSession, signIn, signOut, getSession } from 'next-auth/react';
import React, { useEffect, useCallback } from 'react';
import { GetServerSidePropsContext } from 'next';

const Component = () => {
    // session data to check if logged in
    const { data: session } = useSession();
    // function to send data to the api to make them have a division id
    const addUser = useCallback(async () => {
        if (session) {
            await fetch('https://backendstudentcouncil.herokuapp.com/api/users/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: session.user.name,
                    email: session.user.email,
                }),
            });
        }
    }, [session]);
    // makes function runs on refresh
    useEffect(() => {
        addUser();
    }, [addUser]);
    //  return the html of the page
    return (
        <>
            {
                // checks if the user is logged in
                session
                    ? (
                        <>
                            <div id="bg-image" />
                            <div className="card-overlay">
                                <nav>
                                    <a href="/" id="selectednav">Home</a>
                                    <a href="/vote">Vote</a>
                                    <a href="/about">About</a>
                                    <a href="/candidates">Candidates</a>
                                    <a href="/"><img src={session.user.image} referrerPolicy="no-referrer" className="img-fluid" alt="userprofile" /></a>
                                </nav>
                                <div id="container">
                                    <div id="text1">
                                        <h1>
                                            You are Signed in as
                                            <br />
                                        </h1>
                                        <p>{session.user.email}</p>
                                    </div>
                                    <div id="signedinas">
                                        <button type="submit" onClick={() => signOut()}>Sign out</button>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                    // checks if user is not logged in
                    : (
                        <>
                            <div id="bg-image" />

                            <div className="card-overlay">
                                <nav>
                                    <a id="selectednav" href="/">Login as a Student</a>
                                    <a href="/adminlogin">Login as a Admin</a>
                                </nav>
                                <div id="login">
                                    <p> Not signed in </p>
                                </div>
                                <div id="loginbutton">
                                    <button type="submit" onClick={() => signIn()}>Sign in as Student</button>
                                </div>
                            </div>
                        </>
                    )

            }
        </>
    );
};
// get session from server side props
export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    const session = await getSession(ctx);
    return ({ props: { session } });
}

export default Component;
