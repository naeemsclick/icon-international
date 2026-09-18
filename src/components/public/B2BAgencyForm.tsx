'use client';

import { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export function B2BAgencyForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    agencyName: '',
    country: 'Bangladesh',
    licenseNumber: '',
    contactPerson: '',
    phone: '',
    whatsapp: '',
    email: '',
    passengerVolume: '50',
    requiredVisaQty: '50',
    ticketingReq: true,
    hotelReq: true,
    transportReq: true,
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch('/api/b2b', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit application');

      setSuccess(`Application submitted successfully! Reference ID #${data.referenceId.slice(0, 8)}.`);
      setFormData({
        agencyName: '',
        country: 'Bangladesh',
        licenseNumber: '',
        contactPerson: '',
        phone: '',
        whatsapp: '',
        email: '',
        passengerVolume: '50',
        requiredVisaQty: '50',
        ticketingReq: true,
        hotelReq: true,
        transportReq: true,
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
          <label className="block text-slate-400 mb-1">Agency Name *</label>
          <input
            type="text"
            required
            value={formData.agencyName}
            onChange={(e) => setFormData({ ...formData, agencyName: e.target.value })}
            placeholder="e.g. Al-Mansoor Travel & Tourism"
            className="w-full bg-[#0d2027] border border-amber-500/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-400"
          />
        </div>

        <div>
          <label className="block text-slate-400 mb-1">Country *</label>
          <select
            value={formData.country}
            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
            className="w-full bg-[#0d2027] border border-amber-500/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-400"
          >
            <option value="Bangladesh">Bangladesh</option>
            <option value="Oman">Oman</option>
            <option value="Saudi Arabia">Saudi Arabia</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="India">India</option>
            <option value="Pakistan">Pakistan</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-slate-400 mb-1">Govt License / Registration No. *</label>
          <input
            type="text"
            required
            value={formData.licenseNumber}
            onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
            placeholder="e.g. AT-90827"
            className="w-full bg-[#0d2027] border border-amber-500/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-400"
          />
        </div>

        <div>
          <label className="block text-slate-400 mb-1">Contact Person Name *</label>
          <input
            type="text"
            required
            value={formData.contactPerson}
            onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
            placeholder="Managing Director / Operations Manager"
            className="w-full bg-[#0d2027] border border-amber-500/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-400"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-slate-400 mb-1">Phone Number *</label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="+880 1700 000000"
            className="w-full bg-[#0d2027] border border-amber-500/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-400"
          />
        </div>

        <div>
          <label className="block text-slate-400 mb-1">WhatsApp Number</label>
          <input
            type="tel"
            value={formData.whatsapp}
            onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
            placeholder="+880 1700 000000"
            className="w-full bg-[#0d2027] border border-amber-500/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-400"
          />
        </div>

        <div>
          <label className="block text-slate-400 mb-1">Official Email *</label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="agency@example.com"
            className="w-full bg-[#0d2027] border border-amber-500/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-400"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-slate-400 mb-1">Est. Monthly Passenger Volume</label>
          <input
            type="number"
            value={formData.passengerVolume}
            onChange={(e) => setFormData({ ...formData, passengerVolume: e.target.value })}
            placeholder="e.g. 100"
            className="w-full bg-[#0d2027] border border-amber-500/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-400"
          />
        </div>

        <div>
          <label className="block text-slate-400 mb-1">Required Visa Quota Qty</label>
          <input
            type="number"
            value={formData.requiredVisaQty}
            onChange={(e) => setFormData({ ...formData, requiredVisaQty: e.target.value })}
            placeholder="e.g. 50"
            className="w-full bg-[#0d2027] border border-amber-500/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-400"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-4 py-2 text-slate-300">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.ticketingReq}
            onChange={(e) => setFormData({ ...formData, ticketingReq: e.target.checked })}
            className="rounded bg-[#0d2027] border-amber-500/30 text-[#f6d860]"
          />
          <span>Air Ticketing</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.hotelReq}
            onChange={(e) => setFormData({ ...formData, hotelReq: e.target.checked })}
            className="rounded bg-[#0d2027] border-amber-500/30 text-[#f6d860]"
          />
          <span>Hotel Allotment</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.transportReq}
            onChange={(e) => setFormData({ ...formData, transportReq: e.target.checked })}
            className="rounded bg-[#0d2027] border-amber-500/30 text-[#f6d860]"
          />
          <span>Ground Transport</span>
        </label>
      </div>

      <div>
        <label className="block text-slate-400 mb-1">Additional Information / Requirements</label>
        <textarea
          rows={3}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="State any specific hotel star ratings or flight routes..."
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
            <span>Submitting Agency Registration...</span>
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            <span>Submit B2B Registration Application</span>
          </>
        )}
      </button>
    </form>
  );
}
