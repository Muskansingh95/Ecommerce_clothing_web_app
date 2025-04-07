import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminPanel = () => {
  const [orders, setOrders] = useState([]);
  const [totalOrders, setTotalOrders] = useState()

  // Fetch order data from the database
  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:8000/getorderproduct'); // Update with your API endpoint
      setOrders(response.data);
      setTotalOrders(response.data.length)
      console.log(totalOrders)
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const removeFromOrder = async (id) => {
    await fetch('http://localhost:8000/removeorderproduct', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: id })
    })
    await fetchOrders()
  }

  return (
    <>
  <div className="max-w-7xl mx-auto p-4 sm:p-8 bg-white border border-gray-300 rounded-lg shadow-lg">
    <div className="px-4 py-2 m-2 text-black bg-gray-100 w-fit">
      Total Orders - {totalOrders}
    </div>
    <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Management</h2>

    {/* Display Orders */}
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white text-sm table-auto">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 border-b text-left text-gray-600 font-medium">Order ID</th>
            <th className="py-2 px-4 border-b text-left text-gray-600 font-medium">Product Name</th>
            <th className="py-2 px-4 border-b text-left text-gray-600 font-medium">New Price</th>
            <th className="py-2 px-4 border-b text-left text-gray-600 font-medium">Date</th>
            <th className="py-2 px-4 border-b text-left text-gray-600 font-medium hidden lg:table-cell">Email</th>
            <th className="py-2 px-4 border-b text-left text-gray-600 font-medium hidden lg:table-cell">Address</th>
            <th className="py-2 px-4 border-b text-left text-gray-600 font-medium hidden md:table-cell">Zip Code</th>
            <th className="py-2 px-4 border-b text-left text-gray-600 font-medium hidden md:table-cell">Phone No</th>
            <th className="py-2 px-4 border-b text-left text-gray-600 font-medium">Remove</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="py-5 px-4 border-b text-gray-700">
                  {String(order._id).slice(-7, -1)}
                </td>
                <td className="py-5 px-4 border-b text-gray-700">
                  {order.items.map((data) => `${data.name}, `)}
                </td>
                <td className="py-5 px-4 border-b text-green-600">₹ {order.amount}</td>
                <td className="py-5 px-4 border-b text-gray-700">
                  {new Date(order.date).toLocaleDateString()}
                </td>
                <td className="py-5 px-4 border-b text-gray-700 hidden lg:table-cell">
                  {order.email}
                </td>
                <td className="py-5 px-4 border-b text-gray-700 hidden lg:table-cell">
                  {order.address}
                </td>
                <td className="py-5 px-4 border-b text-gray-700 hidden md:table-cell">
                  {order.zipcode}
                </td>
                <td className="py-5 px-4 border-b text-gray-700 hidden md:table-cell">
                  {order.phoneNo}
                </td>
                <td className="py-5 px-4 border-b text-gray-700">
                  <button
                    className="px-3 bg-white border-red-700 border text-red-700 py-2 md:py-3 font-bold rounded hover:text-white hover:bg-red-700"
                    onClick={() => removeFromOrder(order._id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10" className="text-center py-4 text-gray-500">
                No orders found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
</>

  );
};

export default AdminPanel;
