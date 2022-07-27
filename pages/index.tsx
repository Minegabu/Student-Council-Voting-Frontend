import { useSession, signIn, signOut, getSession } from "next-auth/react"
import React, { useEffect, useState } from "react"


export default function Component() {
  const { data: session, status } = useSession()
  try {
    const thing = async () => {
      const res = await fetch('http://localhost:1234/api/users/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: session?.user?.name,
          email: session?.user?.email
        }),
      })
    };
  } catch (err) {
    console.log(err)
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
          <nav>
            <a href="/">Home</a>
            <a href="/vote">Vote</a>
            <a href="/about">About</a>
          </nav>
          <div id="text1">
            <p>Signed in as {session?.user?.email}</p>
          </div>
          <div id="signedinas">
            <button onClick={() => signOut()}>Sign out</button>
          </div>
          <a href="/vote">Vote</a>
        </>
        : <>
          Not signed in <br />
          <button onClick={() => signIn()}>Sign in</button>

        </>

    }
  </>
}

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx)
  return ({ props: { session } })
}