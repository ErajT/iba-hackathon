import React, { useEffect,useState } from 'react'
import "./components.css"
import axios from 'axios'
import { DialogTrigger } from '@radix-ui/react-dialog'


function EditUserDialog({id,name,email,phone,role,onUpdate}) {

  const [formData,setFormData] = useState({
    "UserID": id || null,
    "Email":email || null,
    "Name": name || null,
    "PhoneNumber" : phone || null
  }
  
  )

  const handleChange = (key,value) =>{

    setFormData(p=>{

      let obj = {...formData}
      obj[`${key}`] = value;
      
      return obj

    })

  }


  const submitUpdate = async () =>{

    try{

      const res = await axios.put("http://localhost:2000/usersCrud/updateUser",formData)
      console.log(onUpdate)
      onUpdate(p=>!p)
    }
    catch(e){
      console.log(e)
    }
    }

  // useEffect(()=>{
  //   console.log({id,name,email,phone,role})

  // },[])

  return (
    <div className='flex flex-col p-4 gap-2 mt-1 overflow-y-auto h-[90%] text-gray-700'>
      <p className='text-3xl text-center font-bold'>Edit User Info</p>


        <label htmlFor="UserID">UserID</label>
        <input readOnly type="text" id='UserID' className='modalInp'  value={formData.UserID}/>
        
        <label htmlFor="Name">Name</label>
        <input onChange={(e)=>handleChange("Name",e.target.value)} name="" id="Name" className='modalInp' value={formData.Name}/>

        <label htmlFor="Email">Email</label>
        <input onChange={(e)=>handleChange("Email",e.target.value)} type="email" name="" id="Email" min={0}  className='modalInp' value={formData.Email}/>
        
        
        <label htmlFor="PhoneNumber">Phone Number</label>
        <input onChange={(e)=>handleChange("PhoneNumber",e.target.value)} type="text" id='PhoneNumber' className='modalInp' value={formData.PhoneNumber} />
        
        


        <button className='btn-green w-[85%] mt-4' onClick={submitUpdate}>Edit User</button>

    </div>
  )
}

export default EditUserDialog