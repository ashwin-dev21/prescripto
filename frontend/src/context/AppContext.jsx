import { createContext, useState, useEffect } from 'react'
import { doctors } from '../assets/assets'

export const AppContext = createContext()

const AppContextProvider = (props) => {

    const currencySymbol = '$'
    
    // Read Vite environment variable (or fallback to port 8000)
    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
    
    // Initialize token state from localStorage
    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : false)

    const value = {
        doctors,
        currencySymbol,
        backendUrl,
        token,
        setToken
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider