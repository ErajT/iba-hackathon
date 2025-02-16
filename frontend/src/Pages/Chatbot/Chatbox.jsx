import React, { useState } from 'react'
import { CrossIcon, Send, Smile, XIcon } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import toast from 'react-hot-toast'

export function ChatBox({setIsOpen}) {

  const [isLoading,setIsLoading] = useState(false)
  const [messages,setMessages] = useState( [
    {     sender:"user" , content :"Hello"   },
    {     sender:"system" , content :"Hi"   },
  
  ] )

  const {id} = useParams()

  const [inpContent,setInpContent] = useState("")

  const sendMessage = async (e,fromInp) =>{

    if(fromInp ){
      if(e.key!="Enter"){
        return
      }
    }

    setMessages(p=>{
      return [...p, {sender:"user",content:inpContent}]
    })
    setInpContent("")



    // replace this with api call

    try{
      setIsLoading(true)
      const res = await axios.post(`http://localhost:2000/flashcard/talkToPdf`,{
        "materialId": id,
        "userInput": inpContent
      })
      console.log(res.data)
      setMessages(p=>{
        return [...p, {sender:"system",content:res.data.answer}]
      })
      setIsLoading(false)
    }
    catch(e){
toast.error("LLM Server down :(")
    }
   
  }



  return (
    <Card className="w-[400px] h-[600px] flex flex-col m-auto shadow-xl transition-all duration-300 ease-in-out bg-gray-200 dark:bg-[#101c1f]">
      {/* Header */}
      <CardHeader className="border-b bg-white dark:bg-[#101c1f] transition-colors duration-300 flex justify-between flex-row items-center">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 animate-pulse" />
            <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white" />
          </div>
          <div>
            <h2 className="font-semibold">Support Chat</h2>
            <p className="text-sm text-muted-foreground">Online</p>
          </div>
        </div>
          <XIcon className='hover:cursor-pointer' onClick={()=>setIsOpen(p=>!p)} />
      </CardHeader>

      {/* Chat Area */}
      <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Welcome Message */}
        <div className="flex flex-col space-y-2">
          <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg rounded-tl-none max-w-[80%] transform transition-all duration-300 ease-in-out hover:-translate-y-1">
            <p className="text-sm">👋 Hi there!</p>
          </div>
          <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg rounded-tl-none max-w-[80%] transform transition-all duration-300 ease-in-out hover:-translate-y-1">
            <p className="text-sm">How can we help you today?</p>
          </div>
        </div>

        {/* User Message Example */}
        <div className="flex flex-col items-end space-y-2">
          <div className="bg-[#003644] dark:bg-[#08242c] text-white p-3 rounded-lg rounded-tr-none max-w-[80%] transform transition-all duration-300 ease-in-out hover:-translate-y-1">
            <p className="text-sm">I need help with my account</p>
          </div>
        </div>
{messages.map((v,i)=>{
  if(v.sender =="user") return <UserMsg msg={v.content} key={i} /> 
  else if(v.sender=="system") return <SystemMsg msg={v.content} key={i} />
})}

{isLoading&&<p>Preparing Response...</p>}
      </CardContent>

      {/* Input Area */}
      <div className="p-4 border-t bg-white dark:bg-[#101c1f] transition-colors duration-300">
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="icon"
            className="transition-transform duration-300 hover:scale-110"
          >
            <Smile className="h-5 w-5 text-[#003644] dark:text-gray-300" />
          </Button>
          <Input 
            placeholder="Type your message..." 
            className="flex-1 transition-all duration-300 focus:ring-2 focus:ring-blue-500"
            value={inpContent} onChange={(e)=>setInpContent(e.target.value)} onKeyDown={(e)=>sendMessage(e,true)}
          />
          <Button 
            className="bg-[#003644] dark:bg-[#08242c] text-white transition-all duration-300 hover:scale-105" onClick={sendMessage}

>
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </Card>
  )
}


const UserMsg = ({msg}) =>{
  return   <div className="flex flex-col items-end space-y-2">
  <div className="bg-[#003644] dark:bg-[#08242c] text-white p-3 rounded-lg rounded-tr-none max-w-[80%] transform transition-all duration-300 ease-in-out hover:-translate-y-1">
    <p className="text-sm">{msg}</p>
  </div>
</div>
}

const SystemMsg = ({msg}) =>{
  return  <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg rounded-tl-none max-w-[80%] transform transition-all duration-300 ease-in-out hover:-translate-y-1">
  <p className="text-sm">👋{msg}</p>
</div>
}