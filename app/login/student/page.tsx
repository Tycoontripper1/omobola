"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Eye,
  EyeOff,
  GraduationCap,
  ArrowLeft,
  Lock,
  User,
  Loader2,
  AlertCircle,
  Mail,
} from "lucide-react";

export default function StudentLoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [loginMethod, setLoginMethod] = useState<"studentId" | "email">(
    "studentId"
  );
  const [formData, setFormData] = useState({
    studentId: "",
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: loginMethod === "email" ? formData.email : undefined,
          studentId:
            loginMethod === "studentId" ? formData.studentId : undefined,
          password: formData.password,
          userType: "student",
        }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data.user));
        router.push(data.redirectUrl);
      } else {
        setError(data.error || "Login failed");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (error) setError("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/5 via-background to-primary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Back to Home */}
        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-muted-foreground hover:text-secondary transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* School Logo & Title */}
        <div className="text-center space-y-4">
          <Image
            src="/logo.jpeg"
            alt="Omobola School Logo"
            width={80}
            height={80}
            className="mx-auto rounded-full"
          />
          <div>
            <h1 className="text-2xl font-bold text-secondary">
              Omobola School
            </h1>
            <p className="text-muted-foreground">Student Portal</p>
          </div>
        </div>

        {/* Login Card */}
        <Card className="border-2">
          <CardHeader className="text-center">
            <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <GraduationCap className="h-6 w-6 text-secondary" />
            </div>
            <CardTitle className="text-xl">Student Login</CardTitle>
            <CardDescription>
              Access your assignments, grades, and school resources
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="flex mb-4 p-1 bg-muted rounded-lg">
              <Button
                type="button"
                variant={loginMethod === "studentId" ? "default" : "ghost"}
                size="sm"
                className="flex-1"
                onClick={() => setLoginMethod("studentId")}
              >
                Student ID
              </Button>
              <Button
                type="button"
                variant={loginMethod === "email" ? "default" : "ghost"}
                size="sm"
                className="flex-1"
                onClick={() => setLoginMethod("email")}
              >
                Email
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {loginMethod === "studentId" ? (
                <div className="space-y-2">
                  <Label htmlFor="studentId">Student ID</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="studentId"
                      type="text"
                      value={formData.studentId}
                      onChange={(e) =>
                        handleInputChange("studentId", e.target.value)
                      }
                      placeholder="Enter your student ID"
                      className="pl-10"
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      placeholder="your.email@omobolaschool.edu"
                      className="pl-10"
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                    placeholder="Enter your password"
                    className="pl-10 pr-10"
                    required
                    disabled={isLoading}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={formData.rememberMe}
                    onCheckedChange={(checked) =>
                      handleInputChange("rememberMe", checked as boolean)
                    }
                  />
                  <Label htmlFor="remember" className="text-sm">
                    Remember me
                  </Label>
                </div>
                <Link
                  href="#"
                  className="text-sm text-secondary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full bg-secondary hover:bg-secondary/90"
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  "Sign In to Student Portal"
                )}
              </Button>
            </form>

            <div className="mt-4 p-3 bg-muted/50 rounded-lg">
              <p className="text-xs text-muted-foreground mb-2">
                Demo Credentials:
              </p>
              <p className="text-xs font-mono">
                Student ID: STU001 / Password: student123
              </p>
              <p className="text-xs font-mono">
                Email: student1@omobolaschool.edu / Password: student123
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Quick Links */}
        <Card className="bg-muted/30">
          <CardHeader>
            <CardTitle className="text-lg">Student Resources</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <Badge
                variant="outline"
                className="justify-center py-2 bg-transparent"
              >
                Assignments
              </Badge>
              <Badge
                variant="outline"
                className="justify-center py-2 bg-transparent"
              >
                Grades
              </Badge>
              <Badge
                variant="outline"
                className="justify-center py-2 bg-transparent"
              >
                Schedule
              </Badge>
              <Badge
                variant="outline"
                className="justify-center py-2 bg-transparent"
              >
                Library
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Support */}
        <div className="text-center text-sm text-muted-foreground">
          Need help? Contact your{" "}
          <Link href="/contact" className="text-secondary hover:underline">
            Teacher or Counselor
          </Link>
        </div>
      </div>
    </div>
  );
}
