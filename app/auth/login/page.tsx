"use client"

import type React from "react"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const errorParam = searchParams.get("error")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const supabase = createClient()

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", data.user.id)
        .maybeSingle() // Use maybeSingle() instead of single() to handle 0 rows

      if (profileError) {
        throw new Error(`Profile lookup failed: ${profileError.message}`)
      }

      if (!profile) {
        throw new Error("Account not found. Please create an account first or contact administrator.")
      }

      // Redirect based on role
      switch (profile.role) {
        case "admin":
          router.push("/admin/dashboard")
          break
        case "teacher":
          router.push("/dashboard/staff")
          break
        case "student":
          router.push("/dashboard/student")
          break
        case "parent":
          router.push("/dashboard/parent")
          break
        default:
          router.push("/")
      }
    } catch (error: unknown) {
      console.log("[v0] Login error:", error) // Debug log
      if (error instanceof Error && error.message.includes("Missing Supabase environment variables")) {
        setError("Authentication service is not configured. Please contact the administrator.")
      } else {
        setError(error instanceof Error ? error.message : "An error occurred")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Login to Omobola School</CardTitle>
            <CardDescription>Enter your credentials to access your account</CardDescription>
          </CardHeader>
          <CardContent>
            {errorParam && (
              <Alert className="mb-4">
                <AlertDescription>{errorParam}</AlertDescription>
              </Alert>
            )}
            <form onSubmit={handleLogin}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@omobolaschool.edu"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {error && <p className="text-sm text-red-500">{error}</p>}
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </div>
            </form>
            <div className="mt-4 text-center text-sm text-muted-foreground">
              <div className="space-y-2">
                <div>
                  Don't have an account?{" "}
                  <Link href="/auth/signup" className="text-primaryBlue underline underline-offset-4">
                    Create Account
                  </Link>
                </div>
                <Link href="/" className="underline underline-offset-4">
                  Back to Home
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
