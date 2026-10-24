import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { doctors as staticDoctors } from '../assets/assets' // Local asset fallback

const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext)

  const [appointments, setAppointments] = useState([])
  const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  const slotDateFormat = (slotDate) => {
    if (!slotDate || typeof slotDate !== 'string') return ''
    const dateArray = slotDate.split('_')
    return `${dateArray[0]} ${months[Number(dateArray[1])]} ${dateArray[2]}`
  }

  // Helper function to resolve image src: checks item image, then falls back to local assets
  const getDoctorImage = (docData) => {
    if (!docData) return ''
    // Search local static assets array by ID or matching Doctor Name
    const matchedDoctor = staticDoctors.find(
      (d) => d._id === docData._id || d.name === docData.name
    )
    return matchedDoctor ? matchedDoctor.image : docData.image
  }

const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/appointments`, {
        headers: { token }
      })

      if (data.success) {
        // Filter out cancelled appointments so they don't appear in the list at all
        const activeAppointments = data.appointments.filter(item => !item.cancelled)
        setAppointments(activeAppointments.reverse())
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/cancel-appointment`,
        { appointmentId },
        { headers: { token } }
      )

      if (data.success) {
        toast.success(data.message)
        getUserAppointments()
        if (getDoctorsData) getDoctorsData()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (token) {
      getUserAppointments()
    }
  }, [token])

  return (
    <div>
      <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>My Appointments</p>
      <div>
        {appointments && appointments.length > 0 ? (
          appointments.map((item, index) => (
            <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b items-center' key={item._id || index}>
              <div>
                <img 
                  className='w-32 h-32 object-cover bg-indigo-50 rounded' 
                  src={getDoctorImage(item.docData)} 
                  alt={item.docData?.name || "Doctor"} 
                  onError={(e) => {
                    // Safety fallback if image URL fails to load
                    const fallback = staticDoctors.find(d => d.name === item.docData?.name)
                    if (fallback) e.target.src = fallback.image
                  }}
                />
              </div>
              <div className='flex-1 text-sm text-zinc-600'>
                <p className='text-neutral-800 font-semibold'>{item.docData?.name}</p>
                <p>{item.docData?.speciality}</p>
                
                <p className='text-zinc-700 font-medium mt-1'>Address:</p>
                <p className='text-xs'>{item.docData?.address?.line1}</p>
                <p className='text-xs'>{item.docData?.address?.line2}</p>
                
                <p className='text-xs mt-1'>
                  <span className='text-sm text-neutral-700 font-medium'>Date & Time:</span> {slotDateFormat(item.slotDate)} | {item.slotTime}
                </p>
              </div>
              
              <div className='flex flex-col gap-2 justify-end'>
                {!item.cancelled && !item.isCompleted && (
                  <button className='text-sm text-stone-500 sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300'>
                    Pay Online
                  </button>
                )}
                {!item.cancelled && !item.isCompleted && (
                  <button 
                    onClick={() => cancelAppointment(item._id)} 
                    className='text-sm text-stone-500 sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300'
                  >
                    Cancel Appointment
                  </button>
                )}
                {item.cancelled && (
                  <button className='sm:min-w-48 py-2 border border-red-500 rounded text-red-500'>
                    Appointment Cancelled
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className='py-6 text-gray-500 text-sm'>No appointments found.</p>
        )}
      </div>
    </div>
  )
}

export default MyAppointments