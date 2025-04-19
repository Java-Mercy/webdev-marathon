"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BookOpen, Search, Filter, ChevronDown } from "lucide-react"
import CourseCard from "@/components/dashboard/course-card"

// Mock data for courses
const allCourses = [
  {
    id: 1,
    title: "Introduction to Web Development",
    instructor: "Dr. Sarah Johnson",
    rating: 4.7,
    students: 1245,
    thumbnail: "/placeholder.svg?height=200&width=300",
    price: 49.99,
    category: "web-development",
    level: "beginner",
  },
  {
    id: 2,
    title: "Advanced JavaScript Concepts",
    instructor: "Alex Thompson",
    rating: 4.8,
    students: 987,
    thumbnail: "/placeholder.svg?height=200&width=300",
    price: 59.99,
    category: "web-development",
    level: "advanced",
  },
  {
    id: 3,
    title: "Python for Data Science",
    instructor: "Jessica Lee",
    rating: 4.9,
    students: 3210,
    thumbnail: "/placeholder.svg?height=200&width=300",
    price: 69.99,
    category: "data-science",
    level: "intermediate",
  },
  {
    id: 4,
    title: "Machine Learning Fundamentals",
    instructor: "Dr. Emily Rodriguez",
    rating: 4.6,
    students: 1876,
    thumbnail: "/placeholder.svg?height=200&width=300",
    price: 79.99,
    category: "data-science",
    level: "intermediate",
  },
  {
    id: 5,
    title: "UI/UX Design Principles",
    instructor: "David Wilson",
    rating: 4.7,
    students: 1543,
    thumbnail: "/placeholder.svg?height=200&width=300",
    price: 39.99,
    category: "design",
    level: "beginner",
  },
  {
    id: 6,
    title: "Mobile App Development with React Native",
    instructor: "Michael Chen",
    rating: 4.5,
    students: 987,
    thumbnail: "/placeholder.svg?height=200&width=300",
    price: 59.99,
    category: "mobile-development",
    level: "intermediate",
  },
  {
    id: 7,
    title: "Database Design and SQL",
    instructor: "Lisa Brown",
    rating: 4.4,
    students: 765,
    thumbnail: "/placeholder.svg?height=200&width=300",
    price: 49.99,
    category: "database",
    level: "beginner",
  },
  {
    id: 8,
    title: "DevOps and CI/CD Pipelines",
    instructor: "Robert Martinez",
    rating: 4.8,
    students: 543,
    thumbnail: "/placeholder.svg?height=200&width=300",
    price: 69.99,
    category: "devops",
    level: "advanced",
  },
  {
    id: 9,
    title: "Blockchain Development",
    instructor: "Jennifer Adams",
    rating: 4.6,
    students: 432,
    thumbnail: "/placeholder.svg?height=200&width=300",
    price: 79.99,
    category: "blockchain",
    level: "advanced",
  },
]

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [levelFilter, setLevelFilter] = useState("all")

  const filteredCourses = allCourses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === "all" || course.category === categoryFilter
    const matchesLevel = levelFilter === "all" || course.level === levelFilter
    return matchesSearch && matchesCategory && matchesLevel
  })

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">EduHub</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Home
            </Link>
            <Link href="/courses" className="text-sm font-medium text-foreground">
              Courses
            </Link>
            <Link href="/about" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              About
            </Link>
            <Link href="/contact" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/auth/login">
              <Button variant="outline" size="sm">
                Log In
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button size="sm">Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar filters */}
          <aside className="w-full md:w-64 space-y-6">
            <div className="bg-background rounded-lg border p-4">
              <h2 className="font-semibold mb-4 flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </h2>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Category</h3>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        checked={categoryFilter === "all"}
                        onChange={() => setCategoryFilter("all")}
                        className="mr-2"
                      />
                      <span className="text-sm">All Categories</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        checked={categoryFilter === "web-development"}
                        onChange={() => setCategoryFilter("web-development")}
                        className="mr-2"
                      />
                      <span className="text-sm">Web Development</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        checked={categoryFilter === "data-science"}
                        onChange={() => setCategoryFilter("data-science")}
                        className="mr-2"
                      />
                      <span className="text-sm">Data Science</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        checked={categoryFilter === "design"}
                        onChange={() => setCategoryFilter("design")}
                        className="mr-2"
                      />
                      <span className="text-sm">Design</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        checked={categoryFilter === "mobile-development"}
                        onChange={() => setCategoryFilter("mobile-development")}
                        className="mr-2"
                      />
                      <span className="text-sm">Mobile Development</span>
                    </label>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Level</h3>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="level"
                        checked={levelFilter === "all"}
                        onChange={() => setLevelFilter("all")}
                        className="mr-2"
                      />
                      <span className="text-sm">All Levels</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="level"
                        checked={levelFilter === "beginner"}
                        onChange={() => setLevelFilter("beginner")}
                        className="mr-2"
                      />
                      <span className="text-sm">Beginner</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="level"
                        checked={levelFilter === "intermediate"}
                        onChange={() => setLevelFilter("intermediate")}
                        className="mr-2"
                      />
                      <span className="text-sm">Intermediate</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="level"
                        checked={levelFilter === "advanced"}
                        onChange={() => setLevelFilter("advanced")}
                        className="mr-2"
                      />
                      <span className="text-sm">Advanced</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1 space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">Browse Courses</h1>
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
              <p className="text-sm text-muted-foreground">Showing {filteredCourses.length} courses</p>
              <div className="flex items-center gap-2">
                <span className="text-sm">Sort by:</span>
                <Button variant="outline" size="sm">
                  Most Popular
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>

            {filteredCourses.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">No courses found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            <p className="text-sm leading-loose text-center md:text-left">
              &copy; {new Date().getFullYear()} EduHub. All rights reserved.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="text-sm text-muted-foreground hover:underline">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:underline">
              Privacy
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
