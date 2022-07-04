import { useSession, signIn, signOut } from "next-auth/react"
import { useState } from "react"


export default function Component() {
  const { data: session } = useSession()
  const thing = async () => { 
    const res = await fetch('/api/users/add',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
        body: JSON.stringify({
          name: session?.user?.name,
          email: session?.user?.email, 
        }),
      })
    const data = await res.json()
    console.log(data)
  };
  thing()
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