'use client';

import React, { useState } from 'react';

export default function ParentDashboard() {
  // Pure UI preview toggle state: "BUS", "PICKUP_AUTHORIZED", or "PICKUP_UNAUTHORIZED_OTP"
  const [transportType, setTransportType] = useState('BUS');

  return (
    <div className="bg-[#f9f9ff] text-[#111c2c] min-h-screen font-sans antialiased relative overflow-x-hidden">
      
      {/* --- DEV TESTING CONTROLLER BANNER --- */}
      <div className="fixed bottom-4 left-4 z-50 p-3 bg-white border border-gray-200 rounded-xl shadow-lg flex gap-2 text-xs items-center">
        <span className="font-semibold text-gray-500">🔧 Preview State:</span>
        <button onClick={() => setTransportType('BUS')} className={`px-2 py-1 rounded-md text-[11px] transition active:scale-95 ${transportType === 'BUS' ? 'bg-[#005fb0] text-white' : 'bg-gray-100'}`}>Bus</button>
        <button onClick={() => setTransportType('PICKUP_AUTHORIZED')} className={`px-2 py-1 rounded-md text-[11px] transition active:scale-95 ${transportType === 'PICKUP_AUTHORIZED' ? 'bg-[#725b00] text-white' : 'bg-gray-100'}`}>Authorized</button>
        <button onClick={() => setTransportType('PICKUP_UNAUTHORIZED_OTP')} className={`px-2 py-1 rounded-md text-[11px] transition active:scale-95 ${transportType === 'PICKUP_UNAUTHORIZED_OTP' ? 'bg-[#ba1a1a] text-white' : 'bg-gray-100'}`}>OTP Alert</button>
      </div>

      {/* --- FIXED BACKGROUND FLOATING DECORATIONS --- */}
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
              <a className="text-[#005fb0] font-bold" href="#">Dashboard</a>
              <a className="text-gray-500 hover:bg-gray-50 transition px-3 py-1 rounded-full" href="#">Academics</a>
              <a className="text-gray-500 hover:bg-gray-50 transition px-3 py-1 rounded-full" href="#">Gallery</a>
            </nav>
            <div className="flex items-center gap-4 border-l border-gray-200 pl-6 text-gray-400 text-lg">
              <button className="hover:text-gray-600 transition cursor-pointer">🔔</button>
              <button className="hover:text-gray-600 transition cursor-pointer">✉</button>
              <button className="hover:text-gray-600 transition cursor-pointer">⚙</button>
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-blue-400 ml-2">
                <img alt="Parent" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBa07BBWDRs4vzsgY3546jO9ANrMYJAi88PkZM3BP4qTEbBc8qjLCTB_LcKYuyM57eU_Has6PhtQ8vwtXpX022LlsUOXGdgmYGtJOClshe2RtQVhvQc7QRbxXTJTCnOFWPe1dj6NjIvgC-K31TDTjuxfQIU0ZjTvh__tskrHDM_MBMza4LmSLTWkVKQhSki4J5DLRDLcIwrD7sRdstcSBcVDdB-7uMkHNIXfqc1NjcUXspuu4eAqQ4Y" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* --- MAIN CORE VIEWSPACE CONTAINER --- */}
      <main className="max-w-[1280px] mx-auto px-4 md:px-10 py-8 space-y-8">
        
        {/* Profile Header Greeting */}
        <section className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-3xl font-bold text-[#111c2c]">Hello, <span className="text-[#005fb0]">Sarah!</span></h2>
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold">
                ✓ Present
              </span>
            </div>
            <p className="text-gray-500">Here is a look at Aiden's wonderful day.</p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-6 py-3 bg-white text-[#005fb0] border border-blue-100 rounded-full text-sm font-semibold hover:bg-blue-50/40 transition active:scale-95 shadow-sm">📄 Receipts</button>
            <button className="flex items-center gap-2 px-6 py-3 bg-[#005fb0] text-white rounded-full text-sm font-semibold hover:shadow-lg transition active:scale-95 shadow-[0_4px_12px_rgba(0,95,176,0.3)]">📅 Leave Request</button>
          </div>
        </section>

        {/* Outer Grid Panel Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* --- SIDEBAR: COMPLETE CHILDS SUMMARY BLOCK --- */}
          <div className="lg:col-span-4 rounded-2xl p-6 bg-white border border-gray-100 shadow-sm flex flex-col items-center relative overflow-hidden">
            <div className="absolute top-4 right-4 text-yellow-400 font-bold text-xl select-none">★</div>
            
            <div className="relative w-40 h-40 mb-4 group cursor-pointer">
              <div className="absolute -inset-2 rounded-full border-4 border-dashed border-blue-200 group-hover:rotate-45 transition duration-700"></div>
              <div className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-md">
                <img alt="Aiden" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida/AP1WRLvhG_cknS4gNnT4lBSRHkA7XRVgSIOFyhOVIthwsjU-3QyH3ZIHl7cGIG9byCSCdU82ZMmIWbUefPkgcbVZGfNH9wGyaRX7tYT8ULZKoEexxFqyzoia91zVi2ErtbFUfZe5acp4QXNtlyYMOzp7XcUHLtJC74OjPWMN37RRmq3YI8UU8IdgHe8jC7uu6dlIYIwgJJGSYT8-uiW5SNdk1YD6PgLtv1qKyeGGqNDV-FODGvEc9YmvyQUyRA" />
              </div>
              <div className="absolute bottom-1 right-1 bg-white p-1 rounded-full shadow-lg border border-gray-200 flex -space-x-2">
                <div className="w-8 h-8 rounded-full border-2 border-white bg-blue-400 flex items-center justify-center text-[10px] text-white font-bold">+1</div>
              </div>
            </div>

            <h3 className="text-xl font-bold text-[#111c2c]">Aiden Thompson</h3>
            <div className="px-4 py-1 bg-yellow-50 text-[#725b00] border border-yellow-200 rounded-full mt-2 text-xs font-semibold">🏫 Little Sprouts (Pre-K)</div>
            
            <div className="mt-6 w-full grid grid-cols-2 gap-2 text-sm">
              <div className="bg-gray-50/80 p-3 rounded-xl">
                <p className="text-gray-400 text-xs">Class Teacher</p>
                <p className="font-semibold text-[#005fb0]">Ms. Sarah J.</p>
              </div>
              <div className="bg-gray-50/80 p-3 rounded-xl">
                <p className="text-gray-400 text-xs">Roll Number</p>
                <p className="font-semibold text-[#005fb0]">STU-2024-042</p>
              </div>
            </div>

            {/* Attendance Track Profile Row */}
            <div className="mt-6 w-full border-t border-gray-100 pt-6">
              <p className="text-sm font-bold mb-3">Attendance Summary</p>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div>
                  <p className="text-[10px] uppercase font-bold text-gray-400 mb-1">Today</p>
                  <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-[10px] font-bold">Present</span>
                </div>
                <div className="border-l border-gray-100">
                  <p className="text-[10px] uppercase font-bold text-gray-400 mb-1">Present</p>
                  <p className="font-bold text-[#005fb0]">18 Days</p>
                </div>
                <div className="border-l border-gray-100">
                  <p className="text-[10px] uppercase font-bold text-gray-400 mb-1">Absent</p>
                  <p className="font-bold text-red-500">1 Day</p>
                </div>
              </div>
            </div>

            {/* [ADDED BACK] Contact Channel Roster */}
            <div className="mt-6 w-full border-t border-gray-100 pt-6">
              <p className="text-sm font-bold mb-3">Contact Support</p>
              <div className="space-y-2">
                {renderContactRow("School Office", "+91 98765 43210")}
                {renderContactRow("Ms. Sarah J.", "+91 98765 43211")}
              </div>
            </div>

            {/* [ADDED BACK] Lower Action Highlight Button */}
            <button className="w-full mt-6 py-3 rounded-full border-2 border-blue-200 text-[#005fb0] font-semibold text-sm hover:bg-blue-50/50 transition flex items-center justify-center gap-2">
              🖼 Gallery Highlights
            </button>
          </div>

          {/* --- RIGHT COLUMN: COMPLETE BENTO VIEW TILES --- */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Context Driven Dynamic Routing Card */}
            {renderTransportWidget(transportType)}

            {/* Fee Card */}
            <div className="rounded-2xl p-6 bg-white border border-gray-100 shadow-sm flex flex-col justify-between">
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase">Fee Status (April)</p>
                <h4 className="text-xl font-bold text-[#005fb0] mt-1">Fully Paid</h4>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-50">
                <p className="text-xs text-gray-500">Next payment due on <span className="font-bold text-gray-700">May 5th, 2024</span></p>
                <button className="text-xs text-[#005fb0] font-semibold mt-2 hover:underline inline-flex items-center gap-1">View Statement →</button>
              </div>
            </div>

            {/* Homework Assignment Upload Card */}
            <div className="rounded-2xl p-6 bg-white border border-gray-100 shadow-sm flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <h4 className="text-lg font-bold text-[#111c2c]">Art Homework</h4>
                <span className="bg-red-50 text-red-600 px-3 py-1 rounded-full text-xs font-bold border border-red-100">1 Pending</span>
              </div>
              <p className="text-sm italic text-gray-500 my-2">"Draw your favorite fruit and color it using watercolors."</p>
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 text-center cursor-pointer hover:border-blue-400 transition bg-gray-50/50">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">TAP TO SUBMIT PHOTO</p>
              </div>
            </div>

            {/* [ADDED BACK] Progress Report PDF Trigger Card */}
            <div className="rounded-2xl p-6 bg-white border border-gray-100 shadow-sm flex flex-col justify-between">
              <div>
                <h4 className="text-lg font-bold text-[#111c2c]">Progress & Report Card</h4>
                <p className="text-xs text-gray-400 mt-1">View and download the latest academic performance summary.</p>
              </div>
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 text-center cursor-pointer hover:border-blue-400 transition mt-4 bg-gray-50/50">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">⬇ Download Report Card (PDF)</p>
              </div>
            </div>

            {/* [ADDED BACK] Field Trip Event Announcement Block */}
            <div className="rounded-2xl p-6 bg-white border border-gray-100 shadow-sm flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-lg font-bold text-[#111c2c]">Field Trip</h4>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">Visit to the local City Zoo & Botanical Gardens. Please pack extra water!</p>
                </div>
                <div className="bg-blue-50 border border-blue-100 rounded-xl px-3 py-2 text-center shadow-sm">
                  <span className="block text-lg font-bold text-[#005fb0] leading-none">15</span>
                  <span className="text-[9px] uppercase font-bold text-gray-400 tracking-wider">April</span>
                </div>
              </div>
              <div className="text-right text-gray-100 text-3xl select-none font-bold mt-2">☁</div>
            </div>

            {/* [ADDED BACK] Teacher Correspondence Stream Scroller */}
            <div className="md:col-span-2 rounded-2xl p-6 bg-white border border-gray-100 shadow-sm space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-bold text-gray-800 flex items-center gap-2">💬 Teacher Messages</h4>
                <button className="text-xs text-[#005fb0] font-semibold hover:underline">View All</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {renderTeacherRow("Ms. Sarah J.", "2h", `"Aiden was very helpful in class today..."`, false)}
                {renderTeacherRow("Mr. David (Gym)", "1d", `"Soccer practice was a big hit today!"`, true)}
              </div>
            </div>

          </div>
        </div>

        {/* [ADDED BACK] LOWER FOOTER GALLERY GRID SECTION */}
        <section className="rounded-2xl p-6 bg-white border border-gray-100 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="text-lg font-bold text-[#111c2c]">Captured Moments</h4>
            <button className="text-sm text-[#005fb0] font-semibold hover:underline inline-flex items-center gap-1">Full Gallery →</button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {renderGalleryTile("Story time")}
            {renderGalleryTile("Finger painting")}
            {renderGalleryTile("Gardening")}
            {renderGalleryTile("Block building")}
            {renderGalleryTile("Dress up")}
          </div>
        </section>

      </main>
    </div>
  );
}

// --- HELPER ELEMENT RENDER PIPELINES ---

function renderContactRow(title, detail) {
  return (
    <div className="flex justify-between items-center bg-gray-50 p-3 rounded-xl hover:bg-gray-100/70 transition">
      <div>
        <p className="text-[10px] font-bold text-gray-400 uppercase">{title}</p>
        <p className="text-xs font-semibold text-gray-700 mt-0.5">{detail}</p>
      </div>
      <div className="flex gap-1.5">
        <button className="w-7 h-7 bg-white rounded-full border border-gray-200 text-xs flex items-center justify-center shadow-sm hover:bg-blue-50">📞</button>
        <button className="w-7 h-7 bg-white rounded-full border border-gray-200 text-xs flex items-center justify-center shadow-sm hover:bg-blue-50">💬</button>
      </div>
    </div>
  );
}

function renderTeacherRow(name, time, message, fade) {
  return (
    <div className={`p-3 bg-gray-50/70 rounded-xl flex gap-3 border border-gray-100 hover:bg-gray-50 transition cursor-pointer ${fade ? 'opacity-70' : ''}`}>
      <div className="w-9 h-9 bg-blue-200 text-blue-700 rounded-full flex items-center justify-center text-xs font-bold shadow-sm">{name[0]}</div>
      <div className="flex-1 min-w-0 text-xs">
        <div className="flex justify-between font-semibold text-gray-700">
          <p className="truncate">{name}</p>
          <span className="text-gray-400 font-normal">{time}</span>
        </div>
        <p className="text-gray-400 truncate mt-0.5 italic">{message}</p>
      </div>
    </div>
  );
}

function renderGalleryTile(label) {
  return (
    <div className="aspect-square bg-gray-100 border border-gray-200 rounded-xl relative overflow-hidden group shadow-sm cursor-pointer">
      <div className="absolute inset-0 bg-blue-900/10 flex items-center justify-center group-hover:scale-105 transition duration-500">
        <span className="text-2xl opacity-40 group-hover:opacity-80 transition select-none">🖼</span>
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-black/40 p-2 text-[10px] text-white font-medium truncate backdrop-blur-[2px]">{label}</div>
    </div>
  );
}

// Renders the appropriate transport block
function renderTransportWidget(state) {
  switch (state) {
    case 'BUS':
      return (
        <div className="md:col-span-2 rounded-2xl p-6 bg-white border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase">Transport Tracking</p>
              <h4 className="text-lg font-bold text-[#005fb0]">Bus No. 14 <span className="text-xs font-normal text-gray-400 ml-1">- Evening Route</span></h4>
            </div>
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold border border-green-200">● On the Way</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gray-50 p-4 rounded-xl">
            <div>
              <p className="text-xs text-gray-400">Driver</p>
              <p className="font-bold text-gray-700 text-sm">Rajesh</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Estimated Arrival</p>
              <p className="font-bold text-[#005fb0] text-sm">ETA: 3:45 PM</p>
            </div>
            <button className="px-5 py-2.5 bg-[#005fb0] text-white text-xs rounded-full font-semibold hover:bg-blue-700 transition shadow-sm">📞 Call Driver</button>
          </div>
        </div>
      );

    case 'PICKUP_AUTHORIZED':
      return (
        <div className="md:col-span-2 rounded-2xl p-6 bg-white border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase">Transport: Private Pickup</p>
              <h4 className="text-lg font-bold text-[#005fb0]">Authorized Gate Roster</h4>
            </div>
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold border border-blue-200">● Gate Verified</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 bg-blue-50/40 border border-blue-100 rounded-xl flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-gray-700">Sarah Thompson</p>
                <p className="text-gray-400 mt-0.5">Mother (Primary)</p>
              </div>
              <span className="text-green-600 font-semibold">✓ Ready</span>
            </div>
            <div className="p-3 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-gray-700">John Thompson</p>
                <p className="text-gray-400 mt-0.5">Uncle (Alternate)</p>
              </div>
              <span className="text-green-600 font-semibold">✓ Ready</span>
            </div>
          </div>
        </div>
      );

    case 'PICKUP_UNAUTHORIZED_OTP':
      return (
        <div className="md:col-span-2 rounded-2xl p-6 bg-red-50 border border-red-200 shadow-sm flex flex-col space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs font-bold text-red-600 uppercase tracking-wider">⚠️ Security Alert</p>
              <h4 className="text-lg font-bold text-gray-800">Unverified Alternate Pickup Request</h4>
            </div>
            <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse shadow-sm">ACTION REQUIRED</span>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed">
            An unrecognized individual has arrived at checkout requesting to pick up Aiden. Provide them with this gate authorization code only if you clear this arrangement.
          </p>
          <div className="bg-white border border-red-200 rounded-xl p-4 max-w-xs mx-auto w-full shadow-inner text-center">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Gate Verification OTP</p>
            <p className="text-3xl font-mono font-black text-red-600 tracking-widest mt-1">9 4 2 1</p>
          </div>
        </div>
      );

    default:
      return null;
  }
}
