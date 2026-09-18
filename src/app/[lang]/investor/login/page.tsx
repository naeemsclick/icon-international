import { getDictionary, Locale } from '@/lib/i18n/dictionaries';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { InvestorLoginForm } from '@/components/investor/InvestorLoginForm';
import { Lock, ShieldCheck } from 'lucide-react';

export default async function InvestorLoginPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const session = await auth();

  // If already logged in as Investor, redirect directly to dashboard
  if (session?.user && (session.user as any).role === 'INVESTOR') {
    redirect(`/${lang}/investor/dashboard`);
  }

  return (
    <div className="py-16 bg-[#0d2027] text-white min-h-[85vh] flex items-center justify-center">
      <div className="max-w-md w-full mx-auto px-4 space-y-8">
        
        {/* Header Branding */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 p-0.5 shadow-xl shadow-amber-500/20 mx-auto">
            <div className="w-full h-full bg-[#0d2027] rounded-[14px] flex items-center justify-center">
              <Lock className="w-8 h-8 text-[#f6d860]" />
            </div>
          </div>
          
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            {dict.investorPortal?.title || 'Investor Access Portal'}
          </h1>
          <p className="text-xs text-slate-300 leading-relaxed max-w-sm mx-auto">
            {dict.investorPortal?.loginSubtitle ||
              'Access your private portfolio, payment schedules, receipts, and project updates securely.'}
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-[#142c35] border border-amber-500/30 p-8 rounded-2xl shadow-2xl space-y-6">
          <InvestorLoginForm lang={lang} dict={dict} />

          <div className="pt-4 border-t border-white/10 text-center text-[11px] text-slate-400 space-y-2">
            <div className="flex items-center justify-center gap-1.5 text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>256-Bit TLS Encrypted Secure Portal</span>
            </div>
            <p>Demo Investor Login: Code <code className="text-[#f6d860]">ICON-INV-1001</code> | Password <code className="text-[#f6d860]">InvestorPassword2026!</code></p>
            <p>Demo Admin Login: Code <code className="text-[#f6d860]">ICON-ADM-001</code> | Password <code className="text-[#f6d860]">AdminPassword2026!</code></p>
          </div>
        </div>

      </div>
    </div>
  );
}
