import { DialogTrigger } from '@radix-ui/react-dialog'
import axios from 'axios'
import React from 'react'

function DeleteUserDialog({userId}) {

  const delUsers = async ()=>{
    
    try{
      const data = await axios.delete(`http://localhost:2000/usersCrud/deleteUser/${userId}`)

    }
    catch(e){
      console.log(e)
    }
    
  }

  return (
    <div className=" text-gray-800 w-full h-full flex flex-col items-center dark:text-gray-100">
      <p className='mb-6 font-semibold text-xl'>Are you sure you want to delete this user</p>
      <div className='flex gap-8'>
        <button  > <DialogTrigger>
        Yes
          </DialogTrigger> </button>
        <button > <DialogTrigger>
        No
          </DialogTrigger> 
           </button>
      </div>
    </div>
  )
}

export default DeleteUserDialog