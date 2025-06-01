'use client';
import React from "react";
import Link from "next/link";
import Image from "next/image";

const SignUp = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-white text-black">
      {/* <img src="/1 (2).png" alt="bg-img" className="h-full w-full object-cover "/> */}
      <nav className="w-full h-20 flex items-center justify-between border-b px-4 md:px-8 lg:px-20">
        <Image
          src="/netflix2.svg"
          alt="Netflix Logo"
          width={180}
          height={50}
          className="w-24 md:w-32 lg:w-40"
          priority
        />
        <Link 
          href="/SignIn"
          className="text-black font-semibold text-lg md:text-xl hover:underline"
        >
          Sign In
        </Link>
      </nav>

      <main className="flex-1 w-full max-w-4xl mx-auto px-4 md:px-8 py-8 lg:py-12">
        <div className="space-y-8 lg:max-w-2xl lg:mx-auto">
          <div className="flex flex-col space-y-4 lg:text-center">
            <div className="lg:flex lg:justify-center">
              <Image
                src="/tick.svg"
                alt="Step indicator"
                width={40}
                height={40}
                className="w-10 h-10 md:w-12 md:h-12"
              />
            </div>
            <div className="space-y-2">
              <p className="text-lg">
                STEP <span className="font-bold">1</span> of 
                <span className="font-bold"> 3</span>
              </p>
              <h1 className="text-3xl md:text-4xl font-bold">
                Choose your plan.
              </h1>
            </div>
          </div>

          <div className="space-y-6 lg:max-w-xl lg:mx-auto ">
            {[
              "No commitments, cancel anytime.",
              "Everything on Netflix for one low price.",
              "No ads and no extra fees. Ever."
            ].map((text, index) => (
              <div key={index} className="flex items-start gap-4 lg:justify-center">
                <Image
                  src="/tick1.svg"
                  alt="Feature checkmark"
                  width={24}
                  height={24}
                  className="w-6 h-6 md:w-8 md:h-8 flex-shrink-0"
                />
                <p className="text-lg">{text}</p>
              </div>
            ))}
          </div>

          <div className="pt-8 lg:flex lg:justify-center">
            <Link href="/SignUp/1">
              <button 
                className="w-full md:w-auto bg-red-600 text-white font-semibold text-xl px-8 py-4 rounded hover:bg-red-700 transition-colors"
                aria-label="Continue to next step"
              >
                Next
              </button>
            </Link>
          </div>
        </div>
      </main>

      <footer className="border-t border-gray-300 bg-gray-100 py-8 px-4 md:px-8 lg:px-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-gray-500 mb-4">Questions? Contact us.</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-500">
            <Link href="/faq" className="hover:underline">FAQ</Link>
            <Link href="/help" className="hover:underline">Help Center</Link>
            <Link href="/terms" className="hover:underline">Terms of Use</Link>
            <Link href="/privacy" className="hover:underline">Privacy</Link>
            <Link href="/cookies" className="hover:underline">Cookie Preferences</Link>
            <Link href="/corporate" className="hover:underline">Corporate Information</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SignUp;
