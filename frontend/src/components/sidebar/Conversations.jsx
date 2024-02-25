import React from 'react'
import Conversation from './Conversation'
import useGetConversation from '../../hooks/useGetConversation'
import { getRandomEmoji } from '../../utils/emojis';

const Conversations = () => {


  const {loading,conversation} = useGetConversation();
  console.log(conversation)
  
 
  return (
    <div  className=' py-6 flex flex-col gap-2 overflow-auto'>
      {
        conversation.map((conver,idx) =>{
          return (
            <Conversation key={conver._id} conversation={conver} emoji= {getRandomEmoji()}
              lastIdx={idx === conversation.length -1}
            />
          )
        })
      }

      {loading ? <span className=' loading loading-spinner'></span> :null}
    </div>
  )
}

export default Conversations