"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  UploadCloud,
  Image as ImageIcon,
  Plus,
  MoveUp,
  MoveDown,
  Trash2,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Sparkles,
  ExternalLink,
  Eye,
  EyeOff,
  Save,
  RotateCcw,
  Building2,
  Newspaper,
  Mic,
  Award,
} from "lucide-react";
import {
  SectionsCmsData,
  ExhibitorItem,
  MediaPartnerItem,
  SpeakerItem,
  SponsorItem,
  DEFAULT_SECTIONS_CMS_DATA,
} from "@/lib/sectionsCmsTypes";

type SectionTab = "exhibitors" | "mediaPartners" | "lineup" | "sponsors";

export default function SectionsCmsManager() {
  const [data, setData] = useState<SectionsCmsData>(DEFAULT_SECTIONS_CMS_DATA);
  const [activeTab, setActiveTab] = useState<SectionTab>("exhibitors");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isCloudinaryConfigured, setIsCloudinaryConfigured] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error" | "info";
    text: string;
  } | null>(null);

  // New item modal or inline add forms
  const [newExhibitor, setNewExhibitor] = useState({ name: "", logo: "", category: "" });
  const [newMedia, setNewMedia] = useState({
    name: "",
    image: "",
    website: "",
    tagline: "",
    bgColor: "#313E37",
  });
  const [newSpeaker, setNewSpeaker] = useState({
    name: "",
    role: "",
    country: "",
    countryCode: "IN",
    image: "",
  });
  const [newSponsor, setNewSponsor] = useState({
    name: "",
    category: "",
    desc: "",
    logo: "",
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadTarget, setUploadTarget] = useState<{
    section: SectionTab;
    index?: number;
    field?: string;
  } | null>(null);

  // Fetch full sections CMS data
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/admin/sections");
      if (res.ok) {
        const json = await res.json();
        if (json.data) {
          setData(json.data);
        }
        setIsCloudinaryConfigured(Boolean(json.isCloudinaryConfigured));
      }
    } catch (err) {
      console.error("Failed to load sections CMS config:", err);
      setStatusMessage({
        type: "error",
        text: "Failed to load sections CMS data from server.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Save changes
  const handleSave = async () => {
    try {
      setIsSaving(true);
      setStatusMessage(null);
      const res = await fetch("/api/admin/sections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (res.ok && json.success) {
        setData(json.data);
        setStatusMessage({
          type: "success",
          text: "All sections content updated successfully!",
        });
      } else {
        throw new Error(json.error || "Save failed");
      }
    } catch (err: any) {
      setStatusMessage({
        type: "error",
        text: err.message || "Failed to save sections changes.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Sync section or all to Cloudinary
  const handleSyncToCloudinary = async (section: "all" | SectionTab = "all") => {
    try {
      setIsSyncing(true);
      setStatusMessage({
        type: "info",
        text: `Uploading local assets in ${section === "all" ? "all sections" : section} to Cloudinary...`,
      });

      const res = await fetch("/api/admin/sections/sync-cloudinary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section }),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        if (json.data) {
          setData(json.data);
        }
        setStatusMessage({
          type: "success",
          text: json.message || "Cloudinary sync complete!",
        });
      } else {
        throw new Error(json.error || "Sync failed");
      }
    } catch (err: any) {
      setStatusMessage({
        type: "error",
        text: err.message || "Failed to sync images to Cloudinary.",
      });
    } finally {
      setIsSyncing(false);
    }
  };

  // Direct file upload to Cloudinary for new or existing items
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !uploadTarget) return;

    try {
      setIsUploading(true);
      setStatusMessage(null);

      const folderMap: Record<SectionTab, string> = {
        exhibitors: "imd2027/exhibitors",
        mediaPartners: "imd2027/media",
        lineup: "imd2027/speakers",
        sponsors: "imd2027/sponsors",
      };

      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folderMap[uploadTarget.section] || "imd2027/misc");

      const res = await fetch("/api/admin/cloudinary", {
        method: "POST",
        body: formData,
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Upload failed");
      }

      const uploadedUrl = json.url;

      // Assign to existing item or new item state
      if (uploadTarget.index !== undefined) {
        if (uploadTarget.section === "exhibitors") {
          const items = [...data.exhibitors.items];
          items[uploadTarget.index].logo = uploadedUrl;
          items[uploadTarget.index].publicId = json.publicId;
          setData({ ...data, exhibitors: { ...data.exhibitors, items } });
        } else if (uploadTarget.section === "mediaPartners") {
          const items = [...data.mediaPartners.items];
          items[uploadTarget.index].image = uploadedUrl;
          items[uploadTarget.index].publicId = json.publicId;
          setData({ ...data, mediaPartners: { ...data.mediaPartners, items } });
        } else if (uploadTarget.section === "lineup") {
          const items = [...data.lineup.items];
          items[uploadTarget.index].image = uploadedUrl;
          items[uploadTarget.index].publicId = json.publicId;
          setData({ ...data, lineup: { ...data.lineup, items } });
        } else if (uploadTarget.section === "sponsors") {
          const items = [...data.sponsors.items];
          items[uploadTarget.index].logo = uploadedUrl;
          items[uploadTarget.index].publicId = json.publicId;
          setData({ ...data, sponsors: { ...data.sponsors, items } });
        }
      } else {
        // Setting state for new item modal
        if (uploadTarget.section === "exhibitors") {
          setNewExhibitor((prev) => ({ ...prev, logo: uploadedUrl }));
        } else if (uploadTarget.section === "mediaPartners") {
          setNewMedia((prev) => ({ ...prev, image: uploadedUrl }));
        } else if (uploadTarget.section === "lineup") {
          setNewSpeaker((prev) => ({ ...prev, image: uploadedUrl }));
        } else if (uploadTarget.section === "sponsors") {
          setNewSponsor((prev) => ({ ...prev, logo: uploadedUrl }));
        }
      }

      setStatusMessage({
        type: "success",
        text: `Image uploaded to Cloudinary successfully: ${uploadedUrl}`,
      });
    } catch (err: any) {
      setStatusMessage({
        type: "error",
        text: err.message || "Failed to upload image to Cloudinary.",
      });
    } finally {
      setIsUploading(false);
      setUploadTarget(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const triggerUpload = (section: SectionTab, index?: number) => {
    setUploadTarget({ section, index });
    fileInputRef.current?.click();
  };

  // Helper re-order function
  const moveItem = (section: SectionTab, index: number, direction: "up" | "down") => {
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    if (section === "exhibitors") {
      const items = [...data.exhibitors.items];
      if (targetIdx < 0 || targetIdx >= items.length) return;
      const temp = items[index];
      items[index] = items[targetIdx];
      items[targetIdx] = temp;
      items.forEach((it, i) => (it.order = i));
      setData({ ...data, exhibitors: { ...data.exhibitors, items } });
    } else if (section === "mediaPartners") {
      const items = [...data.mediaPartners.items];
      if (targetIdx < 0 || targetIdx >= items.length) return;
      const temp = items[index];
      items[index] = items[targetIdx];
      items[targetIdx] = temp;
      items.forEach((it, i) => (it.order = i));
      setData({ ...data, mediaPartners: { ...data.mediaPartners, items } });
    } else if (section === "lineup") {
      const items = [...data.lineup.items];
      if (targetIdx < 0 || targetIdx >= items.length) return;
      const temp = items[index];
      items[index] = items[targetIdx];
      items[targetIdx] = temp;
      items.forEach((it, i) => (it.order = i));
      setData({ ...data, lineup: { ...data.lineup, items } });
    } else if (section === "sponsors") {
      const items = [...data.sponsors.items];
      if (targetIdx < 0 || targetIdx >= items.length) return;
      const temp = items[index];
      items[index] = items[targetIdx];
      items[targetIdx] = temp;
      items.forEach((it, i) => (it.order = i));
      setData({ ...data, sponsors: { ...data.sponsors, items } });
    }
  };

  // Helper toggle active
  const toggleActive = (section: SectionTab, index: number) => {
    if (section === "exhibitors") {
      const items = [...data.exhibitors.items];
      items[index].active = !items[index].active;
      setData({ ...data, exhibitors: { ...data.exhibitors, items } });
    } else if (section === "mediaPartners") {
      const items = [...data.mediaPartners.items];
      items[index].active = !items[index].active;
      setData({ ...data, mediaPartners: { ...data.mediaPartners, items } });
    } else if (section === "lineup") {
      const items = [...data.lineup.items];
      items[index].active = !items[index].active;
      setData({ ...data, lineup: { ...data.lineup, items } });
    } else if (section === "sponsors") {
      const items = [...data.sponsors.items];
      items[index].active = !items[index].active;
      setData({ ...data, sponsors: { ...data.sponsors, items } });
    }
  };

  // Helper delete item
  const deleteItem = (section: SectionTab, index: number) => {
    if (confirm("Are you sure you want to remove this item?")) {
      if (section === "exhibitors") {
        const items = data.exhibitors.items.filter((_, i) => i !== index);
        setData({ ...data, exhibitors: { ...data.exhibitors, items } });
      } else if (section === "mediaPartners") {
        const items = data.mediaPartners.items.filter((_, i) => i !== index);
        setData({ ...data, mediaPartners: { ...data.mediaPartners, items } });
      } else if (section === "lineup") {
        const items = data.lineup.items.filter((_, i) => i !== index);
        setData({ ...data, lineup: { ...data.lineup, items } });
      } else if (section === "sponsors") {
        const items = data.sponsors.items.filter((_, i) => i !== index);
        setData({ ...data, sponsors: { ...data.sponsors, items } });
      }
    }
  };

  // Add Exhibitor
  const handleAddExhibitor = () => {
    if (!newExhibitor.name.trim() || !newExhibitor.logo.trim()) {
      alert("Please provide both Exhibitor Name and Logo URL/Image");
      return;
    }
    const newItem: ExhibitorItem = {
      id: `exh-${Date.now()}`,
      name: newExhibitor.name.trim(),
      logo: newExhibitor.logo.trim(),
      category: newExhibitor.category.trim() || undefined,
      active: true,
      order: data.exhibitors.items.length,
    };
    setData({
      ...data,
      exhibitors: {
        ...data.exhibitors,
        items: [...data.exhibitors.items, newItem],
      },
    });
    setNewExhibitor({ name: "", logo: "", category: "" });
  };

  // Add Media Partner
  const handleAddMediaPartner = () => {
    if (!newMedia.name.trim() || !newMedia.image.trim()) {
      alert("Please provide both Publication Name and Cover Image");
      return;
    }
    const newItem: MediaPartnerItem = {
      id: `media-${Date.now()}`,
      name: newMedia.name.trim(),
      image: newMedia.image.trim(),
      website: newMedia.website.trim() || "https://",
      tagline: newMedia.tagline.trim() || "",
      bgColor: newMedia.bgColor || "#313E37",
      active: true,
      order: data.mediaPartners.items.length,
    };
    setData({
      ...data,
      mediaPartners: {
        ...data.mediaPartners,
        items: [...data.mediaPartners.items, newItem],
      },
    });
    setNewMedia({ name: "", image: "", website: "", tagline: "", bgColor: "#313E37" });
  };

  // Add Speaker
  const handleAddSpeaker = () => {
    if (!newSpeaker.name.trim() || !newSpeaker.image.trim()) {
      alert("Please provide Speaker Name and Portrait Image");
      return;
    }
    const newItem: SpeakerItem = {
      id: `speaker-${Date.now()}`,
      name: newSpeaker.name.trim(),
      role: newSpeaker.role.trim() || "Industry Leader",
      country: newSpeaker.country.trim().toUpperCase() || "INDIA",
      countryCode: newSpeaker.countryCode.trim().toUpperCase() || "IN",
      image: newSpeaker.image.trim(),
      active: true,
      order: data.lineup.items.length,
    };
    setData({
      ...data,
      lineup: {
        ...data.lineup,
        items: [...data.lineup.items, newItem],
      },
    });
    setNewSpeaker({ name: "", role: "", country: "", countryCode: "IN", image: "" });
  };

  // Add Sponsor
  const handleAddSponsor = () => {
    if (!newSponsor.name.trim() || !newSponsor.logo.trim()) {
      alert("Please provide Sponsor Name and Logo URL/Image");
      return;
    }
    const newItem: SponsorItem = {
      id: `sponsor-${Date.now()}`,
      name: newSponsor.name.trim(),
      category: newSponsor.category.trim() || "OFFICIAL PARTNER",
      desc: newSponsor.desc.trim() || "",
      logo: newSponsor.logo.trim(),
      active: true,
      order: data.sponsors.items.length,
    };
    setData({
      ...data,
      sponsors: {
        ...data.sponsors,
        items: [...data.sponsors.items, newItem],
      },
    });
    setNewSponsor({ name: "", category: "", desc: "", logo: "" });
  };

  // Compute Cloudinary stats
  const countCloudinary = (items: { logo?: string; image?: string }[]) =>
    items.filter((it) => (it.logo || it.image || "").includes("res.cloudinary.com")).length;

  const exhCloudinary = countCloudinary(data.exhibitors.items);
  const mediaCloudinary = countCloudinary(data.mediaPartners.items);
  const lineupCloudinary = countCloudinary(data.lineup.items);
  const sponsorsCloudinary = countCloudinary(data.sponsors.items);

  const totalCloudinary = exhCloudinary + mediaCloudinary + lineupCloudinary + sponsorsCloudinary;
  const totalItems =
    data.exhibitors.items.length +
    data.mediaPartners.items.length +
    data.lineup.items.length +
    data.sponsors.items.length;

  if (isLoading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center space-y-4">
        <RefreshCw className="w-8 h-8 text-[#ff9f43] animate-spin" />
        <p className="text-gray-500 font-medium text-sm">Loading Sections CMS configuration...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Hidden file input for direct Cloudinary uploads */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="image/*"
        className="hidden"
      />

      {/* Top Banner with Master Cloudinary Sync and Actions */}
      <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-orange-50 text-[#ff9f43] border border-orange-200">
              Multi-Section CMS
            </span>
            <span className="text-xs text-gray-500">
              Cloudinary Media:{" "}
              <strong className="text-gray-900">
                {totalCloudinary} / {totalItems} Hosted
              </strong>
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-gray-950 tracking-tight">
            Exhibitors, Media, Line-up &amp; Sponsors CMS
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Manage titles, partner logos, speaker details, and automatically upload all media to Cloudinary.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => handleSyncToCloudinary("all")}
            disabled={isSyncing || !isCloudinaryConfigured}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all cursor-pointer disabled:opacity-60"
            title="Automatically upload all local logos, speaker portraits, and partner assets to Cloudinary"
          >
            {isSyncing ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <UploadCloud className="w-4 h-4" />
            )}
            <span>1-Click Sync All to Cloudinary</span>
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0c140f] hover:bg-[#ff9f43] text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all cursor-pointer disabled:opacity-60"
          >
            {isSaving ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            <span>Save All Changes</span>
          </button>

          <button
            type="button"
            onClick={fetchData}
            className="p-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-700 transition cursor-pointer"
            title="Reload from server"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Status Alert */}
      {statusMessage && (
        <div
          className={`p-4 rounded-2xl flex items-center justify-between gap-3 text-sm font-medium border ${
            statusMessage.type === "success"
              ? "bg-emerald-50 text-emerald-800 border-emerald-200"
              : statusMessage.type === "error"
              ? "bg-red-50 text-red-800 border-red-200"
              : "bg-blue-50 text-blue-800 border-blue-200"
          }`}
        >
          <div className="flex items-center gap-2.5">
            {statusMessage.type === "success" ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            ) : statusMessage.type === "error" ? (
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
            ) : (
              <RefreshCw className="w-5 h-5 text-blue-600 animate-spin shrink-0" />
            )}
            <span>{statusMessage.text}</span>
          </div>
          <button
            onClick={() => setStatusMessage(null)}
            className="text-xs font-bold underline hover:opacity-80"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Section Switcher Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-gray-100/80 rounded-2xl border border-gray-200">
        <button
          type="button"
          onClick={() => setActiveTab("exhibitors")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition cursor-pointer ${
            activeTab === "exhibitors"
              ? "bg-white text-gray-950 shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          <Building2 className="w-4 h-4 text-[#ff9f43]" />
          <span>Exhibitors ({data.exhibitors.items.length})</span>
          <span className="text-[10px] bg-orange-100 text-orange-800 px-1.5 py-0.5 rounded-full font-mono">
            {exhCloudinary} Cloudinary
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("mediaPartners")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition cursor-pointer ${
            activeTab === "mediaPartners"
              ? "bg-white text-gray-950 shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          <Newspaper className="w-4 h-4 text-emerald-600" />
          <span>Media Partners ({data.mediaPartners.items.length})</span>
          <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded-full font-mono">
            {mediaCloudinary} Cloudinary
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("lineup")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition cursor-pointer ${
            activeTab === "lineup"
              ? "bg-white text-gray-950 shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          <Mic className="w-4 h-4 text-blue-600" />
          <span>The 2027 Line-up ({data.lineup.items.length})</span>
          <span className="text-[10px] bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded-full font-mono">
            {lineupCloudinary} Cloudinary
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("sponsors")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition cursor-pointer ${
            activeTab === "sponsors"
              ? "bg-white text-gray-950 shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          <Award className="w-4 h-4 text-amber-600" />
          <span>Partners &amp; Sponsors ({data.sponsors.items.length})</span>
          <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded-full font-mono">
            {sponsorsCloudinary} Cloudinary
          </span>
        </button>
      </div>

      {/* ======================= TAB 1: EXHIBITORS ======================= */}
      {activeTab === "exhibitors" && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-100">
              <div>
                <h3 className="text-base font-bold text-gray-900">Exhibitors Section Header</h3>
                <p className="text-xs text-gray-500">Edit the title displayed above the infinite logo marquee.</p>
              </div>
              <button
                type="button"
                onClick={() => handleSyncToCloudinary("exhibitors")}
                disabled={isSyncing}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-50 hover:bg-orange-100 text-[#ff9f43] border border-orange-200 text-xs font-bold transition cursor-pointer"
              >
                <UploadCloud className="w-3.5 h-3.5" />
                <span>Sync Exhibitor Logos to Cloudinary</span>
              </button>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Section Title
              </label>
              <input
                type="text"
                value={data.exhibitors.title}
                onChange={(e) =>
                  setData({
                    ...data,
                    exhibitors: { ...data.exhibitors, title: e.target.value },
                  })
                }
                className="w-full sm:max-w-md px-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#ff9f43]"
              />
            </div>
          </div>

          {/* Add New Exhibitor Card */}
          <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
              Add New Commercial Exhibitor
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Company / Brand Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Mycelia Solutions"
                  value={newExhibitor.name}
                  onChange={(e) => setNewExhibitor({ ...newExhibitor, name: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#ff9f43]"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Logo URL or Upload *</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="https://... or /logo.png"
                    value={newExhibitor.logo}
                    onChange={(e) => setNewExhibitor({ ...newExhibitor, logo: e.target.value })}
                    className="flex-1 px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#ff9f43]"
                  />
                  <button
                    type="button"
                    onClick={() => triggerUpload("exhibitors")}
                    className="px-3 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-xs font-semibold text-gray-700 cursor-pointer shrink-0"
                    title="Upload image directly to Cloudinary"
                  >
                    Upload
                  </button>
                </div>
              </div>
              <div className="flex items-end">
                <button
                  type="button"
                  onClick={handleAddExhibitor}
                  className="w-full flex items-center justify-center gap-1.5 px-4 py-2 bg-[#0c140f] hover:bg-[#ff9f43] text-white text-xs font-bold rounded-xl transition cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Exhibitor</span>
                </button>
              </div>
            </div>
          </div>

          {/* Exhibitors List Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.exhibitors.items.map((exhibitor, idx) => {
              const isCloudinary = exhibitor.logo?.includes("res.cloudinary.com");
              return (
                <div
                  key={exhibitor.id}
                  className={`bg-white rounded-2xl border p-4 flex flex-col justify-between transition-all ${
                    exhibitor.active ? "border-gray-200 shadow-xs" : "border-gray-200/50 opacity-60 bg-gray-50"
                  }`}
                >
                  <div className="flex items-start gap-3 mb-3">
                    {/* Logo Thumbnail */}
                    <div className="w-16 h-16 rounded-xl border border-gray-200 bg-white flex items-center justify-center p-1.5 shrink-0 overflow-hidden relative">
                      <img
                        src={exhibitor.logo}
                        alt={exhibitor.name}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          e.currentTarget.src = "/reallogo.png";
                        }}
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="text-[10px] font-mono text-gray-400">#{idx + 1}</span>
                        {isCloudinary ? (
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                            Cloudinary
                          </span>
                        ) : (
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-gray-100 text-gray-600">
                            Local Asset
                          </span>
                        )}
                      </div>
                      <input
                        type="text"
                        value={exhibitor.name}
                        onChange={(e) => {
                          const items = [...data.exhibitors.items];
                          items[idx].name = e.target.value;
                          setData({ ...data, exhibitors: { ...data.exhibitors, items } });
                        }}
                        className="w-full font-bold text-xs text-gray-900 bg-transparent border-b border-transparent focus:border-[#ff9f43] focus:outline-none"
                      />
                      <p className="text-[10px] text-gray-400 truncate mt-1" title={exhibitor.logo}>
                        {exhibitor.logo}
                      </p>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs text-gray-500">
                    <button
                      type="button"
                      onClick={() => triggerUpload("exhibitors", idx)}
                      className="text-[11px] font-semibold text-blue-600 hover:underline cursor-pointer"
                    >
                      Change Logo
                    </button>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => moveItem("exhibitors", idx, "up")}
                        disabled={idx === 0}
                        className="p-1 hover:bg-gray-100 rounded disabled:opacity-30 cursor-pointer"
                        title="Move Up"
                      >
                        <MoveUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => moveItem("exhibitors", idx, "down")}
                        disabled={idx === data.exhibitors.items.length - 1}
                        className="p-1 hover:bg-gray-100 rounded disabled:opacity-30 cursor-pointer"
                        title="Move Down"
                      >
                        <MoveDown className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleActive("exhibitors", idx)}
                        className="p-1 hover:bg-gray-100 rounded cursor-pointer"
                        title={exhibitor.active ? "Hide Exhibitor" : "Show Exhibitor"}
                      >
                        {exhibitor.active ? (
                          <Eye className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <EyeOff className="w-3.5 h-3.5 text-gray-400" />
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteItem("exhibitors", idx)}
                        className="p-1 hover:bg-red-50 text-red-600 rounded cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ======================= TAB 2: MEDIA PARTNERS ======================= */}
      {activeTab === "mediaPartners" && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-100">
              <div>
                <h3 className="text-base font-bold text-gray-900">Media Partners Header</h3>
                <p className="text-xs text-gray-500">Edit titles and subheadings for international trade publications.</p>
              </div>
              <button
                type="button"
                onClick={() => handleSyncToCloudinary("mediaPartners")}
                disabled={isSyncing}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-bold transition cursor-pointer"
              >
                <UploadCloud className="w-3.5 h-3.5" />
                <span>Sync Media to Cloudinary</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Section Title
                </label>
                <input
                  type="text"
                  value={data.mediaPartners.title}
                  onChange={(e) =>
                    setData({
                      ...data,
                      mediaPartners: { ...data.mediaPartners, title: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#ff9f43]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Section Subtitle
                </label>
                <input
                  type="text"
                  value={data.mediaPartners.subtitle}
                  onChange={(e) =>
                    setData({
                      ...data,
                      mediaPartners: { ...data.mediaPartners, subtitle: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#ff9f43]"
                />
              </div>
            </div>
          </div>

          {/* Add Media Partner */}
          <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
              Add New Media Publication
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Publication Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Mushroom Digest"
                  value={newMedia.name}
                  onChange={(e) => setNewMedia({ ...newMedia, name: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Website URL</label>
                <input
                  type="text"
                  placeholder="https://example.com"
                  value={newMedia.website}
                  onChange={(e) => setNewMedia({ ...newMedia, website: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Cover Image *</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="URL or upload"
                    value={newMedia.image}
                    onChange={(e) => setNewMedia({ ...newMedia, image: e.target.value })}
                    className="flex-1 px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl"
                  />
                  <button
                    type="button"
                    onClick={() => triggerUpload("mediaPartners")}
                    className="px-2.5 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-xs font-semibold cursor-pointer"
                  >
                    Upload
                  </button>
                </div>
              </div>
              <div className="flex items-end">
                <button
                  type="button"
                  onClick={handleAddMediaPartner}
                  className="w-full flex items-center justify-center gap-1.5 px-4 py-2 bg-[#0c140f] hover:bg-[#ff9f43] text-white text-xs font-bold rounded-xl transition cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Partner</span>
                </button>
              </div>
            </div>
          </div>

          {/* Media Partners Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.mediaPartners.items.map((partner, idx) => {
              const isCloudinary = partner.image?.includes("res.cloudinary.com");
              return (
                <div
                  key={partner.id}
                  className={`bg-white rounded-3xl border p-5 flex flex-col justify-between transition-all ${
                    partner.active ? "border-gray-200 shadow-md" : "border-gray-200 opacity-60 bg-gray-50"
                  }`}
                >
                  <div className="space-y-3">
                    <div className="relative h-44 rounded-2xl overflow-hidden bg-slate-900 border border-gray-200">
                      <img
                        src={partner.image}
                        alt={partner.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "/media/image1.jpeg";
                        }}
                      />
                      <div className="absolute top-2.5 right-2.5">
                        {isCloudinary ? (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-600/90 text-white backdrop-blur-md">
                            Cloudinary
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-gray-900/80 text-white backdrop-blur-md">
                            Local
                          </span>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                        Publication Name
                      </label>
                      <input
                        type="text"
                        value={partner.name}
                        onChange={(e) => {
                          const items = [...data.mediaPartners.items];
                          items[idx].name = e.target.value;
                          setData({ ...data, mediaPartners: { ...data.mediaPartners, items } });
                        }}
                        className="w-full font-bold text-sm text-gray-950 bg-transparent border-b border-transparent focus:border-[#ff9f43] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                        Tagline / Scope
                      </label>
                      <input
                        type="text"
                        value={partner.tagline}
                        onChange={(e) => {
                          const items = [...data.mediaPartners.items];
                          items[idx].tagline = e.target.value;
                          setData({ ...data, mediaPartners: { ...data.mediaPartners, items } });
                        }}
                        className="w-full text-xs text-gray-600 bg-transparent border-b border-transparent focus:border-[#ff9f43] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                        Website Link
                      </label>
                      <input
                        type="text"
                        value={partner.website}
                        onChange={(e) => {
                          const items = [...data.mediaPartners.items];
                          items[idx].website = e.target.value;
                          setData({ ...data, mediaPartners: { ...data.mediaPartners, items } });
                        }}
                        className="w-full text-xs text-blue-600 bg-transparent border-b border-transparent focus:border-[#ff9f43] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-100 text-xs">
                    <button
                      type="button"
                      onClick={() => triggerUpload("mediaPartners", idx)}
                      className="text-xs font-semibold text-blue-600 hover:underline cursor-pointer"
                    >
                      Change Cover
                    </button>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => moveItem("mediaPartners", idx, "up")}
                        disabled={idx === 0}
                        className="p-1 hover:bg-gray-100 rounded disabled:opacity-30 cursor-pointer"
                      >
                        <MoveUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => moveItem("mediaPartners", idx, "down")}
                        disabled={idx === data.mediaPartners.items.length - 1}
                        className="p-1 hover:bg-gray-100 rounded disabled:opacity-30 cursor-pointer"
                      >
                        <MoveDown className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleActive("mediaPartners", idx)}
                        className="p-1 hover:bg-gray-100 rounded cursor-pointer"
                      >
                        {partner.active ? (
                          <Eye className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <EyeOff className="w-3.5 h-3.5 text-gray-400" />
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteItem("mediaPartners", idx)}
                        className="p-1 hover:bg-red-50 text-red-600 rounded cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ======================= TAB 3: THE 2027 LINE-UP (SPEAKERS) ======================= */}
      {activeTab === "lineup" && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-100">
              <div>
                <h3 className="text-base font-bold text-gray-900">The 2027 Line-up Header</h3>
                <p className="text-xs text-gray-500">Edit speaker panel headline and descriptive text.</p>
              </div>
              <button
                type="button"
                onClick={() => handleSyncToCloudinary("lineup")}
                disabled={isSyncing}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-bold transition cursor-pointer"
              >
                <UploadCloud className="w-3.5 h-3.5" />
                <span>Sync Speaker Photos to Cloudinary</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Section Title
                </label>
                <input
                  type="text"
                  value={data.lineup.title}
                  onChange={(e) =>
                    setData({
                      ...data,
                      lineup: { ...data.lineup, title: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#ff9f43]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Section Subtitle
                </label>
                <input
                  type="text"
                  value={data.lineup.subtitle}
                  onChange={(e) =>
                    setData({
                      ...data,
                      lineup: { ...data.lineup, subtitle: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#ff9f43]"
                />
              </div>
            </div>
          </div>

          {/* Add Speaker Card */}
          <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
              Add New Speaker to 2027 Line-up
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Speaker Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Dr. Jane Doe"
                  value={newSpeaker.name}
                  onChange={(e) => setNewSpeaker({ ...newSpeaker, name: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Role / Designation *</label>
                <input
                  type="text"
                  placeholder="e.g. Chief Mycologist"
                  value={newSpeaker.role}
                  onChange={(e) => setNewSpeaker({ ...newSpeaker, role: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Country (e.g. INDIA)</label>
                <input
                  type="text"
                  placeholder="INDIA"
                  value={newSpeaker.country}
                  onChange={(e) => setNewSpeaker({ ...newSpeaker, country: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl uppercase"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Portrait Image *</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="URL or upload"
                    value={newSpeaker.image}
                    onChange={(e) => setNewSpeaker({ ...newSpeaker, image: e.target.value })}
                    className="flex-1 px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl"
                  />
                  <button
                    type="button"
                    onClick={() => triggerUpload("lineup")}
                    className="px-2.5 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-xs font-semibold cursor-pointer"
                  >
                    Upload
                  </button>
                </div>
              </div>
              <div className="flex items-end">
                <button
                  type="button"
                  onClick={handleAddSpeaker}
                  className="w-full flex items-center justify-center gap-1.5 px-4 py-2 bg-[#0c140f] hover:bg-[#ff9f43] text-white text-xs font-bold rounded-xl transition cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Speaker</span>
                </button>
              </div>
            </div>
          </div>

          {/* Speakers Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {data.lineup.items.map((speaker, idx) => {
              const isCloudinary = speaker.image?.includes("res.cloudinary.com");
              return (
                <div
                  key={speaker.id}
                  className={`bg-white rounded-3xl border p-4 flex flex-col justify-between items-center text-center transition-all ${
                    speaker.active ? "border-gray-200 shadow-sm" : "border-gray-200 opacity-60 bg-gray-50"
                  }`}
                >
                  <div className="w-full flex flex-col items-center">
                    {/* Speaker Portrait */}
                    <div className="relative mb-3">
                      <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-200 bg-slate-100 flex items-center justify-center shadow-xs">
                        <img
                          src={speaker.image}
                          alt={speaker.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = "/organisers/placeholder.svg";
                          }}
                        />
                      </div>
                      <div className="absolute -bottom-1 -right-1">
                        {isCloudinary ? (
                          <span className="px-1.5 py-0.5 rounded text-[8px] font-bold bg-blue-600 text-white shadow-xs">
                            CDN
                          </span>
                        ) : (
                          <span className="px-1.5 py-0.5 rounded text-[8px] font-bold bg-gray-800 text-white shadow-xs">
                            Local
                          </span>
                        )}
                      </div>
                    </div>

                    <input
                      type="text"
                      value={speaker.name}
                      onChange={(e) => {
                        const items = [...data.lineup.items];
                        items[idx].name = e.target.value;
                        setData({ ...data, lineup: { ...data.lineup, items } });
                      }}
                      className="w-full text-center font-bold text-sm text-gray-950 bg-transparent border-b border-transparent focus:border-[#ff9f43] focus:outline-none mb-1"
                    />

                    <input
                      type="text"
                      value={speaker.role}
                      onChange={(e) => {
                        const items = [...data.lineup.items];
                        items[idx].role = e.target.value;
                        setData({ ...data, lineup: { ...data.lineup, items } });
                      }}
                      className="w-full text-center text-xs text-gray-500 bg-transparent border-b border-transparent focus:border-[#ff9f43] focus:outline-none mb-1"
                    />

                    <input
                      type="text"
                      value={speaker.country}
                      onChange={(e) => {
                        const items = [...data.lineup.items];
                        items[idx].country = e.target.value.toUpperCase();
                        setData({ ...data, lineup: { ...data.lineup, items } });
                      }}
                      className="text-center text-[10px] font-extrabold uppercase tracking-wider text-[#ff9f43] bg-orange-50 px-2 py-0.5 rounded-full border border-orange-200/60"
                    />
                  </div>

                  <div className="w-full flex items-center justify-between pt-3 mt-3 border-t border-gray-100 text-xs">
                    <button
                      type="button"
                      onClick={() => triggerUpload("lineup", idx)}
                      className="text-[11px] font-semibold text-blue-600 hover:underline cursor-pointer"
                    >
                      Photo
                    </button>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => moveItem("lineup", idx, "up")}
                        disabled={idx === 0}
                        className="p-1 hover:bg-gray-100 rounded disabled:opacity-30 cursor-pointer"
                      >
                        <MoveUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => moveItem("lineup", idx, "down")}
                        disabled={idx === data.lineup.items.length - 1}
                        className="p-1 hover:bg-gray-100 rounded disabled:opacity-30 cursor-pointer"
                      >
                        <MoveDown className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleActive("lineup", idx)}
                        className="p-1 hover:bg-gray-100 rounded cursor-pointer"
                      >
                        {speaker.active ? (
                          <Eye className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <EyeOff className="w-3.5 h-3.5 text-gray-400" />
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteItem("lineup", idx)}
                        className="p-1 hover:bg-red-50 text-red-600 rounded cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ======================= TAB 4: PARTNERS & SPONSORS ======================= */}
      {activeTab === "sponsors" && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-100">
              <div>
                <h3 className="text-base font-bold text-gray-900">Partners &amp; Sponsors Header</h3>
                <p className="text-xs text-gray-500">Edit headline and strategic tier descriptions.</p>
              </div>
              <button
                type="button"
                onClick={() => handleSyncToCloudinary("sponsors")}
                disabled={isSyncing}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-xs font-bold transition cursor-pointer"
              >
                <UploadCloud className="w-3.5 h-3.5" />
                <span>Sync Sponsor Logos to Cloudinary</span>
              </button>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Section Title
              </label>
              <input
                type="text"
                value={data.sponsors.title}
                onChange={(e) =>
                  setData({
                    ...data,
                    sponsors: { ...data.sponsors, title: e.target.value },
                  })
                }
                className="w-full sm:max-w-md px-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#ff9f43]"
              />
            </div>
          </div>

          {/* Add Sponsor */}
          <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
              Add New Partner / Sponsor
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Company Name *</label>
                <input
                  type="text"
                  placeholder="e.g. AgriTech Global"
                  value={newSponsor.name}
                  onChange={(e) => setNewSponsor({ ...newSponsor, name: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Category / Tier Tag</label>
                <input
                  type="text"
                  placeholder="e.g. OFFICIAL SEED PARTNER"
                  value={newSponsor.category}
                  onChange={(e) => setNewSponsor({ ...newSponsor, category: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl uppercase"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Logo *</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="URL or upload"
                    value={newSponsor.logo}
                    onChange={(e) => setNewSponsor({ ...newSponsor, logo: e.target.value })}
                    className="flex-1 px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl"
                  />
                  <button
                    type="button"
                    onClick={() => triggerUpload("sponsors")}
                    className="px-2.5 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-xs font-semibold cursor-pointer"
                  >
                    Upload
                  </button>
                </div>
              </div>
              <div className="flex items-end">
                <button
                  type="button"
                  onClick={handleAddSponsor}
                  className="w-full flex items-center justify-center gap-1.5 px-4 py-2 bg-[#0c140f] hover:bg-[#ff9f43] text-white text-xs font-bold rounded-xl transition cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Sponsor</span>
                </button>
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Short Description</label>
              <textarea
                rows={2}
                placeholder="Description of sponsor contributions and value chain role..."
                value={newSponsor.desc}
                onChange={(e) => setNewSponsor({ ...newSponsor, desc: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl"
              />
            </div>
          </div>

          {/* Sponsors Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.sponsors.items.map((sponsor, idx) => {
              const isCloudinary = sponsor.logo?.includes("res.cloudinary.com");
              return (
                <div
                  key={sponsor.id}
                  className={`bg-white rounded-3xl border p-6 flex flex-col justify-between transition-all ${
                    sponsor.active ? "border-gray-200 shadow-md" : "border-gray-200 opacity-60 bg-gray-50"
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-24 h-24 rounded-2xl border border-gray-200 bg-white p-2 flex items-center justify-center shadow-xs">
                        <img
                          src={sponsor.logo}
                          alt={sponsor.name}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            e.currentTarget.src = "/reallogo.png";
                          }}
                        />
                      </div>
                      <div className="text-right">
                        {isCloudinary ? (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                            Cloudinary Hosted
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-gray-100 text-gray-600">
                            Local Asset
                          </span>
                        )}
                      </div>
                    </div>

                    <div>
                      <input
                        type="text"
                        value={sponsor.category}
                        onChange={(e) => {
                          const items = [...data.sponsors.items];
                          items[idx].category = e.target.value.toUpperCase();
                          setData({ ...data, sponsors: { ...data.sponsors, items } });
                        }}
                        className="text-xs font-black uppercase tracking-wider text-[#ff9f43] bg-transparent border-b border-transparent focus:border-[#ff9f43] focus:outline-none w-full"
                      />
                      <input
                        type="text"
                        value={sponsor.name}
                        onChange={(e) => {
                          const items = [...data.sponsors.items];
                          items[idx].name = e.target.value;
                          setData({ ...data, sponsors: { ...data.sponsors, items } });
                        }}
                        className="text-lg font-bold text-gray-950 bg-transparent border-b border-transparent focus:border-[#ff9f43] focus:outline-none w-full mt-1"
                      />
                    </div>

                    <textarea
                      rows={3}
                      value={sponsor.desc}
                      onChange={(e) => {
                        const items = [...data.sponsors.items];
                        items[idx].desc = e.target.value;
                        setData({ ...data, sponsors: { ...data.sponsors, items } });
                      }}
                      className="w-full text-xs text-gray-600 bg-gray-50 p-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#ff9f43]"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-100 text-xs">
                    <button
                      type="button"
                      onClick={() => triggerUpload("sponsors", idx)}
                      className="text-xs font-semibold text-blue-600 hover:underline cursor-pointer"
                    >
                      Change Logo
                    </button>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => moveItem("sponsors", idx, "up")}
                        disabled={idx === 0}
                        className="p-1 hover:bg-gray-100 rounded disabled:opacity-30 cursor-pointer"
                      >
                        <MoveUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => moveItem("sponsors", idx, "down")}
                        disabled={idx === data.sponsors.items.length - 1}
                        className="p-1 hover:bg-gray-100 rounded disabled:opacity-30 cursor-pointer"
                      >
                        <MoveDown className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleActive("sponsors", idx)}
                        className="p-1 hover:bg-gray-100 rounded cursor-pointer"
                      >
                        {sponsor.active ? (
                          <Eye className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <EyeOff className="w-3.5 h-3.5 text-gray-400" />
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteItem("sponsors", idx)}
                        className="p-1 hover:bg-red-50 text-red-600 rounded cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
