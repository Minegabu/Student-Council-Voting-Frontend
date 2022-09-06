// import things
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useSession, getSession } from 'next-auth/react';
import { GetServerSidePropsContext } from 'next';
import Link from 'next/link';
import crypto from 'crypto';

const Adminlogin = () => {
    // setting state variables so I can use them in html
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { data: session } = useSession();
    const [exist, setExist] = useState<boolean>();
    // way to redirect
    const router = useRouter();
    // creating a hash so I can hash the passwords
    const encryptedpassword = crypto.createHash('sha256').update(password).digest('base64');
    // function to send data to the api then change pages and add the jwt token to local storage
    const onAdminlogin = async () => {
        const res = await fetch('https://backendstudentcouncil.herokuapp.com/api/admin/verify', {
            method: 'POST',
            headers: {

                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                encryptedpassword,
            }),
        });
        const data = await res.json();
        setExist(data.users);
        if (data.users) {
            localStorage.setItem('token', data.users);
            router.push('/adminhomepage');
        }
    };
    return (
        <>
            {
                session // if sesssion exists it means the user is logged in as a student
                    ? (
                        <>
                            <div className="card-overlay">
                                <h1> Please sign out of a student account before trying to acess admin login</h1>
                                <div id="hi3">
                                    <Link href="/"><button type="button">Go back Home</button></Link>
                                </div>
                            </div>
                        </>
                    ) : /* if session does not exist then they are not logged in so they can acess homepage */ (
                        <>
                            <>
                                <div className="card-overlay">

                                    <nav>
                                        <a href="/">Login as a Student</a>
                                        <a id="selectednav" href="/adminlogin">Login as a Admin</a>
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
                                        <button type="submit" onClick={onAdminlogin}>Sign in as Admin</button>
                                    </div>
                                    {exist === false && ( // if the admin doesnt exist display this error message
                                        <div id="hi2">
                                            <p>
                                                Incorrect Username or Password
                                                {' '}
                                                <br />
                                                Please try again

                                            </p>
                                        </div>
                                    )}
                                </div>
                            </>
                        </>
                    )

            }

        </>
    );
};

// get session from serverside props
export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    const session = await getSession(ctx);
    return ({ props: { session } });
}
export default Adminlogin;
