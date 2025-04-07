import App from "./App";
import EcomContextProvider from './context/EcomContextProvider'
import React from 'react'

const All = () => {
  return (
    <EcomContextProvider>
        <App/>
    </EcomContextProvider>
  )
}

export default All