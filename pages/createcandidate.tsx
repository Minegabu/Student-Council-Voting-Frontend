// import things
import React, { useEffect, useState } from 'react';
import jwt, { JwtPayload } from 'jsonwebtoken';
import Link from 'next/link';

const Createcandidate = () => {
    // set state variables so I can use them in html
    const [user, setUser] = useState<string | null | JwtPayload>(null);
    const [username, setUsername] = useState<string | null>(null);
    const [divisionid, setDivisionid] = useState<string | null>(null);
    const [description, setDescription] = useState<string | null>(null);
    // function to send data to the api to create a candidate
    const onCandidateCreate = async () => {
        await fetch('https://backendstudentcouncil.herokuapp.com/api/admin/createcandidate', {
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
    // make it run on refresh
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const user = jwt.decode(token);
            setUser(user);
            if (!user) {
                localStorage.removeItem('token');
            }
        }
    }, []);
    return (
        // if user is not null return this
        user
            ? (
                <>
                    <div className="card-overlay">

                        <div id="nav">
                            <nav>
                                <a href="/adminhomepage">Home</a>
                                <a href="/createcandidate" id="selectednav">Create Candidates</a>
                                <a href="/currentvotes">Current Votes</a>
                            </nav>
                        </div>
                        <div id="login3">
                            {/* setting state variables in html to use them back in js in the post to create the user based on the values in the input boxes */}
                            <input type="text" placeholder="Enter Name" onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div id="login1">
                            <input type="integer" placeholder="Enter Division Id" onChange={(e) => setDivisionid(e.target.value)} />
                        </div>
                        <div id="description">
                            <input type="text" placeholder="Enter Description" onChange={(e) => setDescription(e.target.value)} />
                        </div>
                        <div id="login2">
                            <Link href="/adminhomepage"><button type="button" onClick={onCandidateCreate}>Create Candidate</button></Link>
                        </div>
                    </div>
                </>
            )
            : /* if the user is null return this */(
                <>
                    <div className="card-overlay">
                        <p> You are not signed in</p>
                        <a href="/">Go back Home</a>
                    </div>
                </>
            )
    );
};

export default Createcandidate;
