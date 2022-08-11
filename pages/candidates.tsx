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
                            <div className="card-overlay">
                                <nav>
                                    <a href="/">Home</a>
                                    <a href="/vote">Vote</a>
                                    <a href="/about">About</a>
                                    <a href="/candidates" id="selectednav">Candidates</a>
                                    <a href="/"><img src={session.user.image} referrerPolicy="no-referrer" className="img-fluid" alt="userprofile" /></a>
                                </nav>
                                <div id="Header">
                                    <h1> List of available nominees</h1>
                                </div>
                                <div>
                                    {names.map((name, index) => (
                                        <div id={name}>
                                            {' '}
                                            <h2>{name}</h2>
                                            {' '}
                                            <b>{descriptions[index]}</b>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    )
                    : (
                        <>
                            <div className="card-overlay">

                                {' '}
                                <p>You are not signed in</p>
                                <br />
                                {' '}
                                <p>Please go to the homepage and login</p>
                                <br />
                                <a href="/"> Go Back </a>
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

export default Candidate;
