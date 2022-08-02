import { useSession, signIn, signOut, getSession } from 'next-auth/react';
import React, { useEffect, useCallback } from 'react';
import { GetServerSidePropsContext } from 'next';

const Component = () => {
    const { data: session } = useSession();
    const addUser = useCallback(async () => {
        if (session) {
            await fetch('http://localhost:1234/api/users/add', {
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

    useEffect(() => {
        addUser();
    }, [addUser]);

    return (
        <>
            {

                session
                    ? (
                        <>
                            <nav>
                                <a href="/">Home</a>
                                <a href="/vote">Vote</a>
                                <a href="/about">About</a>
                                <a href="/candidates">Candidates</a>
                            </nav>
                            <div id="text1">
                                <div id="profileimg">
                                    <img src={session.user.image} referrerPolicy="no-referrer" alt="userprofile" />
                                </div>
                                <h1>
                                    Signed in as
                                    {' '}
                                    {session.user.email}
                                </h1>
                            </div>
                            <div id="signedinas">
                                <button type="submit" onClick={() => signOut()}>Sign out</button>
                            </div>
                        </>
                    )
                    : (
                        <>
                            <nav>
                                <a href="/">Login as a Student</a>
                                <a href="/adminlogin">Login as a Admin</a>
                            </nav>
                            <div id="login">
                                <p> Not signed in </p>
                            </div>
                            <div id="loginbutton">
                                <button type="submit" onClick={() => signIn()}>Sign in</button>
                            </div>
                        </>
                    )

            }
        </>
    );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    const session = await getSession(ctx);
    return ({ props: { session } });
}

export default Component;
