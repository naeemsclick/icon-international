import { getDictionary, Locale } from '@/lib/i18n/dictionaries';
import { db } from '@/lib/db';
import Link from 'next/link';
import { Layers, MapPin, CheckCircle, ArrowRight } from 'lucide-react';

export default async function OthersProjectsPage({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang as Locale;
  const dict = await getDictionary(lang);

  // Fetch secondary or custom category projects
  const secondaryProjects = await db.project.findMany({
    where: { isPublic: true },
    include: {
      translations: true,
      media: { orderBy: { sortOrder: 'asc' } },
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="py-16 bg-[#0d2027] text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="text-start space-y-3">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-[#f6d860] px-3.5 py-1.5 rounded-full text-xs font-semibold">
            <Layers className="w-4 h-4" />
            <span>Special Initiatives & Commercial Assets</span>
          </div>

          <h1 className="text-4xl font-extrabold text-white">
            Others Projects & Joint Ventures
          </h1>

          <p className="text-slate-300 text-sm max-w-2xl">
            Explore specialized commercial developments, infrastructure ventures, and upcoming strategic assets across Saudi Arabia, Oman, and Bangladesh.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {secondaryProjects.map((project) => {
            const translation =
              project.translations?.find((t: any) => t.language === lang) ||
              project.translations?.[0] ||
              {};
            const mainMedia = project.media?.[0]?.url || 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=800&q=80';

            return (
              <div
                key={project.id}
                className="bg-[#142c35] border border-amber-500/20 rounded-2xl overflow-hidden hover:border-amber-400/50 transition-all flex flex-col justify-between shadow-xl"
              >
                <div>
                  <div className="relative h-60 overflow-hidden">
                    <img
                      src={mainMedia}
                      alt={translation.name || project.slug}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#142c35] via-transparent to-transparent opacity-80" />
                    <div className="absolute top-4 start-4">
                      <span className="bg-[#0d2027]/90 text-[#f6d860] border border-amber-500/30 text-xs font-bold px-3 py-1 rounded-full uppercase">
                        {project.propertyType}
                      </span>
                    </div>
                    <div className="absolute bottom-3 start-4 text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#f6d860]" />
                      <span>{project.city}, {project.country}</span>
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <h3 className="text-xl font-bold text-white">{translation.name || project.slug}</h3>
                    <p className="text-xs text-slate-300 line-clamp-2">{translation.shortDescription}</p>

                    <div className="pt-2 text-xs text-slate-400">
                      Investment Model: <strong className="text-slate-200">{project.investmentType}</strong>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-white/5 space-y-3">
                  <div className="flex justify-between items-baseline pt-2">
                    <span className="text-xs text-slate-400">Target Value</span>
                    <span className="text-lg font-extrabold text-[#f6d860]">
                      {project.currency} {project.startingPrice.toLocaleString()}
                    </span>
                  </div>

                  <Link
                    href={`/${lang}/real-estate/project/${project.slug}`}
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#f6d860] hover:bg-amber-400 text-[#0d2027] font-bold py-2.5 rounded-xl text-xs transition-colors"
                  >
                    <span>View Project Specifications</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
