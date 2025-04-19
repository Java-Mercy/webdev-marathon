import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

export default function PricingSection() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "Perfect for students just getting started",
      features: [
        "Access to free courses",
        "Limited course enrollment (3)",
        "Basic progress tracking",
        "Community forum access",
      ],
      cta: "Get Started",
      href: "/auth/register",
      highlighted: false,
    },
    {
      name: "Pro",
      price: "$12",
      period: "/month",
      description: "Ideal for dedicated students",
      features: [
        "Unlimited course enrollment",
        "Advanced progress analytics",
        "Downloadable resources",
        "Priority support",
        "Course certificates",
      ],
      cta: "Start Pro Plan",
      href: "/auth/register?plan=pro",
      highlighted: true,
    },
    {
      name: "Educator",
      price: "$29",
      period: "/month",
      description: "For teachers and content creators",
      features: [
        "Course creation tools",
        "Student analytics dashboard",
        "Custom branding",
        "Payment processing",
        "Marketing tools",
        "Priority support",
      ],
      cta: "Become an Educator",
      href: "/auth/register?plan=educator",
      highlighted: false,
    },
  ]

  return (
    <section id="pricing" className="py-20 bg-muted/30">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Simple, Transparent Pricing</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that's right for you, whether you're a student, educator, or institution.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-lg border ${
                plan.highlighted ? "border-primary shadow-lg scale-105" : "border-border"
              } bg-background p-6 relative flex flex-col`}
            >
              {plan.highlighted && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground text-xs font-medium py-1 px-3 rounded-full">
                  Most Popular
                </div>
              )}
              <div className="mb-4">
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <div className="mt-2 flex items-baseline">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  {plan.period && <span className="ml-1 text-muted-foreground">{plan.period}</span>}
                </div>
                <p className="mt-2 text-muted-foreground">{plan.description}</p>
              </div>
              <ul className="space-y-3 mb-6 flex-grow">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="h-4 w-4 text-primary mr-2" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link href={plan.href} className="mt-auto">
                <Button variant={plan.highlighted ? "default" : "outline"} className="w-full">
                  {plan.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
