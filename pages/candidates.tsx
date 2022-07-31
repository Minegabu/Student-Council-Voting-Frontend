import React, { useState, useEffect } from "react"
import { useSession, signIn, signOut, getSession } from "next-auth/react"
import { GetServerSidePropsContext } from "next"
let candidateslistname = []
let uniquecandidatelistname = null
let uniquecandidatesetname = null
let listdescription = []
let setdescription = null
let uniquelistdescription = null

export default function candidate() {
    const { data: session, status } = useSession()
    const [value, setValue] = useState()
    const [names, setNames] = useState([])
    const [descriptions, setDescriptions] = useState([])
    const fetchapi = async () => {
        const res = await fetch("http://localhost:1234/api/get-candidate/" + encodeURIComponent(session?.user?.email)
        ).then(response => response.json()).then(data => {
            var count = Object.keys(data.data).length;
            for (let i = 0; i < count; i++) {
                candidateslistname.push(data.data[i].name)
                uniquecandidatesetname = new Set(candidateslistname)
                uniquecandidatelistname = Array.from(uniquecandidatesetname)
                setNames(uniquecandidatelistname)
                listdescription.push(data.data[i].description)
                setdescription = new Set(listdescription)
                uniquelistdescription = Array.from(setdescription)
                setDescriptions(uniquelistdescription)
            }
        }).catch(err => console.log(err))
    }
    useEffect(() => {
        fetchapi()
    }, [])
    return <>
        {
            session ?
                <>
                    <nav>
                        <a href="/">Home</a>
                        <a href="/vote">Vote</a>
                        <a href="/about">About</a>
                        <a href="/candidates">Candidates</a>
                    </nav>
                    <div id="Header">
                        <div id="profileimg">
                            <img src={session?.user?.image} referrerpolicy="no-referrer"></img>
                        </div>
                        <h1> List of available nominees</h1>
                    </div>
                    <div>
                        {names.map((name, index) => <div id={name} value={name}> <h1>{name}</h1> <h2>{descriptions[index]}</h2></div>)}
                    </div>
                </>
                :
                <>
                    <a> You are not signed in <br></br></a>
                    <a> Please go to the homepage and login<br></br></a>
                    <a href="/"> Go Back </a>
                </>
        }
    </>
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    const session = await getSession(ctx)
    return ({ props: { session } })
}