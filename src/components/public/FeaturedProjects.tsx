import Link from 'next/link';
import { Building2, MapPin, CheckCircle, ArrowRight, Shield, Layers } from 'lucide-react';

interface FeaturedProjectsProps {
  lang: string;
  dict: any;
  projects: any[];
}

export function FeaturedProjects({ lang, dict, projects }: FeaturedProjectsProps) {
  const isRtl = lang === 'ar';

  return (
    <section className="py-20 bg-[#07151a] text-white border-b border-amber-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="text-[#f6d860] font-semibold text-xs tracking-widest uppercase mb-2">
              Portfolio Showcase
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-sans">
              {dict.featuredProjects?.title || 'Featured Real Estate Developments'}
            </h2>
            <p className="text-slate-400 text-sm mt-2 max-w-xl">
              {dict.featuredProjects?.subtitle ||
                'Discover luxury residential, commercial, and hospitality opportunities in prime Middle East & South Asia locations.'}
            </p>
          </div>

          <Link
            href={`/${lang}/real-estate`}
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-[#f6d860] px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors border border-amber-500/20 shrink-0"
          >
            <span>{dict.featuredProjects?.viewAll || 'View All Projects'}</span>
            <ArrowRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
          </Link>
        </div>

        {/* Project Cards Grid */}
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
                className="bg-[#0d2027] border border-amber-500/20 rounded-2xl overflow-hidden hover:border-amber-400/50 transition-all duration-300 group flex flex-col justify-between shadow-xl"
              >
                <div>
                  {/* Card Media Header */}
                  <div className="relative h-60 overflow-hidden">
                    <img
                      src={mainMedia}
                      alt={translation.name || project.slug}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d2027] via-transparent to-transparent opacity-80" />
                    
                    {/* Status Badge */}
                    <div className="absolute top-4 start-4 flex flex-wrap gap-2">
                      <span className="bg-[#0d2027]/90 text-[#f6d860] border border-amber-500/30 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                        {project.status.replace('_', ' ')}
                      </span>
                      {project.featured && (
                        <span className="bg-amber-500 text-[#0d2027] text-xs font-extrabold px-2.5 py-1 rounded-full">
                          ★ Featured
                        </span>
                      )}
                    </div>

                    <div className="absolute bottom-3 start-4 text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#f6d860]" />
                      <span>{project.city}, {project.country}</span>
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div className="p-6 space-y-4">
                    <h3 className="text-xl font-bold text-white group-hover:text-[#f6d860] transition-colors">
                      {translation.name || project.slug}
                    </h3>

                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                      {translation.shortDescription || 'Prime real estate development.'}
                    </p>

                    <div className="pt-2 border-t border-white/10 grid grid-cols-2 gap-2 text-xs text-slate-300">
                      <div>
                        <span className="text-slate-500 block">Property Type</span>
                        <strong className="text-slate-200">{project.propertyType}</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Investment Type</span>
                        <strong className="text-slate-200">{project.investmentType}</strong>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-emerald-400 font-medium pt-1">
                      {project.cashAvailable && <span className="flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5" /> Cash</span>}
                      {project.installmentAvailable && <span className="flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5" /> Installment</span>}
                    </div>
                  </div>
                </div>

                {/* Card Footer & CTAs */}
                <div className="p-6 pt-0 border-t border-white/5 mt-4 space-y-3">
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs text-slate-400">Starting Price</span>
                    <span className="text-lg font-extrabold text-[#f6d860]">
                      {project.currency} {project.startingPrice.toLocaleString()}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <Link
                      href={`/${lang}/real-estate/project/${project.slug}`}
                      className="text-center bg-white/10 hover:bg-white/20 text-white font-semibold py-2 rounded-lg text-xs transition-colors"
                    >
                      {dict.featuredProjects?.details || 'View Details'}
                    </Link>
                    <Link
                      href={`/${lang}/real-estate/project/${project.slug}#apply`}
                      className="text-center bg-[#f6d860] hover:bg-amber-400 text-[#0d2027] font-bold py-2 rounded-lg text-xs transition-colors shadow-md shadow-amber-500/10"
                    >
                      {dict.featuredProjects?.apply || 'Apply to Invest'}
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
