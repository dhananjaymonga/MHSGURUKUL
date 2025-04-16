import React from "react";
import { Link } from "react-router-dom";
import { ExternalLink, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-primary/5 to-accent/20 border-t border-border mt-12">
      <div className="container mx-auto py-12 px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div className="space-y-4 animate-fade-in">
            <Link to="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 flex items-center justify-center text-white font-bold text-xs">
                Q
              </div>
              <span className="text-lg font-bold gradient-text">QuizVerse</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              QuizVerse is an interactive learning platform designed to make education fun and engaging through quizzes, videos, and study materials.
            </p>
            <div className="flex space-x-4 pt-2">
              {['facebook', 'twitter', 'instagram', 'youtube'].map(social => (
               <Link
               to={`https://${social}.com`}
               key={social}
               target="_blank"
               rel="noopener noreferrer"
               className="h-8 w-8 rounded-full bg-[hsl(262,_83%,_58%,_0.1)] flex items-center justify-center hover:bg-[hsl(262,_83%,_58%)] hover:text-white transition-colors duration-300"
             >
               <span className="sr-only">{social}</span>
               <ExternalLink className="h-4 w-4 text-[hsl(262,_83%,_58%)]" />
             </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4 animate-fade-in animate-delay-200">
            <h3 className="text-base font-medium text-primary"  
            >Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: "Home", path: "/" },
                { name: "About", path: "/about" },
                { name: "Blog", path: "/blog" },
                { name: "Videos", path: "/video" },
                { name: "Notes", path: "/notes" },
                { name: "Quiz", path: "/quiz" },
                { name: "Contact", path: "/contact" }
              ].map(link => (
                <li key={link.name}>
                <Link
  to={link.path}
  className="text-sm transition-colors duration-200"
  style={{
    color: "hsl(262, 0%, 50%)", // default muted text
  }}
  onMouseEnter={(e) => (e.currentTarget.style.color = "hsl(262, 83%, 58%)")}
  onMouseLeave={(e) => (e.currentTarget.style.color = "hsl(262, 0%, 50%)")}
>
  {link.name}
</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4 animate-fade-in animate-delay-300">
            <h3 className="text-base font-medium text-primary">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3 text-sm text-muted-foreground">
                <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5"  style={{ color: "hsl(262, 83%, 58%)" }}/>
                <span>123 Education St, Learning City, 10001</span>
              </li>
              <li className="flex items-center space-x-3 text-sm text-muted-foreground">
                <Phone className="h-5 w-5 text-primary flex-shrink-0"  style={{ color: "hsl(262, 83%, 58%)" }}/>
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3 text-sm text-muted-foreground">
                <Mail className="h-5 w-5 text-primary flex-shrink-0"  style={{ color: "hsl(262, 83%, 58%)" }}/>
                <span>info@quizverse.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4 animate-fade-in animate-delay-400">
            <h3 className="text-base font-medium text-primary">Subscribe to Our Newsletter</h3>
            <p className="text-sm text-muted-foreground">
              Get the latest updates, news and offers straight to your inbox.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="mt-2 space-y-2">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="w-full px-4 py-2 text-sm border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                required
              />
              <button
                type="submit"
                className="w-full px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors duration-200"
                style={{ color: "hsl(262, 83%, 58%)" }}
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-border/50 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-muted-foreground animate-fade-in">
            © {currentYear} QuizVerse. All rights reserved.
          </div>
          <div className="flex mt-4 md:mt-0 space-x-6 animate-fade-in animate-delay-200">
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
              Terms of Service
            </Link>
            <Link to="/cookies" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

