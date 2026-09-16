"use client";

import { X } from "lucide-react";

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PrivacyModal({ isOpen, onClose }: PrivacyModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-900">Privacy Policy</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-4 text-sm text-gray-600 leading-relaxed">
          <p>
            <strong>Indian Mushroom Days (IMD 2027)</strong> is committed to protecting your privacy and ensuring you have a positive experience on our website and in using our exhibition services.
          </p>
          <h4 className="font-bold text-gray-800 text-base">1. Collection of Personal Information</h4>
          <p>
            When you register as a visitor, buyer, or exhibitor, we collect personal contact details including your name, email address, telephone number, company name, job title, passport/ID details (for exhibition badges &amp; entry clearance), and business category.
          </p>
          <h4 className="font-bold text-gray-800 text-base">2. Use of Information</h4>
          <p>
            The collected information is solely utilized to process your exhibition badges, deliver relevant event notices, arrange B2B buyer-seller matchmaking sessions, and facilitate security verification required by the venue authorities.
          </p>
          <h4 className="font-bold text-gray-800 text-base">3. Security</h4>
          <p>
            We implement high industry-standard technical measures to prevent unauthorized disclosure, misuse, or alteration of your personal data.
          </p>
          <h4 className="font-bold text-gray-800 text-base">4. Contact</h4>
          <p>
            If you have questions regarding this privacy policy or your personal data, please contact the secretariat at <strong>reachout@mushex.in</strong>.
          </p>
        </div>

        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-full bg-[#ff9f43] text-white font-semibold hover:bg-[#f28822] transition-colors"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
}
