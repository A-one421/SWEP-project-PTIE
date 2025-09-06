"use client"
import React, { useEffect, useState } from 'react';

const Signup = () => {
    const[ email,setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [EmailError, setEmailError] = useState("")
    const [PasswordError , setPasswordError] = useState("")

    const isValid = email.includes("@") && password.trim() !== "" && password.length >=8 
   
useEffect(()=> {
  if (email && !email.includes("@"))
     setEmailError("please enter a valid Email")
    else setEmailError("")

    if (password && (password.length < 8 || password.trim() === ""))
      setPasswordError("Password must be 8 charactes")
    else setPasswordError("")
, [email, password]})// this is to update the error message as the user is typing

    const handleSubmit =(e :React.FormEvent<HTMLFormElement> )=> {
      e.preventDefault();
        if(!email || !email.includes("@") ){
            setEmailError("please enter a valid E-mail")
        }else{
          setEmailError("")
          //checking if the email has the "@"" tag
        }
        if(password.trim() != "" && password.length> 7){
          setPasswordError("")
        }else{
          setPasswordError("Set a stronger password")
        }
    }
  return (
    <div className='h-screen flex items-center justify-center  bg-blue-500'>
  <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8">
     <p className="text-center text-gray-200 mt-2">Sign in to your account</p>
        <form onSubmit={handleSubmit} className='mt-8 space-y-6'>
            <input type='text' 
            placeholder='E-mail'
            value={email}
            className='w-full px-4 py-3 bg-white/20 border border-transparent rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400'
            onChange={(e)=> setEmail(e.target.value)}/>
            <p className='text-red-500'>{EmailError}</p>
             <input type='password' 
            placeholder='Password'
            value={password}
            className='w-full px-4 py-3 bg-white/20 border border-transparent rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400'
            onChange={(e)=> setPassword(e.target.value)}/>
            <p className='text-red-500'>{PasswordError}</p>
               <button type='submit'
               disabled={!isValid}
               className={`px-4 py-2 rounded text-white ${isValid ? "w-full px-4 py-3 bg-white/20 border border-transparent rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400":"bg-gray-400 cursor-not-allowed" }`}>Sign-up</button>
        </form>
        </div>
    </div>
  );
}

export default Signup;
