'use client';
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const router = useRouter();

  useEffect(() => {
    // Load remembered email if exists
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberMe(true);
    }
  }, []);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError(null);

    // Basic validation
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);

    try {

      
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password
      });



      if (signInError) {
        console.error("Sign in error details:", signInError);
        
        if (signInError.message.includes("Invalid login credentials")) {
          // This could mean either the account doesn't exist OR it exists but isn't confirmed
          setError({
            message: "Invalid email or password. If you recently signed up, please check your email for a confirmation link.",
            type: "credentials",
            email: email.trim().toLowerCase()
          });
        } else if (signInError.message.includes("Email not confirmed")) {
          setError({
            message: "Please check your email and click the confirmation link before signing in.",
            type: "unconfirmed",
            email: email.trim().toLowerCase()
          });
        } else {
          setError({
            message: `Authentication error: ${signInError.message}`,
            type: "error"
          });
        }
        return;
      }



      // Handle remember me
      if (rememberMe) {
        localStorage.setItem("rememberedEmail", email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      router.push("/Homepage");
    } catch (err) {
      console.error("Unexpected sign in error:", err);
      setError(`An unexpected error occurred: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <div className="relative min-h-screen w-full overflow-hidden">
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />
      </div>

      {/* Netflix Logo */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 pt-4">
        <Link href="/" className="inline-block">
          <Image 
            src="/netflix.svg" 
            alt="Netflix Logo" 
            width={148}
            height={40}
            className="w-28 sm:w-32 md:w-36 h-auto"
            priority
          />
        </Link>
      </div>
     
      {/* Sign In Form */}
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-100px)] px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <form 
            onSubmit={handleSignIn} 
            className="bg-black/75 backdrop-blur-sm rounded-lg px-8 py-12 shadow-2xl"
            aria-label="Sign in form"
          >
            <h1 className="text-3xl font-bold mb-8 text-white">Sign In</h1>
            
            <div className="space-y-4">
              {/* Email Input */}
              <div>
                <label htmlFor="email" className="sr-only">Email or phone number</label>
                <input
                  id="email"
                  type="email"
                  placeholder="Email or phone number"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError(null);
                  }}
                  className="w-full px-4 py-4 bg-gray-700/80 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors duration-200"
                  required
                  disabled={isLoading}
                  autoComplete="email"
                />
              </div>

              {/* Password Input */}
              <div className="relative">
                <label htmlFor="password" className="sr-only">Password</label>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError(null);
                  }}
                  className="w-full px-4 py-4 pr-12 bg-gray-700/80 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors duration-200"
                  required
                  minLength={6}
                  disabled={isLoading}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 focus:outline-none"
                  disabled={isLoading}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                className="w-full py-4 font-semibold bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-black"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Signing in...
                  </div>
                ) : (
                  "Sign In"
                )}
              </button>
            </div>

            {/* Error Display */}
            {error && (
              <div className="mt-4 p-3 bg-orange-50/10 border-l-4 border-orange-400 rounded-r-md" role="alert">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <div className="ml-3 flex-1">
                    <p className="text-sm text-orange-200 font-medium">
                      {typeof error === 'string' ? error : error.message}
                    </p>
                    {error.type === 'credentials' && error.email && (
                      <div className="mt-3">
                        <p className="text-sm text-orange-300 mb-2">
                          Please check your email and confirm your account.
                        </p>
                        <button
                          type="button"
                          onClick={() => window.location.reload()}
                          className="inline-flex items-center px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black"
                          disabled={isLoading}
                        >
                          Try Again
                        </button>
                      </div>
                    )}
                    {error.type === 'unconfirmed' && error.email && (
                      <div className="mt-3">
                        <button
                          type="button"
                          onClick={() => window.location.reload()}
                          className="inline-flex items-center px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black"
                          disabled={isLoading}
                        >
                          Try Again
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Remember Me & Need Help */}
            <div className="flex items-center justify-between mt-6 text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-red-600 border-gray-600 bg-gray-700 rounded focus:ring-red-500 focus:ring-2"
                  disabled={isLoading}
                />
                <span className="text-gray-300">Remember me</span>
              </label>
              <Link 
                href="/help"
                className="text-gray-300 hover:text-white hover:underline focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-black rounded transition-colors duration-200"
              >
                Need help?
              </Link>
            </div>

            {/* Facebook Login */}
            <div className="mt-8">
              <button
                type="button"
                className="flex items-center gap-3 text-gray-400 hover:text-gray-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black rounded"
                disabled={isLoading}
              >
                <Image 
                  src="/fb.svg" 
                  alt="Facebook logo" 
                  width={20}
                  height={20}
                  className="w-5 h-5"
                />
                <span className="text-sm">Login with Facebook</span>
              </button>
            </div>

            {/* Sign Up Link */}
            <div className="mt-8 text-center">
              <p className="text-gray-400">
                New to Netflix?{" "}
                <Link 
                  href="/SignUp/1"
                  className="text-white font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-black rounded transition-colors duration-200"
                >
                  Sign up now
                </Link>
              </p>
            </div>



            {/* reCAPTCHA Notice */}
            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500 leading-relaxed">
                This page is protected by Google reCAPTCHA to ensure you're not a bot.{" "}
                <a 
                  href="https://policies.google.com/privacy" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black rounded transition-colors duration-200"
                >
                  Learn more
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}