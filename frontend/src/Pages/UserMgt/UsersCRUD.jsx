import React, { useEffect, useState } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Delete, DeleteIcon, Edit, Trash, Trash2Icon } from 'lucide-react'
import axios from 'axios'
import Modal from '@/components/Modal'
import EditUserDialog from '@/components/EditUserDialog'
import DeleteUserDialog from '@/components/DeleteUserDialog'
  

function UsersCRUD() {

const [tableData,setTableData] = useState([])
const [updateTrigger,setUpdateTrigger] = useState(true)


useEffect(()=>{

    const fetchData = async () =>{
        const res = await axios.get("http://localhost:2000/usersCrud/getAllUsers")
        setTableData(res.data.users)
        console.log(res.data.users)
    }

    fetchData()

},[updateTrigger])



    return (
    <div className='px-6'> <p className='text-3xl text-center font-bold my-8'>Users CRUD</p>
        <Table className="border-1 dark:border-gray-50 border-[#0088ae] rounded-4xl">
  <TableCaption>A list of all the users.</TableCaption>
  <TableHeader >
    <TableRow className="font-extrabold border-1 dark:border-gray-50 border-[#0088ae]">
      <TableHead className="w-[100px] ">User Id</TableHead>
      <TableHead>Name</TableHead>
      <TableHead>Email</TableHead>
      <TableHead>Phone No.</TableHead>
      <TableHead>Role</TableHead>
      <TableHead>Update</TableHead>
      <TableHead >Delete</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {/* <TableRow>
      <TableCell className="font-medium">INV001</TableCell>
      <TableCell>Eraj Tanweer</TableCell>
      <TableCell>erajtanweer2@gmail.com</TableCell>
      <TableCell className="">0324943256</TableCell>
      <TableCell className="">Customer</TableCell>
      <TableCell className=""><Edit className='text-green-600 hover:cursor-pointer' /></TableCell>
      <TableCell className="text-right"><Trash2Icon className='text-red-700 hover:cursor-pointer' /></TableCell>
    </TableRow> */}

{tableData.map((v,i)=>{
    return <TableRowWrapper key={i} id={v.UserID} name={v.Name} phone={v.PhoneNumber} email={v.Email} onUpdate={setUpdateTrigger} />
})}

  </TableBody>
</Table>

    </div>
  )
}


const TableRowWrapper = ({id,name,email,phone,role,onUpdate})=>{
  console.log(onUpdate)
    return  <TableRow className="border-1 dark:border-gray-50 border-[#0088ae]">
    <TableCell className="font-medium ">{id}</TableCell>
    <TableCell>{name}</TableCell>
    <TableCell>{email}</TableCell>
    <TableCell className="">{phone}</TableCell>
    <TableCell className="">{role}</TableCell>
    <TableCell className="">
        
        <Modal>
        <Edit className='text-green-600 hover:cursor-pointer' />
<EditUserDialog id={id} name={name} email={email} phone={phone} role={role} onUpdate={onUpdate} />
        </Modal>


        </TableCell>
    <TableCell className="">
        <Modal>
        <Trash2Icon className='text-red-700 hover:cursor-pointer' />
   <DeleteUserDialog userId={id} />
        </Modal>
    </TableCell>
  </TableRow>
}


export default UsersCRUD