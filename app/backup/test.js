 <nav className="flex justify-between items-center p-1">
          <div className="flex flex-col justify-center items-center">
            <img
              src="../netflix2.svg"
              className="w-25 h-20 md:h-30 md:scale-180 md:ml-20"
              alt="Netflix Logo"
            />
            <div className="absolute top-6 left-25 text-left md:top-10 md:left-60">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex px-2 py-2 text-sm font-bold text-white rounded-md md:hover:cursor-pointer md:text-xl "
              >
                Browse
                <img className="w-6 h-6" src="./ddarrow.png" alt="Dropdown Arrow" />
              </button>
              {isOpen && (
                <div className="absolute right-0 left-1 font-bold w-48 bg-black text-white border-t-3 border-gray-200 divide-y divide-gray-100 shadow-2xl ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    <a href="#" className="block px-4 py-2 text-sm md:hover:bg-gray-100 md:hover:text-black">
                      Movies
                    </a>
                    <a href="#" className="block px-4 py-2 text-sm md:hover:bg-gray-100 md:hover:text-black">
                      Tv-Series
                    </a>
                    <a href="#" className="block px-4 py-2 text-sm md:hover:bg-gray-100 md:hover:text-black">
                      My List
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="flex gap-4 text-white">
            <img className="w-8 h-8 md:w-10 md:h-10" src="./search.png" alt="Search" />
            <img className="w-8 h-8 md:w-10 md:h-10" src="./notifi.png" alt="Notifications" />
            <div className="">
              <button
                onClick={() => setIsOpenP(!isOpenP)}
                className="flex text-sm font-bold text-white rounded-md md:hover:cursor-pointer"
              >
                <img className="w-8 h-8 md:w-10 md:h-10" src="./profile.png" alt="Profile" />
              </button>
              {isOpenP && (
                <div className="absolute right-0 left-1 font-bold w-48 bg-black text-white border-t-3 border-gray-200 divide-y divide-gray-100 shadow-2xl ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    <Link href="/Account" className="block px-4 py-2 text-sm text-white hover:bg-gray-100">
                      Manage Account
                    </Link>
                    <Link href="/SignIn" className="block px-4 py-2 text-sm text-white hover:bg-gray-100">
                      Sign Out
                    </Link>
                    <Link href="#" className="block px-4 py-2 text-sm text-white hover:bg-gray-100">
                      Help Center
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </nav>