import { db } from '@/lib/db';
import { Locale } from '@/lib/i18n/dictionaries';
import Link from 'next/link';
import { Building2, Users, Briefcase, ClipboardList, ShieldCheck, ArrowRight, Eye } from 'lucide-react';

export default async function AdminDashboardOverviewPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;

  const totalProjects = await db.project.count();
  const activeProjects = await db.project.count({ where: { status: 'UNDER_CONSTRUCTION' } });
  const totalInvestors = await db.investorProfile.count();
  const newLeadsCount = await db.lead.count({ where: { status: 'NEW' } });
  const newB2BCount = await db.b2BAgencyApplication.count({ where: { status: 'NEW' } });

  const recentLeads = await db.lead.findMany({
    take: 6,
    orderBy: { createdAt: 'desc' },
    include: { interestedProject: { include: { translations: true } } },
  });

  const recentAuditLogs = await db.auditLog.findMany({
    take: 5,
    orderBy: { timestamp: 'desc' },
    include: { user: true },
  });

  return (
    <div className="space-y-10">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-white">Executive Admin Dashboard</h1>
        <p className="text-xs text-slate-400 mt-1">System status overview, active inquiries, and portfolio metrics.</p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="bg-[#142c35] border border-amber-500/20 p-6 rounded-2xl space-y-2">
          <div className="flex justify-between items-center text-slate-400 text-xs">
            <span>Total Projects</span>
            <Building2 className="w-4 h-4 text-[#f6d860]" />
          </div>
          <div className="text-3xl font-extrabold text-white">{totalProjects}</div>
          <div className="text-[10px] text-[#f6d860]">{activeProjects} Under Construction</div>
        </div>

        <div className="bg-[#142c35] border border-amber-500/20 p-6 rounded-2xl space-y-2">
          <div className="flex justify-between items-center text-slate-400 text-xs">
            <span>Total Investors</span>
            <Users className="w-4 h-4 text-[#f6d860]" />
          </div>
          <div className="text-3xl font-extrabold text-white">{totalInvestors}</div>
          <div className="text-[10px] text-emerald-400">Verified Profiles</div>
        </div>

        <div className="bg-[#142c35] border border-amber-500/20 p-6 rounded-2xl space-y-2">
          <div className="flex justify-between items-center text-slate-400 text-xs">
            <span>New Leads</span>
            <Briefcase className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-extrabold text-emerald-400">{newLeadsCount}</div>
          <div className="text-[10px] text-slate-400">Pending Action</div>
        </div>

        <div className="bg-[#142c35] border border-amber-500/20 p-6 rounded-2xl space-y-2">
          <div className="flex justify-between items-center text-slate-400 text-xs">
            <span>B2B Agency Apps</span>
            <ClipboardList className="w-4 h-4 text-[#f6d860]" />
          </div>
          <div className="text-3xl font-extrabold text-[#f6d860]">{newB2BCount}</div>
          <div className="text-[10px] text-slate-400">Umrah & Travel Desk</div>
        </div>

        <div className="bg-[#142c35] border border-amber-500/20 p-6 rounded-2xl space-y-2">
          <div className="flex justify-between items-center text-slate-400 text-xs">
            <span>Audit Status</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-xl font-bold text-emerald-400">Secure</div>
          <div className="text-[10px] text-slate-400">RBAC Active</div>
        </div>
      </div>

      {/* Recent CRM Leads Table */}
      <div className="bg-[#142c35] border border-amber-500/20 p-8 rounded-2xl space-y-4">
        <div className="flex justify-between items-center border-b border-white/10 pb-3">
          <h2 className="text-lg font-bold text-white">Recent CRM Inquiries & Leads</h2>
          <Link href={`/${lang}/admin/leads`} className="text-xs text-[#f6d860] font-semibold hover:underline">
            View All Leads →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-start">
            <thead>
              <tr className="border-b border-white/10 text-slate-400">
                <th className="py-2.5 px-2">Applicant</th>
                <th className="py-2.5 px-2">Country</th>
                <th className="py-2.5 px-2">Type</th>
                <th className="py-2.5 px-2">Project</th>
                <th className="py-2.5 px-2">Status</th>
                <th className="py-2.5 px-2 text-end">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-200">
              {recentLeads.map((lead) => (
                <tr key={lead.id}>
                  <td className="py-3 px-2 font-semibold text-white">
                    {lead.name}
                    <div className="text-[10px] text-slate-400">{lead.phone} • {lead.email}</div>
                  </td>
                  <td className="py-3 px-2">{lead.country}</td>
                  <td className="py-3 px-2">
                    <span className="bg-amber-500/20 text-[#f6d860] px-2 py-0.5 rounded text-[10px]">
                      {lead.leadType}
                    </span>
                  </td>
                  <td className="py-3 px-2">
                    {lead.interestedProject?.translations[0]?.name || 'General Inquiry'}
                  </td>
                  <td className="py-3 px-2">
                    <span className="bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded text-[10px] uppercase font-bold">
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
