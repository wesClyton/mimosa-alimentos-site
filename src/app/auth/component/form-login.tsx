"use client"

import { Button } from "@/app/painel/components/ui/button"
import { Input } from "@/app/painel/components/ui/input"
import { Loader2 } from "lucide-react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"

const LoginForm = () => {
  const router = useRouter()

  const [error, setError] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [load, setLoad] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoad(true)

    try {
      const response = await signIn("credentials", {
        redirect: false,
        email,
        password,
      })

      console.log("[LOGIN_RESPONSE]: ", response)

      if (response?.ok) {
        router.refresh()
        router.push("/painel")
      } else {
        console.log("erro: ", response?.error)
        setError("Email ou senha invalidos.")
        setLoad(false)
      }
    } catch (error) {
      setLoad(false)
      console.log("[LOGIN_ERROR]: ", error)
    }
  }

  return (
    <div className="">
      <span className="block font-bold text-sm h-5">{error}</span>
      <form onSubmit={handleLogin}>
        <div className="grid w-full items-center gap-4 pt-4">
          <div className="flex flex-col space-y-1.5">
            <label>Email</label>
            <Input className="border mt-1" type="text" name="email" onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="flex flex-col space-y-1.5">
            <label>Password</label>
            <Input
              className="border mt-1"
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <Button className="p-2 mt-3 w-full" type="submit" disabled={load ? true : false}>
          {load && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Login
        </Button>
      </form>
    </div>
  )
}

export { LoginForm }
