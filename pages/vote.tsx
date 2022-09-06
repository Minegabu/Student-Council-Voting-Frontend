// import things
import React, { useState, useEffect, useCallback } from 'react';
import { useSession, getSession } from 'next-auth/react';
import { GetServerSidePropsContext } from 'next';
import Link from 'next/link';

const Vote = () => {
    // set states so I can use them in html
    const { data: session } = useSession();
    const [selection, setSelection] = useState<number | null>(null);
    const [names, setNames] = useState<string[]>([]);
    const [existvote, setExistVote] = useState();
    // function to fetch data from the api
    const fetchData = useCallback(async () => {
        if (session) {
            const { data }: { data: any[] } = await fetch(`https://backendstudentcouncil.herokuapp.com/api/get-candidate/${encodeURIComponent(session?.user?.email)}`)
                .then((response) => response.json());
            const candidatenames = data[1];
            setNames(candidatenames.map((candidate: { name: string }) => candidate.name));
            setExistVote(data[0]);
        }
    }, [session]);
    // function to send vote to api
    const onSenddata = async () => {
        if (session) {
            if (selection != null) {
                await fetch('https://backendstudentcouncil.herokuapp.com/api/vote/update', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        vote: names[selection],
                        name: session.user?.name,
                    }),
                });
            }
        }
    };
    // make the fetchdata function run on refresh
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <>
            {
                // if session is not null do this
                session
                    ? (
                        <>
                            <div className="card-overlay">
                                <div id="navbar">
                                    <nav>
                                        <a href="/">Home</a>
                                        <a id="selectednav" href="/vote">Vote</a>
                                        <a href="/about">About</a>
                                        <a href="/candidates">Candidates</a>
                                        <a href="/"><img src={session.user.image} referrerPolicy="no-referrer" className="img-fluid" alt="userprofile" /></a>
                                    </nav>
                                </div>
                                <div id="Header">
                                    <h1> Please vote for a student council representative</h1>
                                </div>
                                <div id="hi">
                                    <form id="formforvote">
                                        <div id="hi4">
                                            <select
                                                value={selection !== null ? names[selection] : 'Select Candidate'} // if selection is not null then make the value Select Candidate
                                                onChange={(e) => {
                                                    const index = names.indexOf(e.target.value); // make it so you cannot pass in the value null
                                                    if (index >= 0) {
                                                        setSelection(index);
                                                    } else {
                                                        setSelection(null);
                                                    }
                                                }}
                                                id="Selectvotedropdown"
                                            >
                                                <option value="defaultoption"> Choose an option </option>
                                                {names.map((name) => ( // map the options in the select bar from the state of name
                                                    <option id={name} value={name}>
                                                        {name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        {selection !== null && existvote === null && ( // only show this button when something is selected and you have not voted before
                                            <div id="hi2">
                                                <Link href="/submittedvote">
                                                    <button type="submit" onClick={onSenddata}>
                                                        Vote for
                                                        {' '}
                                                        {names[selection]}
                                                    </button>

                                                </Link>
                                            </div>
                                        )}
                                        {selection !== null && existvote !== null && ( // only show this button when something is selected but you have voted before
                                            <>
                                                <div id="hi2">
                                                    <Link href="/submittedvote">
                                                        <button type="submit" onClick={onSenddata}>
                                                            Update Vote
                                                        </button>
                                                    </Link>
                                                </div>
                                            </>
                                        )}
                                    </form>
                                </div>
                                {existvote !== null && (
                                    <div>
                                        <b>
                                            {' '}
                                            You have voted for
                                            {' '}
                                            {existvote}
                                            {' '}
                                        </b>
                                    </div>
                                )}
                            </div>
                        </>
                    )
                    // if session is null do this
                    : (
                        <>
                            <div className="card-overlay">

                                <p>
                                    {' '}
                                    You are not signed in
                                    <br />
                                </p>
                                <p>
                                    {' '}
                                    Please go to the homepage and login
                                    <br />
                                </p>
                                <a href="/"> Go Back </a>
                            </div>
                        </>
                    )

            }

        </>
    );
};

// get session from serverside props
export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    const session = await getSession(ctx);
    return ({ props: { session } });
}

export default Vote;
