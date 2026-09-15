"use client";

import { useState } from "react";
import { MessageSquare, X, Send } from "lucide-react";

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setSent(true);
    setTimeout(() => {
      setMessage("");
      setSent(false);
      setIsOpen(false);
    }, 2000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-2">
      {/* Chat Popover Window */}
      {isOpen && (
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 w-80 sm:w-96 p-4 mb-2 animate-in fade-in slide-in-from-bottom-5 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              <span className="font-bold text-gray-900 text-sm">IMD 2027 Live Assistance</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="py-4 text-xs sm:text-sm text-gray-600">
            {sent ? (
              <div className="text-center py-6 text-[#004aab] font-semibold">
                Thank you! Your message has been sent to our exhibition secretariat.
              </div>
            ) : (
              <div className="space-y-3">
                <p className="bg-gray-50 p-3 rounded-xl text-gray-700">
                  👋 Hello! Welcome to Indian Mushroom Days 2027 (IMD 2027). How can we assist with your visit or exhibition booking?
                </p>
                <form onSubmit={handleSend} className="flex gap-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 px-3 py-2 rounded-xl border border-gray-300 text-xs sm:text-sm focus:ring-2 focus:ring-[#0084ff] outline-none"
                  />
                  <button
                    type="submit"
                    className="bg-[#0084ff] hover:bg-[#0073e6] text-white p-2.5 rounded-xl transition-colors"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Floating Trigger Button */}
      <div className="flex items-center space-x-3">
        {/* Chat Callout Pill from screenshot */}
        {!isOpen && (
          <div
            onClick={() => setIsOpen(true)}
            className="cursor-pointer bg-white text-gray-800 text-xs sm:text-sm font-semibold px-3.5 py-1.5 rounded-full shadow-lg border border-gray-100 hover:shadow-xl transition-all flex items-center space-x-1"
          >
            <span>Chat with us</span>
            <span>👋</span>
          </div>
        )}

        {/* Circular Blue Icon Button from screenshot */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Open live chat"
          className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#0084ff] hover:bg-[#0073e6] text-white shadow-xl hover:shadow-2xl flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
        >
          {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-7 h-7 fill-white" />}
        </button>
      </div>
    </div>
  );
}
