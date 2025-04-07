import { useState } from 'react';
import { Link } from 'react-router-dom';

const AdminPanelNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="w-full bg-gray-800 text-white flex flex-col md:flex-row">
      <div className="p-4 text-2xl font-bold flex justify-between items-center">
        Admin Panel
        {/* Mobile Menu Button */}
        <button onClick={toggleMobileMenu} className="md:hidden focus:outline-none">
          <span className="material-icons-outlined">
            {isMobileMenuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>
      <nav className={`flex flex-col md:flex-row ${isMobileMenuOpen ? 'block' : 'hidden'} md:block`}>
        <Link to="/products" className="py-2 px-4 hover:bg-gray-700 rounded">
          Product List
        </Link>
        <Link to="/orders" className="py-2 px-4 hover:bg-gray-700 rounded">
          Orders List
        </Link>
        <Link to="/add-product" className="py-2 px-4 hover:bg-gray-700 rounded">
          Add Product
        </Link>
      </nav>
    </div>
  );
};

export default AdminPanelNavbar;
