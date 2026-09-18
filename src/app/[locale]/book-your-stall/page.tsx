"use client";

import { useState } from "react";
import { Link } from "@/i18n/routing";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import {
  User,
  Building,
  Tag,
  Briefcase,
  Mail,
  MapPin,
  Globe,
  Hash,
  PhoneCall,
  MessageSquare,
  Store,
  LayoutGrid,
  Building2,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

const EXHIBITOR_CATEGORIES = [
  "Select Category",
  "Commercial Mushroom Production & Farm",
  "Cultivation Machinery & Climate Control",
  "Substrate, Compost & Bagging Equipment",
  "Spawn, Strains & Laboratory Genetics",
  "Fresh, Dried & Canned Mushrooms",
  "Deep Processing, Food Tech & Extracts",
  "Packaging, Cold Chain & Logistics",
  "Casing Soil, Peat Moss & Fertilizers",
  "Government, Trade & Academic Research",
  "Other Related Industry",
];

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PIN_REGEX = /^\d{6}$/;

export default function BookYourStallPage() {
  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    exhibitorCategory: "",
    position: "",
    email: "",
    phone: "",
    address: "",
    country: "India",
    city: "",
    pinCode: "",
    contactPreference: "Email",
    requiredStallSpace: "12 – 15 sq. m.",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const validateField = (field: string, value: string): string => {
    switch (field) {
      case "name":
        if (!value.trim()) return "Full name is required.";
        if (value.trim().length < 2) return "Name must be at least 2 characters.";
        return "";
      case "companyName":
        if (!value.trim()) return "Company or farm name is required.";
        if (value.trim().length < 2) return "Company name must be at least 2 characters.";
        return "";
      case "exhibitorCategory":
        if (!value || value === "Select Category") return "Please select an exhibitor category.";
        return "";
      case "position":
        if (!value.trim()) return "Position / designation is required.";
        if (value.trim().length < 2) return "Position must be at least 2 characters.";
        return "";
      case "email":
        if (!value.trim()) return "Email address is required.";
        if (!EMAIL_REGEX.test(value.trim())) return "Please enter a valid email address.";
        return "";
      case "phone": {
        const cleaned = value.replace(/\D/g, "");
        if (!value.trim()) return "Phone number is required.";
        if (cleaned.length < 10) return "Please enter a valid 10-digit phone number.";
        return "";
      }
      case "address":
        if (!value.trim()) return "Address is required.";
        if (value.trim().length < 3) return "Please enter a complete address.";
        return "";
      case "city":
        if (!value.trim()) return "City is required.";
        if (value.trim().length < 2) return "City must be at least 2 characters.";
        return "";
      case "pinCode":
        if (!value.trim()) return "PIN code is required.";
        if (!PIN_REGEX.test(value.trim())) return "PIN code must be a 6-digit number.";
        return "";
      default:
        return "";
    }
  };

  const handleChange = (field: string, value: string) => {
    let finalVal = value;
    if (field === "phone") {
      finalVal = value.replace(/\D/g, "").slice(0, 10);
    } else if (field === "pinCode") {
      finalVal = value.replace(/\D/g, "").slice(0, 6);
    }
    setFormData((prev) => ({ ...prev, [field]: finalVal }));

    if (errors[field]) {
      const fieldError = validateField(field, finalVal);
      setErrors((prev) => {
        const updated = { ...prev };
        if (fieldError) {
          updated[field] = fieldError;
        } else {
          delete updated[field];
        }
        return updated;
      });
    }
  };

  const handleBlur = (field: string) => {
    const val = (formData as any)[field] || "";
    const fieldError = validateField(field, val);
    setErrors((prev) => {
      const updated = { ...prev };
      if (fieldError) {
        updated[field] = fieldError;
      } else {
        delete updated[field];
      }
      return updated;
    });
  };

  const validateForm = () => {
    const fieldsToValidate = [
      "name",
      "companyName",
      "exhibitorCategory",
      "position",
      "email",
      "phone",
      "address",
      "city",
      "pinCode",
    ];
    const newErrors: Record<string, string> = {};
    for (const f of fieldsToValidate) {
      const err = validateField(f, (formData as any)[f] || "");
      if (err) {
        newErrors[f] = err;
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!validateForm()) {
      setErrorMessage("Please complete all required fields highlighted in red below.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/book-stall", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit booking request. Please try again.");
      }

      setIsSuccess(true);
    } catch (err: any) {
      setErrorMessage(err.message || "An error occurred while submitting. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf9f5]">
      {/* 1. Navbar */}
      <Navbar />

      {/* 2. Editorial Hero Header with Dark Website Theme */}
      <section className="relative pt-36 sm:pt-44 pb-24 sm:pb-32 bg-[#0c140f] text-white overflow-hidden border-b border-white/10">
        {/* Ambient Radial Glows */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#ff9f43]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#004aab]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#ff9f43]/20 border border-[#ff9f43]/35 text-xs font-bold text-[#ff9f43] uppercase tracking-wider mb-4 shadow-sm"
          >
            <Store className="w-3.5 h-3.5" />
            <span>Commercial Exhibition Pavilion</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight capitalize font-sans leading-[1.1]"
          >
            Book Your <br />
            <span className="font-serif italic font-normal text-amber-200 capitalize">
              Booth &amp; Pavilion
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed font-normal"
          >
            Reserve your high-visibility commercial exhibition booth at India Mushroom Days 2027 in New Delhi, India. Direct engagement with 5,000+ national delegates, progressive farm operators, and global buyers.
          </motion.p>

          {/* Quick Perks Pill Strip */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-300 font-medium"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15">
              <Sparkles className="w-3.5 h-3.5 text-[#ff9f43]" /> Prime Pavilion Positioning
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15">
              <Calendar className="w-3.5 h-3.5 text-[#004aab]" /> 3 Full Exhibition Days
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-300" /> Direct Secretariat Allotment
            </span>
          </motion.div>
        </div>
      </section>

      {/* 3. Main Form Card Area */}
      <main className="flex-1 -mt-12 sm:-mt-16 pb-20 px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl border border-gray-200/90 shadow-2xl p-6 sm:p-10 lg:p-12 transition-all">
            {isSuccess ? (
              /* Success Confirmation Card */
              <div className="py-12 text-center space-y-6">
                <div className="w-20 h-20 mx-auto bg-blue-50 text-[#004aab] rounded-3xl flex items-center justify-center border-2 border-[#004aab]/30 shadow-md">
                  <CheckCircle2 className="w-10 h-10 stroke-[2.2]" />
                </div>

                <div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-[#004aab] uppercase tracking-wider mb-2">
                    Request Logged
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-black text-gray-950 tracking-tight capitalize font-sans">
                    Booth Reservation Request Received!
                  </h2>
                </div>

                <div className="max-w-lg mx-auto p-6 rounded-2xl bg-[#faf9f5] border border-gray-200 text-left space-y-3">
                  <div className="flex justify-between items-center text-xs text-gray-500 border-b border-gray-200 pb-2">
                    <span>Exhibitor Reservation</span>
                    <span className="font-mono text-gray-950 font-bold">IMD-2027</span>
                  </div>
                  <div className="text-base font-bold text-gray-950">
                    {formData.name}
                  </div>
                  <div className="text-xs text-gray-600">
                    <span className="font-semibold text-gray-800">{formData.position}</span> • {formData.companyName}
                  </div>
                  <div className="text-xs text-gray-600 pt-1 border-t border-gray-100 flex items-center justify-between">
                    <span>Requested Space:</span>
                    <span className="font-bold text-[#ff9f43]">{formData.requiredStallSpace}</span>
                  </div>
                  <div className="text-xs text-gray-600 flex items-center justify-between">
                    <span>Preferred Communication:</span>
                    <span className="font-semibold text-gray-900">{formData.contactPreference}</span>
                  </div>
                </div>

                <p className="text-gray-600 max-w-md mx-auto text-sm leading-relaxed">
                  Thank you, <strong>{formData.name}</strong>. The exhibition allotment team will review availability and dispatch the detailed hall floor plan and rate schedule within 4–6 business hours.
                </p>

                <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={() => {
                      setIsSuccess(false);
                      setFormData({
                        name: "",
                        companyName: "",
                        exhibitorCategory: "",
                        position: "",
                        email: "",
                        phone: "",
                        address: "",
                        country: "India",
                        city: "",
                        pinCode: "",
                        contactPreference: "Email",
                        requiredStallSpace: "12 – 15 sq. m.",
                      });
                      setErrors({});
                    }}
                    className="px-6 py-3 bg-[#0c140f] hover:bg-[#ff9f43] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer"
                  >
                    Submit Another Booking
                  </button>

                  <Link
                    href="/#home"
                    className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer"
                  >
                    Return to Homepage
                  </Link>
                </div>
              </div>
            ) : (
              /* Professional Stall Booking Form */
              <form onSubmit={handleSubmit} noValidate className="space-y-8">
                {/* Header & Required Label */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-6 border-b border-gray-100">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-gray-950 tracking-tight">
                      Exhibition Space Reservation
                    </h2>
                    <p className="text-xs text-gray-500 mt-1">
                      Provide your organization and booth details to receive priority hall allocation.
                    </p>
                  </div>
                  <span className="text-xs font-bold text-[#ff9f43] bg-orange-50 border border-orange-200 px-3 py-1 rounded-full w-fit">
                    * All mandatory fields
                  </span>
                </div>

                {errorMessage && (
                  <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center gap-3 text-sm font-medium">
                    <AlertCircle className="w-5 h-5 shrink-0 text-red-600" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Block 1: Company & Contact Person Profile */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-gray-900">
                    <span className="w-5 h-5 rounded-full bg-[#0c140f] text-white flex items-center justify-center text-[10px]">
                      1
                    </span>
                    <span>Company &amp; Representative Profile</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                        Representative Full Name <span className="text-[#ff9f43]">*</span>
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5 pointer-events-none" />
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => handleChange("name", e.target.value)}
                          onBlur={() => handleBlur("name")}
                          placeholder="e.g. Ramesh Kumar"
                          className={`w-full pl-10 pr-4 py-3 bg-slate-50/80 border rounded-xl text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 ${
                            errors.name
                              ? "border-red-400 bg-red-50/30 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                              : "border-gray-200 focus:bg-white focus:border-[#0c140f] focus:ring-2 focus:ring-[#0c140f]/10"
                          }`}
                        />
                      </div>
                      {errors.name && (
                        <p className="mt-1 text-xs text-red-600 font-medium">{errors.name}</p>
                      )}
                    </div>

                    {/* Company Name */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                        Company / Organization Name <span className="text-[#ff9f43]">*</span>
                      </label>
                      <div className="relative">
                        <Building className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5 pointer-events-none" />
                        <input
                          type="text"
                          value={formData.companyName}
                          onChange={(e) => handleChange("companyName", e.target.value)}
                          onBlur={() => handleBlur("companyName")}
                          placeholder="e.g. Agrotech Climate Systems Pvt Ltd"
                          className={`w-full pl-10 pr-4 py-3 bg-slate-50/80 border rounded-xl text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 ${
                            errors.companyName
                              ? "border-red-400 bg-red-50/30 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                              : "border-gray-200 focus:bg-white focus:border-[#0c140f] focus:ring-2 focus:ring-[#0c140f]/10"
                          }`}
                        />
                      </div>
                      {errors.companyName && (
                        <p className="mt-1 text-xs text-red-600 font-medium">{errors.companyName}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Exhibitor Category */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                        Exhibitor Category <span className="text-[#ff9f43]">*</span>
                      </label>
                      <div className="relative">
                        <Tag className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5 pointer-events-none" />
                        <select
                          value={formData.exhibitorCategory}
                          onChange={(e) => handleChange("exhibitorCategory", e.target.value)}
                          onBlur={() => handleBlur("exhibitorCategory")}
                          className={`w-full pl-10 pr-3 py-3 bg-slate-50/80 border rounded-xl text-sm text-gray-900 outline-none transition-all cursor-pointer font-medium ${
                            errors.exhibitorCategory
                              ? "border-red-400 bg-red-50/30 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                              : "border-gray-200 focus:bg-white focus:border-[#0c140f] focus:ring-2 focus:ring-[#0c140f]/10"
                          }`}
                        >
                          {EXHIBITOR_CATEGORIES.map((cat) => (
                            <option key={cat} value={cat === "Select Category" ? "" : cat}>
                              {cat}
                            </option>
                          ))}
                        </select>
                      </div>
                      {errors.exhibitorCategory && (
                        <p className="mt-1 text-xs text-red-600 font-medium">{errors.exhibitorCategory}</p>
                      )}
                    </div>

                    {/* Position / Role */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                        Designation / Position <span className="text-[#ff9f43]">*</span>
                      </label>
                      <div className="relative">
                        <Briefcase className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5 pointer-events-none" />
                        <input
                          type="text"
                          value={formData.position}
                          onChange={(e) => handleChange("position", e.target.value)}
                          onBlur={() => handleBlur("position")}
                          placeholder="e.g. Sales Director / General Manager"
                          className={`w-full pl-10 pr-4 py-3 bg-slate-50/80 border rounded-xl text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 ${
                            errors.position
                              ? "border-red-400 bg-red-50/30 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                              : "border-gray-200 focus:bg-white focus:border-[#0c140f] focus:ring-2 focus:ring-[#0c140f]/10"
                          }`}
                        />
                      </div>
                      {errors.position && (
                        <p className="mt-1 text-xs text-red-600 font-medium">{errors.position}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Block 2: Location & Address */}
                <div className="space-y-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-gray-900">
                    <span className="w-5 h-5 rounded-full bg-[#0c140f] text-white flex items-center justify-center text-[10px]">
                      2
                    </span>
                    <span>Registered Business Address</span>
                  </div>

                  {/* Street Address */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Business Address <span className="text-[#ff9f43]">*</span>
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5 pointer-events-none" />
                      <input
                        type="text"
                        value={formData.address}
                        onChange={(e) => handleChange("address", e.target.value)}
                        onBlur={() => handleBlur("address")}
                        placeholder="Street, Industrial Area, Sector, Phase"
                        className={`w-full pl-10 pr-4 py-3 bg-slate-50/80 border rounded-xl text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 ${
                          errors.address
                            ? "border-red-400 bg-red-50/30 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                            : "border-gray-200 focus:bg-white focus:border-[#0c140f] focus:ring-2 focus:ring-[#0c140f]/10"
                        }`}
                      />
                    </div>
                    {errors.address && (
                      <p className="mt-1 text-xs text-red-600 font-medium">{errors.address}</p>
                    )}
                  </div>

                  {/* Country, City, PIN */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Country */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                        Country <span className="text-[#ff9f43]">*</span>
                      </label>
                      <div className="relative">
                        <Globe className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5 pointer-events-none" />
                        <select
                          value={formData.country}
                          onChange={(e) => handleChange("country", e.target.value)}
                          className="w-full pl-10 pr-3 py-3 bg-slate-50/80 border border-gray-200 rounded-xl text-sm text-gray-900 focus:bg-white focus:border-[#0c140f] focus:ring-2 focus:ring-[#0c140f]/10 outline-none transition-all cursor-pointer font-medium"
                        >
                          <option value="India">India</option>
                          <option value="Netherlands">Netherlands</option>
                          <option value="China">China</option>
                          <option value="United States">United States</option>
                          <option value="United Kingdom">United Kingdom</option>
                          <option value="Germany">Germany</option>
                          <option value="UAE">UAE</option>
                          <option value="Other">Other Country</option>
                        </select>
                      </div>
                    </div>

                    {/* City */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                        City <span className="text-[#ff9f43]">*</span>
                      </label>
                      <div className="relative">
                        <Building className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5 pointer-events-none" />
                        <input
                          type="text"
                          value={formData.city}
                          onChange={(e) => handleChange("city", e.target.value)}
                          onBlur={() => handleBlur("city")}
                          placeholder="e.g. New Delhi"
                          className={`w-full pl-10 pr-4 py-3 bg-slate-50/80 border rounded-xl text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 ${
                            errors.city
                              ? "border-red-400 bg-red-50/30 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                              : "border-gray-200 focus:bg-white focus:border-[#0c140f] focus:ring-2 focus:ring-[#0c140f]/10"
                          }`}
                        />
                      </div>
                      {errors.city && (
                        <p className="mt-1 text-xs text-red-600 font-medium">{errors.city}</p>
                      )}
                    </div>

                    {/* PIN Code */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                        PIN / Postal Code <span className="text-[#ff9f43]">*</span>
                      </label>
                      <div className="relative">
                        <Hash className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5 pointer-events-none" />
                        <input
                          type="text"
                          maxLength={6}
                          value={formData.pinCode}
                          onChange={(e) => handleChange("pinCode", e.target.value)}
                          onBlur={() => handleBlur("pinCode")}
                          placeholder="110001"
                          className={`w-full pl-10 pr-4 py-3 bg-slate-50/80 border rounded-xl text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 ${
                            errors.pinCode
                              ? "border-red-400 bg-red-50/30 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                              : "border-gray-200 focus:bg-white focus:border-[#0c140f] focus:ring-2 focus:ring-[#0c140f]/10"
                          }`}
                        />
                      </div>
                      {errors.pinCode && (
                        <p className="mt-1 text-xs text-red-600 font-medium">{errors.pinCode}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Block 3: Required Stall Space Selector */}
                <div className="space-y-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-gray-900">
                      <span className="w-5 h-5 rounded-full bg-[#0c140f] text-white flex items-center justify-center text-[10px]">
                        3
                      </span>
                      <span>Required Booth Space &amp; Scale</span>
                    </div>
                    <span className="text-[11px] font-bold text-[#ff9f43]">
                      Selected: {formData.requiredStallSpace}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                    {[
                      {
                        id: "12 – 15 sq. m.",
                        label: "12 – 15 sq. m.",
                        desc: "Standard Commercial Booth",
                        icon: Store,
                      },
                      {
                        id: "18 – 24 sq. m.",
                        label: "18 – 24 sq. m.",
                        desc: "Corner / Premium Pavilion",
                        icon: LayoutGrid,
                      },
                      {
                        id: "24+ sq. m.",
                        label: "24+ sq. m.",
                        desc: "Custom Mega Enterprise",
                        icon: Building2,
                      },
                    ].map((item) => {
                      const isSelected = formData.requiredStallSpace === item.id;
                      const Icon = item.icon;
                      return (
                        <div
                          key={item.id}
                          onClick={() => setFormData({ ...formData, requiredStallSpace: item.id })}
                          className={`cursor-pointer rounded-2xl p-4 border-2 transition-all flex flex-col justify-between ${
                            isSelected
                              ? "border-[#ff9f43] bg-orange-50/40 text-gray-950 shadow-md scale-[1.02]"
                              : "border-gray-200 hover:border-gray-300 bg-white text-gray-700"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2 mb-3">
                            <div
                              className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                                isSelected ? "bg-[#0c140f] text-[#ff9f43]" : "bg-gray-100 text-gray-500"
                              }`}
                            >
                              <Icon className="w-5 h-5" />
                            </div>
                            <span
                              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                                isSelected ? "border-[#ff9f43] bg-[#ff9f43]" : "border-gray-300 bg-white"
                              }`}
                            >
                              {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                            </span>
                          </div>

                          <div>
                            <span className="font-extrabold text-base block text-gray-950">
                              {item.label}
                            </span>
                            <span className="text-xs text-gray-500 font-medium">
                              {item.desc}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Block 4: Preferred Contact Method & Verification */}
                <div className="space-y-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-gray-900">
                      <span className="w-5 h-5 rounded-full bg-[#0c140f] text-white flex items-center justify-center text-[10px]">
                        4
                      </span>
                      <span>Secretariat Contact Preference</span>
                    </div>
                    <span className="text-[11px] font-bold text-[#ff9f43]">
                      Via {formData.contactPreference}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { id: "Email", label: "Email Consultation", icon: Mail },
                      { id: "Phone Call", label: "Phone Allotment Call", icon: PhoneCall },
                      { id: "WhatsApp", label: "WhatsApp Brochure", icon: MessageSquare },
                    ].map((item) => {
                      const isSelected = formData.contactPreference === item.id;
                      const Icon = item.icon;
                      return (
                        <div
                          key={item.id}
                          onClick={() => setFormData({ ...formData, contactPreference: item.id })}
                          className={`cursor-pointer rounded-xl px-4 py-3 border-2 transition-all flex items-center justify-between ${
                            isSelected
                              ? "border-[#0c140f] bg-slate-50 text-gray-950 shadow-xs"
                              : "border-gray-200 hover:border-gray-300 bg-white text-gray-700"
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div
                              className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                                isSelected ? "bg-[#0c140f] text-white" : "bg-gray-100 text-gray-500"
                              }`}
                            >
                              <Icon className="w-4 h-4" />
                            </div>
                            <span className="font-bold text-xs truncate">{item.label}</span>
                          </div>
                          <span
                            className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                              isSelected ? "border-[#0c140f] bg-[#0c140f]" : "border-gray-300 bg-white"
                            }`}
                          >
                            {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Direct Contact Inputs: Phone & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    {/* Phone Number */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                        Contact Phone / WhatsApp <span className="text-[#ff9f43]">*</span>
                      </label>
                      <div className="flex">
                        <span className="inline-flex items-center px-3.5 rounded-l-xl border border-r-0 border-gray-200 bg-gray-100 text-gray-700 text-sm font-bold">
                          +91
                        </span>
                        <input
                          type="tel"
                          maxLength={10}
                          value={formData.phone}
                          onChange={(e) => handleChange("phone", e.target.value)}
                          onBlur={() => handleBlur("phone")}
                          placeholder="9876543210"
                          className={`w-full px-4 py-3 bg-slate-50/80 border rounded-r-xl text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 ${
                            errors.phone
                              ? "border-red-400 bg-red-50/30 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                              : "border-gray-200 focus:bg-white focus:border-[#0c140f] focus:ring-2 focus:ring-[#0c140f]/10"
                          }`}
                        />
                      </div>
                      {errors.phone && (
                        <p className="mt-1 text-xs text-red-600 font-medium">{errors.phone}</p>
                      )}
                    </div>

                    {/* Email Address */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                        Official Business Email <span className="text-[#ff9f43]">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5 pointer-events-none" />
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleChange("email", e.target.value)}
                          onBlur={() => handleBlur("email")}
                          placeholder="representative@company.com"
                          className={`w-full pl-10 pr-4 py-3 bg-slate-50/80 border rounded-xl text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 ${
                            errors.email
                              ? "border-red-400 bg-red-50/30 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                              : "border-gray-200 focus:bg-white focus:border-[#0c140f] focus:ring-2 focus:ring-[#0c140f]/10"
                          }`}
                        />
                      </div>
                      {errors.email && (
                        <p className="mt-1 text-xs text-red-600 font-medium">{errors.email}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Submit Button & Assurance */}
                <div className="pt-6 border-t border-gray-100">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-8 rounded-xl bg-[#0c140f] hover:bg-[#ff9f43] text-white text-base font-black uppercase tracking-wider shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed group"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin text-[#ff9f43]" />
                        <span>Verifying &amp; Logging Space Request...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Booth Booking Request</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>

                  <div className="mt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-2">
                    <span className="inline-flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-[#004aab]" /> Official India Mushroom Days 2027 Secretariat
                    </span>
                    <span>Floor plan &amp; commercial schedule dispatched within 4–6 business hours</span>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>

      {/* 4. Footer */}
      <FooterSection />
    </div>
  );
}
