// import things
import React from 'react';
import { useSession, getSession } from 'next-auth/react';
import { GetServerSidePropsContext } from 'next';
import Link from 'next/link';

const SubmittedVote = () => {
    const { data: session } = useSession();
    return (
        <>
            {
                session // if session is not null return this
                    ? (
                        <>
                            <div className="card-overlay">

                                <div id="Header">
                                    <h1>Thank you for submitting your vote</h1>
                                </div>
                                <div id="hi" />
                                <div id="SubmitVoteButton">
                                    <Link href="/"><button type="button" id="goback">Go back home</button></Link>
                                </div>
                                <div id="profileimg">
                                    <img src={session.user?.image} referrerPolicy="no-referrer" alt="userprofile" />
                                </div>
                            </div>
                        </>
                    )
                    : ( // if session is null return this
                        <>
                            <div className="card-overlay">
                                <p>You are not signed in</p>
                                <p>Please go to the homepage and login</p>
                            </div>
                        </>
                    )
            }

        </>
    );
};
// get sesssion from serverside props
export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    const session = await getSession(ctx);
    return ({ props: { session } });
}

export default SubmittedVote;
