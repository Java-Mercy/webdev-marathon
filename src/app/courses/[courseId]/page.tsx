"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BookOpen, ArrowLeft, Star, Users, Clock, CheckCircle, ShoppingCart } from "lucide-react"
import { formatPrice } from "@/lib/utils"

// Mock course data
const courseData = {
  id: 1,
  title: "Introduction to Web Development",
  instructor: "Dr. Sarah Johnson",
  description:
    "Learn the fundamentals of web development, including HTML, CSS, and JavaScript. This course covers everything you need to know to build your first website.",
  longDescription:
    "This comprehensive course is designed for absolute beginners who want to learn web development from scratch. You'll start with the basics of HTML to structure your content, move on to CSS to style your pages, and finish with JavaScript to add interactivity. By the end of this course, you'll have the skills to build responsive, interactive websites and a solid foundation for more advanced web development topics.\n\nNo prior programming experience is required. All you need is a computer with an internet connection and a desire to learn.",
  price: 49.99,
  rating: 4.7,
  reviewCount: 1245,
  students: 3210,
  thumbnail: "/placeholder.svg?height=400&width=600",
  duration: "12 hours",
  lastUpdated: "March 2023",
  level: "Beginner",
  whatYouWillLearn: [
    "Build websites using HTML, CSS, and JavaScript",
    "Understand web development fundamentals",
    "Create responsive layouts that work on mobile and desktop",
    "Implement interactive features with JavaScript",
    "Deploy your website to the internet",
    "Troubleshoot common web development issues",
  ],
  curriculum: [
    {
      title: "Getting Started",
      lessons: [
        { title: "Introduction to the Course", duration: "5:22" },
        { title: "Setting Up Your Development Environment", duration: "12:34" },
        { title: "Web Development Overview", duration: "8:45" },
      ],
    },
    {
      title: "HTML Fundamentals",
      lessons: [
        { title: "HTML Document Structure", duration: "15:22" },
        { title: "Working with Text and Links", duration: "18:34" },
        { title: "Images and Media", duration: "14:15" },
        { title: "Forms and Input Elements", duration: "22:46" },
      ],
    },
    {
      title: "CSS Styling",
      lessons: [
        { title: "CSS Basics", duration: "18:22" },
        { title: "Selectors and Properties", duration: "20:14" },
        { title: "Box Model and Layout", duration: "25:33" },
        { title: "Responsive Design", duration: "22:18" },
      ],
    },
    {
      title: "JavaScript Essentials",
      lessons: [
        { title: "JavaScript Fundamentals", duration: "24:15" },
        { title: "DOM Manipulation", duration: "28:42" },
        { title: "Events and Interactivity", duration: "26:19" },
        { title: "Building a Simple Web App", duration: "32:40" },
      ],
    },
    {
      title: "Final Project",
      lessons: [
        { title: "Project Planning", duration: "12:30" },
        { title: "Building Your Website", duration: "45:20" },
        { title: "Testing and Debugging", duration: "18:45" },
        { title: "Deployment", duration: "15:10" },
      ],
    },
  ],
}

export default function CoursePage({ params }: { params: { courseId: string } }) {
  const [expandedSections, setExpandedSections] = useState<number[]>([0]);

  const toggleSection = (index: number) => {
    if (expandedSections.includes(index)) {
      setExpandedSections(expandedSections.filter((i) => i !== index));
    } else {
      setExpandedSections([...expandedSections, index]);
    }
  };

  const totalLessons = courseData.curriculum.reduce(
    (acc, section) => acc + section.lessons.length,
    0
  );

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
            <Link
              href="/"
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Home
            </Link>
            <Link
              href="/courses"
              className="text-sm font-medium text-foreground"
            >
              Courses
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
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
        <div className="flex items-center mb-6">
          <Link href="/courses">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Courses
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Course details */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h1 className="text-3xl font-bold mb-4">{courseData.title}</h1>
              <p className="text-lg mb-4">{courseData.description}</p>
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400 mr-1" />
                  <span className="font-medium mr-1">{courseData.rating}</span>
                  <span className="text-muted-foreground">
                    ({courseData.reviewCount} reviews)
                  </span>
                </div>
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-1" />
                  <span>{courseData.students} students</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-1" />
                  <span>{courseData.duration}</span>
                </div>
              </div>
              <p className="text-sm">
                Created by{" "}
                <span className="font-medium">{courseData.instructor}</span>
              </p>
              <p className="text-sm">
                Last updated: {courseData.lastUpdated} • Level:{" "}
                {courseData.level}
              </p>
            </div>

            <div className="bg-background rounded-lg border overflow-hidden lg:hidden">
              <img
                src={courseData.thumbnail || "/placeholder.svg"}
                alt={courseData.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="text-3xl font-bold mb-4">
                  {formatPrice(courseData.price)}
                </div>
                <Button className="w-full mb-3">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Enroll Now
                </Button>
                <p className="text-sm text-center text-muted-foreground mb-4">
                  30-Day Money-Back Guarantee
                </p>
                <div className="space-y-2 text-sm">
                  <p className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    {courseData.duration} of content
                  </p>
                  <p className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    {totalLessons} lessons
                  </p>
                  <p className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Full lifetime access
                  </p>
                  <p className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Access on mobile and TV
                  </p>
                  <p className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Certificate of completion
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4">What You'll Learn</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {courseData.whatYouWillLearn.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-2 text-primary flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4">Course Description</h2>
              <div className="prose max-w-none">
                {courseData.longDescription.split("\n\n").map((paragraph, i) => (
                  <p key={i} className="mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4">Course Content</h2>
              <div className="bg-background rounded-lg border">
                <div className="p-4 border-b">
                  <p className="text-sm">
                    {courseData.curriculum.length} sections • {totalLessons}{" "}
                    lessons • {courseData.duration} total length
                  </p>
                </div>
                <div>
                  {courseData.curriculum.map((section, sectionIndex) => (
                    <div key={sectionIndex} className="border-b last:border-b-0">
                      <button
                        className="flex items-center justify-between w-full p-4 text-left"
                        onClick={() => toggleSection(sectionIndex)}
                      >
                        <span className="font-medium">{section.title}</span>
                        <div className="flex items-center">
                          <span className="text-sm text-muted-foreground mr-2">
                            {section.lessons.length} lessons
                          </span>
                          <ChevronDown
                            className={`h-5 w-5 transition-transform ${
                              expandedSections.includes(sectionIndex)
                                ? "transform rotate-180"
                                : ""
                            }`}
                          />
                        </div>
                      </button>
                      {expandedSections.includes(sectionIndex) && (
                        <div className="px-4 pb-4 space-y-2">
                          {section.lessons.map((lesson, lessonIndex) => (
                            <div
                              key={lessonIndex}
                              className="flex items-center justify-between py-2"
                            >
                              <div className="flex items-center">
                                <Play className="h-4 w-4 mr-2" />
                                <span className="text-sm">{lesson.title}</span>
                              </div>
                              <span className="text-xs text-muted-foreground">
                                {lesson.duration}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4">Instructor</h2>
              <div className="bg-background rounded-lg border p-6">
                <div className="flex items-start gap-4">
                  <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                    <User className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">
                      {courseData.instructor}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Web Development Instructor
                    </p>
                    <div className="flex items-center gap-4 mb-3">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                        <span className="text-sm">4.8 Instructor Rating</span>
                      </div>
                      <div className="flex items-center">
                        <Award className="h-4 w-4 mr-1" />
                        <span className="text-sm">15 Courses</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        <span className="text-sm">12,345 Students</span>
                      </div>
                    </div>\
