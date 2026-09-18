import { getDictionary, Locale } from '@/lib/i18n/dictionaries';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { AuthPortalTabs } from '@/components/auth/AuthPortalTabs';

export default async function AdminLoginPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: Locale }>;
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const { lang } = await params;
  const { callbackUrl } = await searchParams;
  const dict = await getDictionary(lang);
  const session = await auth();

  // If logged in as Admin/Staff, redirect to dashboard
  if (session?.user && (session.user as any).role !== 'INVESTOR') {
    redirect(`/${lang}/admin/dashboard`);
  }

  return (
    <div className="py-16 bg-[#0d2027] text-white min-h-[85vh] flex items-center justify-center">
      <AuthPortalTabs
        lang={lang}
        dict={dict}
        defaultPortal="ADMIN"
        callbackUrl={callbackUrl}
      />
    </div>
  );
}
