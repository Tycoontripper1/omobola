"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Printer } from "lucide-react"
import Link from "next/link"

export default function PrintResultsPage() {
  const [student, setStudent] = useState<any>(null)
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    const supabase = createClient()

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      // Get student data
      const { data: studentData } = await supabase.from("students").select("*").eq("user_id", user.id).single()

      if (studentData) {
        setStudent(studentData)

        // Get results
        const { data: resultsData } = await supabase
          .from("results")
          .select(
            `
            *,
            subjects!inner(name, code),
            teachers!inner(full_name)
          `,
          )
          .eq("student_id", studentData.id)
          .order("academic_year", { ascending: false })
          .order("term", { ascending: false })

        setResults(resultsData || [])
      }
    } catch (error) {
      console.error("Error loading data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handlePrint = () => {
    window.print()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p>Loading results...</p>
      </div>
    )
  }

  // Group results by academic year and term
  const groupedResults = results.reduce((acc: any, result) => {
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

  const termGroups = Object.values(groupedResults) as any[]

  return (
    <div className="min-h-screen bg-white">
      {/* Print Controls - Hidden when printing */}
      <div className="no-print bg-gray-50 p-4 border-b">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/student/results" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Results
          </Link>
          <Button onClick={handlePrint}>
            <Printer className="h-4 w-4 mr-2" />
            Print Report Card
          </Button>
        </div>
      </div>

      {/* Printable Content */}
      <div className="max-w-4xl mx-auto p-8 print:p-4">
        {/* Header */}
        <div className="text-center mb-8 print:mb-6">
          <h1 className="text-3xl font-bold text-primaryRed mb-2">Omobola School</h1>
          <p className="text-lg text-gray-600 mb-4">Academic Report Card</p>
          <div className="border-t border-b border-gray-300 py-4">
            <h2 className="text-xl font-semibold">{student?.full_name}</h2>
            <p className="text-gray-600">
              Student ID: {student?.student_id} | Class: {student?.class_level}
            </p>
          </div>
        </div>

        {/* Results by Term */}
        <div className="space-y-8 print:space-y-6">
          {termGroups.map((termGroup, index) => {
            const termAverage =
              termGroup.results.reduce((sum: number, r: any) => sum + (r.total_score || 0), 0) /
              termGroup.results.length

            return (
              <div key={index} className="break-inside-avoid">
                <div className="bg-gray-50 p-4 rounded-lg mb-4 print:bg-gray-100">
                  <h3 className="text-lg font-semibold capitalize">
                    {termGroup.term} Term {termGroup.academic_year}
                  </h3>
                  <p className="text-gray-600">
                    {termGroup.results.length} subjects • Average: {termAverage.toFixed(1)}%
                  </p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-300 p-3 text-left">Subject</th>
                        <th className="border border-gray-300 p-3 text-center">Test Score</th>
                        <th className="border border-gray-300 p-3 text-center">Exam Score</th>
                        <th className="border border-gray-300 p-3 text-center">Total</th>
                        <th className="border border-gray-300 p-3 text-center">Grade</th>
                        <th className="border border-gray-300 p-3 text-left">Remarks</th>
                      </tr>
                    </thead>
                    <tbody>
                      {termGroup.results.map((result: any, resultIndex: number) => (
                        <tr key={resultIndex}>
                          <td className="border border-gray-300 p-3">
                            <div>
                              <div className="font-medium">{result.subjects.name}</div>
                              <div className="text-sm text-gray-600">{result.subjects.code}</div>
                            </div>
                          </td>
                          <td className="border border-gray-300 p-3 text-center">{result.test_score}/40</td>
                          <td className="border border-gray-300 p-3 text-center">{result.exam_score}/60</td>
                          <td className="border border-gray-300 p-3 text-center font-medium">
                            {result.total_score}/100
                          </td>
                          <td className="border border-gray-300 p-3 text-center">
                            <span
                              className={`inline-block px-2 py-1 rounded text-sm font-medium ${
                                result.grade === "A"
                                  ? "bg-green-100 text-green-800"
                                  : result.grade === "B"
                                    ? "bg-blue-100 text-blue-800"
                                    : result.grade === "C"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-red-100 text-red-800"
                              }`}
                            >
                              {result.grade || "N/A"}
                            </span>
                          </td>
                          <td className="border border-gray-300 p-3 text-sm">{result.remarks || "-"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )
          })}
        </div>

        {/* Footer */}
        <div className="mt-12 print:mt-8 text-center text-sm text-gray-600">
          <p>Generated on {new Date().toLocaleDateString()}</p>
          <p className="mt-2">Omobola School - Building Future Leaders</p>
        </div>
      </div>

      {/* Print Styles */}
      <style jsx>{`
        @media print {
          .no-print {
            display: none !important;
          }
          
          body {
            -webkit-print-color-adjust: exact;
            color-adjust: exact;
          }
          
          .break-inside-avoid {
            break-inside: avoid;
          }
        }
      `}</style>
    </div>
  )
}
