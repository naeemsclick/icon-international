'use client';

import { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2, Calendar } from 'lucide-react';

export function ChairmanMeetingForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    country: 'Oman',
    phone: '',
    whatsapp: '',
    email: '',
    purpose: 'High-Ticket Real Estate Investment',
    preferredDate: '',
    preferredMeetingTime: 'Morning (10 AM - 12 PM)',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'CHAIRMAN_MEETING',
          leadType: 'CHAIRMAN_MEETING',
          ...formData,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to request meeting');

      setSuccess(`Meeting request received! Your reference ID is #${data.referenceId.slice(0, 8)}.`);
      setFormData({
        name: '',
        company: '',
        country: 'Oman',
        phone: '',
        whatsapp: '',
        email: '',
        purpose: 'High-Ticket Real Estate Investment',
        preferredDate: '',
        preferredMeetingTime: 'Morning (10 AM - 12 PM)',
        message: '',
      });
    } catch (err: any) {
      setError(err.message || 'An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-xs text-slate-200">
      {success && (
        <div className="bg-emerald-500/20 border border-emerald-500/40 p-4 rounded-xl text-emerald-300 flex items-start gap-2">
          <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
          <span>{success}</span>
        </div>
      )}

      {error && (
        <div className="bg-red-500/20 border border-red-500/40 p-4 rounded-xl text-red-300 flex items-start gap-2">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-slate-400 mb-1">Full Name *</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. Eng. Mansoor Al-Said"
            className="w-full bg-[#0d2027] border border-amber-500/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-400"
          />
        </div>

        <div>
          <label className="block text-slate-400 mb-1">Company / Organization</label>
          <input
            type="text"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            placeholder="e.g. GCC Capital Group"
            className="w-full bg-[#0d2027] border border-amber-500/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-400"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-slate-400 mb-1">Country *</label>
          <select
            value={formData.country}
            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
            className="w-full bg-[#0d2027] border border-amber-500/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-400"
          >
            <option value="Oman">Oman</option>
            <option value="Saudi Arabia">Saudi Arabia</option>
            <option value="Bangladesh">Bangladesh</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="United States">United States</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-slate-400 mb-1">Phone / Mobile *</label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="+968 9000 0000"
            className="w-full bg-[#0d2027] border border-amber-500/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-400"
          />
        </div>

        <div>
          <label className="block text-slate-400 mb-1">Email Address *</label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="executive@example.com"
            className="w-full bg-[#0d2027] border border-amber-500/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-400"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-slate-400 mb-1">Preferred Date</label>
          <input
            type="date"
            value={formData.preferredDate}
            onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
            className="w-full bg-[#0d2027] border border-amber-500/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-400"
          />
        </div>

        <div>
          <label className="block text-slate-400 mb-1">Purpose of Meeting</label>
          <select
            value={formData.purpose}
            onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
            className="w-full bg-[#0d2027] border border-amber-500/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-400"
          >
            <option value="High-Ticket Real Estate Investment">High-Ticket Real Estate Investment</option>
            <option value="B2B Agency Partnership">B2B Agency Partnership</option>
            <option value="Investor Visa Consultation">Investor Visa Consultation</option>
            <option value="Corporate Joint Venture">Corporate Joint Venture</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-slate-400 mb-1">Brief Description of Meeting Agenda</label>
        <textarea
          rows={3}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="State key points or proposal details..."
          className="w-full bg-[#0d2027] border border-amber-500/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-400"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#f6d860] hover:bg-amber-400 text-[#0d2027] font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Scheduling Meeting Request...</span>
          </>
        ) : (
          <>
            <Calendar className="w-4 h-4" />
            <span>Request Direct Meeting</span>
          </>
        )}
      </button>
    </form>
  );
}
