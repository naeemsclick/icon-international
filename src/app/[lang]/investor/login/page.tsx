import { getDictionary, Locale } from '@/lib/i18n/dictionaries';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { AuthPortalTabs } from '@/components/auth/AuthPortalTabs';

export default async function InvestorLoginPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const session = await auth();

  // If already logged in as Investor, redirect directly to dashboard
  if (session?.user && (session.user as any).role === 'INVESTOR') {
    redirect(`/${lang}/investor/dashboard`);
  }

  return (
    <div className="py-16 bg-[#0d2027] text-white min-h-[85vh] flex items-center justify-center">
      <AuthPortalTabs lang={lang} dict={dict} defaultPortal="INVESTOR" />
    </div>
  );
}
