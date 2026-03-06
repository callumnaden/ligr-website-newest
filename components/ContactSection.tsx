"use client";
import { useState } from "react";

function ChatIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0 text-[#94979c]">
      <path d="M3 11.5a8.5 8.5 0 1 0 15.17 5.23l1.58 1.58a.75.75 0 0 0 1.06-1.06l-1.58-1.58A8.5 8.5 0 0 0 3 11.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 11.5h.01M12 11.5h.01M16 11.5h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0 text-[#94979c]">
      <path d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0 text-[#94979c]">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronDown() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M4 6l4 4 4-4" stroke="#85888E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const INPUT_BASE = "w-full bg-[#1D202A] border border-[#373A41] rounded-lg px-[14px] py-[10px] text-base text-[#F7F7F7] placeholder-[#85888E] outline-none focus:border-[#FF504E] transition-colors";
const LABEL_BASE = "block text-sm font-medium text-[#CECFD2] mb-1.5";

export default function ContactSection() {
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", organisation: "",
    enquiryType: "General enquiry", message: "",
  });
  const [sent, setSent] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <section className="py-16 md:py-24 px-4 md:px-6">
      <div className="max-w-[1280px] mx-auto md:px-8">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-16 items-start">

          {/* Left: contact details — comes second on mobile and desktop */}
          <div className="flex flex-col gap-8 lg:flex-1 order-2">
            <h2 className="text-[24px] font-bold text-[#F7F7F7] leading-8">Get in touch</h2>

            <div className="flex flex-col gap-8">
              {/* Chat */}
              <div className="flex gap-4 items-start">
                <div className="pt-0.5"><ChatIcon /></div>
                <div className="flex flex-col gap-5">
                  <p className="text-lg font-semibold text-[#F7F7F7]">Chat to us</p>
                  <a href="mailto:hello@ligrsystems.com" className="text-base font-semibold text-[#F7F7F7] hover:text-[#FF504E] transition-colors">
                    hello@ligrsystems.com
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex gap-4 items-start">
                <div className="pt-0.5"><MapPinIcon /></div>
                <div className="flex flex-col gap-5">
                  <p className="text-lg font-semibold text-[#F7F7F7]">Location</p>
                  <p className="text-base font-semibold text-[#F7F7F7]">Sydney, Australia</p>
                </div>
              </div>

              {/* Response time */}
              <div className="flex gap-4 items-start">
                <div className="pt-0.5"><ClockIcon /></div>
                <div className="flex flex-col gap-5">
                  <p className="text-lg font-semibold text-[#F7F7F7]">Response time</p>
                  <p className="text-base font-semibold text-[#F7F7F7]">
                    We typically respond within 24 hours on business days.
                  </p>
                  <div>
                    <p className="text-base font-normal text-[#94979c] mb-3">Common Reasons to Reach Out</p>
                    <ul className="flex flex-col gap-1.5 list-disc list-inside">
                      {[
                        "Start a free trial",
                        "Book a personalised demo",
                        "Discuss Enterprise pricing",
                        "Request a custom sport",
                        "Partnership enquiry",
                        "Technical support",
                      ].map((item) => (
                        <li key={item} className="text-base font-normal text-[#94979c]">{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Left: form — comes first on mobile and desktop */}
          <div className="w-full lg:flex-1 order-1">
            <div className="gradient-border-wrap">
            {sent ? (
              <div className="relative z-[1] flex flex-col items-center justify-center gap-5 py-16 px-8 text-center bg-[#13161B] rounded-2xl">
                <div className="w-14 h-14 rounded-full bg-[#FF504E]/10 flex items-center justify-center">
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <path d="M5 14l6 6 12-12" stroke="#FF504E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <p className="text-xl font-semibold text-[#F7F7F7] mb-2">Message sent!</p>
                  <p className="text-base text-[#94979c]">We&apos;ll get back to you within 24 hours on business days.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="relative z-[1] flex flex-col gap-6 bg-[#13161B] rounded-2xl px-6 py-10 lg:p-8 lg:pb-10">
                {/* First + Last name */}
                <div className="flex flex-col gap-6 sm:flex-row">
                  <div className="flex-1">
                    <label className={LABEL_BASE}>
                      First name <span className="text-[#94979c]">*</span>
                    </label>
                    <input
                      className={INPUT_BASE}
                      name="firstName"
                      placeholder="First name"
                      required
                      value={form.firstName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex-1">
                    <label className={LABEL_BASE}>
                      Last name <span className="text-[#94979c]">*</span>
                    </label>
                    <input
                      className={INPUT_BASE}
                      name="lastName"
                      placeholder="Last name"
                      required
                      value={form.lastName}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className={LABEL_BASE}>
                    Email <span className="text-[#94979c]">*</span>
                  </label>
                  <input
                    className={INPUT_BASE}
                    name="email"
                    type="email"
                    placeholder="you@company.com"
                    required
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>

                {/* Organisation */}
                <div>
                  <label className={LABEL_BASE}>
                    Organisation <span className="text-[#94979c]">*</span>
                  </label>
                  <input
                    className={INPUT_BASE}
                    name="organisation"
                    placeholder="LIGR Systems"
                    required
                    value={form.organisation}
                    onChange={handleChange}
                  />
                </div>

                {/* Enquiry type */}
                <div>
                  <label className={LABEL_BASE}>
                    Enquiry type <span className="text-[#94979c]">*</span>
                  </label>
                  <div className="relative">
                    <select
                      className={`${INPUT_BASE} appearance-none pr-10 cursor-pointer`}
                      name="enquiryType"
                      value={form.enquiryType}
                      onChange={handleChange}
                    >
                      {[
                        "General enquiry",
                        "Start a free trial",
                        "Book a personalised demo",
                        "Discuss Enterprise pricing",
                        "Request a custom sport",
                        "Partnership enquiry",
                        "Technical support",
                      ].map((opt) => (
                        <option key={opt} value={opt} className="bg-[#1D202A]">{opt}</option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                      <ChevronDown />
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className={LABEL_BASE}>
                    Message <span className="text-[#94979c]">*</span>
                  </label>
                  <textarea
                    className={`${INPUT_BASE} resize-none h-[144px]`}
                    name="message"
                    placeholder="Leave us a message..."
                    required
                    value={form.message}
                    onChange={handleChange}
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full bg-[#FF504E] text-white font-semibold text-base py-3 rounded-lg hover:opacity-90 transition-opacity shadow-[inset_0_0_0_1px_rgba(12,14,18,0.18),inset_0_-2px_0_rgba(12,14,18,0.05)]"
                >
                  Send message
                </button>
              </form>
            )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
