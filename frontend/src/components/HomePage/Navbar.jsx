import React, { useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Features", path: "#features" },
    { name: "Pricing", path: "#pricing" },
  ];

  const dropdownLinks = [
    { name: "View Profile", path: "/viewprofile" },
    { name: "Logout", path: "/logout" },
  ];

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  React.useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <>
      <div className="top-0 sticky border-b border-slate-200/50 flex items-center justify-between text-slate-700 font-medium text-sm leading-6 container mx-auto px-6 py-4 z-40 bg-white/70 backdrop-blur-xl transition-all duration-300">
        <Link to="/">
          <div className="flex items-center gap-2 cursor-pointer group">
            <div className="bg-gradient-to-tr from-brand-600 to-brand-400 text-white p-2 rounded-xl shadow-sm shadow-brand-500/20 flex items-center justify-center transition-transform group-hover:scale-105">
              <div className="h-6 w-6 flex items-center justify-center font-bold text-xl leading-none">
                MB
              </div>
            </div>

            <h1 className="font-bold text-2xl tracking-tight text-slate-800">
              medi<span className="text-brand-600">Buddy</span>
            </h1>
          </div>
        </Link>
        <div className="flex items-center">
          <nav className="hidden lg:flex gap-x-8">
            {navLinks.map((item) => (
              <a
                key={item.name}
                href={item.path}
                className={clsx(
                  "hover:text-brand-600 transition-colors duration-200 relative group",
                  "text-slate-600"
                )}
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-500 transition-all group-hover:w-full rounded-full"></span>
              </a>
            ))}
          </nav>

          <div className="relative">
            <button
              onClick={() => setIsOpen((prev) => !prev)}
              aria-haspopup="true"
              aria-expanded={isOpen}
              className="focus:outline-none"
            ></button>
            {isOpen && (
              <div
                ref={dropdownRef}
                className="right-0 mt-2 absolute w-32 bg-slate-300 rounded-md shadow-lg z-10 text-[#0B1120] "
              >
                {dropdownLinks.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="block px-4 py-2 text-sm hover:bg-gray-200"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <div className="lg:hidden ml-4">
            <button
              onClick={() => console.log("Open Mobile Menu")}
              className="text-black"
            >
              ☰
            </button>
            {mobileMenuOpen && (
              <nav className="absolute top-full left-0 w-full bg-[#0B1120] z-50">
                {navLinks.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="block px-4 py-2 text-sm text-black hover:bg-gray-700"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;