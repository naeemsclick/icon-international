import { getDictionary, Locale } from '@/lib/i18n/dictionaries';
import Link from 'next/link';
import { FileText, CheckCircle2, ShieldCheck, ArrowRight, PhoneCall, HelpCircle } from 'lucide-react';

export default async function InvestorVisaPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const isRtl = lang === 'ar';

  const processes = [
    { step: '01', title: 'Eligibility Consultation', desc: 'Initial evaluation of corporate structure, commercial license, or real estate investment threshold.' },
    { step: '02', title: 'Document Audit & Attestation', desc: 'Complete review and legalization of passports, police clearance, and commercial registry documents.' },
    { step: '03', title: 'Government Filing', desc: 'Direct submission to Ministry of Commerce & Ministry of Foreign Affairs portals.' },
    { step: '04', title: 'Residency & Visa Issuance', desc: 'Final biometric verification, medical test coordination, and civil status ID issuance.' },
  ];

  const requirements = [
    'Valid Passport (Minimum 6 months validity)',
    'Commercial Registration / Property Deed Document',
    'Certified Police Clearance Certificate from home country',
    'Recent Passport Photograph with white background',
    'Bank Statement or Proof of Capital Allocation',
  ];

  return (
    <div className="py-12 bg-[#0d2027] text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header Hero */}
        <div className="text-start space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-[#f6d860] px-3.5 py-1.5 rounded-full text-xs font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>Corporate & Residency Solutions</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
            Investor & Corporate Visa Processing Services
          </h1>

          <p className="text-slate-300 text-sm leading-relaxed">
            Icon International provides complete legal facilitation for high-net-worth investors, business owners, and corporate executives seeking investor residency and commercial entry visas across the Sultanate of Oman, Saudi Arabia, and Bangladesh.
          </p>
        </div>

        {/* Process Steps */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white border-b border-amber-500/30 pb-3">
            Visa Facilitation Process Workflow
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processes.map((proc, idx) => (
              <div key={idx} className="bg-[#142c35] border border-amber-500/20 p-6 rounded-2xl space-y-3">
                <div className="text-3xl font-extrabold text-[#f6d860]">{proc.step}</div>
                <h3 className="text-lg font-bold text-white">{proc.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{proc.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Requirements & Documents */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 bg-[#142c35] border border-amber-500/20 p-8 rounded-2xl space-y-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#f6d860]" />
              <span>Standard Document Requirements</span>
            </h3>
            <p className="text-xs text-slate-400">
              Requirements vary by host country regulations and investment tier. Please verify with our team during consultation.
            </p>
            <ul className="space-y-3 pt-2 text-xs text-slate-200">
              {requirements.map((req, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5 bg-[#142c35] border border-amber-500/30 p-8 rounded-2xl space-y-4 text-start">
            <h3 className="text-xl font-bold text-white">Consult Our Visa Desk</h3>
            <p className="text-xs text-slate-300">
              Speak directly with our legal & immigration consultants to verify your eligibility and required documentation.
            </p>

            <div className="pt-2 space-y-3 text-xs">
              <a
                href="https://wa.me/96898260202?text=Hello%20Icon%20International,%20I%20want%20to%20inquire%20about%20Investor%20Visa%20Processing."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl transition-colors"
              >
                <span>WhatsApp Visa Specialist</span>
              </a>

              <Link
                href={`/${lang}/contact`}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#f6d860] hover:bg-amber-400 text-[#0d2027] font-bold py-3 rounded-xl transition-colors"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Submit Formal Consultation Request</span>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
