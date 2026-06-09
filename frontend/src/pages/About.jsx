import React from 'react'
import { assets} from '../assets/assets'

const About = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>About <span className='text-gray-700 font-medium'>US</span></p>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-12'>
        <img className='w-full md:max-w-90' src={assets.about_image} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'>
          <p>Welcome to prescripto, Lorem ipsum dolor sit amet consectetur adipisicing elit. At non quaerat architecto, odit cum repellendus nobis est adipisci libero rem accusantium illo tempore quae ipsam, minus veniam in aut similique!</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti ad eius ratione labore iusto? Eius libero est nam explicabo quo aliquam repudiandae vel doloribus, officiis voluptates accusamus suscipit quidem magni Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia deleniti tenetur tempore iure suscipit nobis laborum sunt error animi tempora sed placeat repudiandae recusandae consectetur cupiditate quasi facilis, quidem corrupti? Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos natus labore inventore voluptate, iste excepturi id. Quo nam quasi unde qui nesciunt, laboriosam itaque quibusdam blanditiis, dolorem provident quam dolorum.</p>
          <b className='text-gray-800'>Our Vision</b>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut quam minima quidem blanditiis ipsum, veritatis commodi deleniti quae et dolores, cupiditate doloribus id animi facilis necessitatibus iste dignissimos voluptatum. Accusamus Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, harum molestias quaerat nostrum vero vitae ex nihil quod illum quibusdam temporibus cumque explicabo, itaque alias possimus sunt amet quis. Modi!.</p>
        </div>
      </div>
      <div className='text-xl my-4'>
        <p>WHY  <span className='text-gray-700 font-semibold'>CHOOSE US</span></p>
      </div>

      <div className='flex flex-col md:flex-row mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>Efficiency:</b>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>Convenience:</b>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>Personalization:</b>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
        </div>
      </div>

    </div>
  )
}

export default About