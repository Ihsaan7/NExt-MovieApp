import React from "react";
import Link from "next/link";

const SignUp = () => {
  return (
    <div className="relative h-screen flex flex-col justify-between bg-white text-black">
      {/* <img src="/1 (2).png" alt="bg-img" className="h-full w-full object-cover "/> */}
      <nav className="w-full h-20 md:h-25 flex justify-between border-b">
        <img
          src="./netflix2.svg"
          className="w-25 h-20 md:h-30 md:scale-180 md:ml-20"
        />
        <button className="text-black font-bold text-2xl mt-5 mr-5 w-20 h-8 rounded md:mt-10 md:text-3xl md:w-30 hover:cursor-pointer">
          <Link href="/SignIn">Sign In</Link>
        </button>
      </nav>
      <div className=" w-full h-130  md:w-150 md:self-center">
        <div className="flex flex-col w-full pl-20 pb-8  md:pl-40">
          <img
            src="./tick.svg"
            className="w-10 h-fit  mb-5 md:w-15 md:h-20  md:ml-0  top-0 left-0"
          />
          <p>
            STEP <span className="font-bold">1</span> of 
            <span className="font-bold"> 3</span>
          </p>
          <h3 className="text-3xl font-bold">Choose your plan.</h3>
        </div>
        <div className=" flex gap-4 w-full pl-20 p-2 ">
          <img
            src="./tick1.svg"
            className="w-10 h-fit  md:w-20 md:h-15  md:ml-20  top-0 left-0"
          />
          <p className="h-fit w-50 ">No commitments, cancel anytime.</p>
        </div>
        <div className=" flex gap-4 w-full pl-20 p-2">
          <img
            src="./tick1.svg"
            className="w-10 h-fit  md:w-20 md:h-15  md:ml-20  top-0 left-0"
          />
          <p className="h-fit w-50 ">No commitments, cancel anytime.</p>
        </div>
        <div className=" flex gap-4 w-full pl-20 p-2 pb-10">
          <img
            src="./tick1.svg"
            className="w-10 h-fit  md:w-20 md:h-15  md:ml-20  top-0 left-0"
          />
          <p className="h-fit w-50 ">No commitments, cancel anytime.</p>
        </div>
       <Link href="/SignUp/1">
  <button className="p-5 text-white font-bold rounded-md text-2xl bg-red-500 ml-20 px-30 py-3 md:ml-40 hover:cursor-pointer">
    Next
  </button>
</Link>
      </div>
      <div className="border-t border-gray-300 w-full h-40 text-gray-500 flex flex-col bg-gray-200">
        <h3 className="p-2 pl-5 lg:pl-10">Questions? Contact us.</h3>
        <div class="grid grid-cols-3 grid-rows-2 gap-2 p-2 pl-5 pr-0 lg:gap-3 lg:pl-30">
          <p>FAQ</p>
          <p>Help Center</p>
          <p>Term of Use</p>
          <p>Privacy</p>
          <p>Cookie Preference</p>
          <p>Corporate Information</p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
