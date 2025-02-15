import React, { useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { UserIcon } from 'lucide-react'
import axios from 'axios'
import { formatDate } from '../ViewOne/IndividualCollection'



function VIewPublic() {


useEffect(()=>{

  const fetch = async() =>{
    
    try{

      const res = await axios.get("http://localhost:2000/collection/getPublicCollections");

      console.log(res.data.publicCollections)

      setPublicCollections([...res.data.publicCollections])
    }
    catch(e){
      console.log(e)
    }
    

  }

  fetch()
},[])


    const [publicCollections, setPublicCollections] = useState([
        {
          CollectionID :  1, 
          CreatorName :  "Tazeen Amir", 
          Description :  "Basic concepts of Algebra", 
          HasCollaborators :  0 ,
          Name: "Algebra Basics",
          TimeCreated :  "2025-02-15T11:35:48.000Z"
            
        }
    ])



  return (

    <div className=''>
        <h1 className='text-center font-bold text-4xl mt-16'>Publicly Available Collections</h1>
    <div className='flex justify-center my-14 flex-wrap gap-4'>
       <AdminCard
          title="Blockchain Research"
          description="Manage user accounts, roles, and permissions"
          
          linkText="Manage Users"
          linkHref="/admin/users"
          num={0}
          /> 
       <AdminCard
          title="Network Security"
          description="Manage user accounts, roles, and permissions"
          
          linkText="Manage Users"
          linkHref="/admin/users"
          num={1}
          /> 
       <AdminCard
          title="Social Sciences Notes"
          description="Manage user accounts, roles, and permissions"
          
          linkText="Manage Users"
          linkHref="/admin/users"
          num={2}
          /> 

{
  publicCollections.map((v,i)=>{
    return  <AdminCard
    title= {v.Name}
    description={v.Description}
    creator={v.CreatorName}
    createdAt={v.TimeCreated}
    id={v.CollectionID  }
    linkText="Manage Users"
    linkHref="/admin/users"
    num={2}
    
    key={v.CollectionID}
    /> 
  })
}

          </div>
    </div>
  )
}

export default VIewPublic



const AdminCard = ({ title, description,  num, createdAt,creator }) => (
    <Card className={`flex flex-col sm:w-[100%] md:w-[30%] w-[80%] justify-between transition-all duration-${(300 * num)} ease-in-out hover:shadow-lg hover:-translate-y-1 p-4`}>
  <CardHeader className="text-center">
    <div className="flex items-center justify-between">
      <CardTitle className="text-xl font-semibold text-center m-auto">{title}</CardTitle>
    </div>
    
    {/* Tags Section */}
    <div className="flex flex-wrap justify-center gap-2 mt-2">
      
        <span className="px-3 py-1 text-xs font-semibold text-white bg-gray-800 rounded-full"         >
         Science
       </span>
        <span className="px-3 py-1 text-xs font-semibold text-white bg-gray-800 rounded-full"         >
        Technology
        
       </span>
        <span className="px-3 py-1 text-xs font-semibold text-white bg-gray-800 rounded-full"         >
        Research
       </span>
     
    </div>

    <CardDescription className="text-center mt-2">{description}</CardDescription>
  </CardHeader>

  <CardContent>
    {/* Contributor Info */}
    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-4 justify-between">

      <span className='flex items-center gap-1'>
        
     <UserIcon />
        <span>{creator}</span>
        </span>
      <span className="text-xs text-gray-500">{createdAt? formatDate(createdAt):""}</span>
    </div>

    <Button 
      asChild 
      className="w-full bg-[#003644] text-white hover:bg-[#002630] dark:bg-[#08242c] dark:hover:bg-[#061f26]"
    >
      <Link to={`/collection/${1}`}>View Collection</Link>
    </Button>
  </CardContent>
</Card>

  )