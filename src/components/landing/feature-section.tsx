import { BookOpen, Video, MessageSquare, Award, Users, BarChart } from "lucide-react"

export default function FeatureSection() {
  const features = [
    {
      icon: <Video className="h-10 w-10 text-primary" />,
      title: "AI-Enhanced Video Lectures",
      description:
        "Our platform automatically generates transcripts for all uploaded videos, making content more accessible and searchable.",
    },
    {
      icon: <MessageSquare className="h-10 w-10 text-primary" />,
      title: "Real-Time Interaction",
      description:
        "Connect with tutors and peers through our integrated chat system for immediate feedback and collaboration.",
    },
    {
      icon: <BookOpen className="h-10 w-10 text-primary" />,
      title: "Comprehensive Course Creation",
      description: "Intuitive tools for educators to create, organize, and manage course content with ease.",
    },
    {
      icon: <Award className="h-10 w-10 text-primary" />,
      title: "Certification",
      description: "Earn certificates upon course completion to showcase your newly acquired skills.",
    },
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      title: "Community Learning",
      description: "Join a vibrant community of learners and educators to enhance your educational journey.",
    },
    {
      icon: <BarChart className="h-10 w-10 text-primary" />,
      title: "Progress Tracking",
      description: "Monitor your learning progress with detailed analytics and performance metrics.",
    },
  ]

  return (
    <section id="features" className="py-20 bg-muted/50">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Powerful Features for Modern Learning</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our platform combines cutting-edge technology with thoughtful design to create an optimal learning
            environment.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-background p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
