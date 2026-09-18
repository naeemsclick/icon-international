'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { LogIn, AlertCircle, Loader2 } from 'lucide-react';

interface InvestorLoginFormProps {
  lang: string;
  dict: any;
}

export function InvestorLoginForm({ lang, dict }: InvestorLoginFormProps) {
  const router = useRouter();
  const [userCode, setUserCode] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await signIn('credentials', {
        userCode: userCode.trim(),
        password,
        redirect: false,
      });

      if (res?.error) {
        setError('Invalid Investor Code or password. Please check your credentials.');
      } else {
        router.push(`/${lang}/investor/dashboard`);
        router.refresh();
      }
    } catch (err: any) {
      setError('An unexpected login error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-xs text-slate-200">
      {error && (
        <div className="bg-red-500/20 border border-red-500/40 p-3.5 rounded-xl text-red-300 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      <div>
        <label className="block text-slate-400 mb-1">
          {dict.investorPortal?.investorCodeLabel || 'Investor Code / User ID'}
        </label>
        <input
          type="text"
          required
          value={userCode}
          onChange={(e) => setUserCode(e.target.value)}
          placeholder="e.g. ICON-INV-1001"
          className="w-full bg-[#0d2027] border border-amber-500/30 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-amber-400 font-mono"
        />
      </div>

      <div>
        <label className="block text-slate-400 mb-1">
          {dict.investorPortal?.passwordLabel || 'Password'}
        </label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••••••"
          className="w-full bg-[#0d2027] border border-amber-500/30 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-amber-400 font-mono"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#f6d860] hover:bg-amber-400 text-[#0d2027] font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 text-sm"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Authenticating...</span>
          </>
        ) : (
          <>
            <LogIn className="w-4 h-4" />
            <span>{dict.investorPortal?.loginBtn || 'Sign In to Portal'}</span>
          </>
        )}
      </button>
    </form>
  );
}
