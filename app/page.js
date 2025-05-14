'use client';
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Setting email:", email); // Debug
    localStorage.setItem("signupEmail", email);
    router.push("/SignUp/1");
  };

  return (
    <div className="relative h-screen">
      <img src="/1 (2).png" alt="bg-img" className="h-full w-full object-cover"/>
      <div className="absolute inset-0 bg-gradient-to-b from-black/100 via-transparent to-black/100"></div>
      <nav className="absolute z-10 top-0 left-0 w-full flex justify-between">
        <img src="./netflix.svg" className="w-25 md:w-30 lg:w-40 h-30 md:h-30 lg:h-40 ml-5 md:ml-20"/>
        <div className="flex md:flex lg:flex lg:my-5 lg:mr-20 sm:mr-0">
          <form className="my-10 md:m-10 lg:m-10">
            <select
              id="countries"
              className="relative text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2 md:p-2.5 lg:p-2.5 dark:bg-gray-700/50 dark:border-gray-500 dark:text-white dark:focus:ring-blue-500 cursor-pointer"
            >
              <option  defaultValue={"US"} className="text-white">🈯 English</option>
              <option value="CA" className="opacity-20 text-white">French</option>
              <option value="FR" className="opacity-50 text-white">Hindi</option>
              <option value="DE" className="opacity-50 text-white">German</option>
            </select>
          </form>
          <button className="text-white bg-red-600 px-2 py-1 h-fit rounded my-10 mr-8 ml-3 md:m-10 ml-0 hover:cursor-pointer">
            <Link href="/SignIn">Sign In</Link>
          </button>
        </div>
      </nav>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl lg:text-6xl md:text-5xl font-bold w-100 md:w-150 lg:w-200">Unlimited movies, TV shows, and more.</h1>
          <h3 className="text-2xl scale-85 lg:text-3xl md:text-2xl pt-2 md:pt-5 lg:pt- pb-3 md:pb-8 text-white-600">Watch anywhere. Cancel anytime</h3>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email" className="block text-sm lg:text-lg md:text-md font-medium text-white">Ready to watch? Enter your email to create or restart your membership</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white text-gray-700 border border-gray-500 p-2 w-65 mt-5 lg:w-100 md:w-80 lg:h-15 md:h-12"
              required
            />
            <button
              type="submit"
              className="bg-red-500 border mr-5 border-gray-500 text-white p-2 lg:w-30 md:w-25 lg:h-15 md:h-12 hover:cursor-pointer"
            >
              Get Started
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}