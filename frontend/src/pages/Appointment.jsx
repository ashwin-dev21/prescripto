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
  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')

  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  const fetchDocInfo = async () => {
    const foundDoc = doctors.find((doc) => doc._id === docId)
    setDocInfo(foundDoc)
  }

  // Generate available booking slots for the next 7 days
  const getAvailableSlots = async () => {
    if (!docInfo) return
    
    setDocSlots([])
    let today = new Date()

    for (let i = 0; i < 7; i++) {
      // Getting date with index
      let currentDate = new Date(today)
      currentDate.setDate(today.getDate() + i)

      // Setting end time of the date with 21:00
      let endTime = new Date()
      endTime.setDate(today.getDate() + i)
      endTime.setHours(21, 0, 0, 0)

      // Setting hours
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
      } else {
        currentDate.setHours(10)
        currentDate.setMinutes(0)
      }

      let timeSlots = []

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        
        let day = currentDate.getDate()
        let month = currentDate.getMonth() + 1
        let year = currentDate.getFullYear()

        const slotDate = `${day}_${month}_${year}`
        const slotTime = formattedTime

        // Check if slot is already booked (if doctor object includes slots booked data)
        const isSlotBooked = docInfo.slots_booked && docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime)

        if (!isSlotBooked) {
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime
          })
        }

        // Increment current time by 30 minutes
        currentDate.setMinutes(currentDate.getMinutes() + 30)
      }

      setDocSlots(prev => [...prev, timeSlots])
    }
  }

  const bookAppointment = async () => {
    if (!token) {
      toast.warn('Login to book appointment')
      return navigate('/login')
    }

    if (!slotTime) {
      toast.warn('Please select a time slot')
      return
    }

    try {
      const date = docSlots[slotIndex]?.[0]?.datetime

      if (!date) {
        toast.error('Invalid slot selection')
        return
      }

      let day = date.getDate()
      let month = date.getMonth() + 1
      let year = date.getFullYear()

      // Format expected by standard backend controllers: "D_M_YYYY"
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
      toast.error(error.message || 'Something went wrong')
    }
  }

  useEffect(() => {
    fetchDocInfo()
  }, [doctors, docId])

  useEffect(() => {
    if (docInfo) {
      getAvailableSlots()
    }
  }, [docInfo])

  return docInfo ? (
    <div>
      {/* --- Example UI for Slots --- */}
      <div className='flex gap-3 items-center w-full overflow-x-scroll my-4'>
        {docSlots.length && docSlots.map((item, index) => (
          <div 
            key={index} 
            onClick={() => setSlotIndex(index)} 
            className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-primary text-white' : 'border border-zinc-200'}`}
          >
            <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
            <p>{item[0] && item[0].datetime.getDate()}</p>
          </div>
        ))}
      </div>

      <div className='flex items-center gap-3 w-full overflow-x-scroll my-4'>
        {docSlots.length && docSlots[slotIndex]?.map((item, index) => (
          <p 
            key={index} 
            onClick={() => setSlotTime(item.time)} 
            className={`text-sm font-light shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-primary text-white' : 'text-zinc-400 border border-zinc-300'}`}
          >
            {item.time.toLowerCase()}
          </p>
        ))}
      </div>
      {/* ---------------------------- */}

      <button onClick={bookAppointment} className='bg-primary text-white px-14 py-3 rounded-full my-6'>
        Book an appointment
      </button>
    </div>
  ) : null
}

export default Appointment