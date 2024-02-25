'use client'

import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { useState } from "react";

const LoginForm = () => {

  const router = useRouter();

  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {

    e.preventDefault();

    try {
      const response = await signIn('credentials', {
        redirect: false,
        email,
        password
      });

      console.log("[LOGIN_RESPONSE]: ", response);

      if(response?.ok) {
        router.refresh()
        router.push("/painel");
      } else {
        console.log("erro: ", response?.error);
        setError("Email ou senha invalidos.");
      }

    } catch (error) {
      console.log("[LOGIN_ERROR]: ", error);
    }
  }

  return (
    <div className="">
      <h1>Login</h1>
      {error && <span>{error}</span>}
      <form onSubmit={handleLogin}>
        <div className="flex flex-col">
          <label>Email</label>
          <input className="border mt-1" type="text" name="email" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="flex flex-col">
          <label>Password</label>
          <input className="border mt-1" type="password" name="password" onChange={(e) => setPassword(e.target.value)} />
        </div>

        <button className="bg-gray-200 p-2 mt-3" type="submit">Login</button>
      </form>
    </div>
  )
}

export { LoginForm }
