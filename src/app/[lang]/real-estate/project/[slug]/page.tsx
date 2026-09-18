import { db } from '@/lib/db';
import { getDictionary, Locale } from '@/lib/i18n/dictionaries';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MapPin, Download, MessageSquare, ShieldCheck } from 'lucide-react';
import { ProjectInquiryForm } from '@/components/public/ProjectInquiryForm';

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang as Locale;
  const slug = resolvedParams.slug;
  const dict = await getDictionary(lang);

  const project = await db.project.findUnique({
    where: { slug },
    include: {
      translations: true,
      media: { orderBy: { sortOrder: 'asc' } },
      units: true,
      installmentPlans: { orderBy: { order: 'asc' } },
      facilities: true,
      documents: true,
      constructionUpdates: { orderBy: { updateDate: 'desc' } },
    },
  });

  if (!project) {
    notFound();
  }

  const translation =
    project.translations.find((t) => t.language === lang) ||
    project.translations[0] ||
    { name: project.slug, description: '', shortDescription: '' };

  const whatsappMessage = encodeURIComponent(
    `Hello Icon International, I am interested in learning more about the project: ${translation.name} (${project.city}, ${project.country}).`
  );

  return (
    <div className="py-10 bg-[#0d2027] text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-xs text-slate-400 flex items-center gap-2">
          <Link href={`/${lang}`} className="hover:text-[#f6d860]">Home</Link>
          <span>/</span>
          <Link href={`/${lang}/real-estate`} className="hover:text-[#f6d860]">Real Estate</Link>
          <span>/</span>
          <span className="text-[#f6d860] font-semibold">{translation.name}</span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-white/10">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="bg-[#142c35] text-[#f6d860] border border-amber-500/30 text-xs font-bold px-3 py-1 rounded-full uppercase">
                {project.status.replace('_', ' ')}
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#f6d860]" />
                {project.city}, {project.country}
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white">{translation.name}</h1>
            <p className="text-slate-300 text-sm max-w-3xl">{translation.shortDescription}</p>
          </div>

          <div className="bg-[#142c35] border border-amber-500/30 p-4 rounded-xl text-end shrink-0 space-y-1">
            <div className="text-xs text-slate-400">Starting Price</div>
            <div className="text-2xl font-extrabold text-[#f6d860]">
              {project.currency} {project.startingPrice.toLocaleString()}
            </div>
            <div className="text-[10px] text-emerald-400">
              {project.cashAvailable && 'Cash '} {project.installmentAvailable && '• Installment Available'}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {project.media.length > 0 ? (
            project.media.map((media, index) => (
              <div
                key={media.id}
                className={`relative rounded-2xl overflow-hidden border border-amber-500/20 bg-[#142c35] ${
                  index === 0 ? 'md:col-span-2 md:row-span-2 h-96 md:h-full' : 'h-48'
                }`}
              >
                <img
                  src={media.url}
                  alt={media.title || translation.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d2027] via-transparent to-transparent opacity-60" />
                {media.title && (
                  <span className="absolute bottom-3 start-3 text-xs bg-[#0d2027]/80 text-slate-200 px-2.5 py-1 rounded">
                    {media.title}
                  </span>
                )}
              </div>
            ))
          ) : (
            <div className="md:col-span-3 h-80 rounded-2xl bg-[#142c35] flex items-center justify-center text-slate-400">
              Project media preview
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7 space-y-10">
            <div className="bg-[#142c35] border border-amber-500/20 p-8 rounded-2xl space-y-4">
              <h2 className="text-xl font-bold text-white border-b border-amber-500/30 pb-3">
                Project Overview
              </h2>
              <div
                className="text-sm text-slate-300 leading-relaxed space-y-3"
                dangerouslySetInnerHTML={{ __html: translation.description || '' }}
              />
            </div>

            {translation.ownershipInfo && (
              <div className="bg-[#142c35] border border-amber-500/20 p-8 rounded-2xl space-y-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#f6d860]" />
                  <span>Ownership & Legal Framework</span>
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {translation.ownershipInfo}
                </p>
              </div>
            )}

            {project.units.length > 0 && (
              <div className="bg-[#142c35] border border-amber-500/20 p-8 rounded-2xl space-y-4">
                <h3 className="text-lg font-bold text-white">Available Units & Shares</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-start">
                    <thead>
                      <tr className="border-b border-white/10 text-slate-400">
                        <th className="py-2.5 px-2">Identifier</th>
                        <th className="py-2.5 px-2">Type</th>
                        <th className="py-2.5 px-2">Size</th>
                        <th className="py-2.5 px-2">Price</th>
                        <th className="py-2.5 px-2">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-slate-200">
                      {project.units.map((unit) => (
                        <tr key={unit.id}>
                          <td className="py-3 px-2 font-semibold text-white">{unit.unitIdentifier}</td>
                          <td className="py-3 px-2">{unit.type}</td>
                          <td className="py-3 px-2">{unit.size}</td>
                          <td className="py-3 px-2 font-bold text-[#f6d860]">
                            {unit.currency} {unit.price.toLocaleString()}
                          </td>
                          <td className="py-3 px-2">
                            <span className="bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded text-[10px] uppercase font-bold">
                              {unit.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {project.installmentPlans.length > 0 && (
              <div className="bg-[#142c35] border border-amber-500/20 p-8 rounded-2xl space-y-4">
                <h3 className="text-lg font-bold text-white">Payment & Installment Plans</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.installmentPlans.map((plan) => (
                    <div key={plan.id} className="bg-[#0d2027] border border-amber-500/30 p-5 rounded-xl space-y-2">
                      <div className="font-bold text-sm text-[#f6d860]">{plan.name}</div>
                      <div className="text-xs text-slate-300">{plan.description}</div>
                      <div className="pt-2 text-xs border-t border-white/10 space-y-1">
                        <div>Down Payment: <strong>{project.currency} {plan.downPaymentAmount.toLocaleString()}</strong></div>
                        <div>Monthly: <strong>{project.currency} {plan.monthlyAmount.toLocaleString()}</strong></div>
                        <div>Duration: <strong>{plan.durationMonths} Months</strong></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {project.documents.length > 0 && (
              <div className="bg-[#142c35] border border-amber-500/20 p-6 rounded-2xl flex flex-wrap justify-between items-center gap-4">
                <div>
                  <h4 className="font-bold text-sm text-white">Official Project Documents</h4>
                  <p className="text-xs text-slate-400">Download brochure, legal disclosures, and floor plans.</p>
                </div>
                {project.documents.map((doc) => (
                  <a
                    key={doc.id}
                    href={doc.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#f6d860] text-[#0d2027] font-bold px-4 py-2 rounded-lg text-xs hover:bg-amber-400 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download {doc.title}</span>
                  </a>
                ))}
              </div>
            )}

          </div>

          <div className="lg:col-span-5 space-y-6" id="apply">
            <div className="bg-[#142c35] border border-amber-500/30 p-8 rounded-2xl space-y-6 shadow-2xl sticky top-28">
              <div className="space-y-2 border-b border-amber-500/30 pb-4">
                <h3 className="text-xl font-bold text-white">Apply to Invest</h3>
                <p className="text-xs text-slate-300">
                  Submit your details to receive full project disclosure and reserve an allocation.
                </p>
              </div>

              <ProjectInquiryForm projectId={project.id} projectName={translation.name} currency={project.currency} />

              <div className="pt-4 border-t border-white/10 text-center">
                <a
                  href={`https://wa.me/96898260202?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600/20 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-600/30 py-3 rounded-xl text-xs font-bold transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Instant WhatsApp Inquiry for {translation.name}</span>
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
