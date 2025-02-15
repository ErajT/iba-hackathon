
import React, { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Switch } from "@/components/ui/switch"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Delete, DeleteIcon, PlusCircle, PlusIcon, Trash2Icon } from 'lucide-react'

function EditCollection({ isOpen, onClose,data }) {


const [collectionData, setCollectionData] = useState(data);

const handleReplace = (key,value)=>{
    let obj = {...collectionData}
    obj[`${key}`] = value;
    setCollectionData(obj)
}





  return (
    <Dialog open={isOpen} onOpenChange={onClose} >
    <DialogContent className='bg-gray-100 text-gray-800 dark:bg-[#091e24] dark:text-white overflow-y-scroll'>
      <DialogHeader>
        <DialogTitle>Upload New File</DialogTitle>
        <DialogDescription>
          Add a new PDF file to the collection.
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-4 py-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="space-y-2">Collection Name</Label>
          <Input id="name" placeholder="Enter file name"  className="space-y-2"/>
        </div>
        <div className="space-y-2">
          <Label htmlFor="desc" className="space-y-2">Description</Label>
          <Input id="desc" placeholder="Enter file name"  className="space-y-2"/>
        </div>

        {/* listing of all files */}
        {/* <div className="space-y-2 ">
          <Label  className="space-y-2">Files</Label>
          <span className='flex justify-between my-2'><p className='text-sm dark:text-blue-200 text-blue-600'>Abc.pdf</p> <Trash2Icon className='hover:cursor-pointer' /> </span>
          <span className='flex justify-between my-2'><p className='text-sm dark:text-blue-200 text-blue-600'>notes.pdf</p> <Trash2Icon className='hover:cursor-pointer' /> </span>
          
        </div>
        <div className="space-y-2">
          <Label htmlFor="file">Select File</Label>
          <Input id="file" type="file" accept=".pdf" />
        </div> */}

{/* Listing of collaborators */}
        {/* <div className="space-y-2 ">
          <Label htmlFor="filename" className="space-y-2">Collaborators</Label>
          <span className='flex justify-between my-2'><p className='text-sm'>Eraj Tanweer</p> <Trash2Icon className='hover:cursor-pointer' /> </span>
          <span className='flex justify-between my-2'><p className='text-sm'>Tazeen Amir</p> <Trash2Icon className='hover:cursor-pointer' /> </span>
          
        </div> */}

{/* Add new collaborator */}
{/* <div className="space-y-2">
          <Label htmlFor="collab-new">New Collaborator</Label>
          <span className='flex items-center gap-2 mt-2'>
          <Input id="collab-new" type="text" accept=".pdf" /> 
          <PlusCircle className='hover:cursor-pointer' />    
            </span> 
        </div> */}

{/* visibility */}
<div className="space-y-2 flex gap-2 items-center justify-between">
         
          <Label htmlFor="collab">Visibility</Label>
<select className='w-32 border-green-800 border rounded-lg p-2'>
    <option className='dark:bg-gray-800' value={1}>Private</option>
    <option className='dark:bg-gray-800' value={0}>Public</option>
</select>
      
           
        </div>



      </div>
      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button>Upload</Button>
      </div>
    </DialogContent>
  </Dialog>
  )
}

export default EditCollection