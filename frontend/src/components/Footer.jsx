import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='mx-4 md:mx-10'>

      {/* Main Footer */}
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-14 my-10 mt-40 text-sm'>

        {/* Left Section */}
        <div>
          <img className='mb-5 w-32' src={assets.logo} alt="logo" />

          <p className='text-gray-600 leading-6'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Accusamus, consequatur.
          </p>
        </div>

        {/* Middle Section */}
        <div>
          <p className='text-xl font-medium mb-5'>COMPANY</p>

          <ul className='flex flex-col gap-2 text-gray-600'>
            <li className='cursor-pointer'>Home</li>
            <li className='cursor-pointer'>About Us</li>
            <li className='cursor-pointer'>Privacy Policy</li>
            <li className='cursor-pointer'>Contact</li>
          </ul>
        </div>

        {/* Right Section */}
        <div>
          <p className='text-xl font-medium mb-5'>CONTACT US</p>

          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>Email: Ashwin@company.com</li>
            <li>Phone: +1 234 567 890</li>
          </ul>
        </div>

      </div>

      {/* Copyright */}
      <div>
        <hr />

        <p className='py-5 text-sm text-center'>
          Copyright 2026 © Medmandu. All Rights Reserved.
        </p>
      </div>

    </div>
  )
}

export default Footer