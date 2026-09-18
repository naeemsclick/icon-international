import { getDictionary, Locale } from '@/lib/i18n/dictionaries';
import { db } from '@/lib/db';
import Link from 'next/link';
import { Building2, ShieldCheck, Award, Globe, Users, ArrowRight } from 'lucide-react';

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang as Locale;
  const dict = await getDictionary(lang);

  const offices = await db.office.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: 'asc' },
  });

  return (
    <div className="py-16 bg-[#0d2027] text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Hero Banner */}
        <div className="text-start space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-[#f6d860] px-3.5 py-1.5 rounded-full text-xs font-semibold">
            <Award className="w-4 h-4" />
            <span>About Icon International</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
            Bridging Real Estate Development & Global Investments
          </h1>

          <p className="text-slate-300 text-sm leading-relaxed font-light">
            Icon International is an established corporate enterprise with presence across the Sultanate of Oman, Saudi Arabia, the United Kingdom, the United States, and Bangladesh. We specialize in high-yielding hospitality developments, residential projects, investor visa facilitation, and corporate B2B services.
          </p>
        </div>

        {/* Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#142c35] border border-amber-500/20 p-8 rounded-2xl space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-[#f6d860] flex items-center justify-center font-bold">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Real Estate Excellence</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Developing 5-star hotel apartment towers in Makkah and beachfront luxury flats in Salalah with transparent ownership structures.
            </p>
          </div>

          <div className="bg-[#142c35] border border-amber-500/20 p-8 rounded-2xl space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Legal Integrity & Safety</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Every investment program operates strictly under Ministry regulations, offering full legal deeds and clear investor protections.
            </p>
          </div>

          <div className="bg-[#142c35] border border-amber-500/20 p-8 rounded-2xl space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-[#f6d860] flex items-center justify-center font-bold">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">International Reach</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Connecting expatriate investors, GCC nationals, and institutional partners through established regional offices.
            </p>
          </div>
        </div>

        {/* Global Representation Grid */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white border-b border-amber-500/30 pb-3">
            Our Global Office Directory
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {offices.map((office) => (
              <div key={office.id} className="bg-[#142c35] border border-amber-500/20 p-6 rounded-2xl space-y-2">
                <div className="text-xs font-bold text-[#f6d860] uppercase">{office.country}</div>
                <h4 className="text-lg font-bold text-white">{office.name}</h4>
                <p className="text-xs text-slate-300">{office.address}</p>
                <div className="text-xs text-slate-400 pt-2 border-t border-white/10">
                  Phone: <a href={`tel:${office.phone}`} className="text-white hover:underline">{office.phone}</a>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
