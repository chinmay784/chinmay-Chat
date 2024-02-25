import React, { useEffect } from 'react'
import { useSocketContext } from '../context/SocketContext'
import useConverjation from '../zustand/useConverjation'
import notiFication from "../assets/sounds/notification.mp3"

const useListenMessages = () => {
   const {socket}  = useSocketContext()

   const {messages,setMessages} = useConverjation();



   useEffect( () =>{
     socket?.on("newMessage",(newMessage) =>{
      newMessage.shouldShake = true;
      const sound = new Audio(notiFication);
      sound.play()
      setMessages([...messages,newMessage]);

     })

     return () => socket?.off("newMessage")
   },[socket,setMessages,messages])
}

export default useListenMessages