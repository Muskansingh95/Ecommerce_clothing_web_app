import React, { useState, useEffect } from 'react'
import ecomContext from './context'

const EcomContextProvider = ({ children }) => {
  const [items, setItems] = useState([])
  const [buyNow, setBuyNow] = useState([])
  const [allDetails, setAllDetails] = useState([])
  const [id, setId] = useState('')
  const [products, setProducts] = useState([])
  const [singleproducts, setSingleProducts] = useState([])
  const [cartcount, setCartCount] = useState(0)
  const [image1, setImage1] = useState('')
  const [title1, setTitle1] = useState('')
  const [price1, setPrice1] = useState('')
  const [id1, setId1] = useState('')


  useEffect(() => {
    fetch('http://localhost:8000/getallproduct')
      .then((res) => res.json())
      .then((data) => setProducts(data))
  }, [])


  const addCart = (items) => {
    setCartCount(items.length + 1)
    if (localStorage.getItem('auth-token')) {
      fetch('http://localhost:8000/addtocart', {
        method: 'POST',
        headers: {
          Accept: 'application/form-data',
          'auth-token': `${localStorage.getItem('auth-token')}`,
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ "item": items })
      })
        .then((res) => res.json()).then((data) => { console.log(data); setCartCount(data.cart.length + 1) })
    }

  }





  return (
    <ecomContext.Provider
      value={{
        setItems, items, id,
        setId,
        image1, title1, price1, id1, singleproducts, setSingleProducts,
        setImage1, setTitle1, setPrice1, setId1,
        addCart, cartcount, products, setCartCount
        , buyNow, setBuyNow,allDetails, setAllDetails
      }}>
      {children}
    </ecomContext.Provider>
  )
}

export default EcomContextProvider
