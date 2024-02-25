import React, { useState } from 'react'
import GenderCheckBox from './GenderCheckBox'
import { Link } from 'react-router-dom'
import useSignup from '../../hooks/useSignup';

const Signup = () => {


  const [input, setInput] = useState({
    fullName : "",
    userName : "",
    password : "",
    confrimpassword : "",
    gender : "",
  });

  const {loading,signup} = useSignup()

  const checkboxChange = (gender) =>{
    setInput({...input,gender})
  }


  const handleSubmit = async (e) =>{
    e.preventDefault();
    await signup(input)
  }


  return (
    <div className=' flex flex-col justify-center items-center min-w-96 mx-auto bg-gray-800 text-white rounded-md'>

      <div className=' w-full p-6 rounded-lg shadow-lg bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 mb-3'>
       
       <h1 className=' text-3xl font-semibold text-center text-gray-300'>
        Sign Up
        <span className=' text-blue-500'>ChatApp</span>
       </h1>



      <form onSubmit={handleSubmit}>

        <div className=' mt-4'>
          <label className=' label p-2'>
            <span className=' text-base label-text'>Full Name</span>
          </label>

          <input type=' text' placeholder='Enter fullname' className=' w-full input input-bordered h-10 rounded-md bg-slate-900 p-4' value={input.fullName}
           onChange={ (e) =>setInput({...input,fullName:e.target.value})}
          />
        </div>

        <div className=' mt-4'>
          <label className=' label p-2'>
            <span className=' text-base label-text'>User Name</span>
          </label>

          <input type=' text' placeholder='Enter username' className=' w-full input input-bordered h-10 rounded-md bg-slate-900 p-4' value={input.userName} 
            onChange={(e) =>setInput({...input,userName:e.target.value})}
          />
        </div>


        <div className=' mt-4'>
          <label className=' label p-2'>
            <span className=' text-base label-text'>Password</span>
          </label>

          <input type='password' placeholder='Enter password' className=' w-full input input-bordered h-10 rounded-md bg-slate-900 p-4' value={input.password}
           onChange={(e) => setInput({...input,password:e.target.value})}
           />
        </div>

        <div className=' mt-4'>
          <label className=' label p-2'>
            <span className=' text-base label-text'>Confrim Password</span>
          </label>

          <input type='password' placeholder='Enter confrimpassword' className=' w-full input input-bordered h-10 rounded-md bg-slate-900 p-4' value={input.confrimpassword}
          onChange={(e) =>setInput({...input,confrimpassword:e.target.value})}
          />
        </div>



        <GenderCheckBox onCheckboxChange = {checkboxChange} selectedGender={input.gender} />


        <Link to="/login" className=' text-sm hover:underline hover: text-blue-600 mt-4 inline-block'>Already have an account?</Link>



        <div className=' text-center bg-black p-1 rounded-lg'>
          <button className=' btn btn-block btn-sm mt-2  text-white text-center' disabled={loading}>
            { loading ? <span className=' loading loading-spinner'></span> : "Sign Up"}
          </button>
        </div>


        


      </form>

      </div>

    </div>
  )
}

export default Signup