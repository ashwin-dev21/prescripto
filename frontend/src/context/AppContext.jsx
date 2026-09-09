import { createContext, useState, useEffect } from 'react'
import { doctors } from '../assets/assets'

export const AppContext = createContext()

const AppContextProvider = (props) => {
    const currencySymbol = '$'
    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
    
    // Read stored token directly during initialization
    const [token, setToken] = useState(localStorage.getItem('token') || false)

    // Ensure localStorage stays updated when token changes
    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token)
        } else {
            localStorage.removeItem('token')
        }
    }, [token])

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