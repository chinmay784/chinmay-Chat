import React, { useEffect, useRef } from 'react'
import Message from './Message'
import useGetMessage from '../../hooks/useGetMessage'
import MessageSkeletone from '../../skeletone/MessageSkeletone';
import useListenMessages from '../../hooks/useListenMessages';

const Messages = () => {


  const {messages,loading} = useGetMessage();
  console.log(messages);
  const lastMessageRef = useRef()

  useListenMessages()


  useEffect( () =>{
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({behavior: "smooth"})
    },100)
  },[messages])
  


  return (
    <div className=' px-4 flex-1 overflow-auto'>

      {!loading && messages.length > 0 && messages.map((message) =>(
        <div  key={message._id} ref={lastMessageRef} >
        <Message message={message} />
        </div>
      )) }


     {loading && [...Array(3)].map((_,idx) => <MessageSkeletone/>)}
     { !loading && messages.length === 0 && (
      <p className=' text-center'>Send a message to start the Conversation</p>
     )}
    </div>
  )
}

export default Messages