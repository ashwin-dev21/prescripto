import React, { useContext, useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Doctors = () => {
  const navigate = useNavigate()
  const { speciality } = useParams()
  const { doctors } = useContext(AppContext)
  const [filteredDoc, setFilteredDoc] = useState([])

  const applyFilter = () => {
    if (doctors && doctors.length > 0) {
      if (speciality) {
        setFilteredDoc(doctors.filter(doc => doc.speciality === speciality))
      } else {
        setFilteredDoc(doctors)
      }
    } else {
      setFilteredDoc([])
    }
  }

  useEffect(() => {
    applyFilter()
  }, [doctors, speciality])

  const specialtiesList = [
    'General Physician',
    'Gynecologist',
    'Pediatrician',
    'Gastroenterologist',
    'Dermatologist',
    'Neurologist'
  ]

  return (
    <div>
      <p className='text-gray-600'>Browse Doctors</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-4'>
        
        {/* Specialty Filter Sidebar */}
        <div className='flex flex-col text-sm text-gray-600 gap-4'>
          {specialtiesList.map((item, index) => (
            <p
              key={index}
              onClick={() => speciality === item ? navigate('/doctors') : navigate(`/doctors/${item}`)}
              className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
                speciality === item ? 'bg-indigo-100 text-black font-medium' : ''
              }`}
            >
              {item}
            </p>
          ))}
        </div>

        {/* Doctor Grid */}
        <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 gap-y-6'>
          {filteredDoc.map((item, index) => (
            <div 
              key={item._id || index} 
              onClick={() => {
                navigate(`/appointment/${item._id}`)
                scrollTo(0, 0)
              }} 
              className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-2.5 transition-all duration-300'
            >
              <img className='bg-blue-50' src={item.image} alt={item.name} />
              <div className='p-4'>
                <div className={`flex items-center gap-2 text-sm text-center ${item.available ? 'text-green-500' : 'text-gray-400'}`}>
                  <p className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-500' : 'bg-gray-400'}`}></p>
                  <p>{item.available ? 'Available' : 'Not Available'}</p>
                </div>
                <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                <p className='text-gray-600 text-sm'>{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default Doctors