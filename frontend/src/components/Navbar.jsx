import React from 'react'
import {assets} from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'



const Navbar = () => {

   const navigate = useNavigate()

   const [showMenu, setShowMenu] = useState(false)
   const [token, setToken] = useState(true)

  return (
    <div className='flex items-center justify-between py-4 mb-5 border-b border-b-gray-400'>
       <img onClick={() => navigate('/')} className='w-32 cursor-pointer' src={assets.logo} alt="Logo"  />
       <ul className='hidden md:flex items-center gap-4 text-sm font-medium cursor-pointer'>
        <NavLink  to='/'>
            <li className='py-1'>HOME</li>
            <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
        </NavLink> 

        <NavLink to='/doctors'>
            <li className='py-1'>ALL DOCTORS</li>
            <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
        </NavLink>   

        <NavLink to='/about'>
            <li className='py-1'>ABOUT</li>
            <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
        </NavLink>        
        
        <NavLink to='/contact'>
            <li className='py-1'>CONTACT</li>
            <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
        </NavLink>
       </ul>
       <div className='flex items-center gap-4'>
        {
            token 
            ? <div className='flex items-center gap-2 cursor-pointer group relative'>
                <img src={assets.profile_pic} alt="User" className='w-8 h-8 rounded-full' />
                <img src={assets.dropdown_icon} alt="User" className='w-2.5 h-2.5 rounded-full' />
                <div className='absolute top-0 right-0 pt-13 z-20 font-medium hidden group-hover:block'>
                    <div className=' min-w-49 bg-stone-100 py-2 px-4 flex flex-col gap-2 '>
                        <p onClick={() => navigate('/my-profile')} className='hover:bg-gray-200 p-2 cursor-pointer'>My Profile</p>
                        <p onClick={() => navigate('/my-appointments')} className='hover:bg-gray-200 p-2 cursor-pointer'>My Appointments</p>
                        <p onClick={() => setToken(false)} className='hover:bg-gray-200 p-2 cursor-pointer'>Logout</p>
                    </div>
                </div>
            </div>
            :<button onClick={() => navigate('/login')} className='bg-primary text-white py-2 px-4 rounded-full font-light '>Create Account</button>
        }  
        <img onClick={()=>setShowMenu(true)} className='w-6 md:hidden' src={assets.menu_icon} alt="" />
        {/*--------Mobile Menu-------*/}
        <div className={`${showMenu ? 'fixed w-full h-full' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
            <div className='flex items-center justify-between px-5 py-6'>
                <img className='w-36' src={assets.logo} alt="" />
                <img className='w-7' onClick={()=>setShowMenu(false)} src={assets.cross_icon} alt="" />
            </div>
            <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
                <NavLink className='px-4 py-2 rounded inline-block' onClick={()=>setShowMenu(false)} to='/'>Home</NavLink>
                <NavLink className='px-4 py-2 rounded inline-block' onClick={()=>setShowMenu(false)} to='/doctors'>All Doctors</NavLink>
                <NavLink className='px-4 py-2 rounded inline-block' onClick={()=>setShowMenu(false)} to='/about'>About</NavLink>
                <NavLink className='px-4 py-2 rounded inline-block' onClick={()=>setShowMenu(false)} to='/contact'>Contact</NavLink>
            </ul>
        </div>
       </div>
    </div>
  )
}

export default Navbar