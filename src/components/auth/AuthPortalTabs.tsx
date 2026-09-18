'use client';

import { useState } from 'react';
import { InvestorLoginForm } from '@/components/investor/InvestorLoginForm';
import { AdminLoginForm } from '@/components/admin/AdminLoginForm';
import { User, Shield, Lock, ShieldCheck } from 'lucide-react';

interface AuthPortalTabsProps {
  lang: string;
  dict: any;
  defaultPortal?: 'INVESTOR' | 'ADMIN';
  callbackUrl?: string;
}

export function AuthPortalTabs({
  lang,
  dict,
  defaultPortal = 'INVESTOR',
  callbackUrl,
}: AuthPortalTabsProps) {
  const [activePortal, setActivePortal] = useState<'INVESTOR' | 'ADMIN'>(defaultPortal);

  return (
    <div className="max-w-md w-full mx-auto px-4 space-y-6">
      
      {/* Portal Switcher Tabs */}
      <div className="flex rounded-xl bg-[#142c35] p-1 border border-amber-500/20 shadow-lg text-xs font-semibold">
        <button
          type="button"
          onClick={() => setActivePortal('INVESTOR')}
          className={`flex-1 py-2.5 text-center rounded-lg transition-all flex items-center justify-center gap-1.5 ${
            activePortal === 'INVESTOR'
              ? 'bg-[#f6d860] text-[#0d2027] font-bold shadow'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <User className="w-3.5 h-3.5" />
          <span>Investor Portal</span>
        </button>

        <button
          type="button"
          onClick={() => setActivePortal('ADMIN')}
          className={`flex-1 py-2.5 text-center rounded-lg transition-all flex items-center justify-center gap-1.5 ${
            activePortal === 'ADMIN'
              ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-[#0d2027] font-bold shadow'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Shield className="w-3.5 h-3.5" />
          <span>Admin & Staff Portal</span>
        </button>
      </div>

      {/* Header Branding */}
      <div className="text-center space-y-2">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 p-0.5 shadow-xl shadow-amber-500/20 mx-auto">
          <div className="w-full h-full bg-[#0d2027] rounded-[14px] flex items-center justify-center">
            {activePortal === 'INVESTOR' ? (
              <Lock className="w-8 h-8 text-[#f6d860]" />
            ) : (
              <Shield className="w-8 h-8 text-[#f6d860]" />
            )}
          </div>
        </div>
        
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          {activePortal === 'INVESTOR'
            ? dict.investorPortal?.title || 'Investor Access Portal'
            : 'Admin & Staff Management Portal'}
        </h1>
        <p className="text-xs text-slate-300 leading-relaxed max-w-sm mx-auto">
          {activePortal === 'INVESTOR'
            ? dict.investorPortal?.loginSubtitle ||
              'Access your private portfolio, payment schedules, receipts, and project updates securely.'
            : 'Executive control center for Icon International real estate, CRM leads, and investor relations.'}
        </p>
      </div>

      {/* Login Card */}
      <div className="bg-[#142c35] border border-amber-500/30 p-8 rounded-2xl shadow-2xl space-y-6">
        {activePortal === 'INVESTOR' ? (
          <InvestorLoginForm lang={lang} dict={dict} />
        ) : (
          <AdminLoginForm lang={lang} dict={dict} callbackUrl={callbackUrl} />
        )}

        <div className="pt-4 border-t border-white/10 text-center text-[11px] text-slate-400 space-y-1">
          <div className="flex items-center justify-center gap-1.5 text-emerald-400 font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>256-Bit TLS Encrypted Secure Authentication</span>
          </div>
        </div>
      </div>

    </div>
  );
}
