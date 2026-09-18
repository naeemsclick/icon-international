'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, AlertCircle, Loader2 } from 'lucide-react';

interface AdminLoginFormProps {
  lang: string;
  dict: any;
  callbackUrl?: string;
}

export function AdminLoginForm({ lang, dict, callbackUrl }: AdminLoginFormProps) {
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
        setError('Invalid Admin Code / Email or password. Access denied.');
      } else {
        // Fetch session to determine role-based redirect
        const sessionRes = await fetch('/api/auth/session');
        const session = await sessionRes.json();
        const role = session?.user?.role;

        if (role === 'INVESTOR') {
          router.push(`/${lang}/investor/dashboard`);
        } else {
          router.push(callbackUrl || `/${lang}/admin/dashboard`);
        }
        router.refresh();
      }
    } catch (err: any) {
      setError('An unexpected authentication error occurred.');
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
        <label className="block text-slate-400 mb-1 font-medium">
          Admin Email or User Code
        </label>
        <input
          type="text"
          required
          value={userCode}
          onChange={(e) => setUserCode(e.target.value)}
          placeholder="e.g. admin@iconinternational.net or ICON-ADM-001"
          className="w-full bg-[#0d2027] border border-amber-500/30 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-amber-400 font-mono text-xs"
        />
      </div>

      <div>
        <label className="block text-slate-400 mb-1 font-medium">
          Security Password
        </label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••••••"
          className="w-full bg-[#0d2027] border border-amber-500/30 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-amber-400 font-mono text-xs"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-[#0d2027] font-extrabold py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 text-sm uppercase tracking-wider"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Verifying Admin Credentials...</span>
          </>
        ) : (
          <>
            <ShieldCheck className="w-4 h-4" />
            <span>Access Admin Portal</span>
          </>
        )}
      </button>
    </form>
  );
}
