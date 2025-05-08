import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import ProductCard from '../components/ProductCard';

const Allproduct = () => {

    const {products,searchquery}=useAppContext();
    const [filterproduct,SetFilterProduct]=useState([])


    useEffect(()=>{

        // This checks if the user has typed something into the search bar.
        //If the search query is not empty, then it means we should filter the product list.
        if (searchquery.length>0){ 
            SetFilterProduct(products.filter(
              product=>product.name.toLowerCase().includes(searchquery.toLowerCase())
            ))}else{
                SetFilterProduct(products)   //If the search query is empty, show all products again by setting SetFilter(products) (i.e., reset filter).
            }
               
    },[products,searchquery])

  return (
    <div className='mt-16 flex flex-col'>
      <div>
        <p className='text-2xl font-medium uppercase'>All Prroducts</p>
        {/* -----for bottom border----- */}
        <div className='w-16 h-0.5 bg-primary rounded-full'></div> 
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-2  md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6'>
        {filterproduct.filter((product)=>product.inStock).map((product,index)=>(
            <ProductCard key={index} product={product}/>
        ))}
      </div>
    </div>
  )
}

export default Allproduct
