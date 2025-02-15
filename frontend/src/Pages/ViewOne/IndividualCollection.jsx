import React, { useState } from 'react'
import { format, isValid, parseISO } from 'date-fns'
import { File, Upload, Users, Info, Plus, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { UploadModal,FileItem,ContributorAvatar } from './IndComponents'



const collectionData = {
  name: "Project Documentation",
  description: "A collection of important documents and files for our project.",
  owner: "Jane Doe",
  createdDate: "2023-01-15",
  files: [
    { name: "README.pdf", uploadDate: "2023-01-15", uploadedBy: "Jane Doe" },
    { name: "Architecture.pdf", uploadDate: "2023-02-01", uploadedBy: "John Smith" },
    { name: "UserGuide.pdf", uploadDate: "2023-03-10", uploadedBy: "Alice Johnson" },
  ],
  contributors: [
    { name: "Jane Doe", avatar: "/placeholder.svg?height=32&width=32" },
    { name: "John Smith", avatar: "/placeholder.svg?height=32&width=32" },
    { name: "Alice Johnson", avatar: "/placeholder.svg?height=32&width=32" },
  ]
}

const formatDate = (dateString) => {
  const date = parseISO(dateString)
  return isValid(date) ? format(date, 'MMM d, yyyy') : 'Invalid Date'
}




function IndividualCollection() {
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
      

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 py-2 dark:text-gray-100">{collectionData.name}</h1>
        <Button onClick={() => setIsUploadModalOpen(true) } className="bg-[#091e24] dark:bg-[#22424a] text-gray-100 hover:cursor-pointer flex items-base py-0 ">
          <Plus className="h-4 w-4 mr-2 "  /> Add File
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Files</CardTitle>
        </CardHeader>
        <CardContent>
          {collectionData.files.map((file, index) => (
            <FileItem key={index} {...file} />
          ))}
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2" /> Contributors
            </CardTitle>
          </CardHeader>
          <CardContent className="flex space-x-2">
            {collectionData.contributors.map((contributor, index) => (
              <ContributorAvatar key={index} {...contributor} />
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <Info className="h-5 w-5 mr-2" /> Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm">{collectionData.description}</p>
            <p className="text-sm">
              <span className="font-medium">Owner:</span> {collectionData.owner}
            </p>
            <p className="text-sm">
              <span className="font-medium">Created:</span> {formatDate(collectionData.createdDate)}
            </p>
          </CardContent>
        </Card>
      </div>

      <UploadModal isOpen={isUploadModalOpen} onClose={() => setIsUploadModalOpen(false)} className="dark:bg-gray-800" />
    </div>
  )
  
}

export default IndividualCollection