import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { UserIcon } from 'lucide-react'
function VIewPublic() {

    const [publicCollections, setPublicCollections] = useState([
        {
            id:"01",
            title:"Blockchain Research",
            description:"Manage user accounts, roles, and permissions",
            tags:[],
            owner:"John Doe",
            date:"24-06-2023",
            linkText:"Manage Users",    
            
        }
    ])



  return (

    <div className=''>
        <h1 className='text-center font-bold text-4xl mt-16'>View Public Collection</h1>
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
          </div>
    </div>
  )
}

export default VIewPublic



const AdminCard = ({ title, description,  num }) => (
    <Card className={`flex flex-col justify-between transition-all duration-${(300 * num)} ease-in-out hover:shadow-lg hover:-translate-y-1 p-4`}>
  <CardHeader className="text-center">
    <div className="flex items-center justify-between">
      <CardTitle className="text-lg font-semibold text-center m-auto">{title}</CardTitle>
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
        <span>Hashir Jamal</span>
        </span>
      <span className="text-xs text-gray-500">24-05-2024</span>
    </div>

    <Button 
      asChild 
      className="w-full bg-[#003644] text-white hover:bg-[#002630] dark:bg-[#08242c] dark:hover:bg-[#061f26]"
    >
      <Link to={`/collection/:${1}`}>View Collection</Link>
    </Button>
  </CardContent>
</Card>

  )