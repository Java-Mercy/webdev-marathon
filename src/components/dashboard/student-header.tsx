"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BookOpen, Bell, User, Menu } from "lucide-react"
import { useState } from "react"

export default function StudentDashboardHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">EduHub</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/dashboard/student" className="text-sm font-medium text-foreground">
            Dashboard
          </Link>
          <Link href="/courses" className="text-sm font-medium text-muted-foreground hover:text-foreground">
            Browse Courses
          </Link>
          <Link
            href="/dashboard/student/messages"
            className="text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            Messages
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-primary"></span>
          </Button>

          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>

          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container py-3 space-y-1">
            <Link href="/dashboard/student">
              <Button variant="ghost" className="w-full justify-start">
                Dashboard
              </Button>
            </Link>
            <Link href="/courses">
              <Button variant="ghost" className="w-full justify-start">
                Browse Courses
              </Button>
            </Link>
            <Link href="/dashboard/student/messages">
              <Button variant="ghost" className="w-full justify-start">
                Messages
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
