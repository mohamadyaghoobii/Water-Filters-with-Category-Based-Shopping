import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'

const Home = () => {
  return (
    <div>
      <CategoryList/>
      <BannerProduct/>
      

      <HorizontalCardProduct category={"دستگاه تصفیه"} heading={"پرفروش های دستگاه تصفیه"}/>
      <HorizontalCardProduct category={"فیلترها"} heading={"پرفروش های فیلتر ها"}/>

      <VerticalCardProduct category={ "لوازم جانبی"} heading={ "پرفروش های لوازم جانبی"}/>
    
      
    </div>
  )
}

export default Home