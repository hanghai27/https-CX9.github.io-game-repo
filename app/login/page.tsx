"use client"

import { signIn } from "next-auth/react"

export default function LoginPage() {
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const username = formData.get("username")
    const password = formData.get("password")

    await signIn("credentials", {
      username,
      password,
      callbackUrl: "/",
    })
  }

  return (
    <div style={{ maxWidth: 400, margin: "50px auto" }}>
      <h1>Đăng nhập</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="username"
          placeholder="Username"
          style={{ display: "block", width: "100%", marginBottom: 10 }}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          style={{ display: "block", width: "100%", marginBottom: 10 }}
        />

        <button type="submit">Login</button>
      </form>
    </div>
  )
}
