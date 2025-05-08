import React from 'react'
import MainBanner from '../components/MainBanner'
import Categories from '../components/Categories'
import BestSeller from '../components/BestSeller'
import Bottombanner from '../components/Bottombanner'
import Newsletter from '../components/Newsletter'

const Home = () => {
  return (
    <div className='mt-10 '>
      <MainBanner/>
      <Categories/>
      <BestSeller/>
      <Bottombanner/>
      <Newsletter/>
    </div>
  )
}

export default Home
