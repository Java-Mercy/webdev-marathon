"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Edit, Plus, Trash, Upload, Users, Video, MessageSquare, Star } from "lucide-react"
import TutorDashboardHeader from "@/components/dashboard/tutor-header"
import { useToast } from "@/hooks/use-toast"
import ChatInterface from "@/components/course/chat-interface"

// Mock course data
const courseData = {
  id: 1,
  title: "Introduction to Web Development",
  description:
    "Learn the fundamentals of web development, including HTML, CSS, and JavaScript. This course covers everything you need to know to build your first website.",
  students: 128,
  rating: 4.7,
  thumbnail: "/placeholder.svg?height=400&width=600",
  published: true,
  videos: [
    {
      id: 1,
      title: "Introduction to HTML",
      duration: "12:34",
      transcript: true,
    },
    {
      id: 2,
      title: "CSS Basics",
      duration: "18:22",
      transcript: true,
    },
    {
      id: 3,
      title: "JavaScript Fundamentals",
      duration: "24:15",
      transcript: true,
    },
    {
      id: 4,
      title: "Building Your First Website",
      duration: "32:40",
      transcript: true,
    },
    {
      id: 5,
      title: "Responsive Design",
      duration: "22:18",
      transcript: true,
    },
  ],
  students_list: [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      progress: 75,
      joined: "2 weeks ago",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      progress: 42,
      joined: "1 week ago",
    },
    {
      id: 3,
      name: "Michael Johnson",
      email: "michael.j@example.com",
      progress: 90,
      joined: "3 weeks ago",
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily.d@example.com",
      progress: 30,
      joined: "2 days ago",
    },
  ],
}

export default function TutorCoursePage({ params }: { params: { courseId: string } }) {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("content")

  const handleDeleteVideo = (videoId: number) => {
    toast({
      title: "Video deleted",
      description: "The video has been removed from your course.",
    })
  }

  const handleUploadVideo = () => {
    toast({
      title: "Upload started",
      description: "Your video is being processed. This may take a few minutes.",
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <TutorDashboardHeader />

      <main className="container py-6">
        <div className="flex items-center mb-6">
          <Link href="/dashboard/tutor">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Course sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-background rounded-lg border overflow-hidden">
              <div className="relative">
                <img
                  src={courseData.thumbnail || "/placeholder.svg"}
                  alt={courseData.title}
                  className="w-full h-48 object-cover"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 bg-background/80 hover:bg-background"
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h1 className="text-xl font-bold">{courseData.title}</h1>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    <span className="text-sm">{courseData.students} students</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                    <span className="text-sm">{courseData.rating}</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{courseData.description}</p>
                <div className="flex gap-2">
                  {courseData.published ? (
                    <Button variant="outline" className="w-full">
                      Unpublish
                    </Button>
                  ) : (
                    <Button className="w-full">Publish Course</Button>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-background rounded-lg border p-4">
              <h2 className="font-semibold mb-4">Quick Stats</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Total Students</span>
                  <span className="font-medium">{courseData.students}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Videos</span>
                  <span className="font-medium">{courseData.videos.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Rating</span>
                  <span className="font-medium">{courseData.rating}/5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <span className="font-medium">
                    {courseData.published ? (
                      <span className="text-green-500">Published</span>
                    ) : (
                      <span className="text-yellow-500">Draft</span>
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Main content area */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="students">Students</TabsTrigger>
                <TabsTrigger value="discussion">Discussion</TabsTrigger>
              </TabsList>

              <TabsContent value="content" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Course Videos</h2>
                  <Button onClick={handleUploadVideo}>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Video
                  </Button>
                </div>

                <div className="bg-background rounded-lg border">
                  <div className="p-4 space-y-4">
                    {courseData.videos.map((video) => (
                      <div key={video.id} className="flex items-center justify-between p-3 border rounded-md">
                        <div className="flex items-center">
                          <Video className="h-5 w-5 mr-3 text-primary" />
                          <div>
                            <p className="font-medium">{video.title}</p>
                            <p className="text-xs text-muted-foreground">
                              {video.duration} • {video.transcript ? "Transcript available" : "No transcript"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDeleteVideo(video.id)}>
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}

                    <Button variant="outline" className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Add New Section
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="students">
                <div className="bg-background rounded-lg border">
                  <div className="p-4">
                    <h2 className="text-xl font-semibold mb-4">Enrolled Students</h2>
                    <div className="space-y-4">
                      {courseData.students_list.map((student) => (
                        <div key={student.id} className="flex items-center justify-between p-3 border rounded-md">
                          <div>
                            <p className="font-medium">{student.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {student.email} • Joined {student.joined}
                            </p>
                          </div>
                          <div className="flex items-center gap-4">
                            <div>
                              <p className="text-sm text-right">Progress</p>
                              <div className="w-32 h-2 bg-muted rounded-full mt-1">
                                <div
                                  className="h-2 bg-primary rounded-full"
                                  style={{ width: `${student.progress}%` }}
                                ></div>
                              </div>
                            </div>
                            <Button variant="outline" size="sm">
                              <MessageSquare className="h-4 w-4 mr-2" />
                              Message
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
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
