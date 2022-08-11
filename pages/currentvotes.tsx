import React, { FC, useEffect, useState } from 'react';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { GetServerSidePropsResult } from 'next';

interface AdminVoteProps {
    names: string[];
}

const AdminVotes: FC<AdminVoteProps> = ({ names }) => {
    const [user, setUser] = useState<string | null | JwtPayload>();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            if (user) {
                const user = jwt.decode(token);
                setUser(user);
            }
            if (!user) {
                localStorage.removeItem('token');
            }
        }
    }, [user]);

    return (
        user
            ? (
                <>
                    <div className="card-overlay">
                        <div id="nav">
                            <nav>
                                <a href="/adminhomepage">Home</a>
                                <a href="/createcandidate">Create Candidates</a>
                                <a href="/currentvotes"> See Current Votes</a>
                            </nav>
                        </div>
                        <div>
                            {names.map((name) => (
                                <h1 id={name}>
                                    {name}
                                </h1>
                            ))}
                        </div>
                    </div>
                </>
            )
            : (
                <>
                    <div className="card-overlay">
                        <p> You are not signed in</p>
                        <a href="/">Go back Home</a>
                    </div>
                </>
            )
    );
};

export async function getServerSideProps(): GetServerSidePropsResult<AdminVoteProps> {
    const data: { data: { candidate_vote: string }[] } = await fetch('http://localhost:1234/api/admin/get-vote').then((response) => response.json());
    const names = data.data.map((candidate) => candidate.candidate_vote);
    return {
        props: { names },
    };
}

export default AdminVotes;
