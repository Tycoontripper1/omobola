import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Head from "next/head";
import {
  Calendar,
  DollarSign,
  FileText,
  Users,
  BookOpen,
  Shield,
  Bus,
  Utensils,
  Heart,
  Download,
} from "lucide-react";

export default function InformationPage() {
  const admissionSteps = [
    {
      step: 1,
      title: "Submit Application",
      description:
        "Complete our online application form with required documents.",
    },
    {
      step: 2,
      title: "Schedule Visit",
      description: "Tour our campus and meet with our admissions team.",
    },
    {
      step: 3,
      title: "Assessment",
      description: "Age-appropriate academic and social readiness evaluation.",
    },
    {
      step: 4,
      title: "Interview",
      description: "Meet with school leadership to discuss your child's needs.",
    },
    {
      step: 5,
      title: "Decision",
      description: "Receive admission decision and enrollment information.",
    },
  ];

  const tuitionFees = [
    { grade: "Kindergarten - Grade 2", tuition: "$8,500", fees: "$500" },
    { grade: "Grades 3-5", tuition: "$9,200", fees: "$600" },
    { grade: "Grades 6-8", tuition: "$10,800", fees: "$750" },
    { grade: "Grades 9-12", tuition: "$12,500", fees: "$900" },
  ];

  const policies = [
    {
      icon: Shield,
      title: "Safety & Security",
      description:
        "Comprehensive safety protocols, secure campus, and emergency procedures.",
    },
    {
      icon: Users,
      title: "Code of Conduct",
      description:
        "Clear expectations for student behavior, respect, and academic integrity.",
    },
    {
      icon: Heart,
      title: "Anti-Bullying",
      description:
        "Zero-tolerance policy with prevention programs and support systems.",
    },
    {
      icon: BookOpen,
      title: "Academic Standards",
      description:
        "High expectations for learning, homework policies, and grading standards.",
    },
  ];

  const services = [
    {
      icon: Bus,
      title: "Transportation",
      description:
        "Safe, reliable bus service covering major residential areas.",
      details:
        "Routes available throughout the city with GPS tracking and certified drivers.",
    },
    {
      icon: Utensils,
      title: "Nutrition Program",
      description:
        "Healthy, balanced meals prepared fresh daily in our kitchen.",
      details:
        "Breakfast and lunch programs with vegetarian and allergy-friendly options.",
    },
    {
      icon: Heart,
      title: "Health Services",
      description:
        "On-site nurse and health clinic for student wellness needs.",
      details:
        "First aid, medication management, and health screenings available.",
    },
    {
      icon: BookOpen,
      title: "Library & Resources",
      description:
        "Modern library with extensive digital and print collections.",
      details:
        "Research support, study spaces, and technology access for all students.",
    },
  ];

  return (
    <>
      <Head>
        <title>Omobola School | Building Future Leaders</title>
        <meta
          name="description"
          content="Excellence in education, character development, and community engagement at Omobola School."
        />
        <meta
          name="keywords"
          content="school in Nigeria, quality education, omobolaschool"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://omobolaschool.com.ng/" />
      </Head>
      <div className="flex flex-col">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-6 max-w-4xl mx-auto">
              <Badge variant="secondary" className="w-fit mx-auto">
                School Information
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-bold text-balance leading-tight">
                Everything You Need to{" "}
                <span className="text-primary">Know</span> About Omobola School
              </h1>
              <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
                Comprehensive information about admissions, policies, services,
                and everything that makes our school community special.
              </p>
            </div>
          </div>
        </section>

        {/* Information Tabs */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Tabs defaultValue="admissions" className="w-full">
              <TabsList className="grid w-full grid-cols-3s lg:grid-cols-3 mb-8">
                <TabsTrigger value="admissions">Admissions</TabsTrigger>
                {/* <TabsTrigger value="tuition">Tuition & Fees</TabsTrigger> */}
                <TabsTrigger value="policies">Policies</TabsTrigger>
                <TabsTrigger value="services">Services</TabsTrigger>
              </TabsList>

              {/* Admissions Tab */}
              <TabsContent value="admissions" className="space-y-12">
                <div className="text-center space-y-4 mb-12">
                  <h2 className="text-3xl font-bold">Admissions Process</h2>
                  <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                    We welcome families who share our commitment to academic
                    excellence and character development.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className="space-y-8">
                    {admissionSteps.map((step, index) => (
                      <div key={index} className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                          <span className="text-primary-foreground font-bold">
                            {step.step}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">
                            {step.title}
                          </h3>
                          <p className="text-muted-foreground">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Card className="p-6">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Calendar className="h-6 w-6 text-primary" />
                        <span>Important Dates</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="border-l-4 border-primary pl-4">
                        <h4 className="font-semibold">Application Opens</h4>
                        <p className="text-sm text-muted-foreground">
                          October 1, 2024
                        </p>
                      </div>
                      <div className="border-l-4 border-secondary pl-4">
                        <h4 className="font-semibold">Application Deadline</h4>
                        <p className="text-sm text-muted-foreground">
                          February 15, 2025
                        </p>
                      </div>
                      <div className="border-l-4 border-primary pl-4">
                        <h4 className="font-semibold">Admission Decisions</h4>
                        <p className="text-sm text-muted-foreground">
                          March 30, 2025
                        </p>
                      </div>
                      <div className="border-l-4 border-secondary pl-4">
                        <h4 className="font-semibold">Enrollment Deadline</h4>
                        <p className="text-sm text-muted-foreground">
                          May 1, 2025
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="text-center">
                  <Button asChild size="lg">
                    <Link href="/contact">
                      Start Application Process
                      <FileText className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </TabsContent>

              {/* Tuition & Fees Tab */}
              <TabsContent value="tuition" className="space-y-12">
                <div className="text-center space-y-4 mb-12">
                  <h2 className="text-3xl font-bold">Tuition & Fees</h2>
                  <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                    Transparent pricing with financial aid options available for
                    qualifying families.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <h3 className="text-2xl font-semibold">
                      Annual Tuition (2024-2025)
                    </h3>
                    <div className="space-y-4">
                      {tuitionFees.map((item, index) => (
                        <Card key={index}>
                          <CardHeader>
                            <CardTitle className="text-lg">
                              {item.grade}
                            </CardTitle>
                            <div className="flex justify-between items-center">
                              <span className="text-2xl font-bold text-primary">
                                {item.tuition}
                              </span>
                              <Badge variant="outline">
                                + {item.fees} fees
                              </Badge>
                            </div>
                          </CardHeader>
                        </Card>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <Card className="border-2 border-secondary/20">
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <DollarSign className="h-6 w-6 text-secondary" />
                          <span>Financial Aid Available</span>
                        </CardTitle>
                        <CardDescription>
                          We believe quality education should be accessible to
                          all qualified students.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <ul className="space-y-2">
                          <li className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                            <span>Need-based scholarships</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                            <span>Merit-based awards</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                            <span>Payment plan options</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                            <span>Sibling discounts</span>
                          </li>
                        </ul>
                        <Button
                          asChild
                          variant="outline"
                          className="w-full bg-transparent"
                        >
                          <Link href="/contact">Apply for Financial Aid</Link>
                        </Button>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>What's Included</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          <li className="flex items-center space-x-2">
                            <BookOpen className="h-4 w-4 text-primary" />
                            <span>All textbooks and materials</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <BookOpen className="h-4 w-4 text-primary" />
                            <span>Technology access</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <BookOpen className="h-4 w-4 text-primary" />
                            <span>Extracurricular activities</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <BookOpen className="h-4 w-4 text-primary" />
                            <span>Library and lab access</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              {/* Policies Tab */}
              <TabsContent value="policies" className="space-y-12">
                <div className="text-center space-y-4 mb-12">
                  <h2 className="text-3xl font-bold">School Policies</h2>
                  <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                    Clear guidelines that ensure a safe, respectful, and
                    productive learning environment for all.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {policies.map((policy, index) => (
                    <Card
                      key={index}
                      className="border-2 hover:border-primary/20 transition-colors"
                    >
                      <CardHeader>
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                          <policy.icon className="h-6 w-6 text-primary" />
                        </div>
                        <CardTitle className="text-xl">
                          {policy.title}
                        </CardTitle>
                        <CardDescription className="leading-relaxed">
                          {policy.description}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  ))}
                </div>

                <Card className="bg-muted/30">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Download className="h-6 w-6 text-primary" />
                      <span>Policy Documents</span>
                    </CardTitle>
                    <CardDescription>
                      Download complete policy handbooks and guidelines.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button
                      asChild
                      variant="outline"
                      className="bg-transparent"
                    >
                      <Link href="#">Student Handbook (PDF)</Link>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="bg-transparent"
                    >
                      <Link href="#">Parent Guide (PDF)</Link>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="bg-transparent"
                    >
                      <Link href="#">Academic Policies (PDF)</Link>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="bg-transparent"
                    >
                      <Link href="#">Emergency Procedures (PDF)</Link>
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Services Tab */}
              <TabsContent value="services" className="space-y-12">
                <div className="text-center space-y-4 mb-12">
                  <h2 className="text-3xl font-bold">Student Services</h2>
                  <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                    Comprehensive support services to enhance the educational
                    experience and student well-being.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {services.map((service, index) => (
                    <Card
                      key={index}
                      className="border-2 hover:border-primary/20 transition-colors"
                    >
                      <CardHeader>
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                          <service.icon className="h-6 w-6 text-primary" />
                        </div>
                        <CardTitle className="text-xl">
                          {service.title}
                        </CardTitle>
                        <CardDescription className="leading-relaxed">
                          {service.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          {service.details}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </div>
    </>
  );
}
