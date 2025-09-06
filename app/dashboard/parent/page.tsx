import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Users, Calendar, MessageSquare, TrendingUp, Clock, Bell, LogOut, Heart, BookOpen } from "lucide-react"
import Link from "next/link"

export default async function ParentDashboard() {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()
  if (error || !user) {
    redirect("/auth/login")
  }

  // Get parent profile
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()

  if (!profile || profile.role !== "parent") {
    redirect("/auth/login")
  }

  // Get children (students where parent_id matches this user's profile)
  const { data: children } = await supabase.from("students").select("*").eq("parent_id", user.id).order("full_name")

  // Get results for all children
  const childrenIds = children?.map((child) => child.id) || []
  const { data: results } = await supabase
    .from("results")
    .select(
      `
      *,
      students!inner(full_name, class_level),
      subjects!inner(name, code)
    `,
    )
    .in("student_id", childrenIds)
    .order("created_at", { ascending: false })

  // Calculate stats for each child
  const childrenWithStats = children?.map((child) => {
    const childResults = results?.filter((r) => r.student_id === child.id) || []
    const averageScore = childResults.length
      ? childResults.reduce((sum, result) => sum + (result.total_score || 0), 0) / childResults.length
      : 0
    const gpa =
      averageScore >= 90 ? 4.0 : averageScore >= 80 ? 3.0 : averageScore >= 70 ? 2.0 : averageScore >= 60 ? 1.0 : 0.0

    return {
      ...child,
      gpa: gpa.toFixed(1),
      averageScore: averageScore.toFixed(1),
      totalResults: childResults.length,
    }
  })

  const recentUpdates =
    results?.slice(0, 4).map((result) => ({
      child: result.students.full_name,
      update: `${result.subjects.name} result posted: ${result.grade || "Pending"}`,
      time: new Date(result.created_at).toLocaleDateString(),
      type: "grade",
    })) || []

  const upcomingEvents = [
    { event: "Parent-Teacher Conference", date: "March 15", time: "2:00 PM" },
    { event: "Science Fair", date: "April 8", time: "6:00 PM" },
    { event: "Spring Break", date: "April 22-26", time: "All Week" },
  ]

  // Group results by child and subject for academic progress
  const academicProgress =
    childrenWithStats?.map((child) => {
      const childResults = results?.filter((r) => r.student_id === child.id) || []
      const subjectProgress = childResults.reduce((acc: any[], result) => {
        const existing = acc.find((item) => item.name === result.subjects.name)
        if (existing) {
          existing.scores.push(result.total_score || 0)
          existing.average =
            existing.scores.reduce((sum: number, score: number) => sum + score, 0) / existing.scores.length
        } else {
          acc.push({
            name: result.subjects.name,
            scores: [result.total_score || 0],
            average: result.total_score || 0,
            grade: result.grade || "N/A",
          })
        }
        return acc
      }, [])

      return {
        child: child.full_name,
        subjects: subjectProgress.slice(0, 4), // Show top 4 subjects
      }
    }) || []

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Parent Dashboard</h1>
            <p className="opacity-90">Welcome back, {profile?.full_name || "Parent"}</p>
          </div>
          <form action="/auth/signout" method="post">
            <Button variant="secondary" size="sm">
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </form>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Children Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {childrenWithStats?.map((child, index) => (
            <Card key={index} className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Heart className="h-5 w-5 text-primary" />
                  <span>{child.full_name}</span>
                </CardTitle>
                <CardDescription>{child.class_level}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{child.gpa}</div>
                    <div className="text-sm text-muted-foreground">Current GPA</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-secondary">{child.averageScore}%</div>
                    <div className="text-sm text-muted-foreground">Average Score</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link href={`/parent/child/${child.id}/results`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      View Results
                    </Button>
                  </Link>
                  <Link href={`/parent/child/${child.id}/progress`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      Progress Report
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
          {!childrenWithStats?.length && (
            <Card className="col-span-full">
              <CardContent className="text-center py-8">
                <p className="text-muted-foreground">No children found in the system</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Contact the school administrator to link your children to your account
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Updates */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5" />
                <span>Recent Updates</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentUpdates.map((update, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium">
                      {update.child}: {update.update}
                    </p>
                    <p className="text-sm text-muted-foreground">{update.time}</p>
                  </div>
                  <Badge variant="outline">{update.type}</Badge>
                </div>
              ))}
              {!recentUpdates.length && <p className="text-center text-muted-foreground py-4">No recent updates</p>}
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Upcoming Events</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium">{event.event}</p>
                    <p className="text-sm text-muted-foreground">
                      {event.date} at {event.time}
                    </p>
                  </div>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Academic Progress */}
        <div className="space-y-6">
          {academicProgress.map((child, childIndex) => (
            <Card key={childIndex}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5" />
                  <span>{child.child} - Academic Progress</span>
                </CardTitle>
                <CardDescription>Current semester performance by subject</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {child.subjects.map((subject, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{subject.name}</span>
                        <Badge variant="outline">{subject.grade}</Badge>
                      </div>
                      <Progress value={subject.average} className="h-2" />
                      <p className="text-sm text-muted-foreground">{subject.average.toFixed(1)}% Average</p>
                    </div>
                  ))}
                  {!child.subjects.length && (
                    <p className="col-span-full text-center text-muted-foreground py-4">No results available yet</p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and communication tools</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-20 flex-col bg-transparent">
                <MessageSquare className="h-6 w-6 mb-2" />
                Messages
              </Button>
              <Button variant="outline" className="h-20 flex-col bg-transparent">
                <Calendar className="h-6 w-6 mb-2" />
                Schedule Meeting
              </Button>
              <Link href="/parent/reports" className="w-full">
                <Button variant="outline" className="h-20 flex-col bg-transparent w-full">
                  <TrendingUp className="h-6 w-6 mb-2" />
                  Progress Reports
                </Button>
              </Link>
              <Button variant="outline" className="h-20 flex-col bg-transparent">
                <Users className="h-6 w-6 mb-2" />
                School Events
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
