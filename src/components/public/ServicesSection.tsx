import Link from 'next/link';
import { Building2, Plane, ShieldCheck, Users, ArrowRight } from 'lucide-react';

interface ServicesSectionProps {
  lang: string;
  dict: any;
}

export function ServicesSection({ lang, dict }: ServicesSectionProps) {
  const isRtl = lang === 'ar';

  const services = [
    {
      icon: Building2,
      title: dict.services?.realEstateTitle || 'Real Estate Development',
      desc: dict.services?.realEstateDesc || 'Premium residential, hotel, and commercial projects in Makkah, Madinah, Salalah, and Dhaka.',
      link: `/${lang}/real-estate`,
      color: 'from-amber-500/20 to-amber-600/10 text-amber-400 border-amber-500/30',
    },
    {
      icon: ShieldCheck,
      title: dict.services?.visaTitle || 'Investor Visa Processing',
      desc: dict.services?.visaDesc || 'End-to-end guidance and hassle-free processing for corporate & investor visa applications.',
      link: `/${lang}/investor-visa`,
      color: 'from-blue-500/20 to-blue-600/10 text-blue-400 border-blue-500/30',
    },
    {
      icon: Plane,
      title: dict.services?.umrahTitle || 'Umrah & B2B Travel Services',
      desc: dict.services?.umrahDesc || 'Tailored packages, visa assistance, hotel booking, and air ticketing for agency partners.',
      link: `/${lang}/umrah-ticketing`,
      color: 'from-emerald-500/20 to-emerald-600/10 text-emerald-400 border-emerald-500/30',
    },
  ];

  return (
    <section className="py-20 bg-[#0d2027] text-white border-b border-amber-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="text-[#f6d860] font-semibold text-xs tracking-widest uppercase">
            Multidisciplinary Corporate Services
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-sans">
            {dict.services?.title || 'Our Core Corporate Services'}
          </h2>
          <p className="text-slate-300 text-sm">
            {dict.services?.subtitle ||
              'Delivering excellence across real estate development, visa processing, and corporate travel.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <div
                key={idx}
                className="bg-[#142c35] border border-amber-500/20 rounded-2xl p-8 hover:border-amber-400/50 transition-all group flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} border flex items-center justify-center`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-[#f6d860] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-light">
                    {service.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/10">
                  <Link
                    href={service.link}
                    className="inline-flex items-center gap-2 text-xs font-bold text-[#f6d860] hover:text-amber-300 transition-colors"
                  >
                    <span>Learn More</span>
                    <ArrowRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
