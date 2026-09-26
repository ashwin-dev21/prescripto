import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Appointment = () => {
  const { docId } = useParams()
  const { doctors, backendUrl, token, getDoctorsData } = useContext(AppContext)
  const navigate = useNavigate()

  const [docInfo, setDocInfo] = useState(null)
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')

  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId)
    setDocInfo(docInfo)
  }

  const bookAppointment = async () => {
    if (!token) {
      toast.warn('Login to book appointment')
      return navigate('/login')
    }

    try {
      // Logic for formatting the date based on your slot picker selection
      const date = docInfo.slots_index?.[slotIndex]?.datetime || new Date() // Adjust depending on your exact state variable names
      
      // Standard Prescripto date calculation format
      let day = date.getDate()
      let month = date.getMonth() + 1
      let year = date.getFullYear()

      let slotDate = `${day}_${month}_${year}`

      const { data } = await axios.post(
        `${backendUrl}/api/user/book-appointment`, 
        { docId, slotDate, slotTime }, 
        { headers: { token } }
      )

      if (data.success) {
        toast.success(data.message)
        getDoctorsData()
        navigate('/my-appointments')
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchDocInfo()
  }, [doctors, docId])

  return docInfo ? (
    <div>
      {/* Doctor Details & Slot Selection UI goes here */}
      <button onClick={bookAppointment} className='bg-primary text-white px-14 py-3 rounded-full my-6'>
        Book an appointment
      </button>
    </div>
  ) : null
}

export default Appointment