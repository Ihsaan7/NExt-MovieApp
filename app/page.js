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
    <div className="relative min-h-screen">
      <Image 
        src="/1 (2).png" 
        alt="Netflix background" 
        fill
        priority
        className="object-cover"
        quality={100}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/100 via-transparent to-black/100" />
      
      <nav className="absolute z-10 top-0 left-0 w-full flex justify-between items-center px-4 md:px-8 lg:px-20 py-4">
        <Image 
          src="/netflix.svg" 
          alt="Netflix Logo" 
          width={180}
          height={50}
          className="w-24 md:w-32 lg:w-40"
          priority
        />
        <div className="flex items-center gap-4">
          <div className="relative">
            <select
              id="language-select"
              className="bg-transparent text-white border border-gray-500 rounded px-3 py-1.5 text-sm focus:ring-2 focus:ring-red-500 focus:outline-none cursor-pointer"
              aria-label="Select language"
            >
              <option value="en" className="bg-gray-900">🈯 English</option>
              <option value="fr" className="bg-gray-900">Français</option>
              <option value="hi" className="bg-gray-900">हिंदी</option>
              <option value="de" className="bg-gray-900">Deutsch</option>
            </select>
          </div>
          <Link 
            href="/SignIn"
            className="bg-red-600 text-white px-4 py-1.5 rounded text-sm hover:bg-red-700 transition-colors"
          >
            Sign In
          </Link>
        </div>
      </nav>

      <div className="absolute inset-0 flex items-center justify-center px-4">
        <div className="text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Unlimited movies, TV shows, and more.
          </h1>
          <h2 className="text-xl md:text-2xl lg:text-3xl text-white mb-6">
            Watch anywhere. Cancel anytime.
          </h2>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 justify-center items-center">
            <div className="w-full sm:max-w-md">
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
                className="w-full px-4 py-3 text-gray-900 bg-white/90 border border-gray-500 rounded focus:ring-2 focus:ring-red-500 focus:outline-none"
                required
                aria-invalid={emailError ? 'true' : 'false'}
                aria-describedby={emailError ? 'email-error' : undefined}
              />
              {emailError && (
                <p id="email-error" className="text-red-500 text-sm mt-1">
                  {emailError}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto bg-red-600 text-white px-6 py-3 rounded text-lg font-semibold hover:bg-red-700 transition-colors whitespace-nowrap"
            >
              Get Started
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}