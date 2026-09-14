"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Users,
  Store,
  Mail,
  Phone,
  Building,
  MapPin,
  Calendar,
  Search,
  Filter,
  Download,
  RefreshCw,
  LogOut,
  CheckCircle2,
  Clock,
  Trash2,
  Eye,
  X,
  Tag,
  Briefcase,
  Globe,
  Hash,
  ShieldCheck,
  MessageSquare,
  Sparkles,
} from "lucide-react";

interface Lead {
  id: string;
  type: "visitor" | "stall" | "contact";
  status: "New" | "Contacted" | "Approved" | "Archived";
  createdAt: string;
  data: Record<string, any>;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"all" | "visitor" | "stall" | "contact">("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Fetch leads from server
  const fetchLeads = useCallback(async () => {
    try {
      setIsRefreshing(true);
      const res = await fetch("/api/admin/leads");
      if (res.status === 401) {
        router.push("/admin");
        return;
      }
      const data = await res.json();
      if (data.leads) {
        setLeads(data.leads);
      }
    } catch (err) {
      console.error("Failed to load leads:", err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [router]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  // Handle Logout
  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      localStorage.removeItem("imd_admin_session");
      router.push("/admin");
      setTimeout(() => {
        window.location.href = "/admin";
      }, 200);
    } catch {
      router.push("/admin");
    }
  };

  // Update lead status
  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await fetch("/api/admin/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setLeads((prev) =>
          prev.map((l) => (l.id === id ? { ...l, status: newStatus as any } : l))
        );
        if (selectedLead?.id === id) {
          setSelectedLead((prev) => (prev ? { ...prev, status: newStatus as any } : null));
        }
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  // Delete lead
  const handleDeleteLead = async (id: string) => {
    if (!confirm("Are you sure you want to delete this lead?")) return;
    try {
      const res = await fetch(`/api/admin/leads?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setLeads((prev) => prev.filter((l) => l.id !== id));
        if (selectedLead?.id === id) {
          setSelectedLead(null);
        }
      }
    } catch (err) {
      console.error("Failed to delete lead:", err);
    }
  };

  // Filtered leads
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      // Type Tab filter
      if (activeTab !== "all" && lead.type !== activeTab) return false;

      // Status filter
      if (statusFilter !== "all" && lead.status !== statusFilter) return false;

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const d = lead.data;
        const searchable = [
          d.name,
          d.fullName,
          d.firstName,
          d.lastName,
          d.companyName,
          d.email,
          d.phone,
          d.mobileNumber,
          d.city,
          d.state,
          d.designation,
          d.position,
          d.exhibitorCategory,
          d.requiredStallSpace,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        if (!searchable.includes(q)) return false;
      }

      return true;
    });
  }, [leads, activeTab, statusFilter, searchQuery]);

  // Statistics
  const stats = useMemo(() => {
    return {
      total: leads.length,
      visitors: leads.filter((l) => l.type === "visitor").length,
      stalls: leads.filter((l) => l.type === "stall").length,
      contacts: leads.filter((l) => l.type === "contact").length,
      newLeads: leads.filter((l) => l.status === "New").length,
    };
  }, [leads]);

  // Export to CSV
  const handleExportCSV = () => {
    if (filteredLeads.length === 0) {
      alert("No leads available to export.");
      return;
    }

    const headers = [
      "ID",
      "Type",
      "Status",
      "Created At",
      "Name",
      "Company / Farm",
      "Designation",
      "Email",
      "Phone",
      "City",
      "State",
      "Country",
      "Stall Space",
      "Category / Topic",
      "Message / Details",
    ];

    const rows = filteredLeads.map((l) => {
      const d = l.data;
      const name = d.name || d.fullName || `${d.title || ""} ${d.firstName || ""} ${d.lastName || ""}`.trim();
      const phone = d.phone || d.mobileNumber || "";
      const role = d.designation || d.position || "";
      const space = d.requiredStallSpace || "";
      const category = d.exhibitorCategory || d.inquiryTopic || "";
      const extra = d.message || d.address || "";

      return [
        l.id,
        l.type,
        l.status,
        new Date(l.createdAt).toLocaleString("en-IN"),
        `"${name.replace(/"/g, '""')}"`,
        `"${(d.companyName || "").replace(/"/g, '""')}"`,
        `"${role.replace(/"/g, '""')}"`,
        `"${(d.email || "").replace(/"/g, '""')}"`,
        `"${phone.replace(/"/g, '""')}"`,
        `"${(d.city || "").replace(/"/g, '""')}"`,
        `"${(d.state || "").replace(/"/g, '""')}"`,
        `"${(d.country || "").replace(/"/g, '""')}"`,
        `"${space.replace(/"/g, '""')}"`,
        `"${category.replace(/"/g, '""')}"`,
        `"${extra.replace(/"/g, '""')}"`,
      ].join(",");
    });

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `IMD2027_Leads_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getLeadName = (lead: Lead) => {
    const d = lead.data;
    if (d.name) return d.name;
    if (d.fullName) return d.fullName;
    return `${d.title || ""} ${d.firstName || ""} ${d.lastName || ""}`.trim() || "Anonymous";
  };

  const getLeadPhone = (lead: Lead) => {
    return lead.data.phone || lead.data.mobileNumber || "-";
  };

  const getLeadEmail = (lead: Lead) => {
    return lead.data.email || "-";
  };

  const getLeadCompany = (lead: Lead) => {
    return lead.data.companyName || "Independent Individual";
  };

  return (
    <div className="min-h-screen bg-[#faf9f5] flex flex-col font-sans text-gray-900">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#0c140f] text-white border-b border-white/10 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#f28822] to-[#84c52c] flex items-center justify-center text-white font-black text-base shadow-sm">
                M
              </div>
              <div>
                <span className="font-extrabold text-sm sm:text-base tracking-tight block text-white leading-tight">
                  IMD 2027 Leads Center
                </span>
                <span className="text-[10px] text-gray-400 font-mono uppercase tracking-wider block">
                  Official Secretariat Admin
                </span>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Live Sync Status */}
            <button
              onClick={fetchLeads}
              disabled={isRefreshing}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs text-gray-200 transition-all cursor-pointer font-medium"
              title="Refresh leads list"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin text-[#f28822]" : ""}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            {/* Export CSV */}
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#f28822] hover:bg-[#d97416] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export CSV</span>
            </button>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-300 text-xs transition-all cursor-pointer font-medium"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* KPI Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Card 1: Total Leads */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-gray-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-1">
                Total Leads
              </span>
              <span className="text-2xl sm:text-3xl font-black text-gray-950 font-sans">
                {stats.total}
              </span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-gray-800 flex items-center justify-center shrink-0">
              <Users className="w-6 h-6" />
            </div>
          </div>

          {/* Card 2: Visitor Passes */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-gray-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#456b14] block mb-1">
                Visitor Passes
              </span>
              <span className="text-2xl sm:text-3xl font-black text-gray-950 font-sans">
                {stats.visitors}
              </span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-green-50 text-[#84c52c] flex items-center justify-center shrink-0 border border-green-100">
              <Users className="w-6 h-6" />
            </div>
          </div>

          {/* Card 3: Stall Bookings */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-gray-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#b85b06] block mb-1">
                Stall Bookings
              </span>
              <span className="text-2xl sm:text-3xl font-black text-gray-950 font-sans">
                {stats.stalls}
              </span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-orange-50 text-[#f28822] flex items-center justify-center shrink-0 border border-orange-100">
              <Store className="w-6 h-6" />
            </div>
          </div>

          {/* Card 4: New Unactioned */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-gray-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700 block mb-1">
                Pending / New
              </span>
              <span className="text-2xl sm:text-3xl font-black text-amber-600 font-sans">
                {stats.newLeads}
              </span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100">
              <Clock className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Filter & Search Bar Card */}
        <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Tabs */}
            <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold">
              <button
                onClick={() => setActiveTab("all")}
                className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeTab === "all"
                    ? "bg-white text-gray-950 shadow-xs"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                All Leads ({stats.total})
              </button>
              <button
                onClick={() => setActiveTab("visitor")}
                className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeTab === "visitor"
                    ? "bg-white text-gray-950 shadow-xs"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Visitors ({stats.visitors})
              </button>
              <button
                onClick={() => setActiveTab("stall")}
                className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeTab === "stall"
                    ? "bg-white text-gray-950 shadow-xs"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Stall Bookings ({stats.stalls})
              </button>
              <button
                onClick={() => setActiveTab("contact")}
                className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeTab === "contact"
                    ? "bg-white text-gray-950 shadow-xs"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Inquiries ({stats.contacts})
              </button>
            </div>

            {/* Search & Status Controls */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Search input */}
              <div className="relative min-w-[240px] flex-1 sm:flex-initial">
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search name, company, email..."
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:bg-white focus:border-[#0c140f] focus:outline-none transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Status filter */}
              <div className="flex items-center gap-2">
                <Filter className="w-3.5 h-3.5 text-gray-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 bg-slate-50 border border-gray-200 rounded-xl text-xs text-gray-800 font-medium focus:outline-none focus:border-[#0c140f] cursor-pointer"
                >
                  <option value="all">All Status</option>
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Approved">Approved</option>
                  <option value="Archived">Archived</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Leads Table Card */}
        <div className="rounded-2xl bg-white border border-gray-200 shadow-sm overflow-hidden">
          {isLoading ? (
            <div className="py-20 text-center text-gray-500 space-y-3">
              <RefreshCw className="w-8 h-8 mx-auto animate-spin text-[#f28822]" />
              <p className="text-sm font-medium">Loading leads from storage...</p>
            </div>
          ) : filteredLeads.length === 0 ? (
            <div className="py-20 text-center text-gray-500 space-y-3">
              <div className="w-14 h-14 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-gray-400">
                <Search className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-gray-800">No leads found</h3>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                {searchQuery || statusFilter !== "all" || activeTab !== "all"
                  ? "Try adjusting your search query or status filter to view leads."
                  : "No submissions have been recorded yet. New registrations will automatically appear here."}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-gray-200 text-gray-600 font-bold uppercase tracking-wider">
                    <th className="py-3.5 px-4">Lead Type</th>
                    <th className="py-3.5 px-4">Contact / Name</th>
                    <th className="py-3.5 px-4">Organization / Farm</th>
                    <th className="py-3.5 px-4">Contact Info</th>
                    <th className="py-3.5 px-4">Location</th>
                    <th className="py-3.5 px-4">Received On</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredLeads.map((lead) => {
                    const name = getLeadName(lead);
                    const company = getLeadCompany(lead);
                    const phone = getLeadPhone(lead);
                    const email = getLeadEmail(lead);
                    const date = new Date(lead.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    });

                    return (
                      <tr
                        key={lead.id}
                        className="hover:bg-slate-50/70 transition-colors group cursor-pointer"
                        onClick={() => setSelectedLead(lead)}
                      >
                        {/* Type Badge */}
                        <td className="py-4 px-4 whitespace-nowrap">
                          {lead.type === "visitor" && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-green-50 text-[#366810] border border-green-200">
                              <Users className="w-3 h-3" /> Visitor Pass
                            </span>
                          )}
                          {lead.type === "stall" && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-orange-50 text-[#b85b06] border border-orange-200">
                              <Store className="w-3 h-3" /> Stall Booking
                            </span>
                          )}
                          {lead.type === "contact" && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200">
                              <Mail className="w-3 h-3" /> Inquiry
                            </span>
                          )}
                        </td>

                        {/* Name & Role */}
                        <td className="py-4 px-4 font-semibold text-gray-900">
                          <div className="font-bold text-sm text-gray-950 group-hover:text-[#f28822] transition-colors">
                            {name}
                          </div>
                          <div className="text-[11px] text-gray-500 font-normal">
                            {lead.data.designation || lead.data.position || "General Visitor"}
                          </div>
                        </td>

                        {/* Company */}
                        <td className="py-4 px-4 font-medium text-gray-700 max-w-[200px] truncate">
                          <div className="truncate font-semibold">{company}</div>
                          {lead.data.requiredStallSpace && (
                            <div className="text-[11px] text-[#f28822] font-bold">
                              {lead.data.requiredStallSpace}
                            </div>
                          )}
                        </td>

                        {/* Phone & Email */}
                        <td className="py-4 px-4 whitespace-nowrap">
                          <div className="flex items-center gap-1 text-gray-900 font-mono font-medium">
                            <Phone className="w-3 h-3 text-gray-400" />
                            <a
                              href={`tel:${phone}`}
                              onClick={(e) => e.stopPropagation()}
                              className="hover:text-[#f28822] hover:underline"
                            >
                              {phone}
                            </a>
                          </div>
                          <div className="flex items-center gap-1 text-gray-500 text-[11px] mt-0.5">
                            <Mail className="w-3 h-3 text-gray-400" />
                            <a
                              href={`mailto:${email}`}
                              onClick={(e) => e.stopPropagation()}
                              className="hover:text-[#f28822] hover:underline truncate max-w-[170px]"
                            >
                              {email}
                            </a>
                          </div>
                        </td>

                        {/* Location */}
                        <td className="py-4 px-4 whitespace-nowrap text-gray-600">
                          <div>
                            {lead.data.city || "Delhi"}
                            {lead.data.state ? `, ${lead.data.state}` : ""}
                          </div>
                          <div className="text-[10px] text-gray-400 uppercase">
                            {lead.data.country || "India"}
                          </div>
                        </td>

                        {/* Date */}
                        <td className="py-4 px-4 whitespace-nowrap text-gray-500 font-mono text-[11px]">
                          {date}
                        </td>

                        {/* Status Select */}
                        <td className="py-4 px-4 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                          <select
                            value={lead.status}
                            onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wider border cursor-pointer focus:outline-none transition-all ${
                              lead.status === "New"
                                ? "bg-amber-50 text-amber-700 border-amber-200"
                                : lead.status === "Contacted"
                                ? "bg-blue-50 text-blue-700 border-blue-200"
                                : lead.status === "Approved"
                                ? "bg-green-50 text-green-700 border-green-200"
                                : "bg-gray-100 text-gray-600 border-gray-200"
                            }`}
                          >
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Approved">Approved</option>
                            <option value="Archived">Archived</option>
                          </select>
                        </td>

                        {/* Actions */}
                        <td className="py-4 px-4 whitespace-nowrap text-right" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => setSelectedLead(lead)}
                              className="p-1.5 rounded-lg bg-gray-100 hover:bg-[#0c140f] hover:text-white text-gray-600 transition-colors cursor-pointer"
                              title="View Full Details"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteLead(lead.id)}
                              className="p-1.5 rounded-lg bg-red-50 hover:bg-red-600 hover:text-white text-red-600 transition-colors cursor-pointer"
                              title="Delete Lead"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Full Lead Details Modal Drawer */}
      {selectedLead && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-3xl border border-gray-200 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto flex flex-col">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono text-gray-400 font-bold uppercase">
                    ID: {selectedLead.id}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      selectedLead.type === "visitor"
                        ? "bg-green-100 text-green-800"
                        : selectedLead.type === "stall"
                        ? "bg-orange-100 text-orange-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {selectedLead.type === "visitor"
                      ? "Visitor Pass"
                      : selectedLead.type === "stall"
                      ? "Stall Booking"
                      : "General Inquiry"}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-950">
                  {getLeadName(selectedLead)}
                </h3>
              </div>

              <button
                onClick={() => setSelectedLead(null)}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 text-sm">
              {/* Quick Status Bar */}
              <div className="p-4 rounded-2xl bg-[#faf9f5] border border-gray-200 flex items-center justify-between">
                <div>
                  <span className="text-xs text-gray-500 block">Current Status</span>
                  <span className="font-bold text-gray-900">{selectedLead.status}</span>
                </div>
                <div className="flex gap-1.5">
                  {(["New", "Contacted", "Approved", "Archived"] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => handleStatusChange(selectedLead.id, st)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        selectedLead.status === st
                          ? "bg-[#0c140f] text-white"
                          : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Data Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-0.5">
                    Company / Organization
                  </span>
                  <span className="font-semibold text-gray-900">{getLeadCompany(selectedLead)}</span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-0.5">
                    Position / Role
                  </span>
                  <span className="font-semibold text-gray-900">
                    {selectedLead.data.designation || selectedLead.data.position || "N/A"}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-0.5">
                    Phone / WhatsApp
                  </span>
                  <a
                    href={`tel:${getLeadPhone(selectedLead)}`}
                    className="font-semibold text-gray-900 hover:text-[#f28822] hover:underline font-mono"
                  >
                    {getLeadPhone(selectedLead)}
                  </a>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-0.5">
                    Email Address
                  </span>
                  <a
                    href={`mailto:${getLeadEmail(selectedLead)}`}
                    className="font-semibold text-gray-900 hover:text-[#f28822] hover:underline truncate block"
                  >
                    {getLeadEmail(selectedLead)}
                  </a>
                </div>

                {selectedLead.data.requiredStallSpace && (
                  <div className="p-3.5 rounded-xl bg-orange-50/60 border border-orange-100 sm:col-span-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#b85b06] block mb-0.5">
                      Requested Stall Space
                    </span>
                    <span className="font-extrabold text-base text-[#f28822]">
                      {selectedLead.data.requiredStallSpace}
                    </span>
                  </div>
                )}

                {selectedLead.data.exhibitorCategory && (
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 sm:col-span-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-0.5">
                      Exhibitor Category
                    </span>
                    <span className="font-semibold text-gray-900">
                      {selectedLead.data.exhibitorCategory}
                    </span>
                  </div>
                )}

                {selectedLead.data.contactPreference && (
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-0.5">
                      Preferred Contact Channel
                    </span>
                    <span className="font-semibold text-gray-900">
                      {selectedLead.data.contactPreference}
                    </span>
                  </div>
                )}

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-0.5">
                    Location / Region
                  </span>
                  <span className="font-semibold text-gray-900">
                    {selectedLead.data.city || ""}, {selectedLead.data.state || ""} ({selectedLead.data.country || "India"})
                  </span>
                </div>

                {selectedLead.data.address && (
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 sm:col-span-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-0.5">
                      Full Address &amp; Postal Code
                    </span>
                    <span className="font-normal text-gray-800">
                      {selectedLead.data.address}
                      {selectedLead.data.postalCode || selectedLead.data.pinCode
                        ? ` – PIN: ${selectedLead.data.postalCode || selectedLead.data.pinCode}`
                        : ""}
                    </span>
                  </div>
                )}

                {selectedLead.data.message && (
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 sm:col-span-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-0.5">
                      Inquiry Message
                    </span>
                    <p className="font-normal text-gray-800 leading-relaxed whitespace-pre-wrap">
                      {selectedLead.data.message}
                    </p>
                  </div>
                )}
              </div>

              {/* Direct Outreach Action Buttons */}
              <div className="pt-2 flex flex-wrap gap-3">
                <a
                  href={`tel:${getLeadPhone(selectedLead)}`}
                  className="flex-1 py-3 px-4 rounded-xl bg-[#0c140f] hover:bg-[#f28822] text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call {getLeadPhone(selectedLead)}</span>
                </a>

                <a
                  href={`mailto:${getLeadEmail(selectedLead)}`}
                  className="flex-1 py-3 px-4 rounded-xl bg-[#f28822] hover:bg-[#d97416] text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  <span>Email {getLeadEmail(selectedLead)}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
