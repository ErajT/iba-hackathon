"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { ArrowRight, BookOpen, Users, FileText, Zap, Menu, X, Lightbulb, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export default function Home() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      const sections = ["home", "features", "how-it-works", "contact"]
      const current = sections.find((section) => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })

      if (current) {
        setActiveSection(current)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a3e48] to-[#08242c] text-white overflow-hidden">
      {/* Enhanced Animated background */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5" />
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full mix-blend-screen animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 300 + 50}px`,
              height: `${Math.random() * 300 + 50}px`,
              background: `radial-gradient(circle, ${["rgba(200,216,228,0.3)", "rgba(58,125,143,0.3)", "rgba(26,62,72,0.3)"][i % 3]} 0%, rgba(43,103,119,0) 70%)`,
              animation: `float ${Math.random() * 10 + 15}s infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#08242c] to-transparent animate-wave" />
      </div>

      {/* Navigation */}
      <nav
        className={cn(
          "fixed w-full z-50 transition-all duration-500",
          scrolled ? "bg-[#1a3e48]/80 backdrop-blur-md py-4 border-b border-[##08242c]/20" : "py-6",
        )}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <BookOpen className="h-8 w-8 text-[#c8d8e4] animate-pulse" />
            <span className="text-2xl font-bold bg-gradient-to-r from-white to-[#c8d8e4] bg-clip-text text-transparent">
              LearnFlow
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            {["home", "features", "how-it-works", "contact"].map((item) => (
              <button
                key={item}
                className={cn(
                  "transition-all duration-300 hover:text-[#c8d8e4] relative overflow-hidden group",
                  activeSection === item ? "text-[#c8d8e4]" : "text-white/70",
                )}
                onClick={() => scrollToSection(item)}
              >
                {item
                  .split("-")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#c8d8e4] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </button>
            ))}
            <Link to="/login">
              <Button className="bg-[#2b6777] hover:bg-[#3a7d8f] text-white group relative overflow-hidden">
                <span className="relative z-10">Login</span>
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                <span className="absolute inset-0 bg-[#c8d8e4] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </Button>
            </Link>
          </div>
          <button className="md:hidden" onClick={toggleMobileMenu}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#1a3e48] bg-opacity-95 flex flex-col items-center justify-center">
          {["home", "features", "how-it-works", "contact"].map((item) => (
            <button
              key={item}
              className="text-2xl mb-6 hover:text-[#c8d8e4] transition-colors duration-300"
              onClick={() => {
                scrollToSection(item)
                setMobileMenuOpen(false)
              }}
            >
              {item
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
            </button>
          ))}
          <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
            <Button className="bg-[#2b6777] hover:bg-[#3a7d8f] text-white mt-6">Login</Button>
          </Link>
        </div>
      )}

      <section id="home" className="relative min-h-screen flex items-center pt-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#08242c]/10 border border-[#08242c]/20 mb-8 animate-fade-up">
              <Zap className="h-4 w-4 text-[#c8d8e4] animate-pulse" />
              <span className="text-sm">Revolutionize Your Learning Experience</span>
            </div>
            <h1 className="text-4xl md:text-7xl font-bold mb-6 animate-fade-up leading-tight">
              <span className="bg-gradient-to-r from-white to-[#c8d8e4] bg-clip-text text-transparent">LearnFlow:</span>{" "}
              Streamline Your Study Process
            </h1>
            <p className="text-lg md:text-xl mb-8 text-white/70 animate-fade-up animation-delay-200 leading-relaxed">
              Create collections, add notes, collaborate with peers, and generate flashcards. LearnFlow makes learning
              easier and more efficient than ever before.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-up animation-delay-300">
              <Link to="/sign-up">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-[#2b6777] hover:bg-[#3a7d8f] text-white group relative overflow-hidden"
                >
                  <span className="relative z-10">Get Started</span>
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                  <span className="absolute inset-0 bg-[#c8d8e4] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </Button>
              </Link>
              <button
                onClick={() => scrollToSection("features")}
                className="w-full sm:w-auto text-[#c8d8e4] border border-[#c8d8e4] hover:bg-[#2b6777]/10 group relative overflow-hidden px-8 py-3 rounded-md"
              >
                <span className="relative z-10">Learn More</span>
                <ArrowRight className="ml-2 h-5 w-5 inline-block group-hover:translate-x-1 transition-transform duration-300" />
                <span className="absolute inset-0 bg-[#c8d8e4]/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="relative py-32">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-up">Key Features</h2>
            <p className="text-white/70 max-w-2xl mx-auto animate-fade-up animation-delay-200">
              Discover how LearnFlow can transform your study habits and boost your productivity.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="p-8 group hover:border-[#08242c]/50 transition-all duration-500 bg-[#1a3e48]/50 backdrop-blur-lg border-[#08242c]/20 overflow-hidden animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#08242c] to-[#3a7d8f] blur-[100px] opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-[#08242c]/10 mb-6 group-hover:bg-[#08242c]/20 transition-colors duration-300">
                      <feature.icon className="h-7 w-7 text-[#c8d8e4] group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-white/70 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="relative py-32 bg-[#08242c]/5">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-up">How It Works</h2>
            <p className="text-white/70 max-w-2xl mx-auto animate-fade-up animation-delay-200">
              LearnFlow simplifies your study process in just a few easy steps.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {howItWorks.map((step, index) => (
              <Card
                key={index}
                className="p-8 group hover:border-[#08242c]/50 transition-all duration-500 bg-[#1a3e48]/50 backdrop-blur-lg border-[#2b6777]/20 animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                  <Zap className="h-6 w-6 text-[#c8d8e4] group-hover:rotate-12 transition-transform duration-300" />
                  {step.title}
                </h3>
                <p className="text-white/70 mb-6 leading-relaxed">{step.description}</p>
                <button
                  onClick={() =>
                    (window.location.href = `/learn-more/${step.title.toLowerCase().replace(/\s+/g, "-")}`)
                  }
                  className="px-4 py-2 border border-[#c8d8e4] text-[#c8d8e4] rounded-md group-hover:bg-[#08242c] group-hover:text-white group-hover:border-transparent transition-all duration-300 group relative overflow-hidden"
                >
                  <span className="relative z-10">Learn More</span>
                  <ArrowRight className="ml-2 h-4 w-4 inline-block group-hover:translate-x-1 transition-transform duration-300" />
                  <span className="absolute inset-0 bg-[#c8d8e4] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-32">
        <div className="container mx-auto px-6">
          <Card className="max-w-4xl mx-auto p-8 md:p-12 text-center bg-[#1a3e48]/50 backdrop-blur-lg border-[#08242c]/20 overflow-hidden animate-fade-up">
            <div className="absolute inset-0 bg-gradient-to-r from-[#08242c] to-[#3a7d8f] blur-[100px] opacity-20" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Learning?</h2>
              <p className="text-lg md:text-xl text-white/70 mb-8 max-w-2xl mx-auto">
                Join LearnFlow today and experience a new way of organizing, collaborating, and mastering your studies.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/sign-up">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-[#2b6777] hover:bg-[#3a7d8f] text-white group relative overflow-hidden"
                  >
                    <span className="relative z-10">Get Started</span>
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                    <span className="absolute inset-0 bg-[#c8d8e4] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  </Button>
                </Link>
                <Link to="/demo">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto text-[#c8d8e4] border-[#c8d8e4] hover:bg-[#08242c]/10 group relative overflow-hidden"
                  >
                    <span className="relative z-10">Request Demo</span>
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                    <span className="absolute inset-0 bg-[#c8d8e4]/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  )
}

const features = [
  {
    icon: BookOpen,
    title: "Create Collections",
    description: "Organize your study materials into collections for easy access and management.",
  },
  {
    icon: FileText,
    title: "Add Notes & PDFs",
    description: "Seamlessly add notes and upload PDFs to your collections, keeping all your resources in one place.",
  },
  {
    icon: Users,
    title: "Collaborate",
    description: "Invite collaborators to your collections, fostering teamwork and knowledge sharing.",
  },
  {
    icon: Zap,
    title: "Generate Flashcards",
    description: "Automatically create flashcards from your notes and resources for efficient studying.",
  },
  {
    icon: MessageSquare,
    title: "Talk to PDFs",
    description: "Interact with your PDF resources using our AI-powered chat feature for deeper understanding.",
  },
  {
    icon: Lightbulb,
    title: "Smart Notifications",
    description: "Receive timely notifications about collaboration invites and updates to your collections.",
  },
]

const howItWorks = [
  {
    title: "Create Your Account",
    description: "Sign up for LearnFlow and set up your personalized learning environment.",
  },
  {
    title: "Build Your Collections",
    description: "Organize your study materials into collections, adding notes and uploading PDFs.",
  },
  {
    title: "Collaborate and Share",
    description:
      "Invite friends or classmates to collaborate on your collections or make them public for wider access.",
  },
  {
    title: "Generate Study Aids",
    description: "Use our AI-powered tools to create flashcards and interact with your PDFs for enhanced learning.",
  },
]

// export default Home

