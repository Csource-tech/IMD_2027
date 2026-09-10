"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import {
  Sparkles,
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
        if (!EMAIL_REGEX.test(value.trim())) return "Please enter a valid email address (e.g. name@example.com).";
        return "";
      case "postalCode":
        if (value.trim() && !PIN_REGEX.test(value.trim())) return "PIN code must be a 6-digit number.";
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
      setErrorMessage("Please fix the highlighted errors below before submitting.");
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
        throw new Error(data.error || "Failed to register. Please try again.");
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
              <div className="w-12 h-12 rounded-2xl bg-[#eaf7e3] text-[#34a853] flex items-center justify-center shrink-0 shadow-xs">
                <Sparkles className="w-6 h-6 stroke-[2.2]" />
              </div>

              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-950 tracking-tight">
                  Visitor Registration
                </h1>
                <p className="mt-2 text-sm sm:text-base text-gray-600 leading-relaxed">
                  Register for India Mushroom Days 2027 in Delhi, India. Instant confirmation delivered to your email.
                </p>
              </div>
            </div>

            {isSuccess ? (
              <div className="py-12 text-center space-y-4 animate-in fade-in">
                <div className="w-16 h-16 mx-auto bg-green-100 text-green-600 rounded-full flex items-center justify-center shadow-xs">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Registration Successful!
                </h3>
                <p className="text-gray-600 max-w-md mx-auto text-sm sm:text-base leading-relaxed">
                  Your registration has been confirmed for <strong>{formData.title} {formData.firstName} {formData.lastName}</strong>.
                  A confirmation email has been dispatched to <strong>{formData.email}</strong>.
                </p>
                <div className="pt-4">
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
                    className="px-6 py-2.5 bg-gray-900 hover:bg-[#f28822] text-white text-sm font-semibold rounded-full transition-colors cursor-pointer"
                  >
                    Register Another Visitor
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

                {/* Row 1: Title, First Name, Last Name, Designation */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Title *
                    </label>
                    <select
                      value={formData.title}
                      onChange={(e) => handleChange("title", e.target.value)}
                      className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-xl text-sm text-gray-900 focus:border-[#34a853] focus:ring-1 focus:ring-[#34a853] outline-none transition-all cursor-pointer"
                    >
                      <option value="Mr.">Mr.</option>
                      <option value="Ms.">Ms.</option>
                      <option value="Mrs.">Mrs.</option>
                      <option value="Dr.">Dr.</option>
                    </select>
                  </div>

                  <div className="sm:col-span-3">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      First Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => handleChange("firstName", e.target.value)}
                        onBlur={() => handleBlur("firstName")}
                        placeholder="First Name"
                        className={`w-full pl-9 pr-3 py-2.5 bg-white border rounded-xl text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 ${
                          errors.firstName
                            ? "border-red-500 bg-red-50/20 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                            : "border-gray-300 focus:border-[#34a853] focus:ring-1 focus:ring-[#34a853]"
                        }`}
                      />
                    </div>
                    {errors.firstName && (
                      <p className="mt-1 text-xs text-red-500 font-medium">{errors.firstName}</p>
                    )}
                  </div>

                  <div className="sm:col-span-3">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => handleChange("lastName", e.target.value)}
                      onBlur={() => handleBlur("lastName")}
                      placeholder="Last Name"
                      className={`w-full px-3 py-2.5 bg-white border rounded-xl text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 ${
                        errors.lastName
                          ? "border-red-500 bg-red-50/20 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                          : "border-gray-300 focus:border-[#34a853] focus:ring-1 focus:ring-[#34a853]"
                      }`}
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-xs text-red-500 font-medium">{errors.lastName}</p>
                    )}
                  </div>

                  <div className="sm:col-span-4">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Designation / Role *
                    </label>
                    <div className="relative">
                      <Briefcase className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                      <input
                        type="text"
                        value={formData.designation}
                        onChange={(e) => handleChange("designation", e.target.value)}
                        onBlur={() => handleBlur("designation")}
                        placeholder="e.g. Farm Owner / Manager"
                        className={`w-full pl-9 pr-3 py-2.5 bg-white border rounded-xl text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 ${
                          errors.designation
                            ? "border-red-500 bg-red-50/20 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                            : "border-gray-300 focus:border-[#34a853] focus:ring-1 focus:ring-[#34a853]"
                        }`}
                      />
                    </div>
                    {errors.designation && (
                      <p className="mt-1 text-xs text-red-500 font-medium">{errors.designation}</p>
                    )}
                  </div>
                </div>

                {/* Row 2: Company / Farm Name & Address */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Company / Farm Name *
                    </label>
                    <div className="relative">
                      <Building className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                      <input
                        type="text"
                        value={formData.companyName}
                        onChange={(e) => handleChange("companyName", e.target.value)}
                        onBlur={() => handleBlur("companyName")}
                        placeholder="Company or Farm Name"
                        className={`w-full pl-9 pr-3 py-2.5 bg-white border rounded-xl text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 ${
                          errors.companyName
                            ? "border-red-500 bg-red-50/20 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                            : "border-gray-300 focus:border-[#34a853] focus:ring-1 focus:ring-[#34a853]"
                        }`}
                      />
                    </div>
                    {errors.companyName && (
                      <p className="mt-1 text-xs text-red-500 font-medium">{errors.companyName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Address
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                      <input
                        type="text"
                        value={formData.address}
                        onChange={(e) => handleChange("address", e.target.value)}
                        placeholder="Street / Locality"
                        className="w-full pl-9 pr-3 py-2.5 bg-white border border-gray-300 rounded-xl text-sm text-gray-900 focus:border-[#34a853] focus:ring-1 focus:ring-[#34a853] outline-none transition-all placeholder:text-gray-400"
                      />
                    </div>
                  </div>
                </div>

                {/* Row 3: Country, State, City */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Country *
                    </label>
                    <div className="relative">
                      <Globe className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                      <select
                        value={formData.country}
                        onChange={(e) => handleChange("country", e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 bg-white border border-gray-300 rounded-xl text-sm text-gray-900 focus:border-[#34a853] focus:ring-1 focus:ring-[#34a853] outline-none transition-all cursor-pointer"
                      >
                        <option value="India">India</option>
                        <option value="United States">United States</option>
                        <option value="Netherlands">Netherlands</option>
                        <option value="China">China</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Germany">Germany</option>
                        <option value="UAE">UAE</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      State *
                    </label>
                    <select
                      value={formData.state}
                      onChange={(e) => handleChange("state", e.target.value)}
                      onBlur={() => handleBlur("state")}
                      className={`w-full px-3 py-2.5 bg-white border rounded-xl text-sm text-gray-900 outline-none transition-all cursor-pointer ${
                        errors.state
                          ? "border-red-500 bg-red-50/20 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                          : "border-gray-300 focus:border-[#34a853] focus:ring-1 focus:ring-[#34a853]"
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
                      <p className="mt-1 text-xs text-red-500 font-medium">{errors.state}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      City *
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
                            : "border-gray-300 focus:border-[#34a853] focus:ring-1 focus:ring-[#34a853]"
                        }`}
                      />
                    </div>
                    {errors.city && (
                      <p className="mt-1 text-xs text-red-500 font-medium">{errors.city}</p>
                    )}
                  </div>
                </div>

                {/* Row 4: Postal Code, Mobile Number, Email Address */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                  <div className="sm:col-span-3">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Postal Code
                    </label>
                    <div className="relative">
                      <Hash className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                      <input
                        type="text"
                        maxLength={6}
                        value={formData.postalCode}
                        onChange={(e) => handleChange("postalCode", e.target.value)}
                        onBlur={() => handleBlur("postalCode")}
                        placeholder="110001"
                        className={`w-full pl-9 pr-3 py-2.5 bg-white border rounded-xl text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 ${
                          errors.postalCode
                            ? "border-red-500 bg-red-50/20 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                            : "border-gray-300 focus:border-[#34a853] focus:ring-1 focus:ring-[#34a853]"
                        }`}
                      />
                    </div>
                    {errors.postalCode && (
                      <p className="mt-1 text-xs text-red-500 font-medium">{errors.postalCode}</p>
                    )}
                  </div>

                  <div className="sm:col-span-4">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Mobile Number *
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm font-semibold">
                        +91
                      </span>
                      <input
                        type="tel"
                        maxLength={10}
                        value={formData.mobileNumber}
                        onChange={(e) => handleChange("mobileNumber", e.target.value)}
                        onBlur={() => handleBlur("mobileNumber")}
                        placeholder="9876543210"
                        className={`w-full px-3 py-2.5 bg-white border rounded-r-xl text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 ${
                          errors.mobileNumber
                            ? "border-red-500 bg-red-50/20 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                            : "border-gray-300 focus:border-[#34a853] focus:ring-1 focus:ring-[#34a853]"
                        }`}
                      />
                    </div>
                    {errors.mobileNumber && (
                      <p className="mt-1 text-xs text-red-500 font-medium">{errors.mobileNumber}</p>
                    )}
                  </div>

                  <div className="sm:col-span-5">
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
                        placeholder="name@example.com"
                        className={`w-full pl-9 pr-3 py-2.5 bg-white border rounded-xl text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 ${
                          errors.email
                            ? "border-red-500 bg-red-50/20 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                            : "border-gray-300 focus:border-[#34a853] focus:ring-1 focus:ring-[#34a853]"
                        }`}
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-500 font-medium">{errors.email}</p>
                    )}
                  </div>
                </div>

                {/* Submit CTA */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-xl bg-[#2e7d32] hover:bg-[#1b5e20] text-white text-base font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Submitting Registration...</span>
                      </>
                    ) : (
                      <>
                        <span>Register as Visitor</span>
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                  <p className="text-center text-xs text-gray-500 mt-3">
                    Your registration confirmation will be sent directly to your registered email address.
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
