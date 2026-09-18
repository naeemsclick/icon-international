import { db } from '@/lib/db';
import { Locale } from '@/lib/i18n/dictionaries';
import Link from 'next/link';
import { Building2, Plus, Edit, Eye, Trash2, MapPin } from 'lucide-react';

export default async function AdminProjectsPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;

  const projects = await db.project.findMany({
    include: {
      translations: true,
      media: true,
      units: true,
      investments: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white">Project Management</h1>
          <p className="text-xs text-slate-400">Manage real estate listings, pricing, construction status, and media.</p>
        </div>

        <Link
          href={`/${lang}/admin/projects/new`}
          className="inline-flex items-center gap-2 bg-[#f6d860] text-[#0d2027] font-bold px-4 py-2.5 rounded-xl text-xs hover:bg-amber-400 transition-colors shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Real Estate Project</span>
        </Link>
      </div>

      {/* Projects Table */}
      <div className="bg-[#142c35] border border-amber-500/20 p-6 rounded-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-start">
            <thead>
              <tr className="border-b border-white/10 text-slate-400">
                <th className="py-3 px-2 text-start">Project Name</th>
                <th className="py-3 px-2 text-start">Location</th>
                <th className="py-3 px-2 text-start">Property Type</th>
                <th className="py-3 px-2 text-start">Starting Price</th>
                <th className="py-3 px-2 text-start">Status</th>
                <th className="py-3 px-2 text-start">Featured</th>
                <th className="py-3 px-2 text-end">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-200">
              {projects.map((project) => {
                const translation = project.translations[0] || {};
                return (
                  <tr key={project.id}>
                    <td className="py-3 px-2 font-bold text-white">
                      {translation.name || project.slug}
                      <div className="text-[10px] text-slate-400 font-mono">slug: {project.slug}</div>
                    </td>
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#f6d860]" />
                        <span>{project.city}, {project.country}</span>
                      </div>
                    </td>
                    <td className="py-3 px-2">{project.propertyType}</td>
                    <td className="py-3 px-2 font-bold text-[#f6d860]">
                      {project.currency} {project.startingPrice.toLocaleString()}
                    </td>
                    <td className="py-3 px-2">
                      <span className="bg-amber-500/20 text-[#f6d860] px-2 py-0.5 rounded text-[10px] uppercase font-bold">
                        {project.status}
                      </span>
                    </td>
                    <td className="py-3 px-2">
                      {project.featured ? (
                        <span className="text-amber-400 font-bold">★ Yes</span>
                      ) : (
                        <span className="text-slate-500">No</span>
                      )}
                    </td>
                    <td className="py-3 px-2 text-end">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/${lang}/real-estate/project/${project.slug}`}
                          target="_blank"
                          className="p-1.5 bg-white/10 hover:bg-white/20 text-slate-300 rounded"
                          title="View Public Page"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
