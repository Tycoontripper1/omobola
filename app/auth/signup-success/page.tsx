import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CheckCircle } from "lucide-react"

export default function SignUpSuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primaryBlue/10 to-primaryRed/10 flex items-center justify-center p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-primaryBlue">Account Created Successfully!</CardTitle>
          <CardDescription>
            Welcome to Omobola School. Your account has been created and you can now sign in.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              You can now access your personalized dashboard and all school services.
            </p>
            <Button asChild className="w-full bg-primaryBlue hover:bg-primaryBlue/90">
              <Link href="/auth/login">Sign In to Your Account</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
