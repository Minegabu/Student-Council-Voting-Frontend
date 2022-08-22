import { useEffect, useState } from 'react';
import jwt, { JwtPayload } from 'jsonwebtoken';

const CurrentVotes = () => {
    const [votes, setVotes] = useState<string[]>([]);
    const [user, setUser] = useState<JwtPayload | null>(null);
    const getcurrentvotes = async () => {
        const { data }: { data: any[] } = await fetch('https://backendstudentcouncil.herokuapp.com/api/admin/get-vote')
            .then((response) => response.json());
        const votes2 = data[1];
        console.log(votes2);
        setVotes(votes2.map((vote: { candidate_vote: string }) => vote.candidate_vote));
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
        getcurrentvotes();
    }, []);
    return (
        user
            ? (
                <>
                    <h1> Hi </h1>
                    {votes.map((name) => (
                        <h1>
                            {name}
                        </h1>
                    ))}
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

export default CurrentVotes;
