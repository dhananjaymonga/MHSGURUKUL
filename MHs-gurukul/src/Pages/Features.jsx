import React from 'react'
import { ArrowRight, BookOpen, CheckCircle, Lightbulb, PlayCircle, ShieldCheck } from "lucide-react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardDescription
  } from "../ui/Card";
  import { Link } from "react-router-dom";

  import { Button } from '../Button';
import Navbar from '../Navbar';
const Features = () => {
  return (
    <div>
        {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold animate-fade-in">Unlock the Future of Learning</h2>
            <p className="text-lg text-muted-foreground animate-fade-in animate-delay-100">Discover our powerful features designed to enhance your educational journey.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
                {
                  icon: <CheckCircle className="h-8 w-8 text-primary" />,
                  title: "Interactive Quizzes",
                  description: "Test your knowledge with our vast collection of quizzes across different subjects and classes.",
                  link: "/quiz"
                },
                {
                  icon: <PlayCircle className="h-8 w-8 text-primary" />,
                  title: "Video Lessons",
                  description: "Watch engaging video tutorials that break down complex concepts into easily digestible parts.",
                  link: "/video"
                },
                {
                  icon: <BookOpen className="h-8 w-8 text-primary" />,
                  title: "Comprehensive Notes",
                  description: "Access detailed notes to supplement your learning and reinforce key concepts.",
                  link: "/notes"
                },
                {
                  icon: <Lightbulb className="h-8 w-8 text-primary" />,
                  title: "Personalized Learning",
                  description: "Track your progress and receive personalized recommendations based on your performance.",
                  link: "/dashboard" // or another route
                },
                {
                  icon: <CheckCircle className="h-8 w-8 text-primary" />,
                  title: "Detailed Analysis",
                  description: "Review your quiz answers with detailed explanations to understand your mistakes.",
                  link: "/analysis"
                },
              {
                icon: <PlayCircle className="h-8 w-8 text-primary" />,
                title: "Short Video Clips",
                description: "Quickly grasp important concepts with our concise and focused short video clips.",
                link: "/shorts"

              }
            ].map((feature, index) => (
              <Link to={feature.link} key={index} className="block hover:scale-[1.01] transition-transform">
  <Card className="animated-card cursor-pointer h-full">
    <CardHeader>
      <div
        className="p-2 w-fit rounded-full mb-4"
        style={{
          backgroundColor: "hsl(262, 83%, 58%, 0.1)",
          color: "hsl(262, 83%, 58%, 1)"
        }}
      >
        {feature.icon}
      </div>
      <CardTitle>{feature.title}</CardTitle>
    </CardHeader>
    <CardContent>
      <CardDescription className="text-base">
        {feature.description}
      </CardDescription>
    </CardContent>
  </Card>
</Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold animate-fade-in">Ready to Start Your Learning Journey?</h2>
            <p className="text-lg text-muted-foreground animate-fade-in animate-delay-100">
              Join thousands of students who have already transformed their learning experience with QuizVerse.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4 animate-fade-in animate-delay-200">
              <Button size="lg" asChild>
                <Link to="/quiz">
                  Take a Quiz <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/videos">Explore Videos</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Features