import Link from "next/link"
import { Star, Users } from "lucide-react"
import { formatPrice } from "@/lib/utils"

interface CourseCardProps {
  course: {
    id: number
    title: string
    instructor: string
    rating: number
    students: number
    thumbnail: string
    price: number
  }
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <Link href={`/courses/${course.id}`}>
      <div className="bg-background border rounded-lg overflow-hidden hover:shadow-md transition-shadow course-card">
        <img src={course.thumbnail || "/placeholder.svg"} alt={course.title} className="w-full h-40 object-cover" />
        <div className="p-4">
          <h3 className="font-semibold mb-1">{course.title}</h3>
          <p className="text-sm text-muted-foreground mb-2">{course.instructor}</p>
          <div className="flex items-center mb-2">
            <div className="flex items-center mr-2">
              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
              <span className="ml-1 text-sm font-medium">{course.rating}</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Users className="h-4 w-4 mr-1" />
              {course.students} students
            </div>
          </div>
          <p className="font-semibold">{formatPrice(course.price)}</p>
        </div>
      </div>
    </Link>
  )
}
