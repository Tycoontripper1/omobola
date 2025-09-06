import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Users, Award, Calendar, ArrowRight, Star, GraduationCap, Heart, Target } from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="w-fit">
                  Excellence in Education Since 1985
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold text-balance leading-tight">
                  Welcome to <span className="text-primary">Omobola School</span> – Building Future Leaders
                </h1>
                <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
                  Empowering students through innovative education, character development, and community engagement.
                  Join our family of learners and discover your potential.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="text-lg px-8">
                  <Link href="/academics">
                    Explore Academics
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-lg px-8 bg-transparent">
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/placeholder.svg?height=600&width=800&text=Students+Learning+Together"
                alt="Students learning together at Omobola School"
                width={800}
                height={600}
                className="rounded-2xl shadow-2xl"
                priority
              />
              <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground p-6 rounded-xl shadow-lg">
                <div className="flex items-center space-x-3">
                  <Star className="h-8 w-8 fill-current" />
                  <div>
                    <div className="text-2xl font-bold">4.9/5</div>
                    <div className="text-sm opacity-90">Parent Rating</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-primary">1,200+</div>
              <div className="text-muted-foreground">Students</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-primary">95%</div>
              <div className="text-muted-foreground">Graduation Rate</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-primary">150+</div>
              <div className="text-muted-foreground">Faculty Members</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-primary">40+</div>
              <div className="text-muted-foreground">Years of Excellence</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-balance">Why Choose Omobola School?</h2>
            <p className="text-xl text-muted-foreground text-pretty max-w-3xl mx-auto">
              We provide a comprehensive educational experience that nurtures academic excellence, character
              development, and lifelong learning skills.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-primary/20 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Academic Excellence</CardTitle>
                <CardDescription>
                  Rigorous curriculum designed to challenge and inspire students to reach their full potential.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary/20 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-secondary" />
                </div>
                <CardTitle>Character Development</CardTitle>
                <CardDescription>
                  Building strong moral foundations and leadership skills for responsible citizenship.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary/20 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Community Engagement</CardTitle>
                <CardDescription>
                  Active participation in community service and social responsibility programs.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary/20 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <GraduationCap className="h-6 w-6 text-secondary" />
                </div>
                <CardTitle>Expert Faculty</CardTitle>
                <CardDescription>
                  Dedicated teachers with advanced degrees and passion for student success.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary/20 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Personalized Learning</CardTitle>
                <CardDescription>
                  Individualized attention and support to help every student achieve their goals.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary/20 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-secondary" />
                </div>
                <CardTitle>Achievement Recognition</CardTitle>
                <CardDescription>
                  Celebrating student accomplishments in academics, arts, sports, and leadership.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Programs Preview */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-balance">Our Academic Programs</h2>
            <p className="text-xl text-muted-foreground text-pretty max-w-3xl mx-auto">
              Comprehensive education from early childhood through high school graduation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="overflow-hidden">
              <div className="aspect-video relative">
                <Image
                  src="/placeholder.svg?height=200&width=400&text=Elementary+Students"
                  alt="Elementary students in classroom"
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle>Elementary School</CardTitle>
                <CardDescription>
                  Building strong foundations in literacy, numeracy, and social skills for grades K-5.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" className="w-full bg-transparent">
                  <Link href="/academics#elementary">Learn More</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <div className="aspect-video relative">
                <Image
                  src="/placeholder.svg?height=200&width=400&text=Middle+School+Science"
                  alt="Middle school science class"
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle>Middle School</CardTitle>
                <CardDescription>
                  Developing critical thinking and preparing for advanced studies in grades 6-8.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" className="w-full bg-transparent">
                  <Link href="/academics#middle">Learn More</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <div className="aspect-video relative">
                <Image
                  src="/placeholder.svg?height=200&width=400&text=High+School+Graduation"
                  alt="High school graduation ceremony"
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle>High School</CardTitle>
                <CardDescription>
                  College preparation and career readiness for grades 9-12 with advanced coursework.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" className="w-full bg-transparent">
                  <Link href="/academics#high">Learn More</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-balance">Ready to Join Our School Community?</h2>
          <p className="text-xl opacity-90 text-pretty">
            Take the first step towards your child's bright future. Contact us today to learn more about enrollment
            opportunities and schedule a campus visit.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="text-lg px-8">
              <Link href="/contact">
                Schedule a Visit
                <Calendar className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-lg px-8 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
            >
              <Link href="/information">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
