import { db } from '@/lib/db';
import { Locale } from '@/lib/i18n/dictionaries';
import { ClipboardList, ShieldCheck, Mail, Phone } from 'lucide-react';

export default async function AdminB2BApplicationsPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;

  const applications = await db.b2BAgencyApplication.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-8">
      
      <div>
        <h1 className="text-3xl font-extrabold text-white">B2B Agency Applications</h1>
        <p className="text-xs text-slate-400">Review partner agency registrations, Umrah visa quota requests, and ticketing requirements.</p>
      </div>

      <div className="bg-[#142c35] border border-amber-500/20 p-6 rounded-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-start">
            <thead>
              <tr className="border-b border-white/10 text-slate-400">
                <th className="py-3 px-2 text-start">Agency Name</th>
                <th className="py-3 px-2 text-start">License No.</th>
                <th className="py-3 px-2 text-start">Contact Person</th>
                <th className="py-3 px-2 text-start">Country & Contact</th>
                <th className="py-3 px-2 text-start">Pax Volume</th>
                <th className="py-3 px-2 text-start">Visa Qty</th>
                <th className="py-3 px-2 text-start">Status</th>
                <th className="py-3 px-2 text-end">Applied Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-200">
              {applications.map((app) => (
                <tr key={app.id}>
                  <td className="py-3 px-2 font-bold text-white">
                    {app.agencyName}
                  </td>
                  <td className="py-3 px-2 font-mono text-[#f6d860]">
                    {app.licenseNumber}
                  </td>
                  <td className="py-3 px-2">{app.contactPerson}</td>
                  <td className="py-3 px-2">
                    <div>{app.country}</div>
                    <div className="text-slate-400">{app.phone} • {app.email}</div>
                  </td>
                  <td className="py-3 px-2">{app.passengerVolume} / mo</td>
                  <td className="py-3 px-2 font-bold text-[#f6d860]">{app.requiredVisaQty}</td>
                  <td className="py-3 px-2">
                    <span className="bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded text-[10px] uppercase font-bold">
                      {app.status}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-end text-slate-400">
                    {new Date(app.createdAt).toLocaleDateString()}
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
