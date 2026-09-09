"use client";

import { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  FileText,
  Clock,
} from "lucide-react";
import PrivacyModal from "./PrivacyModal";

export default function FooterSection() {
  const [privacyOpen, setPrivacyOpen] = useState(false);

  return (
    <>
      {/* Main Footer */}
      <footer id="contact" className="bg-[#1f2429] text-gray-300 pt-16 pb-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-gray-700/60">
            {/* Col 1: About Organizers (4 cols) */}
            <div className="lg:col-span-4 space-y-4">
              <h5 className="text-white text-base sm:text-lg font-bold leading-snug">
                Indian Mushroom Days 2027 (IMD 2027) will be held from February 19 to 21, 2027 at Bharat Mandapam, Pragati Maidan, New Delhi, India.
              </h5>
              <div className="text-sm text-gray-400 leading-relaxed space-y-2">
                <p>
                  Indian Mushroom Days Secretariat &amp; Organizing Committee
                </p>
                <p className="text-gray-300 font-medium">
                  Edible Fungi and Agri-Tech Expo Branch
                </p>
              </div>
            </div>

            {/* Col 2: Brand Logo (2 cols) */}
            <div className="lg:col-span-2 flex items-center justify-center lg:justify-start">
              <img
                src="/reallogo.png"
                alt="Indian Mushroom Days 2027 Logo"
                className="max-h-24 w-auto object-contain rounded-full shadow-lg brightness-100 hover:scale-105 transition-all"
              />
            </div>

            {/* Col 3: Contact Us (4 cols) */}
            <div className="lg:col-span-4 space-y-3">
              <h5 className="text-[#f28822] text-lg font-black uppercase tracking-wider mb-4">
                CONTACT US
              </h5>
              <ul className="space-y-2.5 text-xs sm:text-sm">
                <li className="flex items-start space-x-3">
                  <MapPin className="w-4 h-4 text-[#f28822] mt-0.5 flex-shrink-0" />
                  <span>Pragati Maidan, Bharat Mandapam, New Delhi – 110001, India</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-[#f28822] flex-shrink-0" />
                  <a href="tel:+919810726996" className="hover:text-white transition-colors">
                    +91 98107 26996 / +91 98117 75443
                  </a>
                </li>
                <li className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-[#f28822] flex-shrink-0" />
                  <a href="tel:+918860115588" className="hover:text-white transition-colors">
                    +91 88601 15588 (Helpline 3)
                  </a>
                </li>
                <li className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-[#f28822] flex-shrink-0" />
                  <a href="mailto:reachout@mushex.in" className="hover:text-white transition-colors">
                    reachout@mushex.in
                  </a>
                </li>
                <li className="flex items-center space-x-3">
                  <Clock className="w-4 h-4 text-[#f28822] flex-shrink-0" />
                  <span>Mon - Sat: 09:00 AM – 06:00 PM IST</span>
                </li>
              </ul>
            </div>

            {/* Col 4: Follow Us (2 cols) */}
            <div className="lg:col-span-2 flex flex-col items-center lg:items-start space-y-3">
              <h5 className="text-[#f28822] text-lg font-black uppercase tracking-wider mb-2">
                Follow Us
              </h5>
              <div className="bg-white p-2 rounded-xl shadow-md w-32 h-32 flex items-center justify-center">
                <img
                  src="https://oss.matchpages.cn/matchpages/common/2024/0205/5210/65c0867ece4b2/image.png"
                  alt="QR Code"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xs text-gray-400">Scan to follow official updates</span>
            </div>
          </div>

          {/* Copyright Bar */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4 text-center sm:text-left">
            <p>
              Copyright &copy; 2027 India Mushroom Days (IMD 2027). All rights reserved.
            </p>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setPrivacyOpen(true)}
                className="text-[#f28822] hover:underline flex items-center space-x-1 font-medium"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Privacy Policy</span>
              </button>
              <span>|</span>
              <span className="text-gray-500">
                Technical Support: <span className="text-purple-400 font-medium">Starify ChatBot</span>
              </span>
            </div>
          </div>
        </div>
      </footer>

      {/* Privacy Policy Modal */}
      <PrivacyModal isOpen={privacyOpen} onClose={() => setPrivacyOpen(false)} />
    </>
  );
}

