import { getDictionary, Locale } from '@/lib/i18n/dictionaries';
import { B2BAgencyForm } from '@/components/public/B2BAgencyForm';
import { Plane, Building, Compass, ShieldCheck, Ticket, Users } from 'lucide-react';

export default async function UmrahTicketingPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const b2bFeatures = [
    { icon: Compass, title: 'Umrah Visa Facilitation', desc: 'Fast-track B2B Umrah visa processing with official Ministry portal integration.' },
    { icon: Building, title: 'Makkah & Madinah Hotel Inventory', desc: 'Direct contracts with 3-star, 4-star, and 5-star hotel towers near the Haram.' },
    { icon: Ticket, title: 'Group Air Ticketing', desc: 'Competitive group fares on Saudi Arabian Airlines, Oman Air, Biman Bangladesh, and Gulf carriers.' },
    { icon: Users, title: 'Ground Transport Logistics', desc: 'Luxury buses, GMCs, and private transfers between Jeddah, Makkah, and Madinah.' },
  ];

  return (
    <div className="py-12 bg-[#0d2027] text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Page Header */}
        <div className="text-start space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-3.5 py-1.5 rounded-full text-xs font-semibold">
            <Plane className="w-4 h-4" />
            <span>B2B Agency Portal & Corporate Travel</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
            Umrah Visa, Hotel Inventory & Air Ticketing B2B Portal
          </h1>

          <p className="text-slate-300 text-sm leading-relaxed">
            Icon International partners with licensed travel agencies, Hajj/Umrah operators, and corporate clients across Bangladesh, Oman, and the UK to provide wholesale Umrah packages, hotel allotments, and group air ticketing.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {b2bFeatures.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div key={idx} className="bg-[#142c35] border border-amber-500/20 p-6 rounded-2xl space-y-3">
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-[#f6d860] border border-amber-500/30 flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white">{feat.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{feat.desc}</p>
              </div>
            );
          })}
        </div>

        {/* B2B Agency Registration Form Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#142c35] border border-amber-500/20 p-8 rounded-2xl space-y-4">
              <h2 className="text-2xl font-bold text-white">Partner Agency Benefits</h2>
              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Verified B2B Wholesale Pricing for Umrah Visa & Hotels</span>
                </li>
                <li className="flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Dedicated Account Manager & 24/7 Operations Desk</span>
                </li>
                <li className="flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Flexible Payment Terms & Credit Facility for Approved Partners</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-7 bg-[#142c35] border border-amber-500/30 p-8 rounded-2xl space-y-6 shadow-2xl">
            <div className="border-b border-amber-500/30 pb-4">
              <h2 className="text-2xl font-bold text-white">B2B Agency Registration Application</h2>
              <p className="text-xs text-slate-300">
                Register your agency to access wholesale Umrah packages, visa quotas, and ticketing rates.
              </p>
            </div>

            <B2BAgencyForm />
          </div>
        </div>

      </div>
    </div>
  );
}
