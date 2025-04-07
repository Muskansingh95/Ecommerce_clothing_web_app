import React from 'react'
import { Link } from 'react-router-dom'

const GetInTouch = () => {
  return (
    <>
     <div className="m-12">
          <div className="text-sm mb-4">
            <Link to="/" className='opacity-50 hover:opacity-100'>Home</Link><span>/</span><a href="">Get-In-Touch</a>
          </div>
        </div>

      <section className="pb-20 relative block bg-blueGray-800">
        <div className="container mx-auto px-4 lg:pt-24 lg:pb-64">
          <div className="flex flex-wrap text-center justify-center">
            <div className="w-full lg:w-6/12 px-4">
              <h2 className="text-4xl font-semibold text-black">Build something</h2>
              <p className="text-lg leading-relaxed mt-4 mb-4 text-blueGray-400">
              If you have any queries you can reach us at support@clothing.com.

You can also use WhatsApp at the right bottom corner of the website!

We'll get back to you as soon as possible!
              </p>
            </div>
          </div>
          
        </div>
      </section>
      <section className="relative block pt-24 lg:pt-0 bg-blueGray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center lg:-mt-64 -mt-48">
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200">
                <div className="flex-auto p-5 lg:p-10">
                  <h4 className="text-2xl font-semibold">Want to work with us?</h4>
                  <p className="leading-relaxed mt-1 mb-4 text-blueGray-500">
                    Complete this form and we will get back to you in 24 hours.
                  </p>
                  <div className="relative w-full mb-3 mt-8">
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="full-name">Full Name</label><input type="text" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder="Full Name" />
                  </div>
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="email">Email</label><input type="email" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder="Email" />
                  </div>
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="message">Message</label><textarea rows="4" cols="80" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full" placeholder="Type a message..."></textarea>
                  </div>
                  <div className="text-center mt-6">
                    <button className="bg-blueGray-800 text-black active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                      Send Message
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer className="relative bg-blueGray-800 pt-8 pb-6 mt-1">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center md:justify-between justify-center">
              <div className="w-full md:w-6/12 px-4 mx-auto text-center">
                <div className="text-sm text-white font-semibold py-1">
                  Made with <a href="https://www.creative-tim.com/product/notus-js" className="text-white hover:text-gray-600" target="_blank">Notus JS</a> by <a href="https://www.creative-tim.com" className="text-white hover:text-blueGray-600" target="_blank"> Creative Tim</a>.
                </div>
              </div>
            </div>
          </div>
        </footer>
      </section>

    </>
  )
}

export default GetInTouch