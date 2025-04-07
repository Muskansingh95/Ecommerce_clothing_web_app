import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ecomContext from '../context/context'
import { useParams } from 'react-router-dom'

const SinglePage = () => {


    const { addCart } = useContext(ecomContext)
    const { singleproducts } = useContext(ecomContext)
    
    const { productName } = useParams();
  
    var Old_price = localStorage.getItem('items oldprice')
    var New_price = localStorage.getItem('items price')
    var Image = localStorage.getItem('items image')
    var id = localStorage.getItem('items id')
    const { setCartCount } = useContext(ecomContext)

    const addit = (singleproducts) => {
        if(localStorage.getItem('auth-token')){

            console.log('added',singleproducts.id)
            addCart(singleproducts);
            setCartCount(data.length);
        }
        else{
            alert("Please login to add the product on cart")
        }
    }

    return (
        <>
            <div className='flex flex-col md:flex-row gap-10'>
                <div className="mt-12 ml-12">
                    <div className="text-sm mb-4">
                        <Link to="/" className='opacity-50 hover:opacity-100'>Home</Link><span>/</span><a href="">{productName}</a>
                    </div>
                </div>
                <div className='m-12 '>
                    <div className="flex flex-col md:flex-row items-center">
                        <div key={id}>
                            <img src={Image} alt="" className="w-full md:w-96" />
                        </div>
                        <div className='md:ml-12'>
                            <div className=''>
                                <p className='text-xl font-thin italic'>Online Shop</p>
                                <h1 className="text-5xl my-4 font-semibold" key={id}>{productName}</h1>
                                <div className="flex items-baseline">
                                    <p className='text-2xl my-5 mr-5 font-lighter' key={id}>₹ {New_price}</p> 
                                    <p className='text-2xl my-5 font-lighter line-through text-sm text-gray-400' key={id}>₹ {Old_price}</p>
                                    <span className='text-xs opacity-50'>(M.R.P)</span>
                                </div>
                                <div className="text-xs  opacity-50">
                                    (incl. of all taxes)
                                </div>
                                <div className='my-3'>
                                    <label>Choose your size:</label>
                                    <select className='ml-2 border-2 border-black rounded p-1'>
                                        <option>XS</option>
                                        <option>S</option>
                                        <option>M</option>
                                        <option>L</option>
                                        <option>LG</option>
                                    </select>
                                </div>
                                <div className="my-6 md:w-96 text-xs opacity-50">
                                    <p className='text-left '>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laboriosam fugiat blanditiis laborum reprehenderit.Deleniti.</p>
                                </div>
                                <hr className='w-full md:w-96 border-black my-10' />
                                <div className="my-6 gap-3">
                                    <button
                                        className='text-xl bg-black hover:bg-white text-white hover:text-black border-2 border-black md:px-32 px-10 py-3 rounded-full'
                                        onClick={() => addit(singleproducts)}>
                                        Add To Cart
                                    </button>
                                    
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        className='border-2 border-black py-2 sm:px-12 text-center rounded'
                                        placeholder='Add your pincode' /> <button className="px-5 py-2 border-black border-2 rounded">ADD</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default SinglePage