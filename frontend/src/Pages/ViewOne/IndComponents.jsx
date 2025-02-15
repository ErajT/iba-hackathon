import React from 'react'
import { format, isValid, parseISO } from 'date-fns'
import { DeleteIcon, File, Trash2, } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Link } from 'react-router-dom'
import Modal from '@/components/Modal'



export const formatDate = (dateString) => {
    const date = parseISO(dateString)
    return isValid(date) ? format(date, 'MMM d, yyyy') : 'Invalid Date'
  }

const FileItem = ({ Name, TimeCreated, CreatedBy,MaterialID }) => (
    <div className="flex items-center justify-between py-3 border-b last:border-b-0 ">
      <div className="flex items-center space-x-3  bread-words sm:w-56 w-42">
        <File className="h-5 w-5 text-[#125667]" />
        <Link to={`/file/${MaterialID}`}>
        <span className="font-medium hover:cursor-pointer hover:underline">{Name}</span>
        
        </Link>
      </div>
      <div className="text-xs bread-words sm:w-36 w-24 text-gray-500 ">
        {formatDate(TimeCreated)} by {CreatedBy}
      </div>


      <Modal title={"Delete File"} desc={`Are you sure you want to delete ${Name}`}>
      <Trash2 className='hover:cursor-pointer'/>
<div className='flex gap-8 justify-center'>
  <button className='btn-green'>Yes</button>
  <button className='btn-green'>No</button>
</div>
      </Modal>
    </div>
  )
  
  const ContributorAvatar = ({ name, email,id }) => (
   <div className='flex justify-between w-full'>
    <p>{name}</p>
    <p>{email}</p>
    
    <Modal title={"Remove Colloaborator"} desc={`Are you sure you want to remove ${name} from this collection`}>
      <Trash2 className='hover:cursor-pointer'/>
<div className='flex gap-8 justify-center'>
  <button className='btn-green'>Yes</button>
  <button className='btn-green'>No</button>
</div>
      </Modal>
   </div>
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
            <Label htmlFor="filename" className="space-y-2">Collection Name</Label>
            <Input id="filename" placeholder="Enter file name"  className="space-y-2"/>
          </div>
          <div className="space-y-2">
            <Label htmlFor="filename" className="space-y-2">Description</Label>
            <Input id="filename" placeholder="Enter file name"  className="space-y-2"/>
          </div>
          <div className="space-y-2">
            <Label htmlFor="filename" className="space-y-2">Files</Label>
            <span><p>File Name</p> <DeleteIcon /> </span>
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
  