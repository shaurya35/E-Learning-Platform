import { Sidebar } from "@/components/sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { BarChart3, Users, BookOpen, Bell, ArrowUpRight, ArrowDownRight, Download, Plus } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Providers } from "@/app/providers"

export default function AdminDashboard() {
  return (
    <Providers>
      <div className="flex min-h-screen">
        <Sidebar userType="admin" />
        <div className="flex-1 flex flex-col">
          <DashboardHeader userType="admin" />
          <main className="flex-1 p-4 md:p-6 overflow-auto">
            <div className="flex items-center justify-between mb-6 animate-slide-up">
              <div>
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                <p className="text-muted-foreground">Welcome back, John Doe</p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="hidden md:flex transition-all hover:border-primary hover:bg-primary/5"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
                <Button
                  size="sm"
                  className="transition-all hover:bg-primary/90 shadow-md hover:shadow-lg hover:shadow-primary/20"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  New Announcement
                </Button>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6 stagger-animation">
              <Card className="dashboard-card border-border/50 animate-fade-in bg-background/50 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  <div className="p-2 rounded-full bg-primary/10">
                    <Users className="h-4 w-4 text-primary" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,248</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-500 flex items-center">
                      <ArrowUpRight className="mr-1 h-4 w-4" />
                      12% from last month
                    </span>
                  </p>
                </CardContent>
              </Card>
              <Card className="dashboard-card border-border/50 animate-fade-in bg-background/50 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
                  <div className="p-2 rounded-full bg-primary/10">
                    <BookOpen className="h-4 w-4 text-primary" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">84</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-500 flex items-center">
                      <ArrowUpRight className="mr-1 h-4 w-4" />
                      4% from last month
                    </span>
                  </p>
                </CardContent>
              </Card>
              <Card className="dashboard-card border-border/50 animate-fade-in bg-background/50 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">New Registrations</CardTitle>
                  <div className="p-2 rounded-full bg-primary/10">
                    <Users className="h-4 w-4 text-primary" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">32</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-red-500 flex items-center">
                      <ArrowDownRight className="mr-1 h-4 w-4" />
                      8% from last month
                    </span>
                  </p>
                </CardContent>
              </Card>
              <Card className="dashboard-card border-border/50 animate-fade-in bg-background/50 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">System Alerts</CardTitle>
                  <div className="p-2 rounded-full bg-primary/10">
                    <Bell className="h-4 w-4 text-primary" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">7</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-red-500 flex items-center">
                      <ArrowUpRight className="mr-1 h-4 w-4" />3 new since yesterday
                    </span>
                  </p>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="overview" className="mb-6 animate-fade-in">
              <TabsList className="bg-muted/50 dark:bg-muted/30 p-1">
                <TabsTrigger
                  value="overview"
                  className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary transition-all"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="users"
                  className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary transition-all"
                >
                  Users
                </TabsTrigger>
                <TabsTrigger
                  value="courses"
                  className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary transition-all"
                >
                  Courses
                </TabsTrigger>
                <TabsTrigger
                  value="reports"
                  className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary transition-all"
                >
                  Reports
                </TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-4 animate-slide-up">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                  <Card className="lg:col-span-4 border-border/50 bg-background/50 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle>User Activity</CardTitle>
                      <CardDescription>User logins over the past 30 days</CardDescription>
                    </CardHeader>
                    <CardContent className="pl-2">
                      <div className="h-[200px] w-full bg-muted/20 rounded-md flex items-end justify-between p-2">
                        {Array.from({ length: 30 }).map((_, i) => (
                          <div
                            key={i}
                            className="bg-primary w-1.5 rounded-t-sm transition-all hover:bg-primary/80"
                            style={{
                              height: `${Math.max(20, Math.floor(Math.random() * 180))}px`,
                              opacity: i % 7 === 0 ? 0.7 : 1,
                            }}
                          />
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="lg:col-span-3 border-border/50 bg-background/50 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle>User Distribution</CardTitle>
                      <CardDescription>Breakdown by user type</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <div className="w-full">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">Students</span>
                              <span className="text-sm font-medium">78%</span>
                            </div>
                            <div className="mt-2 h-2 w-full rounded-full bg-muted overflow-hidden">
                              <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-primary to-accent" />
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="w-full">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">Faculty</span>
                              <span className="text-sm font-medium">18%</span>
                            </div>
                            <div className="mt-2 h-2 w-full rounded-full bg-muted overflow-hidden">
                              <div className="h-full w-[18%] rounded-full bg-gradient-to-r from-primary to-accent" />
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="w-full">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">Admin</span>
                              <span className="text-sm font-medium">4%</span>
                            </div>
                            <div className="mt-2 h-2 w-full rounded-full bg-muted overflow-hidden">
                              <div className="h-full w-[4%] rounded-full bg-gradient-to-r from-primary to-accent" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="users" className="animate-slide-up">
                <Card className="border-border/50 bg-background/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Recent User Registrations</CardTitle>
                    <CardDescription>Users who registered in the last 7 days</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Role</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow className="hover:bg-muted/30 transition-colors">
                          <TableCell className="font-medium">Rahul Sharma</TableCell>
                          <TableCell>rahul.s@example.com</TableCell>
                          <TableCell>Student</TableCell>
                          <TableCell>Apr 3, 2024</TableCell>
                          <TableCell>
                            <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-100">
                              Active
                            </span>
                          </TableCell>
                        </TableRow>
                        <TableRow className="hover:bg-muted/30 transition-colors">
                          <TableCell className="font-medium">Priya Patel</TableCell>
                          <TableCell>priya.p@example.com</TableCell>
                          <TableCell>Student</TableCell>
                          <TableCell>Apr 2, 2024</TableCell>
                          <TableCell>
                            <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100">
                              Pending
                            </span>
                          </TableCell>
                        </TableRow>
                        <TableRow className="hover:bg-muted/30 transition-colors">
                          <TableCell className="font-medium">Dr. Amit Kumar</TableCell>
                          <TableCell>amit.k@example.com</TableCell>
                          <TableCell>Faculty</TableCell>
                          <TableCell>Apr 1, 2024</TableCell>
                          <TableCell>
                            <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-100">
                              Active
                            </span>
                          </TableCell>
                        </TableRow>
                        <TableRow className="hover:bg-muted/30 transition-colors">
                          <TableCell className="font-medium">Neha Singh</TableCell>
                          <TableCell>neha.s@example.com</TableCell>
                          <TableCell>Student</TableCell>
                          <TableCell>Mar 31, 2024</TableCell>
                          <TableCell>
                            <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-100">
                              Active
                            </span>
                          </TableCell>
                        </TableRow>
                        <TableRow className="hover:bg-muted/30 transition-colors">
                          <TableCell className="font-medium">Vikram Joshi</TableCell>
                          <TableCell>vikram.j@example.com</TableCell>
                          <TableCell>Student</TableCell>
                          <TableCell>Mar 30, 2024</TableCell>
                          <TableCell>
                            <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900 dark:text-red-100">
                              Inactive
                            </span>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="courses" className="animate-slide-up">
                <Card className="border-border/50 bg-background/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Popular Courses</CardTitle>
                    <CardDescription>Courses with the highest enrollment</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Course Name</TableHead>
                          <TableHead>Department</TableHead>
                          <TableHead>Instructor</TableHead>
                          <TableHead>Students</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow className="hover:bg-muted/30 transition-colors">
                          <TableCell className="font-medium">Introduction to Computer Science</TableCell>
                          <TableCell>Computer Science</TableCell>
                          <TableCell>Dr. Rajesh Kumar</TableCell>
                          <TableCell>145</TableCell>
                          <TableCell>
                            <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-100">
                              Active
                            </span>
                          </TableCell>
                        </TableRow>
                        <TableRow className="hover:bg-muted/30 transition-colors">
                          <TableCell className="font-medium">Principles of Economics</TableCell>
                          <TableCell>Economics</TableCell>
                          <TableCell>Dr. Meera Sharma</TableCell>
                          <TableCell>132</TableCell>
                          <TableCell>
                            <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-100">
                              Active
                            </span>
                          </TableCell>
                        </TableRow>
                        <TableRow className="hover:bg-muted/30 transition-colors">
                          <TableCell className="font-medium">Organic Chemistry</TableCell>
                          <TableCell>Chemistry</TableCell>
                          <TableCell>Dr. Sunil Verma</TableCell>
                          <TableCell>98</TableCell>
                          <TableCell>
                            <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-100">
                              Active
                            </span>
                          </TableCell>
                        </TableRow>
                        <TableRow className="hover:bg-muted/30 transition-colors">
                          <TableCell className="font-medium">Digital Marketing</TableCell>
                          <TableCell>Business</TableCell>
                          <TableCell>Prof. Anita Desai</TableCell>
                          <TableCell>87</TableCell>
                          <TableCell>
                            <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-100">
                              Active
                            </span>
                          </TableCell>
                        </TableRow>
                        <TableRow className="hover:bg-muted/30 transition-colors">
                          <TableCell className="font-medium">Artificial Intelligence</TableCell>
                          <TableCell>Computer Science</TableCell>
                          <TableCell>Dr. Vikram Mehta</TableCell>
                          <TableCell>76</TableCell>
                          <TableCell>
                            <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-100">
                              Active
                            </span>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="reports" className="animate-slide-up">
                <Card className="border-border/50 bg-background/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>System Reports</CardTitle>
                    <CardDescription>Recent system reports and analytics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="rounded-lg border p-4 hover:bg-muted/20 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <BarChart3 className="h-5 w-5 text-primary" />
                            <h3 className="font-medium">Monthly User Activity Report</h3>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="transition-all hover:border-primary hover:bg-primary/5"
                          >
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </Button>
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground">
                          Generated on April 1, 2024 • Shows user login patterns and engagement metrics
                        </p>
                      </div>
                      <div className="rounded-lg border p-4 hover:bg-muted/20 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <BookOpen className="h-5 w-5 text-primary" />
                            <h3 className="font-medium">Course Completion Analysis</h3>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="transition-all hover:border-primary hover:bg-primary/5"
                          >
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </Button>
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground">
                          Generated on March 28, 2024 • Analyzes course completion rates across departments
                        </p>
                      </div>
                      <div className="rounded-lg border p-4 hover:bg-muted/20 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Users className="h-5 w-5 text-primary" />
                            <h3 className="font-medium">Faculty Performance Report</h3>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="transition-all hover:border-primary hover:bg-primary/5"
                          >
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </Button>
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground">
                          Generated on March 15, 2024 • Evaluates faculty engagement and student feedback
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="grid gap-4 md:grid-cols-2 animate-fade-in">
              <Card className="border-border/50 bg-background/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Recent Announcements</CardTitle>
                  <CardDescription>Latest announcements from administrators</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-b pb-4 hover:bg-muted/20 p-2 rounded-md transition-colors">
                      <h3 className="font-medium">System Maintenance Notice</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        The system will be down for maintenance on April 10, 2024 from 2:00 AM to 5:00 AM.
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs text-muted-foreground">Posted by Admin • April 3, 2024</span>
                      </div>
                    </div>
                    <div className="border-b pb-4 hover:bg-muted/20 p-2 rounded-md transition-colors">
                      <h3 className="font-medium">New Faculty Onboarding</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Welcome session for new faculty members will be held on April 15, 2024 at 10:00 AM in the Main
                        Hall.
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs text-muted-foreground">Posted by Admin • April 2, 2024</span>
                      </div>
                    </div>
                    <div className="hover:bg-muted/20 p-2 rounded-md transition-colors">
                      <h3 className="font-medium">End of Semester Reminder</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        All faculty members are requested to submit final grades by May 20, 2024.
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs text-muted-foreground">Posted by Admin • April 1, 2024</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-border/50 bg-background/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>System Status</CardTitle>
                  <CardDescription>Current status of system components</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-2 hover:bg-muted/20 rounded-md transition-colors">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                        <span className="font-medium">Database</span>
                      </div>
                      <span className="text-sm text-muted-foreground">Operational</span>
                    </div>
                    <div className="flex items-center justify-between p-2 hover:bg-muted/20 rounded-md transition-colors">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                        <span className="font-medium">API Services</span>
                      </div>
                      <span className="text-sm text-muted-foreground">Operational</span>
                    </div>
                    <div className="flex items-center justify-between p-2 hover:bg-muted/20 rounded-md transition-colors">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                        <span className="font-medium">Authentication</span>
                      </div>
                      <span className="text-sm text-muted-foreground">Operational</span>
                    </div>
                    <div className="flex items-center justify-between p-2 hover:bg-muted/20 rounded-md transition-colors">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                        <span className="font-medium">Storage</span>
                      </div>
                      <span className="text-sm text-muted-foreground">Degraded Performance</span>
                    </div>
                    <div className="flex items-center justify-between p-2 hover:bg-muted/20 rounded-md transition-colors">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                        <span className="font-medium">Email Services</span>
                      </div>
                      <span className="text-sm text-muted-foreground">Operational</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </Providers>
  )
}

