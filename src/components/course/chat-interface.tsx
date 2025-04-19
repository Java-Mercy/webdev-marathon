"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send } from "lucide-react"

interface Message {
  id: string
  sender: "user" | "tutor" | "system"
  senderName: string
  content: string
  timestamp: Date
}

interface ChatInterfaceProps {
  courseId: string
}

export default function ChatInterface({ courseId }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "system",
      senderName: "System",
      content: "Welcome to the course discussion! Ask questions and interact with your tutor and peers.",
      timestamp: new Date(Date.now() - 3600000),
    },
    {
      id: "2",
      sender: "tutor",
      senderName: "Dr. Sarah Johnson",
      content:
        "Hello everyone! Feel free to ask any questions about the JavaScript fundamentals we covered in the video.",
      timestamp: new Date(Date.now() - 1800000),
    },
    {
      id: "3",
      sender: "user",
      senderName: "John Doe",
      content: "I'm having trouble understanding closures in JavaScript. Could you explain them in simpler terms?",
      timestamp: new Date(Date.now() - 900000),
    },
    {
      id: "4",
      sender: "tutor",
      senderName: "Dr. Sarah Johnson",
      content:
        "Great question, John! A closure is when a function 'remembers' its lexical scope even when the function is executed outside that scope. Think of it as a function that carries its own environment with it.",
      timestamp: new Date(Date.now() - 600000),
    },
  ])

  const [newMessage, setNewMessage] = useState("")
  const chatContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Scroll to bottom when messages change
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages])

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return

    const message: Message = {
      id: Date.now().toString(),
      sender: "user",
      senderName: "You",
      content: newMessage,
      timestamp: new Date(),
    }

    setMessages([...messages, message])
    setNewMessage("")

    // Simulate tutor response after a delay
    setTimeout(() => {
      const tutorResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: "tutor",
        senderName: "Dr. Sarah Johnson",
        content: "Thanks for your question! I'll get back to you shortly.",
        timestamp: new Date(),
      }

      setMessages((prevMessages) => [...prevMessages, tutorResponse])
    }, 1000)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="flex flex-col h-[600px]">
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4 chat-container">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`message-bubble ${
                message.sender === "user" ? "sent" : "received"
              } ${message.sender === "system" ? "bg-muted w-full text-center" : ""}`}
            >
              {message.sender !== "user" && <p className="text-xs font-semibold mb-1">{message.senderName}</p>}
              <p>{message.content}</p>
              <p className="text-xs opacity-70 text-right mt-1">{formatTime(message.timestamp)}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t p-4">
        <div className="flex gap-2">
          <Input
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSendMessage()
              }
            }}
          />
          <Button onClick={handleSendMessage} size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
