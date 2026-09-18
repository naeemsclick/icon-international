import Link from 'next/link';
import { ArrowRight, ShieldCheck, Building2, Award, ChevronRight } from 'lucide-react';

interface HeroProps {
  lang: string;
  dict: any;
}

export function Hero({ lang, dict }: HeroProps) {
  const isRtl = lang === 'ar';

  return (
    <section className="relative bg-[#0d2027] text-white py-20 lg:py-28 overflow-hidden border-b border-amber-500/20">
      {/* Subtle Background Glows */}
      <div className="absolute top-0 start-1/4 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 end-10 w-[400px] h-[400px] bg-[#142c35] rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Copy */}
          <div className="lg:col-span-7 space-y-6 text-start">
            
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-[#f6d860] px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase shadow-inner">
              <ShieldCheck className="w-4 h-4 text-[#f6d860]" />
              <span>{dict.hero?.badge || 'Global Real Estate & Investment Solutions'}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white font-sans">
              {dict.hero?.title || 'Empowering Global Investments Across Borders'}
            </h1>

            <p className="text-lg text-slate-300 max-w-2xl font-light leading-relaxed">
              {dict.hero?.subtitle ||
                'Premier real estate development, investor visa processing, and corporate travel services bridging Saudi Arabia, Oman, and Bangladesh.'}
            </p>

            {/* CTAs */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                href={`/${lang}/real-estate`}
                className="inline-flex items-center gap-2.5 bg-[#f6d860] text-[#0d2027] hover:bg-amber-400 font-bold px-7 py-3.5 rounded-xl transition-all shadow-lg shadow-amber-500/20 text-base"
              >
                <span>{dict.hero?.exploreProjects || 'Explore Projects'}</span>
                <ArrowRight className={`w-5 h-5 ${isRtl ? 'rotate-180' : ''}`} />
              </Link>

              <Link
                href={`/${lang}/contact`}
                className="inline-flex items-center gap-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-6 py-3.5 rounded-xl transition-colors text-base"
              >
                <span>{dict.hero?.investWithUs || 'Invest With Us'}</span>
              </Link>

              <a
                href="https://wa.me/96898260202"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 text-sm font-semibold px-3 py-2"
              >
                <span>WhatsApp Consult →</span>
              </a>
            </div>

            {/* Highlights Bar */}
            <div className="pt-8 border-t border-white/10 grid grid-cols-3 gap-4 text-slate-300">
              <div>
                <div className="text-2xl lg:text-3xl font-bold text-[#f6d860]">$50M+</div>
                <div className="text-xs text-slate-400 mt-0.5">Asset Portfolio</div>
              </div>
              <div>
                <div className="text-2xl lg:text-3xl font-bold text-[#f6d860]">3 Countries</div>
                <div className="text-xs text-slate-400 mt-0.5">GCC & South Asia</div>
              </div>
              <div>
                <div className="text-2xl lg:text-3xl font-bold text-[#f6d860]">100% Legal</div>
                <div className="text-xs text-slate-400 mt-0.5">Compliant Ownership</div>
              </div>
            </div>

          </div>

          {/* Featured Visual Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-amber-500/30 shadow-2xl bg-[#142c35]/80 p-2 group">
              <img
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80"
                alt="Icon Tower Makkah"
                className="w-full h-80 lg:h-96 object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d2027] via-transparent to-transparent opacity-90 rounded-xl" />

              <div className="absolute bottom-6 start-6 end-6 text-white space-y-2">
                <span className="bg-amber-500/90 text-[#0d2027] text-xs font-bold px-2.5 py-1 rounded tracking-wider uppercase inline-block">
                  Featured Landmark
                </span>
                <h3 className="text-xl font-bold text-white">Icon Tower Makkah</h3>
                <p className="text-xs text-slate-300 line-clamp-2">
                  Luxury 5-Star Hotel Apartment Tower 800m from Haram Al-Sharif.
                </p>
                <div className="pt-2 flex justify-between items-center text-xs">
                  <span className="text-[#f6d860] font-semibold">Starting SAR 350,000</span>
                  <Link
                    href={`/${lang}/real-estate/project/icon-tower-makkah`}
                    className="inline-flex items-center gap-1 text-white hover:text-[#f6d860] font-medium"
                  >
                    <span>View Project</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
