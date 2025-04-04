import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, User, UserCog, GraduationCap, ArrowLeft } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"
import { Providers } from "../providers"

export default function SignIn() {
  return (
    <Providers>
      <div className="min-h-screen flex flex-col relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-purple-500/5 dark:from-primary/10 dark:via-background dark:to-purple-500/10 -z-10"></div>
        <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.015] dark:opacity-[0.03] -z-10"></div>

        <header className="w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 shadow-sm">
          <div className="container flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2 transition-colors hover:text-primary group">
              <div className="relative">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary/30 to-purple-500/30 blur opacity-70 group-hover:opacity-100 transition-opacity"></div>
                <BookOpen className="relative h-6 w-6 text-primary" />
              </div>
              <span className="text-xl font-bold">EduLearn</span>
            </Link>
            <div className="flex items-center gap-2">
              <Link
                href="/"
                className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-1"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Home</span>
              </Link>
              <ModeToggle />
            </div>
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center p-4 py-10">
          <div className="w-full max-w-md animate-fade-in">
            <Card className="border-border/50 shadow-xl dark:shadow-primary/5 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent"></div>
              <CardHeader className="text-center space-y-2 pb-6">
                <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
                <CardDescription>Sign in to access your EduLearn account</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="student" className="w-full">
                  <TabsList className="grid grid-cols-3 mb-8 bg-muted/50 p-1">
                    <TabsTrigger
                      value="student"
                      className="flex items-center gap-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary transition-all"
                    >
                      <GraduationCap className="h-4 w-4" />
                      <span className="hidden sm:inline">Student</span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="faculty"
                      className="flex items-center gap-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary transition-all"
                    >
                      <User className="h-4 w-4" />
                      <span className="hidden sm:inline">Faculty</span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="admin"
                      className="flex items-center gap-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary transition-all"
                    >
                      <UserCog className="h-4 w-4" />
                      <span className="hidden sm:inline">Admin</span>
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="student" className="animate-slide-up">
                    <form action={`/student/dashboard`} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="student-email">Email</Label>
                        <Input
                          id="student-email"
                          type="email"
                          placeholder="student@example.com"
                          required
                          className="transition-all focus-visible:ring-primary"
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="student-password">Password</Label>
                          <Link href="#" className="text-xs text-primary hover:underline transition-colors">
                            Forgot password?
                          </Link>
                        </div>
                        <Input
                          id="student-password"
                          type="password"
                          required
                          className="transition-all focus-visible:ring-primary"
                        />
                      </div>
                      <Button
                        type="submit"
                        className="w-full transition-all hover:bg-primary/90 shadow-md hover:shadow-lg hover:shadow-primary/20"
                      >
                        Sign In as Student
                      </Button>
                    </form>
                  </TabsContent>

                  <TabsContent value="faculty" className="animate-slide-up">
                    <form action={`/faculty/dashboard`} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="faculty-email">Email</Label>
                        <Input
                          id="faculty-email"
                          type="email"
                          placeholder="faculty@example.com"
                          required
                          className="transition-all focus-visible:ring-primary"
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="faculty-password">Password</Label>
                          <Link href="#" className="text-xs text-primary hover:underline transition-colors">
                            Forgot password?
                          </Link>
                        </div>
                        <Input
                          id="faculty-password"
                          type="password"
                          required
                          className="transition-all focus-visible:ring-primary"
                        />
                      </div>
                      <Button
                        type="submit"
                        className="w-full transition-all hover:bg-primary/90 shadow-md hover:shadow-lg hover:shadow-primary/20"
                      >
                        Sign In as Faculty
                      </Button>
                    </form>
                  </TabsContent>

                  <TabsContent value="admin" className="animate-slide-up">
                    <form action={`/admin/dashboard`} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="admin-email">Email</Label>
                        <Input
                          id="admin-email"
                          type="email"
                          placeholder="admin@example.com"
                          required
                          className="transition-all focus-visible:ring-primary"
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="admin-password">Password</Label>
                          <Link href="#" className="text-xs text-primary hover:underline transition-colors">
                            Forgot password?
                          </Link>
                        </div>
                        <Input
                          id="admin-password"
                          type="password"
                          required
                          className="transition-all focus-visible:ring-primary"
                        />
                      </div>
                      <Button
                        type="submit"
                        className="w-full transition-all hover:bg-primary/90 shadow-md hover:shadow-lg hover:shadow-primary/20"
                      >
                        Sign In as Admin
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4 border-t pt-6 mt-2">
                <div className="text-center text-sm text-muted-foreground">
                  Don&apos;t have an account? Contact your institution administrator.
                </div>
              </CardFooter>
            </Card>
          </div>
        </main>
      </div>
    </Providers>
  )
}

