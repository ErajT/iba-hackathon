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
    const [dummy,setDummy] = useState(false)

const updateElements = ()=>{
  if(!children.length) return
  let arr = [...children];
  arr.splice(0,1);
  setUiElements(arr);
  // console.log(children)

}

    useEffect(()=>{
      updateElements()
    },[children])

  return (
<Dialog >
  <DialogTrigger className=' h-full'>{children[0]}</DialogTrigger>
  <DialogContent className='dark:bg-[#191923] dark:text-white bg-gray-100'>
    <DialogHeader>
      <DialogTitle className="text-gray-800 dark:text-gray-100">{title}</DialogTitle>
      <DialogDescription className="text-gray-800 dark:text-gray-100">
        {desc}
      </DialogDescription>
    </DialogHeader>
{uiElements}
  </DialogContent>
</Dialog>

  )
}

export default Modal