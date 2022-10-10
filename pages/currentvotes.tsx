// import things
import { useEffect, useState } from 'react';
import jwt, { JwtPayload } from 'jsonwebtoken';

const CurrentVotes = () => {
    // setting state variables so I can use it in html
    const [votes, setVotes] = useState<string[]>([]); // typing things
    const [user, setUser] = useState<JwtPayload | null>(null); // typing things
    // function to fetch data from the api
    const getcurrentvotes = async () => {
        // https://backendstudentcouncil.herokuapp.com/api/admin/get-vote
        const data = await fetch('https://backendstudentcouncil.herokuapp.com/api/admin/get-vote')
            .then((response) => response.json());
        setVotes(data.data);
    };
    // make it so this runs on refresh, and checks if there is a jwt token in local storage meaning there is a user
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
        getcurrentvotes();
    }, []);
    return (
        user
            ? ( // return this if user is not null
                <>
                    <div className="card-overlay">
                        <nav>
                            <a href="/adminhomepage">Home</a>
                            <a href="/createcandidate">Create Candidates</a>
                            <a href="/currentvotes" id="selectednav">Current Votes</a>
                        </nav>
                        <table>
                            {
                                Object.entries(votes)
                                    .map(([key, value]) => (
                                        <tr>
                                            <td>{key}</td>
                                            {' '}
                                            <td>{value}</td>
                                        </tr>
                                    ))
                            }
                        </table>
                    </div>
                </>
            )
            : ( // return this if user is null
                <>
                    <div className="card-overlay">
                        <p> You are not signed in</p>
                        <a href="/">Go back Home</a>
                    </div>
                </>
            )
    );
};

export default CurrentVotes;
