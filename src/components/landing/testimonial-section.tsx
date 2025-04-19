export default function TestimonialSection() {
  const testimonials = [
    {
      quote:
        "This platform has completely transformed how I teach my computer science courses. The AI transcript feature saves me hours of work!",
      author: "Dr. Sarah Johnson",
      role: "Professor of Computer Science",
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      quote:
        "As a student with dyslexia, having automatic transcripts for all video lectures has been a game-changer for my learning experience.",
      author: "Michael Chen",
      role: "Computer Engineering Student",
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      quote:
        "The real-time chat feature allows me to connect with my students even outside of class hours, making learning truly accessible.",
      author: "Prof. Emily Rodriguez",
      role: "Mathematics Educator",
      avatar: "/placeholder.svg?height=60&width=60",
    },
  ]

  return (
    <section id="testimonials" className="py-20">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">What Our Users Say</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hear from educators and students who have transformed their teaching and learning experience with our
            platform.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-muted/30 p-6 rounded-lg border relative">
              <div className="mb-4">
                <svg className="h-8 w-8 text-primary/20" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
              </div>
              <p className="mb-4 text-lg">{testimonial.quote}</p>
              <div className="flex items-center">
                <img
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.author}
                  className="h-10 w-10 rounded-full mr-3"
                />
                <div>
                  <p className="font-medium">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
