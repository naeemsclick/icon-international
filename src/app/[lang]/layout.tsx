import { getDictionary, Locale } from '@/lib/i18n/dictionaries';
import { DirectionProvider } from '@/components/layout/DirectionProvider';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { auth } from '@/lib/auth';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang as Locale;
  return {
    title: 'Icon International | Real Estate, Investor Visa & Corporate Services',
    description: 'Premier global corporate group specializing in real estate investment, investor visa processing, and B2B travel services across Saudi Arabia, Oman, and Bangladesh.',
    keywords: ['Icon International', 'Real Estate Makkah', 'Oman Real Estate', 'Investor Visa', 'Salalah Property', 'Umrah B2B'],
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang as Locale;
  const dict = await getDictionary(lang);
  const session = await auth();

  return (
    <DirectionProvider lang={lang}>
      <Navbar lang={lang} dict={dict} session={session} />
      <main className="flex-1">{children}</main>
      <Footer lang={lang} dict={dict} />
    </DirectionProvider>
  );
}
