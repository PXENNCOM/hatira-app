import React from 'react'
import './still.css'
import Logo66 from '../../../assets/onder_66.png'

import { FaPlay } from "react-icons/fa";


const İndex = () => {
  return (
    <div className='headerContainer'>
        <img src="https://www.ulastirmamemursen.org.tr/images/logo.png" alt="Önder 66 Yıl..." />
        <div className='play-icon-section'>
            <a className='play-icon' href="https://www.youtube.com/watch?v=JyRrfaspLoA"><FaPlay /></a>
        </div>
    </div>
  )
}

export default İndex