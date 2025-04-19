"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, MessageSquare, Play, FileText } from "lucide-react"
import StudentDashboardHeader from "@/components/dashboard/student-header"
import ChatInterface from "@/components/course/chat-interface"

// Mock course data
const courseData = {
  id: 1,
  title: "Introduction to Web Development",
  instructor: "Dr. Sarah Johnson",
  description:
    "Learn the fundamentals of web development, including HTML, CSS, and JavaScript. This course covers everything you need to know to build your first website.",
  progress: 65,
  thumbnail: "/placeholder.svg?height=400&width=600",
  videos: [
    {
      id: 1,
      title: "Introduction to HTML",
      duration: "12:34",
      watched: true,
    },
    {
      id: 2,
      title: "CSS Basics",
      duration: "18:22",
      watched: true,
    },
    {
      id: 3,
      title: "JavaScript Fundamentals",
      duration: "24:15",
      watched: false,
      current: true,
    },
    {
      id: 4,
      title: "Building Your First Website",
      duration: "32:40",
      watched: false,
    },
    {
      id: 5,
      title: "Responsive Design",
      duration: "22:18",
      watched: false,
    },
  ],
}

export default function CoursePage({ params }: { params: { courseId: string } }) {
  const [activeVideo, setActiveVideo] = useState(courseData.videos.find((v) => v.current) || courseData.videos[0])
  const [activeTab, setActiveTab] = useState("video")

  // Mock transcript data
  const transcript = `
    Welcome to the JavaScript Fundamentals lesson.
    
    In this video, we'll cover the basics of JavaScript, including variables, functions, and control flow.
    
    JavaScript is a programming language that allows you to implement complex features on web pages. It's an essential part of web development.
    
    Let's start by looking at variables. In JavaScript, you can declare variables using var, let, or const.
    
    var name = "John";
    let age = 30;
    const PI = 3.14;
    
    Functions are reusable blocks of code. Here's how you define a function in JavaScript:
    
    function greet(name) {
      return "Hello, " + name + "!";
    }
    
    Control flow statements like if, else, and loops allow you to control the execution of your code.
    
    if (age >= 18) {
      console.log("You are an adult");
    } else {
      console.log("You are a minor");
    }
    
    That's a brief introduction to JavaScript fundamentals. In the next video, we'll put these concepts together to build a simple web application.
  `

  return (
    <div className="min-h-screen bg-background">
      <StudentDashboardHeader />

      <main className="container py-6">
        <div className="flex items-center mb-6">
          <Link href="/dashboard/student">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Course content sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-background rounded-lg border overflow-hidden">
              <img
                src={courseData.thumbnail || "/placeholder.svg"}
                alt={courseData.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h1 className="text-xl font-bold mb-2">{courseData.title}</h1>
                <p className="text-sm text-muted-foreground mb-4">Instructor: {courseData.instructor}</p>
                <div className="mb-2">
                  <div className="h-2 bg-muted rounded-full">
                    <div className="h-2 bg-primary rounded-full" style={{ width: `${courseData.progress}%` }}></div>
                  </div>
                  <p className="text-xs text-right mt-1 text-muted-foreground">{courseData.progress}% complete</p>
                </div>
              </div>
            </div>

            <div className="bg-background rounded-lg border p-4">
              <h2 className="font-semibold mb-4">Course Content</h2>
              <div className="space-y-2">
                {courseData.videos.map((video) => (
                  <button
                    key={video.id}
                    className={`w-full flex items-center justify-between p-2 rounded-md text-left ${
                      video.id === activeVideo.id ? "bg-primary/10 text-primary" : "hover:bg-muted"
                    }`}
                    onClick={() => setActiveVideo(video)}
                  >
                    <div className="flex items-center">
                      <Play className="h-4 w-4 mr-2" />
                      <span className="text-sm">{video.title}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-xs text-muted-foreground mr-2">{video.duration}</span>
                      {video.watched && <div className="h-2 w-2 rounded-full bg-green-500"></div>}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main content area */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="video">Video</TabsTrigger>
                <TabsTrigger value="discussion">Discussion</TabsTrigger>
              </TabsList>

              <TabsContent value="video" className="space-y-4">
                <div className="bg-background rounded-lg border overflow-hidden">
                  <div className="video-container">
                    <video controls poster="/placeholder.svg?height=400&width=600" className="w-full">
                      <source src="#" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  <div className="p-4">
                    <h2 className="text-xl font-bold mb-2">{activeVideo.title}</h2>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <span>{activeVideo.duration}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-background rounded-lg border p-4">
                  <div className="flex items-center mb-4">
                    <FileText className="h-5 w-5 mr-2" />
                    <h3 className="font-semibold">AI-Generated Transcript</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    <pre className="text-sm whitespace-pre-wrap">{transcript}</pre>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="discussion">
                <div className="bg-background rounded-lg border p-4">
                  <div className="flex items-center mb-4">
                    <MessageSquare className="h-5 w-5 mr-2" />
                    <h3 className="font-semibold">Course Discussion</h3>
                  </div>
                  <ChatInterface courseId={params.courseId} />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}
