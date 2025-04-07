import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import ecomContext from '../context/context'

const Kids = () => {

  const { products } = useContext(ecomContext)
  const [next, setNext] = useState(0)
  const [next2, setNext2] = useState(next + 12)
  const [search, setSearch] = useState('')
  const [style, setStyle] = useState('')
  const [styleprev, setStyleprev] = useState('')
  const { setSingleProducts } = useContext(ecomContext)

  var count = products.filter((data)=> data.category === 'kids' || data.category === 'kid').length


  const SinglePage = (item) => {
    
    localStorage.setItem('items', item.name)
    localStorage.setItem('items price', item.new_price)
    localStorage.setItem('items oldprice', item.old_price)
    localStorage.setItem('items image', item.image)
    localStorage.setItem('items id', item.id)
    console.log(item)

    setSingleProducts(item)
  }

  useEffect(() => {
    if (next2 > count) {
      setStyle('none')
    } else {
      setStyle('')
    }
  }, [setStyle, next2, count])

  useEffect(() => {
    if (next === 0) {
      setStyleprev('none')
    } else {
      setStyleprev('')
    }
  }, [setStyle, next, count])

  const nextItem = () => {
    if (next2 < count) {
      setNext(next2)
      setNext2(next2 + 12)
    } else {
      alert("No more products... stocks are coming")
    }
  }

  const prevItem = () => {
    if (next > 0) {
      setNext(next - 12)
      setNext2(next2 - 12)
    }
  }

  return (
   <>
  <div className='flex flex-col sm:flex-row gap-4 sm:gap-10'>
    {/* Breadcrumbs */}
    <div className="m-4 sm:m-12">
      <div className="text-sm mb-4">
        <Link to="/" className='opacity-50 hover:opacity-100'>Home</Link><span>/</span>
        <a href="/" className="opacity-50 hover:opacity-100">All Products</a>
      </div>
    </div>

    {/* Products Section */}
    <div className="product m-4 sm:m-2 sm:mr-5 sm:w-full">
      <div>
        {/* Section Title */}
        <h1 className="text-2xl sm:text-4xl font-bold text-center sm:text-left">Kids Products</h1>

        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row items-center mt-4">
          <input
            type="text"
            className='border border-black rounded w-full sm:w-72 py-1.5 mb-4 sm:mb-0 sm:mr-2'
            placeholder="Search for products"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className='bg-black text-white w-full sm:w-auto p-2 rounded'>Search</button>
        </div>

        {/* Product Count */}
        <div className="text-md mt-4 text-center sm:text-left">{count} Products</div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 mt-5">
          {products.filter((item) => item.category === "kids" || item.category === "kid")
            .filter((product) => {
              if (search === '') {
                return product;
              } else if (product.name.toLowerCase().includes(search.toLowerCase())) {
                return product;
              }
            })
            .slice(next, next2)
            .map((product) => (
              <div key={product.id} className='border h-fit border-gray-200 rounded-lg text-left shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out'>
                <Link to={`/${product.name}`} key={product.id}>
                  <div className='overflow-hidden h-48'>
                    <img
                      src={product.image}
                      onClick={() => SinglePage(product)}
                      alt="image"
                      className='w-full h-full object-cover transition-transform duration-500 hover:scale-110'
                    />
                  </div>
                  <div className="p-4">
                    <div className="font-bold text-lg truncate">{product.name}</div>
                    <div className="mt-1 text-lg text-green-600 font-semibold">₹ {product.new_price}</div>
                  </div>
                </Link>
              </div>
            ))}
        </div>

        {/* Pagination Buttons */}
        <div className="flex justify-center text-3xl mt-10 sm:mt-20 space-x-4">
          <button onClick={prevItem} style={{ display: styleprev }} className="hover:text-gray-600">{'<'}</button>
          <button onClick={nextItem} style={{ display: style }} className="hover:text-gray-600">{'>'}</button>
        </div>
      </div>
    </div>
  </div>
</>

  )
}

export default Kids
