import { Sidebar } from "@/components/sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, FileText, Users, Calendar, Clock, Plus } from "lucide-react"
import { Providers } from "@/app/providers"

export default function FacultyDashboard() {
  return (
    <Providers>
      <div className="flex min-h-screen">
        <Sidebar userType="faculty" />
        <div className="flex-1 flex flex-col">
          <DashboardHeader userType="faculty" />
          <main className="flex-1 p-4 md:p-6 overflow-auto">
            <div className="flex items-center justify-between mb-6 animate-slide-up">
              <div>
                <h1 className="text-2xl font-bold">Faculty Dashboard</h1>
                <p className="text-muted-foreground">Welcome back, Dr. John Doe</p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="hidden md:flex transition-all hover:border-primary hover:bg-primary/5"
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule
                </Button>
                <Button
                  size="sm"
                  className="transition-all hover:bg-primary/90 shadow-md hover:shadow-lg hover:shadow-primary/20"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  New Course
                </Button>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6 stagger-animation">
              <Card className="dashboard-card border-border/50 animate-fade-in bg-background/50 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">My Courses</CardTitle>
                  <div className="p-2 rounded-full bg-primary/10">
                    <BookOpen className="h-4 w-4 text-primary" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">6</div>
                  <p className="text-xs text-muted-foreground">4 active, 2 upcoming</p>
                </CardContent>
              </Card>
              <Card className="dashboard-card border-border/50 animate-fade-in bg-background/50 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Students</CardTitle>
                  <div className="p-2 rounded-full bg-primary/10">
                    <Users className="h-4 w-4 text-primary" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">248</div>
                  <p className="text-xs text-muted-foreground">Across all courses</p>
                </CardContent>
              </Card>
              <Card className="dashboard-card border-border/50 animate-fade-in bg-background/50 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Pending Assignments</CardTitle>
                  <div className="p-2 rounded-full bg-primary/10">
                    <FileText className="h-4 w-4 text-primary" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">18</div>
                  <p className="text-xs text-muted-foreground">Needs grading</p>
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
                  <div className="text-2xl font-bold">3</div>
                  <p className="text-xs text-muted-foreground">Today</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6 animate-fade-in">
              <Card className="lg:col-span-2 border-border/50 bg-background/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Today's Schedule</CardTitle>
                  <CardDescription>Your classes and appointments for today</CardDescription>
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
                          <span>45 students</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 rounded-lg border p-4 hover:bg-muted/20 transition-colors">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <Clock className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">Department Meeting</h3>
                          <span className="text-sm text-muted-foreground">11:00 AM - 12:00 PM</span>
                        </div>
                        <p className="text-sm text-muted-foreground">Conference Room, Admin Building</p>
                        <div className="flex items-center gap-2 text-sm">
                          <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                            Meeting
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 rounded-lg border p-4 hover:bg-muted/20 transition-colors">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <Clock className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">Advanced Programming Lab</h3>
                          <span className="text-sm text-muted-foreground">2:00 PM - 4:00 PM</span>
                        </div>
                        <p className="text-sm text-muted-foreground">Lab 203, Computer Science Building</p>
                        <div className="flex items-center gap-2 text-sm">
                          <span className="inline-flex items-center rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800 dark:bg-purple-900 dark:text-purple-100">
                            Lab
                          </span>
                          <span>28 students</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-border/50 bg-background/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Assignment Status</CardTitle>
                  <CardDescription>Recent assignment submissions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between hover:bg-muted/20 p-2 rounded-md transition-colors">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">Data Structures Project</p>
                        <p className="text-sm text-muted-foreground">Due: Apr 10, 2024</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">24/45</span>
                        <div className="h-2 w-16 rounded-full bg-muted overflow-hidden">
                          <div className="h-full w-[53%] rounded-full bg-gradient-to-r from-primary to-accent" />
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between hover:bg-muted/20 p-2 rounded-md transition-colors">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">Algorithm Analysis</p>
                        <p className="text-sm text-muted-foreground">Due: Apr 5, 2024</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">38/45</span>
                        <div className="h-2 w-16 rounded-full bg-muted overflow-hidden">
                          <div className="h-full w-[84%] rounded-full bg-gradient-to-r from-primary to-accent" />
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between hover:bg-muted/20 p-2 rounded-md transition-colors">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">Database Quiz</p>
                        <p className="text-sm text-muted-foreground">Due: Apr 3, 2024</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">42/45</span>
                        <div className="h-2 w-16 rounded-full bg-muted overflow-hidden">
                          <div className="h-full w-[93%] rounded-full bg-gradient-to-r from-primary to-accent" />
                        </div>
                      </div>
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
          </main>
        </div>
      </div>
    </Providers>
  )
}

