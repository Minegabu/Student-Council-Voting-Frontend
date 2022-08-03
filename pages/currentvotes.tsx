import React, { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';

const candidateslistname: string[] = [];
const AdminVotes = () => {
    const [user, setUser] = useState(null);
    const [names, setNames] = useState<string[]>([]);
    const fetchData = async () => {
        await fetch('http://localhost:1234/api/admin/get-vote').then((response) => response.json()).then((data) => {
            const count = Object.keys(data.data).length;
            for (let i = 0; i < count; i++) {
                candidateslistname.push(data.data[i].candidate_vote);
                setNames(candidateslistname);
            }
        });
    };
    useEffect(() => {
        fetchData();
        const token = localStorage.getItem('token');
        if (token) {
            const user: string = jwt.decode(token);
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
                    <div>
                        {names.map((name) => (
                            <h1 id={name}>
                                {name}
                            </h1>
                        ))}
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

export default AdminVotes;
