import Link from 'next/link';
import { Phone, Mail, MapPin, MessageSquare, ShieldCheck, FileText } from 'lucide-react';

interface FooterProps {
  lang: string;
  dict: any;
}

export function Footer({ lang, dict }: FooterProps) {
  return (
    <footer className="bg-[#07151a] text-slate-300 border-t border-amber-500/20 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info with Clickable Homepage Logo */}
          <div className="space-y-4">
            <Link href={`/${lang}`} className="flex items-center gap-3 group inline-flex">
              <div className="w-12 h-12 rounded-xl bg-amber-400 p-0.5 shadow-md flex items-center justify-center group-hover:scale-105 transition-transform">
                <div className="w-full h-full bg-[#0d2027] rounded-[10px] flex items-center justify-center p-1">
                  <img
                    src="/images/logo-transparent.png"
                    alt="Icon International Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
              <span className="font-bold text-xl text-white tracking-tight group-hover:text-[#f6d860] transition-colors">
                ICON <span className="text-[#f6d860]">INTERNATIONAL</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              {dict.footer?.aboutText ||
                'Icon International is a global corporate group specializing in real estate investment, visa processing, and B2B corporate services across Oman, Saudi Arabia, and Bangladesh.'}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://wa.me/96898260202"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600/30 border border-emerald-500/30 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Official</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-base mb-4 border-b border-amber-500/30 pb-2 inline-block">
              {dict.footer?.quickLinks || 'Quick Links'}
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href={`/${lang}/about`} className="hover:text-[#f6d860] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/real-estate`} className="hover:text-[#f6d860] transition-colors">
                  Real Estate Projects
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/investor-visa`} className="hover:text-[#f6d860] transition-colors">
                  Investor Visa Processing
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/umrah-ticketing`} className="hover:text-[#f6d860] transition-colors">
                  Umrah & B2B Travel
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/others-projects`} className="hover:text-[#f6d860] transition-colors">
                  Others Projects
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/blog`} className="hover:text-[#f6d860] transition-colors">
                  Blog & News
                </Link>
              </li>
            </ul>
          </div>

          {/* Global Offices */}
          <div>
            <h3 className="text-white font-semibold text-base mb-4 border-b border-amber-500/30 pb-2 inline-block">
              Primary Offices
            </h3>
            <ul className="space-y-3 text-xs text-slate-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#f6d860] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-200 block">Oman Office:</strong>
                  As Saadah-602, Salalah, Sultanate of Oman
                </div>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#f6d860] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-200 block">Bangladesh Office:</strong>
                  Block K, Road 16, House 295, South Banasree, Dhaka
                </div>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#f6d860] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-200 block">Saudi Arabia:</strong>
                  Makkah Corporate Representative Office
                </div>
              </li>
            </ul>
          </div>

          {/* Direct Contact & Legal */}
          <div>
            <h3 className="text-white font-semibold text-base mb-4 border-b border-amber-500/30 pb-2 inline-block">
              {dict.footer?.contactInfo || 'Contact Information'}
            </h3>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#f6d860]" />
                <a href="tel:+96872724934" className="hover:text-amber-400">+968 7272 4934</a>
              </li>
              <li className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <a href="https://wa.me/96898260202" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400">
                  +968 9826 0202
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#f6d860]" />
                <a href="mailto:info@iconinternational.net" className="hover:text-amber-400">info@iconinternational.net</a>
              </li>
            </ul>

            <div className="mt-6 pt-4 border-t border-white/10 space-y-1.5 text-xs text-slate-400">
              <Link href={`/${lang}/legal/privacy-policy`} className="hover:text-[#f6d860] block flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Privacy Policy
              </Link>
              <Link href={`/${lang}/legal/terms-and-conditions`} className="hover:text-[#f6d860] block flex items-center gap-1">
                <FileText className="w-3 h-3" /> Terms & Conditions
              </Link>
              <Link href={`/${lang}/legal/investment-disclaimer`} className="hover:text-[#f6d860] block flex items-center gap-1">
                <FileText className="w-3 h-3" /> Investment Disclaimer
              </Link>
            </div>
          </div>

        </div>

        {/* Customized Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-400 gap-4">
          <div>
            © 2026 Icon International | All Right Reserved.
          </div>

          <div className="text-slate-300 text-center font-medium">
            Real Estate Development • Investor Visa • Umrah Services • B2B Solutions
          </div>

          <div>
            Created by :{' '}
            <a
              href="https://www.facebook.com/naeemdaprince"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#f6d860] font-bold hover:text-amber-300 transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(246,216,96,0.9)] underline underline-offset-4 decoration-amber-500/50 hover:decoration-[#f6d860]"
            >
              Naeem Nahiyan
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
