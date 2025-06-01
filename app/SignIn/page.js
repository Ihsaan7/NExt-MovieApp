'use client';
import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const router = useRouter();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (signInError) {
        if (signInError.message.includes("Invalid login credentials")) {
          setError("Incorrect email or password. Please try again.");
        } else {
          setError(signInError.message);
        }
        return;
      }

      if (rememberMe) {
        localStorage.setItem("rememberedEmail", email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      router.push("/Homepage");
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      console.error("Sign in error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        <Image 
          src="/1 (2).png" 
          alt="Netflix background" 
          fill
          priority
          className="object-cover"
          quality={100}
        />
      </div>
      <div className="relative z-10">
        <Image 
          src="/netflix.svg" 
          alt="Netflix Logo" 
          width={120}
          height={120}
          className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 m-4 md:ml-20"
          priority
        />
      </div>
     
      <form 
        onSubmit={handleSignIn} 
        className="relative z-10 mx-auto mt-8 px-4 py-8 w-[90%] max-w-[450px] md:w-[450px] bg-black/80 rounded-md"
        aria-label="Sign in form"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">Sign In</h1>
        
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email or Phone number"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 bg-[rgb(51,51,51)] rounded focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            required
            aria-label="Email or phone number"
            disabled={isLoading}
            autoComplete="email"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-4 bg-[rgb(51,51,51)] rounded focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            required
            minLength={6}
            aria-label="Password"
            disabled={isLoading}
            autoComplete="current-password"
          />
          <button
            type="submit"
            className="w-full py-4 font-bold bg-red-600 rounded hover:bg-red-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
            aria-label={isLoading ? "Signing in..." : "Sign in"}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </div>

        {error && (
          <div 
            className="mt-4 p-3 text-red-500 text-center bg-red-50/10 rounded"
            role="alert"
          >
            {error}
          </div>
        )}

        <div className="flex items-center justify-between mt-4 text-sm">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 accent-red-500 cursor-pointer"
              disabled={isLoading}
            />
            <span className="text-gray-500">Remember Me</span>
          </label>
          <button 
            type="button"
            className="text-gray-500 hover:underline focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-black rounded"
            disabled={isLoading}
          >
            Need Help?
          </button>
        </div>

        <div className="flex items-center mt-8">
          <Image 
            src="/fb.svg" 
            alt="Facebook logo" 
            width={20}
            height={20}
            className="w-8 h-8 mr-3"
          />
          <span className="text-gray-500 text-sm">
            Login with Facebook
          </span>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-500">
            New to Netflix?{" "}
            <Link 
              href="/SignUp/1"
              className="text-white hover:underline focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-black rounded"
            >
              Sign up now
            </Link>
          </p>
          <p className="mt-4 text-xs text-gray-500">
            This page is protected by Google reCAPTCHA to ensure you're not a bot.{" "}
            <a 
              href="#" 
              className="text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black rounded"
            >
              Learn more
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}