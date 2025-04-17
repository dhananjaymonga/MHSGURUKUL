// import React, { useState } from 'react';
// import { Button } from "@/components/ui/button";
// // import { Input } from "@/components/ui/input";
// // import { Textarea } from "@/components/ui/textarea";
// // import { useToast } from "@/hooks/use-toast";
// import { 
//   Mail, Phone, MapPin, Instagram, Facebook, Twitter, 
//   Send, CheckCircle, User, BookOpen, MessageSquare
// } from "lucide-react";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

// const ContactPage: ReactFC = () => {
//   const { toast } = useToast();
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     subject: '',
//     message: ''
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitted, setSubmitted] = useState(false);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);
    
//     // Simulate form submission
//     setTimeout(() => {
//       setIsSubmitting(false);
//       setSubmitted(true);
//       toast({
//         title: "Message Sent!",
//         description: "We've received your message and will respond shortly.",
//       });
//     }, 1500);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-white to-youthe-light-gray">
//       {/* Hero Section */}
//       <div className="relative overflow-hidden bg-youthe-purple text-white py-16 md:py-24">
//         <div className="absolute inset-0 overflow-hidden">
//           <div className="absolute -top-40 -right-40 w-80 h-80 bg-youthe-blue rounded-full opacity-20 animate-float"></div>
//           <div className="absolute top-40 -left-20 w-60 h-60 bg-youthe-deep-purple rounded-full opacity-20 animate-pulse-slow"></div>
//         </div>
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//           <div className="text-center">
//             <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
//               Get in Touch With YouThe
//             </h1>
//             <p className="text-lg md:text-xl max-w-2xl mx-auto text-purple-100 animate-fade-in" style={{ animationDelay: '0.3s' }}>
//               Have questions about our online study resources? We're here to help you succeed in your educational journey.
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//           {/* Contact Form Section */}
//           <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
//             <Card className="overflow-hidden border-t-4 border-youthe-purple shadow-lg transition-all hover:shadow-xl">
//               <CardHeader className="bg-gradient-to-r from-youthe-purple to-youthe-deep-purple text-white">
//                 <CardTitle className="flex items-center gap-2">
//                   <MessageSquare className="h-5 w-5" />
//                   Send us a Message
//                 </CardTitle>
//                 <CardDescription className="text-purple-100">
//                   Fill out the form below and we'll get back to you soon.
//                 </CardDescription>
//               </CardHeader>
//               <CardContent className="pt-6">
//                 {!submitted ? (
//                   <form onSubmit={handleSubmit} className="space-y-4">
//                     <div className="space-y-2">
//                       <div className="relative">
//                         <Input
//                           id="name"
//                           name="name"
//                           placeholder="Your Name"
//                           className="pl-10 transition-all border-gray-300 focus:border-youthe-purple"
//                           onChange={handleChange}
//                           required
//                         />
//                         <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
//                       </div>
//                     </div>
//                     <div className="space-y-2">
//                       <div className="relative">
//                         <Input
//                           id="email"
//                           name="email"
//                           type="email"
//                           placeholder="Your Email"
//                           className="pl-10 transition-all border-gray-300 focus:border-youthe-purple"
//                           onChange={handleChange}
//                           required
//                         />
//                         <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
//                       </div>
//                     </div>
//                     <div className="space-y-2">
//                       <div className="relative">
//                         <Input
//                           id="subject"
//                           name="subject"
//                           placeholder="Subject"
//                           className="pl-10 transition-all border-gray-300 focus:border-youthe-purple"
//                           onChange={handleChange}
//                           required
//                         />
//                         <BookOpen className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
//                       </div>
//                     </div>
//                     <div className="space-y-2">
//                       <Textarea
//                         id="message"
//                         name="message"
//                         placeholder="Your Message"
//                         className="min-h-32 transition-all border-gray-300 focus:border-youthe-purple"
//                         onChange={handleChange}
//                         required
//                       />
//                     </div>
//                     <Button 
//                       type="submit" 
//                       className="w-full bg-youthe-purple hover:bg-youthe-deep-purple group"
//                       disabled={isSubmitting}
//                     >
//                       {isSubmitting ? (
//                         <span className="flex items-center">
//                           <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                           </svg>
//                           Sending...
//                         </span>
//                       ) : (
//                         <span className="flex items-center">
//                           Send Message 
//                           <Send className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
//                         </span>
//                       )}
//                     </Button>
//                   </form>
//                 ) : (
//                   <div className="py-8 text-center">
//                     <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-green-100 text-green-500 mb-4">
//                       <CheckCircle className="h-8 w-8" />
//                     </div>
//                     <h3 className="text-xl font-medium text-gray-900">Thank You!</h3>
//                     <p className="mt-2 text-gray-500">
//                       Your message has been sent successfully. We'll get back to you soon!
//                     </p>
//                     <Button 
//                       variant="outline" 
//                       className="mt-6"
//                       onClick={() => {
//                         setSubmitted(false);
//                         setFormData({ name: '', email: '', subject: '', message: '' });
//                       }}
//                     >
//                       Send Another Message
//                     </Button>
//                   </div>
//                 )}
//               </CardContent>
//             </Card>
//           </div>

//           {/* Info Section */}
//           <div className="space-y-8 animate-slide-right" style={{ animationDelay: '0.4s' }}>
//             {/* Contact Methods Tabs */}
//             <Tabs defaultValue="contact" className="w-full">
//               <TabsList className="w-full grid grid-cols-2">
//                 <TabsTrigger value="contact">Contact Info</TabsTrigger>
//                 <TabsTrigger value="faq">FAQ</TabsTrigger>
//               </TabsList>
              
//               <TabsContent value="contact" className="space-y-6 pt-4">
//                 <div className="grid gap-6">
//                   {/* Contact Detail Cards */}
//                   <Card className="overflow-hidden transition-all hover:shadow-md bg-white hover:-translate-y-1 duration-300">
//                     <CardContent className="p-6">
//                       <div className="flex items-start">
//                         <div className="bg-youthe-purple/10 p-3 rounded-full mr-4">
//                           <Mail className="h-6 w-6 text-youthe-purple" />
//                         </div>
//                         <div>
//                           <h3 className="font-semibold text-lg mb-1">Email Us</h3>
//                           <p className="text-gray-500 mb-1">For general inquiries:</p>
//                           <a href="mailto:info@youthe.edu" className="text-youthe-blue hover:underline">
//                             info@youthe.edu
//                           </a>
//                         </div>
//                       </div>
//                     </CardContent>
//                   </Card>
                  
//                   <Card className="overflow-hidden transition-all hover:shadow-md bg-white hover:-translate-y-1 duration-300">
//                     <CardContent className="p-6">
//                       <div className="flex items-start">
//                         <div className="bg-youthe-purple/10 p-3 rounded-full mr-4">
//                           <Phone className="h-6 w-6 text-youthe-purple" />
//                         </div>
//                         <div>
//                           <h3 className="font-semibold text-lg mb-1">Call Us</h3>
//                           <p className="text-gray-500 mb-1">Monday-Friday, 9AM-5PM</p>
//                           <a href="tel:+91123456789" className="text-youthe-blue hover:underline">
//                             +91 12345-67890
//                           </a>
//                         </div>
//                       </div>
//                     </CardContent>
//                   </Card>
                  
//                   <Card className="overflow-hidden transition-all hover:shadow-md bg-white hover:-translate-y-1 duration-300">
//                     <CardContent className="p-6">
//                       <div className="flex items-start">
//                         <div className="bg-youthe-purple/10 p-3 rounded-full mr-4">
//                           <MapPin className="h-6 w-6 text-youthe-purple" />
//                         </div>
//                         <div>
//                           <h3 className="font-semibold text-lg mb-1">Visit Us</h3>
//                           <p className="text-gray-500">
//                             YouThe Educational Center<br />
//                             123 Learning Avenue<br />
//                             New Delhi, 110001
//                           </p>
//                         </div>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 </div>
//               </TabsContent>
              
//               <TabsContent value="faq" className="pt-4">
//                 <Card>
//                   <CardContent className="pt-6">
//                     <Accordion type="single" collapsible className="w-full">
//                       <AccordionItem value="item-1">
//                         <AccordionTrigger className="hover:text-youthe-purple">
//                           How can I access your study materials?
//                         </AccordionTrigger>
//                         <AccordionContent>
//                           All our study materials are available through our online learning portal. After registration, you'll have immediate access to all resources related to your courses.
//                         </AccordionContent>uj
//                       </AccordionItem>
                      
//                       <AccordionItem value="item-2">
//                         <AccordionTrigger className="hover:text-youthe-purple">
//                           Do you offer live classes?
//                         </AccordionTrigger>
//                         <AccordionContent>
//                           Yes, we conduct live online classes every week according to the course schedule. All classes are recorded and available for later viewing as well.
//                         </AccordionContent>
//                       </AccordionItem>
                      
//                       <AccordionItem value="item-3">
//                         <AccordionTrigger className="hover:text-youthe-purple">
//                           How do I report technical issues?
//                         </AccordionTrigger>
//                         <AccordionContent>
//                           For any technical difficulties, you can email support@youthe.edu or call our technical support line during business hours. We typically respond within 24 hours.
//                         </AccordionContent>
//                       </AccordionItem>
                      
//                       <AccordionItem value="item-4">
//                         <AccordionTrigger className="hover:text-youthe-purple">
//                           Are there payment plans available?
//                         </AccordionTrigger>
//                         <AccordionContent>
//                           We offer several flexible payment options including monthly installments, semester-based payments, and full course payment with discounts.
//                         </AccordionContent>
//                       </AccordionItem>
//                     </Accordion>
//                   </CardContent>
//                 </Card>
//               </TabsContent>
//             </Tabs>

//             {/* Social Media */}
//             <Card>
//               <CardHeader>
//                 <CardTitle className="text-center">Connect With Us</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="flex justify-center space-x-6">
//                   <a href="#" className="transform transition-all hover:scale-110 hover:-translate-y-1">
//                     <div className="bg-youthe-purple text-white p-3 rounded-full">
//                       <Instagram className="h-6 w-6" />
//                     </div>
//                   </a>
//                   <a href="#" className="transform transition-all hover:scale-110 hover:-translate-y-1">
//                     <div className="bg-youthe-purple text-white p-3 rounded-full">
//                       <Facebook className="h-6 w-6" />
//                     </div>
//                   </a>
//                   <a href="#" className="transform transition-all hover:scale-110 hover:-translate-y-1">
//                     <div className="bg-youthe-purple text-white p-3 rounded-full">
//                       <Twitter className="h-6 w-6" />
//                     </div>
//                   </a>
//                   <a href="#" className="transform transition-all hover:scale-110 hover:-translate-y-1">
//                     <div className="bg-youthe-purple text-white p-3 rounded-full">
//                       <Mail className="h-6 w-6" />
//                     </div>
//                   </a>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>

//       {/* Map Section */}
//       <div className="w-full h-80 bg-gray-200 mt-12 animate-fade-in" style={{ animationDelay: '0.6s' }}>
//         <iframe 
//           src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56022.92106499455!2d77.2099058!3d28.6355623!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x52c2b7494e204dce!2sNew%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1650366297961!5m2!1sen!2sin" 
//           width="100%" 
//           height="100%" 
//           style={{ border: 0 }} 
//           allowFullScreen 
//           loading="lazy" 
//           referrerPolicy="no-referrer-when-downgrade"
//           title="YouThe Location"
//         ></iframe>
//       </div>

//       {/* Footer */}
//       <footer className="bg-youthe-deep-purple text-white py-8 mt-12">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center">
//             <h2 className="text-2xl font-bold mb-2">YouThe</h2>
//             <p className="text-purple-200 mb-6">Empowering Education Online</p>
//             <p className="text-sm text-purple-200">© {new Date().getFullYear()} YouThe Education. All rights reserved.</p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };
jjkk
// export default ContactPage;
jj