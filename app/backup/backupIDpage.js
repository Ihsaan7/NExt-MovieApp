"use client";
import React, { useState } from "react";
import Link from "next/link";

const PageStep2 = () => {
  const [select, setSelect] = useState("Premium");
  const handlePlan = (plan) => {
    setSelect(plan);
  };

  return (
   
    <div className="bg-white w-full h-screen text-black flex flex-col items-center justify-center gap-10">
  <div className="lg:w-full flex flex-col items-center gap-10">
    <div className="flex flex-row gap-5 justify-center items-center">
      <img src="../1 (4).png" className="w-20 h-20 md:w-30 md:h-30" />
      <img src="../1 (3).png" className="w-20 h-20 md:w-30 md:h-30" />
      <img src="../1 (1).png" className="w-20 h-20 md:w-25 md:h-25 md:mt-2" />
    </div>
    <div className="text-center w-full flex flex-col items-center px-5">
      <p className="text-md md:w-full flex justify-center">
        STEP <span className="font-bold px-1">2</span> OF
        <span className="font-bold px-1">3</span>
      </p>
      <h2 className="text-2xl font-bold pb-5 w-70 md:w-full text-center md:text-3xl">
        Finish setting up your account
      </h2>
      <h4 className="text-center w-75 md:w-full">
        Netflix is personalized for you. Create a password to watch on any device at any time.
      </h4>
    </div>
    <button className="p-5 text-white font-bold rounded-md text-2xl bg-red-500 mx-auto px-30 py-3 hover:cursor-pointer">
      Next
    </button>
  </div>
</div>

    <div className="relative h-fit flex flex-col bg-white text-black">
      {/* <img src="/1 (2).png" alt="bg-img" className="h-full w-full object-cover "/> */}
      <nav className="w-full h-20 md:h-25 flex justify-between border-b">
        <img
          src="../netflix2.svg"
          className="w-25 h-20 md:h-30 md:scale-180 md:ml-20"
        />
        <button className="text-black font-bold text-2xl mt-5 mr-5 w-20 h-8 rounded md:mt-10 md:text-3xl md:w-30 hover:cursor-pointer">
          <Link href="/SignIn">Sign In</Link>
        </button>
      </nav>
      <div className="w-full h-full ">
        <p className="mt-5 ml-10 ">
          STEP <span className="font-bold">1</span> of
          <span className="font-bold"> 3</span>
        </p>
        <h3 className="text-3xl font-bold mb-3 ml-10">Choose your plan.</h3>
        <div className=" w-full h-full flex flex-col gap-10 mb-10 md:grid md:grid-cols-2 md:grid-row-2 md:h-full md:place-items-center md:gap-0 lg:flex lg:flex-row lg:gap-5 lg:pl-10">
          <div
            className={`border-2 border-gray-400 w-70 h-fit self-center cursor-pointer mt-10 rounded-lg md:w-90 lg:w-70 ${
              select === "Premium" ? "shadow-md shadow-black border-black-500" : ""
            }`}
            onClick={() => handlePlan("Premium")}
          >
            <div className="w-full h-10 flex justify-center align-center flex-col rounded-t-md bg-red-500">
              <h4 className="text-center font-bold text-white ">Most popular</h4>
            </div>
            <div className=" w-65 flex justify-between mobileBorderP h-20 rounded-lg mt-2 ml-2 mb-4 md:w-85 lg:w-65">
              <div>
                <h2 className="text-2xl p-3 pb-0 ">Premium</h2>
                <p className="pl-3 font-bold">4K + HDR</p>
              </div>
              {select === "Premium" && (
                <img
                  src="../check (3).png"
                  className="w-10 h-10 self-end pb-2 pr-2 checked"
                />
              )}
              {/* <img src="../check (3).png" className="w-10 h-10 self-end pb-2 pr-2 checked"></img> */}
            </div>
            <div className="border-b w-55 ml-5">
              <h4 className="">Monthly price</h4>
              <h2 className="text-xl font-bold pb-5">PKR 1,100</h2>
            </div>
            <div className="border-b w-55 ml-5">
              <h4 className="pt-3">Video and sound quality</h4>
              <h2 className="text-xl font-bold pb-5">Best</h2>
            </div>
            <div className="border-b w-55 ml-5">
              <h4 className="pt-3">Resolution</h4>
              <h2 className="text-xl font-bold pb-5">4K (Ultra HD) + HDR</h2>
            </div>
            <div className="border-b w-55 ml-5">
              <h4 className="pt-3">Spatial audio (immersive sound)</h4>
              <h2 className="text-xl font-bold pb-5 ">Included</h2>
            </div>
            <div className="border-b w-55 ml-5">
              <h4 className="pt-3">Supported devices</h4>
              <h2 className="text-xl font-bold pb-5 ">
                TV, Computer, Mobile Phone, Tablet
              </h2>
            </div>
            <div className="border-b w-55 ml-5">
              <h4 className="pt-3">
                Devices your household can watch at the same time
              </h4>
              <h2 className="text-xl font-bold pb-5">4</h2>
            </div>
            <div className=" w-55 ml-5">
              <h4 className="pt-3">Download devices</h4>
              <h2 className="text-xl font-bold pb-5">6</h2>
            </div>
          </div>
          <div
            className={`border border-gray-400 w-70 h-fit self-center cursor-pointer mt-10 rounded-lg md:w-90 lg:w-70 ${
              select === "Standard" ? "shadow-md shadow-black border-black-500" : ""
            }`}
            onClick={() => handlePlan("Standard")}
            >
            <div className=" w-65 flex justify-between mobileBorder h-20 rounded-lg mt-2 ml-2 mb-4 md:w-85 lg:w-65">
              <div className="">
                <h2 className="text-2xl p-3 pb-0">Standard</h2>
                <p className="pl-3 font-bold">1080p</p>
              </div>
                {select === "Standard" && (
                <img
                  src="../check (3).png"
                  className="w-10 h-10 self-end pb-2 pr-2 checked"
                />
              )}
            </div>
            <div className="border-b w-55 ml-5">
              <h4 className="">Monthly price</h4>
              <h2 className="text-xl font-bold pb-5">PKR 800</h2>
            </div>
            <div className="border-b w-55 ml-5">
              <h4 className="pt-3">Video and sound quality</h4>
              <h2 className="text-xl font-bold pb-5">Great</h2>
            </div>
            <div className="border-b w-55 ml-5">
              <h4 className="pt-3">Resolution</h4>
              <h2 className="text-xl font-bold pb-5">1080p (Full HD)</h2>
            </div>
            <div className="border-b w-55 ml-5">
              <h4 className="pt-3">Supported devices</h4>
              <h2 className="text-xl font-bold pb-5 ">
                TV, Computer, Mobile Phone, Tablet
              </h2>
            </div>
            <div className="border-b w-55 ml-5">
              <h4 className="pt-3">
                Devices your household can watch at the same time
              </h4>
              <h2 className="text-xl font-bold pb-5">2</h2>
            </div>
            <div className=" w-55 ml-5">
              <h4 className="pt-3">Download devices</h4>
              <h2 className="text-xl font-bold pb-5">2</h2>
            </div>
          </div>
           <div
            className={`border border-gray-400 w-70 h-fit self-center cursor-pointer mt-10 rounded-lg md:w-90 lg:w-70 ${
              select === "Basic" ? "shadow-md shadow-black border-black-500" : ""
            }`}
            onClick={() => handlePlan("Basic")}
            >
             <div className=" w-65 flex justify-between mobileBorder h-20 rounded-lg mt-2 ml-2 mb-4 md:w-85 lg:w-65">
              <div>
                <h2 className="text-2xl p-3 pb-0 ">Basic</h2>
                <p className="pl-3 font-bold">720p</p>
              </div>
                {select === "Basic" && (
                <img
                  src="../check (3).png"
                  className="w-10 h-10 self-end pb-2 pr-2 checked"
                />
              )}
            </div>
            <div className="border-b w-55 ml-5">
              <h4 className="">Monthly price</h4>
              <h2 className="text-xl font-bold pb-5">PKR 450</h2>
            </div>
            <div className="border-b w-55 ml-5">
              <h4 className="pt-3">Video and sound quality</h4>
              <h2 className="text-xl font-bold pb-5">Good</h2>
            </div>
            <div className="border-b w-55 ml-5">
              <h4 className="pt-3">Resolution</h4>
              <h2 className="text-xl font-bold pb-5">720p (HD)</h2>
            </div>
            <div className="border-b w-55 ml-5">
              <h4 className="pt-3">Supported devices</h4>
              <h2 className="text-xl font-bold pb-5 ">
                TV, Computer, Mobile Phone, Tablet
              </h2>
            </div>
            <div className="border-b w-55 ml-5">
              <h4 className="pt-3">
                Devices your household can watch at the same time
              </h4>
              <h2 className="text-xl font-bold pb-5">1</h2>
            </div>
            <div className=" w-55 ml-5">
              <h4 className="pt-3">Download devices</h4>
              <h2 className="text-xl font-bold pb-5">1</h2>
            </div>
          </div>
            <div
            className={`border border-gray-400 w-70 h-fit self-center cursor-pointer mt-10  rounded-lg md:w-90 lg:w-70 ${
              select === "Mobile" ? "shadow-md shadow-black border-black-500" : ""
            }`}
            onClick={() => handlePlan("Mobile")}
            >
            <div className=" w-65 flex justify-between mobileBorder h-20 rounded-lg mt-2 ml-2 mb-4 md:w-85 lg:w-65">
              <div>
                <h2 className="text-2xl p-3 pb-0 ">Mobile</h2>
                <p className="pl-3 font-bold">480p</p>
              </div>
                {select === "Mobile" && (
                <img
                  src="../check (3).png"
                  className="w-10 h-10 self-end pb-2 pr-2 checked"
                />
              )}
            </div>
            <div className="border-b w-55 ml-5">
              <h4 className="">Monthly price</h4>
              <h2 className="text-xl font-bold pb-5">PKR 250</h2>
            </div>
            <div className="border-b w-55 ml-5">
              <h4 className="pt-3">Video and sound quality</h4>
              <h2 className="text-xl font-bold pb-5">Fair</h2>
            </div>
            <div className="border-b w-55 ml-5">
              <h4 className="pt-3">Resolution</h4>
              <h2 className="text-xl font-bold pb-5">480p</h2>
            </div>
            <div className="border-b w-55 ml-5">
              <h4 className="pt-3">Supported devices</h4>
              <h2 className="text-xl font-bold pb-12 ">Mobile</h2>
            </div>
            <div className="border-b w-55 ml-5">
              <h4 className="pt-3">
                Devices your household can watch at the same time
              </h4>
              <h2 className="text-xl font-bold pb-5">1</h2>
            </div>
            <div className=" w-55 ml-5">
              <h4 className="pt-3">Download devices</h4>
              <h2 className="text-xl font-bold pb-5">1</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-100 mt-20 text-gray-600">
      <p className="pl-4 pb-4">HD (720p), Full HD (1080p), Ultra HD (4K) and HDR availability subject to your internet service and device capabilities. Not all content is available in all resolutions. See our <span className="text-blue-600 cursor-pointer">Terms of Use</span> for more details.</p>
      <p className="pl-4 pb-4">Only people Who live with you may use your account. Watch on 4 different devices at the Same time with Premium, 2 With Standard, and  with Basic and Mobile.</p><p className="pl-4">Live events are included with any Netflix plan and contain ads.</p>
      <div className="md:w-full md:flex md:flex-col md:align-center cursor-pointer">
      <button className="p-5 text-white font-bold rounded-md text-2xl bg-red-500 ml-15 px-30 py-3 mt-10  md:self-center hover:cursor-pointer lg:px-50 lg:py-5 lg:mt-20 ">
          Next
        </button>
      </div>
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

export default PageStep2;
