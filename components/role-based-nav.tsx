"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User, Settings, LogOut, Users, BookOpen, FileText, BarChart3 } from "lucide-react"

export function RoleBasedNav() {
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadUserData()
  }, [])

  const loadUserData = async () => {
    const supabase = createClient()

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (user) {
        setUser(user)

        const { data: profileData } = await supabase.from("profiles").select("*").eq("id", user.id).single()

        setProfile(profileData)
      }
    } catch (error) {
      console.error("Error loading user data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    window.location.href = "/"
  }

  if (loading || !user || !profile) {
    return null
  }

  const getRoleSpecificLinks = () => {
    switch (profile.role) {
      case "admin":
        return [
          { href: "/admin/dashboard", label: "Admin Dashboard", icon: BarChart3 },
          { href: "/admin/users", label: "Manage Users", icon: Users },
          { href: "/admin/subjects", label: "Manage Subjects", icon: BookOpen },
          { href: "/admin/results", label: "All Results", icon: FileText },
        ]
      case "teacher":
        return [
          { href: "/dashboard/staff", label: "Teacher Dashboard", icon: BarChart3 },
          { href: "/teacher/results", label: "Manage Results", icon: FileText },
          { href: "/teacher/students", label: "My Students", icon: Users },
        ]
      case "student":
        return [
          { href: "/dashboard/student", label: "Student Dashboard", icon: BarChart3 },
          { href: "/student/results", label: "My Results", icon: FileText },
          { href: "/student/results/print", label: "Print Report Card", icon: FileText },
        ]
      case "parent":
        return [
          { href: "/dashboard/parent", label: "Parent Dashboard", icon: BarChart3 },
          { href: "/parent/children", label: "My Children", icon: Users },
          { href: "/parent/reports", label: "Progress Reports", icon: FileText },
        ]
      default:
        return []
    }
  }

  const roleLinks = getRoleSpecificLinks()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-2">
          <User className="h-4 w-4" />
          <span className="hidden md:inline">{profile.full_name || profile.email}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="px-2 py-1.5 text-sm font-medium">
          {profile.full_name || profile.email}
          <div className="text-xs text-muted-foreground capitalize">{profile.role}</div>
        </div>
        <DropdownMenuSeparator />
        {roleLinks.map((link) => (
          <DropdownMenuItem key={link.href} asChild>
            <Link href={link.href} className="flex items-center gap-2">
              <link.icon className="h-4 w-4" />
              {link.label}
            </Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleSignOut} className="flex items-center gap-2 text-red-600">
          <LogOut className="h-4 w-4" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
