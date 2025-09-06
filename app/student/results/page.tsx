import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Eye, Printer } from "lucide-react"
import Link from "next/link"

export default async function StudentResultsPage() {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()
  if (error || !user) {
    redirect("/auth/login")
  }

  // Get student profile
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()

  if (!profile || profile.role !== "student") {
    redirect("/auth/login")
  }

  // Get student data
  const { data: student } = await supabase.from("students").select("*").eq("user_id", user.id).single()

  if (!student) {
    redirect("/auth/login")
  }

  // Get all student results with subject and teacher info
  const { data: results } = await supabase
    .from("results")
    .select(
      `
      *,
      subjects!inner(name, code),
      teachers!inner(full_name)
    `,
    )
    .eq("student_id", student.id)
    .order("academic_year", { ascending: false })
    .order("term", { ascending: false })
    .order("created_at", { ascending: false })

  // Group results by academic year and term
  const groupedResults = results?.reduce((acc: any, result) => {
    const key = `${result.academic_year}-${result.term}`
    if (!acc[key]) {
      acc[key] = {
        academic_year: result.academic_year,
        term: result.term,
        results: [],
      }
    }
    acc[key].results.push(result)
    return acc
  }, {})

  const termGroups = Object.values(groupedResults || {}) as any[]

  // Calculate overall statistics
  const totalResults = results?.length || 0
  const averageScore = results?.length
    ? results.reduce((sum, result) => sum + (result.total_score || 0), 0) / results.length
    : 0
  const highestScore = results?.length ? Math.max(...results.map((r) => r.total_score || 0)) : 0
  const lowestScore = results?.length ? Math.min(...results.map((r) => r.total_score || 0)) : 0

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            href="/dashboard/student"
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-2"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Results</h1>
              <p className="text-gray-600">
                {student.full_name} • {student.student_id} • {student.class_level}
              </p>
            </div>
            <Link href="/student/results/print">
              <Button>
                <Printer className="h-4 w-4 mr-2" />
                Print Report Card
              </Button>
            </Link>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Total Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalResults}</div>
              <p className="text-sm text-gray-600">Across all subjects</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Average Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{averageScore.toFixed(1)}%</div>
              <p className="text-sm text-gray-600">Overall performance</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Highest Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{highestScore}%</div>
              <p className="text-sm text-gray-600">Best performance</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Lowest Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{lowestScore}%</div>
              <p className="text-sm text-gray-600">Needs improvement</p>
            </CardContent>
          </Card>
        </div>

        {/* Results by Term */}
        <div className="space-y-6">
          {termGroups.map((termGroup, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="capitalize">
                      {termGroup.term} Term {termGroup.academic_year}
                    </CardTitle>
                    <CardDescription>
                      {termGroup.results.length} subjects • Average:{" "}
                      {(
                        termGroup.results.reduce((sum: number, r: any) => sum + (r.total_score || 0), 0) /
                        termGroup.results.length
                      ).toFixed(1)}
                      %
                    </CardDescription>
                  </div>
                  <Link href={`/student/results/term/${termGroup.academic_year}/${termGroup.term}`}>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {termGroup.results.map((result: any, resultIndex: number) => (
                    <div key={resultIndex} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-4">
                          <div>
                            <h3 className="font-medium">{result.subjects.name}</h3>
                            <p className="text-sm text-gray-600">Teacher: {result.teachers.full_name}</p>
                          </div>
                          <Badge variant="outline">{result.subjects.code}</Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <div className="font-medium">Total: {result.total_score}/100</div>
                          <div className="text-sm text-gray-600">
                            Test: {result.test_score} | Exam: {result.exam_score}
                          </div>
                        </div>
                        <Badge
                          variant={
                            result.grade === "A"
                              ? "default"
                              : result.grade === "B"
                                ? "secondary"
                                : result.grade === "C"
                                  ? "outline"
                                  : "destructive"
                          }
                          className="text-lg px-3 py-1"
                        >
                          {result.grade || "N/A"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}

          {!termGroups.length && (
            <Card>
              <CardContent className="text-center py-12">
                <p className="text-gray-500 text-lg">No results available yet</p>
                <p className="text-gray-400 text-sm mt-2">Your results will appear here once teachers enter them</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
