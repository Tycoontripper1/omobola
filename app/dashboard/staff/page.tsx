import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, BookOpen, Calendar, MessageSquare, FileText, Clock, Bell, LogOut } from "lucide-react"
import Link from "next/link"

export default async function StaffDashboard() {
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

  // Get teacher's students count
  const { count: studentsCount } = await supabase
    .from("students")
    .select("*", { count: "exact", head: true })
    .in("class_level", teacher?.classes || [])

  // Get pending results count (results without grades)
  const { count: pendingResults } = await supabase
    .from("results")
    .select("*", { count: "exact", head: true })
    .eq("teacher_id", teacher?.id)
    .is("grade", null)

  const quickStats = [
    { title: "My Classes", value: teacher?.classes?.length || 0, icon: BookOpen, color: "text-primary" },
    { title: "Total Students", value: studentsCount || 0, icon: Users, color: "text-secondary" },
    { title: "Pending Grades", value: pendingResults || 0, icon: FileText, color: "text-orange-600" },
    { title: "Messages", value: "0", icon: MessageSquare, color: "text-green-600" },
  ]

  const recentActivities = [
    { action: "Grade submitted for Math 101", time: "2 hours ago", type: "grade" },
    { action: "New message from parent", time: "4 hours ago", type: "message" },
    { action: "Attendance recorded for Period 3", time: "1 day ago", type: "attendance" },
    { action: "Lesson plan updated", time: "2 days ago", type: "lesson" },
  ]

  const upcomingEvents = [
    { event: "Parent-Teacher Conference", date: "March 15", time: "2:00 PM" },
    { event: "Faculty Meeting", date: "March 18", time: "3:30 PM" },
    { event: "Science Fair Judging", date: "April 8", time: "9:00 AM" },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Staff Dashboard</h1>
            <p className="opacity-90">Welcome back, {teacher?.full_name || "Teacher"}</p>
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
          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span>Recent Activities</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.time}</p>
                  </div>
                  <Badge variant="outline">{activity.type}</Badge>
                </div>
              ))}
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
                  <Bell className="h-4 w-4 text-muted-foreground" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and tools for staff members</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/teacher/results">
                <Button variant="outline" className="h-20 flex-col bg-transparent w-full">
                  <BookOpen className="h-6 w-6 mb-2" />
                  Manage Results
                </Button>
              </Link>
              <Button variant="outline" className="h-20 flex-col bg-transparent">
                <Users className="h-6 w-6 mb-2" />
                Attendance
              </Button>
              <Button variant="outline" className="h-20 flex-col bg-transparent">
                <FileText className="h-6 w-6 mb-2" />
                Lesson Plans
              </Button>
              <Button variant="outline" className="h-20 flex-col bg-transparent">
                <MessageSquare className="h-6 w-6 mb-2" />
                Messages
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
