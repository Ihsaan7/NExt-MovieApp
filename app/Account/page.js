'use client'
import React, { useState } from 'react'
import Link from 'next/link'

const Page = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('Account')

  const renderSection = () => {
    switch (activeSection) {
      case 'Account':
        return (
          <div>
            <header>
              <h2 className="px-5 pt-7 text-3xl font-bold md:text-4xl lg:text-5xl md:pl-20 lg:pl-55">Account</h2>
              <p className="p-2 px-5 text-sm md:text-base md:pl-20 lg:pl-55 text-gray-700 font-bold lg:mb-8">Membership Details</p>
            </header>
            <main className="flex flex-col mb-15">
              <div className="flex flex-col justify-center">
                <div className="border border-gray-300 rounded-lg w-[90%] md:w-[80%] lg:w-[78%] lg:mr-5 lg:self-end h-60 lg:h-70 self-center bg-white">
                  <h3 className=" w-56 lg:w-60  text-white font-bold text-xs  md:text-sm lg:h-8 lg:p-1 lg:pl-5 mt-4  pl-4  MemberC">
                    Member since February 2025
                  </h3>
                  <h2 className="p-4 pb-0 text-lg md:text-xl font-bold lg:text-2xl">Premium Plan</h2>
                  <h3 className="px-4 text-gray-600 text-sm md:text-base lg:text-lg">Next payment: 27 May 2025</h3>
                  <div className="flex gap-2 mb-5">
                    <img src="../mastercard.png" className="w-8 md:w-10 ml-4 lg:h-10 lg:mt-5" alt="Mastercard" />
                    <p className="pt-2 font-bold text-gray-600 text-sm md:text-base lg:mt-5">•••• •••• •••• 0000</p>
                  </div>
                  <div onClick={() => setActiveSection('Membership')}>
                    <div className='flex relative'>
                      <h2 className="border-t w-[90%] h-fit ml-4 p-5 text-sm md:text-md font-bold hover:cursor-pointer lg:text-xl">Manage Membership</h2>
                      <p className="absolute right-4 top-5 md:top-6 text-lg">▶</p>
                    </div>
                  </div>
                </div>
              </div>
              <h3 className="pt-5 pb-2 pl-5 font-bold text-sm md:text-base md:pl-20 lg:text-lg lg:pl-55 lg:mt-5">Quick Links</h3>
              <div className="w-[90%] md:w-[80%] h-fit border border-gray-300 rounded-lg border-black self-center bg-white lg:self-end lg:w-[78%] lg:mr-5 ">
                {[
                  { icon: '../plan.png', text: 'Change plan' },
                  { icon: '../payment.png', text: 'Manage payment method' },
                  { icon: '../pass.png', text: 'Update password' },
                  { icon: '../setting.png', text: 'Edit settings' },
                ].map((item, index) => (
                  item.text === 'Change plan' ? (
                    <Link href="/SignUp/1" key={index}>
                      <div className="flex p-4 relative lg:mb-4">
                        <img src={item.icon} className="w-8 h-8 md:w-10 md:h-10  " alt={item.text} />
                        <h4 className="border-b w-[90%] ml-4 pl-2 pb-2 font-bold text-sm md:text-base">{item.text}</h4>
                        <p className="absolute right-4 text-lg">▶</p>
                      </div>
                    </Link>
                  ) : (
                    <div className="flex p-4 relative lg:mb-4" key={index}>
                      <img src={item.icon} className="w-8 h-8 md:w-10 md:h-10" alt={item.text} />
                      <h4 className="border-b w-[90%] ml-4 pl-2 pb-2 font-bold text-sm md:text-base">{item.text}</h4>
                      <p className="absolute right-4 text-lg">▶</p>
                    </div>
                  )
                ))}
              </div>
            </main>
          </div>
        )
      case 'Security':
        return (
          <div>
            <header>
              <h2 className="px-5 pt-7 text-3xl font-bold md:text-4xl lg:text-5xl md:pl-20 lg:pl-55">Security</h2>
              <p className="p-2 px-5 text-sm md:text-base md:pl-20 lg:pl-55 font-bold text-gray-700 lg:mb-5">Accounts Details</p>
            </header>
            <main className="flex flex-col mb-15">
              <div className="flex flex-col justify-center">
                <div className="border rounded-lg w-[90%] md:w-[80%] lg:w-[60%] h-fit self-center border-gray-400">
                  {[
                    {
                      icon: '../pass.png',
                      title: 'Password',
                      top: 'top-65',
                    },
                    {
                      icon: '../mail.png',
                      title: 'Email',
                      subtitle: 'test.mail@gmail.com',
                      verified: true,
                      top: 'top-85',
                    },
                    {
                      icon: '../mobile.png',
                      title: 'Mobile phone',
                      subtitle: '+923 123 456 789',
                      top: 'top-105',
                    },
                  ].map((item, index) => (
                    <div key={index}>
                      <div className="flex relative lg:mb-5">
                        <img src={item.icon} className="w-8 h-8 md:w-10 md:h-10 m-4 mr-0 mb-3 " alt={item.title} />
                        <div>
                          <h2 className="h-fit pl-5 pt-4 text-sm md:text-md font-bold">{item.title}</h2>
                          {item.subtitle && (
                            <div>
                              <p className="pl-5 text-xs md:text-sm text-gray-600">{item.subtitle}</p>
                              {item.verified && (
                                <div className="flex mb-5">
                                  <img src="../tick1.svg" className="w-4 md:w-5 ml-4" alt="Verified" />
                                  <p className="text-xs md:text-sm pl-1">Verified</p>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                      {index < 2 && <div className="border w-[90%] ml-4 border-gray-400"></div>}
                    </div>
                  ))}
                </div>
              </div>
              <h3 className="pt-5 pb-2 pl-5 text-gray-600 text-sm md:text-base md:pl-20 lg:text-lg lg:mt-5 lg:pl-55">Access and Privacy</h3>
              <div className="flex flex-col justify-center ">
                <div className="border rounded-lg w-[90%] md:w-[80%] lg:w-[60%] h-fit self-center border-gray-400">
                  {[
                    {
                      icon: '../devices.png',
                      title: 'Access and Devices',
                      subtitle: 'Managed signed-in devices',
                      top: 'top-135',
                    },
                    {
                      icon: '../profileInfo.png',
                      title: 'Profile Transfer',
                      subtitle: 'Off',
                      top: 'top-150',
                    },
                    {
                      icon: '../safe.png',
                      title: 'Personal info access',
                      subtitle: 'Request a copy of your personal info',
                      top: 'top-170',
                    },
                    {
                      icon: '../lab.png',
                      title: 'Feature testing',
                      subtitle: 'On',
                      top: 'top-185',
                    },
                  ].map((item, index) => (
                    <div key={index}>
                      <div className="flex relative lg:mb-5">
                        <img src={item.icon} className="w-8 h-8 md:w-10 md:h-10 m-4 mr-0 mb-5" alt={item.title} />
                        <div className="mb-2">
                          <h2 className="pl-5 pt-4 text-sm md:text-md font-bold">{item.title}</h2>
                          <p className="text-xs md:text-sm ml-5 text-gray-600">{item.subtitle}</p>
                        </div>
                      </div>
                      {index < 3 && <div className="border w-[90%] ml-4 border-gray-400"></div>}
                    </div>
                  ))}
                </div>
              </div>
              <button className="border w-[90%] md:w-[80%] lg:w-[60%] ml-5 text-red-700 font-bold m-2 mt-4 p-2 rounded-sm border-red-700 lg:self-end lg:mr-50 hover:bg-gray-200 hover:cursor-pointer">
                Delete Account
              </button>
            </main>
          </div>
        )
      case 'Membership':
        return (
          <div>
            <header>
              <h2 className="px-5 pt-7 text-3xl font-bold md:text-4xl lg:text-5xl md:pl-20 lg:pl-55">Membership</h2>
              <p className="p-2 px-5 text-sm md:text-base md:pl-20 lg:pl-55 font-bold text-gray-700">Plan Details</p>
            </header>
            <main className="flex flex-col mb-15">
              <div className="flex flex-col justify-center">
                <div className="border rounded-lg w-[90%] md:w-[80%] lg:w-[60%] h-50 self-center lg:h-60 border-gray-400 bg-white">
                  <p className="border w-full h-2 bg-red-500 text-white font-bold text-sm border-red-500 lg:h-3 lg:rounded-tr-md lg:rounded-tl-md rounded-tr-xl rounded-tl-xl"></p>
                  <h2 className="p-4 pb-0 text-lg md:text-xl font-bold lg:text-2xl lg:mt-3">Premium Plan</h2>
                  <h3 className="px-4 text-gray-600 text-sm md:text-base mb-8 lg:text-lg">
                    4K video resolution with spatial audio, ad-free watching and more
                  </h3>
                  <Link href="/SignUp/1">
                    <div className="flex relative">
                      <h2 className="border-t w-[90%] h-fit ml-4 p-5 text-sm md:text-md font-bold lg:text-lg ">Change plan</h2>
                      <p className="absolute right-4 top-5 md:top-6 text-lg">▶</p>
                    </div>
                  </Link>
                </div>
              </div>
              <h3 className="pt-5 pb-2 pl-5 text-gray-600 text-sm md:text-base md:pl-20 lg:text-lg lg:pl-55 lg:mt-5">Payment info</h3>
              <div className="w-[90%] md:w-[80%] lg:w-[60%] h-fit border rounded-lg border-black self-center border-gray-400 bg-white">
                <div className="flex p-4 flex-col">
                  <h4 className="w-[90%] ml-1 text-lg md:text-xl pb-2 font-bold lg:text-2xl lg:ml-4">Next payment</h4>
                  <h3 className="px-1 text-gray-600 text-sm md:text-base lg:ml-4 lg:mb-3">27 May 2025</h3>
                  <div className="flex gap-2">
                    <img src="../mastercard.png" className="w-8 md:w-10 ml-1 lg:ml-4 lg:h-10" alt="Mastercard" />
                    <p className="pt-2 font-bold text-gray-600 text-sm md:text-base">•••• •••• •••• 0000</p>
                  </div>
                </div>
                {[
                  'Manage payment method',
                  'Redeem gift or promo code',
                  'View payment history',
                ].map((text, index) => (
                  <div className="flex p-4 relative" key={index}>
                    <h4 className={`border-b w-[90%] ml-4 pb-4 font-bold text-sm md:text-base ${index === 2 ? 'border-none' : 'border-gray-600'}`}>
                      {text}
                    </h4>
                  </div>
                ))}
              </div>
              <button className="border w-[90%] md:w-[80%] lg:w-[60%] ml-5 text-red-700 font-bold m-2 mt-4 p-2 rounded-sm border-red-700 lg:self-end lg:mr-50 hover:cursor-pointer hover:bg-gray-200">
                Cancel Membership
              </button>
            </main>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="text-black w-full h-fit">
      {/* Top Header (unchanged for all breakpoints) */}
      <div className="border-b-2 border-gray-300">
        <header className="bg-white flex justify-between px-2">
          <img src="../netflix.svg" className="w-20 md:w-25 h-18 md:h-20 mx-5" alt="Netflix Logo" />
          <div className="text-left">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex px-2 py-2 text-sm font-bold text-white rounded-md hover:cursor-pointer"
            >
              <img src="../profileB.png" className="w-8 md:w-10 mt-3" alt="Profile" />
            </button>
            {isOpen && (
              <div className="absolute right-4 md:right-8 w-48 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-10">
                <div className="py-1">
                  <Link
                    href="/Homepage"
                    className="block pl-4 py-2 font-bold text-sm md:text-base text-gray-700 hover:bg-gray-100"
                  >
                    ⬅ Back to Netflix
                  </Link>
                  <div className="border مسجدw-[80%] mx-4 border-gray-400"></div>
                  <Link
                    href="#"
                    className="block px-4 font-bold py-2 text-sm md:text-base text-gray-700 hover:bg-gray-100"
                  >
                    Profile Change
                  </Link>
                  <Link
                    href="/SignIn"
                    className="block px-4 font-bold py-2 text-sm md:text-base text-gray-700 hover:bg-gray-100"
                  >
                    Log Out
                  </Link>
                  <Link
                    href="#"
                    className="block px-4 py-2 font-bold text-sm md:text-base text-gray-700 hover:bg-gray-100"
                  >
                    Help Center
                  </Link>
                </div>
              </div>
            )}
          </div>
        </header>
      </div>
      {/* Main Layout */}
      <div className="flex flex-col md:flex-row min-h-screen Main">
        {/* Navbar */}
        <nav className="flex justify-between md:justify-start md:gap-5 px-4 py-2 font-bold border-b-2 border-gray-300 text-sm md:text-base md:flex-col md:w-48 md:border-b-0 md:pl-5 md:min-h-screen md:py-4 md:px-2">
          <Link
            href="/Homepage"
            className="py-2 font-bold text-sm md:text-base text-black hover:text-gray-600 md:pl-4 md:mb-4"
          >
            ⬅ Back to Netflix
          </Link>
          <Link
            href="#"
            onClick={() => setActiveSection('Account')}
            className={`py-2 ${activeSection === 'Account' ? 'border-b-2 border-red-700 text-gray-600' : 'text-gray-600'} md:border-b-0 md:border-l-4 md:border-red-700 md:pl-4 md:mb-2 hover:text-black`}
          >
            Account
          </Link>
          <Link
            href="#"
            onClick={() => setActiveSection('Membership')}
            className={`py-2 ${activeSection === 'Membership' ? 'border-b-2 border-red-700 text-gray-600' : 'text-gray-600'} md:border-b-0 md:border-l-4 md:border-red-700 md:pl-4 md:mb-2 hover:text-black`}
          >
            Membership
          </Link>
          <Link
            href="#"
            onClick={() => setActiveSection('Security')}
            className={`py-2 ${activeSection === 'Security' ? 'border-b-2 border-red-700 text-gray-600' : 'text-gray-600'} md:border-b-0 md:border-l-4 md:border-red-700 md:pl-4 md:mb-2 hover:text-black`}
          >
            Security
          </Link>
        </nav>
        {/* Content (Section only) */}
        <div className="flex-1 md:pl-4">
          <div>{renderSection()}</div>
        </div>
      </div>
      {/* Footer (moved outside the padded content div) */}
      <footer className="w-full h-full border-t border-gray-200 mb-5 md:mb-0">
        <div className="border-t h-full border-gray-300 text-gray-500 flex flex-col Foot">
          <h3 className="p-2 pt-5 text-black pl-5 lg:pl-10 font-bold text-sm md:text-base">
            Questions? <span className="underline hover:cursor-pointer">Contact us.</span>
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 p-2 pl-5 pr-0 lg:gap-3 lg:pl-10">
            {['FAQ', 'Help Center', 'Term of Use', 'Privacy', 'Cookie Preference', 'Corporate Information'].map((item, index) => (
              <p className="underline text-sm md:text-base" key={index}>{item}</p>
            ))}
          </div>
          <button className="border p-2 w-28 md:w-30 ml-5 mt-10 border-gray-400 text-black font-bold rounded-sm text-sm md:text-base md:mb-10 hover:cursor-pointer hover:bg-gray-300 lg:ml-10">
            Service Code
          </button>
        </div>
      </footer>
    </div>
  )
}

export default Page