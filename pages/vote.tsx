import { useState } from "react"
import { useSession, signIn, signOut } from "next-auth/react"


export default function Vote(){
    const { data: session } = useSession()
    const thing = async () => {
    const res = await fetch('api/candidates/get')
    }
    thing()
    return<>
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