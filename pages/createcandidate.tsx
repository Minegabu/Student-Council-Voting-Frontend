import React, { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';

const Createcandidate = () => {
    const [user, setUser] = useState<string | null>(null);
    const [username, setUsername] = useState<string | null>(null);
    const [divisionid, setDivisionid] = useState<string | null>(null);
    const [description, setDescription] = useState<string | null>(null);
    const onCandidateCreate = async () => {
        await fetch('http://localhost:1234/api/admin/createcandidate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                divisionid,
                description,
            }),
        });
    };
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const user = jwt.decode(token);
            setUser(user);
            if (!user) {
                localStorage.removeItem('token');
            }
        } else {
            console.log('hi');
        }
    }, []);
    return (
        user
            ? (
                <>
                    <div id="nav">
                        <nav>
                            <a href="/adminhomepage">Home</a>
                            <a href="/createcandidate">Create Candidates</a>
                            <a href="/currentvotes"> See Current Votes</a>
                        </nav>
                    </div>
                    <div id="login3">
                        <input type="text" placeholder="Enter Name" onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div id="login1">
                        <input type="integer" placeholder="Enter Division Id" onChange={(e) => setDivisionid(e.target.value)} />
                    </div>
                    <div id="description">
                        <input type="text" placeholder="Enter Description" onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <div id="login2">
                        <button type="button" onClick={onCandidateCreate}>Sign in</button>
                    </div>
                </>
            )
            : (
                <>
                    <p> You are not signed in</p>
                    <a href="/">Go back Home</a>
                </>
            )
    );
};

export default Createcandidate;
