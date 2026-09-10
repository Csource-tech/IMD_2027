"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import {
  User,
  Building,
  Tag,
  Briefcase,
  Mail,
  Phone,
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
} from "lucide-react";

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
        if (!value.trim()) return "Company name is required.";
        if (value.trim().length < 2) return "Company name must be at least 2 characters.";
        return "";
      case "exhibitorCategory":
        if (!value || value === "Select Category") return "Please select an exhibitor category.";
        return "";
      case "position":
        if (!value.trim()) return "Position / role is required.";
        if (value.trim().length < 2) return "Position must be at least 2 characters.";
        return "";
      case "email":
        if (!value.trim()) return "Email address is required.";
        if (!EMAIL_REGEX.test(value.trim())) return "Please enter a valid email address (e.g. name@example.com).";
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

    // Instant real-time revalidation if this field currently has an error
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
      setErrorMessage("Please fix the highlighted errors below before submitting.");
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
    <div className="min-h-screen flex flex-col bg-[#fcfbf9]">
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Card Container */}
          <div className="bg-white border border-gray-200/90 rounded-2xl shadow-sm p-6 sm:p-10 lg:p-12">
            {/* Header */}
            <div className="flex items-start gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-[#fff4eb] text-[#f28822] flex items-center justify-center shrink-0 shadow-xs">
                <Store className="w-6 h-6 stroke-[2.2]" />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-950 tracking-tight">
                    Book Your Stall
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#163e33] text-white text-xs font-bold uppercase tracking-wider shadow-xs">
                    EXHIBITOR 2027
                  </span>
                </div>
                <p className="mt-2 text-sm sm:text-base text-gray-600 leading-relaxed">
                  Reserve your prime exhibition booth space at India Mushroom Days 2027 in Delhi, India. Connect with 5,000+ national and global delegates.
                </p>
              </div>
            </div>

            {isSuccess ? (
              <div className="py-12 text-center space-y-4 animate-in fade-in">
                <div className="w-16 h-16 mx-auto bg-green-100 text-green-600 rounded-full flex items-center justify-center shadow-xs">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Stall Booking Request Received!
                </h3>
                <p className="text-gray-600 max-w-md mx-auto text-sm sm:text-base leading-relaxed">
                  Thank you, <strong>{formData.name}</strong> from <strong>{formData.companyName}</strong>.
                  Your request for a <strong>{formData.requiredStallSpace}</strong> booth has been forwarded to the stall allotment team. We will reach out within 4–6 business hours.
                </p>
                <div className="pt-4">
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
                    className="px-6 py-2.5 bg-gray-900 hover:bg-[#f28822] text-white text-sm font-semibold rounded-full transition-colors cursor-pointer"
                  >
                    Submit Another Booking
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                {errorMessage && (
                  <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center gap-3 text-sm">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Row 1: Name, Company Name, Exhibitor Category */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        onBlur={() => handleBlur("name")}
                        placeholder="E.g. Ramesh Kumar"
                        className={`w-full pl-9 pr-3 py-2.5 bg-white border rounded-xl text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 ${
                          errors.name
                            ? "border-red-500 bg-red-50/20 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                            : "border-gray-300 focus:border-[#f28822] focus:ring-1 focus:ring-[#f28822]"
                        }`}
                      />
                    </div>
                    {errors.name && (
                      <p className="mt-1 text-xs text-red-500 font-medium">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Company Name *
                    </label>
                    <div className="relative">
                      <Building className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                      <input
                        type="text"
                        value={formData.companyName}
                        onChange={(e) => handleChange("companyName", e.target.value)}
                        onBlur={() => handleBlur("companyName")}
                        placeholder="Company Ltd."
                        className={`w-full pl-9 pr-3 py-2.5 bg-white border rounded-xl text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 ${
                          errors.companyName
                            ? "border-red-500 bg-red-50/20 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                            : "border-gray-300 focus:border-[#f28822] focus:ring-1 focus:ring-[#f28822]"
                        }`}
                      />
                    </div>
                    {errors.companyName && (
                      <p className="mt-1 text-xs text-red-500 font-medium">{errors.companyName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Exhibitor Category *
                    </label>
                    <div className="relative">
                      <Tag className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                      <select
                        value={formData.exhibitorCategory}
                        onChange={(e) => handleChange("exhibitorCategory", e.target.value)}
                        onBlur={() => handleBlur("exhibitorCategory")}
                        className={`w-full pl-9 pr-3 py-2.5 bg-white border rounded-xl text-sm text-gray-900 outline-none transition-all cursor-pointer ${
                          errors.exhibitorCategory
                            ? "border-red-500 bg-red-50/20 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                            : "border-gray-300 focus:border-[#f28822] focus:ring-1 focus:ring-[#f28822]"
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
                      <p className="mt-1 text-xs text-red-500 font-medium">{errors.exhibitorCategory}</p>
                    )}
                  </div>
                </div>

                {/* Row 2: Position, Email Address, Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Position *
                    </label>
                    <div className="relative">
                      <Briefcase className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                      <input
                        type="text"
                        value={formData.position}
                        onChange={(e) => handleChange("position", e.target.value)}
                        onBlur={() => handleBlur("position")}
                        placeholder="E.g. Manager"
                        className={`w-full pl-9 pr-3 py-2.5 bg-white border rounded-xl text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 ${
                          errors.position
                            ? "border-red-500 bg-red-50/20 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                            : "border-gray-300 focus:border-[#f28822] focus:ring-1 focus:ring-[#f28822]"
                        }`}
                      />
                    </div>
                    {errors.position && (
                      <p className="mt-1 text-xs text-red-500 font-medium">{errors.position}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        onBlur={() => handleBlur("email")}
                        placeholder="ramesh@example.com"
                        className={`w-full pl-9 pr-3 py-2.5 bg-white border rounded-xl text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 ${
                          errors.email
                            ? "border-red-500 bg-red-50/20 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                            : "border-gray-300 focus:border-[#f28822] focus:ring-1 focus:ring-[#f28822]"
                        }`}
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-500 font-medium">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Phone *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                      <input
                        type="tel"
                        maxLength={10}
                        value={formData.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        onBlur={() => handleBlur("phone")}
                        placeholder="9876543210"
                        className={`w-full pl-9 pr-3 py-2.5 bg-white border rounded-xl text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 ${
                          errors.phone
                            ? "border-red-500 bg-red-50/20 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                            : "border-gray-300 focus:border-[#f28822] focus:ring-1 focus:ring-[#f28822]"
                        }`}
                      />
                    </div>
                    {errors.phone && (
                      <p className="mt-1 text-xs text-red-500 font-medium">{errors.phone}</p>
                    )}
                  </div>
                </div>

                {/* Row 3: Address, Select Country, Select City */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Address *
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                      <input
                        type="text"
                        value={formData.address}
                        onChange={(e) => handleChange("address", e.target.value)}
                        onBlur={() => handleBlur("address")}
                        placeholder="E.g. Okhla, New Delhi"
                        className={`w-full pl-9 pr-3 py-2.5 bg-white border rounded-xl text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 ${
                          errors.address
                            ? "border-red-500 bg-red-50/20 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                            : "border-gray-300 focus:border-[#f28822] focus:ring-1 focus:ring-[#f28822]"
                        }`}
                      />
                    </div>
                    {errors.address && (
                      <p className="mt-1 text-xs text-red-500 font-medium">{errors.address}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Select Country *
                    </label>
                    <div className="relative">
                      <Globe className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                      <select
                        value={formData.country}
                        onChange={(e) => handleChange("country", e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 bg-white border border-gray-300 rounded-xl text-sm text-gray-900 focus:border-[#f28822] focus:ring-1 focus:ring-[#f28822] outline-none transition-all cursor-pointer"
                      >
                        <option value="India">India</option>
                        <option value="Netherlands">Netherlands</option>
                        <option value="China">China</option>
                        <option value="United States">United States</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Germany">Germany</option>
                        <option value="UAE">UAE</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Select City *
                    </label>
                    <div className="relative">
                      <Building className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => handleChange("city", e.target.value)}
                        onBlur={() => handleBlur("city")}
                        placeholder="Enter City"
                        className={`w-full pl-9 pr-3 py-2.5 bg-white border rounded-xl text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 ${
                          errors.city
                            ? "border-red-500 bg-red-50/20 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                            : "border-gray-300 focus:border-[#f28822] focus:ring-1 focus:ring-[#f28822]"
                        }`}
                      />
                    </div>
                    {errors.city && (
                      <p className="mt-1 text-xs text-red-500 font-medium">{errors.city}</p>
                    )}
                  </div>
                </div>

                {/* Row 4: PIN Code */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      PIN Code *
                    </label>
                    <div className="relative">
                      <Hash className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                      <input
                        type="text"
                        maxLength={6}
                        value={formData.pinCode}
                        onChange={(e) => handleChange("pinCode", e.target.value)}
                        onBlur={() => handleBlur("pinCode")}
                        placeholder="110020"
                        className={`w-full pl-9 pr-3 py-2.5 bg-white border rounded-xl text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 ${
                          errors.pinCode
                            ? "border-red-500 bg-red-50/20 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                            : "border-gray-300 focus:border-[#f28822] focus:ring-1 focus:ring-[#f28822]"
                        }`}
                      />
                    </div>
                    {errors.pinCode && (
                      <p className="mt-1 text-xs text-red-500 font-medium">{errors.pinCode}</p>
                    )}
                  </div>
                </div>

                {/* Section: How do you wish to be contacted? */}
                <div className="pt-1">
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    How do you wish to be contacted? *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { id: "Email", label: "Email", icon: Mail },
                      { id: "Phone Call", label: "Phone Call", icon: PhoneCall },
                      { id: "WhatsApp", label: "WhatsApp", icon: MessageSquare },
                    ].map((item) => {
                      const isSelected = formData.contactPreference === item.id;
                      const Icon = item.icon;
                      return (
                        <div
                          key={item.id}
                          onClick={() => setFormData({ ...formData, contactPreference: item.id })}
                          className={`cursor-pointer rounded-xl px-4 py-3 border transition-all flex items-center justify-between ${
                            isSelected
                              ? "border-[#10b981] bg-[#f0fdf4] text-gray-950 ring-1 ring-[#10b981]"
                              : "border-gray-200 hover:border-gray-300 bg-white text-gray-700"
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div
                              className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                                isSelected ? "bg-[#10b981] text-white" : "bg-gray-100 text-gray-500"
                              }`}
                            >
                              <Icon className="w-4 h-4" />
                            </div>
                            <span className="font-semibold text-sm truncate">{item.label}</span>
                          </div>
                          <span
                            className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                              isSelected ? "border-[#10b981] bg-[#10b981]" : "border-gray-300 bg-white"
                            }`}
                          >
                            {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Section: Required Stall Space */}
                <div className="pt-1">
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Required Stall Space *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { id: "12 – 15 sq. m.", label: "12 – 15 sq. m.", icon: Store },
                      { id: "18 – 24 sq. m.", label: "18 – 24 sq. m.", icon: LayoutGrid },
                      { id: "24+ sq. m.", label: "24+ sq. m.", icon: Building2 },
                    ].map((item) => {
                      const isSelected = formData.requiredStallSpace === item.id;
                      const Icon = item.icon;
                      return (
                        <div
                          key={item.id}
                          onClick={() => setFormData({ ...formData, requiredStallSpace: item.id })}
                          className={`cursor-pointer rounded-xl px-4 py-3 border transition-all flex items-center justify-between ${
                            isSelected
                              ? "border-[#10b981] bg-[#f0fdf4] text-gray-950 ring-1 ring-[#10b981]"
                              : "border-gray-200 hover:border-gray-300 bg-white text-gray-700"
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div
                              className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                                isSelected ? "bg-[#10b981] text-white" : "bg-gray-100 text-gray-500"
                              }`}
                            >
                              <Icon className="w-4 h-4" />
                            </div>
                            <span className="font-semibold text-sm truncate">{item.label}</span>
                          </div>
                          <span
                            className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                              isSelected ? "border-[#10b981] bg-[#10b981]" : "border-gray-300 bg-white"
                            }`}
                          >
                            {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Submit CTA */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-xl bg-[#f28822] hover:bg-[#d97416] text-white text-base font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Submitting Stall Request...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Stall Booking Request</span>
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                  <p className="text-center text-xs text-gray-500 mt-3">
                    Our team will verify stall availability and dispatch floor plans to your designated contact method.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>

      <FooterSection />
    </div>
  );
}
