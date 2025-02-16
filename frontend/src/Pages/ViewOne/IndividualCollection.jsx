import React, { useEffect, useState } from 'react'
import { format, isValid, parseISO } from 'date-fns'
import { File, Upload, Users, Info, Plus, X, PencilIcon, Loader, Send, SendHorizonal } from 'lucide-react'
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

      const [file,setFile] = useState(null)

      const [triggerUpdate,setTriggerUpdate] = useState(true);

      const [collabID,setCollabId] = useState()

const [collData, setCollData] = useState({
  Name:"",
  files:[],
  collaborators:[],
  TimeCreated:"",
  Description:"",

})

const [allUsers,setAllUsers] = useState([])

  const handleCollabIdChange = (e)=>{
    console.log(e.target.value)
    setCollabId(e.target.value)
  }


  useEffect(()=>{
    const fetch = async () =>{


      try{
        const res = await axios.get(`http://localhost:2000/collection/getCollectionById/${collId}`)
        
        setCollData(p=>({...res.data.collection}))
        
        console.log(res.data.collection)
        let users = await axios.get('http://localhost:2000/usersCrud/getAllUsers');
        // console.log(users)
        users = users.data.users.map((v,i)=>{
         
          return {UserID:v.UserID,Name:v.Name}
        })

        setAllUsers(users)




      }
      catch(e){
        console.log(e)
        toast.error(e.data)
      }
    }
    fetch()
  },[triggerUpdate])


const uploadFile = async ()=>{
  try {
    if(!file){
      console.log(file)
      toast.error("File error")
      return}
    // Read file as ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer); // Convert to buffer format

    // const requestBody = {
    //   CollectionID: "1", // Replace with actual CollectionID
    //   CreatedByID: "1", // Replace with actual CreatedByID
    //   File: Array.from(buffer), // Convert buffer to array for JSON
    // };

    const formData = new FormData();
    formData.append("CollectionID", 1);
    formData.append("CreatedByID", 1);
    formData.append("File", file);

    const response = await axios.post(
      "http://localhost:2000/material/addMaterial",
      formData
    );
console.log(response)
setTriggerUpdate(p=>!p)
toast.success("File uploaded successfully")
  } catch (error) {
    console.error("Upload error:", error);
    toast.error("Could not upload file")
  }

}

const handleAddCollab = async ()=>{
try{

  const res = await axios.post(`http://localhost:2000/collaborator/addCollaborator`,{userId:collabID,collectionId:collId})
  console.log(res)
  toast.success("COllaborator Added succesfully")
setTriggerUpdate(p=>!p)
}
catch(e){
  console.log(e)
  toast.error("Error Adding Collaborator")
}


}



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
        <Modal title={"Add New File"} desc={"Browse or drag and drop the file here"}>
        <Button  className="bg-[#091e24] ml-6 dark:bg-[#22424a] text-gray-100 hover:cursor-pointer flex items-base py-0 ">
          <Plus className="h-4 w-4 mr-2 "  /> Add File
        </Button>
        
        <Input type={"file"} onChange={(e)=>{
          console.log(e)
          if(e.target.files[0].type !== 'application/pdf') {
            toast.error("Only PDFs are allowed")
            return
          }
          setFile(e.target.files[0])
        }}  accept="application/pdf"/>

        <Button className="btn-green"
        
        onClick={uploadFile}
        
        >Add</Button>

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
              <ContributorAvatar key={index} {...contributor} collectionId={collId}  setUpdateTrigger={setTriggerUpdate}/>
            ))}
            
           
            <div className='flex gap-2 justify-between items-center'>
              <select  className='w-64 outline-1 dark:outline-white rounded-lg p-1' value={collabID} onChange={(e)=>handleCollabIdChange(e)}>
                {allUsers.map((v,i)=>{
               
                  return <option className='dark:bg-gray-800' key={i} value={v.UserID} dark:bg-gray-800>{v.Name} </option>
                })}
              </select>

              <SendHorizonal onClick={handleAddCollab} />
            </div>

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

    

    <EditCollection isOpen={isUploadModalOpen} onClose={() => setIsUploadModalOpen(false)} Name={collData.Name} Description={collData.Description} isPublic={collData.isPublic} id={collData.CollectionID} setTriggerUpdate={setTriggerUpdate} /> 
      {/* <UploadModal isOpen={isUploadModalOpen} onClose={() => setIsUploadModalOpen(false)} className="dark:bg-gray-800" /> */}
    </div>
  )
  
}

//need list of collaborators and list of files (file id, name, createdBy, date)

export default IndividualCollection