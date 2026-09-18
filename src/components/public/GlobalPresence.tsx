import Link from 'next/link';
import { MapPin, Phone, Mail, Clock, ArrowRight } from 'lucide-react';

interface GlobalPresenceProps {
  lang: string;
  dict: any;
  offices: any[];
}

export function GlobalPresence({ lang, dict, offices }: GlobalPresenceProps) {
  const isRtl = lang === 'ar';

  return (
    <section className="py-20 bg-[#0d2027] text-white border-b border-amber-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="text-[#f6d860] font-semibold text-xs tracking-widest uppercase">
            International Network
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-sans">
            {dict.offices?.title || 'Global Offices & Representation'}
          </h2>
          <p className="text-slate-300 text-sm">
            {dict.offices?.subtitle || 'Visit our headquarters and regional representative offices.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offices.map((office) => (
            <div
              key={office.id}
              className="bg-[#142c35] border border-amber-500/20 rounded-2xl overflow-hidden hover:border-amber-400/50 transition-all flex flex-col justify-between"
            >
              <div>
                {office.imageUrl && (
                  <div className="h-48 overflow-hidden relative">
                    <img
                      src={office.imageUrl}
                      alt={office.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#142c35] via-transparent to-transparent opacity-80" />
                    <span className="absolute top-3 start-3 bg-[#0d2027]/90 text-[#f6d860] border border-amber-500/30 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                      {office.country}
                    </span>
                  </div>
                )}

                <div className="p-6 space-y-4">
                  <h3 className="text-lg font-bold text-white flex items-center justify-between">
                    <span>{office.name}</span>
                    {office.isMain && (
                      <span className="text-[10px] bg-amber-500/20 text-[#f6d860] border border-amber-500/30 px-2 py-0.5 rounded">
                        Main HQ
                      </span>
                    )}
                  </h3>

                  <div className="space-y-2.5 text-xs text-slate-300">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-[#f6d860] shrink-0 mt-0.5" />
                      <span>{office.address}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-[#f6d860] shrink-0" />
                      <a href={`tel:${office.phone}`} className="hover:text-amber-400">
                        {office.phone}
                      </a>
                    </div>

                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-[#f6d860] shrink-0" />
                      <a href={`mailto:${office.email}`} className="hover:text-amber-400">
                        {office.email}
                      </a>
                    </div>

                    {office.workingHours && (
                      <div className="flex items-center gap-2 text-slate-400">
                        <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                        <span>{office.workingHours}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 mt-2">
                <Link
                  href={`/${lang}/offices#${office.id}`}
                  className="w-full inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-[#f6d860] border border-amber-500/20 py-2.5 rounded-xl text-xs font-semibold transition-colors"
                >
                  <span>View Details & Map</span>
                  <ArrowRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
