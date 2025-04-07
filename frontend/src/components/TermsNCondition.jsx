import React from 'react'
import { Link } from 'react-router-dom'
const TermsNCondition = () => {
  return (
    <>
      <div className="m-12">
    <div className="text-sm mb-4">
      <Link to="/" className="opacity-50 hover:opacity-100">
        Home
      </Link>
      <span>/</span>
      <a href="">T&C</a>
    </div>
  </div>
  <div className="m-10">
    <h1 className="text-6xl text-center">Terms and conditions</h1>
    <div className="md:flex md:justify-center md:items-center md:mt-12">
      <div className="text-md text-center md:w-72">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum dolor
        distinctio impedit ex eligendi quibusdam perspiciatis consequatur enim
        aut nobis quisquam, quaerat repudiandae, ducimus quas modi ea ipsum
        mollitia veritatis?
      </div>
    </div>
  </div>
    </>
  )
}

export default TermsNCondition