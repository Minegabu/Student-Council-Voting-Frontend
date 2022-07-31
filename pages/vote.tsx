import React, { useState, useEffect } from "react"
import { useSession, signIn, signOut, getSession } from "next-auth/react"

let candidateslist = []
let uniquecandidateset = null
let uniquecandidatelist = null
let selectedoption = null
export default function Vote() {
    const { data: session } = useSession()
    const [value, setValue] = useState()

    const [names, setNames] = useState([])

    const thing = async () => {
        const res = await fetch("http://localhost:1234/api/get-candidate/" + encodeURIComponent(session?.user?.email)
        ).then(response => response.json()).then(data => {
            var count = Object.keys(data.data).length;
            for (let i = 0; i < count; i++) {
                candidateslist.push(data.data[i].name)
                uniquecandidateset = new Set(candidateslist)
                uniquecandidatelist = Array.from(uniquecandidateset)
                setNames(uniquecandidatelist)
            }
        }).catch(err => console.log(err));
    }
    const sendData = async () => {
        if (selectedoption != null) {
            await fetch("http://localhost:1234/api/vote/update", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    vote: selectedoption,
                    name: session.user?.name
                }),
            })
            location.href = '/submittedvote'
        }
        else (console.log("cannot submit null"))
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
                    <div id="navbar">
                        <nav>
                            <a href="/">Home</a>
                            <a href="/vote">Vote</a>
                            <a href="/about">About</a>
                            <a href="/candidates">Candidates</a>
                        </nav>
                    </div>
                    <div id="Header">
                        <div id="profileimg">
                            <img src={session.user?.image} referrerPolicy="no-referrer"></img>
                        </div>
                        <h1> Please vote for a student council representative</h1>
                    </div>
                    <div id="hi">
                        <form id="formforvote">
                            <div id="hi4">
                                <select value={value} onChange={(e) => {
                                    setValue(e.target.value)
                                    selectedoption = e.target.value
                                }} id="Selectvotedropdown">
                                    <option value="defaultoption">--Choose an option--</option>
                                    {names.map(name => <option id={name} value={name}> {name} </option>)}
                                </select>
                            </div>
                            <div id="hi2">
                                <p>{`You have selected ${value}`}</p>
                            </div>

                            <div id="hi3">
                                <input type="submit" onClick={sendData}></input>
                            </div>
                        </form>
                    </div>
                </>
                :
                <>
                    <p> You are not signed in <br></br></p>
                    <p> Please go to the homepage and login<br></br></p>
                    <a href="/"> Go Back </a>
                </>

        }

    </>
}

export async function getServerSideProps(ctx) {
    const session = await getSession(ctx)
    return ({ props: { session } })
}