import { useState, useEffect, useRef } from "react";
import { Bell, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom"; 
import logo from "../../../assets/images/nium-logo.png"; 
import { navItems } from "./NavItems";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation(); // Use location to check the current active route
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

// Close dropdown when clicking outside
useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setDropdownOpen(null);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);
  
const handleDropdownToggle = (title: string) => {
    setDropdownOpen(dropdownOpen === title ? null : title); // Toggle dropdown open/close
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen); // Toggle mobile menu visibility
  };


  const getNavItemClass = (path: string, isDropdown: boolean = false) => {
    const isActive = location.pathname === path;
    return `
       ${isActive || (dropdownOpen === path && isDropdown) ? 'text-text-black border-b-2 border-black' : ''}
      hover:text-gray-800 focus:outline-none focus:border-b-2 focus:border-black
    `;
  };
  
  
  return (
    <nav className="p-4">
      <div className="container mx-auto flex justify-between items-center">
      {/* Mobile Menu Button on the Left */}
      <button
        onClick={toggleMobileMenu}
        className="md:hidden focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

  {/* Logo on the Right */}
  <img src={logo} className="h-10 ml-auto" />
</div>
      

      <div className="container mx-auto flex justify-center items-center">
        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-4" ref={dropdownRef}>
          <ul className="flex justify-between items-center lg:space-x-12 md:space-x-2">
            {navItems.map((item, index) => (
              <li key={index} className="relative">
                {!item.dropdown ? (
                  <Link
                    to={item.path || ''}
                    className={`${getNavItemClass(item.path || '')}`}
                  >
                    {item.title}
                  </Link>
                ) : (
                  <div className="relative" >
                    <button
                      onClick={() => handleDropdownToggle(item.title)}
                      className={`${getNavItemClass(item.path || '', true)} bg-transparent`}
                    >
                      {item.title}
                    </button>
                    {dropdownOpen === item.title && (
                      <div className="absolute left-0 mt-2 rounded-md shadow-lg w-48">
                        <ul>
                          {item.dropdown.map((subItem, index) => (
                            <li key={index}  onClick={() => handleDropdownToggle(item.title)}>
                              <Link
                                to={subItem.path}
                                className="block px-4 py-2 hover:bg-gray-100 hover:text-black focus:outline-none focus:bg-gray-100 focus:text-black"
                              >
                                {subItem.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>
          
          
        </div>
        <div className="flex space-x-2 ml-auto">
        <button className="hover:bg-gray-200 text-gray-400 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500">
          <Bell size={20} />
        </button>
        <button className="hover:bg-gray-200 text-gray-400 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500">
          <User size={20} />
        </button>
      </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-50  text-black p-4 space-y-4">
          {navItems.map((item, index) => (
            <div key={index}>
              {!item.dropdown ? (
                <Link
                  to={item.path || ''}
                  className={`${getNavItemClass(item.path || '')}`}
                 onClick={()=> setMobileMenuOpen(!mobileMenuOpen)}>
                  {item.title}
                </Link>
              ) : (
                <div className="relative">
                  <button
                    onClick={() => handleDropdownToggle(item.title)}
                    className={`${getNavItemClass(item.path || '', true)} bg-transparent`}
                  >
                    {item.title}
                  </button>
                  {dropdownOpen === item.title && (
                    <div className="rounded-md shadow-lg w-full">
                      <ul>
                        {item.dropdown.map((subItem, index) => (
                          <li key={index} onClick={()=> setMobileMenuOpen(!mobileMenuOpen)}>
                            <Link
                              to={subItem.path}
                              className="block px-4 py-2 hover:bg-gray-200 hover:text-black focus:outline-none focus:border-b-2 focus:border-blue-500"
                            >
                              {subItem.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Header;
