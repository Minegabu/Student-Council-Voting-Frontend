// import things
import React, { useEffect, useState } from 'react';
import jwt, { JwtPayload } from 'jsonwebtoken';
import Link from 'next/link';

const AdminHomepage = () => {
    // set state variables so i can use them in html
    const [user, setUser] = useState<JwtPayload | null>(null);
    // define a logout function for ease of use in html
    const onLogout = () => {
        localStorage.clear();
    };
    // make it check if the user exists on refresh
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
            ? ( // if user is not null return this
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
                            {/* Link is a tag that redirects people, like <a> but better */}
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
