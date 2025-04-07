import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import ecomContext from '../context/context'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    logIn()
    console.log('Logging in:', { email, password })
  }
  const logIn = async() =>{
    let responseData;
    await fetch('http://localhost:8000/login',{
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({ email, password })
    }).then((res)=> res.json()).then((data)=> responseData = data)
    if(responseData.success){
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace('/');
      setIsLogIn(true)
    }
    else{
      alert(responseData.error)
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-4xl font-bold mb-4">Login</h1>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input 
              type="email" 
              className="border border-gray-300 rounded py-2 px-4 w-full" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700">Password</label>
            <input 
              type="password" 
              className="border border-gray-300 rounded py-2 px-4 w-full" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button 
            type="submit" 
            className="bg-black text-white w-full py-2 rounded hover:bg-gray-800 transition-all"
          >
            Login
          </button>
        </form>
        <div className="text-sm text-center mt-4">
          Don't have an account? <Link to="/signup" className="text-blue-500 hover:underline">Signup</Link>
        </div>
      </div>
    </div>
  )
}

export default Login
