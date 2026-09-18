import { db } from '@/lib/db';
import { Locale } from '@/lib/i18n/dictionaries';
import Link from 'next/link';
import { Users, UserPlus, ShieldAlert, CheckCircle, Mail, Phone } from 'lucide-react';

export default async function AdminInvestorsPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;

  const investors = await db.investorProfile.findMany({
    include: {
      user: true,
      nominees: true,
      investments: {
        include: { project: { include: { translations: true } }, payments: true },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-8">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white">Investor Management</h1>
          <p className="text-xs text-slate-400">Manage registered investors, portfolio assignments, and payment records.</p>
        </div>
      </div>

      <div className="bg-[#142c35] border border-amber-500/20 p-6 rounded-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-start">
            <thead>
              <tr className="border-b border-white/10 text-slate-400">
                <th className="py-3 px-2 text-start">Investor Code</th>
                <th className="py-3 px-2 text-start">Name</th>
                <th className="py-3 px-2 text-start">Contact</th>
                <th className="py-3 px-2 text-start">Invested Projects</th>
                <th className="py-3 px-2 text-start">Account Status</th>
                <th className="py-3 px-2 text-end">Registered Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-200">
              {investors.map((investor) => (
                <tr key={investor.id}>
                  <td className="py-3 px-2 font-mono font-bold text-[#f6d860]">
                    {investor.investorCode}
                  </td>
                  <td className="py-3 px-2 font-bold text-white">
                    {investor.user.name}
                    <div className="text-[10px] text-slate-400">Passport: {investor.passportNumber || 'N/A'}</div>
                  </td>
                  <td className="py-3 px-2">
                    <div>{investor.user.email}</div>
                    <div className="text-slate-400">{investor.user.phone}</div>
                  </td>
                  <td className="py-3 px-2">
                    {investor.investments.map((inv) => (
                      <span key={inv.id} className="block text-slate-300 font-semibold">
                        {inv.project.translations[0]?.name || inv.project.slug} (SAR {inv.investmentAmount.toLocaleString()})
                      </span>
                    ))}
                  </td>
                  <td className="py-3 px-2">
                    <span className="bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded text-[10px] uppercase font-bold">
                      {investor.user.status}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-end text-slate-400">
                    {new Date(investor.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
