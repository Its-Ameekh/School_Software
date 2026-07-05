'use client';

import React, { useState, useEffect } from 'react';

export default function ParentDashboard() {
  // --- STATE CORE ENGINE ---
  const [transportType, setTransportType] = useState('BUS');
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
  const [isReceiptsOpen, setIsReceiptsOpen] = useState(false);
  const [leaveDate, setLeaveDate] = useState('');
  const [leaveReason, setLeaveReason] = useState('');
  const [homeworkStatus, setHomeworkStatus] = useState('PENDING'); // PENDING, UPLOADING, SUBMITTED
  const [notices, setNotices] = useState([
    { id: 1, name: "Ms. Sarah J.", time: "2h", message: "Aiden was very helpful in class today...", highlight: false },
    { id: 2, name: "Mr. David (Gym)", time: "1d", message: "Soccer practice was a big hit today!", highlight: false }
  ]);

  // Sync leave requests from localStorage on mount & dynamically append them to the Notice Board
  useEffect(() => {
    const savedLeaves = localStorage.getItem('starlight_leave_requests');
    if (savedLeaves) {
      const parsedLeaves = JSON.parse(savedLeaves);
      const leaveNotices = parsedLeaves.map((leave, index) => ({
        id: `leave-${index}`,
        name: "System Log",
        time: "Saved",
        message: `📝 Leave Scheduled: ${leave.date} - "${leave.reason}" (Pending Approval)`,
        highlight: true
      }));
      setNotices(prev => [...leaveNotices, ...prev.filter(n => !n.highlight)]);
    }

    const savedHomework = localStorage.getItem('starlight_homework_status');
    if (savedHomework) setHomeworkStatus(savedHomework);
  }, []);

  // --- CONTROLLER HANDLERS ---
  const handleLeaveSubmit = (e) => {
    e.preventDefault();
    if (!leaveDate || !leaveReason) return;

    const newLeave = { date: leaveDate, reason: leaveReason };
    const currentLeaves = JSON.parse(localStorage.getItem('starlight_leave_requests') || '[]');
    const updatedLeaves = [newLeave, ...currentLeaves];
    
    // Persist to local storage for the Teacher/Principal views to read
    localStorage.setItem('starlight_leave_requests', JSON.stringify(updatedLeaves));

    // Instant UI update
    setNotices(prev => [
      {
        id: Date.now(),
        name: "System Log",
        time: "Just Now",
        message: `📝 Leave Scheduled: ${leaveDate} - "${leaveReason}" (Pending Approval)`,
        highlight: true
      },
      ...prev
    ]);

    setIsLeaveModalOpen(false);
    setLeaveDate('');
    setLeaveReason('');
  };

  const handleHomeworkUpload = () => {
    if (homeworkStatus === 'SUBMITTED') return;
    setHomeworkStatus('UPLOADING');
    
    // Simulate web latency network upload
    setTimeout(() => {
      setHomeworkStatus('SUBMITTED');
      localStorage.setItem('starlight_homework_status', 'SUBMITTED');
    }, 1500);
  };

  const resetHomeworkState = () => {
    setHomeworkStatus('PENDING');
    localStorage.setItem('starlight_homework_status', 'PENDING');
  };

  return (
    <div className="bg-[#f9f9ff] text-[#111c2c] min-h-screen font-sans antialiased relative pb-12">
      
      {/* 🔧 PREVIEW STATE FLOATER CONTROLLER */}
      <div className="fixed bottom-4 left-4 z-50 p-3 bg-white border border-gray-200 rounded-xl shadow-lg flex gap-2 text-xs items-center">
        <span className="font-semibold text-gray-500">🔧 Preview State:</span>
        <button onClick={() => setTransportType('BUS')} className={`px-2 py-1 rounded-md text-[11px] font-bold ${transportType === 'BUS' ? 'bg-[#005fb0] text-white' : 'bg-gray-100'}`}>Bus</button>
        <button onClick={() => setTransportType('PICKUP_AUTHORIZED')} className={`px-2 py-1 rounded-md text-[11px] font-bold ${transportType === 'PICKUP_AUTHORIZED' ? 'bg-[#735c00] text-white' : 'bg-gray-100'}`}>Authorized</button>
        <button onClick={() => setTransportType('PICKUP_UNAUTHORIZED_OTP')} className={`px-2 py-1 rounded-md text-[11px] font-bold ${transportType === 'PICKUP_UNAUTHORIZED_OTP' ? 'bg-[#ba1a1a] text-white' : 'bg-gray-100'}`}>OTP Alert</button>
      </div>

      {/* 📅 LEAVE REQUEST MODAL POPUP */}
      {isLeaveModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full border border-gray-100 shadow-xl">
            <h3 className="text-lg font-bold text-gray-800 mb-2">📅 Request Student Leave</h3>
            <form onSubmit={handleLeaveSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Date of Absence</label>
                <input type="date" required value={leaveDate} onChange={(e) => setLeaveDate(e.target.value)} className="w-full p-2.5 bg-gray-50 border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-400/20" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Reason</label>
                <textarea required rows="3" placeholder="State reason (e.g., Medical family visit)" value={leaveReason} onChange={(e) => setLeaveReason(e.target.value)} className="w-full p-2.5 bg-gray-50 border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-400/20" />
              </div>
              <div className="flex gap-2 justify-end text-xs font-semibold">
                <button type="button" onClick={() => setIsLeaveModalOpen(false)} className="px-4 py-2 bg-gray-100 text-gray-600 rounded-full">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-[#005fb0] text-white rounded-full">Submit Request</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- TOP NAVBAR --- */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-40 w-full shadow-sm border-b border-gray-100">
        <div className="flex justify-between items-center w-full px-6 md:px-10 h-20 max-w-[1280px] mx-auto">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-[#005fb0] font-bold text-xl">★</div>
            <h1 className="text-xl font-bold tracking-tight text-[#005fb0]">Starlight Academy</h1>
          </div>
          <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full font-bold">Parent View</span>
        </div>
      </header>

      {/* --- MAIN MAIN CONTAINER --- */}
      <main className="max-w-[1280px] mx-auto px-4 md:px-10 py-8 space-y-8">
        
        {/* Core Profile Context Top Greeting */}
        <section className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4 relative">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-3xl font-bold text-[#111c2c]">Hello, <span className="text-[#005fb0]">Sarah!</span></h2>
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold">✓ Present</span>
            </div>
            <p className="text-gray-500 text-sm">Here is a look at Aiden's wonderful day.</p>
          </div>
          
          <div className="flex gap-2 relative">
            <button onClick={() => setIsReceiptsOpen(!isReceiptsOpen)} className="px-6 py-3 bg-white text-[#005fb0] border border-blue-100 rounded-full text-sm font-semibold hover:bg-gray-50 transition active:scale-95 shadow-sm">
              📄 Receipts {isReceiptsOpen ? '▲' : '▼'}
            </button>
            <button onClick={() => setIsLeaveModalOpen(true)} className="px-6 py-3 bg-[#005fb0] text-white rounded-full text-sm font-semibold hover:shadow-lg transition active:scale-95 shadow-[0_4px_12px_rgba(0,95,176,0.3)]">
              📅 Leave Request
            </button>

            {/* Receipts Dropdown Box Overlay */}
            {isReceiptsOpen && (
              <div className="absolute top-14 left-0 w-64 bg-white border border-gray-100 shadow-xl rounded-2xl p-4 z-30 space-y-2 text-xs">
                <p className="font-bold text-gray-700 border-b pb-2">Tuition Invoice Receipts</p>
                <div className="flex justify-between py-1"><span>🧾 INV-2026-089</span> <span className="text-green-600 font-bold">Paid</span></div>
                <div className="flex justify-between py-1"><span>🧾 INV-2026-044</span> <span className="text-green-600 font-bold">Paid</span></div>
              </div>
            )}
          </div>
        </section>

        {/* Dynamic Inner Layout Bento Grid Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT CHUNKY SIDEBAR: STUDENT PROFILE CARD */}
          <div className="lg:col-span-4 rounded-2xl p-6 bg-white border border-gray-100 shadow-sm flex flex-col items-center text-center">
            <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-md mb-4">
              <img alt="Aiden" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida/AP1WRLvhG_cknS4gNnT4lBSRHkA7XRVgSIOFyhOVIthwsjU-3QyH3ZIHl7cGIG9byCSCdU82ZMmIWbUefPkgcbVZGfNH9wGyaRX7tYT8ULZKoEexxFqyzoia91zVi2ErtbFUfZe5acp4QXNtlyYMOzp7XcUHLtJC74OjPWMN37RRmq3YI8UU8IdgHe8jC7uu6dlIYIwgJJGSYT8-uiW5SNdk1YD6PgLtv1qKyeGGqNDV-FODGvEc9YmvyQUyRA" />
            </div>
            <h3 className="text-xl font-bold text-[#111c2c]">Aiden Thompson</h3>
            <div className="px-4 py-1 bg-yellow-50 text-[#725b00] border border-yellow-200 rounded-full mt-2 text-xs font-semibold">🏫 Little Sprouts (Pre-K)</div>
            
            <div className="mt-6 w-full grid grid-cols-2 gap-2 text-xs">
              <div className="bg-gray-50 p-3 rounded-xl"><p className="text-gray-400">Class Teacher</p><p className="font-semibold text-[#005fb0]">Ms. Sarah J.</p></div>
              <div className="bg-gray-50 p-3 rounded-xl"><p className="text-gray-400">Roll Number</p><p className="font-semibold text-[#005fb0]">STU-2024-042</p></div>
            </div>
          </div>

          {/* RIGHT ACTION MODULE TILES */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Dynamic Interactive Transport Card Module */}
            {renderTransportStateCard(transportType)}

            {/* Fee Card Module */}
            <div className="rounded-2xl p-6 bg-white border border-gray-100 shadow-sm">
              <p className="text-xs font-semibold text-gray-400 uppercase">Fee Status (April)</p>
              <h4 className="text-xl font-bold text-[#005fb0] mt-1">Fully Paid</h4>
              <p className="text-xs text-gray-500 mt-4 pt-4 border-t border-gray-50">Next payment milestone due on <span className="font-bold text-gray-700">May 5th, 2024</span></p>
            </div>

            {/* Interactive Homework Drag/Click Simulator Module */}
            <div className="rounded-2xl p-6 bg-white border border-gray-100 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start">
                  <h4 className="text-md font-bold text-[#111c2c]">Art Homework</h4>
                  {homeworkStatus === 'SUBMITTED' && <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full">Submitted</span>}
                </div>
                <p className="text-xs italic text-gray-400 mt-1">"Draw your favorite fruit and color it using watercolors."</p>
              </div>

              <div className="mt-4">
                {homeworkStatus === 'PENDING' && (
                  <button onClick={handleHomeworkUpload} className="w-full py-4 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50 text-center font-bold text-[10px] text-gray-400 uppercase hover:border-blue-400 tracking-wider transition">
                    📁 Tap to Upload Photo Assignment
                  </button>
                )}
                {homeworkStatus === 'UPLOADING' && (
                  <div className="w-full py-4 bg-blue-50/50 rounded-xl text-center text-xs text-[#005fb0] font-semibold animate-pulse">
                    ⏳ Processing Upload...
                  </div>
                )}
                {homeworkStatus === 'SUBMITTED' && (
                  <div className="space-y-2">
                    <div className="w-full py-3 bg-green-50 text-green-700 rounded-xl text-center text-xs font-bold">
                      ✓ Assignment Uploaded Successfully
                    </div>
                    <button onClick={resetHomeworkState} className="text-[10px] text-red-500 hover:underline block mx-auto font-medium">Reset Assignment</button>
                  </div>
                )}
              </div>
            </div>

            {/* Reactive Notice Stream Feed */}
            <div className="md:col-span-2 rounded-2xl p-6 bg-white border border-gray-100 shadow-sm space-y-4">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">💬 Correspondence Notice Board</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {notices.map((msg) => (
                  <div key={msg.id} className={`p-3 rounded-xl flex gap-3 border transition-all duration-300 ${msg.highlight ? 'bg-blue-50/50 border-blue-100' : 'bg-gray-50/70 border-gray-100'}`}>
                    <div className="w-8 h-8 bg-blue-100 text-[#005fb0] rounded-full flex items-center justify-center text-xs font-bold shrink-0">{msg.name[0]}</div>
                    <div className="text-xs min-w-0 flex-1">
                      <div className="flex justify-between font-semibold text-gray-700">
                        <p className="truncate font-bold">{msg.name}</p><span className="text-gray-400 font-normal text-[10px]">{msg.time}</span>
                      </div>
                      <p className="text-gray-500 mt-0.5 italic leading-relaxed">{msg.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}

// --- DYNAMIC SUB-VIEW TEMPLATE RENDERER ---
function renderTransportStateCard(state) {
  switch (state) {
    case 'BUS':
      return (
        <div className="md:col-span-2 rounded-2xl p-6 bg-white border border-gray-100 shadow-sm space-y-3">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase">Transport Tracking</p>
              <h4 className="text-lg font-bold text-[#005fb0]">Bus No. 14 <span className="text-xs font-normal text-gray-400">- Evening</span></h4>
            </div>
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">● On the Way</span>
          </div>
          <div className="flex justify-between bg-gray-50 p-4 rounded-xl text-xs items-center">
            <div><p className="text-gray-400">Driver</p><p className="font-bold text-gray-700">Rajesh</p></div>
            <div><p className="text-gray-400">Estimated Arrival</p><p className="font-bold text-[#005fb0]">ETA: 3:45 PM</p></div>
            <button className="px-4 py-2 bg-[#005fb0] text-white rounded-full font-bold shadow-sm" onClick={() => alert('Dialing Driver Rajesh (+91 98765-XXXXX)...')}>📞 Call</button>
          </div>
        </div>
      );
    case 'PICKUP_AUTHORIZED':
      return (
        <div className="md:col-span-2 rounded-2xl p-6 bg-white border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase">Private Transport</p>
              <h4 className="text-lg font-bold text-[#735c00]">Authorized Gate Roster</h4>
            </div>
            <span className="bg-yellow-100 text-[#735c00] px-3 py-1 rounded-full text-xs font-bold">● Roster Active</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-yellow-50/40 border border-yellow-100 rounded-xl"><strong>Sarah Thompson</strong><p className="text-gray-400 mt-0.5">Mother (Primary)</p></div>
            <div className="p-3 bg-gray-50 border border-gray-100 rounded-xl"><strong>John Thompson</strong><p className="text-gray-400 mt-0.5">Uncle (Alternate)</p></div>
          </div>
        </div>
      );
    case 'PICKUP_UNAUTHORIZED_OTP':
      return (
        <div className="md:col-span-2 rounded-2xl p-6 bg-red-50 border border-red-200 shadow-sm space-y-3 animate-in fade-in duration-300">
          <div className="flex justify-between items-center">
            <h4 className="text-md font-bold text-red-700 flex items-center gap-1">⚠️ Security Alert: Unverified Alternate Pickup</h4>
            <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse">ACTION REQUIRED</span>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed">An unrecognized individual has arrived at checkout requesting to pick up Aiden. Provide them with this gate code only if you clear this arrangement:</p>
          <div className="bg-white border border-red-200 rounded-xl p-3 text-center font-mono font-black text-3xl text-red-600 tracking-widest shadow-inner">9 4 2 1</div>
        </div>
      );
    default:
      return null;
  }
}