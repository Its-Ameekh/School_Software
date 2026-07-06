'use client';

import React, { useState } from 'react';

export default function PrincipalDashboard() {
  // Navigation & View Mode State
  // viewMode: "OPERATIONS" or "FINANCE"
  const [viewMode, setViewMode] = useState('OPERATIONS');
  
  // Finance Navigation Tiers State
  // financeTier: "HOME" (Tier 1), "CLASSES" (Tier 2), "ROSTER" (Tier 3)
  const [financeTier, setFinanceTier] = useState('HOME');
  
  // financeType: "TUITION" or "TRANSPORT"
  const [financeType, setFinanceType] = useState('TUITION');
  
  // Selected Class in Tier 2
  const [selectedClass, setSelectedClass] = useState('');
  
  // Student Search query in Tier 3
  const [searchQuery, setSearchQuery] = useState('');

  // --- CRUD STATE ARRAYS (Mandate 1) ---
  const [announcements, setAnnouncements] = useState([
    { id: 1, text: "Dusshera Break starting Friday", category: "Holiday" },
    { id: 2, text: "Annual Health Checkup Week", category: "Health" }
  ]);

  const [events, setEvents] = useState([
    { id: 1, title: "Parent Teacher Meet", day: "25", month: "Oct", time: "09:00 AM - 12:00 PM" },
    { id: 2, title: "Halloween Parade", day: "28", month: "Oct", time: "03:30 PM Onwards" }
  ]);

  // Modal Visibility State
  const [showAnnounceModal, setShowAnnounceModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);

  // New Item Form States
  const [newAnnounceText, setNewAnnounceText] = useState('');
  const [newAnnounceCat, setNewAnnounceCat] = useState('General');
  
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventDay, setNewEventDay] = useState('');
  const [newEventMonth, setNewEventMonth] = useState('Oct');
  const [newEventTime, setNewEventTime] = useState('');

  // --- STUDENT LEDGER DATABASE STATE (Mandate 2) ---
  const [studentsList, setStudentsList] = useState([
    // Little Sprouts (Pre-K)
    { name: "Aiden Thompson", roll: "STU-2024-042", class: "Little Sprouts (Pre-K)", tuitionDue: 1200, tuitionStatus: "Paid", usesTransport: true, transportDue: 150, transportStatus: "Paid" },
    { name: "Vihaan Reddy", roll: "STU-2024-081", class: "Little Sprouts (Pre-K)", tuitionDue: 1200, tuitionStatus: "Paid", usesTransport: true, transportDue: 150, transportStatus: "Pending" },
    { name: "Anya Gupta", roll: "STU-2024-079", class: "Little Sprouts (Pre-K)", tuitionDue: 1200, tuitionStatus: "Paid", usesTransport: false, transportDue: 0, transportStatus: "Paid" },
    { name: "Liam Carter", roll: "STU-2024-012", class: "Little Sprouts (Pre-K)", tuitionDue: 1200, tuitionStatus: "Pending", usesTransport: true, transportDue: 150, transportStatus: "Pending" },
    { name: "Olivia Vance", roll: "STU-2024-033", class: "Little Sprouts (Pre-K)", tuitionDue: 1200, tuitionStatus: "Pending", usesTransport: false, transportDue: 0, transportStatus: "Paid" },

    // Kindergarten
    { name: "Leo Miller", roll: "STU-2024-051", class: "Kindergarten", tuitionDue: 1500, tuitionStatus: "Paid", usesTransport: true, transportDue: 150, transportStatus: "Paid" },
    { name: "Sophia White", roll: "STU-2024-062", class: "Kindergarten", tuitionDue: 1500, tuitionStatus: "Pending", usesTransport: true, transportDue: 150, transportStatus: "Pending" },
    { name: "Mia Hamm", roll: "STU-2024-099", class: "Kindergarten", tuitionDue: 1500, tuitionStatus: "Paid", usesTransport: false, transportDue: 0, transportStatus: "Paid" },
    { name: "Ethan Hunt", roll: "STU-2024-101", class: "Kindergarten", tuitionDue: 1500, tuitionStatus: "Paid", usesTransport: true, transportDue: 150, transportStatus: "Paid" },

    // Class 1
    { name: "Noah Sterling", roll: "STU-2024-121", class: "Class 1", tuitionDue: 1800, tuitionStatus: "Paid", usesTransport: true, transportDue: 150, transportStatus: "Pending" },
    { name: "Emma Watson", roll: "STU-2024-122", class: "Class 1", tuitionDue: 1800, tuitionStatus: "Paid", usesTransport: false, transportDue: 0, transportStatus: "Paid" },
    { name: "Lucas Scott", roll: "STU-2024-123", class: "Class 1", tuitionDue: 1800, tuitionStatus: "Pending", usesTransport: true, transportDue: 150, transportStatus: "Pending" },
    { name: "Ava DuVernay", roll: "STU-2024-124", class: "Class 1", tuitionDue: 1800, tuitionStatus: "Paid", usesTransport: true, transportDue: 150, transportStatus: "Paid" }
  ]);

  // Classes list
  const classesList = ["Little Sprouts (Pre-K)", "Kindergarten", "Class 1"];

  // --- HANDLERS (Mandate 1) ---
  const handleDeleteAnnouncement = (id) => {
    setAnnouncements(announcements.filter(item => item.id !== id));
  };

  const handleDeleteEvent = (id) => {
    setEvents(events.filter(item => item.id !== id));
  };

  const handleAddAnnouncement = (e) => {
    e.preventDefault();
    if (!newAnnounceText.trim()) return;
    const newId = announcements.length > 0 ? Math.max(...announcements.map(a => a.id)) + 1 : 1;
    setAnnouncements([...announcements, { id: newId, text: newAnnounceText, category: newAnnounceCat }]);
    setNewAnnounceText('');
    setNewAnnounceCat('General');
    setShowAnnounceModal(false);
  };

  const handleAddEvent = (e) => {
    e.preventDefault();
    if (!newEventTitle.trim() || !newEventDay.trim() || !newEventTime.trim()) return;
    const newId = events.length > 0 ? Math.max(...events.map(ev => ev.id)) + 1 : 1;
    setEvents([...events, { id: newId, title: newEventTitle, day: newEventDay, month: newEventMonth, time: newEventTime }]);
    setNewEventTitle('');
    setNewEventDay('');
    setNewEventMonth('Oct');
    setNewEventTime('');
    setShowEventModal(false);
  };

  // --- FINANCE OPERATIONS (Mandate 2) ---
  const handleCollectFees = (roll, type) => {
    setStudentsList(prevStudents =>
      prevStudents.map(student => {
        if (student.roll === roll) {
          if (type === 'TUITION') {
            return { ...student, tuitionStatus: 'Paid' };
          } else if (type === 'TRANSPORT') {
            return { ...student, transportStatus: 'Paid' };
          }
        }
        return student;
      })
    );
  };

  // Finance Dynamic Calculations
  const totalTuitionCollected = studentsList
    .filter(s => s.tuitionStatus === 'Paid')
    .reduce((sum, s) => sum + s.tuitionDue, 0);

  const totalTransportCollected = studentsList
    .filter(s => s.usesTransport && s.transportStatus === 'Paid')
    .reduce((sum, s) => sum + s.transportDue, 0);

  const outstandingBalanceArrears = studentsList
    .reduce((sum, s) => {
      const tuitionArrear = s.tuitionStatus === 'Pending' ? s.tuitionDue : 0;
      const transportArrear = (s.usesTransport && s.transportStatus === 'Pending') ? s.transportDue : 0;
      return sum + tuitionArrear + transportArrear;
    }, 0);

  // Return standard category color classes for announcements
  const getAnnounceCategoryBadge = (category) => {
    switch (category) {
      case 'Holiday':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'Health':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Academic':
        return 'bg-green-100 text-green-700 border-green-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

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
              <button 
                onClick={() => { setViewMode('OPERATIONS'); setFinanceTier('HOME'); }} 
                className={`text-sm px-3 py-1.5 rounded-full transition ${viewMode === 'OPERATIONS' ? 'text-[#005fb0] font-bold bg-blue-50' : 'text-gray-500 hover:bg-gray-50'}`}
              >
                Principal Portal
              </button>
              <button 
                onClick={() => { setViewMode('FINANCE'); setFinanceTier('HOME'); }} 
                className={`text-sm px-3 py-1.5 rounded-full transition ${viewMode === 'FINANCE' ? 'text-[#005fb0] font-bold bg-blue-50' : 'text-gray-500 hover:bg-gray-50'}`}
              >
                Finance
              </button>
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
            <h2 className="text-3xl font-extrabold text-[#111c2c]">
              {viewMode === 'OPERATIONS' ? 'Good Morning, Principal' : 'Financial Ledger Console'}
            </h2>
            <div className="flex flex-wrap gap-4 mt-3 text-gray-500 text-xs font-medium">
              <span className="flex items-center gap-1">📅 Monday, October 23, 2023</span>
              <span className="flex items-center gap-1">🏫 Academic Year 2023-24</span>
            </div>
          </div>
        </header>

        {/* --- VIEW MODE CONDITIONAL RENDER --- */}
        {viewMode === 'OPERATIONS' ? (
          <>
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

              {/* Announcements Module (CRUD Mandate 1) */}
              <div className="rounded-2xl p-6 bg-white border border-gray-100 shadow-sm space-y-4">
                <div className="flex justify-between items-center border-b border-gray-50 pb-2">
                  <h3 className="text-lg font-bold text-gray-800 flex items-center gap-1.5">
                    <span>📢</span> Announcements
                  </h3>
                  <button 
                    onClick={() => setShowAnnounceModal(true)}
                    className="w-7 h-7 bg-blue-50 text-[#005fb0] hover:bg-blue-100 rounded-full flex items-center justify-center font-bold text-lg transition active:scale-90"
                  >
                    +
                  </button>
                </div>
                
                {announcements.length === 0 ? (
                  <p className="text-xs text-gray-400 py-4 text-center">No announcements listed.</p>
                ) : (
                  <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
                    {announcements.map(item => (
                      <div key={item.id} className="p-3 bg-gray-50 border border-gray-100 rounded-xl text-xs relative group flex flex-col items-start gap-1">
                        <button 
                          onClick={() => handleDeleteAnnouncement(item.id)}
                          className="absolute top-2 right-2 text-gray-400 hover:text-red-500 font-bold text-sm transition"
                        >
                          ×
                        </button>
                        <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase border ${getAnnounceCategoryBadge(item.category)}`}>
                          {item.category}
                        </span>
                        <p className="font-semibold text-gray-700 mt-0.5 pr-4 leading-normal">{item.text}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Upcoming Events Module (CRUD Mandate 1) */}
              <div className="rounded-2xl p-6 bg-white border border-gray-100 shadow-sm space-y-4">
                <div className="flex justify-between items-center border-b border-gray-50 pb-2">
                  <h3 className="text-lg font-bold text-gray-800 flex items-center gap-1.5">
                    <span>📅</span> Upcoming Events
                  </h3>
                  <button 
                    onClick={() => setShowEventModal(true)}
                    className="w-7 h-7 bg-blue-50 text-[#005fb0] hover:bg-blue-100 rounded-full flex items-center justify-center font-bold text-lg transition active:scale-90"
                  >
                    +
                  </button>
                </div>
                
                {events.length === 0 ? (
                  <p className="text-xs text-gray-400 py-4 text-center">No upcoming events scheduled.</p>
                ) : (
                  <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
                    {events.map(item => (
                      <div key={item.id} className="flex gap-4 p-3 bg-gray-50 border border-gray-100 rounded-xl transition relative group">
                        <button 
                          onClick={() => handleDeleteEvent(item.id)}
                          className="absolute top-2 right-2 text-gray-400 hover:text-red-500 font-bold text-sm transition"
                        >
                          ×
                        </button>
                        <div className="w-10 h-10 bg-blue-50 text-[#005fb0] border border-blue-100 rounded-xl flex flex-col items-center justify-center shrink-0">
                          <span className="text-sm font-bold leading-none">{item.day}</span>
                          <span className="text-[8px] uppercase font-bold text-gray-400 tracking-wider mt-0.5">{item.month}</span>
                        </div>
                        <div className="text-xs min-w-0 pr-4">
                          <p className="font-bold text-gray-700 truncate">{item.title}</p>
                          <p className="text-gray-400 mt-0.5">{item.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>

            {/* 4. Operations Action Row */}
            <section className="space-y-4">
              <h3 className="text-lg font-bold text-gray-800">Quick Actions</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button className="p-5 rounded-2xl font-bold text-sm shadow-sm transition active:scale-95 text-center bg-[#005fb0] text-white hover:bg-blue-700">
                  ➕ Add Student
                </button>
                <button className="p-5 rounded-2xl font-bold text-sm shadow-sm transition active:scale-95 text-center bg-blue-50 text-[#005fb0] border border-blue-100 hover:bg-blue-100/60">
                  💼 Add Teacher
                </button>
                <button className="p-5 rounded-2xl font-bold text-sm shadow-sm transition active:scale-95 text-center bg-red-50 text-red-700 border border-red-100 hover:bg-red-100/60">
                  📢 Send Alert
                </button>
                <button className="p-5 rounded-2xl font-bold text-sm shadow-sm transition active:scale-95 text-center bg-gray-800 text-white hover:bg-gray-900">
                  📊 Daily Report
                </button>
              </div>
            </section>
          </>
        ) : (
          /* --- TIERED FINANCE VIEW (Mandate 2) --- */
          <div className="space-y-6">
            
            {/* Breadcrumb Navigation Hook */}
            {financeTier !== 'HOME' && (
              <button 
                onClick={() => {
                  if (financeTier === 'CLASSES') setFinanceTier('HOME');
                  if (financeTier === 'ROSTER') setFinanceTier('CLASSES');
                }}
                className="inline-flex items-center text-sm font-semibold text-[#005fb0] hover:underline cursor-pointer gap-1 mb-2"
              >
                ← Back to Previous Menu
              </button>
            )}

            {/* --- TIER 1: FINANCIAL HOME CORE OVERVIEW --- */}
            {financeTier === 'HOME' && (
              <div className="space-y-8 animate-fadeIn">
                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {renderFinancialStatCard("💰 Total Tuition Collected", `$${totalTuitionCollected.toLocaleString()}`, "bg-green-50 border-green-100 text-green-700")}
                  {renderFinancialStatCard("⚠️ Outstanding Balance Arrears", `$${outstandingBalanceArrears.toLocaleString()}`, "bg-red-50 border-red-100 text-red-700")}
                  {renderFinancialStatCard("🚌 Overall Transport Collection", `$${totalTransportCollected.toLocaleString()}`, "bg-blue-50 border-blue-100 text-blue-700")}
                </div>

                {/* Graphical Routing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div 
                    onClick={() => { setFinanceType('TUITION'); setFinanceTier('CLASSES'); }}
                    className="rounded-2xl p-8 bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-[#005fb0]/20 transition cursor-pointer flex flex-col justify-between group h-64"
                  >
                    <div>
                      <div className="w-12 h-12 bg-blue-50 text-[#005fb0] rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-105 transition">
                        📊
                      </div>
                      <h3 className="text-xl font-bold text-gray-800">Tuition Fees by Class</h3>
                      <p className="text-xs text-gray-400 mt-1 max-w-sm">Review class-wise Tuition receipts progress, pay status rosters, and perform fee collection.</p>
                    </div>
                    <span className="text-xs text-[#005fb0] font-bold group-hover:translate-x-1.5 transition inline-flex items-center gap-1 mt-4">
                      Open Tuition Ledger →
                    </span>
                  </div>

                  <div 
                    onClick={() => { setFinanceType('TRANSPORT'); setFinanceTier('CLASSES'); }}
                    className="rounded-2xl p-8 bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-[#005fb0]/20 transition cursor-pointer flex flex-col justify-between group h-64"
                  >
                    <div>
                      <div className="w-12 h-12 bg-yellow-50 text-[#735c00] rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-105 transition">
                        🚌
                      </div>
                      <h3 className="text-xl font-bold text-gray-800">Transport Fee Ledger</h3>
                      <p className="text-xs text-gray-400 mt-1 max-w-sm">Manage student transport ledger lists, identify active bus route subscribers, and record vehicle dues.</p>
                    </div>
                    <span className="text-xs text-[#005fb0] font-bold group-hover:translate-x-1.5 transition inline-flex items-center gap-1 mt-4">
                      Open Transport Ledger →
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* --- TIER 2: CLASS-WISE GRID SELECTORS --- */}
            {financeTier === 'CLASSES' && (
              <div className="space-y-6 animate-fadeIn">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">
                    {financeType === 'TUITION' ? 'Tuition Roster: Class Selector' : 'Transport Roster: Class Selector'}
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5">Select a grade block to view individual registers.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {classesList.map(grade => {
                    // Calculate Paid metrics for each class
                    const classStudents = studentsList.filter(s => s.class === grade);
                    const totalCount = financeType === 'TUITION' 
                      ? classStudents.length 
                      : classStudents.filter(s => s.usesTransport).length;

                    const paidCount = financeType === 'TUITION'
                      ? classStudents.filter(s => s.tuitionStatus === 'Paid').length
                      : classStudents.filter(s => s.usesTransport && s.transportStatus === 'Paid').length;

                    return (
                      <div 
                        key={grade}
                        onClick={() => { setSelectedClass(grade); setFinanceTier('ROSTER'); setSearchQuery(''); }}
                        className="rounded-2xl p-6 bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-[#005fb0]/20 transition cursor-pointer flex flex-col justify-between group h-48"
                      >
                        <div>
                          <h4 className="font-bold text-gray-800 text-lg">{grade}</h4>
                          <p className="text-xs text-gray-400 mt-1">
                            {financeType === 'TUITION' ? 'General Admission' : 'Bus Route Rider Roster'}
                          </p>
                        </div>
                        <div className="flex justify-between items-center border-t border-gray-50 pt-4 mt-4">
                          <div>
                            <span className="text-xs text-gray-400">Ledger Count:</span>
                            <p className="text-sm font-bold text-gray-700">{paidCount}/{totalCount} Paid</p>
                          </div>
                          <span className="w-8 h-8 rounded-full bg-blue-50 text-[#005fb0] flex items-center justify-center text-sm font-bold group-hover:scale-105 transition">
                            →
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* --- TIER 3 & 4: STUDENT ROSTER LEDGER TABLE --- */}
            {financeTier === 'ROSTER' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <span className="text-xs font-bold text-[#005fb0] uppercase tracking-wider">
                      {financeType === 'TUITION' ? 'Tuition Ledger' : 'Transport Dues Ledger'}
                    </span>
                    <h3 className="text-xl font-bold text-gray-800">{selectedClass} Roster</h3>
                  </div>

                  {/* Filter Search Input */}
                  <div className="relative w-full md:w-64">
                    <span className="absolute left-3 top-2.5 text-gray-400 text-xs">🔍</span>
                    <input 
                      type="text"
                      placeholder="Search student..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-8 pr-4 py-1.5 rounded-full bg-white border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-400/20"
                    />
                  </div>
                </div>

                {/* Roster Table */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-gray-50 text-gray-400 uppercase font-bold tracking-wider border-b border-gray-100">
                          <th className="py-4 px-6">Student Name</th>
                          <th className="py-4 px-6">Roll Number</th>
                          <th className="py-4 px-6">Dues Amount</th>
                          <th className="py-4 px-6">Payment Status</th>
                          <th className="py-4 px-6 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {(() => {
                          // Filter list
                          const filtered = studentsList.filter(student => {
                            // Filter by selected class
                            if (student.class !== selectedClass) return false;
                            // Filter by transport usage if specialized transport roster (Tier 4)
                            if (financeType === 'TRANSPORT' && !student.usesTransport) return false;
                            // Filter by search query
                            return student.name.toLowerCase().includes(searchQuery.toLowerCase());
                          });

                          if (filtered.length === 0) {
                            return (
                              <tr>
                                <td colSpan="5" className="py-8 text-center text-gray-400 italic">
                                  No student records match filters.
                                </td>
                              </tr>
                            );
                          }

                          return filtered.map(student => {
                            const due = financeType === 'TUITION' ? student.tuitionDue : student.transportDue;
                            const status = financeType === 'TUITION' ? student.tuitionStatus : student.transportStatus;

                            return (
                              <tr key={student.roll} className="hover:bg-gray-50/50 transition">
                                <td className="py-4 px-6 font-bold text-gray-700">{student.name}</td>
                                <td className="py-4 px-6 text-gray-400">{student.roll}</td>
                                <td className="py-4 px-6 font-semibold">${due}</td>
                                <td className="py-4 px-6">
                                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                    status === 'Paid' 
                                      ? 'bg-green-50 text-green-700 border border-green-100' 
                                      : 'bg-red-50 text-red-700 border border-red-100'
                                  }`}>
                                    {status === 'Paid' ? '✓ Paid' : '● Pending'}
                                  </span>
                                </td>
                                <td className="py-4 px-6 text-right">
                                  {status === 'Pending' ? (
                                    <button 
                                      onClick={() => handleCollectFees(student.roll, financeType)}
                                      className="px-3 py-1 bg-[#005fb0] text-white rounded-full font-semibold hover:bg-blue-700 transition active:scale-95"
                                    >
                                      Collect Fees
                                    </button>
                                  ) : (
                                    <span className="text-gray-400 text-xs font-medium italic">Completed</span>
                                  )}
                                </td>
                              </tr>
                            );
                          });
                        })()}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

          </div>
        )}

      </main>

      {/* --- ANNOUNCEMENTS WIZARD MODAL (Mandate 1) --- */}
      {showAnnounceModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xl max-w-md w-full animate-modalScale">
            <header className="flex justify-between items-center border-b border-gray-50 pb-3 mb-4">
              <h3 className="text-lg font-bold text-gray-800">Add New Announcement</h3>
              <button 
                onClick={() => setShowAnnounceModal(false)}
                className="text-gray-400 hover:text-gray-600 font-bold text-xl"
              >
                ×
              </button>
            </header>
            <form onSubmit={handleAddAnnouncement} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Category Tag</label>
                <select 
                  value={newAnnounceCat}
                  onChange={(e) => setNewAnnounceCat(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border border-transparent rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400/20"
                >
                  <option value="General">General</option>
                  <option value="Holiday">Holiday</option>
                  <option value="Health">Health</option>
                  <option value="Academic">Academic</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Content Title / Text</label>
                <textarea 
                  rows="3"
                  placeholder="Enter details..."
                  value={newAnnounceText}
                  onChange={(e) => setNewAnnounceText(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border border-transparent rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-400/20"
                  required
                />
              </div>
              <div className="flex gap-2 justify-end pt-2">
                <button 
                  type="button"
                  onClick={() => setShowAnnounceModal(false)}
                  className="px-4 py-2 border border-gray-200 text-gray-500 text-xs font-bold rounded-full hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-[#005fb0] text-white text-xs font-bold rounded-full hover:bg-blue-700 transition"
                >
                  Post Notice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- EVENTS WIZARD MODAL (Mandate 1) --- */}
      {showEventModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xl max-w-md w-full animate-modalScale">
            <header className="flex justify-between items-center border-b border-gray-50 pb-3 mb-4">
              <h3 className="text-lg font-bold text-gray-800">Schedule New Event</h3>
              <button 
                onClick={() => setShowEventModal(false)}
                className="text-gray-400 hover:text-gray-600 font-bold text-xl"
              >
                ×
              </button>
            </header>
            <form onSubmit={handleAddEvent} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Event Title</label>
                <input 
                  type="text"
                  placeholder="e.g. Science Fair"
                  value={newEventTitle}
                  onChange={(e) => setNewEventTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border border-transparent rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-400/20"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Day Date (Number)</label>
                  <input 
                    type="text"
                    placeholder="e.g. 25"
                    value={newEventDay}
                    onChange={(e) => setNewEventDay(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 border border-transparent rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-400/20"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Month String</label>
                  <select 
                    value={newEventMonth}
                    onChange={(e) => setNewEventMonth(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 border border-transparent rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400/20"
                  >
                    <option value="Jan">Jan</option>
                    <option value="Feb">Feb</option>
                    <option value="Mar">Mar</option>
                    <option value="Apr">Apr</option>
                    <option value="May">May</option>
                    <option value="Jun">Jun</option>
                    <option value="Jul">Jul</option>
                    <option value="Aug">Aug</option>
                    <option value="Sep">Sep</option>
                    <option value="Oct">Oct</option>
                    <option value="Nov">Nov</option>
                    <option value="Dec">Dec</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Time Slot / Duration</label>
                <input 
                  type="text"
                  placeholder="e.g. 09:00 AM - 12:00 PM"
                  value={newEventTime}
                  onChange={(e) => setNewEventTime(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border border-transparent rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-400/20"
                  required
                />
              </div>
              <div className="flex gap-2 justify-end pt-2">
                <button 
                  type="button"
                  onClick={() => setShowEventModal(false)}
                  className="px-4 py-2 border border-gray-200 text-gray-500 text-xs font-bold rounded-full hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-[#005fb0] text-white text-xs font-bold rounded-full hover:bg-blue-700 transition"
                >
                  Add Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

// --- CARD PIECE SUB-BUILDERS (Principal Dashboard) ---

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

function renderFinancialStatCard(title, val, bgStyles) {
  return (
    <div className={`rounded-2xl p-6 border shadow-sm flex justify-between items-center ${bgStyles}`}>
      <div>
        <span className="text-xs font-bold uppercase tracking-wider opacity-85">{title}</span>
        <h4 className="text-2xl font-black mt-1">{val}</h4>
      </div>
      <span className="text-2xl select-none">💳</span>
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
