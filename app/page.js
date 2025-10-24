'use client';
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setEmailError('Please enter a valid email address');
      return;
    }
    setEmailError('');
    localStorage.setItem("signupEmail", email);
    router.push("/SignUp/1");
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/1 (2).png"
          alt="Netflix background"
          fill
          priority
          className="object-cover object-center"
          quality={85}
          sizes="100vw"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />
      </div>

      {/* Navigation */}
      <nav className="relative z-20 flex justify-between items-center px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20 py-4 md:py-6">
        <div className="flex-shrink-0">
          <Image
            src="/netflix.svg"
            alt="Netflix Logo"
            width={148}
            height={40}
            className="w-20 sm:w-24 md:w-28 lg:w-32 xl:w-36 h-auto"
            priority
          />
        </div>
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
          <div className="relative">
            <select
              id="language-select"
              className="bg-black/50 text-white border border-gray-400/60 rounded px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm focus:ring-2 focus:ring-red-500 focus:outline-none cursor-pointer backdrop-blur-sm"
              aria-label="Select language"
            >
              <option value="en" className="bg-gray-900 text-white">🌐 English</option>
              <option value="fr" className="bg-gray-900 text-white">Français</option>
              <option value="hi" className="bg-gray-900 text-white">हिंदी</option>
              <option value="de" className="bg-gray-900 text-white">Deutsch</option>
            </select>
          </div>
          <Link
            href="/SignIn"
            className="bg-red-600 text-white px-3 sm:px-4 py-1 sm:py-1.5 rounded text-xs sm:text-sm font-medium hover:bg-red-700 transition-colors duration-200 whitespace-nowrap"
          >
            Sign In
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-80px)] px-4 sm:px-6 md:px-8">
        <div className="text-center max-w-4xl w-full">
          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 md:mb-6 leading-tight">
            Unlimited movies, TV shows, and more
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/90 mb-4 md:mb-6 font-normal">
            Watch anywhere. Cancel anytime.
          </p>

          {/* Ready to watch text */}
          <p className="text-base sm:text-lg md:text-xl text-white/80 mb-6 md:mb-8">
            Ready to watch? Enter your email to create or restart your membership.
          </p>

          {/* Email Form */}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 sm:gap-2 justify-center items-stretch sm:items-start max-w-2xl mx-auto">
            <div className="flex-1 sm:max-w-md">
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError('');
                }}
                className="w-full px-4 py-3 md:py-4 text-base md:text-lg text-black bg-white/95 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:outline-none placeholder-gray-500 transition-all duration-200"
                required
                aria-invalid={emailError ? 'true' : 'false'}
                aria-describedby={emailError ? 'email-error' : undefined}
              />
              {emailError && (
                <p id="email-error" className="text-red-400 text-sm mt-2 text-left">
                  {emailError}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="bg-red-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-md text-base md:text-lg font-semibold hover:bg-red-700 transition-colors duration-200 whitespace-nowrap flex items-center justify-center gap-2 min-w-[140px] sm:min-w-[160px]"
            >
              Get Started
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}