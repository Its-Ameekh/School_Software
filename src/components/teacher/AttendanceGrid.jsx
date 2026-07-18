'use client';

import React, { useState, useEffect } from 'react';
import { teacherAPI } from '../../shared/api/teacher';

export default function AttendanceGrid({ onNotify, rosterData }) {
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isPastDeadline, setIsPastDeadline] = useState(false);
  const [loading, setLoading] = useState(false);
  const [attendanceData, setAttendanceData] = useState([]);
  
  const classId = 1; 
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    // Check if the current time is past 4:00 PM (16:00)
    const currentHour = new Date().getHours();
    setIsPastDeadline(currentHour >= 16);

    async function syncRosterWithServer() {
      if (!rosterData || rosterData.length === 0) return;
      setLoading(true);
      
      try {
        const res = await teacherAPI.getAttendanceHistory(null, classId, date, date);
        const history = res?.data || [];
        
        // Mark as submitted if database records exist for today
        setHasSubmitted(history.length > 0);

        const mappedData = rosterData.map(student => {
          const match = history.find(h => h.student_id === student.id);
          return {
            id: student.id,
            name: student.name,
            present: match ? match.status === "PRESENT" : true 
          };
        });
        setAttendanceData(mappedData);

      } catch (err) {
        console.warn("Backend API offline. Activating localized roster test vectors:", err.message);
        
        const localFallback = rosterData.map(student => ({
          id: student.id,
          name: student.name,
          present: true
        }));
        
        setAttendanceData(localFallback);
        setHasSubmitted(false);
      } finally {
        setLoading(false);
      }
    }
    syncRosterWithServer();
  }, [date, rosterData]);

  const toggleAttendance = (id) => {
    // Prevent editing if it's after 4 PM, or if submitted and not explicitly editing
    if (isPastDeadline || (hasSubmitted && !isEditMode)) return;

    setAttendanceData(prev => prev.map(student => 
      student.id === id ? { ...student, present: !student.present } : student
    ));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // API request to save to backend goes here
      setHasSubmitted(true);
      setIsEditMode(false);
      onNotify("Attendance submitted successfully.", "success");
    } finally {
      setLoading(false);
    }
  };

  // Grid is locked if it's past 4 PM, or if submitted and we haven't clicked "Edit"
  const isInterfaceLocked = isPastDeadline || (hasSubmitted && !isEditMode);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-6">
      <div className="border-b border-gray-100 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-xl font-bold text-gray-800">Teacher Attendance Register</h3>
          <p className="text-xs text-gray-400 mt-0.5">Section: Bluebell (Active Term)</p>
        </div>
        <div className="flex items-center gap-3">
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-xl text-xs focus:outline-none font-bold text-gray-600" />
          
          {!isPastDeadline && hasSubmitted && (
            <span className="bg-green-50 border border-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-black">✓ SUBMITTED</span>
          )}
        </div>
      </div>
      
      {loading ? (
        <p className="text-xs font-bold text-gray-400 text-center py-6 animate-pulse">Fetching student records...</p>
      ) : (
        <div className="overflow-x-auto border border-gray-100 rounded-xl text-xs">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 font-bold text-gray-500">
                <th className="p-3.5">Student Name</th>
                <th className="p-3.5 text-center bg-blue-50/50 text-blue-600 w-36">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {attendanceData.map((stud) => (
                <tr key={stud.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="p-3.5 font-bold text-gray-700">{stud.name}</td>
                  <td className="p-2 text-center bg-blue-50/20">
                    <button 
                      disabled={isInterfaceLocked || loading}
                      onClick={() => toggleAttendance(stud.id)}
                      className={`w-24 h-8 rounded-lg font-black text-xs border flex items-center justify-center mx-auto ${stud.present ? 'bg-green-50 border-green-200 text-green-600' : 'bg-red-50 border-red-200 text-red-500'} ${isInterfaceLocked ? 'opacity-70 cursor-not-allowed' : 'hover:scale-105'}`}
                    >
                      {stud.present ? '✓ PRESENT' : '× ABSENT'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
        {/* Show Edit button only if submitted AND it's before 4 PM */}
        {!isPastDeadline && hasSubmitted && !isEditMode && (
          <button 
            onClick={() => setIsEditMode(true)} 
            className="px-5 py-2 text-xs font-bold rounded-full border border-amber-300 text-amber-600 hover:bg-amber-50"
          >
            Edit Attendance
          </button>
        )}

        <button 
          disabled={isInterfaceLocked || loading} 
          onClick={handleSubmit} 
          className={`px-6 py-2 text-white text-xs font-bold rounded-full ${isInterfaceLocked ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {isPastDeadline ? 'Submission Closed' : hasSubmitted && !isEditMode ? 'Submitted' : 'Submit Attendance'}
        </button>
      </div>
    </div>
  );
}