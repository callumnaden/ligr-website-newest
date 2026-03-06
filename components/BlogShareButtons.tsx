"use client";
import { useState } from "react";

interface Props {
  title: string;
}

export default function BlogShareButtons({ title }: Props) {
  const [copied, setCopied] = useState(false);

  function copyLink() {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  const encodedUrl = typeof window !== "undefined" ? encodeURIComponent(window.location.href) : "";
  const encodedTitle = encodeURIComponent(title);

  const btnClass =
    "bg-[#0C0E12] border border-[#373A41] rounded-lg flex items-center justify-center hover:border-[#94979C] transition-colors shadow-[0_1px_2px_rgba(0,0,0,0.3)]";

  return (
    <div className="flex items-center gap-3">
      {/* Copy link */}
      <button
        onClick={copyLink}
        className={`${btnClass} gap-1.5 px-3.5 py-2.5`}
        title="Copy link"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <rect x="7" y="7" width="9" height="9" rx="2" stroke="#CECFD2" strokeWidth="1.5" />
          <path d="M13 7V5a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2" stroke="#CECFD2" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <span className="text-sm font-semibold text-[#CECFD2]">
          {copied ? "Copied!" : "Share"}
        </span>
      </button>

      {/* X / Twitter */}
      <a
        href={`https://x.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        className={`${btnClass} p-2.5`}
        title="Share on X"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M11.905 8.674L18.544 1h-1.577l-5.77 6.56L6.445 1H1l6.97 9.892L1 19h1.577l6.094-6.928L13.556 19H19l-7.095-10.326zm-2.157 2.452l-.706-.988L3.15 2.16h2.417l4.535 6.347.706.988 5.893 8.244h-2.417l-4.536-6.613z" fill="#CECFD2" />
        </svg>
      </a>

      {/* LinkedIn */}
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className={`${btnClass} p-2.5`}
        title="Share on LinkedIn"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M4.477 3C3.661 3 3 3.672 3 4.5S3.661 6 4.477 6C5.295 6 5.955 5.328 5.955 4.5S5.295 3 4.477 3zM3.2 7.5h2.555V17H3.2V7.5zm4.598 0H10.3v1.306h.038C10.68 8.14 11.683 7.3 13.17 7.3 15.754 7.3 16.8 8.956 16.8 11.178V17h-2.555v-5.268c0-.945-.016-2.161-1.318-2.161-1.32 0-1.522 1.031-1.522 2.093V17H8.85V7.5h-.052z" fill="#CECFD2" />
        </svg>
      </a>

      {/* Facebook */}
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className={`${btnClass} p-2.5`}
        title="Share on Facebook"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 2C5.582 2 2 5.582 2 10c0 4.006 2.935 7.328 6.773 7.931V12.22H6.9V10h1.873V8.392c0-1.849 1.1-2.87 2.786-2.87.808 0 1.652.144 1.652.144v1.817h-.931c-.917 0-1.203.569-1.203 1.153V10h2.047l-.327 2.22h-1.72v5.711C15.065 17.328 18 14.006 18 10c0-4.418-3.582-8-8-8z" fill="#CECFD2" />
        </svg>
      </a>
    </div>
  );
}
