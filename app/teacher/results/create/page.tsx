"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function CreateResultPage() {
  const [formData, setFormData] = useState({
    studentId: "",
    subjectId: "",
    term: "",
    academicYear: "2024/2025",
    testScore: "",
    examScore: "",
    grade: "",
    remarks: "",
  })
  const [students, setStudents] = useState<any[]>([])
  const [subjects, setSubjects] = useState<any[]>([])
  const [teacher, setTeacher] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  const preselectedStudent = searchParams.get("student")

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    const supabase = createClient()

    try {
      // Get current user and teacher data
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      const { data: teacherData } = await supabase.from("teachers").select("*").eq("user_id", user.id).single()

      if (teacherData) {
        setTeacher(teacherData)

        // Get students in teacher's classes
        const { data: studentsData } = await supabase
          .from("students")
          .select("*")
          .in("class_level", teacherData.classes || [])
          .order("full_name")

        setStudents(studentsData || [])

        // Preselect student if provided
        if (preselectedStudent) {
          setFormData((prev) => ({ ...prev, studentId: preselectedStudent }))
        }
      }

      // Get subjects
      const { data: subjectsData } = await supabase.from("subjects").select("*").order("name")
      setSubjects(subjectsData || [])
    } catch (error) {
      console.error("Error loading data:", error)
    }
  }

  const calculateGrade = (total: number) => {
    if (total >= 90) return "A"
    if (total >= 80) return "B"
    if (total >= 70) return "C"
    if (total >= 60) return "D"
    if (total >= 50) return "E"
    return "F"
  }

  const handleScoreChange = (field: "testScore" | "examScore", value: string) => {
    const newFormData = { ...formData, [field]: value }
    setFormData(newFormData)

    // Auto-calculate grade
    const testScore = Number.parseFloat(newFormData.testScore) || 0
    const examScore = Number.parseFloat(newFormData.examScore) || 0
    const total = testScore + examScore

    if (total > 0) {
      setFormData((prev) => ({ ...prev, grade: calculateGrade(total) }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const supabase = createClient()

    try {
      const { error } = await supabase.from("results").insert({
        student_id: formData.studentId,
        subject_id: formData.subjectId,
        teacher_id: teacher.id,
        term: formData.term,
        academic_year: formData.academicYear,
        test_score: Number.parseFloat(formData.testScore) || 0,
        exam_score: Number.parseFloat(formData.examScore) || 0,
        grade: formData.grade,
        remarks: formData.remarks || null,
      })

      if (error) throw error

      router.push("/teacher/results")
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
          <Link href="/teacher/results" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Results
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Add New Result</CardTitle>
            <CardDescription>Enter student test and exam scores</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="student">Student</Label>
                  <Select
                    value={formData.studentId}
                    onValueChange={(value) => setFormData({ ...formData, studentId: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select student" />
                    </SelectTrigger>
                    <SelectContent>
                      {students.map((student) => (
                        <SelectItem key={student.id} value={student.id}>
                          {student.full_name} ({student.student_id})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Select
                    value={formData.subjectId}
                    onValueChange={(value) => setFormData({ ...formData, subjectId: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.map((subject) => (
                        <SelectItem key={subject.id} value={subject.id}>
                          {subject.name} ({subject.code})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="term">Term</Label>
                  <Select value={formData.term} onValueChange={(value) => setFormData({ ...formData, term: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select term" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="first">First Term</SelectItem>
                      <SelectItem value="second">Second Term</SelectItem>
                      <SelectItem value="third">Third Term</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="academicYear">Academic Year</Label>
                  <Input
                    id="academicYear"
                    value={formData.academicYear}
                    onChange={(e) => setFormData({ ...formData, academicYear: e.target.value })}
                    placeholder="2024/2025"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="testScore">Test Score (out of 40)</Label>
                  <Input
                    id="testScore"
                    type="number"
                    min="0"
                    max="40"
                    step="0.01"
                    value={formData.testScore}
                    onChange={(e) => handleScoreChange("testScore", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="examScore">Exam Score (out of 60)</Label>
                  <Input
                    id="examScore"
                    type="number"
                    min="0"
                    max="60"
                    step="0.01"
                    value={formData.examScore}
                    onChange={(e) => handleScoreChange("examScore", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="grade">Grade</Label>
                  <Input
                    id="grade"
                    value={formData.grade}
                    onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                    placeholder="Auto-calculated"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="remarks">Remarks (Optional)</Label>
                <Textarea
                  id="remarks"
                  value={formData.remarks}
                  onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
                  placeholder="Additional comments about the student's performance"
                  rows={3}
                />
              </div>

              {error && <p className="text-sm text-red-500">{error}</p>}

              <div className="flex gap-4">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Saving..." : "Save Result"}
                </Button>
                <Link href="/teacher/results">
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
