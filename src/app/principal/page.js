'use client';

import React from 'react';

export default function PrincipalDashboard() {
  return (
    <div className="bg-[#f9f9ff] text-[#111c2c] min-h-screen font-sans antialiased relative overflow-x-hidden">
      
      {/* --- FIXED BACKGROUND DECORATIONS --- */}
      <div className="fixed top-24 left-12 text-yellow-400/20 pointer-events-none select-none text-6xl font-bold animate-pulse">★</div>
      <div className="fixed bottom-24 right-12 text-blue-400/10 pointer-events-none select-none text-8xl font-bold">☁</div>

      {/* --- TOP HEADER NAVIGATION --- */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 w-full shadow-sm border-b border-gray-100">
        <div className="flex justify-between items-center w-full px-6 md:px-10 h-20 max-w-[1280px] mx-auto">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-[#005fb0]">
              <span className="text-xl font-bold">★</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight text-[#005fb0]">Starlight Academy</h1>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <nav className="flex gap-8 font-medium">
              <a className="text-[#005fb0] font-bold" href="#">Principal Portal</a>
              <a className="text-gray-500 hover:bg-gray-50 transition px-3 py-1 rounded-full" href="#">Classes</a>
              <a className="text-gray-500 hover:bg-gray-50 transition px-3 py-1 rounded-full" href="#">Finance</a>
            </nav>
            <div className="flex items-center gap-4 border-l border-gray-200 pl-6 text-gray-400 text-lg">
              <button className="hover:text-gray-600 transition cursor-pointer">🔔</button>
              <button className="hover:text-gray-600 transition cursor-pointer">⚙</button>
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-blue-400 ml-2">
                <img alt="Principal" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBa07BBWDRs4vzsgY3546jO9ANrMYJAi88PkZM3BP4qTEbBc8qjLCTB_LcKYuyM57eU_Has6PhtQ8vwtXpX022LlsUOXGdgmYGtJOClshe2RtQVhvQc7QRbxXTJTCnOFWPe1dj6NjIvgC-K31TDTjuxfQIU0ZjTvh__tskrHDM_MBMza4LmSLTWkVKQhSki4J5DLRDLcIwrD7sRdstcSBcVDdB-7uMkHNIXfqc1NjcUXspuu4eAqQ4Y" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* --- MAIN CORE CONTAINER --- */}
      <main className="max-w-[1280px] mx-auto px-4 md:px-10 py-8 space-y-8">
        
        {/* 1. Welcome Header Banner */}
        <header className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-6 p-8 bg-blue-50/50 border border-blue-100 rounded-2xl overflow-hidden shadow-sm">
          <div className="z-10">
            <p className="text-xs font-bold text-[#005fb0] uppercase tracking-widest mb-1">Management Portal</p>
            <h2 className="text-3xl font-extrabold text-[#111c2c]">Good Morning, Principal</h2>
            <div className="flex flex-wrap gap-4 mt-3 text-gray-500 text-xs font-medium">
              <span className="flex items-center gap-1">📅 Monday, October 23, 2023</span>
              <span className="flex items-center gap-1">🏫 Academic Year 2023-24</span>
            </div>
          </div>
        </header>

        {/* 2. Quick Stats Bento Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {renderStatCard("👶 Total Students", "124", "+12%", "8 new admissions this month")}
          {renderStatCard("👨🏫 Teachers", "18", "Stable", "2 on leave today")}
          {renderStatCard("🏫 Active Classes", "12", "Active", "3 sections per age group")}
          {renderStatCard("📊 Attendance Rate", "94%", "Optimal", "Above monthly average")}
          {renderStatCard("💰 Fees Collected", "82%", "Pending", "$12,400 outstanding")}
          {renderStatCard("🚌 Transport Fleet", "06", "Normal", "All routes on time")}
          {renderStatCard("📝 Pending Admissions", "14", "Review", "Requires attention by Friday")}
          {renderStatCard("🎨 Inventory Items", "24", "Low Stock", "Art supplies need restock")}
        </section>

        {/* 3. Operational Overview splits */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Attendance Summary widget */}
          <div className="rounded-2xl p-6 bg-white border border-gray-100 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-gray-800">Attendance Summary</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4 bg-gray-50 p-3 rounded-xl">
                <div className="w-12 h-12 rounded-full border-4 border-green-400 flex items-center justify-center font-bold text-green-700 text-sm">94%</div>
                <div>
                  <p className="text-sm font-bold text-gray-700">Student Attendance</p>
                  <p className="text-xs text-gray-400">116 of 124 present</p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-gray-50 p-3 rounded-xl">
                <div className="w-12 h-12 rounded-full border-4 border-blue-400 flex items-center justify-center font-bold text-[#005fb0] text-sm">89%</div>
                <div>
                  <p className="text-sm font-bold text-gray-700">Teacher Attendance</p>
                  <p className="text-xs text-gray-400">16 of 18 present</p>
                </div>
              </div>
            </div>
          </div>

          {/* Announcements Module */}
          <div className="rounded-2xl p-6 bg-white border border-gray-100 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-800">Announcements</h3>
              <button className="text-xs text-[#005fb0] font-semibold hover:underline">View All</button>
            </div>
            <div className="space-y-3">
              <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-xs">
                <span className="bg-red-200 text-red-700 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase">Holiday</span>
                <p className="font-semibold text-gray-700 mt-1">Dusshera Break starting Friday</p>
                <p className="text-[10px] text-gray-400 mt-0.5">Shared with: Parents, Staff</p>
              </div>
              <div className="p-3 bg-blue-50/50 border border-blue-100 rounded-xl text-xs">
                <span className="bg-blue-200 text-[#005fb0] px-1.5 py-0.5 rounded text-[9px] font-bold uppercase">Health</span>
                <p className="font-semibold text-gray-700 mt-1">Annual Health Checkup Week</p>
                <p className="text-[10px] text-gray-400 mt-0.5">Starting Nov 1st</p>
              </div>
            </div>
          </div>

          {/* Upcoming Events Module */}
          <div className="rounded-2xl p-6 bg-white border border-gray-100 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-gray-800">Upcoming Events</h3>
            <div className="space-y-3">
              {renderEventItem("25", "Oct", "Parent Teacher Meet", "09:00 AM - 12:00 PM")}
              {renderEventItem("28", "Oct", "Halloween Parade", "03:30 PM Onwards")}
            </div>
          </div>
        </div>

        {/* 4. Finance Summary Cards */}
        <section className="rounded-2xl p-6 bg-white border border-gray-100 shadow-sm">
          <div className="flex flex-col md:flex-row gap-8 justify-between">
            <div className="flex-1 space-y-4">
              <div>
                <h3 className="text-lg font-bold text-gray-800">Finance Overview</h3>
                <p className="text-xs text-gray-400 mt-0.5">Academic Quarter Q3 Summary</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-xl space-y-2">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Collection Progress</p>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-3 bg-white border rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 w-[82%] rounded-full"></div>
                    </div>
                    <span className="text-sm font-bold text-emerald-600">82%</span>
                  </div>
                </div>

                <div className="bg-red-50/60 border border-red-100 p-4 rounded-xl flex justify-between items-center">
                  <div>
                    <p className="text-xs text-gray-500">Outstanding Amount</p>
                    <p className="text-xl font-bold text-red-600 mt-0.5">$12,450.00</p>
                  </div>
                  <span className="text-xl">⚠️</span>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Recent Transactions</p>
                <div className="border border-gray-100 rounded-xl divide-y divide-gray-50 bg-white">
                  {renderTransactionRow("Vihaan Reddy", "#99281", "+$1,200.00", "Today, 10:45 AM")}
                  {renderTransactionRow("Anya Gupta", "#99279", "+$1,200.00", "Today, 09:15 AM")}
                </div>
              </div>
            </div>

            <div className="md:w-1/3 border border-gray-100 rounded-xl p-6 flex flex-col items-center justify-center text-center bg-gray-50/50">
              <div className="text-4xl font-black text-[#005fb0] mb-2">82%</div>
              <h4 className="text-sm font-bold text-gray-800">Collection Target Status</h4>
              <p className="text-xs text-gray-400 mt-1 max-w-[200px]">We are currently $2,100 away from our monthly collection goal milestone.</p>
              <button className="w-full mt-6 py-2.5 bg-[#005fb0] text-white rounded-full text-xs font-semibold hover:bg-blue-700 transition shadow-sm">Generate Report</button>
            </div>
          </div>
        </section>

        {/* 5. Quick Operations Grid */}
        <section className="space-y-4">
          <h3 className="text-lg font-bold text-gray-800">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {renderActionButton("➕ Add Student", "bg-[#005fb0] text-white hover:bg-blue-700")}
            {renderActionButton("💼 Add Teacher", "bg-blue-50 text-[#005fb0] border border-blue-100 hover:bg-blue-100/60")}
            {renderActionButton("📢 Send Alert", "bg-red-50 text-red-700 border border-red-100 hover:bg-red-100/60")}
            {renderActionButton("📊 Daily Report", "bg-gray-800 text-white hover:bg-gray-900")}
          </div>
        </section>

      </main>
    </div>
  );
}

// --- MICRO LAYOUT FUNCTIONS ---

function renderStatCard(title, val, label, footer) {
  return (
    <div className="rounded-2xl p-5 bg-white border border-gray-100 shadow-sm flex flex-col justify-between">
      <div className="flex justify-between items-start">
        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{title}</span>
        <span className="text-[10px] bg-blue-50 text-[#005fb0] font-bold px-2 py-0.5 rounded-full border border-blue-100">{label}</span>
      </div>
      <div className="mt-3">
        <h4 className="text-2xl font-black text-gray-800">{val}</h4>
        <p className="text-[11px] text-gray-400 mt-1 border-t border-gray-50 pt-2">{footer}</p>
      </div>
    </div>
  );
}

function renderEventItem(day, month, title, time) {
  return (
    <div className="flex gap-4 p-3 hover:bg-gray-50 border border-transparent hover:border-gray-100 rounded-xl transition">
      <div className="w-10 h-10 bg-blue-50 text-[#005fb0] border border-blue-100 rounded-xl flex flex-col items-center justify-center shrink-0">
        <span className="text-sm font-bold leading-none">{day}</span>
        <span className="text-[8px] uppercase font-bold text-gray-400 tracking-wider mt-0.5">{month}</span>
      </div>
      <div className="text-xs min-w-0">
        <p className="font-bold text-gray-700 truncate">{title}</p>
        <p className="text-gray-400 mt-0.5">{time}</p>
      </div>
    </div>
  );
}

function renderTransactionRow(name, tid, amt, timestamp) {
  return (
    <div className="flex justify-between items-center p-3 text-xs">
      <div>
        <p className="font-bold text-gray-700">{name}</p>
        <p className="text-[9px] text-gray-400">ID: {tid}</p>
      </div>
      <div className="text-right">
        <p className="font-bold text-emerald-600">{amt}</p>
        <p className="text-[9px] text-gray-400">{timestamp}</p>
      </div>
    </div>
  );
}

function renderActionButton(label, classStyles) {
  return (
    <button className={`p-5 rounded-2xl font-bold text-sm shadow-sm transition active:scale-95 text-center ${classStyles}`}>
      {label}
    </button>
  );
}
