import { useState } from 'react'
import Header from './components/Header'
import './App.css'
import Shopall from './components/Shopall'
import Home from './components/Home'
import Mens from './components/Mens'
import Womens from './components/Womens'
import Kids from './components/Kids'
import GetInTouch from './components/GetInTouch'
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from 'react-router-dom'
import Aboutus from './components/Aboutus'
import Footer from './components/Footer'
import AddtoCart from './components/AddtoCart'
import SinglePage from './components/SinglePage'
import PayMentGateWay from './components/PayMentGateWay'
import TermsNCondition from './components/TermsNCondition'
import Login from './components/LogIn'
import Signup from './components/SignUp'

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/' element={<><Header/><Home/><Footer/></>} />
        <Route path='/signup' element={<><Header/><Signup/><Footer/></>} />
        <Route path='/login' element={<><Header/><Login/><Footer/></>} />
        <Route path='/mens' element={<><Header/><Mens/><Footer/></>} />
        <Route path='/shop-all' element={<><Header/><Shopall/><Footer/></>} />
        <Route path='/womens' element={<><Header/><Womens/><Footer/></>} />
        <Route path='/kids' element={<><Header/><Kids/><Footer/></>} />
        <Route path='/get-in-touch' element={<><Header/><GetInTouch/><Footer/></>} />
        <Route path='/about-us' element={<><Header/><Aboutus/><Footer/></>} />
        <Route path='/add-to-cart' element={<><Header/><AddtoCart/><Footer/></>} />
        <Route path='/:productName' element={<><Header/><SinglePage/><Footer/></>} />
        <Route path='/single-product/payment-gateway/' element={<><Header/><PayMentGateWay/><Footer/></>} />
        <Route path='/terms-and-conditions' element={<><Header/><TermsNCondition/><Footer/></>} />
      </>
    )
  );

  return (
    <>
      <RouterProvider router={router}/>
   
    
    </>
  )
}

export default App
