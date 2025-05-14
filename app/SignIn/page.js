'use client';
import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const router = useRouter();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    if (error) {
      setError(error.message);
    } else {
      router.push("/Homepage");
    }
  };

  return (
    <div className="relative h-screen">
      <img src="/1 (2).png" alt="bg-img" className="h-full w-full object-cover"/>
      <img src="./netflix.svg" className="w-25 h-30 md:w-50 md:h-50 m-5 mt-0 md:ml-20 absolute z-10 top-0 left-0"/>
     
      <form onSubmit={handleSignIn} className="absolute flex flex-col top-40 left-10 w-85 h-150 md:left-80 md:w-120 lg:left-100 items-center rounded-md bg-black/80 border-white">
        <h1 className="absolute top-0 left-0 text-4xl font-bold w-fit m-2 ml-15 mt-10">Sign In</h1>
        <input
          type="email"
          placeholder="Email or Phone number"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-[rgb(51,51,51)] p-3 mt-30 mb-3 rounded-sm md:w-90 md:h-15 text-left"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-[rgb(51,51,51)] p-3 mb-10 rounded-sm md:w-90 md:h-15"
          required
        />
        <button
          type="submit"
          className="rounded-sm p-3 px-21 font-bold bg-red-600 md:w-90 md:h-15 md:text-lg hover:cursor-pointer"
        >
          Sign In
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <label className="flex space-x-2 mt-3">
          <input
            type="checkbox"
            className="w-3 h-5 accent-red-500 cursor-pointer md:w-5 md:h-6"
          />
          <span className="text-sm mr-20 text-gray-500 md:text-lg md:mr-30">Remember Me</span>
          <p className="text-sm text-gray-500 md:text-lg hover:cursor-pointer">Need Help?</p>
        </label>
        <div className="flex md:flex md:justify-left md:w-100 md:mt-10">
          <img src="./fb.svg" className="w-10 h-10 m-5 md:w-6 md:h-7 hover:cursor-pointer"/>
          <span className="text-gray-500 text-lg h-fit mt-6 md:text-sm hover:cursor-pointer">Login with Facebook</span>
        </div>
        <div className="md:flex flex-col md:justify-left md:w-90">
          <p className="text-gray-500 text-center">
            New to Netflix? 
            <Link href="/SignUp/1">
              <span className="text-white hover:cursor-pointer"> SignUp now</span>
            </Link>
          </p>
          <p className="w-80 p-4 mt-10 text-sm text-gray-500 md:w-90 md:p-0 md:pb-5">
            This page is protected by Google reCAPTCHA to ensure you're not a bot. <a className="text-blue-600 hover:cursor-pointer">Learn more</a>
          </p>
        </div>
      </form>
    </div>
  );
}