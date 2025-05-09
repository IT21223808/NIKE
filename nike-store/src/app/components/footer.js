// components/Footer.js
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start text-center md:text-left">
          
          {/* Left Side: Nike Brand Info */}
          <div className="mb-8 md:mb-0 md:w-1/2">
            <h2 className="text-2xl font-bold mb-2">Nike</h2>
            <p className="text-sm text-gray-400">
              Nike is a global leader in athletic footwear, apparel, and equipment. Our mission is to bring inspiration and innovation to every athlete in the world.
            </p>
          </div>

          {/* Right Side: Existing Content */}
          <div className="md:w-1/2">
            {/* Quick Links */}
            <div className="mb-8">
              <ul className="flex justify-center md:justify-end space-x-8">
                <li><a href="/about" className="text-sm hover:text-yellow-400">About Us</a></li>
                <li><a href="/contact" className="text-sm hover:text-yellow-400">Contact</a></li>
                <li><a href="/faq" className="text-sm hover:text-yellow-400">FAQ</a></li>
                <li><a href="/terms" className="text-sm hover:text-yellow-400">Terms of Use</a></li>
                <li><a href="/privacy" className="text-sm hover:text-yellow-400">Privacy Policy</a></li>
              </ul>
            </div>

            {/* Social Media Icons */}
            <div className="mb-8 text-center md:text-right">
              <p className="text-sm mb-4">Follow us:</p>
              <div className="flex justify-center md:justify-end space-x-6 text-2xl">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-yellow-400">
                  <FaFacebook />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-yellow-400">
                  <FaInstagram />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-yellow-400">
                  <FaTwitter />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-yellow-400">
                  <FaYoutube />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm border-t border-gray-700 pt-4 mt-8">
          <p>&copy; 2025 Nike. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
