import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const useLogin = () => {
  const [loading,setLoading] = useState(false);
  const {setAuthUser} = useAuthContext();
  const navigate = useNavigate();

  const login = async (userName,password) =>{

    const succes = handleInputErrors(userName,password);

    if(!succes) return;


    setLoading(true)
    const toastId = toast.loading("Loading...")
    try {
        const res = await fetch("https://chinmay-chat-backend.vercel.app/api/auth" ,{
            method:"POST",
            headers :{ "Content-Type" : "application/json"},
            body : JSON.stringify({userName,password}),
        });

        const data = await res.json();
        console.log(data)

        if(data.error){
           throw new Error(data.error)

        }
        localStorage.setItem("chat-user",JSON.stringify(data));
        setAuthUser(data);

        toast.success("User Logged in")

        navigate("/");

    } catch (error) {
        toast.error(error.message)
    }finally{
        setLoading(false);
        toast.dismiss(toastId)
    }
  }

  return {loading,login}
}

export default useLogin



function handleInputErrors(userName,password){
    if( !userName || !password ){
        toast.error("Please fill in all fileds");
        return false;
    }


    return true;
   
    

    
}
