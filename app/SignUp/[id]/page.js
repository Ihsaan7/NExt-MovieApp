"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";
import Image from "next/image";

const PlanCard = ({ plan, selected, onSelect, features }) => {
  const {
    title,
    quality,
    price,
    videoQuality,
    resolution,
    devices,
    simultaneousStreams,
    downloads,
    isPopular
  } = features;

  return (
    <div
      className={`relative border-2 transition-all duration-200 cursor-pointer rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md ${
        selected 
          ? "border-red-500 shadow-lg ring-2 ring-red-500 ring-opacity-50" 
          : "border-gray-300 hover:border-gray-400"
      } w-full max-w-sm mx-auto`}
      onClick={() => onSelect(title)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(title);
        }
      }}
      aria-pressed={selected}
      aria-label={`Select ${title} plan for PKR ${price} per month`}
    >
      {isPopular && (
        <div className="w-full bg-gradient-to-r from-red-500 to-red-600 py-2">
          <p className="text-center font-bold text-white text-sm">Most Popular</p>
        </div>
      )}
      
      <div className={`p-4 ${isPopular ? '' : 'pt-6'}`}>
        {/* Plan Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900">{title}</h3>
            <p className="text-sm font-medium text-gray-600">{quality}</p>
          </div>
          {selected && (
            <div className="flex-shrink-0">
              <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          )}
        </div>

        {/* Plan Details */}
        <div className="space-y-3">
          <div className="border-b border-gray-200 pb-3">
            <p className="text-sm text-gray-600">Monthly price</p>
            <p className="text-lg font-bold text-gray-900">PKR {price}</p>
          </div>
          
          <div className="border-b border-gray-200 pb-3">
            <p className="text-sm text-gray-600">Video and sound quality</p>
            <p className="text-sm font-medium text-gray-900">{videoQuality}</p>
          </div>
          
          <div className="border-b border-gray-200 pb-3">
            <p className="text-sm text-gray-600">Resolution</p>
            <p className="text-sm font-medium text-gray-900">{resolution}</p>
          </div>
          
          <div className="border-b border-gray-200 pb-3">
            <p className="text-sm text-gray-600">Supported devices</p>
            <p className="text-sm font-medium text-gray-900">{devices}</p>
          </div>
          
          <div className="border-b border-gray-200 pb-3">
            <p className="text-sm text-gray-600">Simultaneous streams</p>
            <p className="text-sm font-medium text-gray-900">{simultaneousStreams}</p>
          </div>
          
          <div className="pb-2">
            <p className="text-sm text-gray-600">Download devices</p>
            <p className="text-sm font-medium text-gray-900">{downloads}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const StepPage = () => {
  const [select, setSelect] = useState("Premium");
  const { id } = useParams();
  const stepNumber = parseInt(id);

  const plans = {
    Premium: {
      title: "Premium",
      quality: "4K + HDR",
      price: "1,100",
      videoQuality: "Best",
      resolution: "4K (Ultra HD) + HDR",
      devices: "TV, Computer, Mobile Phone, Tablet",
      simultaneousStreams: "4",
      downloads: "6",
      isPopular: true
    },
    Standard: {
      title: "Standard",
      quality: "1080p",
      price: "800",
      videoQuality: "Great",
      resolution: "1080p (Full HD)",
      devices: "TV, Computer, Mobile Phone, Tablet",
      simultaneousStreams: "2",
      downloads: "2",
      isPopular: false
    },
    Basic: {
      title: "Basic",
      quality: "720p",
      price: "450",
      videoQuality: "Good",
      resolution: "720p (HD)",
      devices: "TV, Computer, Mobile Phone, Tablet",
      simultaneousStreams: "1",
      downloads: "1",
      isPopular: false
    },
    Mobile: {
      title: "Mobile",
      quality: "480p",
      price: "250",
      videoQuality: "Fair",
      resolution: "480p",
      devices: "Mobile",
      simultaneousStreams: "1",
      downloads: "1",
      isPopular: false
    }
  };

  const renderStep1 = () => (
    <div className="min-h-screen flex flex-col bg-white text-black">
      {/* Navigation */}
      <nav className="w-full border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            <div className="flex-shrink-0">
              <Image
                src="/netflix2.svg"
                alt="Netflix Logo"
                width={120}
                height={32}
                className="h-8 w-auto md:h-10"
                priority
              />
            </div>
            <Link 
              href="/SignIn"
              className="text-black font-semibold text-lg hover:underline transition-colors duration-200"
            >
              Sign In
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Progress Indicator */}
          <div className="mb-8">
            <p className="text-sm text-gray-600 uppercase tracking-wide">
              STEP <span className="font-bold">1</span> OF <span className="font-bold">3</span>
            </p>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mt-2">
              Choose your plan
            </h1>
            <p className="text-lg text-gray-600 mt-2">
              No commitments, cancel anytime.
            </p>
          </div>

          {/* Plan Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
            {Object.entries(plans).map(([key, features]) => (
              <PlanCard
                key={key}
                plan={key}
                selected={select === key}
                onSelect={setSelect}
                features={features}
              />
            ))}
          </div>

          {/* Action Button */}
          <div className="flex justify-center mb-12">
            <Link href="/SignUp/2">
              <button 
                className="bg-red-600 text-white px-8 py-4 rounded-md text-lg font-semibold hover:bg-red-700 transition-colors duration-200 min-w-[200px] focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                disabled={!select}
              >
                Next
              </button>
            </Link>
          </div>

          {/* Disclaimer */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <div className="space-y-4 text-sm text-gray-600">
              <p>
                HD (720p), Full HD (1080p), Ultra HD (4K) and HDR availability subject to your internet service and device capabilities. Not all content is available in all resolutions. See our{" "}
                <Link href="/terms" className="text-red-600 hover:underline">
                  Terms of Use
                </Link>{" "}
                for more details.
              </p>
              <p>
                Only people who live with you may use your account. Watch on 4 different devices at the same time with Premium, 2 with Standard, and 1 with Basic and Mobile.
              </p>
              <p>
                Live events are included with any Netflix plan and contain ads.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h3 className="text-gray-600 mb-4 font-medium">Questions? Contact us.</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-sm">
            <Link href="/faq" className="text-gray-600 hover:underline">FAQ</Link>
            <Link href="/help" className="text-gray-600 hover:underline">Help Center</Link>
            <Link href="/terms" className="text-gray-600 hover:underline">Terms of Use</Link>
            <Link href="/privacy" className="text-gray-600 hover:underline">Privacy</Link>
            <Link href="/cookies" className="text-gray-600 hover:underline">Cookie Preferences</Link>
            <Link href="/corporate" className="text-gray-600 hover:underline">Corporate Information</Link>
          </div>
        </div>
      </footer>
    </div>
  );

  const renderStep2 = () => (
    <div className="min-h-screen bg-white text-black flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Icons */}
        <div className="flex justify-center items-center gap-4 mb-8">
          <div className="w-16 h-16 md:w-20 md:h-20 relative">
            <Image 
              src="/1 (4).png" 
              alt="Device icon" 
              fill
              className="object-contain"
            />
          </div>
          <div className="w-16 h-16 md:w-20 md:h-20 relative">
            <Image 
              src="/1 (3).png" 
              alt="Content icon" 
              fill
              className="object-contain"
            />
          </div>
          <div className="w-16 h-16 md:w-20 md:h-20 relative">
            <Image 
              src="/1 (1).png" 
              alt="Quality icon" 
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6">
          <p className="text-sm text-gray-600 uppercase tracking-wide">
            STEP <span className="font-bold">2</span> OF <span className="font-bold">3</span>
          </p>
          
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
            Finish setting up your account
          </h1>
          
          <p className="text-lg text-gray-600 leading-relaxed">
            Netflix is personalized for you. Create a password to watch on any device at any time.
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-4">
          <Link href="/SignUp/3">
            <button className="w-full bg-red-600 text-white px-8 py-4 rounded-md text-lg font-semibold hover:bg-red-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
              Next
            </button>
          </Link>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [marketingOptOut, setMarketingOptOut] = useState(false);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
      const storedEmail = localStorage.getItem("signupEmail");
      if (storedEmail) setEmail(storedEmail);
    }, []);

    const validatePassword = (password) => {
      if (password.length < 6) {
        return "Password must be at least 6 characters long";
      }
      if (password.length > 60) {
        return "Password must be less than 60 characters";
      }
      return null;
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setError(null);

      // Validate password
      const passwordError = validatePassword(password);
      if (passwordError) {
        setError({ message: passwordError, type: "validation" });
        return;
      }

      setIsLoading(true);

      try {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: { 
            emailRedirectTo: `${window.location.origin}/Homepage`,
            data: {
              marketing_opt_out: marketingOptOut
            }
          }
        });

        if (signUpError) {
          if (signUpError.message.includes("already registered")) {
            setError({
              message: "This email is already registered.",
              type: "existing_user"
            });
          } else {
            throw signUpError;
          }
          return;
        }

        // Store user data
        await supabase.from("users").insert([{ 
          email,
          marketing_opt_out: marketingOptOut 
        }]);
        
        localStorage.removeItem("signupEmail");
        router.push("/Homepage");
      } catch (err) {
        console.error("Error:", err.message);
        setError({
          message: err.message || "An error occurred during sign up. Please try again.",
          type: "error"
        });
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <div className="min-h-screen bg-white text-black flex flex-col justify-center px-4">
        <div className="max-w-md mx-auto w-full">
          {/* Progress Indicator */}
          <div className="text-center mb-8">
            <p className="text-sm text-gray-600 uppercase tracking-wide mb-4">
              STEP <span className="font-bold">3</span> OF <span className="font-bold">3</span>
            </p>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Create a password to start your membership
            </h1>
            <p className="text-lg text-gray-600">
              Just a few more steps and you're done! We hate paperwork, too.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6" aria-label="Create account form">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full px-4 py-4 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors duration-200"
                required
                disabled={isLoading}
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Add a password"
                className="w-full px-4 py-4 pr-12 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors duration-200"
                required
                minLength={6}
                maxLength={60}
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
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

            {/* Marketing Opt-out Checkbox */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="marketing-opt-out"
                checked={marketingOptOut}
                onChange={(e) => setMarketingOptOut(e.target.checked)}
                className="mt-1 w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500 focus:ring-2"
                disabled={isLoading}
              />
              <label 
                htmlFor="marketing-opt-out"
                className="text-sm text-gray-700 cursor-pointer leading-relaxed"
              >
                Please do not email me Netflix special offers.
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-red-600 text-white px-8 py-4 rounded-md text-lg font-semibold hover:bg-red-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Creating account...
                </div>
              ) : (
                "Start Membership"
              )}
            </button>
          </form>

          {/* Error Display - Netflix Style Inline */}
          {error && (
            <div className="mt-4 p-4 bg-orange-50 border-l-4 border-orange-400 rounded-r-md" role="alert">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="w-5 h-5 text-orange-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-orange-800">
                    {error.message}
                  </p>
                  {error.type === 'existing_user' && (
                    <div className="mt-3">
                      <p className="text-sm text-orange-700 mb-3">
                        Already have an account? Sign in to continue.
                      </p>
                      <Link 
                        href="/SignIn"
                        className="inline-flex items-center px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                      >
                        Sign In
                        <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      {stepNumber === 1 && renderStep1()}
      {stepNumber === 2 && renderStep2()}
      {stepNumber === 3 && renderStep3()}
      {stepNumber > 3 && (
        <div className="text-center">
          <h2 className="text-2xl font-bold">Step Not Found</h2>
          <Link href="/SignUp/1">
            <button className="p-5 text-white font-bold rounded-md text-2xl bg-red-500 mx-auto px-30 py-3 mt-5">
              Back to Step 1
            </button>
          </Link>
        </div>
      )}
    </>
  );
};

export default StepPage;
