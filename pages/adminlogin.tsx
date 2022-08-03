import React, { useState } from 'react';

const Adminlogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const onAdminlogin = async () => {
        const res = await fetch('http://localhost:1234/api/admin/verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password,
            }),
        });
        const data = await res.json();
        console.log(data.users);
        if (data.users) {
            localStorage.setItem('token', data.users);
            location.href = '/adminhomepage';
        }
    };
    return (
        <>
            <>
                <nav>
                    <a href="/">Login as a Student</a>
                    <a href="/adminlogin">Login as a Admin</a>
                </nav>
                <div id="login">
                    <p> Not signed in </p>
                </div>
                <div id="login3">
                    <input type="text" placeholder="Enter Username" onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div id="login1">
                    <input type="password" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div id="login2">
                    <button type="submit" onClick={onAdminlogin}>Sign in</button>
                </div>
            </>
        </>
    );
};

export default Adminlogin;
