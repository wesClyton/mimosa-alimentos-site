"use client"

import { useSession } from "next-auth/react"

export default function AboutPage() {
  const { data: session } = useSession()

  return (
    <div className="w-full max-w-screen-xl h-screen flex justify-center items-center">
      <h1>Sobre page</h1>
      {session && <pre>{JSON.stringify(session, null, 2)}</pre>}
    </div>
  )
}
