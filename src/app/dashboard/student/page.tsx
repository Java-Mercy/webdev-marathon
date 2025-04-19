"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, User, Clock, BookMarked, MessageSquare, BarChart } from "lucide-react"
import StudentDashboardHeader from "@/components/dashboard/student-header"
import CourseCard from "@/components/dashboard/course-card"

// Mock data for enrolled courses
const enrolledCourses = [
  {
    id: 1,
    title: "Introduction to Web Development",
    instructor: "Dr. Sarah Johnson",
    progress: 65,
    thumbnail: "/placeholder.svg?height=200&width=300",
    lastAccessed: "2 days ago",
  },
  {
    id: 2,
    title: "Data Structures and Algorithms",
    instructor: "Prof. Michael Chen",
    progress: 32,
    thumbnail: "/placeholder.svg?height=200&width=300",
    lastAccessed: "Yesterday",
  },
  {
    id: 3,
    title: "Machine Learning Fundamentals",
    instructor: "Dr. Emily Rodriguez",
    progress: 78,
    thumbnail: "/placeholder.svg?height=200&width=300",
    lastAccessed: "4 days ago",
  },
]

// Mock data for recommended courses
const recommendedCourses = [
  {
    id: 4,
    title: "Advanced JavaScript Concepts",
    instructor: "Alex Thompson",
    rating: 4.8,
    students: 1245,
    thumbnail: "/placeholder.svg?height=200&width=300",
    price: 49.99,
  },
  {
    id: 5,
    title: "Python for Data Science",
    instructor: "Jessica Lee",
    rating: 4.9,
    students: 3210,
    thumbnail: "/placeholder.svg?height=200&width=300",
    price: 59.99,
  },
  {
    id: 6,
    title: "UI/UX Design Principles",
    instructor: "David Wilson",
    rating: 4.7,
    students: 987,
    thumbnail: "/placeholder.svg?height=200&width=300",
    price: 39.99,
  },
]

export default function StudentDashboard() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="min-h-screen bg-background">
      <StudentDashboardHeader />

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
                  <p className="font-medium">John Doe</p>
                  <p className="text-sm text-muted-foreground">Student</p>
                </div>
              </div>
              <div className="space-y-1">
                <Link href="/dashboard/student">
                  <Button variant="ghost" className="w-full justify-start">
                    <BookMarked className="mr-2 h-4 w-4" />
                    My Courses
                  </Button>
                </Link>
                <Link href="/dashboard/student/messages">
                  <Button variant="ghost" className="w-full justify-start">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Messages
                  </Button>
                </Link>
                <Link href="/dashboard/student/progress">
                  <Button variant="ghost" className="w-full justify-start">
                    <BarChart className="mr-2 h-4 w-4" />
                    My Progress
                  </Button>
                </Link>
              </div>
            </div>

            <div className="bg-background rounded-lg border p-4">
              <h3 className="font-medium mb-2">Learning Statistics</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Courses Enrolled</span>
                  <span className="font-medium">3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Hours Learned</span>
                  <span className="font-medium">27.5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Certificates</span>
                  <span className="font-medium">1</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1 space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">Welcome back, John!</h1>
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

            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Continue Learning</h2>
                <Link href="/dashboard/student/courses">
                  <Button variant="link" className="text-primary">
                    View all
                  </Button>
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {enrolledCourses.map((course) => (
                  <Link key={course.id} href={`/dashboard/student/courses/${course.id}`}>
                    <div className="bg-background border rounded-lg overflow-hidden hover:shadow-md transition-shadow course-card">
                      <img
                        src={course.thumbnail || "/placeholder.svg"}
                        alt={course.title}
                        className="w-full h-40 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="font-semibold mb-1">{course.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{course.instructor}</p>
                        <div className="mb-2">
                          <div className="h-2 bg-muted rounded-full">
                            <div className="h-2 bg-primary rounded-full" style={{ width: `${course.progress}%` }}></div>
                          </div>
                          <p className="text-xs text-right mt-1 text-muted-foreground">{course.progress}% complete</p>
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          Last accessed {course.lastAccessed}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Recommended for You</h2>
                <Link href="/courses">
                  <Button variant="link" className="text-primary">
                    Browse all courses
                  </Button>
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendedCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}
