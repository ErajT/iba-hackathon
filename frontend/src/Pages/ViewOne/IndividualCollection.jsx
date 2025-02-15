import React, { useEffect, useState } from 'react'
import { format, isValid, parseISO } from 'date-fns'
import { File, Upload, Users, Info, Plus, X, PencilIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { UploadModal,FileItem,ContributorAvatar } from './IndComponents'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import EditCollection from './EditCollection'
import { Description } from '@radix-ui/react-dialog'
import Modal from '@/components/Modal'



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

export const formatDate = (dateString) => {
  const date = parseISO(dateString)
  return isValid(date) ? format(date, 'MMM d, yyyy') : 'Invalid Date'
}




function IndividualCollection() {
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
      const [collId, setCollId] = useState(useParams().id)

const [collData, setCollData] = useState({
  Name:"",
  files:[],
  collaborators:[],
  TimeCreated:"",
  Description:"",

})


  useEffect(()=>{
    const fetch = async () =>{


      try{
        const res = await axios.get(`http://localhost:2000/collection/getCollectionById/${collId}`)
        
        setCollData(p=>({...res.data.collection}))
        
        
      }
      catch(e){
        console.log(e)
        toast.error(e.data)
      }
    }
    fetch()
  },[])


  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 py-2 dark:text-gray-100">{collData.Name}</h1>
        <Button onClick={() => setIsUploadModalOpen(true) } className="bg-[#091e24] dark:bg-[#22424a] text-gray-100 hover:cursor-pointer flex items-base py-0 ">
          <PencilIcon className="h-4 w-4 mr-2 "  /> Edit Details
        </Button>
      </div>

      <Card className="mb-6 pb-8">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Files</CardTitle>
        </CardHeader>
        <CardContent>
          {collData.files.length>0?collData.files.map((file, index) => (
            <FileItem key={index} {...file} />
          )):"No Files Uploaded Yet"}
        </CardContent>
        <Modal >
        <Button  className="bg-[#091e24] ml-6 dark:bg-[#22424a] text-gray-100 hover:cursor-pointer flex items-base py-0 ">
          <Plus className="h-4 w-4 mr-2 "  /> Add File
        </Button>
        <div></div>
        </Modal>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2" /> Contributors
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3 space-x-2">
            {collData.collaborators.length>0&&collData.collaborators.map((contributor, index) => (
              <ContributorAvatar key={index} {...contributor} />
            ))}
            <ContributorAvatar name={"Bilal Abbas"} email={"abc@gmail.com"} id={4452} />
           
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <Info className="h-5 w-5 mr-2" /> Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm">{collData.Description}</p>
            <p className="text-sm">
              <span className="font-medium">Owner:</span> {collectionData.owner}
            </p>
            <p className="text-sm">
              <span className="font-medium">Created:</span> {collData.TimeCreated?formatDate(collData.TimeCreated):""}
            </p>
          </CardContent>
        </Card>
      </div>

    <EditCollection isOpen={isUploadModalOpen} onClose={() => setIsUploadModalOpen(false)} /> 
      {/* <UploadModal isOpen={isUploadModalOpen} onClose={() => setIsUploadModalOpen(false)} className="dark:bg-gray-800" /> */}
    </div>
  )
  
}

//need list of collaborators and list of files (file id, name, createdBy, date)

export default IndividualCollection