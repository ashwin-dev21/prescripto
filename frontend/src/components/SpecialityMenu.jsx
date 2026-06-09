import React from 'react'
import {specialityData} from '../assets/assets'
import {Link} from 'react-router-dom'

const SpecialityMenu = () => {
  return (
    <div id='speciality' className='flex flex-col items-center gap-6 py-12 text-gray-800'> 
        <h1 className='text-3xl font-semibold'>Find By Speciality</h1>
        <p className='text-center sm:w-1/3 text-sm'>
        Select a speciality to find doctors in that field, Simply browse through our directory of experienced professionals.</p>
            <div className='flex sm:justify-center gap-4 pt-5 w-full overflow-scroll '>
                {specialityData.map((item, index) => (
                    <Link onClick={() =>scrollTo(0,0)} className='flex flex-col items-center cursor-pointer shrink-0 hover:-translate-y-2.5 transition-all duration-500' key={index} to={`/doctors/${item.speciality}`}>
                        <img className='w-16 sm:w-24 mb-2' src={item.image} alt={item.speciality} />
                        <p>{item.speciality}</p>
                    </Link> 
                ))}
            </div>
    </div>
  )
}

export default SpecialityMenu