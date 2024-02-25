import React from 'react'
import { useAuthContext } from '../../context/AuthContext'
import useConverjation from '../../zustand/useConverjation'
import { extractTime } from '../../utils/extractTime'

const Message = ({message}) => {

  const {authUser} = useAuthContext()
  const {selectedConversation,messages,setMessages} = useConverjation();


  const fromMe = message.senderId === authUser._id;


  const chatClassName = fromMe ? "chat-end" : "chat-start";

  const profilePic = fromMe ? authUser.profilepic:selectedConversation?.profilepic;

  const bubleColor = fromMe ? "bg-blue-500" : ""

  const formatedDate= extractTime(message.createdAt);

  const shackClass =  message.shouldShake ? "shake" : ""


  return (
    <div className={` chat ${chatClassName}`}>
        <div className=' chat-image avatar'>
            <div className=' w-10 rounded-full'>
                <img src={profilePic} alt='' className='' />
            </div>
        </div>

        <div className={` chat-bubble text-white ${bubleColor} ${shackClass}pb-2`}>{message.message}</div>
        <div className={` chat-footer opacity-50 text-xs flex gap-1 items-center`}>{formatedDate}</div>
    </div>
  )
}

export default Message