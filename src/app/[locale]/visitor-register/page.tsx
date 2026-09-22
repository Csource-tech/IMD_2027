"use client";

import { useState } from "react";
import { Link } from "@/i18n/routing";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import {
  Ticket,
  User,
  Briefcase,
  Building,
  MapPin,
  Globe,
  Mail,
  Hash,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Other / Outside India",
];

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PHONE_REGEX = /^[6-9]\d{9}$/;
const PIN_REGEX = /^\d{6}$/;

export default function VisitorRegisterPage() {
  const [formData, setFormData] = useState({
    title: "Mr.",
    firstName: "",
    lastName: "",
    designation: "",
    companyName: "",
    address: "",
    country: "India",
    state: "",
    city: "",
    postalCode: "",
    mobileNumber: "",
    email: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const validateField = (field: string, value: string): string => {
    switch (field) {
      case "firstName":
        if (!value.trim()) return "First name is required.";
        if (value.trim().length < 2) return "First name must be at least 2 characters.";
        return "";
      case "lastName":
        if (!value.trim()) return "Last name is required.";
        if (value.trim().length < 2) return "Last name must be at least 2 characters.";
        return "";
      case "designation":
        if (!value.trim()) return "Designation / role is required.";
        if (value.trim().length < 2) return "Designation must be at least 2 characters.";
        return "";
      case "companyName":
        if (!value.trim()) return "Company or farm name is required.";
        if (value.trim().length < 2) return "Company name must be at least 2 characters.";
        return "";
      case "state":
        if (!value) return "Please select your state.";
        return "";
      case "city":
        if (!value.trim()) return "City is required.";
        if (value.trim().length < 2) return "City must be at least 2 characters.";
        return "";
      case "mobileNumber": {
        const cleaned = value.replace(/\D/g, "");
        if (!value.trim()) return "Mobile number is required.";
        if (!PHONE_REGEX.test(cleaned)) return "Enter a valid 10-digit mobile number (e.g. 9876543210).";
        return "";
      }
      case "email":
        if (!value.trim()) return "Email address is required.";
        if (!EMAIL_REGEX.test(value.trim())) return "Please enter a valid email address.";
        return "";
      case "postalCode":
        if (value.trim() && !PIN_REGEX.test(value.trim())) return "PIN code must be 6 digits.";
        return "";
      default:
        return "";
    }
  };

  const handleChange = (field: string, value: string) => {
    let finalVal = value;
    if (field === "mobileNumber") {
      finalVal = value.replace(/\D/g, "").slice(0, 10);
    } else if (field === "postalCode") {
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
      "firstName",
      "lastName",
      "designation",
      "companyName",
      "state",
      "city",
      "mobileNumber",
      "email",
      "postalCode",
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
      const res = await fetch("/api/visitor-register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Registration failed. Please try again.");
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

      {/* 2. Priority Visitor Registration Form Area */}
      <main className="flex-1 pt-10 sm:pt-14 pb-20 px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl border border-gray-200/90 shadow-xl p-6 sm:p-10 lg:p-12 transition-all">
            {isSuccess ? (
              /* Success Confirmation Card */
              <div className="py-12 text-center space-y-6">
                <div className="w-20 h-20 mx-auto bg-blue-50 text-[#004aab] rounded-3xl flex items-center justify-center border-2 border-[#004aab]/30 shadow-md">
                  <CheckCircle2 className="w-10 h-10 stroke-[2.2]" />
                </div>

                <div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-[#004aab] uppercase tracking-wider mb-2">
                    Verified Credential
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-black text-gray-950 tracking-tight capitalize font-sans">
                    Registration Confirmed!
                  </h2>
                </div>

                <div className="max-w-lg mx-auto p-6 rounded-2xl bg-[#faf9f5] border border-gray-200 text-left space-y-3">
                  <div className="flex justify-between items-center text-xs text-gray-500 border-b border-gray-200 pb-2">
                    <span>Registered Visitor</span>
                    <span className="font-mono text-gray-950 font-bold">IMD-2027</span>
                  </div>
                  <div className="text-base font-bold text-gray-950">
                    {formData.title} {formData.firstName} {formData.lastName}
                  </div>
                  <div className="text-xs text-gray-600">
                    <span className="font-semibold text-gray-800">{formData.designation}</span> • {formData.companyName}
                  </div>
                  <div className="text-xs text-gray-600 pt-1 border-t border-gray-100 flex items-center justify-between">
                    <span>Confirmation Email:</span>
                    <span className="font-semibold text-gray-900">{formData.email}</span>
                  </div>
                </div>

                <p className="text-gray-600 max-w-md mx-auto text-sm leading-relaxed">
                  Your official pass and entry badge have been dispatched to <strong>{formData.email}</strong>. Please present this QR confirmation upon entry at the registration pavilion.
                </p>

                <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={() => {
                      setIsSuccess(false);
                      setFormData({
                        title: "Mr.",
                        firstName: "",
                        lastName: "",
                        designation: "",
                        companyName: "",
                        address: "",
                        country: "India",
                        state: "",
                        city: "",
                        postalCode: "",
                        mobileNumber: "",
                        email: "",
                      });
                      setErrors({});
                    }}
                    className="px-6 py-3 bg-[#0c140f] hover:bg-[#ff9f43] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer"
                  >
                    Register Another Visitor
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
              /* Professional Registration Form */
              <form onSubmit={handleSubmit} noValidate className="space-y-8">
                {/* Header & Required Label */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-gray-100">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-[#004aab] uppercase tracking-wider mb-2">
                      <Ticket className="w-3.5 h-3.5" />
                      <span>Complimentary Trade Pass</span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-black text-gray-950 tracking-tight">
                      Visitor Pass Registration
                    </h1>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">
                      India Mushroom Days 2027 • Complete this form to receive your instant digital entry M-Badge.
                    </p>
                  </div>
                  <span className="text-xs font-bold text-[#ff9f43] bg-orange-50 border border-orange-200 px-3.5 py-1.5 rounded-full w-fit shrink-0 self-start">
                    * All fields mandatory
                  </span>
                </div>

                {errorMessage && (
                  <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center gap-3 text-sm font-medium">
                    <AlertCircle className="w-5 h-5 shrink-0 text-red-600" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Block 1: Personal & Professional Profile */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-gray-900">
                    <span className="w-5 h-5 rounded-full bg-[#0c140f] text-white flex items-center justify-center text-[10px]">
                      1
                    </span>
                    <span>Personal &amp; Professional Profile</span>
                  </div>

                  {/* Title, First Name, Last Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                    {/* Title */}
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                        Title <span className="text-[#ff9f43]">*</span>
                      </label>
                      <select
                        value={formData.title}
                        onChange={(e) => handleChange("title", e.target.value)}
                        className="w-full px-3 py-3 bg-slate-50/80 border border-gray-200 rounded-xl text-sm text-gray-900 focus:bg-white focus:border-[#0c140f] focus:ring-2 focus:ring-[#0c140f]/10 outline-none transition-all cursor-pointer font-medium"
                      >
                        <option value="Mr.">Mr.</option>
                        <option value="Ms.">Ms.</option>
                        <option value="Mrs.">Mrs.</option>
                        <option value="Dr.">Dr.</option>
                        <option value="Prof.">Prof.</option>
                      </select>
                    </div>

                    {/* First Name */}
                    <div className="sm:col-span-5">
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                        First Name <span className="text-[#ff9f43]">*</span>
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5 pointer-events-none" />
                        <input
                          type="text"
                          value={formData.firstName}
                          onChange={(e) => handleChange("firstName", e.target.value)}
                          onBlur={() => handleBlur("firstName")}
                          placeholder="e.g. Ramesh"
                          className={`w-full pl-10 pr-4 py-3 bg-slate-50/80 border rounded-xl text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 ${errors.firstName
                              ? "border-red-400 bg-red-50/30 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                              : "border-gray-200 focus:bg-white focus:border-[#0c140f] focus:ring-2 focus:ring-[#0c140f]/10"
                            }`}
                        />
                      </div>
                      {errors.firstName && (
                        <p className="mt-1 text-xs text-red-600 font-medium">{errors.firstName}</p>
                      )}
                    </div>

                    {/* Last Name */}
                    <div className="sm:col-span-5">
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                        Last Name <span className="text-[#ff9f43]">*</span>
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5 pointer-events-none" />
                        <input
                          type="text"
                          value={formData.lastName}
                          onChange={(e) => handleChange("lastName", e.target.value)}
                          onBlur={() => handleBlur("lastName")}
                          placeholder="e.g. Patel"
                          className={`w-full pl-10 pr-4 py-3 bg-slate-50/80 border rounded-xl text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 ${errors.lastName
                              ? "border-red-400 bg-red-50/30 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                              : "border-gray-200 focus:bg-white focus:border-[#0c140f] focus:ring-2 focus:ring-[#0c140f]/10"
                            }`}
                        />
                      </div>
                      {errors.lastName && (
                        <p className="mt-1 text-xs text-red-600 font-medium">{errors.lastName}</p>
                      )}
                    </div>
                  </div>

                  {/* Designation & Company / Farm Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                        Designation / Role <span className="text-[#ff9f43]">*</span>
                      </label>
                      <div className="relative">
                        <Briefcase className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5 pointer-events-none" />
                        <input
                          type="text"
                          value={formData.designation}
                          onChange={(e) => handleChange("designation", e.target.value)}
                          onBlur={() => handleBlur("designation")}
                          placeholder="e.g. Managing Director / Farm Owner"
                          className={`w-full pl-10 pr-4 py-3 bg-slate-50/80 border rounded-xl text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 ${errors.designation
                              ? "border-red-400 bg-red-50/30 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                              : "border-gray-200 focus:bg-white focus:border-[#0c140f] focus:ring-2 focus:ring-[#0c140f]/10"
                            }`}
                        />
                      </div>
                      {errors.designation && (
                        <p className="mt-1 text-xs text-red-600 font-medium">{errors.designation}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                        Company / Organization / Farm Name <span className="text-[#ff9f43]">*</span>
                      </label>
                      <div className="relative">
                        <Building className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5 pointer-events-none" />
                        <input
                          type="text"
                          value={formData.companyName}
                          onChange={(e) => handleChange("companyName", e.target.value)}
                          onBlur={() => handleBlur("companyName")}
                          placeholder="e.g. Apex Mushroom Agro Industries"
                          className={`w-full pl-10 pr-4 py-3 bg-slate-50/80 border rounded-xl text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 ${errors.companyName
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
                </div>

                {/* Block 2: Location & Address */}
                <div className="space-y-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-gray-900">
                    <span className="w-5 h-5 rounded-full bg-[#0c140f] text-white flex items-center justify-center text-[10px]">
                      2
                    </span>
                    <span>Location &amp; Address</span>
                  </div>

                  {/* Street Address */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Street / Locality Address
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5 pointer-events-none" />
                      <input
                        type="text"
                        value={formData.address}
                        onChange={(e) => handleChange("address", e.target.value)}
                        placeholder="Street name, Sector, Industrial Area"
                        className="w-full pl-10 pr-4 py-3 bg-slate-50/80 border border-gray-200 rounded-xl text-sm text-gray-900 focus:bg-white focus:border-[#0c140f] focus:ring-2 focus:ring-[#0c140f]/10 outline-none transition-all placeholder:text-gray-400"
                      />
                    </div>
                  </div>

                  {/* Country, State, City, Postal Code */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                    {/* Country */}
                    <div className="sm:col-span-3">
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
                          <option value="United States">United States</option>
                          <option value="China">China</option>
                          <option value="United Kingdom">United Kingdom</option>
                          <option value="Germany">Germany</option>
                          <option value="UAE">UAE</option>
                          <option value="Other">Other Country</option>
                        </select>
                      </div>
                    </div>

                    {/* State */}
                    <div className="sm:col-span-3">
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                        State <span className="text-[#ff9f43]">*</span>
                      </label>
                      <select
                        value={formData.state}
                        onChange={(e) => handleChange("state", e.target.value)}
                        onBlur={() => handleBlur("state")}
                        className={`w-full px-3 py-3 bg-slate-50/80 border rounded-xl text-sm text-gray-900 outline-none transition-all cursor-pointer font-medium ${errors.state
                            ? "border-red-400 bg-red-50/30 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                            : "border-gray-200 focus:bg-white focus:border-[#0c140f] focus:ring-2 focus:ring-[#0c140f]/10"
                          }`}
                      >
                        <option value="">Select State</option>
                        {INDIAN_STATES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                      {errors.state && (
                        <p className="mt-1 text-xs text-red-600 font-medium">{errors.state}</p>
                      )}
                    </div>

                    {/* City */}
                    <div className="sm:col-span-3">
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
                          className={`w-full pl-10 pr-4 py-3 bg-slate-50/80 border rounded-xl text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 ${errors.city
                              ? "border-red-400 bg-red-50/30 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                              : "border-gray-200 focus:bg-white focus:border-[#0c140f] focus:ring-2 focus:ring-[#0c140f]/10"
                            }`}
                        />
                      </div>
                      {errors.city && (
                        <p className="mt-1 text-xs text-red-600 font-medium">{errors.city}</p>
                      )}
                    </div>

                    {/* Postal Code */}
                    <div className="sm:col-span-3">
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                        PIN Code
                      </label>
                      <div className="relative">
                        <Hash className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5 pointer-events-none" />
                        <input
                          type="text"
                          maxLength={6}
                          value={formData.postalCode}
                          onChange={(e) => handleChange("postalCode", e.target.value)}
                          onBlur={() => handleBlur("postalCode")}
                          placeholder="110001"
                          className={`w-full pl-10 pr-4 py-3 bg-slate-50/80 border rounded-xl text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 ${errors.postalCode
                              ? "border-red-400 bg-red-50/30 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                              : "border-gray-200 focus:bg-white focus:border-[#0c140f] focus:ring-2 focus:ring-[#0c140f]/10"
                            }`}
                        />
                      </div>
                      {errors.postalCode && (
                        <p className="mt-1 text-xs text-red-600 font-medium">{errors.postalCode}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Block 3: Verification & Contact Details */}
                <div className="space-y-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-gray-900">
                    <span className="w-5 h-5 rounded-full bg-[#0c140f] text-white flex items-center justify-center text-[10px]">
                      3
                    </span>
                    <span>Direct Verification &amp; Credential Delivery</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Mobile Number */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                        Mobile Number <span className="text-[#ff9f43]">*</span>
                      </label>
                      <div className="flex">
                        <span className="inline-flex items-center px-3.5 rounded-l-xl border border-r-0 border-gray-200 bg-gray-100 text-gray-700 text-sm font-bold">
                          +91
                        </span>
                        <input
                          type="tel"
                          maxLength={10}
                          value={formData.mobileNumber}
                          onChange={(e) => handleChange("mobileNumber", e.target.value)}
                          onBlur={() => handleBlur("mobileNumber")}
                          placeholder="9876543210"
                          className={`w-full px-4 py-3 bg-slate-50/80 border rounded-r-xl text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 ${errors.mobileNumber
                              ? "border-red-400 bg-red-50/30 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                              : "border-gray-200 focus:bg-white focus:border-[#0c140f] focus:ring-2 focus:ring-[#0c140f]/10"
                            }`}
                        />
                      </div>
                      {errors.mobileNumber && (
                        <p className="mt-1 text-xs text-red-600 font-medium">{errors.mobileNumber}</p>
                      )}
                    </div>

                    {/* Email Address */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                        Official Email Address <span className="text-[#ff9f43]">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5 pointer-events-none" />
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleChange("email", e.target.value)}
                          onBlur={() => handleBlur("email")}
                          placeholder="name@company.com"
                          className={`w-full pl-10 pr-4 py-3 bg-slate-50/80 border rounded-xl text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 ${errors.email
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

                {/* Submit Button & Trust Bar */}
                <div className="pt-6 border-t border-gray-100">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-8 rounded-xl bg-[#0c140f] hover:bg-[#ff9f43] text-white text-base font-black uppercase tracking-wider shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed group"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin text-[#ff9f43]" />
                        <span>Verifying &amp; Generating Pass...</span>
                      </>
                    ) : (
                      <>
                        <span>Complete Visitor Registration</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>

                  <div className="mt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-2">
                    <span className="inline-flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-[#004aab]" /> Official India Mushroom Days 2027 Secretariat
                    </span>
                    <span>Instant confirmation email with QR entry badge</span>
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
