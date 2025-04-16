import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
// import { ArrowRight, PlayCircle, CheckCircle, ShieldCheck } from "lucide-react";
import { ArrowRight, BookOpen, CheckCircle, Lightbulb, PlayCircle, ShieldCheck } from "lucide-react";

import { Button } from "./Button";

export default function HeroSection() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen pt-20 pb-16 flex items-center">
        {/* Background with gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/10 z-0"></div>
        
        {/* Content */}
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="space-y-6">
              <div className="inline-block animate-fade-in">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
                  Learning Made Fun
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold animate-fade-in animate-delay-100">
              Transform Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">Learning Journey</span>
              </h1>
              <p className="text-xl text-muted-foreground animate-fade-in animate-delay-200">
                Interactive quizzes, engaging videos, and comprehensive notes to enhance your educational experience.
              </p>
              <div className="flex flex-wrap gap-4 animate-fade-in animate-delay-300">
                <Button size="lg" asChild>
                  <Link to="/quiz">Start Quiz</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/videos">Watch Videos</Link>
                </Button>
                <Button size="sm" variant="ghost" className="gap-1" asChild>
                  <Link to="/admin">
                    <ShieldCheck className="h-4 w-4" />
                    Admin
                  </Link>
                </Button>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 animate-fade-in animate-delay-400">
                {[ 
                  { label: "Quizzes", value: "1,000+" },
                  { label: "Videos", value: "500+" },
                  { label: "Students", value: "50K+" }
                ].map((stat, index) => (
                  <div key={index} className="text-center p-3 rounded-lg bg-background/50 border border-border">
                    <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Hero Image */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="w-full max-w-md h-auto aspect-square relative">
                {/* Background Gradient Circle */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-blue-500/20 rounded-full animate-pulse bg-amber-400"></div>
                
                {/* Image inside circle */}
                <div className="relative overflow-hidden rounded-full w-96 h-96 bg-amber-600">
                  <img
                    src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
                    alt="Laptop with code"
                    className="rounded-full object-cover w-full h-full z-10 relative animate-fade-in shadow-xl"
                  />
                </div>

                {/* Floating elements */}
                <div className="absolute -top-6 -left-6 p-4 bg-background rounded-lg shadow-lg border border-border animate-fade-in animate-delay-300">
                  <PlayCircle className="h-6 w-6 text-primary" />
                  <span className="text-sm font-medium mt-1 block">500+ Videos</span>
                </div>
                
                <div className="absolute -bottom-6 -right-6 p-4 bg-background rounded-lg shadow-lg border border-border animate-fade-in animate-delay-500">
                  <CheckCircle className="h-6 w-6 text-primary" />
                  <span className="text-sm font-medium mt-1 block">Interactive Learning</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
