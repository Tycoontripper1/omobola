import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Plus, Edit, Eye } from "lucide-react"
import Link from "next/link"

export default async function TeacherResultsPage() {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()
  if (error || !user) {
    redirect("/auth/login")
  }

  // Get teacher profile
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()

  if (!profile || profile.role !== "teacher") {
    redirect("/auth/login")
  }

  // Get teacher data
  const { data: teacher } = await supabase.from("teachers").select("*").eq("user_id", user.id).single()

  if (!teacher) {
    redirect("/auth/login")
  }

  // Get students in teacher's classes
  const { data: students } = await supabase
    .from("students")
    .select("*")
    .in("class_level", teacher.classes || [])
    .order("full_name")

  // Get subjects
  const { data: subjects } = await supabase.from("subjects").select("*").order("name")

  // Get existing results for this teacher
  const { data: results } = await supabase
    .from("results")
    .select(
      `
      *,
      students!inner(full_name, student_id, class_level),
      subjects!inner(name, code)
    `,
    )
    .eq("teacher_id", teacher.id)
    .order("created_at", { ascending: false })

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            href="/dashboard/staff"
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-2"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Manage Student Results</h1>
              <p className="text-gray-600">
                Subject: {teacher.subject} | Classes: {teacher.classes?.join(", ") || "None"}
              </p>
            </div>
            <Link href="/teacher/results/create">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add New Result
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid gap-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">My Students</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{students?.length || 0}</div>
                <p className="text-sm text-gray-600">Students in your classes</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Total Results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{results?.length || 0}</div>
                <p className="text-sm text-gray-600">Results entered</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Pending Grades</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{results?.filter((r) => !r.grade).length || 0}</div>
                <p className="text-sm text-gray-600">Results without grades</p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Results */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Results</CardTitle>
              <CardDescription>Latest student results you've entered</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {results?.slice(0, 10).map((result) => (
                  <div key={result.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-4">
                        <div>
                          <h3 className="font-medium">{result.students.full_name}</h3>
                          <p className="text-sm text-gray-600">
                            {result.students.student_id} • {result.students.class_level}
                          </p>
                        </div>
                        <Badge variant="outline">{result.subjects.name}</Badge>
                        <Badge variant="secondary">{result.term} Term</Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="font-medium">Total: {result.total_score}/100</div>
                        <div className="text-sm text-gray-600">
                          Test: {result.test_score} | Exam: {result.exam_score}
                        </div>
                        {result.grade && <Badge variant="default">{result.grade}</Badge>}
                      </div>
                      <div className="flex gap-2">
                        <Link href={`/teacher/results/edit/${result.id}`}>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Link href={`/teacher/results/view/${result.id}`}>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
                {!results?.length && (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No results found</p>
                    <Link href="/teacher/results/create">
                      <Button className="mt-4">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Your First Result
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Students Overview */}
          <Card>
            <CardHeader>
              <CardTitle>My Students</CardTitle>
              <CardDescription>Students in your assigned classes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {students?.map((student) => (
                  <div key={student.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">{student.full_name}</h3>
                      <p className="text-sm text-gray-600">
                        {student.student_id} • {student.class_level}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Link href={`/teacher/results/create?student=${student.id}`}>
                        <Button variant="outline" size="sm">
                          Add Result
                        </Button>
                      </Link>
                      <Link href={`/teacher/results/student/${student.id}`}>
                        <Button variant="outline" size="sm">
                          View Results
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
                {!students?.length && <p className="text-center text-gray-500 py-8">No students found</p>}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
