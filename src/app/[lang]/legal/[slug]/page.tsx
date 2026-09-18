import { db } from '@/lib/db';
import { getDictionary, Locale } from '@/lib/i18n/dictionaries';
import { notFound } from 'next/navigation';
import { ShieldCheck, FileText } from 'lucide-react';

export default async function LegalCMSPage({
  params,
}: {
  params: Promise<{ lang: Locale; slug: string }>;
}) {
  const { lang, slug } = await params;
  const dict = await getDictionary(lang);

  const cmsPage = await db.cMSPage.findUnique({
    where: { slug },
    include: { translations: true },
  });

  const translation =
    cmsPage?.translations.find((t) => t.language === lang) ||
    cmsPage?.translations[0];

  return (
    <div className="py-16 bg-[#0d2027] text-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="border-b border-amber-500/30 pb-6 space-y-2">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-[#f6d860] px-3 py-1 rounded-full text-xs font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>Legal Disclosure</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white capitalize">
            {translation?.title || slug.replace(/-/g, ' ')}
          </h1>
          <p className="text-xs text-slate-400">
            Last Updated: {cmsPage?.updatedAt ? new Date(cmsPage.updatedAt).toLocaleDateString() : 'September 2026'}
          </p>
        </div>

        <div className="bg-[#142c35] border border-amber-500/20 p-8 rounded-2xl text-slate-300 text-sm leading-relaxed space-y-4">
          {translation?.content ? (
            <div dangerouslySetInnerHTML={{ __html: translation.content }} />
          ) : (
            <p>Official legal terms and documentation for Icon International.</p>
          )}

          {slug === 'investment-disclaimer' && (
            <div className="mt-8 p-4 bg-[#0d2027] border border-amber-500/30 rounded-xl text-xs text-slate-400 space-y-2">
              <strong className="text-white block">Important Financial & Investment Disclaimer:</strong>
              <p>
                Informational content on this website does not constitute a guaranteed financial yield or contractual obligation. All investment commitments are governed strictly by executed legal agreements and deeds under applicable GCC laws.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
