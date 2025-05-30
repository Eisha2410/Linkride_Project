"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { DashboardNav } from "@/components/dashboard-nav"
import { MessageSquare, Send, User } from "lucide-react"

// Mock data for demonstration
const conversations = [
  {
    id: 1,
    user: "John Doe",
    lastMessage: "What time will you arrive?",
    time: "10:30 AM",
    unread: true,
  },
  {
    id: 2,
    user: "Jane Smith",
    lastMessage: "Thanks for the ride yesterday!",
    time: "Yesterday",
    unread: false,
  },
]

const messages = [
  {
    id: 1,
    sender: "John Doe",
    content: "Hi there! I'm interested in your ride from University Main Gate to Downtown Station tomorrow.",
    time: "10:15 AM",
    isMe: false,
  },
  {
    id: 2,
    sender: "You",
    content: "Hello! Yes, I still have 2 seats available.",
    time: "10:20 AM",
    isMe: true,
  },
  {
    id: 3,
    sender: "John Doe",
    content: "Great! What time will you arrive at the pickup point?",
    time: "10:30 AM",
    isMe: false,
  },
]

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0])
  const [newMessage, setNewMessage] = useState("")

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim()) {
      // Handle sending message logic here
      console.log("Sending message:", newMessage)
      setNewMessage("")
    }
  }

  return (
    <div className="flex min-h-screen">
      <DashboardNav />
      <main className="flex-1">
        <div className="flex h-[calc(100vh-64px)] flex-col md:flex-row">
          {/* Conversations List */}
          <div className="border-r md:w-80">
            <div className="p-4">
              <h1 className="text-xl font-bold">Messages</h1>
            </div>
            <div className="divide-y">
              {conversations.map((conversation) => (
                <button
                  key={conversation.id}
                  className={`w-full px-4 py-3 text-left hover:bg-gray-50 ${
                    selectedConversation?.id === conversation.id ? "bg-gray-50" : ""
                  }`}
                  onClick={() => setSelectedConversation(conversation)}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-100 text-teal-600">
                      <User className="h-5 w-5" />
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{conversation.user}</p>
                        <p className="text-xs text-gray-500">{conversation.time}</p>
                      </div>
                      <p className="truncate text-sm text-gray-500">{conversation.lastMessage}</p>
                    </div>
                    {conversation.unread && <div className="h-2 w-2 rounded-full bg-teal-600"></div>}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Message Window */}
          {selectedConversation ? (
            <div className="flex flex-1 flex-col">
              {/* Conversation Header */}
              <div className="border-b p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-100 text-teal-600">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">{selectedConversation.user}</p>
                    <p className="text-xs text-gray-500">Online</p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div key={message.id} className={`flex ${message.isMe ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.isMe ? "bg-teal-600 text-white" : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        <p>{message.content}</p>
                        <p className={`mt-1 text-right text-xs ${message.isMe ? "text-teal-100" : "text-gray-500"}`}>
                          {message.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Message Input */}
              <div className="border-t p-4">
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <Input
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit" className="bg-teal-600 hover:bg-teal-700" disabled={!newMessage.trim()}>
                    <Send className="h-4 w-4" />
                    <span className="sr-only">Send</span>
                  </Button>
                </form>
              </div>
            </div>
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center">
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-10">
                  <MessageSquare className="mb-4 h-12 w-12 text-gray-300" />
                  <p className="mb-2 text-lg font-medium">No conversation selected</p>
                  <p className="text-center text-gray-500">Select a conversation from the list to start messaging.</p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
