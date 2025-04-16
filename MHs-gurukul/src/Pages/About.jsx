import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "../Button";
import { BookOpen, CheckCircle, Clock, Users } from "lucide-react";
import Navbar from "../Navbar";
import Footer from "./Footer";

export default function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
    <Navbar/>
      {/* Hero Section */}
      <section className="pt-24 pb-12 md:pt-32 md:pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">About QuizVerse</h1>
            <p className="text-xl text-muted-foreground mb-8 animate-fade-in animate-delay-100">
              Revolutionizing the way students learn through interactive quizzes, engaging videos, and comprehensive notes.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <div className="inline-block">
                <span className="px-3 py-1 text-sm font-medium rounded-full bg-primary/10 text-primary">
                  Our Mission
                </span>
              </div>
              <h2 className="text-3xl font-bold">Empowering through Education</h2>
              <p className="text-muted-foreground">
                At QuizVerse, we believe that education should be accessible, engaging, and effective. Our mission is to provide students with the tools they need to succeed in their academic journey and beyond.
              </p>
              <p className="text-muted-foreground">
                We strive to create a learning environment that is both fun and educational, where students can test their knowledge, learn from their mistakes, and grow their understanding of various subjects.
              </p>
            </div>
            
            <div className="relative animate-fade-in animate-delay-200">
              <div className="aspect-video rounded-lg overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                  alt="Students learning together" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 p-4 bg-background rounded-lg shadow-lg border border-border">
                <span className="text-sm font-medium block gradient-text" style={{ color: "hsl(262, 83%, 58%)" }} >Our Vision</span>
                <p className="text-xs text-muted-foreground mt-1 " style={{ color: "hsl(262, 83%, 58%)" }}>Creating a world where learning knows no boundaries</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Values */}
      <section className="py-16 bg-gradient-to-r from-primary/5 to-accent/10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4 animate-fade-in">Our Core Values</h2>
            <p className="text-muted-foreground animate-fade-in animate-delay-100">
              These principles guide everything we do at QuizVerse.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <BookOpen className="h-8 w-8 text-primary" />,
                title: "Knowledge",
                description: "We believe in the power of knowledge to transform lives and societies."
              },
              {
                icon: <CheckCircle className="h-8 w-8 text-primary" />,
                title: "Quality",
                description: "We are committed to providing high-quality educational content."
              },
              {
                icon: <Users className="h-8 w-8 text-primary" />,
                title: "Inclusivity",
                description: "Education should be accessible to everyone, regardless of background."
              },
              {
                icon: <Clock className="h-8 w-8 text-primary" />,
                title: "Innovation",
                description: "We continuously strive to innovate and improve our platform."
              }
            ].map((value, index) => (
              <div 
                key={index} 
                className="bg-background p-6 rounded-lg shadow-sm border border-border text-center animated-card animate-fade-in"
                style={{ animationDelay: `${index * 100 + 200}ms` }}
              >
                <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full bg-primary/10" style={{ color: "hsl(262, 83%, 58%)" }}>
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4 animate-fade-in">Meet Our Team</h2>
            <p className="text-muted-foreground animate-fade-in animate-delay-100">
              The passionate educators and technologists behind QuizVerse.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Dr. Aarav Singh",
                role: "Founder & CEO",
                image: "https://randomuser.me/api/portraits/men/32.jpg",
                bio: "With over 15 years in education technology, Dr. Singh founded QuizVerse to revolutionize learning."
              },
              {
                name: "Priya Sharma",
                role: "Content Director",
                image: "https://randomuser.me/api/portraits/women/44.jpg",
                bio: "Priya brings her expertise as a former professor to ensure our content meets the highest standards."
              },
              {
                name: "Raj Patel",
                role: "Tech Lead",
                image: "https://randomuser.me/api/portraits/men/22.jpg",
                bio: "A software engineer with a passion for education, Raj builds the technology that powers QuizVerse."
              },
              {
                name: "Meera Kapoor",
                role: "Learning Specialist",
                image: "https://randomuser.me/api/portraits/women/29.jpg",
                bio: "Meera designs learning experiences that make complex concepts accessible and engaging."
              }
            ].map((member, index) => (
              <div 
                key={index} 
                className="bg-background rounded-lg overflow-hidden border border-border shadow-sm animated-card animate-fade-in"
                style={{ animationDelay: `${index * 100 + 200}ms` }}
              >
                <div className="aspect-square">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{member.name}</h3>
                  <p className="text-primary text-sm mb-2">{member.role}</p>
                  <p className="text-muted-foreground text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold animate-fade-in">Join Our Learning Community</h2>
            <p className="text-lg text-muted-foreground animate-fade-in animate-delay-100">
              Be part of a growing community of learners who are transforming their educational journey with QuizVerse.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4 animate-fade-in animate-delay-200">
              <Button size="lg" asChild>
                <Link to="/quiz" style={{ color: "hsl(262, 83%, 58%)" }}>Start Learning Now</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </>
  );
}