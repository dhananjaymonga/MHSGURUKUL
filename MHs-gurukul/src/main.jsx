import React from "react";
import { StrictMode } from 'react'

import { createRoot } from "react-dom/client";
// import { BrowserRouter } from "react-router-dom";
import { BrowserRouter,createBrowserRouter,RouterProvider } from 'react-router-dom';

import About from "./Pages/About";
import App from "./App";

import "./index.css"
import VideoCard from "./VideoCard"
// import AdminPanel from "./Pages/AdminPnnel";
import Admin from "./Admins/Admin"
import  { NotesProvider } from "./context/Notescontext"
import AdminLogin from "./Admins/AdminLogin";
import ProtectedRoute from "./Admins/Protected";
import  History from "./Admins/History"
import Blog from "./Pages/Blog"
import BlogDetails from "./Pages/BlogDetails"
// import NoteDetails from "./NoteDetails";
import Notes from "./Notes"
import Quiz from "./Quiz/Quiz"
import Login from "./Auth/Login";
import Signup from "./Pages/Singup";
import Auth from "./Auth/Auth"
const container = document.getElementById("root");
const root = createRoot(container);

const router= createBrowserRouter([
  {
    path:"/",
    element:<App/>
  },
  {
    path:"/About", 
    element:<About/>
  },
  {
    path:"/video", 
    element:<VideoCard/>
  },
  {
    path:"/blog", 
    element:<Blog/>
  },
  {
    path:"/blog/:id", 
    element:<BlogDetails/>
  },
  {
    path:"/admin", 
    element: <ProtectedRoute>
    <Admin/>
  </ProtectedRoute>
  },
  {
    path:"/admin-login", 
    element:<AdminLogin/>
  },
  {
    path:"/login", 
    element:<Login/>
  },
  {
    path:"/Singup", 
    element:<Signup/>
  },
  {
    path:"/Auth", 
    element:<Auth/>
  },
  {
    path:"/notes", 
    element:<Notes/>
  },
  {
    path:"/quiz", 
    element:<Quiz/>
  },
  {
    path:"/admin", 
    element:<Admin/>
  },
  {
    path:"/history", 
    element:<History/>
  },
  // {
  //   path:"/note/:noteId", 
  //   element:<NoteDetails/>
  // },
  // {
  //   path:"/Contact", 
  //   element:<Contact/>
  // },
  // {
  //   path:"/CableCalutor", 
  //   element:<CableCalutor/>
  // },
  // {
  //   path:"/Faq-Page", 
  //   element:<FAQPage/>
  // },
  // {
  //   path:"/products/:category", 
  //   element:<Product/>
  // },
])
root.render(
  <StrictMode>
     <NotesProvider>
      <RouterProvider router={router} />
    </NotesProvider>

</StrictMode>,
);
