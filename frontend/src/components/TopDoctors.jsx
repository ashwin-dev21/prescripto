import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const TopDoctors = () => {
    const navigate = useNavigate()
    const { doctors } = useContext(AppContext)

    return (
        <div className='flex flex-col items-center gap-5 my-16 text-gray-900 md:mx-10'>
            <h1 className='text-3xl font-semibold'>Top Doctors To Book</h1>
            <p className='text-center sm:w-1/3 text-sm'>
                Simply browse through our directory of experienced professionals.
            </p>

            {/* Replaced 'grid-cols-auto' with valid responsive grid classes */}
            <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 pt-5 px-3 sm:px-0'>
                {/* Added fallback (doctors || []) so .slice(0, 10) never crashes */}
                {(doctors || []).slice(0, 10).map((item, index) => (
                    <div 
                        key={item._id || index} 
                        onClick={() => {
                            navigate(`/appointment/${item._id}`)
                            window.scrollTo(0, 0)
                        }} 
                        className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2.5 transition-all duration-300'
                    >
                        <img className='bg-blue-50 w-full h-48 object-cover' src={item.image} alt={item.name} />
                        <div className='p-4'>
                            <div className={`flex items-center gap-2 text-sm ${item.available ? 'text-green-500' : 'text-gray-400'}`}>
                                <p className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-500' : 'bg-gray-400'}`}></p>
                                <p>{item.available ? 'Available' : 'Not Available'}</p>
                            </div>
                            <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                            <p className='text-gray-600 text-sm'>{item.speciality}</p>
                        </div>
                    </div>
                ))}
            </div>

            <button 
                onClick={() => { navigate('/doctors'); window.scrollTo(0, 0); }} 
                className='bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10 cursor-pointer hover:bg-blue-100'
            >
                More..
            </button>
        </div>
    )
}

export default TopDoctors