import React, { useEffect,useState } from 'react'
import "./components.css"
import axios from 'axios'
import { DialogTrigger } from '@radix-ui/react-dialog'
import toast from 'react-hot-toast';



function EditUserDialog({id,name,email,phone,role,onUpdate,isUpdate}) {

  const [formData,setFormData] = useState({
    "UserID": id || "",
    "Email":email || "",
    "Name": name || "",
    "PhoneNumber" : phone || ""
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

      let apiUrl="";
let body;
let res;
      if(isUpdate){
        apiUrl = "http://localhost:2000/usersCrud/updateUser"
        body = {...formData}
        console.log("updating")
        res = await axios.put(apiUrl,body)
        toast.success("User Added successfully")
      }
      else{
        apiUrl = "http://localhost:2000/usersCrud/createUser"
        let {Email,Name,PhoneNumber} = formData;
        body = {Email,Name,PhoneNumber}
        console.log("creating",body)
        res = await axios.post(apiUrl,body)
        toast.success("User Added successfully")
      }

      console.log(onUpdate)
      onUpdate(p=>!p)
    }
    catch(e){
      console.log(e)
      toast.error("An error occured.")
    }
    }

  // useEffect(()=>{
  //   console.log({id,name,email,phone,role})

  // },[])

  return (
    <div className='flex flex-col p-4 gap-2 mt-1 overflow-y-auto h-[90%] text-gray-700 dark:text-gray-100'>
      
      <p className='text-3xl text-center font-bold'>Edit User Info</p>


        <label htmlFor="UserID">UserID</label>
        <input readOnly type="text" id='UserID' className='modalInp'  value={isUpdate?formData.UserID:"[Auto Generated]"}/>
        
        <label htmlFor="Name">Name</label>
        <input onChange={(e)=>handleChange("Name",e.target.value)} name="" id="Name" className='modalInp' value={formData.Name}/>

        <label htmlFor="Email">Email</label>
        <input onChange={(e)=>handleChange("Email",e.target.value)} type="email" name="" id="Email" min={0}  className='modalInp' value={formData.Email}/>
        
        
        <label htmlFor="PhoneNumber">Phone Number</label>
        <input onChange={(e)=>handleChange("PhoneNumber",e.target.value)} type="text" id='PhoneNumber' className='modalInp' value={formData.PhoneNumber} />
        
        


          <DialogTrigger className='btn-green w-[85%] mt-4' onClick={submitUpdate}>
        {/* <button className='btn-green w-[85%] mt-4' onClick={submitUpdate}> */}

          {isUpdate? "Edit User" :"Create User"}


        {/* </button> */}
          </DialogTrigger>

    </div>
  )
}

export default EditUserDialog