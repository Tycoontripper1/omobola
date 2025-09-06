import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Calendar, FileText, Trophy, LogOut, GraduationCap } from "lucide-react"
import Link from "next/link"

export default async function StudentDashboard() {
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

  // Get student's results
  const { data: results } = await supabase
    .from("results")
    .select(
      `
      *,
      subjects!inner(name, code)
    `,
    )
    .eq("student_id", student.id)
    .order("created_at", { ascending: false })

  // Calculate GPA and stats
  const totalResults = results?.length || 0
  const averageScore = results?.length
    ? results.reduce((sum, result) => sum + (result.total_score || 0), 0) / results.length
    : 0
  const gpa =
    averageScore >= 90 ? 4.0 : averageScore >= 80 ? 3.0 : averageScore >= 70 ? 2.0 : averageScore >= 60 ? 1.0 : 0.0

  const recentResults = results?.slice(0, 4) || []

  const quickStats = [
    { title: "Current GPA", value: gpa.toFixed(1), icon: GraduationCap, color: "text-primary" },
    { title: "Total Results", value: totalResults.toString(), icon: FileText, color: "text-orange-600" },
    { title: "Average Score", value: `${averageScore.toFixed(1)}%`, icon: BookOpen, color: "text-green-600" },
    { title: "Class Level", value: student.class_level, icon: Trophy, color: "text-secondary" },
  ]

  const upcomingAssignments = [
    { subject: "Mathematics", assignment: "Chapter 8 Test", dueDate: "March 18", priority: "high" },
    { subject: "English", assignment: "Book Report", dueDate: "March 20", priority: "medium" },
    { subject: "Science", assignment: "Lab Worksheet", dueDate: "March 22", priority: "low" },
  ]

  // Calculate subject progress from results
  const subjectProgress =
    results?.reduce((acc: any[], result) => {
      const existing = acc.find((item) => item.subject === result.subjects.name)
      if (existing) {
        existing.scores.push(result.total_score || 0)
        existing.average =
          existing.scores.reduce((sum: number, score: number) => sum + score, 0) / existing.scores.length
      } else {
        acc.push({
          subject: result.subjects.name,
          scores: [result.total_score || 0],
          average: result.total_score || 0,
          grade: result.grade || "N/A",
        })
      }
      return acc
    }, []) || []

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-secondary text-secondary-foreground p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Student Dashboard</h1>
            <p className="opacity-90">Welcome back, {student.full_name}</p>
          </div>
          <form action="/auth/signout" method="post">
            <Button variant="secondary" size="sm" className="bg-secondary-foreground text-secondary">
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </form>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickStats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Results */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Trophy className="h-5 w-5" />
                <span>Recent Results</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentResults.map((result, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium">{result.subjects.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {result.term} Term {result.academic_year}
                    </p>
                    <p className="text-xs text-muted-foreground">Score: {result.total_score}/100</p>
                  </div>
                  <Badge variant={result.grade === "A" ? "default" : result.grade === "B" ? "secondary" : "outline"}>
                    {result.grade || "N/A"}
                  </Badge>
                </div>
              ))}
              {!recentResults.length && (
                <p className="text-center text-muted-foreground py-4">No results available yet</p>
              )}
            </CardContent>
          </Card>

          {/* Upcoming Assignments */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Upcoming Assignments</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingAssignments.map((assignment, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium">{assignment.subject}</p>
                    <p className="text-sm text-muted-foreground">{assignment.assignment}</p>
                    <p className="text-xs text-muted-foreground">Due: {assignment.dueDate}</p>
                  </div>
                  <Badge
                    variant={
                      assignment.priority === "high"
                        ? "destructive"
                        : assignment.priority === "medium"
                          ? "default"
                          : "secondary"
                    }
                  >
                    {assignment.priority}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Subject Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5" />
              <span>Subject Performance</span>
            </CardTitle>
            <CardDescription>Your average performance in each subject</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {subjectProgress.map((subject, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{subject.subject}</span>
                  <Badge variant="outline">{subject.grade}</Badge>
                </div>
                <Progress value={subject.average} className="h-2" />
                <p className="text-sm text-muted-foreground">{subject.average.toFixed(1)}% Average</p>
              </div>
            ))}
            {!subjectProgress.length && (
              <p className="text-center text-muted-foreground py-4">No subject data available yet</p>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Access your most used student resources</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/student/results">
                <Button variant="outline" className="h-20 flex-col bg-transparent w-full">
                  <FileText className="h-6 w-6 mb-2" />
                  View Results
                </Button>
              </Link>
              <Button variant="outline" className="h-20 flex-col bg-transparent">
                <BookOpen className="h-6 w-6 mb-2" />
                Library
              </Button>
              <Button variant="outline" className="h-20 flex-col bg-transparent">
                <Calendar className="h-6 w-6 mb-2" />
                Schedule
              </Button>
              <Button variant="outline" className="h-20 flex-col bg-transparent">
                <Trophy className="h-6 w-6 mb-2" />
                Achievements
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
