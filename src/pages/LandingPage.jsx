import React from 'react'
import { Link } from 'react-router-dom'
import Menus from './Menus'

function LandingPage() {
  return (
    <div>
        <div className='flex items-center justify-between p-3'>
            <h1 className=' text-5xl '>MSV Restaurant</h1>
            <Link to="/login" className='bg-orange-500 text-white p-3 hover:bg-orange-400 block text-left rounded'>Login</Link>
        </div>
        
        <Menus/>
    </div>
  )
}

export default LandingPage