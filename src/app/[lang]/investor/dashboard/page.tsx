import { getStrictAuthenticatedInvestor } from '@/lib/security';
import { getDictionary, Locale } from '@/lib/i18n/dictionaries';
import Link from 'next/link';
import {
  Wallet,
  Building2,
  CheckCircle2,
  Clock,
  FileText,
  User,
  Shield,
  Download,
  MessageSquare,
  AlertCircle,
  Bell,
  LogOut,
} from 'lucide-react';
import { db } from '@/lib/db';

export default async function InvestorDashboardPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  // Derive investor identity STRICTLY from authenticated session
  const investor = await getStrictAuthenticatedInvestor();

  // Calculate portfolio financial summary
  let totalInvestmentAmount = 0;
  let totalPaidAmount = 0;
  let totalDueAmount = 0;
  let nextInstallmentDate: Date | null = null;

  investor.investments.forEach((inv) => {
    totalInvestmentAmount += inv.investmentAmount;
    inv.payments.forEach((pay) => {
      if (pay.status === 'PAID') {
        totalPaidAmount += pay.amount;
      } else if (pay.status === 'PENDING') {
        totalDueAmount += pay.amount;
        if (!nextInstallmentDate || new Date(pay.dueDate) < nextInstallmentDate) {
          nextInstallmentDate = new Date(pay.dueDate);
        }
      }
    });
  });

  // Fetch investor notices
  const notices = await db.investorNotice.findMany({
    take: 5,
    orderBy: { publishedAt: 'desc' },
  });

  return (
    <div className="py-10 bg-[#0d2027] text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Welcome Header */}
        <div className="bg-[#142c35] border border-amber-500/30 p-8 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-xl">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="bg-amber-500/20 text-[#f6d860] border border-amber-500/30 text-xs font-mono font-bold px-3 py-1 rounded-full">
                Investor ID: {investor.investorCode}
              </span>
              <span className="bg-emerald-500/20 text-emerald-400 text-xs font-bold px-2.5 py-0.5 rounded">
                Account Active
              </span>
            </div>
            <h1 className="text-3xl font-extrabold text-white">Welcome, {investor.user.name}</h1>
            <p className="text-xs text-slate-300">
              {investor.user.email} • {investor.address || 'Verified Investor Account'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/96898260202?text=Hello%20Icon%20International,%20I%20am%20contacting%20you%20from%20my%20Investor%20Dashboard."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Official WhatsApp Concierge</span>
            </a>
          </div>
        </div>

        {/* Financial Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[#142c35] border border-amber-500/20 p-6 rounded-2xl space-y-2">
            <div className="flex justify-between items-center text-slate-400 text-xs">
              <span>{dict.investorPortal?.totalInvestment || 'Total Investment'}</span>
              <Wallet className="w-4 h-4 text-[#f6d860]" />
            </div>
            <div className="text-2xl font-extrabold text-white">
              SAR {totalInvestmentAmount.toLocaleString()}
            </div>
            <div className="text-[10px] text-slate-400">Total Portfolio Value</div>
          </div>

          <div className="bg-[#142c35] border border-amber-500/20 p-6 rounded-2xl space-y-2">
            <div className="flex justify-between items-center text-slate-400 text-xs">
              <span>{dict.investorPortal?.paidAmount || 'Paid Amount'}</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-extrabold text-emerald-400">
              SAR {totalPaidAmount.toLocaleString()}
            </div>
            <div className="text-[10px] text-emerald-400">Verified Cleared Receipts</div>
          </div>

          <div className="bg-[#142c35] border border-amber-500/20 p-6 rounded-2xl space-y-2">
            <div className="flex justify-between items-center text-slate-400 text-xs">
              <span>{dict.investorPortal?.dueAmount || 'Due Amount'}</span>
              <Clock className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-extrabold text-[#f6d860]">
              SAR {totalDueAmount.toLocaleString()}
            </div>
            <div className="text-[10px] text-slate-400">Scheduled Remaining Balance</div>
          </div>

          <div className="bg-[#142c35] border border-amber-500/20 p-6 rounded-2xl space-y-2">
            <div className="flex justify-between items-center text-slate-400 text-xs">
              <span>{dict.investorPortal?.nextInstallment || 'Next Installment'}</span>
              <Building2 className="w-4 h-4 text-[#f6d860]" />
            </div>
            <div className="text-xl font-bold text-white">
              {nextInstallmentDate
                ? new Date(nextInstallmentDate).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })
                : 'No pending due'}
            </div>
            <div className="text-[10px] text-slate-400">Installment Schedule</div>
          </div>
        </div>

        {/* Portfolio Investments & Payment History */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Left: Investments & Payments */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Investments List */}
            <div className="bg-[#142c35] border border-amber-500/20 p-8 rounded-2xl space-y-6">
              <h2 className="text-xl font-bold text-white border-b border-amber-500/30 pb-3 flex items-center justify-between">
                <span>Invested Projects Portfolio</span>
                <span className="text-xs text-[#f6d860] font-normal">
                  {investor.investments.length} Active Asset(s)
                </span>
              </h2>

              {investor.investments.map((investment) => {
                const project = investment.project;
                const translation = project.translations[0] || {};
                const mainMedia = project.media[0]?.url || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80';

                return (
                  <div
                    key={investment.id}
                    className="bg-[#0d2027] border border-amber-500/30 p-6 rounded-xl space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={mainMedia}
                          alt={translation.name || project.slug}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div>
                          <h3 className="font-bold text-lg text-white">{translation.name || project.slug}</h3>
                          <p className="text-xs text-slate-400">{project.city}, {project.country}</p>
                        </div>
                      </div>

                      <div className="text-end">
                        <span className="bg-emerald-500/20 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full uppercase">
                          {investment.status}
                        </span>
                        <div className="text-xs text-slate-400 mt-1">
                          Invested: SAR {investment.investmentAmount.toLocaleString()}
                        </div>
                      </div>
                    </div>

                    {/* Payment History Table for this investment */}
                    <div className="pt-2 border-t border-white/10 space-y-3">
                      <h4 className="text-xs font-bold text-[#f6d860]">Payment & Receipt Records</h4>
                      <div className="overflow-x-auto">
                        <table className="w-full text-xs text-start">
                          <thead>
                            <tr className="border-b border-white/10 text-slate-400">
                              <th className="py-2 text-start">Due Date</th>
                              <th className="py-2 text-start">Amount</th>
                              <th className="py-2 text-start">Method</th>
                              <th className="py-2 text-start">Status</th>
                              <th className="py-2 text-end">Receipt</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/5 text-slate-300">
                            {investment.payments.map((pay) => (
                              <tr key={pay.id}>
                                <td className="py-2.5">
                                  {new Date(pay.dueDate).toLocaleDateString()}
                                </td>
                                <td className="py-2.5 font-bold text-white">
                                  {pay.currency} {pay.amount.toLocaleString()}
                                </td>
                                <td className="py-2.5 text-slate-400">{pay.paymentMethod || 'N/A'}</td>
                                <td className="py-2.5">
                                  <span
                                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                                      pay.status === 'PAID'
                                        ? 'bg-emerald-500/20 text-emerald-400'
                                        : 'bg-amber-500/20 text-[#f6d860]'
                                    }`}
                                  >
                                    {pay.status}
                                  </span>
                                </td>
                                <td className="py-2.5 text-end">
                                  {pay.receiptUrl ? (
                                    <a
                                      href={pay.receiptUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-1 text-[#f6d860] hover:underline"
                                    >
                                      <Download className="w-3 h-3" />
                                      <span>Receipt</span>
                                    </a>
                                  ) : (
                                    <span className="text-slate-500">-</span>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

          {/* Right Column: Nominee, Private Agreements, Notices */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Nominee Details */}
            <div className="bg-[#142c35] border border-amber-500/20 p-6 rounded-2xl space-y-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <User className="w-4 h-4 text-[#f6d860]" />
                <span>{dict.investorPortal?.nominee || 'Nominee Information'}</span>
              </h3>
              {investor.nominees.length > 0 ? (
                investor.nominees.map((nom) => (
                  <div key={nom.id} className="bg-[#0d2027] p-4 rounded-xl text-xs space-y-1 text-slate-300">
                    <div>Name: <strong className="text-white">{nom.fullName}</strong></div>
                    <div>Relation: <span>{nom.relation}</span></div>
                    <div>Passport/ID: <span>{nom.nationalIdPassport || 'Verified'}</span></div>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-400">No nominee on file.</p>
              )}
            </div>

            {/* Investor Announcements / Notices */}
            <div className="bg-[#142c35] border border-amber-500/20 p-6 rounded-2xl space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-amber-500/30 pb-2">
                <Bell className="w-4 h-4 text-[#f6d860]" />
                <span>Investor Announcements</span>
              </h3>
              <div className="space-y-3">
                {notices.map((notice) => (
                  <div key={notice.id} className="p-3.5 bg-[#0d2027] rounded-xl text-xs space-y-1">
                    <div className="font-bold text-[#f6d860]">{notice.title}</div>
                    <div className="text-slate-300 leading-relaxed">{notice.content}</div>
                    <div className="text-[10px] text-slate-500 pt-1">
                      Published: {new Date(notice.publishedAt).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
