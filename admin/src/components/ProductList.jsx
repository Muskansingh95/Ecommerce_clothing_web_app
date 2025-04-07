import React, { useEffect, useState } from 'react'
import axios from 'axios'
const ProductList = () => {
    const [allproducts, setAllproducts] = useState([]) // Initialize as an empty array
  
    const fetchInfo = async () => {
        try {
            const res = await axios.get('http://localhost:8000/getallproduct');
            setAllproducts(res.data);  // Axios stores the response data in res.data
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    }

    const removeItem = async (id) =>{
        await fetch('http://localhost:8000/removeproduct',{
            method: 'POST',
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({id:id})
        })
        await fetchInfo()
    }

    useEffect(() => {
        fetchInfo();
    }, [])

    return (
       <div className='w-full'>
      <h1 className="text-3xl font-bold mb-4">Product List</h1>
      <div className="overflow-x-auto"> {/* Allow horizontal scrolling on small screens */}
        <table className="min-w-full bg-white text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b text-left">Product</th>
              <th className="py-2 px-4 border-b text-left">Name</th>
              <th className="py-2 px-4 border-b text-left">Old Price</th>
              <th className="py-2 px-4 border-b text-left">New Price</th>
              <th className="py-2 px-4 border-b text-left">Category</th>
              <th className="py-2 px-4 border-b text-left">Remove</th>
            </tr>
          </thead>
          <tbody>
            {allproducts.length > 0 ? (
              allproducts.map((product, index) => (
                <tr key={index} className='hover:bg-gray-50'>
                  <td className="py-2 px-4 border-b w-24 md:w-32">
                    <img src={product.image} alt={product.name} className="object-cover w-full h-20 rounded" />
                  </td>
                  <td className="py-2 px-4 border-b truncate">{product.name}</td>
                  <td className="py-2 px-4 border-b">₹ {product.old_price}</td>
                  <td className="py-2 px-4 border-b">₹ {product.new_price}</td>
                  <td className="py-2 px-4 border-b">{product.category}</td>
                  <td className="py-2 px-4 border-b">
                    <button onClick={() => removeItem(product.id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 transition duration-300">
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">No Products Available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    )
}

export default ProductList
