
import React, { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Switch } from "@/components/ui/switch"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Delete, DeleteIcon, PlusCircle, PlusIcon, Trash2Icon } from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast'

function EditCollection({ isOpen, onClose,Name,Description,isPublic=1,id ,setTriggerUpdate}) {

    const [collectionData, setCollectionData] = useState({
        Name,Description,isPublic
});

const handleReplace = (key,value)=>{
    let obj = {...collectionData}
    obj[`${key}`] = value;
    setCollectionData(obj)
    console.log(collectionData.isPublic)
}

useEffect(()=>{

    if(isOpen){

        setCollectionData({Name,Description,isPublic})
        }
},[isOpen])


const handleSubmit = async()=>{
    try{
        console.log(id)
        console.log(collectionData)
        const res = await axios.patch(`http://localhost:2000/collection/updateCollection/${id}`,collectionData);
        console.log(res)
        toast.success("Collection Details updated successfully")
        setTriggerUpdate(p=>!p)
    }
    catch(e){
console.log(e)
toast.error("Could not update collection")
    }
}


if(!collectionData.Name || !collectionData.Description || collectionData.isPublic==null) return
  return (
    <Dialog open={isOpen} onOpenChange={onClose} >
    <DialogContent className='bg-gray-100 text-gray-800 dark:bg-[#091e24] dark:text-white'>
      <DialogHeader>
        <DialogTitle>Upload New File</DialogTitle>
        <DialogDescription>
          Add a new PDF file to the collection.
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-4 py-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="space-y-2">Collection Name</Label>
          <Input id="name" placeholder="Enter file name" value={collectionData.Name} onChange={(e)=>handleReplace("Name",e.target.value)}  className="space-y-2"/>
        </div>
        <div className="space-y-2">
          <Label htmlFor="desc" className="space-y-2">Description</Label>
          <Input id="desc" placeholder="Enter file name" value={collectionData.Description} onChange={(e)=>handleReplace("Description",e.target.value)} className="space-y-2"/>
        </div>

   
<div className="space-y-2 flex gap-2 items-center justify-between">
         
          <Label htmlFor="collab">Visibility</Label>
<select className='w-32 border-green-800 border rounded-lg p-2' value={collectionData.isPublic} onChange={(e)=>{handleReplace("isPublic",e.target.value)
    }
}>
    <option className='dark:bg-gray-800' value={0}>Private</option>
    <option className='dark:bg-gray-800' value={1}>Public</option>
</select>
      
           
        </div>



      </div>
      <div className="flex justify-end space-x-2">
        <DialogTrigger>

        <Button variant="outline" onClick={onClose}>Cancel</Button>
        </DialogTrigger>

        <DialogTrigger>

        <Button onClick={handleSubmit} >Upload</Button>
        </DialogTrigger>
      </div>
    </DialogContent>
  </Dialog>
  )
}

export default EditCollection