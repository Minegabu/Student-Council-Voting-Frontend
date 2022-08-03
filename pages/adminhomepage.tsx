import React, { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';

const AdminHomepage = () => {
    const [user, setUser] = useState('');
    const onLogout = () => {
        location.href = '/adminlogin';
        localStorage.clear('token');
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
                    <div id="signedinas">
                        <p>
                            Welcome
                            {' '}
                            {user.name}
                        </p>
                    </div>
                    <div id="button">
                        <button type="button" onClick={onLogout}>Sign Out</button>
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

export default AdminHomepage;
