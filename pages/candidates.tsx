import React, { useState, useEffect, useCallback } from 'react';
import { useSession, getSession } from 'next-auth/react';
import { GetServerSidePropsContext } from 'next';

const Candidate = () => {
    const { data: session } = useSession();
    const [names, setNames] = useState<string[]>([]);
    const [descriptions, setDescriptions] = useState<string[]>([]);
    const fetchData = useCallback(async () => {
        if (session) {
            const { data }: { data: any[] } = await fetch(`https://backendstudentcouncil.herokuapp.com/api/get-candidate/${encodeURIComponent(session?.user?.email)}`)
                .then((response) => response.json());
            const candidatenames = data[1];
            setNames(candidatenames.map((candidatename: { name: string }) => candidatename.name));
            setDescriptions(candidatenames.map((candidatedescriptions: { description: string }) => candidatedescriptions.description));
        }
    }, [session]);
    useEffect(() => {
        fetchData();
    }, [fetchData]);
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
