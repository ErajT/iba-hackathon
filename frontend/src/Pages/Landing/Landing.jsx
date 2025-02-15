// "use client"

// import { useState, useEffect } from "react"
// import { ArrowRight, Code2, Rocket, Shield, ChevronRight, Star, Zap, Waves, Menu, X } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Card } from "@/components/ui/card"
// import { cn } from "@/lib/utils"
// import { Link } from "react-router-dom"

// function UserHome() {
//   const [scrolled, setScrolled] = useState(false)
//   const [activeSection, setActiveSection] = useState("home")
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 50)

//       const sections = ["home", "features", "services", "contact"]
//       const current = sections.find((section) => {
//         const element = document.getElementById(section)
//         if (element) {
//           const rect = element.getBoundingClientRect()
//           return rect.top <= 100 && rect.bottom >= 100
//         }
//         return false
//       })

//       if (current) {
//         setActiveSection(current)
//       }
//     }

//     window.addEventListener("scroll", handleScroll)
//     return () => window.removeEventListener("scroll", handleScroll)
//   }, [])

//   const toggleMobileMenu = () => {
//     setMobileMenuOpen(!mobileMenuOpen)
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-[#1a3e48] to-[#08242c] text-white overflow-hidden">
//       {/* Enhanced Animated background */}
//       <div className="fixed inset-0 z-0 overflow-hidden">
//         <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5" />
//         {[...Array(20)].map((_, i) => (
//           <div
//             key={i}
//             className="absolute rounded-full mix-blend-screen animate-float"
//             style={{
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//               width: `${Math.random() * 300 + 50}px`,
//               height: `${Math.random() * 300 + 50}px`,
//               background: `radial-gradient(circle, ${["rgba(200,216,228,0.3)", "rgba(58,125,143,0.3)", "rgba(26,62,72,0.3)"][i % 3]} 0%, rgba(43,103,119,0) 70%)`,
//               animation: `float ${Math.random() * 10 + 15}s infinite`,
//               animationDelay: `${Math.random() * 5}s`,
//             }}
//           />
//         ))}
//         <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#08242c] to-transparent animate-wave" />
//       </div>

//       {/* Navigation */}
//       <nav
//         className={cn(
//           "fixed w-full z-50 transition-all duration-500",
//           scrolled ? "bg-[#1a3e48]/80 backdrop-blur-md py-4 border-b border-[##08242c]/20" : "py-6",
//         )}
//       >
//         <div className="container mx-auto px-6 flex items-center justify-between">
//           <Link to="/" className="flex items-center gap-2">
//             <Waves className="h-8 w-8 text-[#c8d8e4] animate-pulse" />
//             <span className="text-2xl font-bold bg-gradient-to-r from-white to-[#c8d8e4] bg-clip-text text-transparent">
//               AquaVista
//             </span>
//           </Link>
//           <div className="hidden md:flex items-center gap-8">
//             {["home", "features", "services", "contact"].map((item) => (
//               <Link
//                 key={item}
//                 to={`#${item}`}
//                 className={cn(
//                   "transition-all duration-300 hover:text-[#c8d8e4] relative overflow-hidden group",
//                   activeSection === item ? "text-[#c8d8e4]" : "text-white/70",
//                 )}
//                 onClick={(e) => {
//                   e.preventDefault()
//                   document.getElementById(item)?.scrollIntoView({ behavior: "smooth" })
//                 }}
//               >
//                 {item.charAt(0).toUpperCase() + item.slice(1)}
//                 <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#c8d8e4] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
//               </Link>
//             ))}
//             <Link to="/login">
//               <Button className="bg-[#2b6777] hover:bg-[#3a7d8f] text-white group relative overflow-hidden">
//                 <span className="relative z-10">Login</span>
//                 <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
//                 <span className="absolute inset-0 bg-[#c8d8e4] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
//               </Button>
//             </Link>
//           </div>
//           <button className="md:hidden" onClick={toggleMobileMenu}>
//             {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//           </button>
//         </div>
//       </nav>

//       {/* Mobile Menu */}
//       {mobileMenuOpen && (
//         <div className="fixed inset-0 z-40 bg-[#1a3e48] bg-opacity-95 flex flex-col items-center justify-center">
//           {["home", "features", "services", "contact"].map((item) => (
//             <Link
//               key={item}
//               to={`#${item}`}
//               className="text-2xl mb-6 hover:text-[#c8d8e4] transition-colors duration-300"
//               onClick={(e) => {
//                 e.preventDefault()
//                 document.getElementById(item)?.scrollIntoView({ behavior: "smooth" })
//                 setMobileMenuOpen(false)
//               }}
//             >
//               {item.charAt(0).toUpperCase() + item.slice(1)}
//             </Link>
//           ))}
//           <Link to="/get-started" onClick={() => setMobileMenuOpen(false)}>
//             <Button className="bg-[#2b6777] hover:bg-[#3a7d8f] text-white mt-6">Login</Button>
//           </Link>
//         </div>
//       )}

//       <section id="home" className="relative min-h-screen flex items-center pt-20">
//         <div className="container mx-auto px-6">
//           <div className="max-w-3xl">
//             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#08242c]/10 border border-[#08242c]/20 mb-8 animate-fade-up">
//               <Star className="h-4 w-4 text-[#c8d8e4] animate-pulse" />
//               <span className="text-sm">Lorem ipsum dolor sit amet</span>
//             </div>
//             <h1 className="text-4xl md:text-7xl font-bold mb-6 animate-fade-up leading-tight">
//               <span className="bg-gradient-to-r from-white to-[#c8d8e4] bg-clip-text text-transparent">Lorem</span>{" "}
//               ipsum dolor sit amet
//             </h1>
//             <p className="text-lg md:text-xl mb-8 text-white/70 animate-fade-up animation-delay-200 leading-relaxed">
//               Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
//               dolore magna aliqua.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 animate-fade-up animation-delay-300">
//               <Link to="/start-journey">
//                 <Button
//                   size="lg"
//                   className="w-full sm:w-auto bg-[#2b6777] hover:bg-[#3a7d8f] text-white group relative overflow-hidden"
//                 >
//                   <span className="relative z-10">Lorem Ipsum</span>
//                   <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
//                   <span className="absolute inset-0 bg-[#c8d8e4] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
//                 </Button>
//               </Link>
//               <Link to="/our-vision">
//                 <Button
//                   size="lg"
//                   variant="outline"
//                   className="w-full sm:w-auto text-[#c8d8e4] border-[#c8d8e4] hover:bg-[#2b6777]/10 group relative overflow-hidden"
//                 >
//                   <span className="relative z-10">Dolor Sit Amet</span>
//                   <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
//                   <span className="absolute inset-0 bg-[#c8d8e4]/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
//                 </Button>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section id="features" className="relative py-32">
//         <div className="container mx-auto px-6">
//           <div className="text-center mb-20">
//             <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-up">Lorem Ipsum Dolor</h2>
//             <p className="text-white/70 max-w-2xl mx-auto animate-fade-up animation-delay-200">
//               Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
//               dolore magna aliqua.
//             </p>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {features.map((feature, index) => (
//               <Card
//                 key={index}
//                 className="p-8 group hover:border-[#08242c]/50 transition-all duration-500 bg-[#1a3e48]/50 backdrop-blur-lg border-[#08242c]/20 overflow-hidden animate-fade-up"
//                 style={{ animationDelay: `${index * 100}ms` }}
//               >
//                 <div className="relative">
//                   <div className="absolute inset-0 bg-gradient-to-r from-[#08242c] to-[#3a7d8f] blur-[100px] opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
//                   <div className="relative z-10">
//                     <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-[#08242c]/10 mb-6 group-hover:bg-[#08242c]/20 transition-colors duration-300">
//                       <feature.icon className="h-7 w-7 text-[#c8d8e4] group-hover:scale-110 transition-transform duration-300" />
//                     </div>
//                     <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
//                     <p className="text-white/70 leading-relaxed">{feature.description}</p>
//                   </div>
//                 </div>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </section>

//       <section id="services" className="relative py-32 bg-[#08242c]/5">
//         <div className="container mx-auto px-6">
//           <div className="text-center mb-20">
//             <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-up">Lorem Ipsum</h2>
//             <p className="text-white/70 max-w-2xl mx-auto animate-fade-up animation-delay-200">
//               Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//             </p>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             {services.map((service, index) => (
//               <Card
//                 key={index}
//                 className="p-8 group hover:border-[#08242c]/50 transition-all duration-500 bg-[#1a3e48]/50 backdrop-blur-lg border-[#2b6777]/20 animate-fade-up"
//                 style={{ animationDelay: `${index * 100}ms` }}
//               >
//                 <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
//                   <Zap className="h-6 w-6 text-[#c8d8e4] group-hover:rotate-12 transition-transform duration-300" />
//                   {service.title}
//                 </h3>
//                 <p className="text-white/70 mb-6 leading-relaxed">{service.description}</p>
//                 <Link to={`/services/${service.title.toLowerCase().replace(/\s+/g, "-")}`}>
//                   <Button
//                     variant="outline"
//                     className="group-hover:bg-[#08242c] group-hover:text-white group-hover:border-transparent transition-all duration-300 group relative overflow-hidden"
//                   >
//                     <span className="relative z-10">Lorem Ipsum</span>
//                     <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
//                     <span className="absolute inset-0 bg-[#c8d8e4] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
//                   </Button>
//                 </Link>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Contact Section */}
//       <section id="contact" className="relative py-32">
//         <div className="container mx-auto px-6">
//           <Card className="max-w-4xl mx-auto p-8 md:p-12 text-center bg-[#1a3e48]/50 backdrop-blur-lg border-[#08242c]/20 overflow-hidden animate-fade-up">
//             <div className="absolute inset-0 bg-gradient-to-r from-[#08242c] to-[#3a7d8f] blur-[100px] opacity-20" />
//             <div className="relative z-10">
//               <h2 className="text-3xl md:text-4xl font-bold mb-4">Lorem Ipsum Dolor Sit Amet?</h2>
//               <p className="text-lg md:text-xl text-white/70 mb-8 max-w-2xl mx-auto">
//                 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
//                 dolore magna aliqua.
//               </p>
//               <div className="flex flex-col sm:flex-row justify-center gap-4">
//                 <Link to="/get-started-now">
//                   <Button
//                     size="lg"
//                     className="w-full sm:w-auto bg-[#2b6777] hover:bg-[#3a7d8f] text-white group relative overflow-hidden"
//                   >
//                     <span className="relative z-10">Lorem Ipsum</span>
//                     <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
//                     <span className="absolute inset-0 bg-[#c8d8e4] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
//                   </Button>
//                 </Link>
//                 <Link to="/schedule-demo">
//                   <Button
//                     size="lg"
//                     variant="outline"
//                     className="w-full sm:w-auto text-[#c8d8e4] border-[#c8d8e4] hover:bg-[#08242c]/10 group relative overflow-hidden"
//                   >
//                     <span className="relative z-10">Dolor Sit Amet</span>
//                     <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
//                     <span className="absolute inset-0 bg-[#c8d8e4]/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
//                   </Button>
//                 </Link>
//               </div>
//             </div>
//           </Card>
//         </div>
//       </section>
//     </div>
//   )
// }

// const features = [
//   {
//     icon: Shield,
//     title: "Lorem Ipsum",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//   },
//   {
//     icon: Rocket,
//     title: "Dolor Sit Amet",
//     description:
//       "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
//   },
//   {
//     icon: Code2,
//     title: "Consectetur Adipiscing",
//     description:
//       "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
//   },
// ]

// const services = [
//   {
//     title: "Lorem Ipsum",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//   },
//   {
//     title: "Dolor Sit Amet",
//     description:
//       "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
//   },
//   {
//     title: "Consectetur Adipiscing",
//     description:
//       "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
//   },
//   {
//     title: "Elit Sed Do",
//     description:
//       "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
//   },
// ]

// export default UserHome

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import axios from "axios";

export default function PDFUploader() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const uploadFile = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    setLoading(true);

    try {
      // Read file as ArrayBuffer
      const arrayBuffer = await file.arrayBuffer();
      const buffer = new Uint8Array(arrayBuffer); // Convert to buffer format

      // const requestBody = {
      //   CollectionID: "1", // Replace with actual CollectionID
      //   CreatedByID: "1", // Replace with actual CreatedByID
      //   File: Array.from(buffer), // Convert buffer to array for JSON
      // };

      const formData = new FormData();
      formData.append("CollectionID", 1);
      formData.append("CreatedByID", 1);
      formData.append("File", file);

      const response = await axios.post(
        "http://localhost:2000/material/addMaterial",
        formData
      );

      alert("File uploaded successfully!");
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload file.");
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-96 p-4 shadow-lg">
        <CardContent>
          <Input type="file" accept="application/pdf" onChange={handleFileChange} />
          <Button className="w-full mt-4" onClick={uploadFile} disabled={loading}>
            {loading ? "Uploading..." : "Upload PDF"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}



