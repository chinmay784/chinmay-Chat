import React, { useState } from 'react'
import { IoSendSharp } from "react-icons/io5";
import useSendMessage from '../../hooks/useSendMessage';

const MessageInput = () => {

  const [message,setMessage] = useState("");
  const {loading,sendMessage} = useSendMessage();

  console.log(message)

  
  const handelsubMit = async (e) =>{
    e.preventDefault();

    if(!message) return;

    await sendMessage(message);
    setMessage("");
  }


  return (
    <form className=' px-4 ' onSubmit={handelsubMit}>
      <div className=' w-full relative'>
         <input type=' text' className=' text-sm border rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white' placeholder=' send message' value={message} onChange={(e) => setMessage(e.target.value)} />

         <button type='submit' className=' absolute inset-y-0 end-0 flex items-center pe-3 '>
           {
            loading ? <div className=' loading loading-spinner'></div> :  <IoSendSharp />
           }
         </button>
      </div>
    </form>
  )
}

export default MessageInput