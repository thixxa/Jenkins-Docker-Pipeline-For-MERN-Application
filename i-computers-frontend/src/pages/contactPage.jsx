import { BsTelephone } from "react-icons/bs";
import { FaWhatsapp } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { Link } from "react-router-dom";

export default function ContactPage() {
  return (
    <div className="w-full min-h-screen bg-primary text-secondary flex flex-col">
      <main className="relative flex-1 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/homeviewpagebg.jpg')" }}
        ></div>
        
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/75 to-primary/35"></div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 py-10 lg:py-16 flex flex-col gap-10">
          <div className="flex flex-col gap-10 items-start">
            <div className="flex-1 space-y-5">
              <p className="uppercase tracking-[0.25em] text-sm text-accent/80 font-semibold">
                Contact Us
              </p>

              <h1 className="text-3xl lg:text-4xl font-extrabold leading-snug text-primary">
                Get in Touch with <span className="text-accent">i Computers</span>
              </h1>

              <p className="text-base lg:text-lg text-primary/70 leading-relaxed text-justify">
                Need help with a product, looking for availability, or have questions about
                your order? Our team at <span className="font-semibold text-accent">i Computers</span> is ready to assist you anytime.
              </p>

              <p className="text-md text-primary/70 leading-relaxed text-justify">
                Reach us through the following methods:
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                <Link to="#" className="bg-secondary/85 shadow-md rounded-xl px-4 py-4 text-center hover:scale-105 transition-transform">
                  <p className="text-xl font-bold text-accent flex justify-center items-center gap-2">
                    <BsTelephone /> Call
                  </p>
                  <p className="text-md text-primary/70 mt-1">+94112345678</p>
                </Link>

                <Link to="#" className="bg-secondary/85 shadow-md rounded-xl px-4 py-4 text-center hover:scale-105 transition-transform">
                  <p className="text-xl font-bold text-accent flex justify-center items-center gap-2">
                    <FaWhatsapp /> WhatsApp
                  </p>
                  <p className="text-md text-primary/70 mt-1">+94779865432</p>
                </Link>

                <Link to="#" className="bg-secondary/85 shadow-md rounded-xl px-4 py-4 text-center hover:scale-105 transition-transform">
                  <p className="text-xl font-bold text-accent flex justify-center items-center gap-2">
                    <FaFacebook /> Facebook
                  </p>
                  <p className="text-md text-primary/70 mt-1">i-Computers</p>
                </Link>

                <Link to="#" className="bg-secondary/85 shadow-md rounded-xl px-4 py-4 text-center hover:scale-105 transition-transform">
                  <p className="text-xl font-bold text-accent flex justify-center items-center gap-2">
                    <MdOutlineEmail /> Email
                  </p>
                  <p className="text-md text-primary/70 mt-1 break-all">
                    icomputersSL@gmail.com
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
