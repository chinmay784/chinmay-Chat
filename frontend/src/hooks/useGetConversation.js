import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const useGetConversation = () => {
  const [loading,setLoading] = useState(false)
  const [conversation,setConversation] = useState([]);

  useEffect(() =>{
    const getConversation = async () =>{
        setLoading(true)
        try {
            const res = await fetch("https://chinmay-chat-backend.vercel.app/api/users");
            const data = await res.json();
            // console.log(data)

            if(data.error){
                throw new Error(data.error)
                console.log(data.error)
            }

            setConversation(data);
        } catch (error) {
            toast.error(error.message)
        }finally{
            setLoading(false)
        }
    }

    getConversation();
  },[]);

  return {loading,conversation}
}

export default useGetConversation
