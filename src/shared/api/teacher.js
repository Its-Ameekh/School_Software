// src/shared/api/teacher.js
import apiClient from './client';

export const teacherAPI = {
  // 1. Attendance Register Operations
  markAttendance: (payload) => apiClient.post('/attendance/mark', payload),

  submitAttendance: (payload) => apiClient.post('/attendance/submit', payload),

  getAttendanceHistory: (studentId, classId, fromDate, toDate) => {
    let params = [];
    if (studentId) params.push(`student_id=${studentId}`);
    if (classId) params.push(`class_id=${classId}`);
    if (fromDate) params.push(`from=${fromDate}`);
    if (toDate) params.push(`to=${toDate}`);
    const queryString = params.length > 0 ? `?${params.join('&')}` : '';
    return apiClient.get(`/attendance/history${queryString}`);
  },

  getClassRoster: (classId) => apiClient.get(`/classes/${classId}/students`, {
    // Falls back to mock data if the unassigned student engine or endpoint isn't live on staging yet
    validateStatus: (status) => (status >= 200 && status < 300) || status === 404
  }),

  // 2. Academic Progress Assessment Operations
  enterEvaluation: (payload) => apiClient.post('/progress/evaluation', payload),

  viewProgressCard: (studentId) => apiClient.get(`/progress/view?student_id=${studentId}`),

  // 3. Absence Leave Operations
  createLeaveRequest: (payload) => apiClient.post('/leave/teacher', payload),

  getMyLeaves: () => apiClient.get('/leave/teacher/my'),
};