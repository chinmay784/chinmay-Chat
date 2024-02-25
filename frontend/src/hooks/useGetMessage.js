import React, { useEffect, useState } from 'react'
import useConverjation from '../zustand/useConverjation';
import {toast} from "react-hot-toast"

const useGetMessage = () => {
  const [loading,setLoading] = useState(false);
  const {selectedConversation,messages,setMessages} = useConverjation();

  useEffect( () =>{
    const getMessage = async ()=>{
        setLoading(true)
        try {
            const res = await fetch(`/api/messages/${selectedConversation._id}`);

            const data = await res.json();
            console.log(data)

            if(data.error){
                throw new Error(data.error)
            }

            setMessages(data)
        } catch (error) {
            toast.error(error.message)
        }finally{
            setLoading(false)
        }
    }


    if(selectedConversation?._id) getMessage()
    


  },[selectedConversation?._id,setMessages])



  return {messages,loading}
}

export default useGetMessage