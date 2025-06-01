"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

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
      className={`border-2 border-gray-400 w-70 h-fit self-center cursor-pointer mt-10 rounded-lg md:w-90 lg:w-70 ${
        selected ? "shadow-md shadow-black border-black-500" : ""
      }`}
      onClick={() => onSelect(title)}
    >
      {isPopular && (
        <div className="w-full h-10 flex justify-center align-center flex-col rounded-t-md bg-red-500">
          <h4 className="text-center font-bold text-white">Most popular</h4>
        </div>
      )}
      <div className="w-65 flex justify-between mobileBorder h-20 rounded-lg mt-2 ml-2 mb-4 md:w-85 lg:w-65">
        <div>
          <h2 className="text-2xl p-3 pb-0">{title}</h2>
          <p className="pl-3 font-bold">{quality}</p>
        </div>
        {selected && (
          <img
            src="../check (3).png"
            className="w-10 h-10 self-end pb-2 pr-2 checked"
            alt={`Selected ${title} plan`}
          />
        )}
      </div>
      <div className="border-b w-55 ml-5">
        <h4>Monthly price</h4>
        <h2 className="text-xl font-bold pb-5">PKR {price}</h2>
      </div>
      <div className="border-b w-55 ml-5">
        <h4 className="pt-3">Video and sound quality</h4>
        <h2 className="text-xl font-bold pb-5">{videoQuality}</h2>
      </div>
      <div className="border-b w-55 ml-5">
        <h4 className="pt-3">Resolution</h4>
        <h2 className="text-xl font-bold pb-5">{resolution}</h2>
      </div>
      <div className="border-b w-55 ml-5">
        <h4 className="pt-3">Supported devices</h4>
        <h2 className="text-xl font-bold pb-5">{devices}</h2>
      </div>
      <div className="border-b w-55 ml-5">
        <h4 className="pt-3">Devices your household can watch at the same time</h4>
        <h2 className="text-xl font-bold pb-5">{simultaneousStreams}</h2>
      </div>
      <div className="w-55 ml-5">
        <h4 className="pt-3">Download devices</h4>
        <h2 className="text-xl font-bold pb-5">{downloads}</h2>
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
    <div className="relative h-fit flex flex-col bg-white text-black">
      <nav className="w-full h-20 md:h-25 flex justify-between border-b">
        <img
          src="../netflix2.svg"
          alt="Netflix Logo"
          className="w-25 h-20 md:h-30 md:scale-180 md:ml-20"
        />
        <button className="text-black font-bold text-2xl mt-5 mr-5 w-20 h-8 rounded md:mt-10 md:text-3xl md:w-30 hover:cursor-pointer">
          <Link href="/SignIn">Sign In</Link>
        </button>
      </nav>
      <div className="w-full h-full">
        <p className="mt-5 ml-10">
          STEP <span className="font-bold">1</span> of
          <span className="font-bold"> 3</span>
        </p>
        <h3 className="text-3xl font-bold mb-3 ml-10">Choose your plan.</h3>
        <div className="w-full h-full flex flex-col gap-10 mb-10 md:grid md:grid-cols-2 md:grid-row-2 md:h-full md:place-items-center md:gap-0 lg:flex lg:flex-row lg:gap-5 lg:pl-10">
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
      </div>
      <div className="w-full h-100 mt-20 text-gray-600">
        <p className="pl-4 pb-4">
          HD (720p), Full HD (1080p), Ultra HD (4K) and HDR availability subject to your internet service and device capabilities. Not all content is available in all resolutions. See our{" "}
          <Link href="/terms" className="text-blue-600 cursor-pointer">
            Terms of Use
          </Link>{" "}
          for more details.
        </p>
        <p className="pl-4 pb-4">
          Only people who live with you may use your account. Watch on 4 different devices at the same time with Premium, 2 with Standard, and 1 with Basic and Mobile.
        </p>
        <p className="pl-4">Live events are included with any Netflix plan and contain ads.</p>
        <div className="md:w-full md:flex md:flex-col md:align-center cursor-pointer">
          <Link href="/SignUp/2">
            <button className="p-5 text-white font-bold rounded-md text-2xl bg-red-500 ml-15 px-30 py-3 mt-10 md:self-center hover:cursor-pointer lg:px-50 lg:py-5 lg:mt-20 lg:ml-100">
              Next
            </button>
          </Link>
        </div>
      </div>
      <div className="border-t border-gray-300 w-full h-40 text-gray-500 flex flex-col bg-gray-200">
        <h3 className="p-2 pl-5 lg:pl-10">Questions? Contact us.</h3>
        <div className="grid grid-cols-3 grid-rows-2 gap-2 p-2 pl-5 pr-0 lg:gap-3 lg:pl-30">
          <Link href="/faq" className="hover:underline">FAQ</Link>
          <Link href="/help" className="hover:underline">Help Center</Link>
          <Link href="/terms" className="hover:underline">Terms of Use</Link>
          <Link href="/privacy" className="hover:underline">Privacy</Link>
          <Link href="/cookies" className="hover:underline">Cookie Preferences</Link>
          <Link href="/corporate" className="hover:underline">Corporate Information</Link>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="bg-white w-full h-screen text-black flex flex-col items-center justify-center gap-10">
      <div className="lg:w-full flex flex-col items-center gap-10">
        <div className="flex flex-row gap-5 justify-center items-center">
          <img src="/1 (4).png" className="w-20 h-20 md:w-30 md:h-30" alt="Icon 1" />
          <img src="/1 (3).png" className="w-20 h-20 md:w-30 md:h-30" alt="Icon 2" />
          <img src="/1 (1).png" className="w-20 h-20 md:w-25 md:h-25 md:mt-2" alt="Icon 3" />
        </div>
        <div className="text-center w-full flex flex-col items-center px-5">
          <p className="text-md md:w-full flex justify-center">
            STEP <span className="font-bold px-1">2</span> OF <span className="font-bold px-1">3</span>
          </p>
          <h2 className="text-2xl font-bold pb-5 w-70 md:w-full text-center md:text-3xl">
            Finish setting up your account
          </h2>
          <h4 className="text-center w-75 md:w-full">
            Netflix is personalized for you. Create a password to watch on any device at any time.
          </h4>
        </div>
        <Link href="/SignUp/3">
          <button className="p-5 text-white font-bold rounded-md text-2xl bg-red-500 mx-auto px-30 py-3 hover:cursor-pointer">
            Next
          </button>
        </Link>
      </div>
    </div>
  );

  const renderStep3 = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
      const storedEmail = localStorage.getItem("signupEmail");
      if (storedEmail) setEmail(storedEmail);
    }, []);

    const handleSubmit = async (e) => {
      e.preventDefault();
      setError(null);
      setIsLoading(true);

      try {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: "http://localhost:3000/Homepage" }
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

        await supabase.from("users").insert([{ email }]);
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
      <div className="w-full h-screen text-black bg-white p-10 md:flex md:flex-col md:justify-center md:items-center">
        <div className="mt-10 py-2">
          <p>
            STEP <span className="font-bold">3</span> OF
            <span className="font-bold"> 3</span>
          </p>
        </div>
        <div className="md:text-center">
          <h2 className="text-3xl py-4">Create a password to start your membership</h2>
          <p className="text-lg">Just a few more steps and you're done! We hate paperwork, too.</p>
        </div>
        <div className="md:flex md:flex-col md:items-center">
          <div className="flex flex-col md:items-center">
            <form 
              onSubmit={handleSubmit} 
              className="flex flex-col md:items-center"
              aria-label="Create account form"
            >
              <div className="w-full lg:flex lg:flex-col lg:items-center">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="border border-gray-600 px-3 py-5 mt-10 mb-3 rounded-sm md:w-90 md:h-15 text-left focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                  aria-label="Email address"
                  disabled={isLoading}
                />
              </div>
              <div className="w-full lg:flex lg:flex-col lg:items-center">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Add a password"
                  className="border border-gray-600 px-3 py-5 mb-3 rounded-sm md:w-90 md:h-15 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                  minLength={6}
                  aria-label="Password"
                  disabled={isLoading}
                />
              </div>
              <div className="flex gap-2 md:ml-20 md:w-110">
                <input
                  type="checkbox"
                  id="marketing-opt-out"
                  className="w-5 h-5 accent-red-500 cursor-pointer md:w-7 md:h-6"
                  disabled={isLoading}
                />
                <label 
                  htmlFor="marketing-opt-out"
                  className="mb-10 text-sm text-black md:text-lg md:mr-30 cursor-pointer"
                >
                  Please do not email me Netflix special offers.
                </label>
              </div>
              <button
                type="submit"
                className="text-white rounded-sm p-3 px-35 py-5 text-2xl font-bold bg-red-600 md:w-90 md:h-15 md:text-lg hover:bg-red-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
                aria-label={isLoading ? "Creating account..." : "Create account"}
              >
                {isLoading ? "Creating account..." : "Next"}
              </button>
            </form>
          </div>
        </div>
        {error && (
          <div 
            className="mt-4 p-4 rounded-md text-center"
            role="alert"
          >
            <p className={`text-lg ${error.type === 'existing_user' ? 'text-red-600' : 'text-red-500'}`}>
              {error.message}
            </p>
            {error.type === 'existing_user' && (
              <div className="mt-4">
                <p className="text-gray-600 mb-2">Would you like to sign in instead?</p>
                <Link 
                  href="/SignIn"
                  className="inline-block bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition-colors duration-200"
                >
                  Sign In
                </Link>
              </div>
            )}
          </div>
        )}
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
