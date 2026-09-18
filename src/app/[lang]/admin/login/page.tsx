import { getDictionary, Locale } from '@/lib/i18n/dictionaries';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { AdminLoginForm } from '@/components/admin/AdminLoginForm';
import { Shield, Building2, User, KeyRound } from 'lucide-react';
import Link from 'next/link';

export default async function AdminLoginPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: Locale }>;
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const { lang } = await params;
  const { callbackUrl } = await searchParams;
  const dict = await getDictionary(lang);
  const session = await auth();

  // If logged in as Admin/Staff, redirect to dashboard
  if (session?.user && (session.user as any).role !== 'INVESTOR') {
    redirect(`/${lang}/admin/dashboard`);
  }

  return (
    <div className="py-16 bg-[#0d2027] text-white min-h-[85vh] flex items-center justify-center">
      <div className="max-w-md w-full mx-auto px-4 space-y-6">
        
        {/* Portal Switcher Tabs */}
        <div className="flex rounded-xl bg-[#142c35] p-1 border border-amber-500/20 shadow-lg text-xs font-semibold">
          <Link
            href={`/${lang}/investor/login`}
            className="flex-1 py-2 text-center text-slate-400 hover:text-white rounded-lg transition-colors flex items-center justify-center gap-1.5"
          >
            <User className="w-3.5 h-3.5" />
            <span>Investor Portal</span>
          </Link>
          <div className="flex-1 py-2 text-center bg-[#f6d860] text-[#0d2027] font-bold rounded-lg shadow flex items-center justify-center gap-1.5">
            <Shield className="w-3.5 h-3.5" />
            <span>Admin & Staff Portal</span>
          </div>
        </div>

        {/* Header Branding */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 p-0.5 shadow-xl shadow-amber-500/20 mx-auto">
            <div className="w-full h-full bg-[#0d2027] rounded-[14px] flex items-center justify-center">
              <Shield className="w-8 h-8 text-[#f6d860]" />
            </div>
          </div>
          
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Admin Management Portal
          </h1>
          <p className="text-xs text-slate-300 leading-relaxed max-w-sm mx-auto">
            Secure administrative control center for Icon International real estate, CRM leads, and investor relations.
          </p>
        </div>

        {/* Admin Login Card */}
        <div className="bg-[#142c35] border border-amber-500/30 p-8 rounded-2xl shadow-2xl space-y-6">
          <AdminLoginForm lang={lang} dict={dict} callbackUrl={callbackUrl} />

          <div className="pt-4 border-t border-white/10 text-center text-[11px] text-slate-400 space-y-1.5">
            <div className="flex items-center justify-center gap-1.5 text-amber-300 font-semibold">
              <KeyRound className="w-3.5 h-3.5" />
              <span>Super Admin Credentials</span>
            </div>
            <p className="text-[#f6d860] font-mono">admin@iconinternational.net</p>
            <p className="text-[#f6d860] font-mono">Password: AdminPassword2026!</p>
          </div>
        </div>

      </div>
    </div>
  );
}
