// Light-theme LIGR dashboard mockup — sports broadcast production platform
export default function DashboardMockup({ className = "" }: { className?: string }) {
  return (
    <div className={`dashboard-mockup shadow-[0_24px_48px_rgba(0,0,0,0.4)] ${className}`}>
      {/* Browser chrome */}
      <div className="bg-[#f0f0f0] px-3 py-2 flex items-center gap-2 border-b border-gray-200">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex-1 mx-3 bg-white rounded px-2 py-0.5 flex items-center gap-1.5">
          <svg width="8" height="8" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="#9ca3af" strokeWidth="1.5"/><path d="M8 5v3l2 2" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round"/></svg>
          <span className="text-[8px] text-gray-400">app.ligrsystems.com/broadcasts</span>
        </div>
      </div>
      {/* App layout */}
      <div className="flex h-full min-h-[320px]">
        {/* Sidebar */}
        <div className="w-40 bg-[#fafafa] border-r border-gray-100 flex flex-col py-3 shrink-0">
          {/* Logo area */}
          <div className="px-3 mb-4 flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-[#FF504E] flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 6h8M6 2v8" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <span className="text-[11px] font-semibold text-gray-700">LIGR</span>
          </div>
          {/* Search */}
          <div className="mx-2 mb-3 bg-white border border-gray-200 rounded px-2 py-1 flex items-center gap-1">
            <svg width="10" height="10" viewBox="0 0 16 16" fill="none"><circle cx="7" cy="7" r="5" stroke="#9ca3af" strokeWidth="1.5"/><path d="M11 11l3 3" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round"/></svg>
            <span className="text-[9px] text-gray-400">Search</span>
            <span className="ml-auto text-[7px] text-gray-300 border border-gray-200 rounded px-0.5">⌘K</span>
          </div>
          {/* Nav items */}
          {[
            { label: "Overview", icon: "⊙" },
            { label: "Broadcasts", icon: "▶", active: true },
            { label: "Overlays", icon: "◫" },
            { label: "Match Events", icon: "☰", badge: "3" },
            { label: "Analytics", icon: "◻" },
            { label: "Sports", icon: "◎" },
          ].map((item) => (
            <div
              key={item.label}
              className={`mx-1 flex items-center gap-2 px-2 py-1.5 rounded text-[9px] font-medium ${
                item.active ? "bg-[#FF504E]/10 text-[#FF504E]" : "text-gray-500"
              }`}
            >
              <span className="text-[10px]">{item.icon}</span>
              <span>{item.label}</span>
              {item.badge && (
                <span className="ml-auto bg-[#FF504E]/15 text-[#FF504E] rounded-full w-4 h-4 flex items-center justify-center text-[7px]">{item.badge}</span>
              )}
            </div>
          ))}
          {/* Bottom items */}
          <div className="mt-auto space-y-0.5 px-1">
            {["Settings", "Support"].map((l) => (
              <div key={l} className="flex items-center gap-2 px-2 py-1.5 text-[9px] text-gray-400">
                <span className="text-[10px]">◎</span>
                <span>{l}</span>
                {l === "Support" && <span className="ml-auto text-[7px] text-green-500 border border-green-200 rounded px-0.5">Online</span>}
              </div>
            ))}
            {/* User */}
            <div className="flex items-center gap-2 px-2 py-2 mt-1 border-t border-gray-100 pt-2">
              <div className="w-5 h-5 rounded-full bg-[#FF504E] flex items-center justify-center text-[7px] text-white font-bold">JT</div>
              <div>
                <div className="text-[8px] font-medium text-gray-700">James Taylor</div>
                <div className="text-[7px] text-gray-400">AFL Victoria</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 bg-white p-4 overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-gray-900">Broadcasts</h2>
            <div className="flex gap-1">
              <button className="text-[9px] bg-[#FF504E] text-white rounded px-2 py-1 font-medium">+ New broadcast</button>
              <button className="text-[9px] border border-gray-200 rounded px-2 py-1 text-gray-600">⊟ Filters</button>
            </div>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            {[
              { label: "Live now", value: "3", change: "↑ 1", color: "#22c55e" },
              { label: "This week", value: "24", change: "+8 vs last", color: "#FF504E" },
              { label: "Avg viewers", value: "1,840", change: "↑ 12%", color: "#0BA5EC" },
            ].map((s) => (
              <div key={s.label} className="border border-gray-100 rounded-lg p-2.5">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[9px] text-gray-500">{s.label}</span>
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: s.color }} />
                </div>
                <div className="text-sm font-bold text-gray-900">{s.value}</div>
                <span className="text-[9px] font-medium" style={{ color: s.color }}>{s.change}</span>
              </div>
            ))}
          </div>

          {/* Viewer chart */}
          <div className="mb-2 flex items-center gap-2">
            <span className="text-[9px] text-gray-500">Viewer hours ▾</span>
            <span className="ml-auto flex gap-1">
              {["Season","30 days","7 days","Today"].map((t) => (
                <button key={t} className={`text-[8px] px-1.5 py-0.5 rounded ${t==="7 days"?"bg-gray-100 text-gray-700":"text-gray-400"}`}>{t}</button>
              ))}
            </span>
          </div>
          <div className="text-base font-bold text-gray-900 mb-2">12,904 hrs <span className="text-[10px] text-green-600 font-medium">↑ 18.4%</span></div>

          {/* Line chart */}
          <div className="h-16 mb-3 relative">
            <svg className="w-full h-full" viewBox="0 0 400 64" preserveAspectRatio="none">
              <defs>
                <linearGradient id="ligrChartFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FF504E" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#FF504E" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0,52 C30,50 60,46 80,40 C110,32 130,36 160,28 C190,20 210,24 240,16 C270,8 300,14 330,10 L400,6 L400,64 L0,64Z" fill="url(#ligrChartFill)" />
              <path d="M0,52 C30,50 60,46 80,40 C110,32 130,36 160,28 C190,20 210,24 240,16 C270,8 300,14 330,10 L400,6" fill="none" stroke="#FF504E" strokeWidth="1.5" />
              <path d="M0,56 C40,54 80,52 120,50 C160,48 200,46 240,44 C280,42 320,40 360,38 L400,36" fill="none" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="3,2" />
            </svg>
            <div className="absolute bottom-[-14px] left-0 right-0 flex justify-between px-1">
              {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map((d) => (
                <span key={d} className="text-[7px] text-gray-300">{d}</span>
              ))}
            </div>
          </div>

          {/* Broadcasts table */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-gray-900">Recent broadcasts</span>
              <div className="flex items-center gap-1 border border-gray-200 rounded px-2 py-0.5">
                <svg width="8" height="8" viewBox="0 0 16 16" fill="none"><circle cx="7" cy="7" r="5" stroke="#9ca3af" strokeWidth="1.5"/><path d="M11 11l3 3" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round"/></svg>
                <span className="text-[8px] text-gray-400">Search</span>
              </div>
            </div>
            {/* Table header */}
            <div className="grid grid-cols-5 text-[8px] text-gray-400 border-b border-gray-100 pb-1 mb-1 font-medium">
              {["Match","Sport","Date","Status","Viewers"].map((h) => (
                <span key={h}>{h}</span>
              ))}
            </div>
            {/* Rows */}
            {[
              { match: "Carlton v Collingwood", sport: "AFL", date: "Mar 4, 2026", status: "Live", viewers: "4,210", color: "#003087", statusColor: "#22c55e" },
              { match: "Swifts v Firebirds", sport: "Netball", date: "Mar 4, 2026", status: "Live", viewers: "1,840", color: "#FF504E", statusColor: "#22c55e" },
              { match: "Roosters v Broncos", sport: "NRL", date: "Mar 3, 2026", status: "Ended", viewers: "6,520", color: "#003F8A", statusColor: "#9ca3af" },
              { match: "Brisbane v Sydney FC", sport: "A-League", date: "Mar 3, 2026", status: "Ended", viewers: "2,190", color: "#f59e0b", statusColor: "#9ca3af" },
            ].map((row) => (
              <div key={row.match} className="grid grid-cols-5 items-center text-[8px] py-1.5 border-b border-gray-50">
                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-4 rounded-full flex items-center justify-center text-white text-[7px] font-bold shrink-0" style={{ background: row.color }}>
                    {row.match[0]}
                  </div>
                  <span className="text-gray-800 font-medium leading-tight truncate">{row.match}</span>
                </div>
                <span className="text-gray-500">{row.sport}</span>
                <span className="text-gray-500">{row.date}</span>
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: row.statusColor }} />
                  <span className="text-gray-600">{row.status}</span>
                </div>
                <span className="text-gray-800 font-medium">{row.viewers}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
