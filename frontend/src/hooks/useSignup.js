import  { useState } from 'react'
import {toast} from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const useSignup = () => {
   const [loading,setLoading] = useState(false);
   
   const navigate = useNavigate();

   const {setAuthUser} = useAuthContext()

   const signup = async({fullName,userName,password,confrimpassword,gender}) =>{
     const succes = handleInputErrors({fullName,userName,password,confrimpassword,gender});

     if(!succes) return;
     
     setLoading(true);
     const toastId = toast.loading("Loading...")
     try {  
        const res = await fetch("/api/auth/signup",{
            method:"POST",
            headers :{ "Content-Type": "application/json"},
            body : JSON.stringify({fullName,userName,password,confrimpassword,gender}),
        })
        
        const data = await res.json();
        console.log(data);

        if(data.error){
            throw new Error(data.error)
        }

        // localStorage.setItem("chat-user",JSON.stringify(data));

        // setAuthUser(data)

        toast.success("User Registred")
        navigate("/login")
        console.log(data);
     } catch (error) {
        toast.error(error.message)
     }finally{
        setLoading(false)
        toast.dismiss(toastId)
     }
   }

   return {loading ,signup};

}

export default useSignup


function handleInputErrors({fullName,userName,password,confrimpassword,gender}){
    if(!fullName || !userName || !password || !confrimpassword || !gender){
        toast.error("Please fill in all fileds");
        return false;
    }

    if( password !== confrimpassword){
        toast.error("password do not match");
        return false;
    }

    if(password.length < 6){
        toast.error("password at least 6 characters");
        return false;
    }

    return true;
}
