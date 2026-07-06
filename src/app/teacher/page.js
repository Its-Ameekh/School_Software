'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// ==========================================
// 1. GENERIC UI INFRASTRUCTURE COMPONENTS
// ==========================================
function Breadcrumbs({ currentView, onViewChange }) {
  const formatLabel = (v) => v.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  return (
    <nav className="flex items-center gap-2 text-xs font-bold text-gray-400 mb-4 bg-white px-4 py-2 rounded-xl border border-gray-100 shadow-xs max-w-max select-none">
      <span className="hover:text-blue-600 cursor-pointer transition-colors" onClick={() => onViewChange('dashboard')}>Home</span>
      {currentView !== 'dashboard' && (
        <>
          <span>/</span>
          <span className="text-gray-700 font-extrabold bg-blue-50 text-blue-600 px-2 py-0.5 rounded-md">{formatLabel(currentView)}</span>
        </>
      )}
    </nav>
  );
}

function Toast({ message, type, onClose }) {
  return (
    <div className="fixed bottom-5 right-5 z-50 bg-gray-900 text-white text-xs font-bold px-4 py-3 rounded-2xl shadow-2xl border border-gray-800 flex items-center gap-3">
      <span className={type === 'warning' ? 'text-red-400' : 'text-green-400'}>●</span>
      <p>{message}</p>
      <button onClick={onClose} className="text-gray-400 hover:text-white font-black text-sm ml-2">×</button>
    </div>
  );
}

function BaseModal({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
      <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl border border-gray-100">
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h3 className="font-extrabold text-gray-800 text-base">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 text-xl font-bold">×</button>
        </div>
        {children}
      </div>
    </div>
  );
}

function NavigationDrawer({ isOpen, onClose, onViewChange, onLogout }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex justify-start">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-xs" onClick={onClose} />
      <div className="relative w-80 max-w-full bg-white h-full shadow-2xl p-6 flex flex-col justify-between border-r border-gray-100">
        <div>
          <div className="flex justify-between items-center pb-4 border-b border-gray-100 mb-6">
            <h3 className="font-extrabold text-gray-800 text-base">Account & Navigation</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-700 text-2xl font-bold">×</button>
          </div>
          <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl border border-gray-100 mb-6">
            <div className="w-12 h-12 rounded-full overflow-hidden border border-white shadow-sm">
              <img alt="Sarah Jenkins Profile" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100" className="w-full h-full object-cover" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-gray-800">Ms. Sarah Jenkins</h4>
              <p className="text-[10px] text-gray-400 font-bold">sarah.jenkins@starlight.edu</p>
            </div>
          </div>
          <nav className="space-y-2 text-xs font-bold text-gray-600">
            <button onClick={() => { onViewChange('dashboard'); onClose(); }} className="w-full text-left px-4 py-3 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-all flex items-center gap-2"><span>🏠</span> Dashboard Center</button>
            <button onClick={() => { onViewChange('attendance'); onClose(); }} className="w-full text-left px-4 py-3 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-all flex items-center gap-2"><span>📋</span> Mark Attendance</button>
            <button onClick={() => { onViewChange('students'); onClose(); }} className="w-full text-left px-4 py-3 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-all flex items-center gap-2"><span>👥</span> Student Roster</button>
            <button onClick={() => { onViewChange('reports'); onClose(); }} className="w-full text-left px-4 py-3 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-all flex items-center gap-2"><span>📊</span> Progress Card Engine</button>
            <button onClick={() => { onViewChange('attendance-history'); onClose(); }} className="w-full text-left px-4 py-3 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-all flex items-center gap-2"><span>🕒</span> History Logs</button>
          </nav>
        </div>
        <button onClick={onLogout} className="w-full py-3 bg-red-50 text-red-600 font-black rounded-xl hover:bg-red-100 transition-all text-xs flex items-center justify-center gap-2 border border-red-100">
          <span>🚪</span> Log Out System
        </button>
      </div>
    </div>
  );
}

// ==========================================
// 2. MODAL FORM DIALOG toolkit
// ==========================================
function CreateAnnouncementModal({ onClose, onSubmit }) {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [priority, setPriority] = useState('Normal');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, desc, priority });
    onClose();
  };

  return (
    <BaseModal title="📢 Create Announcement" onClose={onClose}>
      <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
        <div>
          <label className="block font-bold text-gray-600 mb-1">Announcement Title</label>
          <input required type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-3 py-2 border border-gray-100 rounded-xl bg-gray-50 focus:outline-none" placeholder="e.g. Field Trip Assembly Map" />
        </div>
        <div>
          <label className="block font-bold text-gray-600 mb-1">Announcement Description</label>
          <textarea required rows="4" value={desc} onChange={(e) => setDesc(e.target.value)} className="w-full px-3 py-2 border border-gray-100 rounded-xl bg-gray-50 focus:outline-none" placeholder="Enter notification layout contents..."></textarea>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-gray-600 mb-1">Target Section Group</label>
            <select className="w-full px-3 py-2 border border-gray-100 rounded-xl bg-gray-50 focus:outline-none font-medium">
              <option>Bluebell Section (Preschool)</option>
              <option>Jasmine Section</option>
            </select>
          </div>
          <div>
            <label className="block font-bold text-gray-600 mb-1">Priority Classification</label>
            <select value={priority} onChange={(e) => setPriority(e.target.value)} className="w-full px-3 py-2 border border-gray-100 rounded-xl bg-gray-50 focus:outline-none font-medium text-red-600">
              <option value="Normal">Normal Baseline</option>
              <option value="Important">Important (High Focus)</option>
            </select>
          </div>
        </div>
        <div className="flex gap-2 justify-end pt-2 border-t border-gray-100">
          <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-100 rounded-full font-bold text-gray-500 hover:bg-gray-50">Cancel</button>
          <button type="submit" className="px-5 py-2 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 shadow-sm">Publish Post</button>
        </div>
      </form>
    </BaseModal>
  );
}

function LeaveModal({ onClose, onSubmit }) {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit();
    onClose();
  };

  return (
    <BaseModal title="📅 Apply Absence Leave Request" onClose={onClose}>
      <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-gray-600 mb-1">From Date</label>
            <input required type="date" className="w-full px-3 py-2 border border-gray-100 rounded-xl bg-gray-50 focus:outline-none" />
          </div>
          <div>
            <label className="block font-bold text-gray-600 mb-1">To Date</label>
            <input required type="date" className="w-full px-3 py-2 border border-gray-100 rounded-xl bg-gray-50 focus:outline-none" />
          </div>
        </div>
        <div>
          <label className="block font-bold text-gray-600 mb-1">Leave Type Designation</label>
          <select className="w-full px-3 py-2 border border-gray-100 rounded-xl bg-gray-50 focus:outline-none font-medium">
            <option>Casual Leave</option>
            <option>Sick Medical Leave</option>
            <option>Emergency Context Leave</option>
            <option>Personal Assignment Leave</option>
          </select>
        </div>
        <div>
          <label className="block font-bold text-gray-600 mb-1">Reason Description</label>
          <textarea required rows="3" className="w-full px-3 py-2 border border-gray-100 rounded-xl bg-gray-50 focus:outline-none" placeholder="Provide validation parameters for leave framework review..."></textarea>
        </div>
        <div className="flex gap-2 justify-end pt-2 border-t border-gray-100">
          <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-100 rounded-full font-bold text-gray-500 hover:bg-gray-50">Cancel</button>
          <button type="submit" className="px-5 py-2 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700">Submit Application</button>
        </div>
      </form>
    </BaseModal>
  );
}

function HomeworkModal({ onClose, onSubmit }) {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit();
    onClose();
  };

  return (
    <BaseModal title="📝 Add Homework Assignment" onClose={onClose}>
      <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
        <div>
          <label className="block font-bold text-gray-600 mb-1">Homework Title</label>
          <input required type="text" className="w-full px-3 py-2 border border-gray-100 rounded-xl bg-gray-50 focus:outline-none" placeholder="e.g. Autumn Color Charting" />
        </div>
        <div>
          <label className="block font-bold text-gray-600 mb-1">Task Descriptions/Directives</label>
          <textarea required rows="3" className="w-full px-3 py-2 border border-gray-100 rounded-xl bg-gray-50 focus:outline-none" placeholder="Specify steps clearly..."></textarea>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-gray-600 mb-1">Target Class Set</label>
            <select className="w-full px-3 py-2 border border-gray-100 rounded-xl bg-gray-50 font-medium focus:outline-none">
              <option>Bluebell Section</option>
            </select>
          </div>
          <div>
            <label className="block font-bold text-gray-600 mb-1">Due Date</label>
            <input required type="date" className="w-full px-3 py-2 border border-gray-100 rounded-xl bg-gray-50 focus:outline-none" />
          </div>
        </div>
        <div className="flex gap-2 justify-end pt-2 border-t border-gray-100">
          <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-100 rounded-full font-bold text-gray-500 hover:bg-gray-50">Cancel</button>
          <button type="submit" className="px-5 py-2 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700">Distribute Slate</button>
        </div>
      </form>
    </BaseModal>
  );
}

function BroadcastModal({ onClose, onSubmit }) {
  const [important, setImportant] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit();
    onClose();
  };

  return (
    <BaseModal title="🚨 Broadcast Live Transmission Alert" onClose={onClose}>
      <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
        <div className="bg-red-50 text-red-700 p-3 rounded-xl border border-red-100 flex items-center justify-between font-bold">
          <p>Toggle Broadcast Matrix onto Urgent Level?</p>
          <input type="checkbox" checked={important} onChange={(e) => setImportant(e.target.checked)} className="w-4 h-4 rounded cursor-pointer accent-red-600" />
        </div>
        {important && <span className="inline-block bg-red-600 text-white font-extrabold px-3 py-0.5 rounded animate-bounce">⚠️ IMPORTANT CRITICAL ACTION ACTIVE</span>}
        <div>
          <label className="block font-bold text-gray-600 mb-1">Transmission Title</label>
          <input required type="text" className="w-full px-3 py-2 border border-gray-100 rounded-xl bg-gray-50 focus:outline-none" placeholder="e.g. Unscheduled Flash Rain Advisory" />
        </div>
        <div>
          <label className="block font-bold text-gray-600 mb-1">Broadcast Message Body</label>
          <textarea required rows="3" className="w-full px-3 py-2 border border-gray-100 rounded-xl bg-gray-50 focus:outline-none" placeholder="Enter alert content notification body..."></textarea>
        </div>
        <div className="flex gap-2 justify-end pt-2 border-t border-gray-100">
          <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-100 rounded-full font-bold text-gray-500 hover:bg-gray-50">Cancel</button>
          <button type="submit" className="px-5 py-2 bg-red-600 text-white rounded-full font-bold hover:bg-red-700 shadow-sm">Broadcast Stream</button>
        </div>
      </form>
    </BaseModal>
  );
}

function DutyDetailsModal({ onClose }) {
  return (
    <BaseModal title="🛡 Current Assigned Duty Details" onClose={onClose}>
      <div className="space-y-3 text-xs bg-gray-50 p-4 rounded-xl border border-gray-100">
        <p><span className="text-gray-400 font-bold">Duty Type:</span> <span className="font-extrabold text-gray-800">Playground Supervision Monitor</span></p>
        <p><span className="text-gray-400 font-bold">Location Anchor:</span> <span className="font-extrabold text-gray-800">Outdoor Play Field Arena</span></p>
        <p><span className="text-gray-400 font-bold">Time Window Allocation:</span> <span className="font-extrabold text-blue-600">08:30 AM – 09:15 AM</span></p>
        <div className="bg-white p-3 rounded-lg border border-gray-100 mt-2">
          <p className="font-bold text-amber-600">Instructions & Guidelines:</p>
          <p className="text-gray-500 mt-0.5 leading-relaxed">Ensure physical baseline structural playground checks before child usage. Keep medical kits visible.</p>
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <button onClick={onClose} className="px-5 py-2 bg-gray-800 text-white rounded-full font-bold text-xs hover:bg-black transition-colors">Dismiss View</button>
      </div>
    </BaseModal>
  );
}

function TimetableModal({ onClose }) {
  const slots = [
    { time: "09:00 AM - 09:45 AM", sub: "Nursery Rhymes & Vocalization", room: "Room 402", status: "Active" },
    { time: "10:00 AM - 10:45 AM", sub: "Tactile Clay Crafting & Art", room: "Studio A", status: "Pending" },
    { time: "11:00 AM - 11:30 AM", sub: "Nutrition Break Interval", room: "Cafeteria", status: "Muted" },
    { time: "11:45 AM - 12:30 PM", sub: "Interactive Story Circle Narratives", room: "Library Hub", status: "Muted" }
  ];
  return (
    <BaseModal title="⏱ Today's Complete Timetable Sequence" onClose={onClose}>
      <div className="space-y-2 max-h-[260px] overflow-y-auto pr-1 text-xs">
        {slots.map((slot, idx) => (
          <div key={idx} className={`p-3 rounded-xl border flex justify-between items-center ${slot.status === 'Active' ? 'bg-blue-50/50 border-blue-200' : 'bg-gray-50/50 border-gray-100'}`}>
            <div>
              <p className="font-black text-gray-700">{slot.sub}</p>
              <p className="text-[10px] text-gray-400 font-bold mt-0.5">{slot.time} • Room: {slot.room}</p>
            </div>
            <span className={`px-2.5 py-0.5 rounded-full font-bold text-[9px] ${slot.status === 'Active' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>{slot.status}</span>
          </div>
        ))}
      </div>
    </BaseModal>
  );
}

// ==========================================
// 3. INTERNAL ROUTED PANELS & MODULE VIEWS
// ==========================================
function AttendanceRegister({ onNotify }) {
  const [isLocked, setIsLocked] = useState(false);
  const [attendanceData, setAttendanceData] = useState([
    { id: 1, name: "Aiden Jenkins", m: "P", t: "P", w: "A", th: "P", f: "P", present: false },
    { id: 2, name: "Leo Miller", m: "P", t: "P", w: "P", th: "P", f: "P", present: false },
    { id: 3, name: "Sophia White", m: "A", t: "A", w: "L", th: "P", f: "A", present: false }
  ]);

  const toggleAttendance = (id) => {
    if (isLocked) return;
    setAttendanceData(attendanceData.map(student => 
      student.id === id ? { ...student, present: !student.present } : student
    ));
  };

  const handleFinalSubmit = () => {
    setIsLocked(true);
    onNotify("Daily attendance state synchronized and locked for today!");
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-6">
      <div className="border-b border-gray-100 pb-4 flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold text-gray-800">Teacher Attendance Register</h3>
          <p className="text-xs text-gray-400 mt-0.5">Section: Bluebell (Active Term)</p>
        </div>
        {isLocked && (
          <span className="bg-red-50 border border-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-black">
            🔒 LOCKED FOR TODAY
          </span>
        )}
      </div>
      <div className="overflow-x-auto border border-gray-100 rounded-xl text-xs">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100 font-bold text-gray-500">
              <th className="p-3.5">Student Name</th>
              <th className="p-3.5 text-center">Mon</th>
              <th className="p-3.5 text-center">Tue</th>
              <th className="p-3.5 text-center">Wed</th>
              <th className="p-3.5 text-center">Thu</th>
              <th className="p-3.5 text-center">Fri</th>
              <th className="p-3.5 text-center bg-blue-50/50 text-blue-600 w-36">Today</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {attendanceData.map((stud) => (
              <tr key={stud.id} className="hover:bg-gray-50/80 transition-colors">
                <td className="p-3.5 font-bold text-gray-700">{stud.name}</td>
                <td className="p-3.5 text-center text-gray-400 font-bold">{stud.m}</td>
                <td className="p-3.5 text-center text-gray-400 font-bold">{stud.t}</td>
                <td className="p-3.5 text-center text-gray-400 font-bold">{stud.w}</td>
                <td className="p-3.5 text-center text-gray-400 font-bold">{stud.th}</td>
                <td className="p-3.5 text-center text-gray-400 font-bold">{stud.f}</td>
                <td className="p-2 text-center bg-blue-50/20">
                  <button 
                    disabled={isLocked}
                    onClick={() => toggleAttendance(stud.id)}
                    className={`w-8 h-8 rounded-lg font-black text-sm transition-all border flex items-center justify-center mx-auto ${
                      stud.present 
                        ? 'bg-green-50 border-green-200 text-green-600' 
                        : 'bg-red-50 border-red-200 text-red-500'
                    } ${isLocked ? 'opacity-70 cursor-not-allowed' : 'hover:scale-105'}`}
                  >
                    {stud.present ? '✓' : '×'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end pt-4 border-t border-gray-100">
        <button 
          disabled={isLocked}
          onClick={handleFinalSubmit} 
          className={`px-6 py-2 text-white text-xs font-bold rounded-full ${isLocked ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {isLocked ? 'Submitted' : 'Submit Attendance'}
        </button>
      </div>
    </div>
  );
}

function StudentRoster({ onSelectStudent }) {
  const [filterClass, setFilterClass] = useState('All');
  const [search, setSearch] = useState('');
  const roster = [
    { id: 1, name: "Aiden Jenkins", roll: "22-BB-01", class: "Bluebell", status: "Absent", img: "https://images.unsplash.com/photo-1602030028438-4cf153cba9e7?w=150" },
    { id: 2, name: "Leo Miller", roll: "22-BB-02", class: "Bluebell", status: "Absent", img: "https://images.unsplash.com/photo-1603005901242-308ecb2879f8?w=150" },
    { id: 3, name: "Sophia White", roll: "22-BB-03", class: "Bluebell", status: "Absent", img: "https://images.unsplash.com/photo-1595830344553-b845c99596c5?w=150" },
    { id: 4, name: "Zoe Adams", roll: "22-JA-09", class: "Jasmine", status: "Absent", img: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=150" }
  ];
  const filtered = roster.filter(s => (filterClass === 'All' || s.class === filterClass) && s.name.toLowerCase().includes(search.toLowerCase()));
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-100 pb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-800">Master Roster Database</h3>
          <p className="text-xs text-gray-400 mt-0.5">All Enrollment Profiles</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <input type="text" placeholder="Search roster..." value={search} onChange={(e) => setSearch(e.target.value)} className="px-4 py-2 bg-gray-50 border border-gray-100 rounded-full text-xs focus:outline-none w-full sm:w-44" />
          <select value={filterClass} onChange={(e) => setFilterClass(e.target.value)} className="px-4 py-2 bg-gray-50 border border-gray-100 rounded-full text-xs text-gray-600 font-bold focus:outline-none">
            <option value="All">All Sections</option>
            <option value="Bluebell">Bluebell</option>
            <option value="Jasmine">Jasmine</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {filtered.map(s => (
          <div key={s.id} onClick={() => onSelectStudent(s)} className="p-4 border border-gray-50 bg-gray-50/50 hover:bg-white hover:border-blue-300 hover:shadow-md transition-all rounded-xl text-center group cursor-pointer">
            <div className="w-16 h-16 rounded-full overflow-hidden mx-auto border-2 border-white group-hover:border-blue-400 transition-all shadow-sm">
              <img src={s.img} alt={s.name} className="w-full h-full object-cover" />
            </div>
            <h5 className="font-bold text-gray-800 mt-3 text-sm truncate">{s.name}</h5>
            <p className="text-[10px] text-gray-400 font-bold">{s.roll} • {s.class}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// 4. EMBEDDABLE INJECTED PROGRESS CARD VIEW
// ==========================================
function TerminalProgressCardWidget({ studentName, admNo, className, remarks }) {
  return (
    <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm space-y-6 text-xs max-w-2xl mx-auto print:border-0 print:shadow-none">
      <div className="text-center border-b pb-4">
        <h2 className="text-lg font-black tracking-wide text-gray-800">IRIS WORLD SCHOOL</h2>
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Official Student Terminal Progress Report</p>
      </div>
      <div className="grid grid-cols-2 gap-2 bg-gray-50 p-3 rounded-xl border border-gray-100 text-[11px]">
        <p><span className="text-gray-400 font-bold">Student:</span> <b className="text-gray-700">{studentName}</b></p>
        <p className="text-right"><span className="text-gray-400 font-bold">Class:</span> <b className="text-gray-700">{className || "Bluebell Section"}</b></p>
        <p><span className="text-gray-400 font-bold">Adm No:</span> <b className="text-gray-700">{admNo}</b></p>
        <p className="text-right"><span className="text-gray-400 font-bold">Term:</span> <b className="text-gray-700">First Terminal Assessment</b></p>
      </div>
      <div className="border border-gray-100 rounded-xl overflow-hidden">
        <table className="w-full text-left text-[11px]">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-200 font-bold text-gray-600">
              <th className="p-2.5">Subject Domain Portfolio</th>
              <th className="p-2.5 text-center">Max</th>
              <th className="p-2.5 text-center">Scored</th>
              <th className="p-2.5 text-center">Grade</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-gray-700">
            <tr><td className="p-2.5 font-bold">Linguistics & Phonetics Communication</td><td className="p-2.5 text-center">100</td><td className="p-2.5 text-center font-black">92</td><td className="p-2.5 text-center text-green-600 font-bold">A+</td></tr>
            <tr><td className="p-2.5 font-bold">Spatial Visual Reasoning & Math Foundation</td><td className="p-2.5 text-center">100</td><td className="p-2.5 text-center font-black">95</td><td className="p-2.5 text-center text-green-600 font-bold">A+</td></tr>
            <tr><td className="p-2.5 font-bold">Tactile Fine Motor Skills & Creative Art</td><td className="p-2.5 text-center">100</td><td className="p-2.5 text-center font-black">88</td><td className="p-2.5 text-center text-blue-600 font-bold">A</td></tr>
            <tr className="bg-gray-50/50 font-bold"><td className="p-2.5">Co-Curricular / Behavioral Framework</td><td className="p-2.5 text-center">50</td><td className="p-2.5 text-center font-black">47</td><td className="p-2.5 text-center text-green-600 font-bold">O</td></tr>
          </tbody>
        </table>
      </div>
      <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 italic text-gray-600 leading-relaxed">
        <span className="block font-bold text-gray-700 not-italic text-[10px] uppercase mb-1">Instructor Remarks:</span>
        "{remarks}"
      </div>
      <div className="flex justify-between items-center pt-4 border-t border-dashed border-gray-200">
        <button onClick={() => window.print()} className="px-4 py-2 bg-gray-900 text-white rounded-full font-bold shadow-xs hover:bg-black transition-all print:hidden">
          🖨 Print Card Asset
        </button>
        <p className="text-[9px] text-gray-400 font-bold tracking-wider uppercase text-right print:block">Verified Starlight Systems Frame</p>
      </div>
    </div>
  );
}

function StudentProfile({ initialStudent, onBack }) {
  const [tab, setTab] = useState('general');
  const profile = {
    name: initialStudent?.name || "Aiden Jenkins", admNo: initialStudent?.roll || "ADM-2026-094", age: 4, dob: "Jan 14, 2022",
    class: initialStudent?.class ? `${initialStudent.class} Section` : "Bluebell Section", rollNo: "12", medicalNotes: "Mild peanut allergy.",
    parentName: "Arthur Jenkins", phone: "+91 98765 43210", address: "West Hill, Calicut, Kerala",
    behavior: "Excellent", communication: "Advanced", creativity: "High", remarks: "Exhibits great structural spatial visual reasoning skills."
  };
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-6">
      <div className="flex justify-between items-center border-b border-gray-100 pb-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-100">
            <img src={initialStudent?.img || "https://images.unsplash.com/photo-1602030028438-4cf153cba9e7?w=150"} alt="" className="w-full h-full object-cover" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">{profile.name}</h3>
            <p className="text-xs text-gray-400 font-bold">Roll Framework ID: {profile.rollNo}</p>
          </div>
        </div>
        <button onClick={onBack} className="px-4 py-2 border border-gray-100 rounded-full text-xs font-bold text-gray-500 hover:bg-gray-50">← Back</button>
      </div>
      <div className="flex gap-2 border-b border-gray-100 pb-2 text-xs">
        <button onClick={() => setTab('general')} className={`px-4 py-2 font-bold rounded-lg ${tab === 'general' ? 'bg-blue-600 text-white' : 'text-gray-500'}`}>General Profile</button>
        <button onClick={() => setTab('progress')} className={`px-4 py-2 font-bold rounded-lg ${tab === 'progress' ? 'bg-blue-600 text-white' : 'text-gray-500'}`}>Progress Card</button>
        <button onClick={() => setTab('fees')} className={`px-4 py-2 font-bold rounded-lg ${tab === 'fees' ? 'bg-blue-600 text-white' : 'text-gray-500'}`}>Fee Structure</button>
      </div>
      
      {tab === 'general' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-gray-50 rounded-xl space-y-2">
            <h4 className="font-bold text-blue-600 border-b border-gray-100 pb-1 mb-2">Demographics</h4>
            <p><span className="text-gray-400">Adm ID:</span> <b>{profile.admNo}</b></p>
            <p><span className="text-gray-400">DOB:</span> <b>{profile.dob}</b></p>
            <p><span className="text-gray-400">Medical Notes:</span> <b className="text-red-500">{profile.medicalNotes}</b></p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl space-y-2">
            <h4 className="font-bold text-blue-600 border-b border-gray-100 pb-1 mb-2">Guardian Parameters</h4>
            <p><span className="text-gray-400">Parent:</span> <b>{profile.parentName}</b></p>
            <p><span className="text-gray-400">Phone Vector:</span> <b>{profile.phone}</b></p>
            <p><span className="text-gray-400">Address Matrix:</span> <b>{profile.address}</b></p>
          </div>
        </div>
      )}

      {tab === 'progress' && (
        <TerminalProgressCardWidget 
          studentName={profile.name} 
          admNo={profile.admNo} 
          className={profile.class} 
          remarks={profile.remarks} 
        />
      )}

      {tab === 'fees' && (
        <div className="border border-gray-100 rounded-xl overflow-hidden text-xs">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 font-bold text-gray-500"><th className="p-3">Component</th><th className="p-3">Amount</th><th className="p-3">Status</th></tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              <tr><td className="p-3">Admission Base Matrix Fee</td><td className="p-3">₹15,000</td><td className="p-3 text-green-600 font-bold">Settled Paid</td></tr>
              <tr className="bg-amber-50/40"><td className="p-3">Monthly Classroom Services</td><td className="p-3">₹4,500</td><td className="p-3 text-amber-600 font-bold">Pending Due July 15</td></tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 5. PROGRESS CARD ENGINE (INTEGRATED VIEW)
// ==========================================
function StudentReports() {
  const [search, setSearch] = useState('');
  const [activeReportStudent, setActiveReportStudent] = useState(null);

  const students = [
    { id: 1, name: "Aiden Jenkins", adm: "ADM-22-BB-01", att: "96%", class: "Bluebell Section", remarks: "Exhibits great structural spatial visual reasoning skills." },
    { id: 2, name: "Leo Miller", adm: "ADM-22-BB-02", att: "92%", class: "Bluebell Section", remarks: "Shows persistent enthusiasm for tactile modeling workshops." },
    { id: 3, name: "Sophia White", adm: "ADM-22-BB-03", att: "88%", class: "Bluebell Section", remarks: "Engages exceptionally well in classroom story sequencing." }
  ];

  const filtered = students.filter(s => s.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-6">
      <div className="flex justify-between items-center border-b border-gray-100 pb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-800">Professional Progress Card Engine</h3>
          <p className="text-xs text-gray-400">Analyze metrics and download terminal portfolio slates</p>
        </div>
        {activeReportStudent && (
          <button 
            onClick={() => setActiveReportStudent(null)} 
            className="px-4 py-1.5 border border-gray-200 rounded-full text-xs font-bold text-gray-600 hover:bg-gray-50"
          >
            ← Back to Performance Registry
          </button>
        )}
      </div>

      {!activeReportStudent ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-gray-50 p-4 rounded-xl border border-gray-100">
            <div><p className="text-gray-400 font-bold">Class Average performance</p><p className="text-lg font-black text-blue-600">91.4% Tier-A</p></div>
            <div><p className="text-gray-400 font-bold">Creative Engagement Index</p><p className="text-lg font-black text-teal-600">Exceptional Baseline</p></div>
            <div><p className="text-gray-400 font-bold">Total Appraised Matrix Count</p><p className="text-lg font-black text-gray-700">{students.length} Profiles</p></div>
          </div>

          <div className="pt-2">
            <input 
              type="text" 
              placeholder="Filter student metrics directory..." 
              value={search} 
              onChange={(e) => setSearch(e.target.value)} 
              className="w-full px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-xs focus:outline-none mb-4" 
            />

            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
              {filtered.map(s => (
                <div key={s.id} className="p-4 border border-gray-100 bg-white rounded-xl flex justify-between items-center text-xs hover:border-blue-200 transition-all">
                  <div className="space-y-1">
                    <p className="text-gray-700 text-sm font-bold">{s.name}</p>
                    <p className="text-[10px] text-gray-400 font-medium">Admission Link Ref: {s.adm} | Mean Attend: {s.att}</p>
                  </div>
                  <button 
                    onClick={() => setActiveReportStudent(s)} 
                    className="px-4 py-2 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-xl font-bold text-xs transition-all"
                  >
                    🔍 View Progress Card
                  </button>
                </div>
              ))}
              {filtered.length === 0 && <p className="text-xs text-gray-400 italic text-center">No matching profiles recorded.</p>}
            </div>
          </div>
        </>
      ) : (
        <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100">
          <TerminalProgressCardWidget 
            studentName={activeReportStudent.name} 
            admNo={activeReportStudent.adm} 
            className={activeReportStudent.class} 
            remarks={activeReportStudent.remarks} 
          />
        </div>
      )}
    </div>
  );
}

// ==========================================
// 6. MANUAL ATTENDANCE LEDGER GRID HISTORY
// ==========================================
function AttendanceHistory() {
  const [selectedMonth, setSelectedMonth] = useState('July');
  const [selectedStudentFilter, setSelectedStudentFilter] = useState('All');

  const staticHistoryRows = [
    { name: "Aiden Jenkins", class: "Bluebell", days: ["✓", "✓", "×", "✓", "✓", "✓", "✓", "×", "✓", "✓"] },
    { name: "Leo Miller", class: "Bluebell", days: ["✓", "✓", "✓", "✓", "✓", "✓", "✓", "✓", "✓", "✓"] },
    { name: "Sophia White", class: "Bluebell", days: ["×", "×", "✓", "✓", "×", "✓", "✓", "×", "✓", "×"] }
  ];

  const filteredHistory = staticHistoryRows.filter(row => 
    selectedStudentFilter === 'All' || row.name === selectedStudentFilter
  );

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-100 pb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-800">Manual Attendance Register Ledger</h3>
          <p className="text-xs text-gray-400 mt-0.5">Historical grid metrics map lookup</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <select 
            value={selectedMonth} 
            onChange={(e) => setSelectedMonth(e.target.value)} 
            className="px-3 py-2 bg-gray-50 border border-gray-100 rounded-xl text-xs font-bold text-gray-600 focus:outline-none"
          >
            <option value="July">July 2026</option>
            <option value="June">June 2026</option>
            <option value="May">May 2026</option>
          </select>
          <select 
            value={selectedStudentFilter} 
            onChange={(e) => setSelectedStudentFilter(e.target.value)} 
            className="px-3 py-2 bg-gray-50 border border-gray-100 rounded-xl text-xs font-bold text-gray-600 focus:outline-none"
          >
            <option value="All">All Students Profile</option>
            <option value="Aiden Jenkins">Aiden Jenkins</option>
            <option value="Leo Miller">Leo Miller</option>
            <option value="Sophia White">Sophia White</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto border border-gray-100 rounded-xl">
        <table className="w-full text-xs text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 font-extrabold select-none">
              <th className="p-4 min-w-[160px]">Student Name</th>
              {Array.from({ length: 10 }, (_, i) => (
                <th key={i} className="p-3 text-center border-l border-gray-50 min-w-[36px]">D{i + 1}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 font-bold text-black">
            {filteredHistory.map((row, idx) => (
              <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                <td className="p-4 text-gray-800 font-black">{row.name}</td>
                {row.days.map((status, dayIdx) => (
                  <td 
                    key={dayIdx} 
                    className={`p-3 text-center text-sm font-extrabold border-l border-gray-50 ${
                      status === '✓' ? 'text-black font-black' : 'text-gray-900'
                    }`}
                  >
                    {status}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 text-[11px] text-gray-400 font-semibold">
        <p>💡 Ledger Syntax: Grid nodes output matching standard character tokens where (✓) designates Present and (×) marks Absent.</p>
      </div>
    </div>
  );
}

// ==========================================
// 7. CENTRAL INSTRUCTOR INTERACTIVE CORE
// ==========================================
export default function TeacherDashboard() {
  const router = useRouter();
  const [currentView, setCurrentView] = useState('dashboard'); 
  const [viewHistory, setViewHistory] = useState(['dashboard']);
  const [selectedDay, setSelectedDay] = useState("15");
  const [hoveredDayData, setHoveredDayData] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [toast, setToast] = useState(null);
  const [activeModal, setActiveModal] = useState(null); 
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedStudentProfile, setSelectedStudentProfile] = useState(null);

  const [stagedDoc, setStagedDoc] = useState(null);
  const [stagedPhoto, setStagedPhoto] = useState(null);

  const [announcements, setAnnouncements] = useState([
    "New library books have arrived for the Bluebell section!",
    "Reminder: Please submit the science project drafts by Friday."
  ]);

  const [worksheets, setWorksheets] = useState([
    { id: 1, name: "Math_Unit_4_Addition.pdf", date: "Oct 14", size: "1.2 MB", type: "pdf" },
    { id: 2, name: "English_Reading_Comp.docx", date: "Oct 12", size: "850 KB", type: "docx" }
  ]);

  const [galleryImages, setGalleryImages] = useState([
    { src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400", alt: "Class activity" },
    { src: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=400", alt: "Preschool outdoor play" }
  ]);

  // View Navigation Framework with native Back protection
  const navigateToView = (nextView) => {
    setCurrentView(nextView);
    setViewHistory(prev => [...prev, nextView]);
    window.history.pushState({ view: nextView }, '');
  };

  useEffect(() => {
    const handlePopState = (event) => {
      if (viewHistory.length > 1) {
        const structuralHistory = [...viewHistory];
        structuralHistory.pop(); 
        const recentBackPage = structuralHistory[structuralHistory.length - 1] || 'dashboard';
        setViewHistory(structuralHistory);
        setCurrentView(recentBackPage);
      } else {
        window.history.pushState({ view: 'dashboard' }, '');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [viewHistory]);

  const handleSystemLogout = () => {
    showToast("Disconnecting session framework nodes...", "warning");
    setIsDrawerOpen(false);
    
    // Perform actual Next.js route navigation directly to your login window path
    router.push('/login');
  };

  const scheduleDays = [
    { day: "28", muted: true }, { day: "29", muted: true }, { day: "30", muted: true },
    { day: "1", hasDot: true, event: "July 1: School Opening Framework Launch" }, { day: "2" }, { day: "3" }, { day: "4" }, { day: "5" }, { day: "6" },
    { day: "7" }, { day: "8" }, { day: "9" }, { day: "10" }, { day: "11" }, { day: "12" },
    { day: "13" }, { day: "14" }, { day: "15", active: true, hasDot: true, event: "July 15: Blue Day Celebration & Crafting" }, { day: "16" }, { day: "17" }, { day: "18" }
  ];

  const currentActiveEvent = scheduleDays.find(d => d.day === selectedDay)?.event || "No distinct calendar events assigned.";

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const selectWorksheetFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setStagedDoc({
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        ext: file.name.split('.').pop()
      });
    }
  };

  const commitStagedWorksheet = () => {
    if (!stagedDoc) return;
    setWorksheets([{
      id: Date.now(),
      name: stagedDoc.name,
      date: "Today",
      size: stagedDoc.size,
      type: stagedDoc.ext
    }, ...worksheets]);
    setStagedDoc(null);
    showToast("Document uploaded successfully!");
  };

  const selectPhotoFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setStagedPhoto({ name: file.name, url: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const commitStagedPhoto = () => {
    if (!stagedPhoto) return;
    setGalleryImages([{ src: stagedPhoto.url, alt: stagedPhoto.name }, ...galleryImages]);
    setStagedPhoto(null);
    showToast("Photo uploaded successfully!");
  };

  return (
    <div className="bg-[#f9f9ff] text-[#111c2c] min-h-screen font-sans antialiased selection:bg-blue-100">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      
      <NavigationDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        onViewChange={navigateToView} 
        onLogout={handleSystemLogout} 
      />

      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-40 w-full shadow-sm border-b border-gray-100">
        <div className="flex justify-between items-center w-full px-6 md:px-10 h-20 max-w-[1280px] mx-auto">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => navigateToView('dashboard')}>
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#4f9dff] text-white font-bold text-xl">★</div>
            <h1 className="text-xl font-bold text-[#005fb0]">Iris World School</h1>
          </div>
          <div className="flex items-center gap-6">
            <nav className="hidden lg:flex gap-4 text-sm font-semibold text-gray-500">
              <button onClick={() => navigateToView('dashboard')} className={`px-4 py-2 rounded-full transition ${currentView === 'dashboard' ? 'text-[#005fb0] bg-blue-50' : 'hover:bg-gray-50'}`}>Dashboard</button>
              <button onClick={() => navigateToView('attendance')} className={`px-4 py-2 rounded-full transition ${currentView === 'attendance' ? 'text-[#005fb0] bg-blue-50' : 'hover:bg-gray-50'}`}>Academics</button>
              <button onClick={() => navigateToView('students')} className={`px-4 py-2 rounded-full transition ${currentView === 'students' ? 'text-[#005fb0] bg-blue-50' : 'hover:bg-gray-50'}`}>Roster</button>
            </nav>
            <div onClick={() => setIsDrawerOpen(true)} className="w-10 h-10 rounded-full overflow-hidden border border-gray-100 shadow-xs cursor-pointer hover:ring-2 hover:ring-blue-400 transition-all">
              <img alt="User avatar toggle" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1280px] mx-auto px-4 md:px-10 py-6">
        <Breadcrumbs currentView={currentView} onViewChange={navigateToView} />

        {currentView === 'dashboard' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <aside className="lg:col-span-4 space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col items-center text-center relative">
                <div className="absolute top-4 right-4 text-yellow-400 text-xl font-bold">★</div>
                <div className="w-28 h-28 rounded-full border-4 border-white shadow-md overflow-hidden mb-3">
                  <img alt="Sarah Jenkins Lead Portrait" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-lg font-extrabold text-[#111c2c]">Ms. Sarah Jenkins</h3>
                <p className="text-[#005fb0] font-bold text-xs uppercase tracking-wider mt-0.5">Lead Instructor</p>
                <span className="mt-2 px-3 py-1 bg-yellow-50 border border-yellow-200 text-[#725b00] rounded-full text-[10px] font-bold">🏫 Section: Bluebell</span>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-3">
                <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2"><span>📢</span> Announcements</h4>
                <div className="space-y-2 text-xs text-gray-600 max-h-[150px] overflow-y-auto">
                  {announcements.map((ann, i) => <p key={i} className="p-2 bg-gray-50 border border-gray-100 rounded-lg">• {ann}</p>)}
                </div>
                <button onClick={() => setActiveModal('announcement')} className="w-full py-2 bg-blue-600 text-white rounded-full text-xs font-bold hover:bg-blue-700 transition-all shadow-xs">Create Announcement</button>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4 relative">
                <div className="flex justify-between items-center"><h4 className="text-xs font-bold text-gray-700 uppercase">Calendar Core</h4><span className="text-[10px] font-bold text-gray-400">July 2026</span></div>
                {hoveredDayData && (
                  <div className="absolute left-4 right-4 top-11 bg-gray-900 text-white text-[10px] p-2 rounded-xl shadow-xl z-30 border border-gray-800">
                    <p className="font-bold text-yellow-400 border-b border-gray-700 pb-0.5 mb-1">Calendar Event Link</p>
                    <p>{hoveredDayData}</p>
                  </div>
                )}
                <div className="grid grid-cols-7 gap-1 text-center text-[9px] font-bold text-gray-400 uppercase"><span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span></div>
                <div className="grid grid-cols-7 gap-1 text-center text-xs">
                  {scheduleDays.map((item, idx) => (
                    <div
                      key={idx}
                      onMouseEnter={() => item.event && setHoveredDayData(item.event)}
                      onMouseLeave={() => setHoveredDayData(null)}
                      onClick={() => !item.muted && setSelectedDay(item.day)}
                      className={`p-1.5 rounded-full font-medium transition-all relative flex flex-col items-center justify-center cursor-pointer ${item.muted ? 'text-gray-200 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'} ${selectedDay === item.day ? 'bg-blue-600 text-white font-bold' : ''}`}
                    >
                      <span>{item.day}</span>
                      {item.hasDot && (
                        <span className={`w-1 h-1 rounded-full absolute bottom-0.5 ${selectedDay === item.day ? 'bg-white' : 'bg-blue-500'}`} />
                      )}
                    </div>
                  ))}
                </div>
                <div className="p-2 bg-gray-50 border border-gray-100 rounded-xl text-xs"><p className="font-bold text-gray-500 text-[10px]">Active Date Node:</p><p className="text-gray-700 font-medium mt-0.5">{currentActiveEvent}</p></div>
              </div>
            </aside>

            <div className="lg:col-span-8 space-y-6">
              <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div><h2 className="text-2xl font-black text-gray-800">Welcome, <span className="text-[#005fb0]">Sarah! ☀️</span></h2><p className="text-xs text-gray-400 font-semibold mt-0.5">ERP Framework Terminal Live</p></div>
                <button onClick={() => setActiveModal('leave')} className="px-4 py-2 border border-gray-100 text-gray-600 text-xs font-bold rounded-full hover:border-blue-400 transition-all flex items-center gap-1.5 shadow-xs"><span>📅</span> Apply Leave</button>
              </section>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div onClick={() => navigateToView('attendance')} className="bg-white p-5 rounded-2xl border border-gray-100 hover:border-blue-300 hover:shadow-md cursor-pointer transition-all flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center text-xl font-bold group-hover:scale-105 transition-transform">📋</div>
                  <div><p className="text-sm font-bold text-gray-700">Mark Attendance</p><p className="text-[11px] text-gray-400">Daily Class Records</p></div>
                </div>
                <div onClick={() => setActiveModal('duty')} className="bg-white p-5 rounded-2xl border border-gray-100 hover:border-yellow-300 hover:shadow-md cursor-pointer transition-all flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-yellow-50 text-yellow-700 rounded-full flex items-center justify-center text-xl font-bold group-hover:scale-105 transition-transform">🛡</div>
                  <div><p className="text-sm font-bold text-gray-700">Current Duty</p><p className="text-[11px] text-gray-400">Playground Sector</p></div>
                </div>
                <div onClick={() => setActiveModal('timetable')} className="bg-white p-5 rounded-2xl border border-gray-100 hover:border-red-300 hover:shadow-md cursor-pointer transition-all flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center text-xl font-bold group-hover:scale-105 transition-transform">⏱</div>
                  <div><p className="text-sm font-bold text-gray-700">Timetable Grid</p><p className="text-[11px] text-gray-400">Check active times</p></div>
                </div>
              </div>

              <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h4 className="text-xs font-black text-gray-400 uppercase tracking-wider mb-4">Core Toolkit</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs font-bold">
                  <button onClick={() => setActiveModal('homework')} className="p-3 border border-yellow-100 bg-yellow-50/20 rounded-xl hover:bg-yellow-50/50 transition-all flex flex-col items-center gap-1 text-[#735c00]"><span className="text-lg">📝</span>Add Homework</button>
                  <button onClick={() => setActiveModal('broadcast')} className="p-3 border border-red-100 bg-red-50/20 rounded-xl hover:bg-red-50/50 transition-all flex flex-col items-center gap-1 text-red-600"><span className="text-lg">📢</span>Broadcast</button>
                  <button onClick={() => navigateToView('reports')} className="p-3 border border-teal-100 bg-teal-50/20 rounded-xl hover:bg-teal-50/50 transition-all flex flex-col items-center gap-1 text-teal-600"><span className="text-lg">📊</span>Progress Cards</button>
                  <button onClick={() => navigateToView('attendance-history')} className="p-3 border border-blue-100 bg-blue-50/20 rounded-xl hover:bg-blue-50/50 transition-all flex flex-col items-center gap-1 text-blue-600"><span className="text-lg">🕒</span>History Logs</button>
                </div>
              </section>

              <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-extrabold text-gray-800 flex items-center gap-1.5"><span>📄</span> Worksheet Asset Pipeline</h4>
                  <div className="flex gap-2 items-center">
                    {stagedDoc && (
                      <button onClick={commitStagedWorksheet} className="px-3 py-1.5 bg-green-600 text-white font-bold rounded-full text-xs hover:bg-green-700 transition-all">
                        Confirm & Upload Document
                      </button>
                    )}
                    <label className="px-3 py-1.5 bg-blue-50 text-blue-600 font-bold border border-blue-100 rounded-full text-xs hover:bg-blue-100 transition-all cursor-pointer flex items-center gap-1">
                      <span>➕</span> Select File 
                      <input type="file" onChange={selectWorksheetFile} className="hidden" accept=".pdf,.docx,.jpg,.png" />
                    </label>
                  </div>
                </div>

                {stagedDoc && (
                  <div className="p-3 bg-yellow-50/40 border border-dashed border-yellow-200 rounded-xl text-xs flex justify-between items-center">
                    <p className="font-bold text-gray-700 truncate max-w-[280px]">📝 Staged Target: {stagedDoc.name} ({stagedDoc.size})</p>
                    <button onClick={() => setStagedDoc(null)} className="text-gray-400 hover:text-red-600 font-bold">Cancel</button>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {worksheets.map(w => (
                    <div key={w.id} className="p-3 border border-gray-100 rounded-xl bg-gray-50/50 flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{w.type === 'pdf' ? '🛑' : '📄'}</span>
                        <div className="min-w-0"><p className="font-bold text-gray-700 truncate max-w-[140px]">{w.name}</p><p className="text-[10px] text-gray-400 font-bold uppercase">{w.size}</p></div>
                      </div>
                      <button onClick={() => setWorksheets(worksheets.filter(x => x.id !== w.id))} className="text-gray-300 hover:text-red-600 font-bold text-sm px-2">🗑</button>
                    </div>
                  ))}
                </div>
              </section>

              <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-extrabold text-gray-800">Quick Roster Links</h4>
                  <input type="text" placeholder="Filter roster lists..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="px-3 py-1 bg-gray-50 border border-gray-100 rounded-full text-xs focus:outline-none w-full sm:w-44" />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
                  {[
                    { id: 1, name: "Aiden Jenkins", status: "Absent", isAbsent: true, class: "Bluebell", roll: "22-BB-01", img: "https://images.unsplash.com/photo-1602030028438-4cf153cba9e7?w=100" },
                    { id: 2, name: "Leo Miller", status: "Absent", isAbsent: true, class: "Bluebell", roll: "22-BB-02", img: "https://images.unsplash.com/photo-1603005901242-308ecb2879f8?w=100" },
                    { id: 3, name: "Sophia White", status: "Absent", isAbsent: true, class: "Bluebell", roll: "22-BB-03", img: "https://images.unsplash.com/photo-1595830344553-b845c99596c5?w=100" }
                  ].filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase())).map(stud => (
                    <div key={stud.id} onClick={() => { setSelectedStudentProfile(stud); navigateToView('student-profile'); }} className="p-3 bg-gray-50/40 border border-gray-100 rounded-xl hover:border-blue-300 hover:bg-white cursor-pointer transition-all">
                      <div className="w-12 h-12 rounded-full overflow-hidden mx-auto border shadow-inner"><img src={stud.img} alt="" className="w-full h-full object-cover" /></div>
                      <p className="font-bold text-gray-700 mt-2 truncate">{stud.name}</p>
                      <span className={`text-[9px] font-bold block mt-1 uppercase ${stud.isAbsent ? 'text-red-500' : 'text-green-600'}`}>{stud.status}</span>
                    </div>
                  ))}
                  <div onClick={() => navigateToView('students')} className="p-3 bg-gray-50/40 border border-dashed border-gray-200 rounded-xl hover:bg-blue-50/50 flex flex-col justify-center items-center cursor-pointer text-gray-400 font-bold">
                    <span className="text-blue-600 text-lg">→</span>
                    <p className="mt-1 text-gray-600 font-extrabold text-[11px]">View All</p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        )}

        {currentView === 'attendance' && <AttendanceRegister onNotify={showToast} />}
        {currentView === 'students' && <StudentRoster onSelectStudent={(stud) => { setSelectedStudentProfile(stud); navigateToView('student-profile'); }} />}
        {currentView === 'student-profile' && <StudentProfile initialStudent={selectedStudentProfile} onBack={() => navigateToView('dashboard')} />}
        {currentView === 'reports' && <StudentReports />}
        {currentView === 'attendance-history' && <AttendanceHistory />}

        {currentView === 'dashboard' && (
          <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4 mt-6">
            <div className="flex justify-between items-center">
              <h4 className="text-sm font-extrabold text-gray-800 flex items-center gap-1.5"><span>🖼</span> Comprehensive Gallery Deck</h4>
              <div className="flex gap-3 items-center">
                {stagedPhoto && (
                  <div className="flex gap-2 items-center bg-gray-50 p-1 border rounded-xl">
                    <img src={stagedPhoto.url} className="w-7 h-7 rounded-lg object-cover" alt="" />
                    <button onClick={commitStagedPhoto} className="px-3 py-1 bg-green-600 text-white font-bold rounded-full text-xs hover:bg-green-700 transition-all">
                      Confirm & Upload Photo
                    </button>
                    <button onClick={() => setStagedPhoto(null)} className="text-gray-400 font-bold pr-2 hover:text-red-600 text-xs">✕</button>
                  </div>
                )}
                <label className="px-4 py-1.5 bg-yellow-50 text-[#725b00] border border-yellow-200 font-bold rounded-full text-xs hover:bg-yellow-100 transition-all cursor-pointer">
                  Select Photo Image
                  <input type="file" onChange={selectPhotoFile} className="hidden" accept="image/*" />
                </label>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
              {galleryImages.map((img, idx) => (
                <div key={idx} className="relative aspect-square border border-gray-100 bg-gray-50 rounded-xl overflow-hidden group shadow-xs">
                  <img src={img.src} alt="Gallery item context" className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300" />
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      <footer className="bg-white border-t border-gray-100 py-6 px-10 text-xs font-bold text-gray-400 mt-12">
        <div className="max-w-[1280px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-[#005fb0] font-black">★ Iris World Academic ERP Ecosystem</p>
          <p>Session State: Client Simulated Production Frame Active (2026)</p>
        </div>
      </footer>

      {activeModal === 'announcement' && (
        <CreateAnnouncementModal onClose={() => setActiveModal(null)} onSubmit={(newAnn) => { setAnnouncements([newAnn.title, ...announcements]); showToast("Announcement registered!"); }} />
      )}
      {activeModal === 'leave' && <LeaveModal onClose={() => setActiveModal(null)} onSubmit={() => showToast("Leave request routed to queue!")} />}
      {activeModal === 'homework' && <HomeworkModal onClose={() => setActiveModal(null)} onSubmit={() => showToast("Homework delivered onto notice boards!")} />}
      {activeModal === 'broadcast' && <BroadcastModal onClose={() => setActiveModal(null)} onSubmit={() => showToast("Emergency broadcast alert queued!")} />}
      {activeModal === 'duty' && <DutyDetailsModal onClose={() => setActiveModal(null)} />}
      {activeModal === 'timetable' && <TimetableModal onClose={() => setActiveModal(null)} />}
    </div>
  );
}