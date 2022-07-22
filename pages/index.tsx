import { useSession, signIn, signOut, getSession } from "next-auth/react"
import React, { useEffect, useState } from "react"


// fetch(ENV.API_URL + `/api/get-candidates/${id}`).then(response => )


export default function Component() {
  const { data: session, status } = useSession()
  const thing = async () => {
    const res = await fetch('/api/users/add', {
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
          Signed in as {session.user?.email} <br />
          <button onClick={() => signOut()}>Sign out</button>
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