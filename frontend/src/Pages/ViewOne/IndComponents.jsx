import React, { useState } from 'react'
import { format, isValid, parseISO } from 'date-fns'
import { File, Upload, Users, Info, Plus, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Link } from 'react-router-dom'



const formatDate = (dateString) => {
    const date = parseISO(dateString)
    return isValid(date) ? format(date, 'MMM d, yyyy') : 'Invalid Date'
  }

const FileItem = ({ name, uploadDate, uploadedBy }) => (
    <div className="flex items-center justify-between py-3 border-b last:border-b-0 ">
      <div className="flex items-center space-x-3">
        <File className="h-5 w-5 text-[#125667]" />
        <Link to={"/file/:1"}>
        <span className="font-medium hover:cursor-pointer hover:underline">{name}</span>
        
        </Link>
      </div>
      <div className="text-xs bread-words sm:w-36 w-24 text-gray-500 ">
        {formatDate(uploadDate)} by {uploadedBy}
      </div>
    </div>
  )
  
  const ContributorAvatar = ({ name, avatar }) => (
    <Avatar className="h-8 w-8">
      <AvatarImage src={"https://avatars.githubusercontent.com/u/111193665?v=4&size=64"} alt={name} />
      <AvatarFallback>{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
    </Avatar>
  )
  
  const UploadModal = ({ isOpen, onClose }) => (
    <Dialog open={isOpen} onOpenChange={onClose} >
      <DialogContent className='bg-gray-100 text-gray-800 dark:bg-[#091e24] dark:text-white '>
        <DialogHeader>
          <DialogTitle>Upload New File</DialogTitle>
          <DialogDescription>
            Add a new PDF file to the collection.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="filename" className="space-y-2">File Name</Label>
            <Input id="filename" placeholder="Enter file name"  className="space-y-2"/>
          </div>
          <div className="space-y-2">
            <Label htmlFor="file">Select File</Label>
            <Input id="file" type="file" accept=".pdf" />
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button>Upload</Button>
        </div>
      </DialogContent>
    </Dialog>
  )


  export{UploadModal,FileItem,ContributorAvatar}
  