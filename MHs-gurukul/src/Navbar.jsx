import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  // State for mobile menu
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // State for mobile "Study" submenu
  const [studyMenuOpen, setStudyMenuOpen] = useState(false);

  return (
    <>
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white shadow-md p-4 w-full">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-r from-purple-500 to-blue-500 rounded-full">
              <span className="text-white font-bold">Q</span>
            </div>
            <span className="ml-2 text-xl font-bold text-blue-600">MHS GURUKUL</span>
          </div>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <NavLink 
              to="/" 
              className="text-gray-700 hover:text-blue-600"
            >
              Home
            </NavLink>
            <NavLink 
              to="/about" 
              className="text-gray-700 hover:text-blue-600"
            >
              About
            </NavLink>
            <NavLink 
              to="/video" 
              className="text-gray-700 hover:text-blue-600"
            >
            Video
            </NavLink>
            <NavLink 
              to="/blog" 
              className="text-gray-700 hover:text-blue-600"
            >
Blog          </NavLink>
<NavLink 
                  to="/notes" 
                  className="text-gray-700 hover:text-blue-600"
                  >
                  Notes
                </NavLink>
            
         
            <NavLink 
              to="/contact" 
              className="text-gray-700 hover:text-blue-600"
            >
              Contact
            </NavLink>
            <NavLink 
              to="/Auth" 
              className="text-gray-700 hover:text-blue-600"
            >
              Login
            </NavLink>
            <button className="text-gray-700 hover:text-blue-600">
              <i className="fas fa-sun"></i>
            </button>
            <NavLink 
              to="/quiz" 
              className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-md"
            >
              Start Quiz
            </NavLink>
          </div>
          {/* Mobile Navigation Button */}
          <div className="md:hidden flex items-center space-x-4">
            <button className="text-gray-700 hover:text-blue-600">
              <i className="fas fa-sun"></i>
            </button>
            <button
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <NavLink 
            to="/" 
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Home
          </NavLink>
          <NavLink 
            to="/about" 
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            About
          </NavLink>
          <NavLink 
            to="/blog" 
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Blog
          </NavLink>
          <div className="relative">
            <button
              onClick={() => setStudyMenuOpen(!studyMenuOpen)}
              className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center"
            >
              Study{" "}
              <i
                className={`ml-1 fas transition-transform duration-200 ${
                  studyMenuOpen ? "fa-chevron-up" : "fa-chevron-down"
                }`}
              ></i>
            </button>
            {studyMenuOpen && (
              <div className="bg-white shadow-lg rounded-md mt-2">
                <NavLink 
                  to="/notes" 
                  onClick={() => { setStudyMenuOpen(false); setMobileMenuOpen(false); }}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Notes
                </NavLink>
                <NavLink 
                  to="/videos" 
                  onClick={() => { setStudyMenuOpen(false); setMobileMenuOpen(false); }}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Videos
                </NavLink>
                <NavLink 
                  to="/quiz" 
                  onClick={() => { setStudyMenuOpen(false); setMobileMenuOpen(false); }}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Quiz
                </NavLink>
              </div>
            )}
          </div>
          <NavLink 
            to="/contact" 
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Contact
          </NavLink>
          <NavLink 
            to="/quiz" 
            onClick={() => setMobileMenuOpen(false)}
            className="block w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-md mt-2"
          >
            Start Quiz
          </NavLink>
        </div>
      )}
    </>
  );
}
