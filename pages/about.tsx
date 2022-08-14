import React from 'react';
import { useSession, signIn, getSession } from 'next-auth/react';
import { GetServerSidePropsContext } from 'next';

const About = () => {
    const { data: session } = useSession();
    return (
        <>
            {
                session
                    ? (
                        <div className="card-overlay">
                            <div>
                                <nav>
                                    <a href="/">Home</a>
                                    <a href="/vote">Vote</a>
                                    <a id="selectednav" href="/about">About</a>
                                    <a href="/candidates">Candidates</a>
                                    <a href="/"><img src={session.user.image} referrerPolicy="no-referrer" className="img-fluid" alt="userprofile" /></a>
                                </nav>
                                <div>
                                    <h1>Student Council Voting</h1>
                                    <h2>A website that allows burnside high school students from certain divisions to vote for their student representatives.</h2>
                                </div>
                            </div>
                        </div>
                    )
                    : (
                        <>
                            <div className="card-overlay">
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

export default About;
