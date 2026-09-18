'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { Globe, Menu, X, Phone, MessageSquare, LogIn, ChevronDown, User, LogOut, Flame, Sparkles } from 'lucide-react';

interface NavbarProps {
  lang: string;
  dict: any;
  session?: any;
}

export function Navbar({ lang, dict, session }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const pathname = usePathname();

  const isRtl = lang === 'ar';

  const languages = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'bn', label: 'বাংলা', flag: '🇧🇩' },
    { code: 'ar', label: 'العربية', flag: '🇸🇦' },
  ];

  const currentLangLabel = languages.find((l) => l.code === lang)?.label || 'English';

  const switchLanguage = (newLang: string) => {
    const segments = pathname.split('/');
    segments[1] = newLang;
    return segments.join('/') || `/${newLang}`;
  };

  const navLinks = [
    { href: `/${lang}`, label: dict.nav?.home || 'Home' },
    { href: `/${lang}/about`, label: dict.nav?.about || 'About Us' },
    { href: `/${lang}/real-estate`, label: dict.nav?.realEstate || 'Real Estate' },
    { href: `/${lang}/investor-visa`, label: dict.nav?.investorVisa || 'Investor Visa' },
    { href: `/${lang}/umrah-ticketing`, label: dict.nav?.umrahTicketing || 'Umrah & Ticketing' },
    { href: `/${lang}/others-projects`, label: dict.nav?.othersProjects || 'Others Projects' },
    { href: `/${lang}/blog`, label: dict.nav?.blog || 'Blog & News' },
    { href: `/${lang}/contact`, label: dict.nav?.contact || 'Contact' },
  ];

  const tickerItems = [
    "🔥 Icon Tower Makkah: 5-Star Hotel Suites 800m from Haram Al-Sharif • Starting SAR 350,000 with 36-Month Easy Installments!",
    "🏖️ Icon Residency Salalah: Beachfront Ready Apartments in Oman • 100% Freehold for Expats & High Tourist Yields from OMR 42,000!",
    "✈️ Investor Visa & B2B Umrah Services: Fast-track Residency Processing & Wholesale Agency Quotas!",
    "📞 Direct Hotline: +968 7272 4934 | Official WhatsApp: +968 9826 0202",
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0d2027]/95 backdrop-blur-md border-b border-amber-500/20 text-white shadow-xl">
      {/* Top bar with contact info & Language selector */}
      <div className="bg-[#07151a] text-xs py-1.5 px-4 border-b border-white/5">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4 text-slate-300">
            <a href="tel:+96872724934" className="flex items-center gap-1.5 hover:text-[#f6d860] transition-colors">
              <Phone className="w-3.5 h-3.5 text-[#f6d860]" />
              <span>+968 7272 4934</span>
            </a>
            <a
              href="https://wa.me/96898260202"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-[#f6d860] transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp: +968 9826 0202</span>
            </a>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-slate-400 hidden sm:inline">Makkah • Salalah • Dhaka</span>
            
            {/* Language Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 px-2.5 py-0.5 rounded text-slate-200 transition-colors"
              >
                <Globe className="w-3.5 h-3.5 text-[#f6d860]" />
                <span>{currentLangLabel}</span>
                <ChevronDown className="w-3 h-3 opacity-70" />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-1 w-32 bg-[#0d2027] border border-amber-500/30 rounded shadow-2xl py-1 z-50 text-slate-200">
                  {languages.map((l) => (
                    <Link
                      key={l.code}
                      href={switchLanguage(l.code)}
                      onClick={() => setLangDropdownOpen(false)}
                      className={`flex items-center gap-2 px-3 py-1.5 hover:bg-amber-500/20 text-xs ${
                        l.code === lang ? 'font-bold text-[#f6d860]' : ''
                      }`}
                    >
                      <span>{l.flag}</span>
                      <span>{l.label}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Smart Scrolling Text Ticker Marquee */}
      <div className="bg-gradient-to-r from-amber-600/30 via-[#0d2027] to-amber-600/30 border-b border-amber-500/20 py-1 overflow-hidden text-xs text-amber-200">
        <div className="max-w-7xl mx-auto flex items-center px-4">
          <div className="bg-[#f6d860] text-[#0d2027] text-[10px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider shrink-0 me-3 flex items-center gap-1 z-10 shadow-md">
            <Sparkles className="w-3 h-3" />
            <span>OFFERS</span>
          </div>
          <div className="overflow-hidden whitespace-nowrap relative flex-1">
            <div className="animate-ticker space-x-12 rtl:space-x-reverse">
              {tickerItems.concat(tickerItems).map((text, i) => (
                <span key={i} className="inline-block hover:text-[#f6d860] cursor-default font-medium">
                  {text}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo with transparent gold calligraphy */}
          <Link href={`/${lang}`} className="flex items-center gap-3 group shrink-0">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 p-0.5 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform flex items-center justify-center">
              <div className="w-full h-full bg-[#0d2027] rounded-[10px] flex items-center justify-center p-1 overflow-hidden">
                <img
                  src="/images/logo-transparent.png"
                  alt="Icon International Logo"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg xl:text-xl tracking-tight text-white font-sans uppercase">
                Icon <span className="text-[#f6d860]">International</span>
              </span>
              <span className="text-[9px] xl:text-[10px] tracking-widest text-amber-200/70 font-light uppercase whitespace-nowrap">
                Real Estate & Investments
              </span>
            </div>
          </Link>

          {/* Desktop Navigation - 1 SINGLE LINE STRICTLY */}
          <nav className="hidden xl:flex items-center space-x-1 rtl:space-x-reverse overflow-x-auto no-scrollbar">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-2.5 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-colors ${
                    isActive
                      ? 'text-[#f6d860] bg-white/10 font-bold'
                      : 'text-slate-200 hover:text-[#f6d860] hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs & Auth Controls */}
          <div className="hidden md:flex items-center gap-2.5 shrink-0">
            {session ? (
              <div className="flex items-center gap-2">
                <Link
                  href={session.user?.role === 'INVESTOR' ? `/${lang}/investor/dashboard` : `/${lang}/admin/dashboard`}
                  className="flex items-center gap-1.5 bg-[#f6d860] text-[#0d2027] hover:bg-amber-400 px-3.5 py-2 rounded-lg font-bold text-xs transition-all shadow-md shadow-amber-500/20 whitespace-nowrap"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>{session.user?.role === 'INVESTOR' ? dict.nav?.dashboard || 'Dashboard' : 'Admin Panel'}</span>
                </Link>

                <button
                  onClick={() => signOut({ callbackUrl: `/${lang}` })}
                  className="flex items-center gap-1 bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30 px-3 py-2 rounded-lg text-xs font-semibold transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden lg:inline">Logout</span>
                </button>
              </div>
            ) : (
              <Link
                href={`/${lang}/investor/login`}
                className="flex items-center gap-1.5 bg-[#f6d860] text-[#0d2027] hover:bg-amber-400 px-4 py-2 rounded-lg font-bold text-xs transition-all shadow-md shadow-amber-500/20 whitespace-nowrap"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>{dict.nav?.investorLogin || 'Investor Login'}</span>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex xl:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-slate-200 hover:text-white hover:bg-white/10 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#0d2027] border-t border-amber-500/20 px-4 pt-2 pb-6 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-md text-sm font-medium text-slate-200 hover:text-[#f6d860] hover:bg-white/5"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4 border-t border-white/10 flex flex-col gap-2">
            {session ? (
              <div className="flex flex-col gap-2">
                <Link
                  href={session.user?.role === 'INVESTOR' ? `/${lang}/investor/dashboard` : `/${lang}/admin/dashboard`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 bg-[#f6d860] text-[#0d2027] py-2.5 rounded-lg font-bold text-center text-xs"
                >
                  <User className="w-4 h-4" />
                  <span>{session.user?.role === 'INVESTOR' ? 'Dashboard' : 'Admin Panel'}</span>
                </Link>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    signOut({ callbackUrl: `/${lang}` });
                  }}
                  className="flex items-center justify-center gap-2 bg-red-500/20 text-red-300 border border-red-500/30 py-2.5 rounded-lg font-bold text-center text-xs"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <Link
                href={`/${lang}/investor/login`}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 bg-[#f6d860] text-[#0d2027] py-2.5 rounded-lg font-bold text-center text-xs"
              >
                <LogIn className="w-4 h-4" />
                <span>{dict.nav?.investorLogin || 'Investor Login'}</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
