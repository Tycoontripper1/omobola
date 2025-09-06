import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Plus } from "lucide-react"
import Link from "next/link"

export default async function ManageUsersPage() {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()
  if (error || !user) {
    redirect("/auth/login")
  }

  // Check if user is admin
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()

  if (!profile || profile.role !== "admin") {
    redirect("/auth/login")
  }

  // Get all users with their profiles
  const { data: profiles } = await supabase.from("profiles").select("*").order("created_at", { ascending: false })

  // Get students and teachers data
  const { data: students } = await supabase.from("students").select("*, profiles!inner(*)")

  const { data: teachers } = await supabase.from("teachers").select("*, profiles!inner(*)")

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <Link
              href="/admin/dashboard"
              className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-2"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Manage Users</h1>
            <p className="text-gray-600">View and manage all system users</p>
          </div>
          <Link href="/admin/users/create">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create New User
            </Button>
          </Link>
        </div>

        <div className="grid gap-6">
          {/* All Profiles */}
          <Card>
            <CardHeader>
              <CardTitle>All Users</CardTitle>
              <CardDescription>Complete list of system users</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {profiles?.map((profile) => (
                  <div key={profile.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">{profile.full_name || profile.email}</h3>
                      <p className="text-sm text-gray-600">{profile.email}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={profile.role === "admin" ? "default" : "secondary"}>{profile.role}</Badge>
                      <span className="text-sm text-gray-500">{new Date(profile.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
                {!profiles?.length && <p className="text-center text-gray-500 py-8">No users found</p>}
              </div>
            </CardContent>
          </Card>

          {/* Students */}
          <Card>
            <CardHeader>
              <CardTitle>Students</CardTitle>
              <CardDescription>Student records with class information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {students?.map((student) => (
                  <div key={student.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">{student.full_name}</h3>
                      <p className="text-sm text-gray-600">ID: {student.student_id}</p>
                      <p className="text-sm text-gray-600">{student.profiles.email}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{student.class_level}</Badge>
                      {student.date_of_birth && (
                        <span className="text-sm text-gray-500">
                          Born: {new Date(student.date_of_birth).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
                {!students?.length && <p className="text-center text-gray-500 py-8">No students found</p>}
              </div>
            </CardContent>
          </Card>

          {/* Teachers */}
          <Card>
            <CardHeader>
              <CardTitle>Teachers</CardTitle>
              <CardDescription>Teaching staff with subject assignments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teachers?.map((teacher) => (
                  <div key={teacher.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">{teacher.full_name}</h3>
                      <p className="text-sm text-gray-600">ID: {teacher.teacher_id}</p>
                      <p className="text-sm text-gray-600">{teacher.profiles.email}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{teacher.subject}</Badge>
                      <div className="text-sm text-gray-500">Classes: {teacher.classes?.join(", ") || "None"}</div>
                    </div>
                  </div>
                ))}
                {!teachers?.length && <p className="text-center text-gray-500 py-8">No teachers found</p>}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
