import { db } from '@/lib/db';
import { Locale } from '@/lib/i18n/dictionaries';
import { Briefcase, Mail, Phone, MessageSquare, MapPin } from 'lucide-react';

export default async function AdminLeadsPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;

  const leads = await db.lead.findMany({
    include: {
      interestedProject: { include: { translations: true } },
      assignedStaff: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-8">
      
      <div>
        <h1 className="text-3xl font-extrabold text-white">CRM Leads & Inquiries</h1>
        <p className="text-xs text-slate-400">Track and manage investment inquiries, contact requests, and chairman meeting appointments.</p>
      </div>

      <div className="bg-[#142c35] border border-amber-500/20 p-6 rounded-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-start">
            <thead>
              <tr className="border-b border-white/10 text-slate-400">
                <th className="py-3 px-2 text-start">Ref ID</th>
                <th className="py-3 px-2 text-start">Applicant Name</th>
                <th className="py-3 px-2 text-start">Country & Contact</th>
                <th className="py-3 px-2 text-start">Inquiry Type</th>
                <th className="py-3 px-2 text-start">Target Project</th>
                <th className="py-3 px-2 text-start">Proposed Amount</th>
                <th className="py-3 px-2 text-start">Status</th>
                <th className="py-3 px-2 text-end">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-200">
              {leads.map((lead) => (
                <tr key={lead.id}>
                  <td className="py-3 px-2 font-mono text-slate-400">
                    #{lead.id.slice(0, 8)}
                  </td>
                  <td className="py-3 px-2 font-bold text-white">
                    {lead.name}
                  </td>
                  <td className="py-3 px-2">
                    <div className="font-semibold">{lead.country}</div>
                    <div className="text-slate-400">{lead.phone} • {lead.email}</div>
                  </td>
                  <td className="py-3 px-2">
                    <span className="bg-amber-500/20 text-[#f6d860] px-2 py-0.5 rounded text-[10px] font-bold">
                      {lead.leadType}
                    </span>
                  </td>
                  <td className="py-3 px-2">
                    {lead.interestedProject?.translations[0]?.name || 'General Inquiry'}
                  </td>
                  <td className="py-3 px-2 font-bold text-[#f6d860]">
                    {lead.proposedAmount ? `${lead.currency} ${lead.proposedAmount.toLocaleString()}` : '-'}
                  </td>
                  <td className="py-3 px-2">
                    <span className="bg-emerald-500/20 text-emerald-400 px-2.5 py-0.5 rounded text-[10px] uppercase font-bold">
                      {lead.status}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-end text-slate-400">
                    {new Date(lead.createdAt).toLocaleDateString()}
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
