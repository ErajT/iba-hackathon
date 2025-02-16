// "use client"

// import * as React from "react"
// import { Check, Clock, Mail, Plus, Upload, X } from "lucide-react"
// import axios from "axios"
// import { useCookies } from "react-cookie"
// import { useToast } from "@/hooks/use-toast"

// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card"
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import { Switch } from "@/components/ui/switch"

// // Dummy existing users
// const existingUsers = [
//   { id: 1, name: "Alex Thompson", email: "alex@example.com", avatar: "/placeholder.svg?height=32&width=32" },
//   { id: 2, name: "Sarah Wilson", email: "sarah@example.com", avatar: "/placeholder.svg?height=32&width=32" },
//   { id: 3, name: "Mike Chen", email: "mike@example.com", avatar: "/placeholder.svg?height=32&width=32" },
// ]

// export default function AddCollection() {
//   const { toast } = useToast()
//   const [cookies] = useCookies(["userDetails"])
//   const [title, setTitle] = React.useState("")
//   const [description, setDescription] = React.useState("")
//   const [isPublic, setIsPublic] = React.useState(true)
//   const [topics, setTopics] = React.useState("")
//   const [selectedFile, setSelectedFile] = React.useState(null)
//   const [collaborators, setCollaborators] = React.useState([])
//   const [newCollaborator, setNewCollaborator] = React.useState({
//     name: "",
//     email: "",
//   })
//   const [collectionId, setCollectionId] = React.useState(null)

//   React.useEffect(() => {
//     console.log("User Details:", cookies.userDetails)
//   }, [cookies.userDetails])

//   const handleFileUpload = (e) => {
//     const file = e.target.files?.[0]
//     if (file && file.type === "application/pdf") {
//       setSelectedFile(file)
//     }
//   }

//   const handleAddExistingCollaborator = (user) => {
//     if (!collaborators.find((c) => c.email === user.email)) {
//       setCollaborators([
//         ...collaborators,
//         {
//           ...user,
//           status: "active",
//         },
//       ])
//     }
//   }

//   const handleAddNewCollaborator = async () => {
//     if (newCollaborator.name && newCollaborator.email) {
//       // Check if email is already in use
//       if (collaborators.find((c) => c.email === newCollaborator.email)) {
//         toast({
//           title: "Error",
//           description: "This email is already added as a collaborator.",
//           variant: "destructive",
//         })
//         return
//       }

//       try {
//         const response = await axios.post(
//           "/api/invite",
//           {
//             email: newCollaborator.email,
//             name: newCollaborator.name,
//           },
//           {
//             headers: {
//               Authorization: `Bearer ${cookies.token}`,
//             },
//           },
//         )
//         // Add new collaborator with pending status
//         setCollaborators([
//           ...collaborators,
//           {
//             id: response.data.id,
//             name: newCollaborator.name,
//             email: newCollaborator.email,
//             status: "pending",
//           },
//         ])

//         // Simulate sending invitation email
//         toast({
//           title: "Invitation Sent",
//           description: `An invitation email has been sent to ${newCollaborator.email}`,
//         })

//         // Reset form
//         setNewCollaborator({ name: "", email: "" })
//       } catch (error) {
//         console.error("Error sending invitation:", error)
//         toast({
//           title: "Error",
//           description: "Failed to send invitation. Please try again later.",
//           variant: "destructive",
//         })
//       }
//     }
//   }

//   const handleRemoveCollaborator = (collaborator) => {
//     setCollaborators(collaborators.filter((c) => c.id !== collaborator.id))
//   }

//   const handleCreateCollection = async () => {
//     try {
//       // Extract UserID from cookies
//       const userDetails =
//         typeof cookies.userDetails === "string" ? JSON.parse(cookies.userDetails) : cookies.userDetails
//       console.log("User Details:", userDetails)
//       const userId = userDetails.user.UserID
//       console.log("User ID:", userId)

//       if (!userId) {
//         throw new Error("User ID not found in cookie")
//       }

//       // First API call to create the collection
//       const createCollectionResponse = await axios.post("http://localhost:2000/collection/createCollection", {
//         UserID: userId,
//         Name: title,
//         Description: description,
//         IsPublic: isPublic,
//         Topics: topics.split(",").map((topic) => topic.trim()),
//       })

//       const newCollectionId = createCollectionResponse.data.collectionId
//       setCollectionId(newCollectionId)

//       toast({
//         title: "Success",
//         description: "Collection created successfully!",
//       })
//     } catch (error) {
//       console.error("Error creating collection:", error)
//       toast({
//         title: "Error",
//         description: error instanceof Error ? error.message : "Failed to create collection. Please try again.",
//         variant: "destructive",
//       })
//     }
//   }

//   const handleUploadPDF = async () => {
//     if (!selectedFile || !collectionId) {
//       toast({
//         title: "Error",
//         description: "Please select a file and create a collection first.",
//         variant: "destructive",
//       })
//       return
//     }

//     try {
//       const userDetails =
//         typeof cookies.userDetails === "string" ? JSON.parse(cookies.userDetails) : cookies.userDetails
//       const userId = userDetails.user.UserID

//       if (!userId) {
//         throw new Error("User ID not found in cookie")
//       }

//       const formData = new FormData()
//       formData.append("CollectionID", collectionId)
//       formData.append("CreatedByID", userId)
//       formData.append("File", selectedFile)

//       await axios.post("http://localhost:2000/material/addMaterial", formData)

//       toast({
//         title: "Success",
//         description: "PDF uploaded successfully!",
//       })
//     } catch (error) {
//       console.error("Error uploading PDF:", error)
//       toast({
//         title: "Error",
//         description: error instanceof Error ? error.message : "Failed to upload PDF. Please try again.",
//         variant: "destructive",
//       })
//     }
//   }

//   return (
//     <div className="container mx-auto max-w-3xl p-6">
//       <h1 className="mb-8 text-3xl font-bold">Create New Collection</h1>

//       <div className="space-y-8">
//         {/* Title and Description */}
//         <div className="space-y-4">
//           <div className="space-y-2">
//             <Label htmlFor="title">Title</Label>
//             <Input
//               id="title"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               placeholder="Enter collection title"
//             />
//           </div>
//           <div className="space-y-2">
//             <Label htmlFor="description">Description</Label>
//             <Textarea
//               id="description"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               placeholder="Enter collection description"
//               rows={4}
//             />
//           </div>
//           <div className="space-y-2">
//             <Label htmlFor="topics">Topics</Label>
//             <Input
//               id="topics"
//               value={topics}
//               onChange={(e) => setTopics(e.target.value)}
//               placeholder="Enter topics separated by commas"
//             />
//           </div>
//           <div className="flex items-center space-x-2">
//             <Switch
//               id="public"
//               checked={isPublic}
//               onCheckedChange={setIsPublic}
//               style={{ backgroundColor: isPublic ? "#2b6777" : "#ccc" }}
//             />
//             <Label htmlFor="public">Public</Label>
//           </div>
//         </div>

//         {/* Create Collection Button */}
//         <Button
//           className="w-full"
//           size="lg"
//           onClick={handleCreateCollection}
//           style={{ backgroundColor: "#2b6777", color: "#fff" }}
//         >
//           Create Collection
//         </Button>

//         {/* File Upload */}
//         <Card>
//           <CardContent className="p-6">
//             <div className="space-y-4">
//               <Label>Upload PDF</Label>
//               <div className="flex items-center gap-4">
//                 <Button asChild variant="outline">
//                   <label className="cursor-pointer">
//                     <Upload className="mr-2 h-4 w-4" />
//                     Select PDF
//                     <input type="file" accept=".pdf" className="hidden" onChange={handleFileUpload} />
//                   </label>
//                 </Button>
//                 {selectedFile && <span className="text-sm text-muted-foreground">{selectedFile.name}</span>}
//               </div>
//               {selectedFile && (
//                 <Button
//                   className="w-full"
//                   onClick={handleUploadPDF}
//                   style={{ backgroundColor: "#2b6777", color: "#fff" }}
//                 >
//                   Upload PDF
//                 </Button>
//               )}
//             </div>
//           </CardContent>
//         </Card>

//         {/* Collaborators */}
//         <Card>
//           <CardContent className="p-6">
//             <div className="space-y-4">
//               <Label>Collaborators</Label>

//               {/* Selected Collaborators List */}
//               {collaborators.length > 0 && (
//                 <div className="space-y-2">
//                   {collaborators.map((collaborator) => (
//                     <div key={collaborator.id} className="flex items-center justify-between rounded-md border p-2">
//                       <div className="flex items-center gap-3">
//                         <Avatar className="h-8 w-8">
//                           {collaborator.avatar ? (
//                             <AvatarImage src={collaborator.avatar} />
//                           ) : (
//                             <AvatarFallback>{collaborator.name[0]}</AvatarFallback>
//                           )}
//                         </Avatar>
//                         <div className="flex flex-col">
//                           <span className="text-sm font-medium">{collaborator.name}</span>
//                           <span className="text-xs text-muted-foreground">{collaborator.email}</span>
//                         </div>
//                         {collaborator.status === "pending" && (
//                           <span className="ml-2 flex items-center gap-1 rounded-full bg-yellow-100 px-2 py-0.5 text-xs text-yellow-800">
//                             <Clock className="h-3 w-3" />
//                             Pending
//                           </span>
//                         )}
//                         {collaborator.status === "active" && (
//                           <span className="ml-2 flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-800">
//                             <Check className="h-3 w-3" />
//                             Active
//                           </span>
//                         )}
//                       </div>
//                       <Button variant="ghost" size="icon" onClick={() => handleRemoveCollaborator(collaborator)}>
//                         <X className="h-4 w-4" />
//                       </Button>
//                     </div>
//                   ))}
//                 </div>
//               )}

//               {/* Add Collaborator Dialog */}
//               <Dialog>
//                 <DialogTrigger asChild>
//                   <Button variant="outline">
//                     <Plus className="mr-2 h-4 w-4" />
//                     Add Collaborator
//                   </Button>
//                 </DialogTrigger>
//                 <DialogContent className="sm:max-w-[425px]">
//                   <DialogHeader>
//                     <DialogTitle>Add Collaborator</DialogTitle>
//                   </DialogHeader>
//                   <div className="space-y-6 pt-4">
//                     {/* Existing Users */}
//                     <div className="space-y-2">
//                       <Label>Select Existing Users</Label>
//                       <div className="grid gap-2">
//                         {existingUsers.map((user) => (
//                           <Button
//                             key={user.id}
//                             variant="outline"
//                             className="justify-start"
//                             onClick={() => handleAddExistingCollaborator(user)}
//                           >
//                             <Avatar className="mr-2 h-6 w-6">
//                               <AvatarImage src={user.avatar} />
//                               <AvatarFallback>{user.name[0]}</AvatarFallback>
//                             </Avatar>
//                             <div className="flex flex-col items-start">
//                               <span>{user.name}</span>
//                               <span className="text-xs text-muted-foreground">{user.email}</span>
//                             </div>
//                           </Button>
//                         ))}
//                       </div>
//                     </div>

//                     <div className="relative">
//                       <div className="absolute inset-0 flex items-center">
//                         <span className="w-full border-t" />
//                       </div>
//                       <div className="relative flex justify-center text-xs uppercase">
//                         <span className="bg-background px-2 text-muted-foreground">Or invite new collaborator</span>
//                       </div>
//                     </div>

//                     {/* New Collaborator Form */}
//                     <div className="space-y-4">
//                       <div className="space-y-2">
//                         <Label htmlFor="name">Name</Label>
//                         <Input
//                           id="name"
//                           placeholder="Enter collaborator's name"
//                           value={newCollaborator.name}
//                           onChange={(e) =>
//                             setNewCollaborator((prev) => ({
//                               ...prev,
//                               name: e.target.value,
//                             }))
//                           }
//                         />
//                       </div>
//                       <div className="space-y-2">
//                         <Label htmlFor="email">Email</Label>
//                         <Input
//                           id="email"
//                           type="email"
//                           placeholder="Enter collaborator's email"
//                           value={newCollaborator.email}
//                           onChange={(e) =>
//                             setNewCollaborator((prev) => ({
//                               ...prev,
//                               email: e.target.value,
//                             }))
//                           }
//                         />
//                       </div>
//                       <Button
//                         className="w-full"
//                         onClick={handleAddNewCollaborator}
//                         disabled={!newCollaborator.name || !newCollaborator.email}
//                       >
//                         <Mail className="mr-2 h-4 w-4" />
//                         Send Invitation
//                       </Button>
//                     </div>
//                   </div>
//                 </DialogContent>
//               </Dialog>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   )
// }

"use client"

import * as React from "react"
import { Check, Clock, Mail, Plus, Upload, X, Loader2 } from "lucide-react"
import axios from "axios"
import { useCookies } from "react-cookie"
import { useToast } from "@/hooks/use-toast"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"

export default function AddCollection() {
  const { toast } = useToast()
  const [cookies] = useCookies(["userDetails"])
  const [title, setTitle] = React.useState("")
  const [description, setDescription] = React.useState("")
  const [isPublic, setIsPublic] = React.useState(true)
  const [topics, setTopics] = React.useState("")
  const [selectedFile, setSelectedFile] = React.useState(null)
  const [collaborators, setCollaborators] = React.useState([])
  const [existingUsers, setExistingUsers] = React.useState([])
  const [selectedUsers, setSelectedUsers] = React.useState([])
  const [newCollaborator, setNewCollaborator] = React.useState({
    name: "",
    email: "",
  })
  const [collectionId, setCollectionId] = React.useState(null)
  const [dialogOpen, setDialogOpen] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  // Fetch existing users when dialog opens
  React.useEffect(() => {
    if (dialogOpen) {
      fetchExistingUsers()
    }
  }, [dialogOpen])

  const fetchExistingUsers = async () => {
    setIsLoading(true)
    try {
      const response = await axios.get("http://localhost:2000/usersCrud/getAllUsers")
      if (response.data.status === "success" && Array.isArray(response.data.users)) {
        setExistingUsers(response.data.users)
        toast({
          title: "Success",
          description: "Users fetched successfully",
          variant: "default",
        })
      } else {
        throw new Error("Invalid response format")
      }
    } catch (error) {
      console.error("Error fetching users:", error)
      toast({
        title: "Error",
        description: "Failed to fetch users. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0]
    if (file && file.type === "application/pdf") {
      setSelectedFile(file)
    }
  }

  const handleAddExistingCollaborators = async () => {
    if (selectedUsers.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one user.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      await axios.post("http://localhost:2000/collaborator/addCollaborator", {
        collectionId: collectionId,
        collaborators: selectedUsers.join(","),
      })

      // Add selected users to collaborators list
      const newCollaborators = existingUsers
        .filter((user) => selectedUsers.includes(user.UserID))
        .map((user) => ({
          id: user.UserID,
          name: user.Name,
          email: user.Email,
          status: "active",
        }))

      setCollaborators((prev) => [...prev, ...newCollaborators])
      setSelectedUsers([])
      setDialogOpen(false)

      toast({
        title: "Success",
        description: "Collaborators added successfully!",
        variant: "default",
      })
    } catch (error) {
      console.error("Error adding collaborators:", error)
      toast({
        title: "Error",
        description: "Failed to add collaborators. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddNewCollaborator = async () => {
    if (!newCollaborator.name || !newCollaborator.email) return

    setIsLoading(true)
    try {
      const userDetails =
        typeof cookies.userDetails === "string" ? JSON.parse(cookies.userDetails) : cookies.userDetails

      await axios.post("http://localhost:2000/collaborator/pendingCollaborator", {
        CollectionID: collectionId,
        UserID: userDetails.user.UserID,
        Name: newCollaborator.name,
        Email: newCollaborator.email,
      })

      setCollaborators((prev) => [
        ...prev,
        {
          id: Date.now(), // Temporary ID for UI purposes
          name: newCollaborator.name,
          email: newCollaborator.email,
          status: "pending",
        },
      ])

      setNewCollaborator({ name: "", email: "" })
      setDialogOpen(false)

      toast({
        title: "Success",
        description: "Invitation sent successfully!",
        variant: "default",
      })
    } catch (error) {
      console.error("Error sending invitation:", error)
      toast({
        title: "Error",
        description: "Failed to send invitation. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleRemoveCollaborator = (collaborator) => {
    setCollaborators(collaborators.filter((c) => c.id !== collaborator.id))
  }

  const handleCreateCollection = async () => {
    setIsLoading(true)
    try {
      const userDetails =
        typeof cookies.userDetails === "string" ? JSON.parse(cookies.userDetails) : cookies.userDetails
      console.log("User Details:", userDetails)
      const userId = userDetails.user.UserID
      console.log("User ID:", userId)

      if (!userId) {
        throw new Error("User ID not found in cookie")
      }

      const createCollectionResponse = await axios.post("http://localhost:2000/collection/createCollection", {
        UserID: userId,
        Name: title,
        Description: description,
        IsPublic: isPublic,
        Topics: topics.split(",").map((topic) => topic.trim()),
      })

      setCollectionId(createCollectionResponse.data.collectionId)

      toast({
        title: "Success",
        description: "Collection created successfully!",
        variant: "default",
      })
    } catch (error) {
      console.error("Error creating collection:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create collection. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleUploadPDF = async () => {
    if (!selectedFile || !collectionId) {
      toast({
        title: "Error",
        description: "Please select a file and create a collection first.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      const userDetails =
        typeof cookies.userDetails === "string" ? JSON.parse(cookies.userDetails) : cookies.userDetails
      const userId = userDetails.user.UserID

      if (!userId) {
        throw new Error("User ID not found in cookie")
      }

      const formData = new FormData()
      formData.append("CollectionID", collectionId)
      formData.append("CreatedByID", userId)
      formData.append("File", selectedFile)

      await axios.post("http://localhost:2000/material/addMaterial", formData)

      toast({
        title: "Success",
        description: "PDF uploaded successfully!",
        variant: "default",
      })
    } catch (error) {
      console.error("Error uploading PDF:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to upload PDF. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
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
          <div className="space-y-2">
            <Label htmlFor="topics">Topics</Label>
            <Input
              id="topics"
              value={topics}
              onChange={(e) => setTopics(e.target.value)}
              placeholder="Enter topics separated by commas"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="public"
              checked={isPublic}
              onCheckedChange={setIsPublic}
              style={{ backgroundColor: isPublic ? "#2b6777" : "#ccc" }}
            />
            <Label htmlFor="public">Public</Label>
          </div>
        </div>

        {/* Create Collection Button */}
        <Button
          className="w-full"
          size="lg"
          onClick={handleCreateCollection}
          style={{ backgroundColor: "#2b6777", color: "#fff" }}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating...
            </>
          ) : (
            "Create Collection"
          )}
        </Button>

        {/* File Upload */}
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <Label>Upload PDF</Label>
              <div className="flex items-center gap-4">
                <Button asChild variant="outline" disabled={isLoading}>
                  <label className="cursor-pointer">
                    <Upload className="mr-2 h-4 w-4" />
                    Select PDF
                    <input type="file" accept=".pdf" className="hidden" onChange={handleFileUpload} />
                  </label>
                </Button>
                {selectedFile && <span className="text-sm text-muted-foreground">{selectedFile.name}</span>}
              </div>
              {selectedFile && (
                <Button
                  className="w-full"
                  onClick={handleUploadPDF}
                  style={{ backgroundColor: "#2b6777", color: "#fff" }}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    "Upload PDF"
                  )}
                </Button>
              )}
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
                          <AvatarFallback>{collaborator.name[0]}</AvatarFallback>
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
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Collaborator
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                  <DialogHeader>
                    <DialogTitle className="text-lg font-semibold">Add Collaborator</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-6 pt-4">
                    {/* Existing Users */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Select Existing Users</Label>
                      <div className="max-h-[200px] overflow-y-auto">
                        {isLoading ? (
                          <div className="flex items-center justify-center p-4">
                            <Loader2 className="h-6 w-6 animate-spin" />
                          </div>
                        ) : (
                          Array.isArray(existingUsers) &&
                          existingUsers.map((user) => (
                            <div key={user.UserID} className="flex items-center space-x-3 rounded-md border p-2 mb-2">
                              <Checkbox
                                id={`user-${user.UserID}`}
                                checked={selectedUsers.includes(user.UserID)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setSelectedUsers((prev) => [...prev, user.UserID])
                                  } else {
                                    setSelectedUsers((prev) => prev.filter((id) => id !== user.UserID))
                                  }
                                }}
                              />
                              <div className="flex flex-1 items-center gap-3">
                                <Avatar className="h-8 w-8">
                                  <AvatarFallback>{user.Name[0]}</AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col">
                                  <Label htmlFor={`user-${user.UserID}`} className="text-sm font-medium">
                                    {user.Name}
                                  </Label>
                                  <span className="text-xs text-gray-500 dark:text-gray-400">{user.Email}</span>
                                </div>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                      <Button
                        className="w-full mt-4"
                        onClick={handleAddExistingCollaborators}
                        disabled={selectedUsers.length === 0 || isLoading}
                        style={{ backgroundColor: "#2b6777", color: "#fff" }}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Adding...
                          </>
                        ) : (
                          "Add Selected Users"
                        )}
                      </Button>
                    </div>

                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-gray-300 dark:border-gray-600" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white dark:bg-gray-800 px-2 text-gray-500 dark:text-gray-400">
                          Or invite new collaborator
                        </span>
                      </div>
                    </div>

                    {/* New Collaborator Form */}
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm font-medium">
                          Name
                        </Label>
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
                        <Label htmlFor="email" className="text-sm font-medium">
                          Email
                        </Label>
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
                        disabled={!newCollaborator.name || !newCollaborator.email || isLoading}
                        style={{ backgroundColor: "#2b6777", color: "#fff" }}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Mail className="mr-2 h-4 w-4" />
                            Send Invitation
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

