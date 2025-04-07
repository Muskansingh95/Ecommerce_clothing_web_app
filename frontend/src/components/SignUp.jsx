import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Signup = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  

  const handleSignup = (e) => {
    e.preventDefault()
    sign_up()

    console.log('Signing up:', { name, email, password })
    setName('')
    setEmail('')
    setPassword('')
  }

  const sign_up = async() =>{
    let responseData;
    await fetch('http://localhost:8000/signup',{
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({ name, email, password })
    }).then((res)=> res.json()).then((data)=> responseData = data)
    if(responseData.success){
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace('/');
    }
    else{
      alert(responseData.error)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-4xl font-bold mb-6 text-center">Signup</h1>
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Name</label>
            <input 
              type="text" 
              className="border border-gray-300 rounded py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-black" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input 
              type="email" 
              className="border border-gray-300 rounded py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-black" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Password</label>
            <input 
              type="password" 
              className="border border-gray-300 rounded py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-black" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              placeholder="Enter your password"
            />
          </div>
          
          <button 
            type="submit" 
            className="bg-black text-white w-full py-2 rounded hover:bg-gray-800 transition-all"
          >
            Signup
          </button>
        </form>
        <div className="text-sm text-center mt-4">
          Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
        </div>
      </div>
    </div>
  )
}

export default Signup
