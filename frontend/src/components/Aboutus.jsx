import React from 'react'
import abuts from '../assets/abuts.webp'
import { Link } from 'react-router-dom'

const Aboutus = () => {
  return (
    <>
     <div className="m-12">
          <div className="text-sm mb-4">
            <Link to="/" className='opacity-50 hover:opacity-100'>Home</Link><span>/</span><a href="">About-Us</a>
          </div>
        </div>
      <div className="m-10">
        <h1 className="text-6xl text-center">About Us</h1>
        <div className='flex gap-x-32 items-center place-content-center m-24'>
          <div>
            <img src={abuts} alt="" height={800} width={500} />
          </div>
          <div>
            <h1 className='text-2xl text-center'>Be The Change</h1>
            <br />
            <p className="text-md text-center w-72">Overlays is all about bringing a CHANGE - a positive change - into people's lives. Overlays 
            started with the intention of reaching out to the creative youth that is
             striving towards bringing a change in the world. To empower these creative 
             people, Overlays believes in making something that proves to be an add-on to 
             their creativity. </p>
          </div>
        </div>
        
        <div className='flex gap-x-32 items-center place-content-center mb-24'>
          
          <div className=''>
            <h1 className='text-2xl text-center'>Be The Change</h1>
            <br />
            <p className="text-md text-center w-72">Overlays is all about bringing a CHANGE - a positive change - into people's lives. Overlays 
            started with the intention of reaching out to the creative youth that is
             striving towards bringing a change in the world. To empower these creative 
             people, Overlays believes in making something that proves to be an add-on to 
             their creativity. </p>
          </div>
          <div>
            <img src={abuts} alt="" height={600} width={400} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Aboutus