import { db } from '@/lib/db';
import { getDictionary, Locale } from '@/lib/i18n/dictionaries';
import Link from 'next/link';
import { MapPin, Filter } from 'lucide-react';

export default async function RealEstatePage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ country?: string; status?: string; type?: string; query?: string }>;
}) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang as Locale;
  const { country, status, type } = await searchParams;
  const dict = await getDictionary(lang);

  const whereFilter: any = { isPublic: true };
  if (country) whereFilter.country = country;
  if (status) whereFilter.status = status;
  if (type) whereFilter.propertyType = type;

  const projects = await db.project.findMany({
    where: whereFilter,
    include: {
      translations: true,
      media: { orderBy: { sortOrder: 'asc' } },
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="py-12 bg-[#0d2027] text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-start space-y-3">
          <div className="text-[#f6d860] font-semibold text-xs tracking-widest uppercase">
            Icon International Real Estate
          </div>
          <h1 className="text-4xl font-extrabold text-white">
            Real Estate Projects & Investment Opportunities
          </h1>
          <p className="text-slate-300 text-sm max-w-2xl">
            Explore premier hotel apartments, residential developments, and commercial properties across Saudi Arabia, Oman, and Bangladesh.
          </p>
        </div>

        <div className="bg-[#142c35] border border-amber-500/20 p-6 rounded-2xl shadow-xl space-y-4">
          <div className="flex items-center gap-2 text-[#f6d860] text-sm font-semibold border-b border-white/10 pb-3">
            <Filter className="w-4 h-4" />
            <span>Filter Projects by Region & Status</span>
          </div>

          <form method="GET" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs text-slate-400 mb-1">Country / Region</label>
              <select
                name="country"
                defaultValue={country || ''}
                className="w-full bg-[#0d2027] border border-amber-500/30 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
              >
                <option value="">All Countries</option>
                <option value="Saudi Arabia">Saudi Arabia (Makkah/Madinah)</option>
                <option value="Oman">Sultanate of Oman</option>
                <option value="Bangladesh">Bangladesh</option>
              </select>
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">Construction Status</label>
              <select
                name="status"
                defaultValue={status || ''}
                className="w-full bg-[#0d2027] border border-amber-500/30 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
              >
                <option value="">All Statuses</option>
                <option value="UPCOMING">Upcoming</option>
                <option value="UNDER_CONSTRUCTION">Under Construction</option>
                <option value="READY">Ready for Move-In</option>
                <option value="COMPLETED">Completed</option>
                <option value="SOLD_OUT">Sold Out</option>
              </select>
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">Property Type</label>
              <select
                name="type"
                defaultValue={type || ''}
                className="w-full bg-[#0d2027] border border-amber-500/30 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
              >
                <option value="">All Property Types</option>
                <option value="HOTEL">Hotel Apartment / Share</option>
                <option value="FLAT">Residential Flat</option>
                <option value="COMMERCIAL">Commercial Building</option>
                <option value="LAND">Land Plot</option>
              </select>
            </div>

            <div className="flex items-end gap-2">
              <button
                type="submit"
                className="w-full bg-[#f6d860] hover:bg-amber-400 text-[#0d2027] font-bold py-2 px-4 rounded-lg text-sm transition-colors"
              >
                Apply Filters
              </button>
              <Link
                href={`/${lang}/real-estate`}
                className="bg-white/10 hover:bg-white/20 text-slate-300 py-2 px-3 rounded-lg text-xs"
              >
                Reset
              </Link>
            </div>
          </form>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-16 bg-[#142c35]/50 border border-white/10 rounded-2xl p-8 space-y-3">
            <h3 className="text-lg font-bold text-slate-300">No projects match the selected criteria</h3>
            <p className="text-xs text-slate-400">Try adjusting your filters or search terms.</p>
            <Link href={`/${lang}/real-estate`} className="inline-block text-[#f6d860] text-xs font-semibold hover:underline">
              View All Projects
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => {
              const translation =
                project.translations?.find((t: any) => t.language === lang) ||
                project.translations?.[0] ||
                {};
              const mainMedia = project.media?.[0]?.url || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80';

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
                        <span className="bg-[#0d2027]/90 text-[#f6d860] border border-amber-500/30 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                          {project.status.replace('_', ' ')}
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

                      <div className="pt-2 grid grid-cols-2 gap-2 text-xs text-slate-400">
                        <div>Property: <strong className="text-slate-200">{project.propertyType}</strong></div>
                        <div>Type: <strong className="text-slate-200">{project.investmentType}</strong></div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0 border-t border-white/5 space-y-3">
                    <div className="flex justify-between items-baseline pt-2">
                      <span className="text-xs text-slate-400">Starting Price</span>
                      <span className="text-lg font-extrabold text-[#f6d860]">
                        {project.currency} {project.startingPrice.toLocaleString()}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <Link
                        href={`/${lang}/real-estate/project/${project.slug}`}
                        className="text-center bg-white/10 hover:bg-white/20 text-white font-semibold py-2 rounded-lg text-xs transition-colors"
                      >
                        View Details
                      </Link>
                      <Link
                        href={`/${lang}/real-estate/project/${project.slug}#apply`}
                        className="text-center bg-[#f6d860] hover:bg-amber-400 text-[#0d2027] font-bold py-2 rounded-lg text-xs transition-colors"
                      >
                        Apply to Invest
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
