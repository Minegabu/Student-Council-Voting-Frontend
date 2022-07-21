import { useState, useEffect } from "react"
import { useSession, signIn, signOut, getSession } from "next-auth/react"

export default function Vote() {
    const { data: session } = useSession()
    const thing = async () => {
        console.log("http://localhost:1234/api/get-candidate/" + session?.user?.email)
        const res = await fetch("http://localhost:1234/api/get-candidate/" + session?.user?.email
        ).then((response) => response.json()).catch(err => console.log(err));
    }
    useEffect(() => {
        const fetchData = async () => {
            await thing()
        }
        fetchData()
    }, [])
    return <>
        {

            session ?
                <>
                    <h1> Please vote for a student council representative</h1>
                    <select>
                        <option value="candidate1">Fruit</option>
                        <option value="candidate2">Vegetable</option>
                        <option value="candidate3">Meat</option>
                    </select>
                    <button> Submit Vote!</button>
                </>
                :
                <>
                    <a> You are not signed in</a>
                    <a> Please go to the homepage and login</a>
                </>

        }

    </>
}

export async function getServerSideProps(ctx) {
    const session = await getSession(ctx)
    return ({ props: { session } })
}