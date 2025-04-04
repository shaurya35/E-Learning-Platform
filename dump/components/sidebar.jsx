"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  BookOpenCheck,
  FileText,
  Users,
  Calendar,
  Settings,
  Bell,
  BarChart,
  MessageSquare,
  GraduationCap,
  User,
  LogOut,
} from "lucide-react"

export function Sidebar({ userType }) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [hoveredItem, setHoveredItem] = useState(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Define navigation items based on user type
  const getNavItems = () => {
    const baseItems = [
      {
        title: "Dashboard",
        href: `/${userType}/dashboard`,
        icon: <LayoutDashboard className="h-5 w-5" />,
      },
    ]

    const adminItems = [
      ...baseItems,
      {
        title: "User Management",
        href: `/${userType}/users`,
        icon: <Users className="h-5 w-5" />,
      },
      {
        title: "Course Management",
        href: `/${userType}/courses`,
        icon: <BookOpenCheck className="h-5 w-5" />,
      },
      {
        title: "Reports",
        href: `/${userType}/reports`,
        icon: <BarChart className="h-5 w-5" />,
      },
      {
        title: "Announcements",
        href: `/${userType}/announcements`,
        icon: <Bell className="h-5 w-5" />,
      },
      {
        title: "Settings",
        href: `/${userType}/settings`,
        icon: <Settings className="h-5 w-5" />,
      },
    ]

    const facultyItems = [
      ...baseItems,
      {
        title: "My Courses",
        href: `/${userType}/courses`,
        icon: <BookOpenCheck className="h-5 w-5" />,
      },
      {
        title: "Assignments",
        href: `/${userType}/assignments`,
        icon: <FileText className="h-5 w-5" />,
      },
      {
        title: "Students",
        href: `/${userType}/students`,
        icon: <GraduationCap className="h-5 w-5" />,
      },
      {
        title: "Schedule",
        href: `/${userType}/schedule`,
        icon: <Calendar className="h-5 w-5" />,
      },
      {
        title: "Messages",
        href: `/${userType}/messages`,
        icon: <MessageSquare className="h-5 w-5" />,
      },
      {
        title: "Announcements",
        href: `/${userType}/announcements`,
        icon: <Bell className="h-5 w-5" />,
      },
    ]

    const studentItems = [
      ...baseItems,
      {
        title: "My Courses",
        href: `/${userType}/courses`,
        icon: <BookOpenCheck className="h-5 w-5" />,
      },
      {
        title: "Assignments",
        href: `/${userType}/assignments`,
        icon: <FileText className="h-5 w-5" />,
      },
      {
        title: "Schedule",
        href: `/${userType}/schedule`,
        icon: <Calendar className="h-5 w-5" />,
      },
      {
        title: "Grades",
        href: `/${userType}/grades`,
        icon: <BarChart className="h-5 w-5" />,
      },
      {
        title: "Messages",
        href: `/${userType}/messages`,
        icon: <MessageSquare className="h-5 w-5" />,
      },
    ]

    switch (userType) {
      case "admin":
        return adminItems
      case "faculty":
        return facultyItems
      case "student":
        return studentItems
      default:
        return baseItems
    }
  }

  const navItems = getNavItems()

  if (!mounted) {
    return null
  }

  return (
    <div
      className={cn(
        "flex flex-col border-r bg-background/95 backdrop-blur-sm h-screen transition-all duration-300 shadow-sm z-30",
        collapsed ? "w-[var(--sidebar-width-collapsed)]" : "w-[var(--sidebar-width)]",
      )}
    >
      <div className="flex h-16 items-center border-b px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold transition-colors hover:text-primary">
          <div className="relative">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary/30 to-purple-500/30 blur opacity-70"></div>
            <BookOpen className="relative h-6 w-6 text-primary" />
          </div>
          {!collapsed && <span className="text-xl">EduLearn</span>}
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className="ml-auto h-8 w-8 transition-all hover:bg-primary/10 rounded-full"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4 transition-transform hover:scale-110" />
          ) : (
            <ChevronLeft className="h-4 w-4 transition-transform hover:scale-110" />
          )}
        </Button>
      </div>
      <ScrollArea className="flex-1 py-4 px-2">
        <nav className="grid gap-1 stagger-animation">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={cn(
                "sidebar-link",
                pathname === item.href && "active",
                collapsed ? "justify-center" : "justify-start",
                "group",
              )}
              onMouseEnter={() => setHoveredItem(index)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div
                className={cn(
                  "transition-all duration-300",
                  pathname === item.href && "text-primary",
                  hoveredItem === index && "text-primary scale-110",
                )}
              >
                {item.icon}
              </div>
              {!collapsed && (
                <span className={cn("transition-all duration-300", hoveredItem === index && "translate-x-1")}>
                  {item.title}
                </span>
              )}

              {/* Tooltip for collapsed sidebar */}
              {collapsed && hoveredItem === index && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-sm rounded shadow-md whitespace-nowrap z-50 animate-fade-in">
                  {item.title}
                </div>
              )}
            </Link>
          ))}
        </nav>
      </ScrollArea>
      <div className="border-t p-4">
        <div className={cn("flex items-center gap-3", collapsed ? "justify-center" : "justify-between")}>
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-primary/30 to-purple-500/30 blur opacity-70"></div>
              <div className="relative h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-4 w-4 text-primary" />
              </div>
            </div>
            {!collapsed && (
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">John Doe</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {userType.charAt(0).toUpperCase() + userType.slice(1)}
                </p>
              </div>
            )}
          </div>

          {!collapsed && (
            <Link href="/signin">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full hover:bg-destructive/10 hover:text-destructive transition-colors"
                title="Sign Out"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

