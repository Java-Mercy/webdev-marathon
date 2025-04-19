"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, User, PlusCircle, Users, BarChart, MessageSquare, BookMarked, Settings, Star } from "lucide-react"
import TutorDashboardHeader from "@/components/dashboard/tutor-header"

// Mock data for courses
const tutorCourses = [
  {
    id: 1,
    title: "Introduction to Web Development",
    students: 128,
    rating: 4.7,
    thumbnail: "/placeholder.svg?height=200&width=300",
    lastUpdated: "2 days ago",
    published: true,
  },
  {
    id: 2,
    title: "Advanced JavaScript Concepts",
    students: 87,
    rating: 4.9,
    thumbnail: "/placeholder.svg?height=200&width=300",
    lastUpdated: "1 week ago",
    published: true,
  },
  {
    id: 3,
    title: "React Framework Deep Dive",
    students: 0,
    rating: 0,
    thumbnail: "/placeholder.svg?height=200&width=300",
    lastUpdated: "Just now",
    published: false,
  },
]

export default function TutorDashboard() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="min-h-screen bg-background">
      <TutorDashboardHeader />

      <main className="container py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <aside className="w-full md:w-64 space-y-6">
            <div className="bg-background rounded-lg border p-4">
              <div className="flex items-center space-x-3 mb-6">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Dr. Sarah Johnson</p>
                  <p className="text-sm text-muted-foreground">Tutor</p>
                </div>
              </div>
              <div className="space-y-1">
                <Link href="/dashboard/tutor">
                  <Button variant="ghost" className="w-full justify-start">
                    <BookMarked className="mr-2 h-4 w-4" />
                    My Courses
                  </Button>
                </Link>
                <Link href="/dashboard/tutor/students">
                  <Button variant="ghost" className="w-full justify-start">
                    <Users className="mr-2 h-4 w-4" />
                    Students
                  </Button>
                </Link>
                <Link href="/dashboard/tutor/messages">
                  <Button variant="ghost" className="w-full justify-start">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Messages
                  </Button>
                </Link>
                <Link href="/dashboard/tutor/analytics">
                  <Button variant="ghost" className="w-full justify-start">
                    <BarChart className="mr-2 h-4 w-4" />
                    Analytics
                  </Button>
                </Link>
                <Link href="/dashboard/tutor/settings">
                  <Button variant="ghost" className="w-full justify-start">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Button>
                </Link>
              </div>
            </div>

            <div className="bg-background rounded-lg border p-4">
              <h3 className="font-medium mb-2">Teaching Statistics</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Total Students</span>
                  <span className="font-medium">215</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Active Courses</span>
                  <span className="font-medium">2</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Avg. Rating</span>
                  <span className="font-medium">4.8</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1 space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">Tutor Dashboard</h1>
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search courses..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Your Courses</h2>
              <Link href="/dashboard/tutor/courses/create">
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Create New Course
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tutorCourses.map((course) => (
                <Link key={course.id} href={`/dashboard/tutor/courses/${course.id}`}>
                  <div className="bg-background border rounded-lg overflow-hidden hover:shadow-md transition-shadow course-card">
                    <div className="relative">
                      <img
                        src={course.thumbnail || "/placeholder.svg"}
                        alt={course.title}
                        className="w-full h-40 object-cover"
                      />
                      {!course.published && (
                        <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded">
                          Draft
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold mb-1">{course.title}</h3>
                      <div className="flex justify-between mb-2">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Users className="h-4 w-4 mr-1" />
                          {course.students} students
                        </div>
                        {course.rating > 0 && (
                          <div className="flex items-center">
                            <span className="text-sm font-medium mr-1">{course.rating}</span>
                            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                          </div>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground">Last updated: {course.lastUpdated}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <section className="bg-muted/30 rounded-lg p-6">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Ready to create more engaging content?</h3>
                  <p className="text-muted-foreground">
                    Use our AI-powered tools to generate transcripts and enhance your course materials.
                  </p>
                </div>
                <Link href="/dashboard/tutor/courses/create">
                  <Button>Get Started</Button>
                </Link>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}
