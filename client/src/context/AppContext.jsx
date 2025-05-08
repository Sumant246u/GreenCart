import React, { useEffect } from 'react';
import { Children, createContext, useContext, useState } from 'react';
import {useNavigate} from 'react-router-dom'
import { dummyProducts } from '../assets/assets';
import  toast  from 'react-hot-toast';

export {createContext} from 'react';

export const AppContext=createContext();



export const AppContextProvider=({children})=>{

    const currency=import.meta.env.VITE_CURRENCY

    const navigate=useNavigate();
    const [user,setUser]=useState(null)
    const [isSeller,SetIsSeller]=useState(false)
    const [showUserLogin,setShowUserLogin]=useState(false)
    const [products,SetProducts]=useState([])

    const [cartItems,SetCartItems]=useState({})
    const [searchquery,SetSearchQuery]=useState({})

    //Fetch All product
    const fetchproducts=async ()=>{
        SetProducts(dummyProducts)
    }

    //Add product to Cart
    const addToCart=(itemId)=>{
        // structuredClone: Creates a deep copy of the current cart state so that you don't mutate the original cartItems directly (React state should never be mutated directly).
        let cartData=structuredClone(cartItems);

        if (cartData[itemId]) {
            cartData[itemId]+=1;
        }else{
            cartData[itemId]=1
        }
        SetCartItems(cartData);
        toast.success('Add to Cart')
    }

    //Update cart item quantity
    const updateCartitem=(itemId,quantity)=>{
        let cartData=structuredClone(cartItems);
        cartData[itemId]=quantity;
        SetCartItems(cartData)
        toast.success('Cart Updated')
    }

    //Remove product from cart
    const removeFromCart=(itemId)=>{
        let cartData=structuredClone(cartItems);
        if (cartData[itemId]) {
            cartData[itemId]-=1;
            if (cartData[itemId]===0) {
                delete cartData[itemId]
            }
        }
        toast.success('Removed from Cart')
        SetCartItems(cartData)
    }


    //Get Cart item Count
    const getCartCount=()=>{
        let totalCount=0;
        for(const item in cartItems){
            totalCount+=cartItems[item]
        }
        return totalCount;
    }

    //Get Cart Total Amount
    const getCartAmount=()=>{
        let TotalAmount=0;
        for(const items in cartItems){  //cartItems is expected to be an object where keys are product IDs and values are quantities
            let itemInfo=products.find((product)=>product._id===items)   //This searches for the full product details in the products array using the product ID (items).
            if (cartItems[items] >0) {  //This checks if the quantity of this item in the cart is greater than 0. Only positive quantities are included in the total.
                TotalAmount+=itemInfo.offerPrice * cartItems[items]    //This line multiplies the offer price of the product by the quantity in the cart and adds it to the running TotalAmount.
            }
        }
        return Math.floor(TotalAmount * 100)/100
    }



    useEffect(()=>{
        fetchproducts();
    },[])




    const value={navigate,user,setUser,SetIsSeller,isSeller,setShowUserLogin,showUserLogin,products,currency,updateCartitem,addToCart,removeFromCart,cartItems,searchquery,SetSearchQuery,getCartAmount,getCartCount}



    return <AppContext.Provider value={value}>
            {children}
         </AppContext.Provider>
}

export const useAppContext=()=>{
    return useContext(AppContext)
}

