'use client'

import { signOut } from "next-auth/react"

export const SignOutButtom = () => {
  return (<button onClick={() => signOut()}>Sair</button>)
}
