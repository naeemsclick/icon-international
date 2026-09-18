import { requireRole } from '@/lib/security';
import { Locale } from '@/lib/i18n/dictionaries';
import Link from 'next/link';
import {
  LayoutDashboard,
  Building2,
  Users,
  Briefcase,
  ShieldCheck,
  ClipboardList,
} from 'lucide-react';

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang as Locale;

  const session = await requireRole([
    'SUPER_ADMIN',
    'INVESTMENT_MANAGER',
    'CRM_MANAGER',
    'UMRAH_MANAGER',
    'CONTENT_MANAGER',
  ]);

  const userRole = (session.user as any)?.role || 'STAFF';
  const userName = session.user?.name || 'Staff User';

  const adminNavLinks = [
    { href: `/${lang}/admin/dashboard`, label: 'Dashboard Overview', icon: LayoutDashboard, roles: ['SUPER_ADMIN', 'INVESTMENT_MANAGER', 'CRM_MANAGER', 'UMRAH_MANAGER', 'CONTENT_MANAGER'] },
    { href: `/${lang}/admin/projects`, label: 'Real Estate Projects', icon: Building2, roles: ['SUPER_ADMIN', 'INVESTMENT_MANAGER', 'CONTENT_MANAGER'] },
    { href: `/${lang}/admin/investors`, label: 'Investor Accounts', icon: Users, roles: ['SUPER_ADMIN', 'INVESTMENT_MANAGER'] },
    { href: `/${lang}/admin/leads`, label: 'CRM Leads & Inquiries', icon: Briefcase, roles: ['SUPER_ADMIN', 'CRM_MANAGER', 'INVESTMENT_MANAGER'] },
    { href: `/${lang}/admin/b2b-applications`, label: 'B2B Agency Portal', icon: ClipboardList, roles: ['SUPER_ADMIN', 'UMRAH_MANAGER'] },
    { href: `/${lang}/admin/audit-logs`, label: 'Security Audit Logs', icon: ShieldCheck, roles: ['SUPER_ADMIN'] },
  ];

  return (
    <div className="min-h-screen bg-[#07151a] text-slate-100 flex flex-col md:flex-row">
      <aside className="w-full md:w-64 bg-[#0d2027] border-b md:border-b-0 md:border-e border-amber-500/20 p-6 space-y-8 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#f6d860] text-[#0d2027] flex items-center justify-center font-bold text-lg">
            A
          </div>
          <div>
            <div className="font-extrabold text-white text-base tracking-tight">ADMIN PANEL</div>
            <div className="text-[10px] text-amber-400 font-mono font-bold uppercase">{userRole}</div>
          </div>
        </div>

        <div className="text-xs text-slate-400 border-b border-white/10 pb-4">
          Logged in as <span className="text-white font-semibold">{userName}</span>
        </div>

        <nav className="space-y-1 text-xs">
          {adminNavLinks.map((item) => {
            if (!item.roles.includes(userRole)) return null;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-slate-300 hover:text-[#f6d860] hover:bg-white/5 transition-colors"
              >
                <Icon className="w-4 h-4 text-[#f6d860]" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      <main className="flex-1 p-6 lg:p-10 overflow-x-auto">{children}</main>
    </div>
  );
}
