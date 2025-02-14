import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "./ui/dialog"

  

function Modal({title,desc,children}) {

    const [uiElements,setUiElements] = useState()

    useEffect(()=>{
        if(!children.length) return
        let arr = [...children];
        arr.splice(0,1);
        setUiElements(arr);
    },[])

  return (
<Dialog >
  <DialogTrigger className=' h-full'>{children[0]}</DialogTrigger>
  <DialogContent className='dark:bg-[#191923] dark:text-white bg-gray-100'>
    <DialogHeader>
      <DialogTitle>{title}</DialogTitle>
      <DialogDescription>
        {desc}
      </DialogDescription>
    </DialogHeader>
{uiElements}
  </DialogContent>
</Dialog>

  )
}

export default Modal