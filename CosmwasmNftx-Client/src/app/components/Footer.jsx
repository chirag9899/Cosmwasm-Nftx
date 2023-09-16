"use client"
import React from 'react'
import Logo from "../assets/logo.png"


const Footer = () => {
  return (
    <div>
        <div className="bg-gradient-to-r from-transparent to-transparent via-gray-500  h-px my-10 z-50"></div>
    <div className='flex flex-col flex-1 justify-center gap-6'>
         <div className="w-full flex  justify-center">

      <img className='h-16 w-16' src={Logo.src} alt="" />
      </div>
        <li className='flex text-sm font-light gap-10 justify-center text-start'>
            <a href="">Research</a>
            <a href="">Discord</a>
            <a href="">Manage</a>
            <a href="">Documentation</a>
            <a href="">Contact Us</a>
        </li>
    </div>
    <div className=' '>
        <a className='flex justify-center text-slate-200 font-extralight p-4 mt-6'>Created By CS</a>
    </div>
    </div>
  )
}

export default Footer