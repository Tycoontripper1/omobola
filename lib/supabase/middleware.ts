import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY

  // If Supabase is not configured, allow all requests to pass through
  if (!supabaseUrl || !supabaseAnonKey) {
    console.log("[v0] Supabase not configured, skipping authentication middleware")
    return supabaseResponse
  }

  // With Fluid compute, don't put this client in a global environment
  // variable. Always create a new one on each request.
  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
        supabaseResponse = NextResponse.next({
          request,
        })
        cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options))
      },
    },
  })

  // Do not run code between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  // IMPORTANT: If you remove getUser() and you use server-side rendering
  // with the Supabase client, your users may be randomly logged out.
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Allow access to public pages and auth pages
  const publicPaths = ["/auth", "/login", "/", "/about", "/academics", "/information", "/contact"]
  const isPublicPath = publicPaths.some(
    (path) => request.nextUrl.pathname === path || request.nextUrl.pathname.startsWith(path),
  )

  if (!user && !isPublicPath) {
    // no user, redirect to login page
    const url = request.nextUrl.clone()
    url.pathname = "/auth/login"
    return NextResponse.redirect(url)
  }

  // If user is authenticated, check role-based access
  if (user && !isPublicPath) {
    try {
      const { data: profile, error } = await supabase.from("profiles").select("role").eq("id", user.id).single()

      if (error) {
        console.log("[v0] Profile query error:", error.message)
        // If profiles table doesn't exist, allow access but log the issue
        if (error.code === "PGRST116" || error.message.includes("profiles")) {
          console.log("[v0] Profiles table not found, allowing access")
          return supabaseResponse
        }
      }

      if (profile) {
        const userRole = profile.role
        const pathname = request.nextUrl.pathname

        // Role-based route protection
        if (pathname.startsWith("/admin") && userRole !== "admin") {
          const url = request.nextUrl.clone()
          url.pathname = "/auth/login"
          url.searchParams.set("error", "Access denied")
          return NextResponse.redirect(url)
        }

        if (pathname.startsWith("/teacher") && userRole !== "teacher") {
          const url = request.nextUrl.clone()
          url.pathname = "/auth/login"
          url.searchParams.set("error", "Access denied")
          return NextResponse.redirect(url)
        }

        if (pathname.startsWith("/student") && userRole !== "student") {
          const url = request.nextUrl.clone()
          url.pathname = "/auth/login"
          url.searchParams.set("error", "Access denied")
          return NextResponse.redirect(url)
        }

        if (pathname.startsWith("/parent") && userRole !== "parent") {
          const url = request.nextUrl.clone()
          url.pathname = "/auth/login"
          url.searchParams.set("error", "Access denied")
          return NextResponse.redirect(url)
        }

        // Dashboard access control
        if (pathname === "/dashboard/staff" && userRole !== "teacher") {
          const url = request.nextUrl.clone()
          url.pathname = getRoleBasedDashboard(userRole)
          return NextResponse.redirect(url)
        }

        if (pathname === "/dashboard/student" && userRole !== "student") {
          const url = request.nextUrl.clone()
          url.pathname = getRoleBasedDashboard(userRole)
          return NextResponse.redirect(url)
        }

        if (pathname === "/dashboard/parent" && userRole !== "parent") {
          const url = request.nextUrl.clone()
          url.pathname = getRoleBasedDashboard(userRole)
          return NextResponse.redirect(url)
        }

        if (pathname === "/admin/dashboard" && userRole !== "admin") {
          const url = request.nextUrl.clone()
          url.pathname = getRoleBasedDashboard(userRole)
          return NextResponse.redirect(url)
        }
      }
    } catch (error) {
      console.log("[v0] Middleware error:", error)
      // Allow access if there's an error to prevent blocking the site
      return supabaseResponse
    }
  }

  // IMPORTANT: You *must* return the supabaseResponse object as it is.
  return supabaseResponse
}

function getRoleBasedDashboard(role: string): string {
  switch (role) {
    case "admin":
      return "/admin/dashboard"
    case "teacher":
      return "/dashboard/staff"
    case "student":
      return "/dashboard/student"
    case "parent":
      return "/dashboard/parent"
    default:
      return "/auth/login"
  }
}
