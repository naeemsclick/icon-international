import { getDictionary, Locale } from '@/lib/i18n/dictionaries';
import { Phone, Mail, MapPin, MessageSquare } from 'lucide-react';
import { ProjectInquiryForm } from '@/components/public/ProjectInquiryForm';

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang as Locale;
  const dict = await getDictionary(lang);

  return (
    <div className="py-16 bg-[#0d2027] text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-start space-y-3">
          <div className="text-[#f6d860] font-semibold text-xs tracking-widest uppercase">
            Global Executive Contact
          </div>
          <h1 className="text-4xl font-extrabold text-white">Contact Icon International</h1>
          <p className="text-slate-300 text-sm max-w-2xl">
            Reach out to our regional corporate offices or submit a general investment inquiry.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#142c35] border border-amber-500/20 p-8 rounded-2xl space-y-6">
              <h2 className="text-xl font-bold text-white border-b border-amber-500/30 pb-3">
                Direct Contact Desk
              </h2>

              <div className="space-y-4 text-xs text-slate-300">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-[#f6d860] flex items-center justify-center">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-slate-400 block">Direct Line</span>
                    <a href="tel:+96872724934" className="text-white font-bold text-sm hover:text-[#f6d860]">
                      +968 7272 4934
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-slate-400 block">WhatsApp Desk</span>
                    <a
                      href="https://wa.me/96898260202"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 font-bold text-sm hover:underline"
                    >
                      +968 9826 0202
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-[#f6d860] flex items-center justify-center">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-slate-400 block">Email Inquiries</span>
                    <a href="mailto:info@iconinternational.net" className="text-white font-bold text-sm hover:text-[#f6d860]">
                      info@iconinternational.net
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#142c35] border border-amber-500/20 p-8 rounded-2xl space-y-3 text-xs text-slate-300">
              <h3 className="font-bold text-white text-sm">Headquarter Addresses</h3>
              <p><strong>Oman Office:</strong> As Saadah-602, Salalah, Sultanate of Oman</p>
              <p><strong>Bangladesh Office:</strong> Block K, Road 16, House 295, South Banasree, Dhaka</p>
            </div>
          </div>

          <div className="lg:col-span-7 bg-[#142c35] border border-amber-500/30 p-8 rounded-2xl space-y-6 shadow-2xl">
            <div className="border-b border-amber-500/30 pb-3">
              <h2 className="text-2xl font-bold text-white">Submit General Contact Request</h2>
            </div>
            <ProjectInquiryForm projectId="" projectName="General Inquiry" currency="SAR" />
          </div>
        </div>
      </div>
    </div>
  );
}
