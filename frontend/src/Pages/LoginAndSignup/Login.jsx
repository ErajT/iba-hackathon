

// "use client"

// import { useState, useEffect } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion"
// import { ChevronRight, Mail, Lock, User, Eye, EyeOff } from "lucide-react"
// import axios from "axios"
// import { toast, ToastContainer } from "react-toastify"
// import "react-toastify/dist/ReactToastify.css"
// import { useNavigate } from "react-router-dom"

// export default function LoginSignup() {
//   const [activeTab, setActiveTab] = useState("login")
//   const [showPassword, setShowPassword] = useState(false)
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [name, setName] = useState("")
//   const [phoneNumber, setPhoneNumber] = useState("")
//   const [isLoading, setIsLoading] = useState(false)

//   const x = useMotionValue(0)
//   const y = useMotionValue(0)

//   const rotateX = useTransform(y, [-300, 300], [5, -5])
//   const rotateY = useTransform(x, [-300, 300], [-5, 5])

//   const navigate = useNavigate()

//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       setMousePosition({
//         x: e.clientX - window.innerWidth / 2,
//         y: e.clientY - window.innerHeight / 2,
//       })
//     }

//     window.addEventListener("mousemove", handleMouseMove)

//     return () => {
//       window.removeEventListener("mousemove", handleMouseMove)
//     }
//   }, [])

//   useEffect(() => {
//     x.set(mousePosition.x)
//     y.set(mousePosition.y)
//   }, [mousePosition, x, y])

//   const handleLogin = async (e) => {
//     e.preventDefault()
//     setIsLoading(true)
//     try {
//       const response = await axios.post(`http://localhost:2000/users/login`, {
//         email,
//         password,
//       })
//       if (response.status === 200) {
//         toast.success("Login successful!")
//         navigate("/landing")
//       }
//     } catch (error) {
//       toast.error("Login failed. Please check your credentials.")
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleSignup = async (e) => {
//     e.preventDefault()
//     setIsLoading(true)
//     try {
//       const createUserResponse = await axios.post("http://localhost:2000/usersCrud/createUser", {
//         Email: email,
//         Name: name,
//         PhoneNumber: phoneNumber,
//       })
//       if (createUserResponse.status === 200) {
//         const createAuthResponse = await axios.post("http://localhost:2000/users/", {
//           email,
//           password,
//           position: "user",
//         })
//         if (createAuthResponse.status === 200) {
//           toast.success("Signup successful!")
//           navigate("/landing")
//         }
//       }
//     } catch (error) {
//       toast.error("Signup failed. Please try again.")
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <div className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-br from-[#2b6777] to-[#52ab98]">
//       <ToastContainer />
//       <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJmb2ciIHg9IjAiIHk9IjAiIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48Y2lyY2xlIGN4PSIxNTAiIGN5PSIxNTAiIHI9IjIwMCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSI+PGFuaW1hdGUgYXR0cmlidXRlTmFtZT0iciIgZnJvbT0iMCIgdG89IjIwMCIgZHVyPSIxMHMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIi8+PC9jaXJjbGU+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2ZvZykiLz48L3N2Zz4=')] opacity-50 mix-blend-overlay"></div>
//       <motion.div
//         style={{
//           rotateX,
//           rotateY,
//           transformStyle: "preserve-3d",
//         }}
//         className="w-full max-w-md perspective-1000 z-20"
//       >
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, ease: "easeOut" }}
//         >
//           <Card className="bg-[#2b6777] shadow-[0_10px_50px_rgba(0,0,0,0.3)] overflow-hidden relative border-none">
//             <motion.div
//               className="absolute inset-0 bg-gradient-to-br from-[#52ab98] to-[#2b6777] opacity-30"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 0.3 }}
//               transition={{ duration: 1 }}
//             />
//             <motion.div
//               className="h-1 bg-gradient-to-r from-[#52ab98] to-[#c8d8e4]"
//               initial={{ width: 0 }}
//               animate={{ width: "100%" }}
//               transition={{ duration: 0.8, ease: "easeInOut" }}
//             />
//             <CardHeader className="space-y-2 pt-8 relative z-10">
//               <motion.div
//                 initial={{ scale: 0.5, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 transition={{ duration: 0.5, delay: 0.2 }}
//                 className="w-20 h-20 bg-gradient-to-br from-[#52ab98] to-[#c8d8e4] rounded-full mx-auto flex items-center justify-center"
//               >
//                 <User className="w-10 h-10 text-[#2b6777]" />
//               </motion.div>
//               <CardTitle className="text-2xl font-bold text-center text-white">Welcome</CardTitle>
//               <CardDescription className="text-center text-gray-200">
//                 Please enter your details to continue
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="mt-4 relative z-10">
//               <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
//                 <TabsList className="grid w-full grid-cols-2 mb-8 bg-[#1a3f4c]">
//                   <TabsTrigger value="login" className="data-[state=active]:bg-[#52ab98] text-white">
//                     Login
//                   </TabsTrigger>
//                   <TabsTrigger value="register" className="data-[state=active]:bg-[#52ab98] text-white">
//                     Register
//                   </TabsTrigger>
//                 </TabsList>
//                 <AnimatePresence mode="wait">
//                   <motion.div
//                     key={activeTab}
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -10 }}
//                     transition={{ duration: 0.3 }}
//                   >
//                     {activeTab === "login" ? (
//                       <form className="space-y-4" onSubmit={handleLogin}>
//                         <div className="space-y-2">
//                           <Label htmlFor="email" className="text-sm font-medium text-gray-200">
//                             Email
//                           </Label>
//                           <div className="relative">
//                             <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                             <Input
//                               id="email"
//                               type="email"
//                               placeholder="Enter your email"
//                               value={email}
//                               onChange={(e) => setEmail(e.target.value)}
//                               className="w-full pl-10 pr-3 py-2 bg-[#1a3f4c]/50 border border-[#52ab98]/30 rounded-md focus:outline-none focus:ring-2 focus:ring-[#52ab98] text-white placeholder-gray-400"
//                             />
//                           </div>
//                         </div>
//                         <div className="space-y-2">
//                           <Label htmlFor="password" className="text-sm font-medium text-gray-200">
//                             Password
//                           </Label>
//                           <div className="relative">
//                             <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                             <Input
//                               id="password"
//                               type={showPassword ? "text" : "password"}
//                               placeholder="Enter your password"
//                               value={password}
//                               onChange={(e) => setPassword(e.target.value)}
//                               className="w-full pl-10 pr-10 py-2 bg-[#1a3f4c]/50 border border-[#52ab98]/30 rounded-md focus:outline-none focus:ring-2 focus:ring-[#52ab98] text-white placeholder-gray-400"
//                             />
//                             <button
//                               type="button"
//                               onClick={() => setShowPassword(!showPassword)}
//                               className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 cursor-pointer"
//                             >
//                               {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//                             </button>
//                           </div>
//                         </div>
//                         <Button
//                           type="submit"
//                           className="w-full bg-gradient-to-r from-[#52ab98] to-[#c8d8e4] text-[#2b6777] font-semibold hover:opacity-90 transition-all duration-300 group cursor-pointer"
//                           disabled={isLoading}
//                         >
//                           {isLoading ? (
//                             <div className="flex items-center justify-center">
//                               <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                             </div>
//                           ) : (
//                             <>
//                               <span className="mr-2">Sign In</span>
//                               <motion.div
//                                 className="inline-block"
//                                 initial={{ x: 0 }}
//                                 animate={{ x: [0, 5, 0] }}
//                                 transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, ease: "easeInOut" }}
//                               >
//                                 <ChevronRight className="h-4 w-4" />
//                               </motion.div>
//                             </>
//                           )}
//                         </Button>
//                       </form>
//                     ) : (
//                       <form className="space-y-4" onSubmit={handleSignup}>
//                         <div className="space-y-2">
//                           <Label htmlFor="name" className="text-sm font-medium text-gray-200">
//                             Full Name
//                           </Label>
//                           <div className="relative">
//                             <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                             <Input
//                               id="name"
//                               type="text"
//                               placeholder="Enter your full name"
//                               value={name}
//                               onChange={(e) => setName(e.target.value)}
//                               className="w-full pl-10 pr-3 py-2 bg-[#1a3f4c]/50 border border-[#52ab98]/30 rounded-md focus:outline-none focus:ring-2 focus:ring-[#52ab98] text-white placeholder-gray-400"
//                             />
//                           </div>
//                         </div>
//                         <div className="space-y-2">
//                           <Label htmlFor="email" className="text-sm font-medium text-gray-200">
//                             Email
//                           </Label>
//                           <div className="relative">
//                             <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                             <Input
//                               id="email"
//                               type="email"
//                               placeholder="Enter your email"
//                               value={email}
//                               onChange={(e) => setEmail(e.target.value)}
//                               className="w-full pl-10 pr-3 py-2 bg-[#1a3f4c]/50 border border-[#52ab98]/30 rounded-md focus:outline-none focus:ring-2 focus:ring-[#52ab98] text-white placeholder-gray-400"
//                             />
//                           </div>
//                         </div>
//                         <div className="space-y-2">
//                           <Label htmlFor="phoneNumber" className="text-sm font-medium text-gray-200">
//                             Phone Number
//                           </Label>
//                           <div className="relative">
//                             <Input
//                               id="phoneNumber"
//                               type="text"
//                               placeholder="Enter your phone number"
//                               value={phoneNumber}
//                               onChange={(e) => setPhoneNumber(e.target.value)}
//                               className="w-full pl-10 pr-3 py-2 bg-[#1a3f4c]/50 border border-[#52ab98]/30 rounded-md focus:outline-none focus:ring-2 focus:ring-[#52ab98] text-white placeholder-gray-400"
//                             />
//                           </div>
//                         </div>
//                         <div className="space-y-2">
//                           <Label htmlFor="password" className="text-sm font-medium text-gray-200">
//                             Password
//                           </Label>
//                           <div className="relative">
//                             <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                             <Input
//                               id="password"
//                               type={showPassword ? "text" : "password"}
//                               placeholder="Choose a password"
//                               value={password}
//                               onChange={(e) => setPassword(e.target.value)}
//                               className="w-full pl-10 pr-10 py-2 bg-[#1a3f4c]/50 border border-[#52ab98]/30 rounded-md focus:outline-none focus:ring-2 focus:ring-[#52ab98] text-white placeholder-gray-400"
//                             />
//                             <button
//                               type="button"
//                               onClick={() => setShowPassword(!showPassword)}
//                               className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 cursor-pointer"
//                             >
//                               {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//                             </button>
//                           </div>
//                         </div>
//                         <Button
//                           type="submit"
//                           className="w-full bg-gradient-to-r from-[#52ab98] to-[#c8d8e4] text-[#2b6777] font-semibold hover:opacity-90 transition-all duration-300 group cursor-pointer"
//                           disabled={isLoading}
//                         >
//                           {isLoading ? (
//                             <div className="flex items-center justify-center">
//                               <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                             </div>
//                           ) : (
//                             <>
//                               <span className="mr-2">Create Account</span>
//                               <motion.div
//                                 className="inline-block"
//                                 initial={{ x: 0 }}
//                                 animate={{ x: [0, 5, 0] }}
//                                 transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, ease: "easeInOut" }}
//                               >
//                                 <ChevronRight className="h-4 w-4" />
//                               </motion.div>
//                             </>
//                           )}
//                         </Button>
//                       </form>
//                     )}
//                   </motion.div>
//                 </AnimatePresence>
//               </Tabs>
//             </CardContent>
//           </Card>
//         </motion.div>
//       </motion.div>
//     </div>
//   )
// }

"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion"
import { ChevronRight, Mail, Lock, User, Eye, EyeOff } from "lucide-react"
import axios from "axios"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useNavigate } from "react-router-dom"
import { backendUrl } from "@/components/constants"
import cookie from "js-cookie"

export default function LoginSignup() {
  const [activeTab, setActiveTab] = useState("login")
  const [showPassword, setShowPassword] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [role, setRole] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useTransform(y, [-300, 300], [5, -5])
  const rotateY = useTransform(x, [-300, 300], [-5, 5])

  const navigate = useNavigate()

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX - window.innerWidth / 2,
        y: e.clientY - window.innerHeight / 2,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  useEffect(() => {
    x.set(mousePosition.x)
    y.set(mousePosition.y)
  }, [mousePosition, x, y])

  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await axios.post(`${backendUrl}/users/login`, {
        email,
        password,
      })
      console.log(response)
      if (response.status === 200) {
        // http://localhost:2000/usersCrud/getUserByEmail/erajtanweer2@gmail.com
        const response1 = await axios.get(`${backendUrl}/usersCrud/getUserByEmail/${email}`);
        cookie.set("userDetails", JSON.stringify(response1.data), {
          expires: 7, 
          secure: true, 
        });
        console.log(response.data.position)
        cookie.set("position", JSON.stringify(response.data.position), {
          expires: 7, 
          secure: true, 
        });
        toast.success("Login successful!")
        if(response.data.position == "user")
        {
          navigate("/landing")
        }
        else if(response.data.position == "admin")
        {
          navigate("/landing")
        }
      }
    } catch (error) {
      toast.error("Login failed. Please check your credentials.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const createUserResponse = await axios.post(`${backendUrl}/usersCrud/createUser`, {
        Email: email,
        Name: name,
        PhoneNumber: phoneNumber,
        Role: role,
      })
      if (createUserResponse.status === 200) {
        const createAuthResponse = await axios.post(`${backendUrl}/users/`, {
          email: email,
          password: password,
          position: "user",
          role: role,
        })
        console.log(createAuthResponse);
        if (createAuthResponse.status === 200) {
          toast.success("Signup successful!")
          navigate("/landing")
        }
      }
    } catch (error) {
      toast.error("Signup failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative flex h-screen w-full items-center justify-center bg-[#f0f0f0] overflow-y-auto">
      <ToastContainer />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJmb2ciIHg9IjAiIHk9IjAiIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48Y2lyY2xlIGN4PSIxNTAiIGN5PSIxNTAiIHI9IjIwMCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSI+PGFuaW1hdGUgYXR0cmlidXRlTmFtZT0iciIgZnJvbT0iMCIgdG89IjIwMCIgZHVyPSIxMHMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIi8+PC9jaXJjbGU+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2ZvZykiLz48L3N2Zz4=')] opacity-50 mix-blend-overlay"></div>
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="w-full max-w-md perspective-1000 z-20 mt-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Card className="bg-[#2b6777] shadow-[0_10px_50px_rgba(0,0,0,0.3)] relative border-none">
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-[#52ab98] to-[#2b6777] opacity-30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ duration: 1 }}
            />
            <motion.div
              className="h-1 bg-gradient-to-r from-[#52ab98] to-[#c8d8e4]"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
            <CardHeader className="space-y-2 pt-16 relative z-10">
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-20 h-20 bg-gradient-to-br from-[#52ab98] to-[#c8d8e4] rounded-full mx-auto flex items-center justify-center"
              >
                <User className="w-10 h-10 text-[#2b6777]" />
              </motion.div>
              <CardTitle className="text-2xl font-bold text-center text-white">Welcome</CardTitle>
              <CardDescription className="text-center text-gray-200">
                Please enter your details to continue
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-4 relative z-10">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-8 bg-[#1a3f4c]">
                  <TabsTrigger value="login" className="data-[state=active]:bg-[#52ab98] text-white">
                    Login
                  </TabsTrigger>
                  <TabsTrigger value="register" className="data-[state=active]:bg-[#52ab98] text-white">
                    Register
                  </TabsTrigger>
                </TabsList>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {activeTab === "login" ? (
                      <form className="space-y-4" onSubmit={handleLogin}>
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-sm font-medium text-gray-200">
                            Email
                          </Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <Input
                              id="email"
                              type="email"
                              placeholder="Enter your email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="w-full pl-10 pr-3 py-2 bg-[#1a3f4c]/50 border border-[#52ab98]/30 rounded-md focus:outline-none focus:ring-2 focus:ring-[#52ab98] text-white placeholder-gray-400"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="password" className="text-sm font-medium text-gray-200">
                            Password
                          </Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <Input
                              id="password"
                              type={showPassword ? "text" : "password"}
                              placeholder="Enter your password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              className="w-full pl-10 pr-10 py-2 bg-[#1a3f4c]/50 border border-[#52ab98]/30 rounded-md focus:outline-none focus:ring-2 focus:ring-[#52ab98] text-white placeholder-gray-400"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 cursor-pointer"
                            >
                              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>
                        {/* <div className="space-y-2">
                          <Label htmlFor="role" className="text-sm font-medium text-gray-200">
                            Role
                          </Label>
                          <div className="relative">
                            <select
                              id="role"
                              value={role}
                              onChange={(e) => setRole(e.target.value)}
                              className="w-full pl-10 pr-3 py-2 bg-[#1a3f4c]/50 border border-[#52ab98]/30 rounded-md focus:outline-none focus:ring-2 focus:ring-[#52ab98] text-white placeholder-gray-400"
                            >
                              <option value="" className="text-gray-400">Select Role</option>
                              <option value="undergraduate">Undergraduate</option>
                              <option value="phd">PhD</option>
                              <option value="faculty">Faculty</option>
                            </select>
                          </div>
                        </div> */}
                        <Button
                          type="submit"
                          className="w-full bg-gradient-to-r from-[#52ab98] to-[#c8d8e4] text-[#2b6777] font-semibold hover:opacity-90 transition-all duration-300 group cursor-pointer"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <div className="flex items-center justify-center">
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            </div>
                          ) : (
                            <>
                              <span className="mr-2">Sign In</span>
                              <motion.div
                                className="inline-block"
                                initial={{ x: 0 }}
                                animate={{ x: [0, 5, 0] }}
                                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, ease: "easeInOut" }}
                              >
                                <ChevronRight className="h-4 w-4" />
                              </motion.div>
                            </>
                          )}
                        </Button>
                      </form>
                    ) : (
                      <form className="space-y-4" onSubmit={handleSignup}>
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-sm font-medium text-gray-200">
                            Full Name
                          </Label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <Input
                              id="name"
                              type="text"
                              placeholder="Enter your full name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              className="w-full pl-10 pr-3 py-2 bg-[#1a3f4c]/50 border border-[#52ab98]/30 rounded-md focus:outline-none focus:ring-2 focus:ring-[#52ab98] text-white placeholder-gray-400"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-sm font-medium text-gray-200">
                            Email
                          </Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <Input
                              id="email"
                              type="email"
                              placeholder="Enter your email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="w-full pl-10 pr-3 py-2 bg-[#1a3f4c]/50 border border-[#52ab98]/30 rounded-md focus:outline-none focus:ring-2 focus:ring-[#52ab98] text-white placeholder-gray-400"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phoneNumber" className="text-sm font-medium text-gray-200">
                            Phone Number
                          </Label>
                          <div className="relative">
                            <Input
                              id="phoneNumber"
                              type="text"
                              placeholder="Enter your phone number"
                              value={phoneNumber}
                              onChange={(e) => setPhoneNumber(e.target.value)}
                              className="w-full pl-10 pr-3 py-2 bg-[#1a3f4c]/50 border border-[#52ab98]/30 rounded-md focus:outline-none focus:ring-2 focus:ring-[#52ab98] text-white placeholder-gray-400"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="password" className="text-sm font-medium text-gray-200">
                            Password
                          </Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <Input
                              id="password"
                              type={showPassword ? "text" : "password"}
                              placeholder="Choose a password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              className="w-full pl-10 pr-10 py-2 bg-[#1a3f4c]/50 border border-[#52ab98]/30 rounded-md focus:outline-none focus:ring-2 focus:ring-[#52ab98] text-white placeholder-gray-400"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 cursor-pointer"
                            >
                              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="role" className="text-sm font-medium text-gray-200">
                            Role
                          </Label>
                          <div className="relative">
                            <select
                              id="role"
                              value={role}
                              onChange={(e) => setRole(e.target.value)}
                              className="w-full pl-10 pr-3 py-2 bg-[#1a3f4c]/50 border border-[#52ab98]/30 rounded-md focus:outline-none focus:ring-2 focus:ring-[#52ab98] text-white placeholder-gray-400"
                            >
                              <option value="">Select Role</option>
                              <option value="undergraduate">Undergraduate</option>
                              <option value="phd">PhD</option>
                              <option value="faculty">Faculty</option>
                            </select>
                          </div>
                        </div>
                        <Button
                          type="submit"
                          className="w-full bg-gradient-to-r from-[#52ab98] to-[#c8d8e4] text-[#2b6777] font-semibold hover:opacity-90 transition-all duration-300 group cursor-pointer"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <div className="flex items-center justify-center">
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            </div>
                          ) : (
                            <>
                              <span className="mr-2">Create Account</span>
                              <motion.div
                                className="inline-block"
                                initial={{ x: 0 }}
                                animate={{ x: [0, 5, 0] }}
                                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, ease: "easeInOut" }}
                              >
                                <ChevronRight className="h-4 w-4" />
                              </motion.div>
                            </>
                          )}
                        </Button>
                      </form>
                    )}
                  </motion.div>
                </AnimatePresence>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  )
}