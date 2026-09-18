import { db } from '@/lib/db';
import { getDictionary, Locale } from '@/lib/i18n/dictionaries';
import { Hero } from '@/components/public/Hero';
import { FeaturedProjects } from '@/components/public/FeaturedProjects';
import { ServicesSection } from '@/components/public/ServicesSection';
import { ChairmanSection } from '@/components/public/ChairmanSection';
import { GlobalPresence } from '@/components/public/GlobalPresence';

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang as Locale;
  const dict = await getDictionary(lang);

  const projects = await db.project.findMany({
    where: { isPublic: true },
    include: {
      translations: true,
      media: { orderBy: { sortOrder: 'asc' } },
    },
    take: 6,
    orderBy: { createdAt: 'desc' },
  });

  const offices = await db.office.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: 'asc' },
  });

  return (
    <div>
      <Hero lang={lang} dict={dict} />
      <FeaturedProjects lang={lang} dict={dict} projects={projects} />
      <ServicesSection lang={lang} dict={dict} />
      <ChairmanSection lang={lang} dict={dict} />
      <GlobalPresence lang={lang} dict={dict} offices={offices} />
    </div>
  );
}
