'use client'
import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { supabase } from '../lib/supabase'
import { useRouter } from 'next/navigation'

const Page = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('Account')
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const router = useRouter()
  const profileMenuRef = useRef(null)

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
          router.push('/SignIn')
          return
        }
        setUser(user)
      } catch (error) {
        console.error('Error fetching user:', error)
        router.push('/SignIn')
      } finally {
        setLoading(false)
      }
    }
    getUser()

    // Load theme preference
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark') {
      setIsDarkMode(true)
    }
  }, [router])

  // Click outside handler for profile menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut()
      router.push('/SignIn')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  const toggleTheme = () => {
    const newTheme = !isDarkMode
    setIsDarkMode(newTheme)
    localStorage.setItem('theme', newTheme ? 'dark' : 'light')
  }

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-neutral-950' : 'bg-gray-50'}`}>
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className={`font-netflix ${isDarkMode ? 'text-neutral-300' : 'text-gray-600'}`}>Loading...</p>
        </div>
      </div>
    )
  }

  const renderSection = () => {
    switch (activeSection) {
      case 'Account':
        return (
          <div className="max-w-4xl mx-auto">
            <header className="mb-8">
              <h1 className={`text-3xl sm:text-4xl font-netflix-bold mb-2 transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>Account</h1>
              <p className={`font-netflix transition-colors duration-300 ${
                isDarkMode ? 'text-neutral-400' : 'text-gray-600'
              }`}>Membership Details</p>
            </header>

            <main className="space-y-8">
              {/* Membership Card */}
              <div className={`rounded-lg shadow-sm border overflow-hidden transition-colors duration-300 ${
                isDarkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-gray-200'
              }`}>
                <div className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-3">
                  <p className="text-white font-netflix text-sm">
                    Member since {user?.created_at ? new Date(user.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'February 2025'}
                  </p>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className={`text-2xl font-netflix-bold mb-2 transition-colors duration-300 ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>Premium Plan</h2>
                      <p className={`font-netflix transition-colors duration-300 ${
                        isDarkMode ? 'text-neutral-400' : 'text-gray-600'
                      }`}>Next payment: 27 May 2025</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-2xl font-netflix-bold transition-colors duration-300 ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>PKR 1,100</p>
                      <p className={`text-sm transition-colors duration-300 ${
                        isDarkMode ? 'text-neutral-500' : 'text-gray-500'
                      }`}>per month</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-6 bg-gradient-to-r from-orange-400 to-red-500 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">MC</span>
                    </div>
                    <p className={`font-netflix transition-colors duration-300 ${
                      isDarkMode ? 'text-neutral-300' : 'text-gray-700'
                    }`}>•••• •••• •••• 0000</p>
                  </div>

                  <button 
                    onClick={() => setActiveSection('Membership')}
                    className={`w-full border-t pt-4 flex items-center justify-between text-left transition-colors duration-200 group ${
                      isDarkMode ? 'border-neutral-800 hover:bg-neutral-800/50' : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <span className={`font-netflix-bold transition-colors duration-300 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>Manage Membership</span>
                    <svg className={`w-5 h-5 transition-colors duration-200 ${
                      isDarkMode ? 'text-neutral-400 group-hover:text-neutral-300' : 'text-gray-400 group-hover:text-gray-600'
                    }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className={`text-lg font-netflix-bold mb-4 transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>Quick Links</h3>
                <div className={`rounded-lg shadow-sm border divide-y transition-colors duration-300 ${
                  isDarkMode ? 'bg-neutral-900 border-neutral-800 divide-neutral-800' : 'bg-white border-gray-200 divide-gray-200'
                }`}>
                  {[
                    { 
                      icon: (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      ), 
                      text: 'Change plan', 
                      href: '/SignUp/1' 
                    },
                    { 
                      icon: (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                      ), 
                      text: 'Manage payment method' 
                    },
                    { 
                      icon: (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      ), 
                      text: 'Update password' 
                    },
                    { 
                      icon: (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      ), 
                      text: 'Edit settings' 
                    },
                  ].map((item, index) => (
                    item.href ? (
                      <Link href={item.href} key={index}>
                        <div className={`flex items-center justify-between p-4 transition-colors duration-200 group ${
                          isDarkMode ? 'hover:bg-neutral-800/50' : 'hover:bg-gray-50'
                        }`}>
                          <div className="flex items-center gap-4">
                            <div className={`transition-colors duration-200 ${
                              isDarkMode ? 'text-neutral-400 group-hover:text-neutral-300' : 'text-gray-400 group-hover:text-gray-600'
                            }`}>
                              {item.icon}
                            </div>
                            <span className={`font-netflix transition-colors duration-300 ${
                              isDarkMode ? 'text-white' : 'text-gray-900'
                            }`}>{item.text}</span>
                          </div>
                          <svg className={`w-5 h-5 transition-colors duration-200 ${
                            isDarkMode ? 'text-neutral-400 group-hover:text-neutral-300' : 'text-gray-400 group-hover:text-gray-600'
                          }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </Link>
                    ) : (
                      <button key={index} className={`w-full flex items-center justify-between p-4 transition-colors duration-200 group text-left ${
                        isDarkMode ? 'hover:bg-neutral-800/50' : 'hover:bg-gray-50'
                      }`}>
                        <div className="flex items-center gap-4">
                          <div className={`transition-colors duration-200 ${
                            isDarkMode ? 'text-neutral-400 group-hover:text-neutral-300' : 'text-gray-400 group-hover:text-gray-600'
                          }`}>
                            {item.icon}
                          </div>
                          <span className={`font-netflix transition-colors duration-300 ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}>{item.text}</span>
                        </div>
                        <svg className={`w-5 h-5 transition-colors duration-200 ${
                          isDarkMode ? 'text-neutral-400 group-hover:text-neutral-300' : 'text-gray-400 group-hover:text-gray-600'
                        }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    )
                  ))}
                </div>
              </div>
            </main>
          </div>
        )
      case 'Security':
        return (
          <div className="max-w-4xl mx-auto">
            <header className="mb-8">
              <h1 className={`text-3xl sm:text-4xl font-netflix-bold mb-2 transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>Security</h1>
              <p className={`font-netflix transition-colors duration-300 ${
                isDarkMode ? 'text-neutral-400' : 'text-gray-600'
              }`}>Account Details</p>
            </header>

            <main className="space-y-8">
              {/* Account Security */}
              <div className={`rounded-lg shadow-sm border divide-y transition-colors duration-300 ${
                isDarkMode ? 'bg-neutral-900 border-neutral-800 divide-neutral-800' : 'bg-white border-gray-200 divide-gray-200'
              }`}>
                {[
                  {
                    icon: (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    ),
                    title: 'Password',
                    subtitle: 'Last updated 3 months ago',
                  },
                  {
                    icon: (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    ),
                    title: 'Email',
                    subtitle: user?.email || 'test.mail@gmail.com',
                    verified: true,
                  },
                  {
                    icon: (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    ),
                    title: 'Mobile phone',
                    subtitle: '+923 123 456 789',
                  },
                ].map((item, index) => (
                  <div key={index} className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`mt-1 transition-colors duration-300 ${
                        isDarkMode ? 'text-neutral-400' : 'text-gray-400'
                      }`}>
                        {item.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className={`font-netflix-bold mb-1 transition-colors duration-300 ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>{item.title}</h3>
                        <p className={`font-netflix text-sm transition-colors duration-300 ${
                          isDarkMode ? 'text-neutral-400' : 'text-gray-600'
                        }`}>{item.subtitle}</p>
                        {item.verified && (
                          <div className="flex items-center gap-2 mt-2">
                            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-green-500 text-sm font-netflix">Verified</span>
                          </div>
                        )}
                      </div>
                      <button className={`transition-colors duration-200 ${
                        isDarkMode ? 'text-neutral-400 hover:text-neutral-300' : 'text-gray-400 hover:text-gray-600'
                      }`}>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Danger Zone */}
              <div className={`border rounded-lg p-6 transition-colors duration-300 ${
                isDarkMode ? 'bg-red-950/20 border-red-900/50' : 'bg-red-50 border-red-200'
              }`}>
                <h3 className={`text-lg font-netflix-bold mb-2 transition-colors duration-300 ${
                  isDarkMode ? 'text-red-400' : 'text-red-900'
                }`}>Danger Zone</h3>
                <p className={`font-netflix text-sm mb-4 transition-colors duration-300 ${
                  isDarkMode ? 'text-red-300' : 'text-red-700'
                }`}>
                  Once you delete your account, there is no going back. Please be certain.
                </p>
                <button className="bg-red-600 text-white px-6 py-2 rounded-md font-netflix hover:bg-red-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                  Delete Account
                </button>
              </div>
            </main>
          </div>
        )
      case 'Membership':
        return (
          <div className="max-w-4xl mx-auto">
            <header className="mb-8">
              <h1 className={`text-3xl sm:text-4xl font-netflix-bold mb-2 transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>Membership</h1>
              <p className={`font-netflix transition-colors duration-300 ${
                isDarkMode ? 'text-neutral-400' : 'text-gray-600'
              }`}>Plan Details</p>
            </header>

            <main className="space-y-8">
              {/* Current Plan */}
              <div className={`rounded-lg shadow-sm border overflow-hidden transition-colors duration-300 ${
                isDarkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-gray-200'
              }`}>
                <div className="h-1 bg-red-600"></div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className={`text-2xl font-netflix-bold mb-2 transition-colors duration-300 ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>Premium Plan</h2>
                      <p className={`font-netflix transition-colors duration-300 ${
                        isDarkMode ? 'text-neutral-400' : 'text-gray-600'
                      }`}>
                        4K video resolution with spatial audio, ad-free watching and more
                      </p>
                    </div>
                    <div className="text-right">
                      <p className={`text-2xl font-netflix-bold transition-colors duration-300 ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>PKR 1,100</p>
                      <p className={`text-sm transition-colors duration-300 ${
                        isDarkMode ? 'text-neutral-500' : 'text-gray-500'
                      }`}>per month</p>
                    </div>
                  </div>

                  <Link href="/SignUp/1">
                    <button className={`w-full border-t pt-4 flex items-center justify-between text-left transition-colors duration-200 group ${
                      isDarkMode ? 'border-neutral-800 hover:bg-neutral-800/50' : 'border-gray-200 hover:bg-gray-50'
                    }`}>
                      <span className={`font-netflix-bold transition-colors duration-300 ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>Change plan</span>
                      <svg className={`w-5 h-5 transition-colors duration-200 ${
                        isDarkMode ? 'text-neutral-400 group-hover:text-neutral-300' : 'text-gray-400 group-hover:text-gray-600'
                      }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </Link>
                </div>
              </div>

              {/* Cancel Membership */}
              <div className={`border rounded-lg p-6 transition-colors duration-300 ${
                isDarkMode ? 'bg-red-950/20 border-red-900/50' : 'bg-red-50 border-red-200'
              }`}>
                <h3 className={`text-lg font-netflix-bold mb-2 transition-colors duration-300 ${
                  isDarkMode ? 'text-red-400' : 'text-red-900'
                }`}>Cancel Membership</h3>
                <p className={`font-netflix text-sm mb-4 transition-colors duration-300 ${
                  isDarkMode ? 'text-red-300' : 'text-red-700'
                }`}>
                  You can cancel your membership at any time. Your account will remain active until the end of your current billing period.
                </p>
                <button className="bg-red-600 text-white px-6 py-2 rounded-md font-netflix hover:bg-red-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                  Cancel Membership
                </button>
              </div>
            </main>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-neutral-950' : 'bg-gray-50'}`}>
      {/* Header */}
      <header className={`border-b sticky top-0 z-40 transition-colors duration-300 ${
        isDarkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/Homepage">
              <Image
                src="/netflix.svg"
                alt="Netflix Logo"
                width={148}
                height={40}
                className="h-10 w-auto sm:h-12 sm:w-auto"
                priority
              />
            </Link>
            
            <div className="flex items-center gap-4">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full transition-colors duration-200 ${
                  isDarkMode ? 'hover:bg-neutral-800 text-neutral-300 hover:text-white' : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                }`}
                aria-label="Toggle theme"
              >
                {isDarkMode ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>

              {/* Profile Menu */}
              <div className="relative" ref={profileMenuRef}>
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className={`flex items-center gap-2 p-2 rounded-full transition-colors duration-200 ${
                    isDarkMode ? 'hover:bg-neutral-800' : 'hover:bg-gray-100'
                  }`}
                  aria-expanded={isOpen}
                >
                  <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">
                      {user?.email?.charAt(0).toUpperCase() || 'U'}
                    </span>
                  </div>
                  <svg className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''} ${
                    isDarkMode ? 'text-neutral-300' : 'text-gray-600'
                  }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {isOpen && (
                  <div className={`absolute top-full right-0 mt-2 w-48 rounded-md shadow-lg border z-50 transition-colors duration-300 ${
                    isDarkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-gray-200'
                  }`}>
                    <div className="py-2">
                      <Link
                        href="/Homepage"
                        className={`block px-4 py-2 text-sm transition-colors duration-200 font-netflix ${
                          isDarkMode ? 'text-neutral-300 hover:bg-neutral-800 hover:text-white' : 'text-gray-700 hover:bg-gray-100'
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        ← Back to Netflix
                      </Link>
                      <div className={`border-t my-2 ${isDarkMode ? 'border-neutral-800' : 'border-gray-200'}`}></div>
                      <button
                        onClick={handleSignOut}
                        className={`block w-full text-left px-4 py-2 text-sm transition-colors duration-200 font-netflix ${
                          isDarkMode ? 'text-neutral-300 hover:bg-neutral-800 hover:text-white' : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        Sign Out
                      </button>
                      <Link
                        href="#"
                        className={`block px-4 py-2 text-sm transition-colors duration-200 font-netflix ${
                          isDarkMode ? 'text-neutral-300 hover:bg-neutral-800 hover:text-white' : 'text-gray-700 hover:bg-gray-100'
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        Help Center
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <nav className="lg:w-64 flex-shrink-0">
            <div className={`rounded-lg shadow-sm border p-6 transition-colors duration-300 ${
              isDarkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-gray-200'
            }`}>
              <Link
                href="/Homepage"
                className={`flex items-center gap-2 transition-colors duration-200 font-netflix mb-6 ${
                  isDarkMode ? 'text-neutral-400 hover:text-neutral-200' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Netflix
              </Link>
              
              <div className="space-y-2">
                {[
                  { key: 'Account', label: 'Account', icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  )},
                  { key: 'Membership', label: 'Membership', icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  )},
                  { key: 'Security', label: 'Security', icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  )},
                ].map((item) => (
                  <button
                    key={item.key}
                    onClick={() => setActiveSection(item.key)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors duration-200 font-netflix ${
                      activeSection === item.key
                        ? isDarkMode 
                          ? 'bg-red-950/30 text-red-400 border-l-4 border-red-500'
                          : 'bg-red-50 text-red-700 border-l-4 border-red-600'
                        : isDarkMode
                          ? 'text-neutral-300 hover:bg-neutral-800/50 hover:text-white'
                          : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <div className={
                      activeSection === item.key 
                        ? isDarkMode ? 'text-red-400' : 'text-red-600'
                        : isDarkMode ? 'text-neutral-500' : 'text-gray-400'
                    }>
                      {item.icon}
                    </div>
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </nav>

          {/* Main Content */}
          <main className="flex-1">
            {renderSection()}
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className={`border-t mt-16 transition-colors duration-300 ${
        isDarkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <h3 className={`font-netflix-bold mb-2 transition-colors duration-300 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Questions? <Link href="#" className="text-red-600 hover:underline">Contact us.</Link>
            </h3>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            {['FAQ', 'Help Center', 'Terms of Use', 'Privacy', 'Cookie Preferences', 'Corporate Information'].map((item, index) => (
              <Link key={index} href="#" className={`text-sm font-netflix hover:underline transition-colors duration-200 ${
                isDarkMode ? 'text-neutral-400 hover:text-neutral-200' : 'text-gray-600 hover:text-gray-900'
              }`}>
                {item}
              </Link>
            ))}
          </div>
          
          <button className={`border px-4 py-2 rounded font-netflix text-sm transition-colors duration-200 ${
            isDarkMode 
              ? 'border-neutral-700 text-neutral-300 hover:bg-neutral-800 hover:text-white' 
              : 'border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}>
            Service Code
          </button>
        </div>
      </footer>
    </div>
  )
}

export default Page