"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { useTranslations } from "next-intl";
import SectionDivider from "./SectionDivider";

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={`${className} fill-current`} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

interface InstagramFeedProps {
  embedId?: string;
  iframeUrl?: string;
  className?: string;
  showHeading?: boolean;
  useIframe?: boolean;
}

export default function InstagramFeed({
  embedId = "25715185",
  iframeUrl = "https://widgets.sociablekit.com/instagram-feed/iframe/25715185",
  className = "",
  showHeading = true,
  useIframe = false,
}: InstagramFeedProps) {
  let t = (key: string) => key;
  try {
    const tHook = useTranslations("instagram");
    if (tHook) t = tHook;
  } catch {
    // fallback if namespace is not defined in some translation file
  }

  const [mounted, setMounted] = useState(false);

  // Extract embed id if a full URL was provided
  const effectiveEmbedId = (() => {
    if (embedId && embedId !== "25715185") return embedId;
    if (iframeUrl) {
      const parts = iframeUrl.trim().replace(/\/$/, "").split("/");
      const last = parts[parts.length - 1];
      if (/^\d+$/.test(last)) return last;
    }
    return embedId || "25715185";
  })();

  const effectiveIframeUrl =
    iframeUrl || `https://widgets.sociablekit.com/instagram-feed/iframe/${effectiveEmbedId}`;

  useEffect(() => {
    setMounted(true);

    // If SociableKit script is already in the window, trigger re-scan
    const triggerScan = () => {
      const w = window as unknown as { __skIgScanFeeds?: () => void };
      if (typeof w.__skIgScanFeeds === "function") {
        w.__skIgScanFeeds();
      }
    };

    triggerScan();
    const timer = setTimeout(triggerScan, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleScriptLoad = () => {
    const w = window as unknown as { __skIgScanFeeds?: () => void };
    if (typeof w.__skIgScanFeeds === "function") {
      w.__skIgScanFeeds();
    }
  };

  return (
    <section
      id="instagram-feed"
      className={`relative py-12 sm:py-16 bg-[#faf9f5] overflow-hidden ${className}`}
    >
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-pink-100/20 via-purple-100/15 to-amber-100/20 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="w-full relative z-10">
        {showHeading && (
          <div className="text-center max-w-4xl mx-auto mb-8 sm:mb-10 px-4">
            {/* Top pill badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-pink-50 via-purple-50 to-orange-50 border border-pink-200/70 text-xs font-bold text-[#e1306c] mb-3.5 shadow-sm"
            >
              <InstagramIcon className="w-3.5 h-3.5 text-[#e1306c]" />
              <span className="font-mono uppercase tracking-wider text-[11px]">
                {t("badge") || "Live Updates"}
              </span>
            </motion.div>

            {/* Main Section Heading - Capitalized */}
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.05 }}
              className="text-3xl sm:text-4xl md:text-5xl font-black font-sans text-gray-950 tracking-tight capitalize"
            >
              {t("title") || "Follow Us On Instagram"}
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="mt-2.5 text-sm sm:text-base text-gray-600 max-w-xl mx-auto leading-relaxed font-normal"
            >
              {t("subtitle") || "Catch live exhibition moments, speaker sessions & community highlights"}
            </motion.p>

            {/* Follow On Instagram Button with direct link to profile */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.15 }}
              className="mt-5 flex items-center justify-center"
            >
              <a
                href="https://www.instagram.com/indiamushroomdays?stkn=bWU4bjd5N3d5YzNs"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white text-xs sm:text-sm font-bold tracking-wide shadow-md hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200"
              >
                <InstagramIcon className="w-4 h-4" />
                <span>{t("followBtn") || "Follow On Instagram"}</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-90" />
              </a>
            </motion.div>
          </div>
        )}

        {/* Instagram Widget Container - Clean, Borderless, Full Width */}
        <div className="w-full px-2 sm:px-4 md:px-6 lg:px-8 transition-all overflow-hidden min-h-[360px]">
          {useIframe ? (
            /* Direct Iframe Mode */
            <iframe
              src={effectiveIframeUrl}
              frameBorder="0"
              width="100%"
              height="680"
              className="w-full border-0 rounded-none"
              title="Instagram Feed"
              loading="lazy"
            />
          ) : (
            /* Script Widget Mode - Allows custom full-width borderless styling & bio hiding */
            <div
              className="sk-instagram-feed w-full"
              data-embed-id={effectiveEmbedId}
              suppressHydrationWarning
            >
              {!mounted && (
                <div className="w-full py-16 flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-12 h-12 rounded-full border-2 border-pink-500/20 border-t-pink-500 animate-spin flex items-center justify-center">
                    <InstagramIcon className="w-5 h-5 text-pink-500" />
                  </div>
                  <p className="text-xs font-semibold text-gray-500 font-mono tracking-wider uppercase">
                    Loading Live Instagram Stream...
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Next.js Script Loader for SociableKit (Only loaded if not in pure iframe mode) */}
        {!useIframe && (
          <Script
            src="https://widgets.sociablekit.com/instagram-feed/widget.js"
            strategy="afterInteractive"
            defer
            onLoad={handleScriptLoad}
          />
        )}

        {/* Scoped CSS targeting SociableKit widget: hide bio text/links/branding & ensure clean full-width presentation */}
        <style jsx global>{`
          /* Feed root styling: seamless background, no borders, full width */
          .sk-instagram-feed {
            width: 100% !important;
            max-width: 100% !important;
            border: none !important;
            box-shadow: none !important;
            background: transparent !important;
            padding: 0 !important;
            margin: 0 !important;
          }

          /* Profile header: keep only logo/profile pic, username, follower counters, and follow button */
          .sk-instagram-feed .instagram-user-root-container {
            max-width: 1200px !important;
            margin: 0 auto 1.5rem auto !important;
            padding: 0.75rem 1rem !important;
            border: none !important;
            box-shadow: none !important;
            background: transparent !important;
            display: flex !important;
            flex-wrap: wrap !important;
            align-items: center !important;
            justify-content: flex-start !important;
            gap: 1rem 1.75rem !important;
          }

          .sk-instagram-feed .sk-instagram-profile-pic_container {
            width: auto !important;
            margin: 0 !important;
          }

          .sk-instagram-feed .sk-instagram-profile-pic_container img {
            width: 72px !important;
            height: 72px !important;
            border-radius: 9999px !important;
            object-fit: cover !important;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08) !important;
            border: 2px solid #e5e7eb !important;
          }

          .sk-instagram-feed .sk-ig-profile-info {
            width: auto !important;
            flex: 1 !important;
          }

          .sk-instagram-feed .sk_ig_feed_username_follow {
            display: flex !important;
            align-items: center !important;
            gap: 0.875rem !important;
            margin-bottom: 0.35rem !important;
          }

          .sk-instagram-feed .sk-ig-profile-usename {
            font-size: 1.25rem !important;
            font-weight: 800 !important;
            color: #111827 !important;
            letter-spacing: -0.02em !important;
            margin: 0 !important;
            display: inline-block !important;
          }

          .sk-instagram-feed .sk-ig-profile-counts {
            display: flex !important;
            align-items: center !important;
            flex-wrap: wrap !important;
            gap: 1.25rem !important;
            font-size: 0.95rem !important;
            color: #4b5563 !important;
            margin: 0 !important;
          }

          .sk-instagram-feed .sk-ig-profile-count-item {
            margin: 0 !important;
          }

          .sk-instagram-feed .sk-ig-profile-count-item .f-w-b {
            font-weight: 700 !important;
            color: #111827 !important;
          }

          /* Follow CTA button refinement */
          .sk-instagram-feed .sk-ig-follow-btn,
          .sk-instagram-feed .sk_ig_feed_username_follow a {
            border-radius: 9999px !important;
            font-weight: 600 !important;
          }

          /* CRITICAL: HIDE BIO TEXT, DESCRIPTION, HASHTAGS, EVENT DATES AND WEBSITE URL */
          .sk-instagram-feed .sk-ig-profile-bio-container,
          .sk-instagram-feed .sk-ig-profile-bio,
          .sk-instagram-feed .bio-website,
          .sk-instagram-feed div:has(> .bio-website),
          .sk-instagram-feed div:has(> .sk-ig-profile-bio),
          .sk-instagram-feed div:has(> a[href*="indiamushroomdays.in"]) {
            display: none !important;
            height: 0 !important;
            margin: 0 !important;
            padding: 0 !important;
            overflow: hidden !important;
            visibility: hidden !important;
          }

          /* Carousel: clean borderless full width across the website */
          .sk-instagram-feed .sk-slider-container,
          .sk-instagram-feed .swiper-container,
          .sk-instagram-feed .swiper,
          .sk-instagram-feed .sk-posts-container {
            width: 100% !important;
            max-width: 100% !important;
            padding-left: 0 !important;
            padding-right: 0 !important;
            border: none !important;
            box-shadow: none !important;
          }

          /* Swiper slides/cards: remove borders */
          .sk-instagram-feed .swiper-slide,
          .sk-instagram-feed .sk-ig-post-item {
            border: none !important;
            box-shadow: none !important;
          }

          /* Navigation arrows: sleek and modern */
          .sk-instagram-feed .swiper-button-next,
          .sk-instagram-feed .swiper-button-prev {
            width: 42px !important;
            height: 42px !important;
            background: rgba(255, 255, 255, 0.95) !important;
            border-radius: 9999px !important;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15) !important;
            border: 1px solid rgba(0, 0, 0, 0.08) !important;
            color: #111827 !important;
            transition: all 0.2s ease !important;
          }

          .sk-instagram-feed .swiper-button-next:hover,
          .sk-instagram-feed .swiper-button-prev:hover {
            transform: scale(1.08) !important;
            background: #ffffff !important;
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2) !important;
          }

          /* HIDE SOCIABLEKIT PROMOTIONAL BRANDING FOOTER LINK */
          .sk-instagram-feed .sk_branding,
          .sk_branding,
          .sk-instagram-feed .tutorial_link,
          .sk-instagram-feed a[href*="sociablekit.com"],
          .sk-instagram-feed a[href*="free-widgets"] {
            display: none !important;
            height: 0 !important;
            margin: 0 !important;
            padding: 0 !important;
            opacity: 0 !important;
            overflow: hidden !important;
            visibility: hidden !important;
            pointer-events: none !important;
          }
        `}</style>

        {/* Center Bottom Mushroom Emblem */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionDivider className="mt-10 sm:mt-14" />
        </div>
      </div>
    </section>
  );
}
