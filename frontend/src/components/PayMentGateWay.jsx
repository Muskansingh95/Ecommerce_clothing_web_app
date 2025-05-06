import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ecomContext from '../context/context';

const PayMentGateWay = () => {
    const { allDetails, buyNow } = useContext(ecomContext);
    const navigate = useNavigate(); 
    const [orderDetails, setOrderDetails] = useState({
        name: '',
        email: '',
        street: '',
        city: '',
        address: '',
        state: '',
        zipcode: '',
        phoneNo: ''
    });

    const isFormValid = Object.values(orderDetails).every(value => value.trim() !== '');

    const onhandler = (event) => {
        const { name, value } = event.target;
        setOrderDetails({ ...orderDetails, [name]: value });
    };

    const orderPlaced = async () => {
        if (!isFormValid) {
            alert("Please fill all the fields.");
            return;
        }

        const amountInPaise = (buyNow + 99) * 100;

        const options = {
            key: "KEY",
            amount: amountInPaise,
            currency: "INR",
            name: orderDetails.name,
            description: "Order Payment",
            handler: async function (response) {
                console.log('Payment successful:', response);

                const res = await fetch('https://ecommerce-mern-backend-4y6r.onrender.com/addtoorder', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'auth-token': `${localStorage.getItem('auth-token')}`,
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify({
                        orderDetails,
                        allDetails,
                        buyNow,
                        razorpayPaymentId: response.razorpay_payment_id
                    }),
                });

                const data = await res.json();
                alert(data.message || 'Order placed successfully!');
                navigate('/')
            },
            prefill: {
                name: orderDetails.name,
                email: orderDetails.email,
                contact: orderDetails.phoneNo,
            },
            theme: {
                color: "#3399cc"
            }
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
    };

    const generateInvoice = (details, products, total, paymentId) => {
        const invoiceWindow = window.open('', '_blank');
        const invoiceContent = `
            <html>
            <head><title>Invoice</title></head>
            <body>
                <h1>🧾 Invoice</h1>
                <p><strong>Name:</strong> ${details.name}</p>
                <p><strong>Email:</strong> ${details.email}</p>
                <p><strong>Address:</strong> ${details.street}, ${details.city}, ${details.state}, ${details.zipcode}</p>
                <p><strong>Phone:</strong> ${details.phoneNo}</p>
                <p><strong>Payment ID:</strong> ${paymentId}</p>
                <h2>Products:</h2>
                <ul>
                    ${products.map((item, i) => `<li>${i + 1}. ${item.name || item.title} - ₹${item.price}</li>`).join('')}
                </ul>
                <hr />
                <h3>Subtotal: ₹${total}</h3>
                <h3>Shipping: ₹99</h3>
                <h2>Total Paid: ₹${total + 99}</h2>
            </body>
            </html>
        `;
        invoiceWindow.document.write(invoiceContent);
        invoiceWindow.document.close();
        invoiceWindow.print();
    };

    return (
        <>
            <div className="m-12 h-fit">
                <div className="text-sm mb-4">
                    <Link to="/" className='opacity-50 hover:opacity-100'>Home</Link><span>/</span><span className='text-black'>Payment Gateway</span>
                </div>
                <h1 className="text-6xl text-center">Payment Gateway Here</h1>
            </div>
            <div className="flex justify-items-center mx-16 gap-16">
                <div className="p-4 w-6/12">
                    <h2 className="text-2xl font-bold mb-4">Personal Details</h2>
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <label className="block mb-2">Full Name</label>
                            <input type="text" name='name' onChange={onhandler} value={orderDetails.name} className="w-full border rounded-md p-2" />
                        </div>
                        <div>
                            <label className="block mb-2">Email Address</label>
                            <input type="email" name='email' onChange={onhandler} value={orderDetails.email} className="w-full border rounded-md p-2" />
                        </div>
                        <div>
                            <label className="block mb-2">Street</label>
                            <input type="text" name='street' onChange={onhandler} value={orderDetails.street} className="w-full border rounded-md p-2" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block mb-2">City</label>
                                <input type="text" name='city' onChange={onhandler} value={orderDetails.city} className="w-full border rounded-md p-2" />
                            </div>
                            <div>
                                <label className="block mb-2">State</label>
                                <input type="text" name='state' onChange={onhandler} value={orderDetails.state} className="w-full border rounded-md p-2" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block mb-2">Zipcode</label>
                                <input type="text" name='zipcode' onChange={onhandler} value={orderDetails.zipcode} className="w-full border rounded-md p-2" />
                            </div>
                            <div>
                                <label className="block mb-2">Phone</label>
                                <input type="tel" name='phoneNo' onChange={onhandler} value={orderDetails.phoneNo} className="w-full border rounded-md p-2" />
                            </div>
                        </div>
                        <div>
                            <label className="block mb-2">Address</label>
                            <input type="text" name='address' onChange={onhandler} value={orderDetails.address} className="w-full border rounded-md p-2" />
                        </div>
                    </div>
                </div>

                <div className='w-6/12'>
                    <div className="bg-white p-4 rounded-lg">
                        <h2 className="text-lg font-semibold mb-4">CART TOTALS</h2>
                        <div className="flex justify-between mb-2">
                            <p className="text-gray-500">Subtotal</p>
                            <p className="text-black">₹ {buyNow}</p>
                        </div>
                        <hr />
                        <div className="flex justify-between mb-2">
                            <p className="text-gray-500">Shipping Fee</p>
                            <p className="text-black">₹ 99.00</p>
                        </div>
                        <hr />
                        <div className="flex justify-between mb-4">
                            <p className="text-lg font-semibold">Total</p>
                            <p className="text-lg font-semibold text-black">₹ {buyNow + 99}</p>
                        </div>
                        <hr />
                        <h3 className="text-lg font-semibold mt-10 mb-4">PAYMENT METHOD</h3>
                        <div className="flex space-x-4">
                            <button className="flex items-center border rounded border-black p-5 hover:border-double hover:border-black">
                                <p className="text-black "> <span className="text-2xl">💰</span> CASH ON DELIVERY</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="m-5">
                <center>
                    <button
                        disabled={!isFormValid}
                        className={`px-6 py-3 mt-4 text-white rounded-lg ${isFormValid ? 'bg-black hover:bg-gray-800' : 'bg-gray-400 cursor-not-allowed'}`}
                        onClick={orderPlaced}
                    >
                        PLACE ORDER
                    </button>
                </center>
            </div>
        </>
    );
};

export default PayMentGateWay;
