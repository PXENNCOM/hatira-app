import React from 'react'
import Header from '../Components/Header/İndex'
import OnderNavigation from '../Components/OnderNavigation/OnderNavigation'
import Mobilİmageİnput from '../GenerateImagePage/mobilgenerateimageİnput'
import '../../App.css'
const HomePage = () => {
  return (
    <div className='homeContainer'>
      <Header />
      <OnderNavigation />
      <Mobilİmageİnput />
    </div>
  )
}

export default HomePage