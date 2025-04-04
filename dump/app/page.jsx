import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Users, Award, Calendar, ArrowRight, Sparkles, Zap, Shield } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"
import { Providers } from "./providers"

export default function Home() {
  return (
    <Providers>
      <div className="flex min-h-screen flex-col">
        {/* Navbar */}
        <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 shadow-sm">
          <div className="container flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary/30 to-purple-500/30 blur opacity-70"></div>
                <BookOpen className="relative h-6 w-6 text-primary" />
              </div>
              <span className="text-xl font-bold">EduLearn</span>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="#features"
                className="text-sm font-medium hover:text-primary transition-colors relative group"
              >
                Features
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                href="#testimonials"
                className="text-sm font-medium hover:text-primary transition-colors relative group"
              >
                Testimonials
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link href="#about" className="text-sm font-medium hover:text-primary transition-colors relative group">
                About
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link href="#contact" className="text-sm font-medium hover:text-primary transition-colors relative group">
                Contact
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </nav>
            <div className="flex items-center gap-4">
              <ModeToggle />
              <Link href="/signin">
                <Button
                  variant="outline"
                  className="hidden sm:inline-flex transition-all hover:border-primary hover:bg-primary/5"
                >
                  Sign In
                </Button>
              </Link>
              <Link href="/signin">
                <Button className="transition-all hover:bg-primary/90 shadow-md hover:shadow-lg hover:shadow-primary/20">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </header>

        <main className="flex-1">
          {/* Hero Section */}
          <section className="relative py-20 md:py-32 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-purple-500/5 dark:from-primary/10 dark:via-background dark:to-purple-500/10"></div>
            <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.015] dark:opacity-[0.03]"></div>
            <div className="container relative px-4 md:px-6">
              <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
                <div className="space-y-6 animate-fade-in">
                  <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-sm font-medium bg-background shadow-sm">
                    <span className="flex h-2 w-2 rounded-full bg-primary mr-1"></span>
                    Next-Gen Learning Platform
                  </div>
                  <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                    Transform Your{" "}
                    <span className="text-primary relative">
                      Learning
                      <span className="absolute -bottom-1 left-0 h-1 w-full bg-gradient-to-r from-primary/50 to-purple-500/50 rounded-full"></span>
                    </span>{" "}
                    Experience
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground text-lg md:text-xl">
                    A comprehensive e-learning platform designed specifically for college environments. Connect, learn,
                    and excel with our intuitive tools.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <Link href="/signin">
                      <Button
                        size="lg"
                        className="w-full sm:w-auto group transition-all shadow-lg hover:shadow-xl hover:shadow-primary/20"
                      >
                        Get Started
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </Link>
                    <Link href="#features">
                      <Button
                        size="lg"
                        variant="outline"
                        className="w-full sm:w-auto transition-all hover:border-primary hover:bg-primary/5"
                      >
                        Learn More
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="flex justify-center animate-fade-in">
                  <div className="relative">
                    <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-primary/30 to-purple-500/30 blur-xl opacity-70 animate-pulse-slow"></div>
                    <img
                      src="/placeholder.svg?height=400&width=600"
                      alt="Hero Image"
                      className="relative rounded-lg object-cover shadow-xl"
                      width={600}
                      height={400}
                    />
                    <div className="absolute -bottom-4 -right-4 bg-background rounded-lg p-3 shadow-lg border">
                      <div className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-primary" />
                        <span className="font-medium">AI-Powered Learning</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section id="features" className="py-20 relative">
            <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.015] dark:opacity-[0.03]"></div>
            <div className="container px-4 md:px-6 relative">
              <div className="text-center mb-12 animate-fade-in">
                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-sm font-medium bg-background shadow-sm mb-4">
                  <span className="flex h-2 w-2 rounded-full bg-primary mr-1"></span>
                  Why Choose Us
                </div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                  Powerful <span className="text-primary">Features</span>
                </h2>
                <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground md:text-xl">
                  Everything you need to enhance the learning experience
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-animation">
                <Card className="feature-card border-border/50 animate-fade-in bg-background/50 backdrop-blur-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
                  <CardHeader>
                    <div className="p-2 rounded-full bg-primary/10 w-fit">
                      <BookOpen className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="mt-4">Course Management</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Create, edit, and manage courses with ease. Upload lectures, assignments, and resources.
                    </p>
                  </CardContent>
                </Card>
                <Card className="feature-card border-border/50 animate-fade-in bg-background/50 backdrop-blur-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
                  <CardHeader>
                    <div className="p-2 rounded-full bg-primary/10 w-fit">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="mt-4">Student-Faculty Interaction</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Enable seamless communication between students and faculty with built-in messaging.
                    </p>
                  </CardContent>
                </Card>
                <Card className="feature-card border-border/50 animate-fade-in bg-background/50 backdrop-blur-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
                  <CardHeader>
                    <div className="p-2 rounded-full bg-primary/10 w-fit">
                      <Award className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="mt-4">Performance Tracking</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Track student progress, grades, and performance with detailed analytics and reports.
                    </p>
                  </CardContent>
                </Card>
                <Card className="feature-card border-border/50 animate-fade-in bg-background/50 backdrop-blur-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
                  <CardHeader>
                    <div className="p-2 rounded-full bg-primary/10 w-fit">
                      <Calendar className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="mt-4">Assignment Management</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Create assignments, set deadlines, and grade submissions all in one place.
                    </p>
                  </CardContent>
                </Card>
                <Card className="feature-card border-border/50 animate-fade-in bg-background/50 backdrop-blur-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
                  <CardHeader>
                    <div className="p-2 rounded-full bg-primary/10 w-fit">
                      <Zap className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="mt-4">Quiz & Exam Tools</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Create online quizzes and exams with auto-grading capabilities and instant feedback.
                    </p>
                  </CardContent>
                </Card>
                <Card className="feature-card border-border/50 animate-fade-in bg-background/50 backdrop-blur-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
                  <CardHeader>
                    <div className="p-2 rounded-full bg-primary/10 w-fit">
                      <Shield className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="mt-4">User Management</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Easily manage student and faculty accounts, roles, and permissions.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section id="testimonials" className="py-20 relative">
            <div className="absolute inset-0 bg-gradient-to-tl from-primary/5 via-background to-purple-500/5 dark:from-primary/10 dark:via-background dark:to-purple-500/10"></div>
            <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.015] dark:opacity-[0.03]"></div>
            <div className="container px-4 md:px-6 relative">
              <div className="text-center mb-12 animate-fade-in">
                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-sm font-medium bg-background shadow-sm mb-4">
                  <span className="flex h-2 w-2 rounded-full bg-primary mr-1"></span>
                  Testimonials
                </div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                  What Our <span className="text-primary">Users Say</span>
                </h2>
                <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground md:text-xl">
                  Hear from students and faculty who use our platform
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-animation">
                <Card className="border-border/50 animate-fade-in hover:shadow-xl transition-all duration-300 bg-background/50 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-primary/50 to-purple-500/50 blur opacity-70"></div>
                        <img
                          src="/placeholder.svg?height=50&width=50"
                          alt="User"
                          className="relative rounded-full"
                          width={50}
                          height={50}
                        />
                      </div>
                      <div>
                        <CardTitle className="text-lg">Dr. Rajesh Kumar</CardTitle>
                        <CardDescription>Professor, Computer Science</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="relative">
                      <div className="absolute -top-2 -left-2 text-4xl text-primary/20">"</div>
                      <p className="text-muted-foreground pt-2">
                        This platform has revolutionized how I teach my courses. The assignment management and grading
                        tools save me hours each week.
                      </p>
                      <div className="absolute -bottom-2 -right-2 text-4xl text-primary/20">"</div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-border/50 animate-fade-in hover:shadow-xl transition-all duration-300 bg-background/50 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-primary/50 to-purple-500/50 blur opacity-70"></div>
                        <img
                          src="/placeholder.svg?height=50&width=50"
                          alt="User"
                          className="relative rounded-full"
                          width={50}
                          height={50}
                        />
                      </div>
                      <div>
                        <CardTitle className="text-lg">Priya Sharma</CardTitle>
                        <CardDescription>Student, Engineering</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="relative">
                      <div className="absolute -top-2 -left-2 text-4xl text-primary/20">"</div>
                      <p className="text-muted-foreground pt-2">
                        I love how easy it is to access all my course materials in one place. The notification system
                        ensures I never miss an assignment deadline.
                      </p>
                      <div className="absolute -bottom-2 -right-2 text-4xl text-primary/20">"</div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-border/50 animate-fade-in hover:shadow-xl transition-all duration-300 bg-background/50 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-primary/50 to-purple-500/50 blur opacity-70"></div>
                        <img
                          src="/placeholder.svg?height=50&width=50"
                          alt="User"
                          className="relative rounded-full"
                          width={50}
                          height={50}
                        />
                      </div>
                      <div>
                        <CardTitle className="text-lg">Amit Patel</CardTitle>
                        <CardDescription>Admin, IT Department</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="relative">
                      <div className="absolute -top-2 -left-2 text-4xl text-primary/20">"</div>
                      <p className="text-muted-foreground pt-2">
                        The user management and reporting features make administration a breeze. We've seen a
                        significant improvement in student engagement.
                      </p>
                      <div className="absolute -bottom-2 -right-2 text-4xl text-primary/20">"</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-purple-500/10 dark:from-primary/20 dark:via-background dark:to-purple-500/20"></div>
            <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.015] dark:opacity-[0.03]"></div>
            <div className="container px-4 md:px-6 relative">
              <div className="flex flex-col items-center justify-center text-center space-y-6 animate-fade-in">
                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-sm font-medium bg-background shadow-sm mb-2">
                  <span className="flex h-2 w-2 rounded-full bg-primary mr-1"></span>
                  Join Us Today
                </div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl max-w-3xl">
                  Ready to{" "}
                  <span className="text-primary relative">
                    Transform
                    <span className="absolute -bottom-1 left-0 h-1 w-full bg-gradient-to-r from-primary/50 to-purple-500/50 rounded-full"></span>
                  </span>{" "}
                  Your Learning Experience?
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  Join thousands of students and faculty already using our platform.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Link href="/signin">
                    <Button
                      size="lg"
                      className="group transition-all shadow-lg hover:shadow-xl hover:shadow-primary/20"
                    >
                      Get Started Today
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                  <Link href="#contact">
                    <Button
                      size="lg"
                      variant="outline"
                      className="transition-all hover:border-primary hover:bg-primary/5"
                    >
                      Contact Us
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="border-t py-10 md:py-14 bg-background/50 backdrop-blur-sm">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary/30 to-purple-500/30 blur opacity-70"></div>
                    <BookOpen className="relative h-6 w-6 text-primary" />
                  </div>
                  <span className="text-xl font-bold">EduLearn</span>
                </div>
                <p className="text-sm text-muted-foreground">Transforming education through technology.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="#features"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#testimonials"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      Testimonials
                    </Link>
                  </li>
                  <li>
                    <Link href="#about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#contact"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3">Legal</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      Terms of Service
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      Cookie Policy
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
                <address className="not-italic text-sm text-muted-foreground space-y-2">
                  <p>123 Education Street</p>
                  <p>New Delhi, India</p>
                  <p>Email: info@edulearn.com</p>
                  <p>Phone: +91 1234567890</p>
                </address>
              </div>
            </div>
            <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} EduLearn. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </Providers>
  )
}

