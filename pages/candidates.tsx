import React, { useState, useEffect, useCallback } from 'react';
import { useSession, getSession } from 'next-auth/react';
import { GetServerSidePropsContext } from 'next';

const candidateslistname: string[] = [];
let uniquecandidatelistname = null;
let uniquecandidatesetname = null;
const listdescription: string[] = [];
let setdescription = null;
let uniquelistdescription = null;

const Candidate = () => {
    const { data: session } = useSession();
    const [names, setNames] = useState<string[]>([]);
    const [descriptions, setDescriptions] = useState<string[]>([]);
    const fetchapi = useCallback(async () => {
        if (session) {
            await fetch(`http://localhost:1234/api/get-candidate/${encodeURIComponent(session.user.email)}`).then((response) => response.json()).then((data) => {
                const count = Object.keys(data.data).length;
                for (let i = 0; i < count; i++) {
                    candidateslistname.push(data.data[i].name);
                    uniquecandidatesetname = new Set(candidateslistname);
                    uniquecandidatelistname = Array.from(uniquecandidatesetname);
                    setNames(uniquecandidatelistname);
                    listdescription.push(data.data[i].description);
                    setdescription = new Set(listdescription);
                    uniquelistdescription = Array.from(setdescription);
                    setDescriptions(uniquelistdescription);
                }
            });
        }
    }, [session]);
    useEffect(() => {
        fetchapi();
    }, [fetchapi]);
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
                            <div id="Header">
                                <div id="profileimg">
                                    <img src={session?.user?.image} referrerPolicy="no-referrer" alt="userprofile" />
                                </div>
                                <h1> List of available nominees</h1>
                            </div>
                            <div>
                                {names.map((name, index) => (
                                    <div id={name}>
                                        {' '}
                                        <h1>{name}</h1>
                                        {' '}
                                        <h2>{descriptions[index]}</h2>
                                    </div>
                                ))}
                            </div>
                        </>
                    )
                    : (
                        <>
                            {' '}
                            You are not signed in
                            <br />
                            {' '}
                            Please go to the homepage and login
                            <br />
                            <a href="/"> Go Back </a>
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

export default Candidate;
