import { getDictionary, Locale } from '@/lib/i18n/dictionaries';
import { db } from '@/lib/db';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Calendar, User, ArrowLeft, Share2 } from 'lucide-react';

export async function generateStaticParams() {
  const posts = await db.blogPost.findMany({ select: { slug: true } });
  const langs = ['en', 'bn', 'ar'];
  const params: { lang: string; slug: string }[] = [];
  
  for (const lang of langs) {
    for (const post of posts) {
      params.push({ lang, slug: post.slug });
    }
  }
  return params;
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang as Locale;
  const slug = resolvedParams.slug;
  const dict = await getDictionary(lang);

  const post = await db.blogPost.findUnique({
    where: { slug },
    include: {
      translations: true,
      author: true,
    },
  });

  if (!post) {
    notFound();
  }

  const translation =
    post.translations.find((t) => t.language === lang) ||
    post.translations[0] ||
    { title: post.slug, content: '', excerpt: '' };

  return (
    <div className="py-12 bg-[#0d2027] text-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Back Link */}
        <Link
          href={`/${lang}/blog`}
          className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-[#f6d860] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Articles & News</span>
        </Link>

        {/* Post Header */}
        <div className="space-y-4 border-b border-amber-500/30 pb-6">
          <span className="bg-[#142c35] text-[#f6d860] border border-amber-500/30 text-xs font-bold px-3 py-1 rounded-full uppercase">
            {post.category}
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
            {translation.title}
          </h1>

          <div className="flex items-center gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#f6d860]" />
              {new Date(post.publishedAt).toLocaleDateString()}
            </span>
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-[#f6d860]" />
              Author: {post.author.name}
            </span>
          </div>
        </div>

        {/* Featured Image */}
        <div className="relative rounded-2xl overflow-hidden border border-amber-500/20 h-96 bg-[#142c35]">
          <img
            src={post.featuredImage}
            alt={translation.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Body Content */}
        <div
          className="bg-[#142c35] border border-amber-500/20 p-8 sm:p-12 rounded-2xl text-slate-300 text-sm leading-relaxed space-y-4"
          dangerouslySetInnerHTML={{ __html: translation.content }}
        />

      </div>
    </div>
  );
}
