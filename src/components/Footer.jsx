import { Mail, Settings, Phone } from 'lucide-react';

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

const YoutubeIcon = (props) => (
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
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
    <polygon points="10 15 15 12 10 9" />
  </svg>
);

export default function Footer({ onOpenAdmin }) {
  return (
    <footer id="contact" className="py-16 mt-20 relative bg-black/60 border-t border-[#ffd700]/10 backdrop-blur-md">
      <div className="max-w-[1200px] mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 justify-between">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-lg md:text-xl font-bold text-cosmic-gold tracking-widest uppercase">
              <img
                src="/assets/Merge_these_images_and_create_202605052035.jpeg"
                alt="Logo"
                className="h-10 w-10 rounded-full border border-cosmic-gold/50 object-cover shadow-[0_0_10px_rgba(255,215,0,0.5)]"
              />
              <span>N<span className="nth-style">TH</span> Dimension Academy</span>
            </div>
            <p className="text-sm text-gray-400 font-light max-w-sm">
              Empowering the next generation of Cloud &amp; Data Architects through enterprise-grade Microsoft Fabric and Azure Databricks enablement.
            </p>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#ffd700]/10 border border-[#ffd700]/20 text-[11px] font-semibold text-[#ffd700]">
              <span>MCT Accredited Practice</span>
            </div>
          </div>

          {/* Certification Atlases */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Learning Atlases
            </h4>
            <ul className="flex flex-col gap-2 text-sm text-gray-400 list-none p-0 m-0">
              <li>
                <a href="/dp600-atlas/" className="hover:text-hyper-drive-blue transition-colors">
                  DP-600: Fabric Analytics
                </a>
              </li>
              <li>
                <a href="/dp700-atlas/" className="hover:text-hyper-drive-blue transition-colors">
                  DP-700: Fabric Data Eng
                </a>
              </li>
              <li>
                <a href="/dp750-atlas/" className="hover:text-hyper-drive-blue transition-colors">
                  DP-750: Azure Databricks
                </a>
              </li>
              <li>
                <a href="/dp800-atlas/" className="hover:text-hyper-drive-blue transition-colors">
                  DP-800: Fabric Warehouse
                </a>
              </li>
              <li>
                <a href="/ai103-atlas/" className="hover:text-hyper-drive-blue transition-colors">
                  AI-103: Azure AI Foundry
                </a>
              </li>
            </ul>
          </div>

          {/* Trust & Company */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Trust &amp; Governance
            </h4>
            <ul className="flex flex-col gap-2 text-sm text-gray-400 list-none p-0 m-0">
              <li>
                <a href="/about/" className="hover:text-hyper-drive-blue transition-colors">
                  About the Academy
                </a>
              </li>
              <li>
                <a href="/contact/" className="hover:text-hyper-drive-blue transition-colors">
                  Contact &amp; Mentorship
                </a>
              </li>
              <li>
                <a href="/privacy/" className="hover:text-hyper-drive-blue transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms/" className="hover:text-hyper-drive-blue transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/llms.txt" className="text-cosmic-gold hover:text-hyper-drive-blue transition-colors font-mono text-xs">
                  llms.txt (AI Spec)
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3 lg:text-right lg:flex lg:flex-col lg:items-end">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Get in Touch
            </h4>
            <div className="flex flex-col gap-2 text-sm text-gray-400">
              <a 
                href="mailto:mct@nthdimensionacademy.com" 
                className="flex items-center gap-2 lg:justify-end hover:text-hyper-drive-blue transition-colors duration-300"
              >
                <Mail className="h-4 w-4" />
                <span>mct@nthdimensionacademy.com</span>
              </a>
              <a 
                href="tel:+916304980314" 
                className="flex items-center gap-2 lg:justify-end hover:text-hyper-drive-blue transition-colors duration-300"
              >
                <Phone className="h-4 w-4" />
                <span>+91 6304980314</span>
              </a>
              <a 
                href="https://www.youtube.com/@nthdimensionacademy" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 lg:justify-end hover:text-hyper-drive-blue transition-colors duration-300"
              >
                <YoutubeIcon className="h-4 w-4" />
                <span>YouTube</span>
              </a>
              <a 
                href="https://instagram.com/nthdimensionacademy" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative flex items-center gap-2 lg:justify-end hover:text-hyper-drive-blue transition-colors duration-300"
              >
                <InstagramIcon className="h-4 w-4" />
                <span>@nthdimensionacademy</span>
                <div className="absolute bottom-full mb-2 hidden group-hover:block w-36 h-36 bg-[#05070f]/95 border border-hyper-drive-blue/30 rounded-xl p-2 shadow-[0_0_20px_rgba(0,240,255,0.3)] z-50 backdrop-blur-md left-1/2 -translate-x-1/2 lg:left-auto lg:translate-x-0 lg:right-0">
                  <img src="/assets/instagram_qr.png" alt="Instagram QR Code" className="w-full h-full object-cover rounded-lg" />
                </div>
              </a>
              {onOpenAdmin && (
                <button 
                  onClick={onOpenAdmin}
                  className="flex items-center gap-2 lg:justify-end text-xs text-gray-500 hover:text-cosmic-gold mt-2 transition-colors cursor-pointer bg-transparent border-none p-0 outline-none w-fit self-start lg:self-end"
                >
                  <Settings className="h-3.5 w-3.5" />
                  <span>Admin Console</span>
                </button>
              )}
            </div>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="pt-8 mt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-4">
          <p>&copy; 2026 N<span className="nth-style">TH</span> Dimension Academy. All rights reserved.</p>
          <p>HITEC City, Hyderabad, Telangana 500081, India</p>
        </div>

      </div>
    </footer>
  );
}
