import React, { useState, useEffect } from "react"
import { useSession, signIn, signOut, getSession } from "next-auth/react"
export default function submittedVote() {
    const { data: session } = useSession()
    const buttonredirect = () => {
        location.href = "/"
    }
    return <>
        {
            session ?
                <>
                    <div id="Header">
                        <h1>Thank you for submitting your vote</h1>
                    </div>
                    <div id="hi">
                    </div>
                    <div id="SubmitVoteButton">
                        <button id="goback" onClick={buttonredirect}>Go back home</button>
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