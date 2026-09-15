"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle,
  AlertCircle,
  Loader2,
  Send,
  Mail,
  Phone,
  MapPin,
  Clock,
  ArrowRight,
} from "lucide-react";
import SectionDivider from "./SectionDivider";

const INQUIRY_TOPICS = [
  "General Inquiry",
  "Exhibition Space / Booth Booking",
  "Visitor & Buyer Registration",
  "Summit & Speaker Participation",
  "Sponsorship & Strategic Partnerships",
  "Media & Press Accreditation",
];

export default function RegisterSection() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    inquiryTopic: "General Inquiry",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.fullName || !formData.email || !formData.phone || !formData.message) {
      setErrorMessage("Please complete all required fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "An error occurred while submitting your message.");
      }

      setIsSuccess(true);
    } catch (err: any) {
      setErrorMessage(err.message || "An error occurred while dispatching your message.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-14 sm:py-20 bg-[#faf9f5] border-b border-gray-200/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-8 sm:mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black font-sans text-gray-950 tracking-tight uppercase"
          >
            Contact Secretariat
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Official Secretariat Credentials (5 Cols) */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 space-y-6"
          >
            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-950 tracking-tight uppercase font-sans">
                Official Helpdesk
              </h3>
              <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed font-normal">
                Connect directly with the India Mushroom Days 2027 secretariat for stall reservations, delegate passes, and partnerships.
              </p>
            </div>

            {/* Secretariat Contact Cards */}
            <div className="space-y-3 pt-2">
              {/* Card 1: Official Email */}
              <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm flex items-start gap-4 hover:border-[#f28822] transition-colors">
                <div className="w-11 h-11 rounded-xl bg-orange-50 text-[#f28822] flex items-center justify-center shrink-0 border border-orange-100">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-0.5">
                    Official Secretariat Inbox
                  </span>
                  <a
                    href="mailto:reachout@mushex.in"
                    className="text-base sm:text-lg font-bold text-gray-950 hover:text-[#f28822] transition-colors block truncate"
                  >
                    reachout@mushex.in
                  </a>
                  <p className="text-[11px] text-gray-500 mt-0.5">
                    Response timeline: within 4–6 business hours
                  </p>
                </div>
              </div>

              {/* Card 2: Helplines */}
              <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm flex items-start gap-4 hover:border-[#004aab] transition-colors">
                <div className="w-11 h-11 rounded-xl bg-blue-50 text-[#004aab] flex items-center justify-center shrink-0 border border-blue-100">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">
                    Summit Hotlines &amp; WhatsApp
                  </span>
                  <div className="space-y-1 text-sm sm:text-base font-bold text-gray-950">
                    <div>
                      <a href="tel:+919810726996" className="hover:text-[#f28822] transition-colors">
                        +91 98107 26996
                      </a>{" "}
                      <span className="text-[10px] font-normal text-gray-400">/ Helpline 1</span>
                    </div>
                    <div>
                      <a href="tel:+919811775443" className="hover:text-[#f28822] transition-colors">
                        +91 98117 75443
                      </a>{" "}
                      <span className="text-[10px] font-normal text-gray-400">/ Helpline 2</span>
                    </div>
                  </div>
                  <div className="mt-2 pt-2 border-t border-gray-100 flex items-center gap-1.5 text-[11px] text-gray-500">
                    <Clock className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Mon – Sat: 09:00 AM – 06:00 PM IST</span>
                  </div>
                </div>
              </div>

              {/* Card 3: Venue */}
              <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm flex items-start gap-4 hover:border-gray-900 transition-colors">
                <div className="w-11 h-11 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center shrink-0 border border-slate-200">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-0.5">
                    Summit Location
                  </span>
                  <h4 className="text-base font-bold text-gray-950">
                    New Delhi, India
                  </h4>
                  <p className="text-xs text-gray-600 mt-0.5">
                    February 19–21, 2027
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Direct Message Pavilion Form (7 Cols) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 p-8 sm:p-10 rounded-3xl bg-white border border-gray-200 shadow-xl"
          >
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-gray-100">
              <h3 className="text-xl sm:text-2xl font-black text-gray-950 tracking-tight">
                Send a Direct Inquiry
              </h3>
              <span className="text-xs font-semibold text-[#f28822]">
                * Required Fields
              </span>
            </div>

            {isSuccess ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-14 h-14 mx-auto bg-[#004aab]/15 text-[#004aab] flex items-center justify-center rounded-2xl border border-[#004aab]/30">
                  <CheckCircle className="w-7 h-7" />
                </div>
                <h4 className="text-2xl font-bold text-gray-900">
                  Inquiry Dispatched Successfully
                </h4>
                <p className="text-gray-600 max-w-md mx-auto text-sm leading-relaxed">
                  Thank you for reaching out to <strong>India Mushroom Days 2027 (IMD 2027)</strong>. Your message has been routed to <strong>reachout@mushex.in</strong> and a secretariat officer will connect within 4–6 business hours.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsSuccess(false);
                    setFormData({
                      fullName: "",
                      email: "",
                      phone: "",
                      inquiryTopic: "General Inquiry",
                      message: "",
                    });
                  }}
                  className="mt-4 px-6 py-2.5 rounded-full bg-[#0c140f] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#f28822] transition-colors cursor-pointer"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMessage && (
                  <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 flex items-center space-x-2.5 text-xs font-semibold">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Full Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                      Full Name <span className="text-[#f28822]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-gray-200 text-sm text-gray-900 focus:bg-white focus:border-[#0c140f] focus:ring-0 outline-none transition-all placeholder:text-gray-400"
                      placeholder="e.g. Dr. Rajesh Kumar"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                      Email Address <span className="text-[#f28822]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-gray-200 text-sm text-gray-900 focus:bg-white focus:border-[#0c140f] focus:ring-0 outline-none transition-all placeholder:text-gray-400"
                      placeholder="rajesh@enterprise.com"
                    />
                  </div>
                </div>

                {/* Phone & Inquiry Topic */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                      Phone / WhatsApp <span className="text-[#f28822]">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-gray-200 text-sm text-gray-900 focus:bg-white focus:border-[#0c140f] focus:ring-0 outline-none transition-all placeholder:text-gray-400"
                      placeholder="+91 98107 26996"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                      Inquiry Topic <span className="text-[#f28822]">*</span>
                    </label>
                    <select
                      value={formData.inquiryTopic}
                      onChange={(e) => setFormData({ ...formData, inquiryTopic: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-gray-200 text-sm text-gray-900 focus:bg-white focus:border-[#0c140f] focus:ring-0 outline-none transition-all cursor-pointer"
                    >
                      {INQUIRY_TOPICS.map((topic) => (
                        <option key={topic} value={topic}>
                          {topic}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message Box */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                      Detailed Message / Requirements <span className="text-[#f28822]">*</span>
                    </label>
                    <span className="text-[11px] font-medium text-gray-400">
                      {formData.message.length} / 3000
                    </span>
                  </div>
                  <textarea
                    rows={4}
                    required
                    maxLength={3000}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-gray-200 text-sm text-gray-900 focus:bg-white focus:border-[#0c140f] focus:ring-0 outline-none transition-all placeholder:text-gray-400 resize-y"
                    placeholder="Tell us about your organization, stall size preferences, or delegate inquiries..."
                  />
                </div>

                {/* Submit Action Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 rounded-2xl bg-[#0c140f] hover:bg-[#f28822] text-white font-bold text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-60 cursor-pointer shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99]"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Dispatching to Secretariat...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Inquiry &amp; Dispatch to reachout@mushex.in</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>

        {/* Center Bottom Mushroom Emblem */}
        <SectionDivider className="mt-14 sm:mt-18" />
      </div>
    </section>
  );
}
