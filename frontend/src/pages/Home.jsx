import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import Hero from '../components/Header'
import Login from './Login' // Or redirect component

const Home = () => {
  const { token } = useContext(AppContext)

  return (
    <div>
      {token ? (
        <>
          <Header />
     <div>
      <Header />
      <SpecialityMenu />
      <TopDoctors />
      <Banner />
    </div>
        </>
      ) : (
        <Login />
      )}
    </div>
  )
}

export default Home