import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, BookOpen, Heart, Target, Globe, Lightbulb, Shield } from "lucide-react"

export default function AboutPage() {
  const values = [
    {
      icon: BookOpen,
      title: "Academic Excellence",
      description:
        "We maintain the highest standards of education, challenging students to reach their full potential through rigorous and engaging curriculum.",
    },
    {
      icon: Heart,
      title: "Character Development",
      description:
        "Building strong moral foundations, integrity, and leadership skills that prepare students for responsible citizenship.",
    },
    {
      icon: Users,
      title: "Community Partnership",
      description:
        "Fostering strong relationships between school, families, and the broader community to support student success.",
    },
    {
      icon: Globe,
      title: "Global Perspective",
      description:
        "Preparing students to be global citizens with cultural awareness and understanding of diverse perspectives.",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description:
        "Embracing new technologies and teaching methods to enhance learning and prepare students for the future.",
    },
    {
      icon: Shield,
      title: "Safe Environment",
      description:
        "Providing a secure, nurturing environment where all students feel valued, respected, and supported.",
    },
  ]

  const leadership = [
    {
      name: "Dr. Sarah Johnson",
      position: "Principal",
      image: "/placeholder.svg?height=300&width=300&text=Dr.+Sarah+Johnson",
      bio: "With over 20 years in education, Dr. Johnson brings innovative leadership and a passion for student success to Omobola School.",
    },
    {
      name: "Mr. Michael Chen",
      position: "Vice Principal",
      image: "/placeholder.svg?height=300&width=300&text=Mr.+Michael+Chen",
      bio: "Mr. Chen oversees curriculum development and ensures our academic programs meet the highest standards of excellence.",
    },
    {
      name: "Ms. Emily Rodriguez",
      position: "Dean of Students",
      image: "/placeholder.svg?height=300&width=300&text=Ms.+Emily+Rodriguez",
      bio: "Ms. Rodriguez focuses on student welfare, character development, and creating a positive school culture.",
    },
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge variant="secondary" className="w-fit">
                About Omobola School
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-bold text-balance leading-tight">
                Our Story of <span className="text-primary">Excellence</span> and{" "}
                <span className="text-secondary">Innovation</span>
              </h1>
              <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
                For over four decades, Omobola School has been dedicated to nurturing young minds, building character,
                and preparing students for success in an ever-changing world.
              </p>
            </div>
            <div className="relative">
              <Image
                src="/placeholder.svg?height=500&width=600&text=School+Campus+Building"
                alt="Omobola School campus"
                width={600}
                height={500}
                className="rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card className="border-2 border-primary/20">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center leading-relaxed">
                  To provide exceptional education that empowers students to become confident, compassionate, and
                  capable leaders who contribute positively to their communities and the world.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-secondary/20">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lightbulb className="h-8 w-8 text-secondary" />
                </div>
                <CardTitle className="text-2xl">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center leading-relaxed">
                  To be recognized as a premier educational institution that inspires lifelong learning, fosters
                  innovation, and develops future leaders who make a meaningful difference in the world.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-balance">Our Core Values</h2>
            <p className="text-xl text-muted-foreground text-pretty max-w-3xl mx-auto">
              These fundamental principles guide everything we do and shape the character of our school community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="border-2 hover:border-primary/20 transition-colors">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                  <CardDescription className="leading-relaxed">{value.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-balance">Leadership Team</h2>
            <p className="text-xl text-muted-foreground text-pretty max-w-3xl mx-auto">
              Meet the dedicated leaders who guide our school community toward excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {leadership.map((leader, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="aspect-square relative">
                  <Image src={leader.image || "/placeholder.svg"} alt={leader.name} fill className="object-cover" />
                </div>
                <CardHeader className="text-center">
                  <CardTitle className="text-xl">{leader.name}</CardTitle>
                  <Badge variant="secondary" className="w-fit mx-auto">
                    {leader.position}
                  </Badge>
                  <CardDescription className="leading-relaxed">{leader.bio}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* History Timeline */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-balance">Our Journey</h2>
            <p className="text-xl text-muted-foreground text-pretty">
              Four decades of educational excellence and community impact.
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex items-center space-x-6">
              <div className="flex-shrink-0 w-20 h-20 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold">1985</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold">Foundation</h3>
                <p className="text-muted-foreground">
                  Omobola School was established with a vision to provide quality education to the community.
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="flex-shrink-0 w-20 h-20 bg-secondary rounded-full flex items-center justify-center">
                <span className="text-secondary-foreground font-bold">1995</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold">Expansion</h3>
                <p className="text-muted-foreground">
                  Added middle school program and expanded facilities to accommodate growing enrollment.
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="flex-shrink-0 w-20 h-20 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold">2005</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold">Innovation</h3>
                <p className="text-muted-foreground">
                  Introduced technology integration and advanced placement programs.
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="flex-shrink-0 w-20 h-20 bg-secondary rounded-full flex items-center justify-center">
                <span className="text-secondary-foreground font-bold">2024</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold">Modern Era</h3>
                <p className="text-muted-foreground">
                  Continuing to lead in educational excellence with state-of-the-art facilities and programs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
