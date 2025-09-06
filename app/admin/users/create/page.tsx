"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function CreateUserPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
    role: "",
    studentId: "",
    teacherId: "",
    subject: "",
    classLevel: "",
    dateOfBirth: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const supabase = createClient()

    try {
      // Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
            role: formData.role,
          },
        },
      })

      if (authError) throw authError

      if (authData.user) {
        // Create role-specific record
        if (formData.role === "student") {
          const { error: studentError } = await supabase.from("students").insert({
            user_id: authData.user.id,
            student_id: formData.studentId,
            full_name: formData.fullName,
            class_level: formData.classLevel,
            date_of_birth: formData.dateOfBirth || null,
          })
          if (studentError) throw studentError
        } else if (formData.role === "teacher") {
          const { error: teacherError } = await supabase.from("teachers").insert({
            user_id: authData.user.id,
            teacher_id: formData.teacherId,
            full_name: formData.fullName,
            subject: formData.subject,
            classes: [formData.classLevel],
          })
          if (teacherError) throw teacherError
        }

        router.push("/admin/users")
      }
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/admin/dashboard" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Create New User</CardTitle>
            <CardDescription>Add a new teacher, student, or parent to the system</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Basic Information</h3>

                <div className="grid gap-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="role">Role</Label>
                  <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="teacher">Teacher</SelectItem>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="parent">Parent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Role-specific fields */}
              {formData.role === "student" && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Student Information</h3>

                  <div className="grid gap-2">
                    <Label htmlFor="studentId">Student ID</Label>
                    <Input
                      id="studentId"
                      required
                      value={formData.studentId}
                      onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="classLevel">Class Level</Label>
                    <Select
                      value={formData.classLevel}
                      onValueChange={(value) => setFormData({ ...formData, classLevel: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select class" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="JSS1">JSS 1</SelectItem>
                        <SelectItem value="JSS2">JSS 2</SelectItem>
                        <SelectItem value="JSS3">JSS 3</SelectItem>
                        <SelectItem value="SS1">SS 1</SelectItem>
                        <SelectItem value="SS2">SS 2</SelectItem>
                        <SelectItem value="SS3">SS 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                    />
                  </div>
                </div>
              )}

              {formData.role === "teacher" && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Teacher Information</h3>

                  <div className="grid gap-2">
                    <Label htmlFor="teacherId">Teacher ID</Label>
                    <Input
                      id="teacherId"
                      required
                      value={formData.teacherId}
                      onChange={(e) => setFormData({ ...formData, teacherId: e.target.value })}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="subject">Primary Subject</Label>
                    <Input
                      id="subject"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="classLevel">Assigned Class</Label>
                    <Select
                      value={formData.classLevel}
                      onValueChange={(value) => setFormData({ ...formData, classLevel: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select class" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="JSS1">JSS 1</SelectItem>
                        <SelectItem value="JSS2">JSS 2</SelectItem>
                        <SelectItem value="JSS3">JSS 3</SelectItem>
                        <SelectItem value="SS1">SS 1</SelectItem>
                        <SelectItem value="SS2">SS 2</SelectItem>
                        <SelectItem value="SS3">SS 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {error && <p className="text-sm text-red-500">{error}</p>}

              <div className="flex gap-4">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Creating..." : "Create User"}
                </Button>
                <Link href="/admin/dashboard">
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
