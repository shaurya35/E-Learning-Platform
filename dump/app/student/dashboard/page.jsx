import { Sidebar } from "@/components/sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, FileText, Calendar, Clock, AlertCircle, BarChart, Download, ExternalLink } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Providers } from "@/app/providers"

export default function StudentDashboard() {
  return (
    <Providers>
      <div className="flex min-h-screen">
        <Sidebar userType="student" />
        <div className="flex-1 flex flex-col">
          <DashboardHeader userType="student" />
          <main className="flex-1 p-4 md:p-6 overflow-auto">
            <div className="flex items-center justify-between mb-6 animate-slide-up">
              <div>
                <h1 className="text-2xl font-bold">Student Dashboard</h1>
                <p className="text-muted-foreground">Welcome back, John Doe</p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="hidden md:flex transition-all hover:border-primary hover:bg-primary/5"
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  My Schedule
                </Button>
                <Button
                  size="sm"
                  className="transition-all hover:bg-primary/90 shadow-md hover:shadow-lg hover:shadow-primary/20"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Assignments
                </Button>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6 stagger-animation">
              <Card className="dashboard-card border-border/50 animate-fade-in bg-background/50 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Enrolled Courses</CardTitle>
                  <div className="p-2 rounded-full bg-primary/10">
                    <BookOpen className="h-4 w-4 text-primary" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">5</div>
                  <p className="text-xs text-muted-foreground">Current semester</p>
                </CardContent>
              </Card>
              <Card className="dashboard-card border-border/50 animate-fade-in bg-background/50 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Assignments</CardTitle>
                  <div className="p-2 rounded-full bg-primary/10">
                    <FileText className="h-4 w-4 text-primary" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8</div>
                  <p className="text-xs text-muted-foreground">3 pending, 5 completed</p>
                </CardContent>
              </Card>
              <Card className="dashboard-card border-border/50 animate-fade-in bg-background/50 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Current GPA</CardTitle>
                  <div className="p-2 rounded-full bg-primary/10">
                    <BarChart className="h-4 w-4 text-primary" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3.8</div>
                  <p className="text-xs text-muted-foreground">Out of 4.0</p>
                </CardContent>
              </Card>
              <Card className="dashboard-card border-border/50 animate-fade-in bg-background/50 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Upcoming Classes</CardTitle>
                  <div className="p-2 rounded-full bg-primary/10">
                    <Clock className="h-4 w-4 text-primary" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2</div>
                  <p className="text-xs text-muted-foreground">Today</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
              <Card className="lg:col-span-2 border-border/50 bg-background/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Today's Schedule</CardTitle>
                  <CardDescription>Your classes and events for today</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 rounded-lg border p-4 hover:bg-muted/20 transition-colors">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <Clock className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">Introduction to Computer Science</h3>
                          <span className="text-sm text-muted-foreground">9:00 AM - 10:30 AM</span>
                        </div>
                        <p className="text-sm text-muted-foreground">Room 101, Computer Science Building</p>
                        <div className="flex items-center gap-2 text-sm">
                          <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-100">
                            Lecture
                          </span>
                          <span>Dr. Rajesh Kumar</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 rounded-lg border p-4 hover:bg-muted/20 transition-colors">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <Clock className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">Data Structures and Algorithms</h3>
                          <span className="text-sm text-muted-foreground">2:00 PM - 3:30 PM</span>
                        </div>
                        <p className="text-sm text-muted-foreground">Room 203, Computer Science Building</p>
                        <div className="flex items-center gap-2 text-sm">
                          <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-100">
                            Lecture
                          </span>
                          <span>Dr. Meera Sharma</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-border/50 bg-background/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Assignment Deadlines</CardTitle>
                  <CardDescription>Upcoming assignments due soon</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <AlertCircle className="h-4 w-4 text-destructive" />
                          <p className="text-sm font-medium">Data Structures Project</p>
                        </div>
                        <span className="text-xs text-destructive">Due Tomorrow</span>
                      </div>
                      <p className="text-xs text-muted-foreground">CS201 - Dr. Meera Sharma</p>
                      <Progress value={75} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <AlertCircle className="h-4 w-4 text-amber-500" />
                          <p className="text-sm font-medium">Database Quiz</p>
                        </div>
                        <span className="text-xs text-amber-500">Due in 3 days</span>
                      </div>
                      <p className="text-xs text-muted-foreground">CS301 - Dr. Sunil Verma</p>
                      <Progress value={30} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <AlertCircle className="h-4 w-4 text-muted-foreground" />
                          <p className="text-sm font-medium">Programming Lab Exercise</p>
                        </div>
                        <span className="text-xs text-muted-foreground">Due in 5 days</span>
                      </div>
                      <p className="text-xs text-muted-foreground">CS202L - Dr. Vikram Mehta</p>
                      <Progress value={10} className="h-2" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full transition-all hover:border-primary hover:bg-primary/5">
                    View All Assignments
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <Tabs defaultValue="courses" className="mb-6">
              <TabsList className="bg-muted/50 dark:bg-muted/30 p-1">
                <TabsTrigger
                  value="courses"
                  className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary transition-all"
                >
                  My Courses
                </TabsTrigger>
                <TabsTrigger
                  value="assignments"
                  className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary transition-all"
                >
                  Assignments
                </TabsTrigger>
                <TabsTrigger
                  value="grades"
                  className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary transition-all"
                >
                  Grades
                </TabsTrigger>
              </TabsList>
              <TabsContent value="courses" className="space-y-4">
                <Card className="border-border/50 bg-background/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Enrolled Courses</CardTitle>
                    <CardDescription>Courses you are currently taking this semester</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Course Name</TableHead>
                          <TableHead>Code</TableHead>
                          <TableHead>Instructor</TableHead>
                          <TableHead>Schedule</TableHead>
                          <TableHead>Progress</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">Introduction to Computer Science</TableCell>
                          <TableCell>CS101</TableCell>
                          <TableCell>Dr. Rajesh Kumar</TableCell>
                          <TableCell>Mon, Wed, Fri 9:00 AM</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-16 rounded-full bg-muted overflow-hidden">
                                <div className="h-full w-[65%] rounded-full bg-gradient-to-r from-primary to-accent" />
                              </div>
                              <span className="text-xs">65%</span>
                            </div>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Data Structures and Algorithms</TableCell>
                          <TableCell>CS201</TableCell>
                          <TableCell>Dr. Meera Sharma</TableCell>
                          <TableCell>Tue, Thu 11:00 AM</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-16 rounded-full bg-muted overflow-hidden">
                                <div className="h-full w-[50%] rounded-full bg-gradient-to-r from-primary to-accent" />
                              </div>
                              <span className="text-xs">50%</span>
                            </div>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Database Management Systems</TableCell>
                          <TableCell>CS301</TableCell>
                          <TableCell>Dr. Sunil Verma</TableCell>
                          <TableCell>Mon, Wed 2:00 PM</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-16 rounded-full bg-muted overflow-hidden">
                                <div className="h-full w-[75%] rounded-full bg-gradient-to-r from-primary to-accent" />
                              </div>
                              <span className="text-xs">75%</span>
                            </div>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Advanced Programming Lab</TableCell>
                          <TableCell>CS202L</TableCell>
                          <TableCell>Dr. Vikram Mehta</TableCell>
                          <TableCell>Fri 2:00 PM</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-16 rounded-full bg-muted overflow-hidden">
                                <div className="h-full w-[60%] rounded-full bg-gradient-to-r from-primary to-accent" />
                              </div>
                              <span className="text-xs">60%</span>
                            </div>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Digital Electronics</TableCell>
                          <TableCell>EE201</TableCell>
                          <TableCell>Dr. Priya Patel</TableCell>
                          <TableCell>Tue, Thu 2:00 PM</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-16 rounded-full bg-muted overflow-hidden">
                                <div className="h-full w-[40%] rounded-full bg-gradient-to-r from-primary to-accent" />
                              </div>
                              <span className="text-xs">40%</span>
                            </div>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="assignments">
                <Card className="border-border/50 bg-background/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Current Assignments</CardTitle>
                    <CardDescription>All your assignments for this semester</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Assignment</TableHead>
                          <TableHead>Course</TableHead>
                          <TableHead>Due Date</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">Data Structures Project</TableCell>
                          <TableCell>CS201</TableCell>
                          <TableCell>Apr 5, 2024</TableCell>
                          <TableCell>
                            <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100">
                              In Progress
                            </span>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">
                              <ExternalLink className="h-4 w-4" />
                              <span className="sr-only">Open</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Database Quiz</TableCell>
                          <TableCell>CS301</TableCell>
                          <TableCell>Apr 8, 2024</TableCell>
                          <TableCell>
                            <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100">
                              Not Started
                            </span>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">
                              <ExternalLink className="h-4 w-4" />
                              <span className="sr-only">Open</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Programming Lab Exercise</TableCell>
                          <TableCell>CS202L</TableCell>
                          <TableCell>Apr 10, 2024</TableCell>
                          <TableCell>
                            <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100">
                              Not Started
                            </span>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">
                              <ExternalLink className="h-4 w-4" />
                              <span className="sr-only">Open</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Digital Electronics Quiz</TableCell>
                          <TableCell>EE201</TableCell>
                          <TableCell>Apr 3, 2024</TableCell>
                          <TableCell>
                            <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-100">
                              Completed
                            </span>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">
                              <ExternalLink className="h-4 w-4" />
                              <span className="sr-only">Open</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">CS101 Assignment 3</TableCell>
                          <TableCell>CS101</TableCell>
                          <TableCell>Mar 28, 2024</TableCell>
                          <TableCell>
                            <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-100">
                              Completed
                            </span>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">
                              <ExternalLink className="h-4 w-4" />
                              <span className="sr-only">Open</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="grades">
                <Card className="border-border/50 bg-background/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Current Grades</CardTitle>
                    <CardDescription>Your academic performance this semester</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Course</TableHead>
                          <TableHead>Assignments</TableHead>
                          <TableHead>Midterm</TableHead>
                          <TableHead>Attendance</TableHead>
                          <TableHead>Current Grade</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">CS101</TableCell>
                          <TableCell>92%</TableCell>
                          <TableCell>88%</TableCell>
                          <TableCell>95%</TableCell>
                          <TableCell>
                            <span className="font-medium">A</span>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">CS201</TableCell>
                          <TableCell>85%</TableCell>
                          <TableCell>78%</TableCell>
                          <TableCell>90%</TableCell>
                          <TableCell>
                            <span className="font-medium">B+</span>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">CS301</TableCell>
                          <TableCell>94%</TableCell>
                          <TableCell>91%</TableCell>
                          <TableCell>100%</TableCell>
                          <TableCell>
                            <span className="font-medium">A+</span>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">CS202L</TableCell>
                          <TableCell>88%</TableCell>
                          <TableCell>82%</TableCell>
                          <TableCell>85%</TableCell>
                          <TableCell>
                            <span className="font-medium">B+</span>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">EE201</TableCell>
                          <TableCell>76%</TableCell>
                          <TableCell>72%</TableCell>
                          <TableCell>80%</TableCell>
                          <TableCell>
                            <span className="font-medium">B</span>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full transition-all hover:border-primary hover:bg-primary/5">
                      <Download className="mr-2 h-4 w-4" />
                      Download Grade Report
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="grid gap-4 md:grid-cols-2">
              <Card className="border-border/50 bg-background/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Announcements</CardTitle>
                  <CardDescription>Recent announcements from your courses</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-b pb-4 hover:bg-muted/20 p-2 rounded-md transition-colors">
                      <h3 className="font-medium">Midterm Exam Schedule</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        The midterm exams for CS101 and CS201 will be held on April 15, 2024. Please prepare
                        accordingly.
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs text-muted-foreground">CS101 • April 3, 2024</span>
                      </div>
                    </div>
                    <div className="border-b pb-4 hover:bg-muted/20 p-2 rounded-md transition-colors">
                      <h3 className="font-medium">Guest Lecture</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Dr. Rajiv Mehta from Google will be giving a guest lecture on AI and Machine Learning on April
                        12, 2024.
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs text-muted-foreground">CS301 • April 2, 2024</span>
                      </div>
                    </div>
                    <div className="hover:bg-muted/20 p-2 rounded-md transition-colors">
                      <h3 className="font-medium">Assignment Deadline Extension</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        The deadline for the Database Quiz has been extended to April 8, 2024.
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs text-muted-foreground">CS301 • April 1, 2024</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-border/50 bg-background/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Study Resources</CardTitle>
                  <CardDescription>Recommended materials for your courses</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 rounded-lg border p-3 hover:bg-muted/20 transition-colors">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <BookOpen className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-medium">Introduction to Algorithms</h3>
                        <p className="text-xs text-muted-foreground mt-1">Recommended textbook for CS201</p>
                        <Button variant="link" size="sm" className="h-8 px-0 text-primary hover:text-primary/80">
                          Access E-Book
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 rounded-lg border p-3 hover:bg-muted/20 transition-colors">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-medium">Database Systems: Concepts and Design</h3>
                        <p className="text-xs text-muted-foreground mt-1">Recommended textbook for CS301</p>
                        <Button variant="link" size="sm" className="h-8 px-0 text-primary hover:text-primary/80">
                          Access E-Book
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 rounded-lg border p-3 hover:bg-muted/20 transition-colors">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-medium">CS101 Lecture Notes</h3>
                        <p className="text-xs text-muted-foreground mt-1">
                          Compiled lecture notes for the entire semester
                        </p>
                        <Button variant="link" size="sm" className="h-8 px-0 text-primary hover:text-primary/80">
                          Download PDF
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full transition-all hover:border-primary hover:bg-primary/5">
                    View All Resources
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </Providers>
  )
}

