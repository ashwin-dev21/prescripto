import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu' // Fix the name here
import Login from './Login'

const Home = () => {
  const { token } = useContext(AppContext)

  return (
    <div>
      {token ? (
        <>
          <Header />
          <SpecialityMenu />
        </>
      ) : (
        <Login />
      )}
    </div>
  )
}

export default Home