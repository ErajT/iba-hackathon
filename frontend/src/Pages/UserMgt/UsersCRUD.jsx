

import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Delete, DeleteIcon, Edit, PlusCircle, Trash, Trash2Icon, User2Icon } from 'lucide-react';
import axios from 'axios';
import Modal from '@/components/Modal';
import EditUserDialog from '@/components/EditUserDialog';
import DeleteUserDialog from '@/components/DeleteUserDialog';

function UsersCRUD() {
  const [tableData, setTableData] = useState([]);
  const [updateTrigger, setUpdateTrigger] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('http://localhost:2000/usersCrud/getAllUsers');
      setTableData(res.data.users);
      console.log(res.data.users);
    };

    fetchData();
  }, [updateTrigger]);

  return (
    <div className="px-6">
      <div className="flex items-center justify-center ">
        <User2Icon className="h-10 w-16" />
        <p className="text-3xl text-center font-bold my-8">User Management</p>
      </div>
      <Table className="border-2 dark:border-gray-50 border-[#023645]">
        <TableCaption className="font-semibold">A list of all the users.</TableCaption>
        <TableHeader>
          <TableRow className="font-extrabold border-1 dark:border-gray-50 border-[#023645]">
            <TableHead className="w-[100px]">User Id</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone No.</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Update</TableHead>
            <TableHead>Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableData.map((v, i) => (
            <TableRowWrapper
              key={i}
              id={v.UserID}
              name={v.Name}
              phone={v.PhoneNumber}
              email={v.Email}
              role={v.Role}
              onUpdate={setUpdateTrigger}
            />
          ))}
        </TableBody>
      </Table>

      <Modal>
        <PlusCircle className="absolute right-2 bottom-6 w-32 h-12 hover:cursor-pointer" />
        <EditUserDialog isUpdate={false} onUpdate={setUpdateTrigger} />
      </Modal>
    </div>
  );
}

const TableRowWrapper = ({ id, name, email, phone, role, onUpdate }) => {
  const [data, setData] = useState({
    id: id,
    name: name,
    email: email,
    phone: phone,
    role: role,
  });

  useEffect(() => {
    setData({
      id: id,
      name: name,
      email: email,
      phone: phone,
      role: role,
    });
  }, [id, name, email, phone, role]);

  return (
    <TableRow className="border-1 dark:border-gray-50 border-[#023645]">
      <TableCell className="font-medium ">{id}</TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>{email}</TableCell>
      <TableCell className="">{phone}</TableCell>
      <TableCell className="">{role}</TableCell>
      <TableCell className="">
        <Modal>
          <Edit className="text-green-600 hover:cursor-pointer" />
          <EditUserDialog
            id={data.id}
            name={data.name}
            email={data.email}
            phone={data.phone}
            role={data.role}
            onUpdate={onUpdate}
            isUpdate={true}
          />
        </Modal>
      </TableCell>
      <TableCell className="">
        <Modal>
          <Trash2Icon className="text-red-700 hover:cursor-pointer hover:dark:text-[#13758f]" />
          <DeleteUserDialog userId={id} onUpdate={onUpdate} />
        </Modal>
      </TableCell>
    </TableRow>
  );
};

export default UsersCRUD;