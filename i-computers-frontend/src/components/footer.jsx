import { Link } from "react-router-dom";
import { BsTelephone } from "react-icons/bs";
import { FaWhatsapp, FaFacebook, FaYoutube } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { FaInstagram } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <div className="w-full bg-primary text-secondary border-t border-accent/20 mt-10">
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-3">
            <div className="w-24 h-24 bg-accent rounded-full overflow-hidden mb-2">
                <img src="/logo2.png" alt="i Computers Logo" className="w-full h-full"/>
            </div>
          <h2 className="text-2xl font-extrabold tracking-wide">
            <span className="text-accent">i</span> Computers
          </h2>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-accent/80 mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2 text-md">
            <li>
              <Link
                to="/"
                className="hover:text-accent transition-colors duration-150"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/products"
                className="hover:text-accent transition-colors duration-150"
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:text-accent transition-colors duration-150"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-accent transition-colors duration-150"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Right: Contact details */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-accent/80 mb-4">
            Contact & Support
          </h3>

          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <BsTelephone className="mt-0.5 text-accent" />
              <span>+94 11 23 45 678</span>
            </li>

            <li className="flex items-start gap-2">
              <FaWhatsapp className="mt-0.5 text-accent" />
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors duration-150"
              >
                Chat on WhatsApp
              </a>
            </li>

            <li className="flex items-start gap-2">
              <MdOutlineEmail className="mt-0.5 text-accent" />
              <a
                href="mailto:icomputers@example.com"
                className="hover:text-accent transition-colors duration-150 break-all"
              >
                icomputersSL@gmail.com
              </a>
            </li>

            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-accent">📍</span>
              <span>
                No. 99, New Kandy Road,
                <br />
                Kiribathgoda, Sri Lanka
              </span>
            </li>

            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-accent">⏰</span>
              <span>Mon – Sat: 9.00 AM – 7.00 PM</span>
            </li>
          </ul>

          <div className="flex items-center gap-1.5 lg:gap-3 mt-4">
            <h2>Follow</h2>
            <a
              href="#"
              className="p-2 rounded-full border border-accent/40 hover:bg-accent hover:text-primary transition-colors duration-150"
            >
              <FaFacebook size={20} />
            </a>
            <a
              href="#"
              className="p-2 rounded-full border border-accent/40 bg-primary hover:text-primary hover:bg-secondary transition-colors duration-150"
            >
              <FaTiktok size={20} />
            </a>
            <a
                href="#"
                className="p-2 rounded-full border border-accent/40 hover:bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] hover:text-primary transition-colors duration-150"
            >
                <FaInstagram size={20} />
            </a>
            
            <a
              href="#"
              className="p-2 rounded-full border border-accent/40 bg-primary hover:text-primary hover:bg-secondary transition-colors duration-150"
            >
              <FaXTwitter size={20} />
            </a>
            <a
              href="#"
              className="p-2 rounded-full border border-accent/40 bg-primary hover:text-primary hover:bg-red-600 transition-colors duration-150"
            >
              <FaYoutube size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-accent/10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-secondary/70">
          <p>© {new Date().getFullYear()} i Computers. All rights reserved.</p>
          <p className="text-[11px]">
            Designed & developed by
            <span className="text-accent font-semibold"> thixxa</span>
          </p>
        </div>
      </div>
    </div>
  );
}
