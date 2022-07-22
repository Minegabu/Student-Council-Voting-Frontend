import React, { useState, useEffect } from "react"
import { useSession, signIn, signOut, getSession } from "next-auth/react"
import { createRoot } from "react-dom/client";
let candidateslist = []
let uniquecandidateset = null
let uniquecandidatelist = null
let n = 0
export default function Vote() {
    const { data: session } = useSession()
    const thing = async () => {
        const res = await fetch("http://localhost:1234/api/get-candidate/" + encodeURIComponent(session?.user?.email)
            ,
        ).then(response => response.json()).then(data => {
            var count = Object.keys(data.data).length;
            console.log(count)
            for (let i = 0; i < count; i++) {
                candidateslist.push(data.data[i].name)
                uniquecandidateset = new Set(candidateslist)
                uniquecandidatelist = Array.from(uniquecandidateset)
                console.log(uniquecandidatelist)
            }
        }).catch(err => console.log(err));

        const CandidatesFunction = (
            <select>
                {uniquecandidatelist.map(name => <option key={n + 1}> {name} </option>)}
            </select>
        );
        const container = document.getElementById("hi")
        const root = createRoot(container!)
        root.render(CandidatesFunction)
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
                    <div id="Header">
                        <h1> Please vote for a student council representative</h1>
                    </div>
                    <div id="hi">
                    </div>
                    <div id="SubmitVoteButton">
                        <button > Submit Vote!</button>
                    </div>
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