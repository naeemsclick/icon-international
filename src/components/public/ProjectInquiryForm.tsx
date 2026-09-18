'use client';

import { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

interface ProjectInquiryFormProps {
  projectId: string;
  projectName: string;
  currency: string;
}

export function ProjectInquiryForm({ projectId, projectName, currency }: ProjectInquiryFormProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    country: 'Oman',
    phone: '',
    whatsapp: '',
    email: '',
    proposedAmount: '',
    paymentPreference: 'INSTALLMENT',
    preferredMeetingTime: 'Morning (9 AM - 12 PM)',
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
          source: 'PROJECT_APPLY',
          leadType: 'INVESTMENT',
          interestedProjectId: projectId,
          currency,
          ...formData,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit inquiry');
      }

      setSuccess(`Inquiry submitted successfully! Your Reference ID is #${data.referenceId.slice(0, 8)}.`);
      setFormData({
        name: '',
        country: 'Oman',
        phone: '',
        whatsapp: '',
        email: '',
        proposedAmount: '',
        paymentPreference: 'INSTALLMENT',
        preferredMeetingTime: 'Morning (9 AM - 12 PM)',
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

      <div>
        <label className="block text-slate-400 mb-1">Full Name *</label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="e.g. Sheikh Ahmed Al-Busaidi"
          className="w-full bg-[#0d2027] border border-amber-500/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-400"
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
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
            <option value="United Arab Emirates">UAE</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="United States">United States</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-slate-400 mb-1">Mobile / Phone *</label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="+968 9000 0000"
            className="w-full bg-[#0d2027] border border-amber-500/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-400"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-slate-400 mb-1">WhatsApp Number</label>
          <input
            type="tel"
            value={formData.whatsapp}
            onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
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
            placeholder="investor@example.com"
            className="w-full bg-[#0d2027] border border-amber-500/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-400"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-slate-400 mb-1">Proposed Amount ({currency})</label>
          <input
            type="number"
            value={formData.proposedAmount}
            onChange={(e) => setFormData({ ...formData, proposedAmount: e.target.value })}
            placeholder="e.g. 100000"
            className="w-full bg-[#0d2027] border border-amber-500/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-400"
          />
        </div>

        <div>
          <label className="block text-slate-400 mb-1">Payment Preference</label>
          <select
            value={formData.paymentPreference}
            onChange={(e) => setFormData({ ...formData, paymentPreference: e.target.value })}
            className="w-full bg-[#0d2027] border border-amber-500/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-400"
          >
            <option value="INSTALLMENT">Installment Plan</option>
            <option value="CASH">Full Cash Payment</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-slate-400 mb-1">Special Requirements / Message</label>
        <textarea
          rows={3}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Include any specific unit or timeline requirements..."
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
            <span>Submitting Application...</span>
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            <span>Submit Application to Invest</span>
          </>
        )}
      </button>
    </form>
  );
}
