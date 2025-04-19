"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import TutorDashboardHeader from "@/components/dashboard/tutor-header"
import { ArrowLeft, Upload } from "lucide-react"
import Link from "next/link"

const formSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  description: z.string().min(20, {
    message: "Description must be at least 20 characters.",
  }),
  price: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
    message: "Price must be a valid number.",
  }),
  thumbnail: z.any().optional(),
})

export default function CreateCoursePage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      price: "",
    },
  })

  function handleThumbnailChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) {
      form.setValue("thumbnail", file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setThumbnailPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    try {
      // In a real app, you would upload the thumbnail and create the course
      console.log("Course creation values:", values)

      toast({
        title: "Course created!",
        description: "Your course has been created successfully.",
      })

      router.push("/dashboard/tutor")
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
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

        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Create New Course</h1>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Introduction to Web Development" {...field} />
                    </FormControl>
                    <FormDescription>Choose a clear and descriptive title for your course.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe what students will learn in this course..."
                        className="min-h-32"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Provide a detailed description of your course content and learning outcomes.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price (USD)</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" step="0.01" placeholder="29.99" {...field} />
                    </FormControl>
                    <FormDescription>Set a price for your course, or enter 0 for a free course.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="thumbnail"
                render={({ field: { value, onChange, ...fieldProps } }) => (
                  <FormItem>
                    <FormLabel>Course Thumbnail</FormLabel>
                    <FormControl>
                      <div className="flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 cursor-pointer hover:bg-muted/50 transition-colors">
                        {thumbnailPreview ? (
                          <div className="relative w-full">
                            <img
                              src={thumbnailPreview || "/placeholder.svg"}
                              alt="Thumbnail preview"
                              className="w-full h-48 object-cover rounded-lg mb-4"
                            />
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              className="absolute top-2 right-2"
                              onClick={() => {
                                setThumbnailPreview(null)
                                onChange(null)
                              }}
                            >
                              Remove
                            </Button>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center py-4">
                            <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                            <p className="text-sm text-muted-foreground mb-1">
                              Drag and drop your thumbnail image here
                            </p>
                            <p className="text-xs text-muted-foreground">PNG, JPG or GIF, max 2MB</p>
                          </div>
                        )}
                        <Input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          id="thumbnail-upload"
                          onChange={handleThumbnailChange}
                          {...fieldProps}
                        />
                        <label htmlFor="thumbnail-upload" className="w-full">
                          <Button type="button" variant="outline" className="w-full mt-4">
                            Select Image
                          </Button>
                        </label>
                      </div>
                    </FormControl>
                    <FormDescription>Upload an eye-catching thumbnail image for your course.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" disabled={isLoading}>
                  Save as Draft
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Creating..." : "Create Course"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </main>
    </div>
  )
}
