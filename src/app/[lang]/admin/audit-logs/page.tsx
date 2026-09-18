import { db } from '@/lib/db';
import { Locale } from '@/lib/i18n/dictionaries';
import { ShieldCheck, User, Clock, Terminal } from 'lucide-react';

export default async function AdminAuditLogsPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;

  const logs = await db.auditLog.findMany({
    take: 50,
    orderBy: { timestamp: 'desc' },
    include: { user: true },
  });

  return (
    <div className="space-y-8">
      
      <div>
        <h1 className="text-3xl font-extrabold text-white">Security & Audit Logs</h1>
        <p className="text-xs text-slate-400">Immutable ledger of administrative mutations, financial updates, and investor account status changes.</p>
      </div>

      <div className="bg-[#142c35] border border-amber-500/20 p-6 rounded-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-start">
            <thead>
              <tr className="border-b border-white/10 text-slate-400">
                <th className="py-3 px-2 text-start">Timestamp</th>
                <th className="py-3 px-2 text-start">Staff User</th>
                <th className="py-3 px-2 text-start">Action</th>
                <th className="py-3 px-2 text-start">Entity</th>
                <th className="py-3 px-2 text-start">Entity ID</th>
                <th className="py-3 px-2 text-end">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-200 font-mono">
              {logs.map((log) => (
                <tr key={log.id}>
                  <td className="py-3 px-2 text-slate-400">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                  <td className="py-3 px-2 font-sans font-bold text-white">
                    {log.user.name} ({log.user.userCode})
                  </td>
                  <td className="py-3 px-2">
                    <span className="bg-amber-500/20 text-[#f6d860] px-2 py-0.5 rounded text-[10px] font-bold">
                      {log.action}
                    </span>
                  </td>
                  <td className="py-3 px-2 font-sans">{log.entity}</td>
                  <td className="py-3 px-2 text-slate-400">#{log.entityId.slice(0, 8)}</td>
                  <td className="py-3 px-2 text-end text-slate-400">{log.ipAddress || '127.0.0.1'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
