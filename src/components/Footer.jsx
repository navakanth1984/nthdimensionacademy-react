import React from 'react';
import { Mail, Settings } from 'lucide-react';

const InstagramIcon = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export default function Footer({ onOpenAdmin }) {
  return (
    <footer id="contact" className="py-16 mt-20 relative bg-black/60 border-t border-[#ffd700]/10 backdrop-blur-md">
      <div className="max-w-[1200px] mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 justify-between">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-lg md:text-xl font-bold text-cosmic-gold tracking-widest uppercase">
              <picture>
                <source media="(max-width: 768px)" srcSet="/assets/In_the_middle_of_the_202605052332.jpeg" />
                <img 
                  src="/assets/Merge_these_images_and_create_202605052035.jpeg" 
                  alt="Logo" 
                  className="h-10 w-10 rounded-full border border-cosmic-gold/50 object-cover shadow-[0_0_10px_rgba(255,215,0,0.5)]" 
                />
              </picture>
              <span>N<span className="nth-style">TH</span> Dimension Academy</span>
            </div>
            <p className="text-sm text-gray-400 font-light max-w-sm">
              Empowering the next generation of Cloud & Data Architects.
            </p>
          </div>

          {/* Contact Details */}
          <div className="space-y-4 md:text-right md:flex md:flex-col md:items-end">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Contact
            </h4>
            <div className="flex flex-col gap-2 text-sm text-gray-400">
              <a 
                href="mailto:mct@nthdimensionacademy.com" 
                className="flex items-center gap-2 md:justify-end hover:text-hyper-drive-blue transition-colors duration-300"
              >
                <Mail className="h-4 w-4" />
                <span>mct@nthdimensionacademy.com</span>
              </a>
              <a 
                href="tel:+919885757677" 
                className="flex items-center gap-2 md:justify-end hover:text-hyper-drive-blue transition-colors duration-300"
              >
                <Phone className="h-4 w-4" />
                <span>+91 9885757677</span>
              </a>
              <a 
                href="https://instagram.com/nthdimensionacademy" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 md:justify-end hover:text-hyper-drive-blue transition-colors duration-300"
              >
                <InstagramIcon className="h-4 w-4" />
                <span>@nthdimensionacademy</span>
              </a>
              {onOpenAdmin && (
                <button 
                  onClick={onOpenAdmin}
                  className="flex items-center gap-2 md:justify-end text-xs text-gray-500 hover:text-cosmic-gold mt-2 transition-colors cursor-pointer bg-transparent border-none p-0 outline-none w-fit self-end"
                >
                  <Settings className="h-3.5 w-3.5" />
                  <span>Admin Console</span>
                </button>
              )}
            </div>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="pt-8 mt-8 border-t border-white/5 text-center text-xs text-gray-500">
          <p>&copy; 2026 N<span className="nth-style">TH</span> Dimension Academy. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
}
