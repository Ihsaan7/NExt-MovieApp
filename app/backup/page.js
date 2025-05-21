'use client'
import React, { useState } from 'react'
import Link from 'next/link'

const page = () => {
    const [isOpen , setIsOpen]= useState (false)

  return (
    <div className='bg-white text-black w-full h-fit'>
      <div className='border-b border-black'>
          <header className='flex justify-between px-2'>
            <img src="./netflix.svg" className="w-25 h-20 mx-5"/>
                <div className=" text-left">
                 <button
                   onClick={() => setIsOpen(!isOpen)}
                   className="flex px-2 py-2 text-sm font-bold text-white rounded-md hover:bg-blue-700"
                 >
                   <img src='../profileB.png' className='w-10 mt-3'></img>
                 </button>
                 {isOpen && (
                   <div className="absolute right-0 left-50  w-48 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                     <div className="py-1">
                      <div>

                       <Link href="/Homepage" className="block pl-4 py-2 font-bold text-sm text-gray-700 hover:bg-gray-100">
  ⬅ Back to Netflix
</Link>
<div className='border w-[80%] mx-4 border-gray-400 border-black'></div>
</div>
<Link href="#" className="block px-4 font-bold py-2 text-sm text-gray-700 hover:bg-gray-100">
  Profile Change
</Link>
<Link href="/SignIn" className="block px-4 font-bold py-2 text-sm text-gray-700 hover:bg-gray-100">
  Log Out
</Link>
<Link href="#" className="block px-4 py-2 font-bold text-sm text-gray-700 hover:bg-gray-100">
  Help Center
</Link>


                     </div>
                   </div>
                 )}
               </div>
          </header>
      </div>
      <div>
        <nav className='flex justify-between px-4 py-2 font-bold border-b border-black'>
          <Link href='#'>Overview</Link>
          <Link href='#'>Membership</Link>
          <Link href='#'>Security</Link>
        </nav>
      </div>
      <div className=''>
        <header>
          <h2 className='px-5 pt-7 text-4xl font-bold'>Account</h2>
          <p className='p-2 px-5'>Membership Details</p>
        </header>
        <main className='flex flex-col mb-15'>
          <div className='flex flex-col justify-center'>
          <div className='border rounded-lg w-[90%] h-60 self-center '>
            <h3 className='border w-55 bg-red-500 text-white font-bold text-sm mt-4 border-red-500 rounded-tr-xl pl-4 rounded-br-xl'>Member since February 2025</h3>
            <h2 className='p-4 pb-0 text-lg font-bold'>Premium Plan</h2>
            <h3 className='px-4 text-gray-600'>Next payment: 27 May 2025</h3>
            <div className='flex gap-2 mb-5'>
              <img src='../mastercard.png' className='w-10 ml-4'></img>
              <p className='pt-2 font-bold text-gray-600'>•••• •••• •••• 0000</p>
          </div>
          <div className='flex'>
          <h2 className='border-t w-[90%] h-fit ml-4 p-5 text-md font-bold '>Manage Membership </h2>
          <p className='absolute left-85 top-105'>▶</p>
          </div>
          </div>
          </div>
          <h3 className='pt-5 pb-2 pl-5 font-bold'>Quick Links</h3>
          <div className='w-[90%] h-fit border rounded-lg border-black self-center'>
            <div className='flex p-4'>
              <img src='../plan.png' className='w-8 h-8'></img>
              <h4 className="border-b  w-[90%] ml-4 pl-2  pb-2 font-bold">Change plan</h4>
              <p className='absolute left-85'>▶</p>
            </div>
            <div className='flex p-4'>
              <img src='../payment.png' className='w-8 h-8'></img>
              <h4 className="border-b  w-[90%] ml-4 pl-2  pb-2 font-bold">Manage payment method</h4>
              <p className='absolute left-85'>▶</p>
            </div>
            <div className='flex p-4'>
              <img src='../pass.png' className='w-8 h-8'></img>
              <h4 className="border-b  w-[90%] ml-4 pl-2  pb-2 font-bold">Update password</h4>
              <p className='absolute left-85'>▶</p>
            </div>
            <div className='flex p-4'>
              <img src='../setting.png' className='w-8 h-8 '></img>
             <h4 className=" w-[90%] ml-4 pl-2  pb-2 font-bold">Edit settings</h4>
              <p className='absolute left-85'>▶</p>
            </div>
          </div>
        </main>
        <footer className='w-full h-100 border-t '>
        <div className="border-t h-full border-gray-300 text-gray-500 flex flex-col bg-gray-200">
        <h3 className="p-2 pt-5 text-black pl-5 lg:pl-10 font-bold">Questions? <span className='underline'>Contact us.</span></h3>
        <div class="grid grid-cols-3 grid-rows-2 gap-2 p-2 pl-5 pr-0 lg:gap-3 lg:pl-30">
          <p className='underline'>FAQ</p>
          <p className='underline'>Help Center</p>
          <p className='underline'>Term of Use</p>
          <p className='underline'>Privacy</p>
          <p className='underline'>Cookie Preference</p>
          <p className='underline'>Corporate Information</p>
        </div>
        <button className='border p-2 w-30 ml-5 mt-10 border-black text-black font-bold rounded-sm'>
          Service Code
        </button>
      </div>
        </footer>
      </div>
    </div>
  )
}

export default page