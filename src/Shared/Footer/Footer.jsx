import { FaFacebookF, FaGithub, FaInstagram, FaYoutube } from "react-icons/fa";
import { Link } from "react-router";
import Logo from "../Logo/Logo";


const Footer = () => {
  return (
    <footer className=" px-6 border-t border-gray-300 text-gray-800  py-10">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left justify-between text-[16px] font-medium ">
        {/* Logo and Website Name */}
        <div>
          <div className="flex items-center gap-3">
              <Logo></Logo>
              <h1 className='lg:text-2xl text-xl font-bold'>BazaarTracker <span className='text-[#00B795]'>BD</span></h1>
          </div>
          <p className="mt-2">
            Your trusted daily local price partner.
          </p>
        </div>

        {/* Contact Details */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Contact</h2>
          <p>Email: support@bazaartracker.com</p>
          <p>Phone: +880 1869452239</p>
          <p>Address: Dhaka, Bangladesh</p>
        </div>

        {/* Links */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Legal & Social</h2>
          <Link to='terms'><p className="mb-2 underline  decoration-[#00B795] decoration-2 cursor-pointer">Terms & Conditions</p></Link>
          <div className="flex justify-center md:justify-start gap-4 text-2xl mt-4">
            
            <a className="p-3 border hover:border-[#22A587] hover:bg-[#E6F7F4] border-gray-500 bg-gray-100 rounded-full" href="https://www.facebook.com/sk.shihab.73594" target="_blank">
              <FaFacebookF className="" />
            </a>
            <a className="p-3 border hover:border-[#22A587] hover:bg-[#E6F7F4] border-gray-500 bg-gray-100 rounded-full" href="https://github.com/Shihab177" target="_blank">
              <FaGithub className="" />
            </a>
           
            <a className="p-3 border hover:border-[#22A587] hover:bg-[#E6F7F4] border-gray-500 bg-gray-100 rounded-full" href="http://www.youtube.com/@ultracoder-j3i" target="_blank">
              <FaYoutube className="" />
            </a>
             <a className="p-3 border hover:border-[#22A587] hover:bg-[#E6F7F4] border-gray-500 bg-gray-100 rounded-full" href="#" target="_blank">
              <FaInstagram className="" />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center text-gray-800 text-sm mt-10">
        &copy; {new Date().getFullYear()} BazaarTracker. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
