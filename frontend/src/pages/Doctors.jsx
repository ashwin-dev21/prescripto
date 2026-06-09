import React from 'react'
import { useParams } from 'react-router-dom'
import { useContext, useState, useEffect } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'


const Doctors = () => {
  const navigate = useNavigate()

  const { speciality } = useParams()
  const [filteredDoc, setFilteredDoc] = useState([])

  const { doctors } = useContext(AppContext)

  const applyFilter = () => {
    if (speciality) {
      setFilteredDoc(doctors.filter(doc => doc.speciality === speciality))
    } else {
      setFilteredDoc(doctors)
    }
  }

  useEffect(() => {
    applyFilter()
  }, [doctors, speciality])


  return (
    <div>
      <p className='text-gray-600'>Browse Doctors</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-4'>
        <div className='flex flex-col text-medium text-gray-600 gap-4'>
          <p onClick={() => speciality === 'General Physician' ? navigate('/doctors') : navigate('/doctors/General Physician')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer  ${speciality === 'General Physician' ? 'bg-indigo-100 text-black' : ''}`}>General Physician</p>
          <p onClick={() => speciality === 'Gynecologist' ? navigate('/doctors') : navigate('/doctors/Gynecologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Gynecologist' ? 'bg-blue-100 text-black' : ''}`}>Gynecologist</p>
          <p onClick={() => speciality === 'Pediatrician' ? navigate('/doctors') : navigate('/doctors/Pediatrician')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Pediatrician' ? 'bg-blue-100 text-black' : ''}`}>Pediatrician</p>
          <p onClick={() => speciality === 'Gastroenterologist' ? navigate('/doctors') : navigate('/doctors/Gastroenterologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Gastroenterologist' ? 'bg-blue-100 text-black' : ''}`}>Gastroenterologist</p>
          <p onClick={() => speciality === 'Dermatologist' ? navigate('/doctors') : navigate('/doctors/Dermatologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Dermatologist' ? 'bg-blue-100 text-black' : ''}`}>Dermatologist</p>
          <p onClick={() => speciality === 'Neurologist' ? navigate('/doctors') : navigate('/doctors/Neurologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Neurologist' ? 'bg-blue-100 text-black' : ''}`}>Neurologist</p>
        </div>
        <div className='w-full grid grid-cols-auto gap-4 gap-y-6'>
          {filteredDoc.map((item, index) => (
            <div key={index} onClick={() => {
              navigate(`/appointment/${item._id}`)
              scrollTo(0, 0)
            }} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-2.5 transition-all duration-300  '>
              <img className='bg-blue-50' src={item.image} alt="" />
              <div className='p-4'>
                <div className='flex items-center gap-2 text-sm text-green-500 text-center'>
                  <p className='w-2 h-2 bg-green-500 rounded-full'></p><p>Available</p>
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