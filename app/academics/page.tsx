import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BookOpen,
  Users,
  Award,
  Calendar,
  Clock,
  GraduationCap,
  Microscope,
  Palette,
  Trophy,
  Globe,
} from "lucide-react"

export default function AcademicsPage() {
  const programs = [
    {
      id: "elementary",
      title: "Elementary School",
      grades: "Kindergarten - Grade 5",
      description:
        "Building strong foundations in literacy, numeracy, and social skills through engaging, age-appropriate curriculum.",
      image: "/placeholder.svg?height=400&width=600&text=Elementary+Classroom",
      subjects: ["Language Arts", "Mathematics", "Science", "Social Studies", "Art", "Music", "Physical Education"],
      highlights: [
        "Small class sizes (15-20 students)",
        "Individualized learning plans",
        "STEAM integration",
        "Character education program",
      ],
    },
    {
      id: "middle",
      title: "Middle School",
      grades: "Grades 6-8",
      description:
        "Developing critical thinking skills and preparing students for advanced studies through comprehensive curriculum.",
      image: "/placeholder.svg?height=400&width=600&text=Middle+School+Lab",
      subjects: [
        "Advanced Mathematics",
        "Science Labs",
        "Literature",
        "World History",
        "Foreign Languages",
        "Technology",
        "Arts",
      ],
      highlights: [
        "Advanced laboratory facilities",
        "Foreign language programs",
        "Leadership development",
        "Extracurricular activities",
      ],
    },
    {
      id: "high",
      title: "High School",
      grades: "Grades 9-12",
      description:
        "College preparation and career readiness through rigorous academics and advanced placement courses.",
      image: "/placeholder.svg?height=400&width=600&text=High+School+Students",
      subjects: [
        "AP Courses",
        "Advanced Sciences",
        "College Prep Math",
        "Literature & Composition",
        "Social Sciences",
        "Fine Arts",
      ],
      highlights: [
        "15+ AP courses available",
        "College counseling program",
        "Internship opportunities",
        "National Honor Society",
      ],
    },
  ]

  const specialPrograms = [
    {
      icon: Microscope,
      title: "STEAM Program",
      description: "Science, Technology, Engineering, Arts, and Mathematics integration across all grade levels.",
    },
    {
      icon: Globe,
      title: "Global Studies",
      description: "International perspective through language learning, cultural exchange, and global citizenship.",
    },
    {
      icon: Palette,
      title: "Arts Academy",
      description: "Comprehensive arts education including visual arts, music, theater, and digital media.",
    },
    {
      icon: Trophy,
      title: "Athletics Program",
      description: "Competitive sports teams and physical education promoting teamwork and healthy living.",
    },
    {
      icon: BookOpen,
      title: "Advanced Placement",
      description: "College-level courses and examinations for high school students seeking academic challenge.",
    },
    {
      icon: Users,
      title: "Leadership Development",
      description: "Student government, peer mentoring, and community service opportunities.",
    },
  ]

  const achievements = [
    { metric: "98%", label: "College Acceptance Rate" },
    { metric: "4.2", label: "Average GPA" },
    { metric: "1,450", label: "Average SAT Score" },
    { metric: "25+", label: "College Partnerships" },
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            <Badge variant="secondary" className="w-fit mx-auto">
              Academic Excellence
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-balance leading-tight">
              Comprehensive <span className="text-primary">Academic Programs</span> for Every Student
            </h1>
            <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
              From kindergarten through high school graduation, our rigorous curriculum prepares students for success in
              college, career, and life.
            </p>
          </div>
        </div>
      </section>

      {/* Academic Achievement Stats */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center space-y-2">
                <div className="text-4xl font-bold text-primary">{achievement.metric}</div>
                <div className="text-muted-foreground">{achievement.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Academic Programs */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-balance">Academic Programs by Level</h2>
            <p className="text-xl text-muted-foreground text-pretty max-w-3xl mx-auto">
              Age-appropriate curriculum designed to challenge and inspire students at every stage of their educational
              journey.
            </p>
          </div>

          <Tabs defaultValue="elementary" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="elementary">Elementary</TabsTrigger>
              <TabsTrigger value="middle">Middle School</TabsTrigger>
              <TabsTrigger value="high">High School</TabsTrigger>
            </TabsList>

            {programs.map((program) => (
              <TabsContent key={program.id} value={program.id} className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className="space-y-6">
                    <div>
                      <Badge variant="outline" className="mb-4">
                        {program.grades}
                      </Badge>
                      <h3 className="text-3xl font-bold mb-4">{program.title}</h3>
                      <p className="text-lg text-muted-foreground leading-relaxed">{program.description}</p>
                    </div>

                    <div>
                      <h4 className="text-xl font-semibold mb-3">Core Subjects</h4>
                      <div className="flex flex-wrap gap-2">
                        {program.subjects.map((subject, index) => (
                          <Badge key={index} variant="secondary">
                            {subject}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xl font-semibold mb-3">Program Highlights</h4>
                      <ul className="space-y-2">
                        {program.highlights.map((highlight, index) => (
                          <li key={index} className="flex items-center space-x-2">
                            <Award className="h-4 w-4 text-primary flex-shrink-0" />
                            <span className="text-muted-foreground">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="relative">
                    <Image
                      src={program.image || "/placeholder.svg"}
                      alt={program.title}
                      width={600}
                      height={400}
                      className="rounded-2xl shadow-xl"
                    />
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Special Programs */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-balance">Special Programs & Enrichment</h2>
            <p className="text-xl text-muted-foreground text-pretty max-w-3xl mx-auto">
              Beyond core academics, we offer specialized programs to develop students' unique talents and interests.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {specialPrograms.map((program, index) => (
              <Card key={index} className="border-2 hover:border-primary/20 transition-colors">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <program.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{program.title}</CardTitle>
                  <CardDescription className="leading-relaxed">{program.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Academic Calendar */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold text-balance">Academic Calendar & Schedule</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our academic year is carefully structured to maximize learning opportunities while providing appropriate
                breaks for rest and enrichment activities.
              </p>

              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Academic Year</h4>
                    <p className="text-muted-foreground">August - June (180 instructional days)</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                    <Clock className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">School Hours</h4>
                    <p className="text-muted-foreground">8:00 AM - 3:30 PM (Monday - Friday)</p>
                  </div>
                </div>
              </div>

              <Button asChild size="lg" className="w-fit">
                <Link href="/information">
                  View Full Calendar
                  <Calendar className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>

            <Card className="p-6">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <GraduationCap className="h-6 w-6 text-primary" />
                  <span>Upcoming Events</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-semibold">Parent-Teacher Conferences</h4>
                  <p className="text-sm text-muted-foreground">March 15-16, 2024</p>
                </div>
                <div className="border-l-4 border-secondary pl-4">
                  <h4 className="font-semibold">Science Fair</h4>
                  <p className="text-sm text-muted-foreground">April 8, 2024</p>
                </div>
                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-semibold">Spring Break</h4>
                  <p className="text-sm text-muted-foreground">April 22-26, 2024</p>
                </div>
                <div className="border-l-4 border-secondary pl-4">
                  <h4 className="font-semibold">Graduation Ceremony</h4>
                  <p className="text-sm text-muted-foreground">June 12, 2024</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
