import { getDictionary, Locale } from '@/lib/i18n/dictionaries';
import { db } from '@/lib/db';
import Link from 'next/link';
import { Newspaper, Calendar, User, ArrowRight } from 'lucide-react';

export default async function BlogPage({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang as Locale;
  const dict = await getDictionary(lang);

  const posts = await db.blogPost.findMany({
    where: { status: 'PUBLISHED' },
    include: {
      translations: true,
      author: true,
    },
    orderBy: { publishedAt: 'desc' },
  });

  return (
    <div className="py-16 bg-[#0d2027] text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="text-start space-y-3">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-[#f6d860] px-3.5 py-1.5 rounded-full text-xs font-semibold">
            <Newspaper className="w-4 h-4" />
            <span>Corporate Insights & News</span>
          </div>

          <h1 className="text-4xl font-extrabold text-white">
            Icon International Blog & News CMS
          </h1>

          <p className="text-slate-300 text-sm max-w-2xl">
            Stay updated with market analysis, real-estate regulatory updates in Saudi Arabia & Oman, and corporate announcements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => {
            const translation =
              post.translations.find((t) => t.language === lang) ||
              post.translations[0] ||
              { title: post.slug, excerpt: '' };

            return (
              <div
                key={post.id}
                className="bg-[#142c35] border border-amber-500/20 rounded-2xl overflow-hidden hover:border-amber-400/50 transition-all flex flex-col justify-between shadow-xl"
              >
                <div>
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={post.featuredImage}
                      alt={translation.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#142c35] via-transparent to-transparent opacity-80" />
                    <span className="absolute top-4 start-4 bg-[#0d2027]/90 text-[#f6d860] border border-amber-500/30 text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                      {post.category}
                    </span>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-3 text-xs text-slate-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-[#f6d860]" />
                        {new Date(post.publishedAt).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-[#f6d860]" />
                        {post.author.name}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white leading-snug">{translation.title}</h3>
                    <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">{translation.excerpt}</p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-white/5 mt-4">
                  <Link
                    href={`/${lang}/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-xs font-bold text-[#f6d860] hover:text-amber-300 transition-colors"
                  >
                    <span>Read Full Article</span>
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
