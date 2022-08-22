import React, { useEffect, useState } from 'react';
import jwt, { JwtPayload } from 'jsonwebtoken';
import Link from 'next/link';

const AdminHomepage = () => {
    const [user, setUser] = useState<JwtPayload | null>(null);
    const onLogout = () => {
        localStorage.clear();
    };
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const user = jwt.decode(token);
            if (user !== null && typeof user !== 'string') {
                setUser(user);
            } else {
                localStorage.removeItem('token');
            }
        }
    }, []);
    return (
        user
            ? (
                <>
                    <div className="card-overlay">
                        <div id="nav">
                            <nav>
                                <a href="/adminhomepage" id="selectednav">Home</a>
                                <a href="/createcandidate">Create Candidates</a>
                                <a href="/currentvotes">Current Votes</a>
                            </nav>
                        </div>
                        <div id="signedinas">
                            <p>
                                Welcome
                                {' '}
                                {user.name}
                            </p>
                        </div>
                        <div id="button">
                            <Link href="/adminlogin"><button type="button" onClick={onLogout}>Sign Out</button></Link>
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

export default AdminHomepage;
