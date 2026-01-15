export default function AboutPage() {
  return (
    <div className="w-full min-h-screen bg-primary text-secondary flex flex-col">
      <main className="relative flex-1 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/homeviewpagebg.jpg')" }}
        ></div>

        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/75 to-primary/25"></div>
      
        <div className="relative z-10 max-w-6xl mx-auto px-4 py-10 lg:py-16">
          <div className="flex flex-col lg:flex-row gap-10 items-center">
            <div className="flex-1 space-y-5">
              <p className="uppercase tracking-[0.25em] text-sm text-accent/80 font-semibold">
                About Us
              </p>
              <h1 className="text-2xl lg:text-4xl font-extrabold text-primary">
                Welcome to <span className="text-accent">i Computers</span>
              </h1>
              <p className="text-base lg:text-lg text-primary/70 leading-relaxed text-justify">
                i Computers is your trusted partner for all kinds of gaming computer
                products and services. From brand new laptops and desktops to
                accessories, upgrades, and repairs, we provide everything you need
                to stay connected and productive.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                <div className="bg-white/15 shadow-md rounded-xl px-4 py-3 text-center">
                  <p className="text-xl font-bold text-accent">Genuine</p>
                  <p className="text-md text-primary/70">Branded products</p>
                </div>
                <div className="bg-white/15 shadow-md rounded-xl px-4 py-3 text-center">
                  <p className="text-xl font-bold text-accent">Support</p>
                  <p className="text-md text-primary/70">After-sales service</p>
                </div>
                <div className="bg-white/15 shadow-md rounded-xl px-4 py-3 text-center">
                  <p className="text-xl font-bold text-accent">Repairs</p>
                  <p className="text-md text-primary/70">PC & laptop service</p>
                </div>
                <div className="bg-white/15 shadow-md rounded-xl px-4 py-3 text-center">
                  <p className="text-xl font-bold text-accent">Affordable</p>
                  <p className="text-md text-primary/70">Competitive prices</p>
                </div>
              </div>
            </div>

            <div className="flex-1 w-full">
              <div className="bg-accent/20 rounded-2xl shadow-2xl p-6 lg:p-8 border border-accent/10">
                <h2 className="text-xl lg:text-2xl font-bold mb-3 text-accent">
                  What We Offer
                </h2>
                <ul className="text-md text-primary/70 space-y-2 list-disc list-inside mb-4">
                  <li>Brand new laptops, desktops, and all-in-one PCs</li>
                  <li>Monitors, keyboards, mice, and other accessories</li>
                  <li>Custom-built PCs for gaming</li>
                  <li>Upgrades: RAM, SSD, graphics cards, and more</li>
                  <li>Software installation and basic setup</li>
                  <li>Hardware diagnostics, repairs, and maintenance</li>
                </ul>
                <p className="text-md text-primary/70 leading-relaxed text-justify">
                  Our team is always ready to help you compare options and find
                  the best solution for your needs without any confusing jargon
                  or unnecessary upselling.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 lg:mt-16 grid lg:grid-cols-2 gap-8">
            <div className="bg-accent/20 rounded-2xl shadow-md p-6 border border-accent/5">
              <h2 className="text-xl lg:text-2xl font-bold mb-3 text-accent">Our Mission</h2>
              <p className="text-md text-primary/70 leading-relaxed text-justify">
                At i Computers, our mission is to make technology simple,
                reliable, and accessible for everyone. We focus on providing
                trusted products and service, so you can feel confident about
                every purchase you make with us.
              </p>
            </div>

            <div className="bg-accent/20 rounded-2xl shadow-md p-6 border border-accent/10">
              <h2 className="text-xl lg:text-2xl font-bold mb-3 text-primary">Why Choose <span className="text-accent">i Computers</span> ? </h2>
              <ul className="text-md text-primary/70 space-y-2 list-disc list-inside">
                <li>Genuine and reliable computer brands</li>
                <li>Friendly, experienced staff to guide you</li>
                <li>Clear pricing with no hidden charges</li>
                <li>Quick service and after-sales support</li>
                <li>Solutions for home users, students, and businesses</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 lg:mt-16 text-center">
            <h2 className="text-2xl font-extrabold mb-3 text-accent">
              Everything You Need in One Computer Shop
            </h2>
            <p className="text-sm text-primary/75 max-w-2xl mx-auto mb-6">
              Looking for a new computer, an upgrade, or a quick repair? i
              Computers is here to help. Browse our products online or contact us
              for more details about stock, pricing, and services.
            </p>
            <a
              href="/products"
              className="inline-block px-6 py-3 bg-accent lg:bg-accent/60 text-white rounded-full text-sm font-semibold hover:bg-accent hover:scale-105 transition-transform"
            >
              Shop Now
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
