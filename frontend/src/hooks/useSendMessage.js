import React, { useState } from 'react'
import useConverjation from '../zustand/useConverjation'
import {toast} from "react-hot-toast"

const useSendMessage = () => {

    const [loading,setLoading] = useState(false)
    const {selectedConversation,messages,setMessages} = useConverjation();


    const sendMessage = async (message) =>{
        setLoading(true)
        try {
            const res = await fetch(`/send/${selectedConversation._id}`,{
                method:"POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body:JSON.stringify({message})
            }) 

            const data = await res.json();
            console.log(data)

            if(data.error){
                throw new Error(data.error)
            }

            setMessages([...messages,data]);

        } catch (error) {
            toast.error(error.message)
        }finally{
            setLoading(false)
        }
    }


    return {sendMessage,loading}
  
}

export default useSendMessage
