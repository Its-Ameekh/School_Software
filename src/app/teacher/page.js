'use client';

import React, { useState } from 'react';

export default function TeacherDashboard() {
  const [searchQuery, setSearchQuery] = useState('');

  // Local state arrays mimicking the original HTML dataset
  const announcements = [
    "New library books have arrived for the Bluebell section!",
    "Reminder: Please submit the science project drafts by Friday."
  ];

  const upcomingEvents = [
    { title: "Field Trip - Zoo", date: "Oct 20, 2024", color: "bg-[#005fb0]" },
    { title: "Parent-Teacher Meeting", date: "Oct 25, 2024", color: "bg-[#735c00]" }
  ];

  const scheduleDays = [
    { day: "28", muted: true }, { day: "29", muted: true }, { day: "30", muted: true },
    { day: "1" }, { day: "2" }, { day: "3" }, { day: "4" }, { day: "5" }, { day: "6" },
    { day: "7" }, { day: "8" }, { day: "9" }, { day: "10" }, { day: "11" }, { day: "12" },
    { day: "13" }, { day: "14" }, { day: "15", active: true }, { day: "16" }, { day: "17" }, { day: "18" }
  ];

  const worksheets = [
    { name: "Math_Unit_4_Addition.pdf", date: "Oct 14", size: "1.2 MB", type: "pdf" },
    { name: "English_Reading_Comp.docx", date: "Oct 12", size: "850 KB", type: "docx" }
  ];

  const students = [
    { name: "Aiden Jenkins", status: "Present", isAbsent: false, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBVYYBrK64z86fRZHZEhbCbjk0cPh8wkUIkcwzkc51Z041CoLxlv8EOicu8mrTaQ-QE3uNXTz8qkh6X0uZXxx8JL6zlJMJv5mbfE4GfTftc21x2B9GFTCdN0lmpqBR2hUdcamSNCuoeNLpqAxVu0ClZE6ms2A4vwZt6dbGB9qKhGgWXj3E0pVka-60LEw61hCeKhEvacYNqYzLCpqKO5jbjwDItb3ci4B-kDGo-rKSSETvKYeFooZ45Ya3KuM8J9frP-rnTmX91E3FK" },
    { name: "Leo Miller", status: "Present", isAbsent: false, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAzpkGrmDVDR211h-Hfk-pJjwaW-wOXzfPS9PdG_1NI9XFebypEOcvZgKE-a58RYmSoeU5UR-48mtrNZWljZSrimr_di9hCCQXVbCtKZY3iVpQtI8aR5lFr0iUxFkysjGLe1PwKQCAX2WMS7qMwTkDhzzKW73JIOvRUzs432CdNlp-rdYL7GKw3nfXRL2H6UVcXYbIiNmDlrjfW5O02-OwEyjJ4465UtZjufVzMIQX_8J_TRCsIDpHXpUf4Yext7rdfiBsxmmGUCx4a" },
    { name: "Sophia White", status: "Absent", isAbsent: true, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDAiEMlJdxngyd0EjJcIX6Gll5xgpZxxBpyrpIjTDwFIJJYo9W1ng9yx5Jf3Esa_NE-s_tJscl2YJyPXUJ8sk_hlmOOwA7FOaKIlBj6las-bpMwfrlK6nzYI8ElRqUOu1oJ_kgCoMhQrRsu9D9muHBf4NGn9XqadqmY6vHdqhag0aik3EUmTIWk0KXAX_GLDvN-Eh1h2IoSIroiRDSx5HmoB3PobEsdeEVRK0QcB_nu9NYGGaJhR7ZQJw3Z5VeTtZ2L9r-PPt4cY93j" }
  ];

  const galleryImages = [
    { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBE2CYrVGqtrm1zZohKt3eftvzzsUloOb8IpEmUnbclgdiTvsor4ehGY5PaNm4Rb7Pw6rnioZcpGec6TS4ZwarzkeWcQRwuRU7TXJ0BZZO8X8c_ToYop_vPk01rQB9Z3Jd0BNnOrXLSKJ6_cCwCkEux0QtpZimkqQgaDTtxmcz9Vj8tpix7q8ervzJqitAERZpTONvL0tdmnPnlgeRwErAAA_QedH-cXh81ckyLfbsOOYZPusf2GYWYfd5pFeNOGwSg37Q976C-OJmy", alt: "Class activity" },
    { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAZCWkzEaHa-6gwrTt-aQlUTiJf22fbBlyJNce7mVxocXZZ5wE1_J9VP8_EVGT5fceOdANgTqhGyuuE93wh7MCve399zdZoUYoVXAaLge-grM430FpiLNyW2gYWEDsBCDAHkAIQfAnv83MylKyeHU_5VuRtMEroztVEAnoCZXhwnkld_5-PpeI13h9gNiA7Mu9AlChQo1TB3D0YyPlKErxKbNNE20OOYsCdNRt_8jkYJn41-6O-TiKDZQ02rnxm3zUWIvAp-_F6BQ8E", alt: "Preschool outdoor play" },
    { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4RU-aTIzN_nAcdHFKu87tTbJvtCD12SoKNItYsojCFIbHxxheyy8ssnwCpfD75qdnh5iLiobXcvejeLIcPNEk7wuZxtAhAMG9EW2OdgGHoQYPHXzHFqHRmkoThxcS42kja_ktSbhnE_qmn3XncV8tQrr16RFNviLBlF2bbt9e2JmASmvWRZD-bDjxysYHZ8Qtn1ayBl8LmjtAfQmh46o-OhRpZpdz4zjjXc83lOKhowKA2hnaPFpqCfZpuWWD9JR0LHSef6kerW7V", alt: "Preschool classroom activity" },
    { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCTV2Ox8mIoz2IVCgxRXFibRn8Au3iP2Ie9dRqNxz5MBIw1aDcyGdI_t1AcrkBSvlLpTILxnWVFg5zFIhtN1U1WyF4BTGOmlaaa5KY0b5lkVMTJzeIqyIHBgJN3oVHNTWBmivb1TDUQl6PqapFpDY6zneTzM8UDI-sKUw5-SXPfvHMrMV5zrbH27DzVdGFyEME8k9SHq7mwbXh-LSjg2fa1jBbgAXb_oaGyNB6YdttphjGSaK0LWpLpC1qgsY7BN28M5JXFj32GD9HT", alt: "Preschool art class" }
  ];

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-[#f9f9ff] text-[#111c2c] min-h-screen font-sans antialiased">
      
      {/* --- TOP HEADER NAVIGATION --- */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 w-full shadow-sm border-b border-gray-100">
        <div className="flex justify-between items-center w-full px-10 h-20 max-w-[1280px] mx-auto">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#4f9dff] text-white">
              <span className="text-xl font-bold">★</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight text-[#005fb0]">Starlight Academy</h1>
          </div>
          <div className="hidden lg:flex items-center gap-6">
            <nav className="flex gap-8 font-medium">
              <a className="text-[#005fb0] font-bold" href="#">Dashboard</a>
              <a className="text-gray-500 hover:bg-gray-50 transition px-3 py-1 rounded-full" href="#">Academics</a>
              <a className="text-gray-500 hover:bg-gray-50 transition px-3 py-1 rounded-full" href="#">Gallery</a>
            </nav>
            <div className="flex items-center gap-4 border-l border-gray-200 pl-6 text-gray-400 text-lg">
              <button className="hover:text-gray-600 transition cursor-pointer relative">
                🔔 <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="hover:text-gray-600 transition cursor-pointer">⚙</button>
              <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200 shadow-sm">
                <img alt="Sarah Jenkins" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAN2PVOxJ-bwx4Tn8ibqsdfhhpZBX9WsCDTH2T_M4O0gcxLz7p6Fdz7zCz7SzORYnZW5SUj2h-DoRJ_foOJfvKIxIpiadmLC7-i87zqb3FJ1XiLOOWgUd4zXKucTKHuf8WlP1Rj4cJ0Ufs3R7QvpSpXPwyUlcVcRfqmArawrnCnYT7LMUBZ5IJFTnIUN0GwPS3vs5Stj6OVgX-awWPTtFSwpGJlOtcYEEq-NU-gnC3T1u6TmuOghEBh" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* --- MAIN PAGE WORKSPACE --- */}
      <main className="max-w-[1280px] mx-auto px-4 md:px-10 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* --- LEFT SIDEBAR TILES --- */}
          <aside className="lg:col-span-4 space-y-6">
            
            {/* Teacher Profile Module */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative overflow-hidden flex flex-col items-center text-center">
              <div className="absolute top-4 right-4 text-yellow-400 font-bold text-xl">★</div>
              <div className="relative w-32 h-32 mb-4">
                <div className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-md">
                  <img alt="Sarah Jenkins" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAN2PVOxJ-bwx4Tn8ibqsdfhhpZBX9WsCDTH2T_M4O0gcxLz7p6Fdz7zCz7SzORYnZW5SUj2h-DoRJ_foOJfvKIxIpiadmLC7-i87zqb3FJ1XiLOOWgUd4zXKucTKHuf8WlP1Rj4cJ0Ufs3R7QvpSpXPwyUlcVcRfqmArawrnCnYT7LMUBZ5IJFTnIUN0GwPS3vs5Stj6OVgX-awWPTtFSwpGJlOtcYEEq-NU-gnC3T1u6TmuOghEBh" />
                </div>
                <span className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></span>
              </div>
              <h3 className="text-xl font-bold text-[#111c2c]">Ms. Sarah Jenkins</h3>
              <p className="text-[#005fb0] font-bold text-sm">Lead Teacher</p>
              <div className="inline-flex items-center gap-2 px-4 py-1 bg-yellow-50 text-[#725b00] border border-yellow-200 rounded-full mt-2 text-xs font-semibold">
                🏫 Bluebell Section • #4022
              </div>
            </div>

            {/* Sidebar Notice Feed */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
              <div className="flex items-center gap-2 text-[#005fb0] font-bold text-sm uppercase tracking-wider">
                <span>📢</span> <h4>Announcements</h4>
              </div>
              <div className="space-y-2 text-xs text-gray-500 leading-relaxed">
                {announcements.map((note, idx) => (
                  <p key={idx}>• {note}</p>
                ))}
              </div>
              <button className="w-full mt-2 py-2.5 bg-[#005fb0] text-white rounded-full text-xs font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-1">
                <span>➕</span> Create Announcement
              </button>
            </div>

            {/* Upcoming Events Module */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-3">
              <div className="flex items-center gap-2 text-[#735c00] font-bold text-sm uppercase tracking-wider">
                <span>📅</span> <h4>Upcoming Events</h4>
              </div>
              <div className="space-y-3">
                {upcomingEvents.map((evt, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className={`w-1 h-8 ${evt.color} rounded-full`}></div>
                    <div>
                      <p className="text-xs font-bold text-gray-700">{evt.title}</p>
                      <p className="text-[10px] text-gray-400">{evt.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Schedule Calendar widget */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-bold text-gray-700">Schedule</h4>
                <button className="text-[#005fb0] text-xs font-semibold hover:underline">View Full</button>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-gray-400 uppercase">
                <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center text-xs">
                {scheduleDays.map((item, idx) => (
                  <span
                    key={idx}
                    className={`p-1 font-medium ${
                      item.muted ? 'text-gray-300' : 'text-gray-600'
                    } ${item.active ? 'bg-blue-500 text-white rounded-full' : ''}`}
                  >
                    {item.day}
                  </span>
                ))}
              </div>
              <div className="pt-3 border-t border-gray-100">
                <div className="flex items-start gap-3 text-xs">
                  <div className="w-1 h-8 bg-yellow-500 rounded-full mt-0.5"></div>
                  <div>
                    <p className="font-bold text-gray-700">Annual Sports Day</p>
                    <p className="text-[10px] text-gray-400">09:00 AM - 04:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

          </aside>

          {/* --- RIGHT COLUMN: ACTIVITY WORKSPACE --- */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Header Title Section */}
            <section className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Good Morning, <span className="text-[#005fb0]">Sarah! ☀️</span></h2>
                <p className="text-xs text-gray-400 font-medium mt-0.5">Monday, October 15, 2024</p>
              </div>
              <button className="px-4 py-2 bg-white border border-gray-200 text-gray-500 text-xs font-semibold rounded-full hover:bg-gray-50 transition shadow-sm flex items-center gap-1">
                <span>📅</span> Apply Leave
              </button>
            </section>

            {/* Dashboard Quick Actions Header Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {renderActionBlock("📋", "Mark Attendance", "Daily check-in", "text-[#005fb0] bg-blue-50/50")}
              {renderActionBlock("🛡", "Current Duty", "Playground Supervision", "text-[#735c00] bg-yellow-50/50")}
              {renderActionBlock("⏱", "Today's Timetable", "View full schedule", "text-red-600 bg-red-50/40")}
            </div>

            {/* Core Toolkit Matrix */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">TOOLKIT</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {renderToolButton("📝", "Add Homework", "text-[#735c00] bg-yellow-50/30 border-yellow-100")}
                {renderToolButton("📢", "Broadcast", "text-red-600 bg-red-50/30 border-red-100")}
                {renderToolButton("📊", "Student Reports", "text-teal-600 bg-teal-50/40 border-teal-100")}
                {renderToolButton("🕒", "Attendance History", "text-[#005fb0] bg-blue-50/30 border-blue-100")}
              </div>
            </section>

            {/* Resource Document Asset Manager */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-bold text-gray-800 flex items-center gap-1">
                  <span>📄</span> Worksheet Manager
                </h4>
                <div className="flex items-center gap-4 text-xs font-semibold">
                  <button className="text-[#005fb0] hover:underline">View All</button>
                  <button className="px-3 py-1.5 bg-blue-50 text-[#005fb0] rounded-full border border-blue-100 hover:bg-blue-100/50 transition flex items-center gap-1">
                    <span>➕</span> New Worksheet
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {worksheets.map((doc, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50/30 hover:bg-gray-50 transition cursor-pointer">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg font-bold ${doc.type === 'pdf' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
                      {doc.type === 'pdf' ? '🛑' : '📄'}
                    </div>
                    <div className="flex-1 min-w-0 text-xs">
                      <p className="font-bold text-gray-700 truncate">{doc.name}</p>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-0.5">{doc.date} • {doc.size}</p>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">⋮</button>
                  </div>
                ))}
              </div>
            </section>

            {/* Roster / Roster Grid Section */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h4 className="text-lg font-bold text-gray-800">My Students</h4>
                <div className="relative w-full sm:w-64">
                  <span className="absolute left-3 top-2.5 text-gray-400 text-xs">🔍</span>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search student..."
                    className="w-full pl-8 pr-4 py-1.5 rounded-full bg-gray-50 border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-400/20"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {filteredStudents.map((stud, idx) => (
                  <div key={idx} className="p-4 bg-gray-50/60 border border-gray-100 rounded-xl text-center shadow-inner group cursor-pointer hover:shadow-sm transition">
                    <div className="w-16 h-16 rounded-full mx-auto mb-3 overflow-hidden border-2 border-white group-hover:border-blue-400 transition">
                      <img alt={stud.name} className="w-full h-full object-cover" src={stud.img} />
                    </div>
                    <p className="text-xs font-bold text-gray-700 truncate">{stud.name}</p>
                    <span className={`text-[9px] font-bold uppercase tracking-wider block mt-1 ${stud.isAbsent ? 'text-red-500' : 'text-green-600'}`}>
                      {stud.status}
                    </span>
                  </div>
                ))}
                <div className="p-4 bg-gray-50/60 border border-gray-100 rounded-xl text-center flex flex-col items-center justify-center group cursor-pointer hover:bg-gray-50 transition">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-200 group-hover:bg-blue-100 text-[#005fb0] transition text-sm font-bold">→</div>
                  <p className="text-xs font-bold text-gray-700 mt-2">View All</p>
                  <span className="text-[9px] font-bold uppercase text-gray-400 tracking-wider">Students</span>
                </div>
              </div>
            </section>

          </div>
        </div>

        {/* --- LOWER COMPREHENSIVE COMPONENT GALLERY MANAGER --- */}
        <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4 mt-6">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-bold text-gray-800 flex items-center gap-1">
              <span>🖼</span> Photo Gallery
            </h4>
            <div className="flex gap-2 text-xs font-semibold">
              <button className="px-4 py-2 bg-yellow-50 text-[#725b00] border border-yellow-200 rounded-full hover:bg-yellow-100 transition shadow-sm flex items-center gap-1">
                <span>📤</span> Upload Photo
              </button>
              <button className="px-4 py-2 border border-gray-200 text-gray-500 rounded-full hover:bg-gray-50 transition shadow-sm flex items-center gap-1">
                <span>⚙</span> Manage Photos
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {galleryImages.map((img, idx) => (
              <div key={idx} className="relative aspect-square rounded-xl overflow-hidden shadow-sm border border-gray-100 bg-gray-50 group cursor-pointer">
                <img alt={img.alt} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" src={img.src} />
                <div className="absolute inset-0 bg-blue-900/10 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white text-lg font-bold">🔍</div>
              </div>
            ))}
            <div className="relative aspect-square rounded-xl overflow-hidden border-2 border-dashed border-gray-200 flex flex-col items-center justify-center bg-gray-50/50 cursor-pointer hover:bg-gray-50 transition-all text-gray-400 text-center">
              <span className="text-2xl font-bold">➕</span>
              <span className="text-[10px] font-bold uppercase tracking-wider mt-1">ADD NEW</span>
            </div>
          </div>
        </section>

      </main>

      {/* --- FOOTER BRADING --- */}
      <footer className="bg-gray-50 border-t border-gray-100 py-6 px-10 mt-12">
        <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium">
          <div className="flex items-center gap-2">
            <span className="text-lg text-[#005fb0]">★</span>
            <span className="font-extrabold text-[#005fb0]">Starlight Academy</span>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-gray-400">
            <div className="flex items-center gap-1.5"><span className="w-2 h-2 bg-green-500 rounded-full"></span> 92% Attendance</div>
            <div className="flex items-center gap-1.5"><span className="w-2 h-2 bg-[#005fb0] rounded-full"></span> Session Active</div>
          </div>
        </div>
      </footer>

    </div>
  );
}

// --- CARD PIECE SUB-BUILDERS ---

function renderActionBlock(icon, title, desc, customStyles) {
  return (
    <button className="flex flex-col items-center justify-center gap-3 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition group text-center w-full active:scale-[0.98]">
      <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl group-hover:scale-105 transition-transform ${customStyles}`}>
        {icon}
      </div>
      <div>
        <p className="font-bold text-sm text-gray-700">{title}</p>
        <p className="text-[11px] text-gray-400 mt-0.5">{desc}</p>
      </div>
    </button>
  );
}

// Renders a tool button
function renderToolButton(icon, title, styles) {
  return (
    <button className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all text-center gap-1.5 group active:scale-95 ${styles}`}>
      <span className="text-xl group-hover:scale-110 transition-transform">{icon}</span>
      <span className="text-[11px] font-bold">{title}</span>
    </button>
  );
}
