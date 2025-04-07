import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import ProductList from './components/ProductList'
import OrderList from './components/OrderList'
import AddProduct from './components/AddProduct'

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
   <Router>
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className={`fixed md:static top-0 left-0 h-full w-64 bg-gray-800 transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className={`flex-1 p-8 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'} md:ml-64`}>
          <button onClick={toggleSidebar} className="md:hidden text-white">
            {isSidebarOpen ? 'Close Menu' : 'Open Menu'}
          </button>
          {/* <Navbar toggleMobileMenu={toggleMobileMenu} isMobileMenuOpen={isMobileMenuOpen} /> */}
          <Routes>
            <Route path="/products" element={<ProductList />} />
            <Route path="/orders" element={<OrderList />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/" element={<ProductList />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App
