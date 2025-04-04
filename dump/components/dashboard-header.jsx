"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Bell, Search, Menu, X, UserIcon, Settings, LogOut } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function DashboardHeader({ userType, onMobileMenuToggle }) {
  const [mounted, setMounted] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu)
    if (onMobileMenuToggle) {
      onMobileMenuToggle(!showMobileMenu)
    }
  }

  if (!mounted) {
    return null
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="flex h-16 items-center px-4 md:px-6">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden mr-2 rounded-full hover:bg-primary/10"
          onClick={toggleMobileMenu}
        >
          {showMobileMenu ? (
            <X className="h-5 w-5 transition-transform" />
          ) : (
            <Menu className="h-5 w-5 transition-transform" />
          )}
          <span className="sr-only">Toggle menu</span>
        </Button>

        <div className="flex-1 md:flex md:justify-start md:gap-10">
          <form className="hidden md:block relative group">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full appearance-none bg-background pl-8 md:w-[200px] lg:w-[300px] transition-all focus-visible:ring-primary focus-visible:ring-offset-0 border-muted group-focus-within:border-primary"
            />
          </form>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="relative transition-all hover:bg-primary/10 rounded-full">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground animate-pulse">
              3
            </span>
          </Button>

          <ModeToggle />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full h-9 w-9 transition-all hover:bg-primary/10 relative"
              >
                <div className="relative">
                  <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-primary/30 to-purple-500/30 blur opacity-70"></div>
                  <div className="relative flex h-full w-full items-center justify-center rounded-full bg-muted">
                    <UserIcon className="h-4 w-4" />
                  </div>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="animate-fade-in w-56">
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <UserIcon className="h-5 w-5 text-primary" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-sm font-medium leading-none">John Doe</p>
                  <p className="text-xs text-muted-foreground">
                    {userType.charAt(0).toUpperCase() + userType.slice(1)}
                  </p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer transition-colors hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary">
                <Link href={`/${userType}/profile`} className="w-full flex items-center">
                  <UserIcon className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer transition-colors hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary">
                <Link href={`/${userType}/settings`} className="w-full flex items-center">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer transition-colors hover:bg-destructive/10 hover:text-destructive focus:bg-destructive/10 focus:text-destructive">
                <Link href="/signin" className="w-full flex items-center">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

