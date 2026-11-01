import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div className='px-4 md:px-10 max-w-7xl mx-auto'>
      {/* Page Title */}
      <div className='text-center text-2xl pt-10 text-gray-500 uppercase tracking-wide'>
        <p className='text-blue-600'>About <span className='text-gray-800 font-semibold'>US</span></p>
      </div>

      {/* Main Section: Image + Description */}
      <div className='my-12 flex flex-col md:flex-row items-center gap-10 lg:gap-16'>
        <div className='w-full md:w-2/5 flex justify-center'>
          <img 
            className='w-full max-w-md h-auto object-cover rounded-lg shadow-sm border border-gray-100' 
            src={assets.about_image} 
            alt="Prescripto Healthcare Team" 
          />
        </div>
        
        <div className='flex flex-col justify-center gap-5 md:w-3/5 text-sm md:text-base text-gray-600 leading-relaxed'>
          <p>
            Welcome to <span className='font-semibold text-gray-800'>Prescripto</span>, your trusted partner in managing healthcare conveniently and efficiently. We understand the challenges of finding the right medical professionals and scheduling timely appointments. Our platform is committed to bridging the gap between patients and healthcare providers through modern technology and user-centric design.
          </p>
          <p>
            Prescripto simplifies the healthcare experience by streamlining appointment booking, medical records access, and patient-doctor consultations. Whether you are booking your first consultation or managing ongoing health routines, we ensure your care management is swift, secure, and transparent.
          </p>
          
          <div className='pt-2'>
            <b className='text-gray-800 text-lg font-semibold block mb-2'>Our Vision</b>
            <p>
              Our vision at Prescripto is to create a seamless healthcare ecosystem for every user. We aim to empower patients with intuitive digital tools that make high-quality medical guidance accessible whenever and wherever it is needed.
            </p>
          </div>
        </div>
      </div>

      {/* Section Title */}
      <div className='text-xl my-6 tracking-wide text-gray-500 uppercase'>
        <p>WHY <span className='text-gray-800 font-semibold'>CHOOSE US</span></p>
      </div>

      {/* Features Grid */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-0 border rounded-lg overflow-hidden shadow-sm mb-20'>
        <div className='border-b md:border-b-0 md:border-r px-8 py-10 md:py-14 flex flex-col gap-3 text-sm hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer group'>
          <b className='text-gray-800 group-hover:text-white text-base font-semibold'>Efficiency:</b>
          <p className='leading-relaxed'>Streamlined appointment scheduling that fits into your busy lifestyle without hassle.</p>
        </div>
        
        <div className='border-b md:border-b-0 md:border-r px-8 py-10 md:py-14 flex flex-col gap-3 text-sm hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer group'>
          <b className='text-gray-800 group-hover:text-white text-base font-semibold'>Convenience:</b>
          <p className='leading-relaxed'>Access to a network of verified healthcare professionals right from your device.</p>
        </div>
        
        <div className='px-8 py-10 md:py-14 flex flex-col gap-3 text-sm hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer group'>
          <b className='text-gray-800 group-hover:text-white text-base font-semibold'>Personalization:</b>
          <p className='leading-relaxed'>Tailored reminders and health insights to keep you informed every step of your journey.</p>
        </div>
      </div>
    </div>
  )
}

export default About