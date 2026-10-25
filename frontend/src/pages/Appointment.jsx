import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'
import { RelatedDoctors } from '../components/RelatedDoctors' 

const Appointment = () => {
  const { docId } = useParams()
  const { doctors, currencySymbol, backendUrl, token, getDoctorsData } = useContext(AppContext)
  const navigate = useNavigate()

  const [docInfo, setDocInfo] = useState(null)
  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')
  const [isBooking, setIsBooking] = useState(false)

  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  const fetchDocInfo = async () => {
    if (doctors && doctors.length > 0) {
      const foundDoc = doctors.find((doc) => doc._id === docId)
      if (foundDoc) {
        setDocInfo(foundDoc)
      }
    }
  }

  const getAvailableSlots = async () => {
    if (!docInfo) return
    
    let today = new Date()
    let allSlots = []

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today)
      currentDate.setDate(today.getDate() + i)

      let endTime = new Date()
      endTime.setDate(today.getDate() + i)
      endTime.setHours(21, 0, 0, 0)

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
        const slotTimeStr = formattedTime

        const isSlotBooked = docInfo.slots_booked && docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTimeStr)

        if (!isSlotBooked) {
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime
          })
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30)
      }

      allSlots.push(timeSlots)
    }

    setDocSlots(allSlots)
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

    const date = docSlots[slotIndex]?.[0]?.datetime
    if (!date) {
      toast.error('Invalid slot selection')
      return
    }

    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()
    let slotDate = `${day}_${month}_${year}`

    setIsBooking(true)
    toast.info('Booking your appointment...')
    navigate('/my-appointments')

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/book-appointment`, 
        { docId, slotDate, slotTime }, 
        { headers: { token } }
      )

      if (data.success) {
        toast.dismiss()
        toast.success(data.message || 'Appointment booked successfully!')
        if (getDoctorsData) getDoctorsData()
      } else {
        toast.dismiss()
        toast.error(data.message)
      }

    } catch (error) {
      console.log(error)
      toast.dismiss()
      toast.error(error.message || 'Something went wrong')
    } finally {
      setIsBooking(false)
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
      {/* ---------- Doctor Details ----------- */}
      <div className='flex flex-col sm:flex-row gap-4'>
        <div>
          <img className='bg-primary w-full sm:max-w-xs rounded-lg' src={docInfo?.image} alt="" />
        </div>

        <div className='flex-1 border border-stone-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 -mt-20 sm:mt-0'>
          <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>
            {docInfo?.name} <img className='w-5' src={assets.verified_icon} alt="" />
          </p>
          <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
            <p>{docInfo?.degree} - {docInfo?.speciality}</p>
            <button className='py-0.5 px-2 border text-xs rounded-full'>{docInfo?.experience}</button>
          </div>

          <div>
            <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>
              About <img src={assets.info_icon} alt="" />
            </p>
            <p className='text-sm text-gray-500 max-w-175 mt-1'>{docInfo?.about}</p>
          </div>

          <p className='text-gray-500 font-medium mt-4'>
            Appointment fee: <span className='text-gray-600'>{currencySymbol}{docInfo?.fees}</span>
          </p>
        </div>
      </div>

      {/* ---------- Booking Slots ----------- */}
      <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
        <p>Booking slots</p>
        <div className='flex gap-3 items-center w-full overflow-x-scroll my-4'>
          {docSlots?.length > 0 && docSlots.map((item, index) => (
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
          {docSlots?.length > 0 && docSlots[slotIndex]?.map((item, index) => (
            <p 
              key={index} 
              onClick={() => setSlotTime(item.time)} 
              className={`text-sm font-light shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-primary text-white' : 'text-zinc-400 border border-zinc-300'}`}
            >
              {item.time.toLowerCase()}
            </p>
          ))}
        </div>

        <button 
          disabled={isBooking}
          onClick={bookAppointment} 
          className='bg-primary text-white text-sm cursor-pointer font-light px-14 py-3 rounded-full my-6 disabled:opacity-50'
        >
          {isBooking ? 'Booking...' : 'Book an appointment'}
        </button>
      </div>

      {/* Listing Related Doctors */}
      <RelatedDoctors docId={docId} speciality={docInfo?.speciality} />
    </div>
  ) : (
    <div className='flex justify-center items-center h-96'>
      <p className='text-gray-400 text-sm'>Loading doctor information...</p>
    </div>
  )
}

export default Appointment