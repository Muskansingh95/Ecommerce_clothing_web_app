import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'

const Footer = () => {

  const [subscribe, setSubscribe] = useState('')
  return (
    <footer className="bg-black text-white p-6 md:p-12">
      <div className='flex flex-col md:flex-row gap-8'>
        {/* Logo */}
        <div className="md:w-1/4">
          <img src={logo} width="100" alt="Logo" />
        </div>
        {/* Resources */}
        <div className="md:w-1/4">
          <h1 className='font-bold text-xl mb-3'>Resources</h1>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/shop-all">All Products</Link></li>
            <li><Link to="/mens">Mens</Link></li>
            <li><Link to="/womens">Womens</Link></li>
            <li><Link to="/kids">Kids</Link></li>
            <li><Link to="/shop-all">Shop All</Link></li>
          </ul>
        </div>
        {/* Company */}
        <div className="md:w-1/4">
          <h1 className='font-bold text-xl mb-3'>Company</h1>
          <ul>
            <li><Link to="/about-us">About Us</Link></li>
            <li><Link to="/terms-and-conditions">Terms and Conditions</Link></li>
            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
          </ul>
        </div>
        {/* Team Support */}
        <div className="md:w-1/4">
          <h1 className='font-bold text-xl mb-3'>Team Support</h1>
          <ul>
            <li><Link to="/get-in-touch">Get in Touch</Link></li>
            <li><Link to="/track-your-order">Track Your Order</Link></li>
          </ul>
        </div>
        {/* Stay Update */}
        <div className="md:w-1/4">
          <h1 className='font-bold text-xl mb-3'>Stay Update</h1>
          <input
            type="email"
            placeholder='Your email'
            className='w-full md:w-60 py-2 text-black rounded p-2 m-1'
          />
          <button className='border-white border py-2 rounded m-1'>Subscribe</button>
          <div className='mt-5'>
            <h1 className='font-bold text-xl mb-3'>Let's Connect</h1>
            <div>
              <ul className='flex gap-8 text-2xl'>
                <li><i className="fa fa-instagram"></i></li>
                <li><i className="fa fa-facebook"></i></li>
                <li><i className="fa fa-twitter"></i></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer