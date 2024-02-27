import React, { useState } from 'react'
import {toast} from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';


const useLogout = () => {
  const [loading,setLoading] = useState(false);
  const {setAuthUser} =useAuthContext()
  const navigate = useNavigate();

  const logout = async () =>{
    setLoading(true)
    const toastId = toast.loading("Loading...")
    try {
        const res = await fetch("https://chinmay-chat-backend.vercel.app/api/auth/logout",{
            method:"POST",
            headers :{ "Content-Type" : "application/json"},
        })

        const data = await res.json();
        console.log(data)

        if(data.error){
            throw new Error(data.error)
        }

       

        localStorage.removeItem("chat-user");
        setAuthUser(null);
        toast.success("user logout SuccessFully")
        navigate("/login")

       

    } catch (error) {
        toast.error(error.message)
    }finally{
        setLoading(false)
        toast.dismiss(toastId)
    }
  }


  return {loading ,logout}
}

export default useLogout
