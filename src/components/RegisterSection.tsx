"use client";

import { useState } from "react";
import { CheckCircle, AlertCircle, Loader2, Send, Mail, Phone, MapPin } from "lucide-react";

const INQUIRY_TOPICS = [
  "General Inquiry",
  "Exhibition Space / Booth Booking",
  "Visitor & Buyer Registration",
  "Summit & Speaker Participation",
  "Sponsorship & Partnerships",
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
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "An error occurred while sending your message. Please try again.");
      }

      setIsSuccess(true);
    } catch (err: any) {
      setErrorMessage(err.message || "An error occurred while sending your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="register" className="relative py-16 sm:py-24 bg-[#faf9f6] border-b border-gray-300">
      {/* Target anchor for navigation */}
      <div id="contact" className="absolute -top-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Official Secretariat Contact Info (Sharp & Edgy) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-block relative">
              <span className="text-xs font-bold uppercase tracking-widest text-[#f28822]">
                Get In Touch
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-gray-950 tracking-tight mt-1">
                Official Secretariat
              </h2>
              <div className="h-1 w-16 bg-[#f28822] mt-3" />
            </div>

            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Connect directly with the organizing team for booth bookings, buyer club delegations, summit passes, and business partnerships for <strong className="text-gray-900">India Mushroom Days (IMD 2027)</strong>.
            </p>

            {/* 3 Sharp Edgy Cards */}
            <div className="space-y-4 pt-2">
              {/* Card 1: Official Secretariat Email */}
              <div className="bg-white p-5 sm:p-6 border border-gray-300 shadow-xs flex items-start gap-4 hover:border-gray-900 transition-colors">
                <div className="w-12 h-12 bg-[#fff4eb] border border-[#fedec7] flex items-center justify-center text-[#e87a1e] shrink-0">
                  <Mail className="w-5 h-5 stroke-[1.8]" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-0.5">
                    OFFICIAL SECRETARIAT EMAIL
                  </span>
                  <a
                    href="mailto:reachout@mushex.in"
                    className="text-lg sm:text-xl font-black text-gray-950 hover:text-[#f28822] transition-colors block truncate"
                  >
                    reachout@mushex.in
                  </a>
                  <p className="text-xs text-gray-500 mt-1">
                    Average response time: within 4–6 business hours
                  </p>
                </div>
              </div>

              {/* Card 2: Summit Hotlines & WhatsApp */}
              <div className="bg-white p-5 sm:p-6 border border-gray-300 shadow-xs flex items-start gap-4 hover:border-gray-900 transition-colors">
                <div className="w-12 h-12 bg-[#eff7f5] border border-[#d2ebe5] flex items-center justify-center text-[#1c6b65] shrink-0">
                  <Phone className="w-5 h-5 stroke-[1.8]" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-2">
                    SUMMIT HOTLINES &amp; WHATSAPP
                  </span>

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <a
                        href="tel:+919810726996"
                        className="text-base sm:text-lg font-black text-gray-950 hover:text-[#f28822] transition-colors"
                      >
                        +91 98107 26996
                      </a>
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-[11px] font-semibold border border-gray-200 shrink-0">
                        Helpline 1
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-2">
                      <a
                        href="tel:+919811775443"
                        className="text-base sm:text-lg font-black text-gray-950 hover:text-[#f28822] transition-colors"
                      >
                        +91 98117 75443
                      </a>
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-[11px] font-semibold border border-gray-200 shrink-0">
                        Helpline 2
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-2">
                      <a
                        href="tel:+918860115588"
                        className="text-base sm:text-lg font-black text-gray-950 hover:text-[#f28822] transition-colors"
                      >
                        +91 88601 15588
                      </a>
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-[11px] font-semibold border border-gray-200 shrink-0">
                        Helpline 3
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 my-2.5" />

                  <p className="text-xs text-gray-500">
                    Monday to Saturday: 09:00 AM – 06:00 PM IST
                  </p>
                </div>
              </div>

              {/* Card 3: Summit Venue & Secretariat */}
              <div className="bg-white p-5 sm:p-6 border border-gray-300 shadow-xs flex items-start gap-4 hover:border-gray-900 transition-colors">
                <div className="w-12 h-12 bg-[#eff7f5] border border-[#d2ebe5] flex items-center justify-center text-[#1c6b65] shrink-0">
                  <MapPin className="w-5 h-5 stroke-[1.8]" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-0.5">
                    SUMMIT VENUE &amp; SECRETARIAT
                  </span>
                  <h4 className="text-base sm:text-lg font-black text-gray-950 leading-snug">
                    India Mushroom Days (IMD 2027)
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1 font-medium leading-relaxed">
                    Pragati Maidan, Bharat Mandapam, New Delhi – 110001, India
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Send a Direct Message Form (Sharp Edges, Only Requested Fields) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 border border-gray-300 shadow-sm">
            {/* Header: Title on Left, Required Indicator on Right */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-6 mb-6 border-b border-gray-200">
              <h3 className="text-2xl sm:text-3xl font-black text-gray-950 tracking-tight">
                Send a Direct Message
              </h3>
              <span className="text-xs font-semibold text-red-500">
                * Required fields
              </span>
            </div>

            {isSuccess ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-14 h-14 mx-auto bg-green-100 text-green-700 flex items-center justify-center border border-green-300">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-bold text-gray-900">
                  Message Dispatched!
                </h4>
                <p className="text-gray-600 max-w-md mx-auto text-sm leading-relaxed">
                  Thank you for reaching out to <strong>India Mushroom Days (IMD 2027)</strong>. Your inquiry has been sent directly to <strong>reachout@mushex.in</strong> and our team will respond within 4–6 business hours.
                </p>
                <button
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
                  className="mt-4 px-8 py-3 bg-gray-900 text-white text-sm font-bold uppercase tracking-wider hover:bg-[#f28822] transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {errorMessage && (
                  <div className="p-4 bg-red-50 border border-red-300 text-red-700 flex items-center space-x-3 text-sm">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Row 1: Full Name & Email Address */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-black tracking-wider uppercase text-gray-800 mb-1.5">
                      FULL NAME <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-white border border-gray-300 text-sm text-gray-900 focus:border-gray-900 focus:ring-0 outline-none transition-all placeholder:text-gray-400"
                      placeholder="e.g. Rajesh Kumar"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black tracking-wider uppercase text-gray-800 mb-1.5">
                      EMAIL ADDRESS <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-white border border-gray-300 text-sm text-gray-900 focus:border-gray-900 focus:ring-0 outline-none transition-all placeholder:text-gray-400"
                      placeholder="rajesh@example.com"
                    />
                  </div>
                </div>

                {/* Row 2: Phone / WhatsApp & Inquiry Topic */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-black tracking-wider uppercase text-gray-800 mb-1.5">
                      PHONE / WHATSAPP <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-white border border-gray-300 text-sm text-gray-900 focus:border-gray-900 focus:ring-0 outline-none transition-all placeholder:text-gray-400"
                      placeholder="+91 98107 26996"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black tracking-wider uppercase text-gray-800 mb-1.5">
                      INQUIRY TOPIC <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.inquiryTopic}
                      onChange={(e) =>
                        setFormData({ ...formData, inquiryTopic: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-white border border-gray-300 text-sm text-gray-900 focus:border-gray-900 focus:ring-0 outline-none transition-all cursor-pointer"
                    >
                      {INQUIRY_TOPICS.map((topic) => (
                        <option key={topic} value={topic}>
                          {topic}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Row 3: Your Message with Character Counter */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-black tracking-wider uppercase text-gray-800">
                      YOUR MESSAGE <span className="text-red-500">*</span>
                    </label>
                    <span className="text-[11px] font-medium text-gray-400 tracking-wider">
                      {formData.message.length} / 3000 CHARS
                    </span>
                  </div>
                  <textarea
                    rows={5}
                    required
                    maxLength={3000}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-white border border-gray-300 text-sm text-gray-900 focus:border-gray-900 focus:ring-0 outline-none transition-all placeholder:text-gray-400 resize-y"
                    placeholder="Tell us about your requirements, organization, or questions..."
                  />
                </div>

                {/* Row 4: Submit Button (Edgy, Dark Green, Sharp Lines) */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 bg-[#163e33] hover:bg-[#0f2c24] text-white font-bold text-sm tracking-wider uppercase flex items-center justify-center space-x-2 border border-transparent hover:border-black transition-all disabled:opacity-60 cursor-pointer shadow-xs"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Sending message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-1" />
                        <span>SUBMIT INQUIRY &amp; SEND EMAIL</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Note at bottom matching screenshot */}
                <p className="text-center text-xs text-gray-500 pt-2">
                  Inquiries are dispatched directly to the official inbox at{" "}
                  <strong className="text-gray-800">reachout@mushex.in</strong>.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

