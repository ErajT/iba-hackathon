import React, { useState } from 'react'
import { MessageCircle, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ChatBox } from './ChatBox'

export function ChatPopup() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Chat Trigger Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className={`
          fixed bottom-4 right-4 h-14 w-14 rounded-full shadow-lg 
          bg-[#003644] dark:bg-[#08242c]
          transition-all duration-300 ease-in-out
          hover:scale-110 hover:shadow-xl
          ${isOpen ? 'translate-y-96 opacity-0' : 'translate-y-0 opacity-100'}
        `}
      >
        <MessageCircle className="h-6 w-6 text-white" />
      </Button>

      {/* Chat Container */}
      <div
        className={`
          fixed bottom-4 right-4 z-50
          transform transition-all duration-300 ease-in-out
          ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-96 opacity-0 pointer-events-none'}
        `}
      >
        <div className="relative">
          {/* Close Button */}
          <Button
            onClick={() => setIsOpen(false)}
            className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-gray-100 dark:bg-gray-800 shadow-lg hover:scale-110 transition-transform duration-300"
            size="icon"
          >
            <X className="h-4 w-4" />
          </Button>
          
          {/* Chat Box Component */}
          <div className="transform transition-all duration-300 ease-in-out hover:shadow-2xl">
            <ChatBox setIsOpen={setIsOpen} />
          </div>
        </div>
      </div>

      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm md:hidden z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}