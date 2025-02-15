
"use client"

import * as React from "react"
import { Check, Clock, Mail, Plus, Upload, X } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
// import { useToast } from "@/components/ui/use-toast"

// Dummy existing users
const existingUsers = [
  { id: 1, name: "Alex Thompson", email: "alex@example.com", avatar: "/placeholder.svg?height=32&width=32" },
  { id: 2, name: "Sarah Wilson", email: "sarah@example.com", avatar: "/placeholder.svg?height=32&width=32" },
  { id: 3, name: "Mike Chen", email: "mike@example.com", avatar: "/placeholder.svg?height=32&width=32" },
]

export default function AddCollection() {
  // const { toast } = useToast()
  const [title, setTitle] = React.useState("")
  const [description, setDescription] = React.useState("")
  const [selectedFile, setSelectedFile] = React.useState(null)
  const [collaborators, setCollaborators] = React.useState([])
  const [newCollaborator, setNewCollaborator] = React.useState({
    name: "",
    email: "",
  })

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0]
    if (file && file.type === "application/pdf") {
      setSelectedFile(file)
    }
  }

  const handleAddExistingCollaborator = (user) => {
    if (!collaborators.find((c) => c.email === user.email)) {
      setCollaborators([
        ...collaborators,
        {
          ...user,
          status: "active",
        },
      ])
    }
  }

  const handleAddNewCollaborator = () => {
    if (newCollaborator.name && newCollaborator.email) {
      // Check if email is already in use
      if (collaborators.find((c) => c.email === newCollaborator.email)) {
        toast({
          title: "Error",
          description: "This email is already added as a collaborator.",
          variant: "destructive",
        })
        return
      }

      // Add new collaborator with pending status
      setCollaborators([
        ...collaborators,
        {
          id: `pending-${Date.now()}`,
          name: newCollaborator.name,
          email: newCollaborator.email,
          status: "pending",
        },
      ])

      // Simulate sending invitation email
      toast({
        title: "Invitation Sent",
        description: `An invitation email has been sent to ${newCollaborator.email}`,
      })

      // Reset form
      setNewCollaborator({ name: "", email: "" })
    }
  }

  const handleRemoveCollaborator = (collaborator) => {
    setCollaborators(collaborators.filter((c) => c.id !== collaborator.id))
  }

  return (
    <div className="container mx-auto max-w-3xl p-6">
      <h1 className="mb-8 text-3xl font-bold">Create New Collection</h1>

      <div className="space-y-8">
        {/* Title and Description */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter collection title"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter collection description"
              rows={4}
            />
          </div>
        </div>

        {/* File Upload */}
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <Label>Files</Label>
              <div className="flex items-center gap-4">
                <Button asChild variant="outline">
                  <label className="cursor-pointer">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload PDF
                    <input type="file" accept=".pdf" className="hidden" onChange={handleFileUpload} />
                  </label>
                </Button>
                {selectedFile && <span className="text-sm text-muted-foreground">{selectedFile.name}</span>}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Collaborators */}
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <Label>Collaborators</Label>

              {/* Selected Collaborators List */}
              {collaborators.length > 0 && (
                <div className="space-y-2">
                  {collaborators.map((collaborator) => (
                    <div key={collaborator.id} className="flex items-center justify-between rounded-md border p-2">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          {collaborator.avatar ? (
                            <AvatarImage src={collaborator.avatar} />
                          ) : (
                            <AvatarFallback>{collaborator.name[0]}</AvatarFallback>
                          )}
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">{collaborator.name}</span>
                          <span className="text-xs text-muted-foreground">{collaborator.email}</span>
                        </div>
                        {collaborator.status === "pending" && (
                          <span className="ml-2 flex items-center gap-1 rounded-full bg-yellow-100 px-2 py-0.5 text-xs text-yellow-800">
                            <Clock className="h-3 w-3" />
                            Pending
                          </span>
                        )}
                        {collaborator.status === "active" && (
                          <span className="ml-2 flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-800">
                            <Check className="h-3 w-3" />
                            Active
                          </span>
                        )}
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => handleRemoveCollaborator(collaborator)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              {/* Add Collaborator Dialog */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Collaborator
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add Collaborator</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-6 pt-4">
                    {/* Existing Users */}
                    <div className="space-y-2">
                      <Label>Select Existing Users</Label>
                      <div className="grid gap-2">
                        {existingUsers.map((user) => (
                          <Button
                            key={user.id}
                            variant="outline"
                            className="justify-start"
                            onClick={() => handleAddExistingCollaborator(user)}
                          >
                            <Avatar className="mr-2 h-6 w-6">
                              <AvatarImage src={user.avatar} />
                              <AvatarFallback>{user.name[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col items-start">
                              <span>{user.name}</span>
                              <span className="text-xs text-muted-foreground">{user.email}</span>
                            </div>
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">Or invite new collaborator</span>
                      </div>
                    </div>

                    {/* New Collaborator Form */}
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          placeholder="Enter collaborator's name"
                          value={newCollaborator.name}
                          onChange={(e) =>
                            setNewCollaborator((prev) => ({
                              ...prev,
                              name: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter collaborator's email"
                          value={newCollaborator.email}
                          onChange={(e) =>
                            setNewCollaborator((prev) => ({
                              ...prev,
                              email: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <Button
                        className="w-full"
                        onClick={handleAddNewCollaborator}
                        disabled={!newCollaborator.name || !newCollaborator.email}
                      >
                        <Mail className="mr-2 h-4 w-4" />
                        Send Invitation
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <Button className="w-full" size="lg">
          Create Collection
        </Button>
      </div>
    </div>
  )
}