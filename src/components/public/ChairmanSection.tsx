import Link from 'next/link';
import { Calendar, UserCheck, ArrowRight, Award } from 'lucide-react';

interface ChairmanSectionProps {
  lang: string;
  dict: any;
}

export function ChairmanSection({ lang, dict }: ChairmanSectionProps) {
  const isRtl = lang === 'ar';

  return (
    <section className="py-20 bg-[#07151a] text-white border-b border-amber-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Chairman Portrait Photo Container */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-amber-500/30 p-2 bg-[#0d2027] shadow-2xl group">
              <img
                src="/images/chairman.jpg"
                alt="Executive Chairman Icon International"
                className="w-full h-[420px] object-cover object-top rounded-xl group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d2027] via-transparent to-transparent opacity-90 rounded-xl" />
              
              <div className="absolute bottom-6 start-6 end-6 text-white space-y-1">
                <span className="bg-[#f6d860] text-[#0d2027] font-extrabold text-[10px] px-2.5 py-1 rounded uppercase tracking-widest inline-block shadow">
                  Executive Leadership
                </span>
                <h3 className="text-xl font-bold">Office of the Chairman</h3>
                <p className="text-xs text-slate-300">Strategic Vision & Global Real Estate Alliances</p>
              </div>
            </div>
          </div>

          {/* Chairman Leadership Copy */}
          <div className="lg:col-span-7 space-y-6 text-start">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-[#f6d860] px-3.5 py-1.5 rounded-full text-xs font-semibold">
              <Award className="w-4 h-4" />
              <span>Chairman's Message & Leadership</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-sans leading-tight">
              Driving Visionary Real Estate & Investment Capital Across Borders
            </h2>

            <p className="text-slate-300 text-sm leading-relaxed font-light">
              "Our mission at Icon International is built upon absolute integrity, transparent legal structures, and creating sustainable value for investors, institutional partners, and corporate clients across Saudi Arabia, Oman, and Bangladesh."
            </p>

            <div className="p-5 rounded-2xl bg-[#0d2027] border border-amber-500/20 text-xs text-slate-300 space-y-2 shadow-inner">
              <div className="flex items-center gap-2 text-white font-semibold">
                <UserCheck className="w-4 h-4 text-[#f6d860]" />
                <span>Executive Consultation & Direct Appointments</span>
              </div>
              <p>
                Interested in high-ticket real-estate acquisition or corporate agency partnerships? Schedule a direct appointment with the Chairman's Office.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                href={`/${lang}/chairman`}
                className="inline-flex items-center gap-2.5 bg-[#f6d860] text-[#0d2027] hover:bg-amber-400 font-bold px-6 py-3 rounded-xl transition-all shadow-lg shadow-amber-500/20 text-sm"
              >
                <Calendar className="w-4 h-4" />
                <span>Request Executive Meeting</span>
                <ArrowRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
