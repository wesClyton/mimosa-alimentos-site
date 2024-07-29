"use client"

import { useSession } from "next-auth/react"

export default function AboutPage() {
  const { data } = useSession()

  return (
    <div className="w-full max-w-screen-xl h-screen flex justify-center items-center">
      <h1>Sobre page</h1>
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  )
}
