import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="w-full min-h-screen bg-primary text-secondary flex flex-col">
      <main className="relative flex-1 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/homeviewpagebg.jpg')" }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/75 to-primary/95"></div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 py-10 lg:py-16 flex flex-col gap-10">
          <div className="grid gap-8 lg:grid-cols-[3fr,2fr] items-center">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[33px] tracking-[0.25em] text-accent">
                <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                i Computers
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
                Power up your{" "}
                <span className="text-accent">gaming setup.</span>
              </h1>

              <p className="text-sm sm:text-base text-gray-200/90 max-w-xl leading-relaxed text-justify">
                i Computers is your local hub for gaming laptops, custom gaming
                PCs and pro-grade accessories. From casual play to esports,
                we&apos;ll build a setup that keeps up with your skills.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  to="/products"
                  className="px-6 py-3 rounded-full border-2 text-sm font-semibold bg-accent lg:bg-accent/30 text-white lg:hover:bg-accent transition hover:scale-105"
                >
                  View Gaming Products
                </Link>
              </div>

              <div className="flex flex-wrap gap-2 pt-4 text-[11px] sm:text-lg text-gray-200">
                <span className="px-3 py-1 rounded-full bg-white/20">
                  Gaming Laptops
                </span>
                <span className="px-3 py-1 rounded-full bg-white/20">
                  Custom Gaming PCs
                </span>
                <span className="px-3 py-1 rounded-full bg-white/20">
                  Monitors & Peripherals
                </span>
                <span className="px-3 py-1 rounded-full bg-white/20">
                  RGB Accessories
                </span>
              </div>
            </div>
            <div className="w-full">
              <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-6 lg:p-7 space-y-4">
                <h2 className="text-lg font-semibold text-white">
                  Choose your play style
                </h2>
                <p className="text-xs sm:text-sm text-gray-200/90 leading-relaxed text-justify">
                  FPS, MOBA, RPG or streaming – tell us your favourite games and
                  budget, and we&apos;ll suggest the best laptop or custom PC
                  with the right graphics, processor and peripherals.
                </p>

                <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm">
                  <div className="rounded-xl bg-black/40 p-3">
                    <p className="font-semibold text-accent text-center mb-1">
                      Competitive
                    </p>
                    <p className="text-gray-200/80 text-center">
                      High refresh monitors, low-latency mice and keyboards.
                    </p>
                  </div>
                  <div className="rounded-xl bg-black/40 p-3">
                    <p className="font-semibold text-accent text-center mb-1">
                      High-End Gaming
                    </p>
                    <p className="text-gray-200/80 text-center">
                      Powerful GPUs, cooling and upgrade-ready builds.
                    </p>
                  </div>
                  <div className="rounded-xl bg-black/40 p-3">
                    <p className="font-semibold text-accent text-center mb-1">
                      Budget Gaming
                    </p>
                    <p className="text-gray-200/80 text-center">
                      Smart combos that give max FPS for your money.
                    </p>
                  </div>
                  <div className="rounded-xl bg-black/40 p-3">
                    <p className="font-semibold text-accent text-center mb-1">
                      Streaming & Content
                    </p>
                    <p className="text-gray-200/80 text-center">
                      Multitasking rigs for recording, editing and streaming.
                    </p>
                  </div>
                </div>

                <div className="text-center">
                <Link
                  to="/contact"
                  className="inline-block w-[30%] mt-2 px-4 py-2.5 rounded-full border-2 text-sm font-semibold bg-accent lg:bg-accent/30 text-white lg:hover:bg-accent transition hover:scale-105"
                >
                  Get Advice
                </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="grid gap-4 sm:gap-6 sm:grid-cols-3">
            <div className="rounded-xl bg-black/60 border border-white/10 p-4">
              <h3 className="font-semibold text-accent text-center mb-1">
                Gaming-Ready Systems
              </h3>
              <p className="text-xs sm:text-sm text-gray-200/85 text-center">
                Latest gaming laptops and desktops tuned for smooth performance
                in modern titles.
              </p>
            </div>

            <div className="rounded-xl bg-black/60 border border-white/10 p-4">
              <h3 className="font-semibold text-accent text-center mb-1">
                Pro Accessories
              </h3>
              <p className="text-xs sm:text-sm text-gray-200/85 text-center">
                Mechanical keyboards, high-DPI mice, headsets, controllers, RGB
                gear and more.
              </p>
            </div>

            <div className="rounded-xl bg-black/60 border border-white/10 p-4">
              <h3 className="font-semibold text-accent text-center mb-1">
                Service & Upgrades
              </h3>
              <p className="text-xs sm:text-sm text-gray-200/85 text-center">
                RAM, SSD and GPU upgrades, cleaning, thermal paste and full
                system health checks.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
