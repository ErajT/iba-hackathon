import { DialogTrigger } from '@radix-ui/react-dialog'
import axios from 'axios'
import React from 'react'
import toast from 'react-hot-toast';

function DeleteUserDialog({userId,onUpdate}) {

  const delUsers = async ()=>{
    
    try{
      const data = await axios.delete(`http://localhost:2000/usersCrud/deleteUser/${userId}`)
      onUpdate(p=>!p)
      toast.success("User delete successfully")
    }
    catch(e){
      console.log(e)
      toast.error("Error while deleting user")
    }
    
  }

  return (
    <div className=" text-gray-800 w-full h-full flex flex-col items-center dark:text-gray-100">
      <p className='mb-6 font-semibold text-xl'>Are you sure you want to delete this user</p>
      <div className='flex gap-8'>
         <DialogTrigger className='btn-green' onClick={delUsers}>
        Yes
          </DialogTrigger> 
       <DialogTrigger className='btn-white'>
        No
          </DialogTrigger> 
         
      </div>
    </div>
  )
}

export default DeleteUserDialog