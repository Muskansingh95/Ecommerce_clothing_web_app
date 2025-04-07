import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import ecomContext from '../context/context'


const AddtoCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const { setAllDetails, setBuyNow} = useContext(ecomContext);
  
  useEffect(() => {
    if (localStorage.getItem('auth-token')){
        fetch('http://localhost:8000/getcart',{
          method: 'POST',
          headers:{
            Accept: 'application/form-data',
            'auth-token': `${localStorage.getItem('auth-token')}`,
            'Content-type': 'application/json',
          },
          body: ''
        })
        .then((res)=> res.json()).then((data)=> { console.log(data); setCartItems(data);})
      }
  }, [])

  const removeFromCart = (item) =>{
    
    if (localStorage.getItem('auth-token')){
        fetch('http://localhost:8000/removefromcart',{
          method: 'POST',
          headers:{
            Accept: 'application/form-data',
            'auth-token': `${localStorage.getItem('auth-token')}`,
            'Content-type': 'application/json',
          },
          body: JSON.stringify({ item})
        })
        .then((res)=> res.json()).then((data)=> { console.log(data)})
      }
    window.location.reload()
  }
  const Buy = () =>{
    setBuyNow(cartItems.reduce((total, item) => total + item.new_price, 0))
    setAllDetails(cartItems)
  }



  return (
    <>
    <div className="m-12">
        <div className="text-sm mb-4">
            <Link to="/" className='opacity-50 hover:opacity-100'>Home</Link><span>/</span><a href="">Add-to-Cart</a>
        </div>
    </div>
    <div className="m-10 ">
        <h1 className="text-6xl text-center mb-12">Add to Cart</h1>

        {cartItems.length === 0
            ?
            <div className="text-center my-32 text-2xl">
                No Product in Cart
            </div>
            :
            cartItems.map((items,key) => (
                <div className='w-full sm:w-10/12 m-auto' key={key}>
                    <div className="flex flex-col sm:flex-row gap-4 border-b border-black p-5 items-center justify-center">

                        <div className="mb-4 sm:mb-0 w-full sm:w-48 max-w-xs">
                            <img src={items.image} alt="" className="h-auto w-full" />
                        </div>
                        <div className="flex flex-col justify-center">
                            <h1 className='text-xs font-bold mb-1 text-center sm:text-left'>Brand Name</h1>
                            <p className='text-md opacity-50 font-light mb-2 text-center sm:text-left'>{items.name}</p>
                            <div className="flex mb-1 justify-center sm:justify-start">
                                <h1 className='text-md font-bold text-green-800'>₹ {items.new_price}</h1>
                                <h1 className="ml-3 line-through text-red-700 opacity-50">₹ {items.old_price}</h1>
                            </div>
                            <p className='font-light text-sm mb-5 text-center sm:text-left text-green-700'>return policy is available</p>
                            <div className='border-black border w-fit mb-5 items-center flex gap-3 rounded-md mx-auto sm:mx-0'>
                                <input type="number" placeholder='Quantity' min={1} className='w-28 px-1 py-1 border-1 border-black rounded' />
                            </div>
                        </div>
                        <div className="flex flex-col justify-center items-center sm:items-start">
                            <div className='grid gap-3'>
                                <button className='w-full sm:w-52 bg-white border-red-700 border text-red-700 py-3 font-bold rounded hover:text-white hover:bg-red-700' onClick={() => removeFromCart(items)}>Remove</button>
                            </div>
                        </div>
                    </div>
                </div>
            ))
        }
    </div>
    <div className="container mx-auto my-10 p-5 bg-white shadow-lg rounded-lg">
    <h1 className="text-3xl font-bold mb-5">Shopping Cart</h1>

    <table className="table-auto w-full text-left border-collapse">
        <thead>
            <tr className="bg-gray-200">
                <th className="px-4 py-2 text-gray-600 font-semibold">Product Name</th>
                <th className="px-4 py-2 text-gray-600 font-semibold">Product Price</th>
            </tr>
        </thead>
        <tbody>
            {cartItems.map((data, index) => (
                <tr key={index} className="border-b">
                    <td className="px-4 py-2">{data.name}</td>
                    <td className="px-4 py-2">₹ {data.new_price}</td>
                </tr>
            ))}
        </tbody>
    </table>

    {/* Total Price Section */}
    <div className="flex justify-between items-center mt-5">
        <div className="text-2xl font-semibold">Total: ₹ {cartItems.reduce((total, item) => total + item.new_price, 0)}</div>
        <Link to='/single-product/payment-gateway'>
        <button 
        className="bg-black hover:bg-orange-600 text-white px-6 py-2 rounded hover:bg-blue-600 transition-all"
        onClick={Buy}
        >
            Buy Now
        </button></Link>
    </div>
</div>

</>


  )
}

export default AddtoCart
