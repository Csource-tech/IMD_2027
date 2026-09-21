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
  Sliders,
  ExternalLink,
  Eye,
  EyeOff,
  Save,
  RotateCcw,
} from "lucide-react";
import { HeroCmsData, HeroImage, DEFAULT_HERO_DATA } from "@/lib/heroCmsTypes";

export default function HeroCmsManager() {
  const [heroData, setHeroData] = useState<HeroCmsData>(DEFAULT_HERO_DATA);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isCloudinaryConfigured, setIsCloudinaryConfigured] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error" | "info";
    text: string;
  } | null>(null);

  // Custom image URL input state
  const [customUrl, setCustomUrl] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch Hero CMS Data & Cloudinary Status
  const fetchHeroConfig = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/admin/hero");
      if (res.ok) {
        const json = await res.json();
        if (json.data) {
          setHeroData(json.data);
        }
        setIsCloudinaryConfigured(Boolean(json.isCloudinaryConfigured));
      }
    } catch (err) {
      console.error("Failed to load hero CMS config:", err);
      setStatusMessage({
        type: "error",
        text: "Failed to load hero CMS data from server.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHeroConfig();
  }, []);

  // Save Hero CMS Changes
  const handleSave = async () => {
    try {
      setIsSaving(true);
      setStatusMessage(null);
      const res = await fetch("/api/admin/hero", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(heroData),
      });
      const json = await res.json();
      if (res.ok && json.success) {
        setHeroData(json.data);
        setStatusMessage({
          type: "success",
          text: "Hero section content & carousel images saved successfully!",
        });
      } else {
        throw new Error(json.error || "Save failed");
      }
    } catch (err: any) {
      setStatusMessage({
        type: "error",
        text: err.message || "Failed to save hero changes.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  // 1-Click Sync Local Images to Cloudinary
  const handleSyncToCloudinary = async () => {
    try {
      setIsSyncing(true);
      setStatusMessage({
        type: "info",
        text: "Connecting to Cloudinary and migrating local carousel images...",
      });
      const res = await fetch("/api/admin/cloudinary/sync", {
        method: "POST",
      });
      const json = await res.json();
      if (res.ok && json.success) {
        await fetchHeroConfig();
        setStatusMessage({
          type: "success",
          text: json.message || "Images synced successfully to Cloudinary!",
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

  // Upload New Image via Cloudinary
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      setStatusMessage(null);

      if (!isCloudinaryConfigured) {
        // Fallback preview mode
        const reader = new FileReader();
        reader.onload = () => {
          const dataUrl = reader.result as string;
          const newImg: HeroImage = {
            id: `img-${Date.now()}`,
            url: dataUrl,
            caption: file.name,
            active: true,
            order: heroData.images.length,
          };
          setHeroData((prev) => ({
            ...prev,
            images: [...prev.images, newImg],
          }));
          setStatusMessage({
            type: "info",
            text: "Image added in preview mode. Connect Cloudinary to upload to permanent cloud storage.",
          });
        };
        reader.readAsDataURL(file);
        return;
      }

      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/cloudinary", {
        method: "POST",
        body: formData,
      });

      const json = await res.json();
      if (res.ok && json.success && json.url) {
        const newImg: HeroImage = {
          id: `cld-${Date.now()}`,
          url: json.url,
          publicId: json.publicId,
          caption: file.name,
          active: true,
          order: heroData.images.length,
        };
        setHeroData((prev) => ({
          ...prev,
          images: [...prev.images, newImg],
        }));
        setStatusMessage({
          type: "success",
          text: "Image uploaded to Cloudinary and added to carousel!",
        });
      } else {
        throw new Error(json.error || "Image upload failed");
      }
    } catch (err: any) {
      setStatusMessage({
        type: "error",
        text: err.message || "Failed to upload image.",
      });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // Add custom URL
  const handleAddCustomUrl = () => {
    if (!customUrl.trim()) return;
    const newImg: HeroImage = {
      id: `url-${Date.now()}`,
      url: customUrl.trim(),
      caption: "Custom Hero Image",
      active: true,
      order: heroData.images.length,
    };
    setHeroData((prev) => ({
      ...prev,
      images: [...prev.images, newImg],
    }));
    setCustomUrl("");
    setStatusMessage({
      type: "success",
      text: "Image URL added to hero carousel.",
    });
  };

  // Reorder images
  const moveImage = (index: number, direction: "up" | "down") => {
    const images = [...heroData.images];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= images.length) return;

    const temp = images[index];
    images[index] = images[targetIndex];
    images[targetIndex] = temp;

    // Update order values
    const reordered = images.map((img, idx) => ({ ...img, order: idx }));
    setHeroData((prev) => ({ ...prev, images: reordered }));
  };

  // Toggle image active
  const toggleImageActive = (id: string) => {
    setHeroData((prev) => ({
      ...prev,
      images: prev.images.map((img) =>
        img.id === id ? { ...img, active: !img.active } : img
      ),
    }));
  };

  // Delete image
  const deleteImage = (id: string) => {
    if (heroData.images.length <= 1) {
      alert("At least one carousel image must be retained.");
      return;
    }
    setHeroData((prev) => ({
      ...prev,
      images: prev.images.filter((img) => img.id !== id),
    }));
  };

  // Reset to default settings
  const handleReset = () => {
    if (confirm("Reset all hero texts and carousel images back to defaults?")) {
      setHeroData(DEFAULT_HERO_DATA);
      setStatusMessage({
        type: "info",
        text: "Hero section reset to initial defaults. Click 'Save Changes' to apply.",
      });
    }
  };

  const localImagesCount = heroData.images.filter(
    (img) => !img.url.includes("res.cloudinary.com")
  ).length;

  if (isLoading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center space-y-4 text-center">
        <RefreshCw className="w-8 h-8 text-[#ff9f43] animate-spin" />
        <p className="text-sm font-bold text-gray-600 font-mono uppercase tracking-wider">
          Loading Hero Section CMS...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Top Banner & Notification */}
      {statusMessage && (
        <div
          className={`p-4 rounded-2xl border flex items-center gap-3 transition-all ${
            statusMessage.type === "success"
              ? "bg-emerald-50 border-emerald-200 text-emerald-900"
              : statusMessage.type === "error"
              ? "bg-rose-50 border-rose-200 text-rose-900"
              : "bg-blue-50 border-blue-200 text-blue-900"
          }`}
        >
          {statusMessage.type === "success" ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          )}
          <span className="text-sm font-semibold">{statusMessage.text}</span>
        </div>
      )}

      {/* Cloudinary Integration Status Card */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-[#0c140f] to-[#1a2820] text-white shadow-xl border border-white/10 relative overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff9f43] animate-pulse" />
              <h3 className="text-xl font-black text-white font-sans tracking-tight">
                Cloudinary Media Storage & Sync
              </h3>
              <span
                className={`px-3 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                  isCloudinaryConfigured
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400/30"
                    : "bg-amber-500/20 text-amber-300 border border-amber-400/30"
                }`}
              >
                {isCloudinaryConfigured ? "Connected" : "Keys Missing in .env"}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-normal">
              {isCloudinaryConfigured
                ? `Cloudinary is connected. You can upload new hero images directly to your cloud CDN, or push all ${localImagesCount} current local carousel images with 1-click sync.`
                : "Add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in your .env file to enable automated cloud upload & sync. Currently using fallback storage."}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Sync Existing Images Button */}
            <button
              type="button"
              onClick={handleSyncToCloudinary}
              disabled={isSyncing || !isCloudinaryConfigured || localImagesCount === 0}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all shadow-md ${
                !isCloudinaryConfigured || localImagesCount === 0
                  ? "bg-white/10 text-gray-400 cursor-not-allowed border border-white/10"
                  : "bg-gradient-to-r from-[#ff9f43] to-[#f28822] text-white hover:scale-105 active:scale-95 cursor-pointer shadow-amber-500/20"
              }`}
              title={
                !isCloudinaryConfigured
                  ? "Connect Cloudinary keys in .env to enable sync"
                  : localImagesCount === 0
                  ? "All images are already on Cloudinary"
                  : "Upload all local images to Cloudinary now"
              }
            >
              <UploadCloud className={`w-4 h-4 ${isSyncing ? "animate-bounce" : ""}`} />
              <span>
                {isSyncing
                  ? "Pushing Images..."
                  : localImagesCount === 0
                  ? "All Images on Cloudinary"
                  : `Push ${localImagesCount} Local Images to Cloudinary`}
              </span>
            </button>

            {/* Save Button Top */}
            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-gray-950 hover:bg-gray-100 text-xs sm:text-sm font-bold tracking-wide transition-all shadow-md hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Save className={`w-4 h-4 ${isSaving ? "animate-spin text-[#ff9f43]" : ""}`} />
              <span>{isSaving ? "Saving..." : "Save Changes"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Hero Carousel Images Management */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-gray-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-5">
          <div>
            <h3 className="text-lg sm:text-xl font-black text-gray-900 font-sans tracking-tight flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-[#ff9f43]" />
              Hero Carousel Images ({heroData.images.length})
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Manage background slides, upload to Cloudinary, reorder, or toggle image visibility.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
            />

            {/* Upload Button */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#ff9f43] hover:bg-[#f28822] text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{isUploading ? "Uploading..." : "Upload New Image"}</span>
            </button>
          </div>
        </div>

        {/* Add custom URL input */}
        <div className="flex items-center gap-2 max-w-xl">
          <input
            type="url"
            value={customUrl}
            onChange={(e) => setCustomUrl(e.target.value)}
            placeholder="Paste direct image URL (https://...)"
            className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-[#ff9f43] bg-[#faf9f5]"
          />
          <button
            type="button"
            onClick={handleAddCustomUrl}
            className="px-4 py-2 rounded-xl bg-gray-900 text-white text-xs font-bold hover:bg-gray-800 transition cursor-pointer"
          >
            Add URL
          </button>
        </div>

        {/* Carousel Images Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {heroData.images.map((img, index) => {
            const isCloudinary = img.url.includes("res.cloudinary.com");
            return (
              <div
                key={img.id || index}
                className={`relative rounded-2xl border p-3 flex flex-col justify-between transition-all bg-[#faf9f5] ${
                  img.active ? "border-gray-200" : "opacity-50 border-dashed border-gray-300"
                }`}
              >
                {/* Image Preview Box */}
                <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-black/5 mb-3 border border-gray-100">
                  <Image
                    src={img.url}
                    alt={img.caption || `Carousel Slide ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover"
                  />

                  {/* Badge: Cloudinary vs Local */}
                  <div className="absolute top-2 left-2 z-10">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm ${
                        isCloudinary
                          ? "bg-emerald-500 text-white"
                          : "bg-black/60 text-white backdrop-blur-sm"
                      }`}
                    >
                      {isCloudinary ? "Cloudinary CDN" : "Local Image"}
                    </span>
                  </div>

                  {/* Order Index */}
                  <div className="absolute bottom-2 left-2 z-10">
                    <span className="px-2 py-0.5 rounded-md bg-black/75 text-white font-mono text-[10px] font-bold">
                      #{index + 1}
                    </span>
                  </div>
                </div>

                {/* Caption Input */}
                <input
                  type="text"
                  value={img.caption || ""}
                  onChange={(e) => {
                    const newImages = [...heroData.images];
                    newImages[index].caption = e.target.value;
                    setHeroData((prev) => ({ ...prev, images: newImages }));
                  }}
                  placeholder="Slide description/caption..."
                  className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-gray-200 mb-3 focus:outline-none focus:border-[#ff9f43] bg-white"
                />

                {/* Card Controls Bar */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-200/60 text-gray-600">
                  {/* Reorder Arrows */}
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => moveImage(index, "up")}
                      disabled={index === 0}
                      className="p-1 rounded-md hover:bg-gray-200 disabled:opacity-30 cursor-pointer"
                      title="Move Left/Up"
                    >
                      <MoveUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => moveImage(index, "down")}
                      disabled={index === heroData.images.length - 1}
                      className="p-1 rounded-md hover:bg-gray-200 disabled:opacity-30 cursor-pointer"
                      title="Move Right/Down"
                    >
                      <MoveDown className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Toggle Active & Delete */}
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => toggleImageActive(img.id)}
                      className={`p-1.5 rounded-md text-xs font-semibold cursor-pointer ${
                        img.active ? "text-emerald-600 hover:bg-emerald-50" : "text-gray-400 hover:bg-gray-200"
                      }`}
                      title={img.active ? "Click to deactivate" : "Click to activate"}
                    >
                      {img.active ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                    </button>

                    <button
                      type="button"
                      onClick={() => deleteImage(img.id)}
                      className="p-1.5 rounded-md text-rose-500 hover:bg-rose-50 hover:text-rose-700 cursor-pointer"
                      title="Delete image"
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

      {/* Hero Typography & Texts Editor */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-gray-200 shadow-sm space-y-6">
        <div className="border-b border-gray-100 pb-5">
          <h3 className="text-lg sm:text-xl font-black text-gray-900 font-sans tracking-tight flex items-center gap-2">
            <Sliders className="w-5 h-5 text-[#ff9f43]" />
            Hero Section Text & Headlines
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            Customize main summit titles, sub-headlines, dates, and CTA button copy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Kicker Pill Badge */}
          <div className="space-y-1.5 md:col-span-2">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-600">
              Kicker Top Badge
            </label>
            <input
              type="text"
              value={heroData.kicker}
              onChange={(e) => setHeroData({ ...heroData, kicker: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#ff9f43] text-sm bg-[#faf9f5] font-medium"
            />
          </div>

          {/* Title Part 1 */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-600">
              Main Title (Part 1 - White)
            </label>
            <input
              type="text"
              value={heroData.titlePart1}
              onChange={(e) => setHeroData({ ...heroData, titlePart1: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#ff9f43] text-sm bg-[#faf9f5] font-bold"
            />
          </div>

          {/* Title Part 2 (Orange Accent) */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-[#ff9f43]">
              Main Title (Part 2 - Orange Highlight)
            </label>
            <input
              type="text"
              value={heroData.titlePart2}
              onChange={(e) => setHeroData({ ...heroData, titlePart2: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#ff9f43] text-sm bg-[#faf9f5] font-bold text-[#ff9f43]"
            />
          </div>

          {/* Shroom Connect Subtitle */}
          <div className="space-y-1.5 md:col-span-2">
            <label className="text-xs font-bold uppercase tracking-wider text-[#38bdf8]">
              Secondary Sub-Headline (Sky Blue Accent)
            </label>
            <input
              type="text"
              value={heroData.shroomConnect}
              onChange={(e) => setHeroData({ ...heroData, shroomConnect: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#ff9f43] text-sm bg-[#faf9f5] font-bold text-sky-600"
            />
          </div>

          {/* Subtitle Line 1 */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-600">
              Subtitle Line 1 (Dates & Location)
            </label>
            <input
              type="text"
              value={heroData.subtitlePart1}
              onChange={(e) => setHeroData({ ...heroData, subtitlePart1: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#ff9f43] text-sm bg-[#faf9f5]"
            />
          </div>

          {/* Subtitle Line 2 */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-600">
              Subtitle Line 2 (Conclave Positioning)
            </label>
            <input
              type="text"
              value={heroData.subtitlePart2}
              onChange={(e) => setHeroData({ ...heroData, subtitlePart2: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#ff9f43] text-sm bg-[#faf9f5]"
            />
          </div>

          {/* Visitor Button Text */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-600">
              Primary Button Text
            </label>
            <input
              type="text"
              value={heroData.visitorBtnText}
              onChange={(e) => setHeroData({ ...heroData, visitorBtnText: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#ff9f43] text-sm bg-[#faf9f5] font-semibold"
            />
          </div>

          {/* Booth Button Text */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-600">
              Secondary Button Text
            </label>
            <input
              type="text"
              value={heroData.boothBtnText}
              onChange={(e) => setHeroData({ ...heroData, boothBtnText: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#ff9f43] text-sm bg-[#faf9f5] font-semibold"
            />
          </div>
        </div>

        {/* Live Preview Box */}
        <div className="mt-8 pt-6 border-t border-gray-100">
          <label className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-3">
            Real-Time Visual Text Preview
          </label>
          <div className="p-8 rounded-2xl bg-gradient-to-br from-[#0c140f] to-[#16221a] text-center border border-white/10 shadow-inner space-y-4">
            <div>
              <span className="inline-flex items-center px-4 py-1 rounded-full bg-black/60 border border-amber-400/50 text-amber-300 font-extrabold text-xs tracking-wider uppercase">
                {heroData.kicker}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight font-sans">
              {heroData.titlePart1} <span className="text-[#ff9f43]">{heroData.titlePart2}</span>
            </h1>

            <h2 className="text-xl sm:text-2xl font-black text-[#38bdf8] font-sans">
              {heroData.shroomConnect}
            </h2>

            <p className="text-xs sm:text-sm text-gray-200 max-w-xl mx-auto leading-relaxed">
              {heroData.subtitlePart1} • {heroData.subtitlePart2}
            </p>

            <div className="flex items-center justify-center gap-3 pt-2">
              <span className="px-5 py-2 rounded-full text-xs font-bold text-white bg-[#ff9f43]">
                {heroData.visitorBtnText}
              </span>
              <span className="px-5 py-2 rounded-full text-xs font-bold text-white bg-black/40 border border-white/30">
                {heroData.boothBtnText}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Actions Bar */}
        <div className="flex items-center justify-between pt-6 border-t border-gray-100">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Defaults</span>
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-7 py-3 rounded-xl bg-[#ff9f43] hover:bg-[#f28822] text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-all shadow-md hover:scale-105 active:scale-95 cursor-pointer shadow-amber-500/30"
          >
            <Save className={`w-4 h-4 ${isSaving ? "animate-spin" : ""}`} />
            <span>{isSaving ? "Saving..." : "Save All Hero CMS Changes"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
