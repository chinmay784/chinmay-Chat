import React from 'react'
import useConverjation from '../../zustand/useConverjation'
import { useSocketContext } from '../../context/SocketContext';

const Conversation = ({lastIdx,emoji,conversation}) => {

  const {selectedConversation,setselectedConversation} = useConverjation();

  const isSelect = selectedConversation?._id === conversation._id;

  const {onlineUsers} = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id)

  return (
    <>
      <div className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer ${isSelect ? " bg-sky-500" : "" }`} onClick={ () => setselectedConversation(conversation)}>

      <div className={` avatar ${isOnline ? "online" : ""}`}>
         <div className=' w-12 rounded-full'>
            <img src={conversation.profilepic} alt='image' className='' />
         </div>
      </div>


      <div className=' flex flex-col flex-1'>
          <div className=' flex gap-3 justify-between'>
            <p className=' font-bold text-gray-200'>{conversation.fullName}</p>
            <span className=' text-xl'>{emoji}</span>
          </div>
      </div>

      </div>
 
      {!lastIdx && <div className=' divider my-0 py-0
      h1
      '></div>}
    </>
  )
}

export default Conversation