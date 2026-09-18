import { getDictionary, Locale } from '@/lib/i18n/dictionaries';
import { ChairmanMeetingForm } from '@/components/public/ChairmanMeetingForm';
import { Award, ShieldCheck, Building2, MapPin } from 'lucide-react';

export default async function ChairmanPage({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang as Locale;
  const dict = await getDictionary(lang);

  return (
    <div className="py-12 bg-[#0d2027] text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header Banner with Office Photo */}
        <div className="relative rounded-3xl overflow-hidden border border-amber-500/30 bg-[#142c35] p-8 md:p-12 shadow-2xl">
          <img
            src="/images/chairman-office.jpg"
            alt="Office of the Chairman"
            className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d2027] via-[#0d2027]/90 to-transparent" />

          <div className="relative z-10 space-y-4 max-w-3xl text-start">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-[#f6d860] px-3.5 py-1.5 rounded-full text-xs font-semibold">
              <Award className="w-4 h-4" />
              <span>Office of the Chairman</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight">
              Leadership Message & Executive Appointments
            </h1>

            <p className="text-slate-300 text-sm leading-relaxed font-light">
              Fostering strategic cross-border real estate partnerships, institutional capital allocation, and business growth between the Middle East and South Asia.
            </p>
          </div>
        </div>

        {/* Chairman Photo & Meeting Form Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#142c35] border border-amber-500/20 p-8 rounded-2xl space-y-6 shadow-xl">
              <div className="relative rounded-xl overflow-hidden border border-amber-500/30">
                <img
                  src="/images/chairman.jpg"
                  alt="Chairman Portrait"
                  className="w-full h-80 object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#142c35] via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-3 start-3 text-white">
                  <span className="text-[#f6d860] font-bold text-xs uppercase block">
                    Executive Chairman
                  </span>
                  <span className="text-[11px] text-slate-300">Icon International</span>
                </div>
              </div>

              {/* Office Interior Photo Showcase */}
              <div className="relative rounded-xl overflow-hidden border border-amber-500/20">
                <img
                  src="/images/chairman-office.jpg"
                  alt="Chairman Executive Office Interior"
                  className="w-full h-48 object-cover"
                />
                <div className="absolute bottom-2 start-2 text-[10px] bg-[#0d2027]/90 text-amber-200 px-2 py-0.5 rounded border border-amber-500/30">
                  Chairman Corporate Suite
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-300">
                <h3 className="text-sm font-bold text-white">Direct Executive Consultation</h3>
                <p className="font-light leading-relaxed">
                  High-net-worth investors and commercial agency founders may request a direct meeting with the Chairman's office in Muscat, Salalah, Makkah, or Dhaka.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-[#142c35] border border-amber-500/30 p-8 rounded-2xl space-y-6 shadow-2xl">
            <div className="border-b border-amber-500/30 pb-4">
              <h2 className="text-2xl font-bold text-white">Request Executive Appointment</h2>
              <p className="text-xs text-slate-300">
                Please provide your corporate details and preferred date/time slot.
              </p>
            </div>

            <ChairmanMeetingForm />
          </div>
        </div>

      </div>
    </div>
  );
}
