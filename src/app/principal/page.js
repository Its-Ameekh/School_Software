'use client';

import React, { useState, useEffect } from 'react';

export default function PrincipalDashboard() {
  // Navigation & View Mode State
  // viewMode: "OPERATIONS", "FINANCE", or "CLASSES"
  const [viewMode, setViewMode] = useState('OPERATIONS');
  
  // Finance Navigation Tiers State
  // financeTier: "HOME" (Tier 1), "CLASSES" (Tier 2), "ROSTER" (Tier 3)
  const [financeTier, setFinanceTier] = useState('HOME');
  const [financeType, setFinanceType] = useState('TUITION');
  const [selectedFinanceClass, setSelectedFinanceClass] = useState('');
  const [financeSearchQuery, setFinanceSearchQuery] = useState('');

  // Class Management Tiers State
  // classTier: "GRID" (Tier 1), "COMMAND" (Tier 2)
  const [classTier, setClassTier] = useState('GRID');
  const [selectedClassId, setSelectedClassId] = useState('little-sprouts');
  
  // Class Command Tab Selection
  // commandTab: "ROSTER", "TIMETABLE", "ATTENDANCE", "PROGRESS"
  const [commandTab, setCommandTab] = useState('ROSTER');

  // Toast Notification Message
  const [toastMessage, setToastMessage] = useState('');

  // Clear toast automatically
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(''), 4000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  // Available Lead Teachers Pool
  const [availableTeachers, setAvailableTeachers] = useState([
    "Ms. Sarah J.",
    "Mr. David (Gym)",
    "Mrs. Jenkins",
    "Mr. Henderson",
    "Ms. Watson"
  ]);

  // --- MOCK ANNOUNCEMENTS & EVENTS (Mandate 1) ---
  const [announcements, setAnnouncements] = useState([
    { id: 1, text: "Dusshera Break starting Friday", category: "Holiday" },
    { id: 2, text: "Annual Health Checkup Week", category: "Health" }
  ]);

  const [events, setEvents] = useState([
    { id: 1, title: "Parent Teacher Meet", day: "25", month: "Oct", time: "09:00 AM - 12:00 PM" },
    { id: 2, title: "Halloween Parade", day: "28", month: "Oct", time: "03:30 PM Onwards" }
  ]);

  // Modal Visibility States
  const [showAnnounceModal, setShowAnnounceModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showBroadcastModal, setShowBroadcastModal] = useState(false);
  const [showWaiveModal, setShowWaiveModal] = useState(false);
  const [showAddClassModal, setShowAddClassModal] = useState(false);
  const [showProgressCardModal, setShowProgressCardModal] = useState(false);

  // Quick Actions Overlay modals visibility
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [showAddTeacherModal, setShowAddTeacherModal] = useState(false);
  const [showSendAlertModal, setShowSendAlertModal] = useState(false);
  const [showDailyReportModal, setShowDailyReportModal] = useState(false);
  
  // Daily Report Loading / Mask State
  const [dailyReportLoading, setDailyReportLoading] = useState(false);
  const [dailyReportLoadText, setDailyReportLoadText] = useState('');

  // Form States (Admissions & CRUD)
  const [newAnnounceText, setNewAnnounceText] = useState('');
  const [newAnnounceCat, setNewAnnounceCat] = useState('General');
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventDay, setNewEventDay] = useState('');
  const [newEventMonth, setNewEventMonth] = useState('Oct');
  const [newEventTime, setNewEventTime] = useState('');

  // Add Student Admission form state variables (Mandate 1)
  const [admissionForm, setAdmissionForm] = useState({
    fullName: '', dob: '', gender: 'Male', bloodGroup: 'O+', allergies: 'None', specialTalents: '',
    fatherName: '', fatherOcc: '', motherName: '', motherOcc: '', email: '', mobile: '',
    languagesSpoken: '', foodType: 'Vegetarian', transportPref: 'School Van',
    payMode: 'Cash', amountPaid: '', receiptNum: ''
  });

  // Unassigned Students Pipeline state (Mandate 1 & 2)
  const [unassignedStudents, setUnassignedStudents] = useState([]);

  // Add Teacher Form states (Mandate 3)
  const [newTeacherName, setNewTeacherName] = useState('');
  const [newTeacherPhone, setNewTeacherPhone] = useState('');
  const [newTeacherSpec, setNewTeacherSpec] = useState('');

  // Alert Sender Message State (Mandate 3)
  const [alertMessageContent, setAlertMessageContent] = useState('');

  // Broadcast Wizard States
  const [broadcastType, setBroadcastType] = useState('TUITION');
  const [broadcastSMS, setBroadcastSMS] = useState(true);
  const [broadcastEmail, setBroadcastEmail] = useState(true);
  const [broadcastDays, setBroadcastDays] = useState('4');
  const [broadcastLoading, setBroadcastLoading] = useState(false);

  // Exemption State
  const [waiveTargetRoll, setWaiveTargetRoll] = useState('');
  const [waiveReason, setWaiveReason] = useState('');

  // Class Management Add Class Form States
  const [newClassName, setNewClassName] = useState('');
  const [newClassTeacher, setNewClassTeacher] = useState('Ms. Sarah J.');

  // Student Add Form States
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentAge, setNewStudentAge] = useState('');

  // Student Progress Card overlay target
  const [selectedStudentGrades, setSelectedStudentGrades] = useState(null);

  // Timetable Edit Mode states
  const [editingSlot, setEditingSlot] = useState(null); // { day, idx }
  const [editingSlotVal, setEditingSlotVal] = useState('');

  // --- STUDENT LEDGER DATABASE STATE (Finance) ---
  const [studentsList, setStudentsList] = useState([
    { name: "Aiden Thompson", roll: "STU-2024-042", class: "Little Sprouts (Pre-K)", tuitionDue: 1200, tuitionStatus: "Paid", paymentMethod: "online", usesTransport: true, transportDue: 150, transportStatus: "Paid", transportMethod: "online" },
    { name: "Vihaan Reddy", roll: "STU-2024-081", class: "Little Sprouts (Pre-K)", tuitionDue: 1200, tuitionStatus: "Paid", paymentMethod: "bank", usesTransport: true, transportDue: 150, transportStatus: "Pending" },
    { name: "Anya Gupta", roll: "STU-2024-079", class: "Little Sprouts (Pre-K)", tuitionDue: 1200, tuitionStatus: "Paid", paymentMethod: "desk", usesTransport: false, transportDue: 0, transportStatus: "Paid" },
    { name: "Liam Carter", roll: "STU-2024-012", class: "Little Sprouts (Pre-K)", tuitionDue: 1200, tuitionStatus: "Pending", usesTransport: true, transportDue: 150, transportStatus: "Pending" },
    { name: "Olivia Vance", roll: "STU-2024-033", class: "Little Sprouts (Pre-K)", tuitionDue: 1200, tuitionStatus: "Pending", usesTransport: false, transportDue: 0, transportStatus: "Paid" },

    { name: "Leo Miller", roll: "STU-2024-051", class: "Kindergarten", tuitionDue: 1500, tuitionStatus: "Paid", paymentMethod: "bank", usesTransport: true, transportDue: 150, transportStatus: "Paid", transportMethod: "bank" },
    { name: "Sophia White", roll: "STU-2024-062", class: "Kindergarten", tuitionDue: 1500, tuitionStatus: "Pending", usesTransport: true, transportDue: 150, transportStatus: "Pending" },
    { name: "Mia Hamm", roll: "STU-2024-099", class: "Kindergarten", tuitionDue: 1500, tuitionStatus: "Paid", paymentMethod: "online", usesTransport: false, transportDue: 0, transportStatus: "Paid" },
    { name: "Ethan Hunt", roll: "STU-2024-101", class: "Kindergarten", tuitionDue: 1500, tuitionStatus: "Paid", paymentMethod: "online", usesTransport: true, transportDue: 150, transportStatus: "Paid", transportMethod: "online" },

    { name: "Noah Sterling", roll: "STU-2024-121", class: "Class 1", tuitionDue: 1800, tuitionStatus: "Paid", paymentMethod: "bank", usesTransport: true, transportDue: 150, transportStatus: "Pending" },
    { name: "Emma Watson", roll: "STU-2024-122", class: "Class 1", tuitionDue: 1800, tuitionStatus: "Paid", paymentMethod: "desk", usesTransport: false, transportDue: 0, transportStatus: "Paid" },
    { name: "Lucas Scott", roll: "STU-2024-123", class: "Class 1", tuitionDue: 1800, tuitionStatus: "Pending", usesTransport: true, transportDue: 150, transportStatus: "Pending" },
    { name: "Ava DuVernay", roll: "STU-2024-124", class: "Class 1", tuitionDue: 1800, tuitionStatus: "Paid", paymentMethod: "online", usesTransport: true, transportDue: 150, transportStatus: "Paid", transportMethod: "online" }
  ]);

  // --- CLASSES STATE DATABASE (Class Management) ---
  const [classesList, setClassesList] = useState([
    {
      id: "little-sprouts",
      name: "Little Sprouts (Pre-K)",
      teacher: "Ms. Sarah J.",
      substituteActive: false,
      students: [
        { name: "Aiden Thompson", roll: "STU-042", age: 4, statusToday: "Present", grades: { Art: "A", Behavior: "Excellent", Language: "Good", Math: "A-" } },
        { name: "Vihaan Reddy", roll: "STU-081", age: 4, statusToday: "Present", grades: { Art: "A-", Behavior: "Good", Language: "Excellent", Math: "A" } },
        { name: "Anya Gupta", roll: "STU-079", age: 4, statusToday: "Present", grades: { Art: "A+", Behavior: "Excellent", Language: "Excellent", Math: "A+" } },
        { name: "Liam Carter", roll: "STU-012", age: 4, statusToday: "Absent", grades: { Art: "B", Behavior: "Needs Improvement", Language: "C", Math: "B-" } },
        { name: "Olivia Vance", roll: "STU-033", age: 4, statusToday: "Leave", grades: { Art: "A", Behavior: "Excellent", Language: "A", Math: "A" } }
      ],
      timetable: {
        Monday: ["Art & Crafts", "Story Telling", "Nap Time", "Free Play"],
        Tuesday: ["Music Beats", "Puzzles Arena", "Lunch Buffet", "Sensory Play"],
        Wednesday: ["Phonics Intro", "Blocks Build", "Nap Time", "Playground"],
        Thursday: ["Art & Crafts", "Story Telling", "Lunch Buffet", "Sing Along"],
        Friday: ["Show & Tell", "Board Games", "Nap Time", "Dance Party"]
      },
      attendanceHistory: [
        { date: "Oct 20", count: "4/5" },
        { date: "Oct 21", count: "3/5" },
        { date: "Oct 22", count: "5/5" }
      ]
    },
    {
      id: "kindergarten",
      name: "Kindergarten",
      teacher: "Mr. David (Gym)",
      substituteActive: false,
      students: [
        { name: "Leo Miller", roll: "STU-051", age: 5, statusToday: "Present", grades: { Art: "A-", Behavior: "Good", Language: "Good", Math: "A" } },
        { name: "Sophia White", roll: "STU-062", age: 5, statusToday: "Absent", grades: { Art: "B+", Behavior: "Good", Language: "B", Math: "B+" } },
        { name: "Mia Hamm", roll: "STU-099", age: 5, statusToday: "Present", grades: { Art: "A+", Behavior: "Excellent", Language: "A+", Math: "A" } },
        { name: "Ethan Hunt", roll: "STU-101", age: 5, statusToday: "Present", grades: { Art: "A", Behavior: "Excellent", Language: "A", Math: "A+" } }
      ],
      timetable: {
        Monday: ["Pre-Math", "Writing Practice", "Recess", "Art Session"],
        Tuesday: ["General Science", "Physical Activity", "Lunch Break", "Music Session"],
        Wednesday: ["Spelling Drill", "Puzzles Arena", "Recess", "Drama Class"],
        Thursday: ["Pre-Math", "Physical Activity", "Lunch Break", "Free Play"],
        Friday: ["Science Project", "Group Reading", "Recess", "Video Show"]
      },
      attendanceHistory: [
        { date: "Oct 20", count: "3/4" },
        { date: "Oct 21", count: "4/4" },
        { date: "Oct 22", count: "3/4" }
      ]
    },
    {
      id: "class-1",
      name: "Class 1",
      teacher: "Mrs. Jenkins",
      substituteActive: false,
      students: [
        { name: "Noah Sterling", roll: "STU-121", age: 6, statusToday: "Present", grades: { Art: "A", Behavior: "Excellent", Language: "A-", Math: "A+" } },
        { name: "Emma Watson", roll: "STU-122", age: 6, statusToday: "Present", grades: { Art: "A+", Behavior: "Excellent", Language: "A+", Math: "A+" } },
        { name: "Lucas Scott", roll: "STU-123", age: 6, statusToday: "Absent", grades: { Art: "B-", Behavior: "Good", Language: "B", Math: "B" } },
        { name: "Ava DuVernay", roll: "STU-124", age: 6, statusToday: "Present", grades: { Art: "A", Behavior: "Excellent", Language: "A", Math: "A" } }
      ],
      timetable: {
        Monday: ["Maths Core", "English Lit", "Recess", "Environmental Studies"],
        Tuesday: ["Computer Lab", "Grammar Drills", "Lunch Break", "Sports Practice"],
        Wednesday: ["Maths Core", "Social Science", "Recess", "Art & Craft Workshop"],
        Thursday: ["Spelling Bee", "Computer Lab", "Lunch Break", "Science Lab"],
        Friday: ["Acoustics Lab", "Weekly Test", "Recess", "Library Hours"]
      },
      attendanceHistory: [
        { date: "Oct 20", count: "4/4" },
        { date: "Oct 21", count: "3/4" },
        { date: "Oct 22", count: "4/4" }
      ]
    }
  ]);

  const currentClassObj = classesList.find(c => c.id === selectedClassId) || classesList[0];

  // --- CRUD HANDLERS (Announcements & Events) ---
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
    setToastMessage("Announcement posted successfully!");
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
    setToastMessage("Event scheduled successfully!");
  };

  // --- FINANCE CONTROLLERS ---
  const handleCollectFees = (roll, type) => {
    setStudentsList(prev => prev.map(s => {
      if (s.roll === roll) {
        return type === 'TUITION' ? { ...s, tuitionStatus: 'Paid', paymentMethod: 'online' } : { ...s, transportStatus: 'Paid', transportMethod: 'online' };
      }
      return s;
    }));
    setToastMessage("Payment status updated to Paid successfully!");
  };
  const handleOpenWaiveModal = (roll) => {
    setWaiveTargetRoll(roll);
    setWaiveReason('');
    setShowWaiveModal(true);
  };
  const handleWaiveSubmit = (e) => {
    e.preventDefault();
    if (!waiveReason.trim()) return;
    setStudentsList(prev => prev.map(s => {
      if (s.roll === waiveTargetRoll) {
        return financeType === 'TUITION' ? { ...s, tuitionStatus: 'Waived', tuitionWaiveReason: waiveReason } : { ...s, transportStatus: 'Waived', transportWaiveReason: waiveReason };
      }
      return s;
    }));
    setShowWaiveModal(false);
    setToastMessage("Outstanding dues waived successfully!");
  };
  const handleTargetedAlert = (studentName) => {
    setToastMessage(`Alert notification dispatched directly to ${studentName}'s parents.`);
  };
  const handleSendBroadcast = (e) => {
    e.preventDefault();
    setBroadcastLoading(true);
    const pendingCount = studentsList.filter(s => {
      return broadcastType === 'TUITION' ? s.tuitionStatus === 'Pending' : (s.usesTransport && s.transportStatus === 'Pending');
    }).length;
    setTimeout(() => {
      setBroadcastLoading(false);
      setShowBroadcastModal(false);
      const methods = [];
      if (broadcastSMS) methods.push("SMS");
      if (broadcastEmail) methods.push("Email");
      setToastMessage(`Broadcast Success! Notified ${pendingCount} pending parents via ${methods.join(" & ")}.`);
    }, 1500);
  };
  const handleClassLevelBroadcast = (grade) => {
    const classPending = studentsList.filter(s => {
      if (s.class !== grade) return false;
      return financeType === 'TUITION' ? s.tuitionStatus === 'Pending' : (s.usesTransport && s.transportStatus === 'Pending');
    }).length;
    setToastMessage(`Dispatched targeted pings to ${classPending} pending parents in ${grade} class.`);
  };

  // --- DYNAMIC FINANCE CALCULATIONS ---
  const totalTuitionCollected = studentsList.filter(s => s.tuitionStatus === 'Paid').reduce((sum, s) => sum + s.tuitionDue, 0);
  const totalTransportCollected = studentsList.filter(s => s.usesTransport && s.transportStatus === 'Paid').reduce((sum, s) => sum + s.transportDue, 0);
  const outstandingBalanceArrears = studentsList.reduce((sum, s) => {
    const tuition = s.tuitionStatus === 'Pending' ? s.tuitionDue : 0;
    const transport = (s.usesTransport && s.transportStatus === 'Pending') ? s.transportDue : 0;
    return sum + tuition + transport;
  }, 0);
  const getMethodBreakdown = () => {
    const paidList = studentsList.filter(s => s.tuitionStatus === 'Paid');
    const total = paidList.reduce((sum, s) => sum + s.tuitionDue, 0);
    if (total === 0) return { online: 0, bank: 0, desk: 0, onlineAmt: 0, bankAmt: 0, deskAmt: 0 };
    const o = paidList.filter(s => s.paymentMethod === 'online').reduce((sum, s) => sum + s.tuitionDue, 0);
    const b = paidList.filter(s => s.paymentMethod === 'bank').reduce((sum, s) => sum + s.tuitionDue, 0);
    const d = paidList.filter(s => s.paymentMethod === 'desk').reduce((sum, s) => sum + s.tuitionDue, 0);
    return {
      online: Math.round((o / total) * 100), bank: Math.round((b / total) * 100), desk: Math.round((d / total) * 100),
      onlineAmt: o, bankAmt: b, deskAmt: d
    };
  };
  const methodBreakdown = getMethodBreakdown();

  // --- CLASS MANAGEMENT CONTROLLERS ---
  const handleTeacherAssignChange = (classId, teacherName) => {
    setClassesList(prev => prev.map(c => {
      if (c.id === classId) {
        return { ...c, teacher: teacherName };
      }
      return c;
    }));
    setToastMessage(`Assigned ${teacherName} as Lead Teacher.`);
  };

  const handleAddNewClass = (e) => {
    e.preventDefault();
    if (!newClassName.trim()) return;
    const newId = newClassName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const newRoom = {
      id: newId,
      name: newClassName,
      teacher: newClassTeacher,
      substituteActive: false,
      students: [],
      timetable: {
        Monday: ["English Lit", "Pre-Maths", "Nap Time", "Free Play"],
        Tuesday: ["General Science", "Physical Activity", "Lunch Break", "Music Session"],
        Wednesday: ["Spelling Drill", "Puzzles Arena", "Recess", "Drama Class"],
        Thursday: ["Pre-Maths", "Physical Activity", "Lunch Break", "Free Play"],
        Friday: ["Science Project", "Group Reading", "Recess", "Video Show"]
      },
      attendanceHistory: [
        { date: "Oct 20", count: "0/0" }
      ]
    };
    setClassesList([...classesList, newRoom]);
    setNewClassName('');
    setNewClassTeacher('Ms. Sarah J.');
    setShowAddClassModal(false);
    setToastMessage(`Created new Grade Room: ${newClassName}`);
  };

  const handleAddStudentToClass = (e) => {
    e.preventDefault();
    if (!newStudentName.trim() || !newStudentAge.trim()) return;
    const ageVal = parseInt(newStudentAge);
    const newRoll = `STU-${Math.floor(100 + Math.random() * 900)}`;
    const newStudentObj = {
      name: newStudentName,
      roll: newRoll,
      age: ageVal,
      statusToday: "Present",
      grades: { Art: "A", Behavior: "Excellent", Language: "Good", Math: "A-" }
    };
    setClassesList(prev => prev.map(c => {
      if (c.id === selectedClassId) {
        return { ...c, students: [...c.students, newStudentObj] };
      }
      return c;
    }));
    setNewStudentName('');
    setNewStudentAge('');
    setToastMessage(`Enrolled student ${newStudentName} into ${currentClassObj.name}.`);
  };

  const handleRemoveStudentFromClass = (roll) => {
    setClassesList(prev => prev.map(c => {
      if (c.id === selectedClassId) {
        return { ...c, students: c.students.filter(s => s.roll !== roll) };
      }
      return c;
    }));
    setToastMessage(`Removed student profile from classroom register.`);
  };

  const handleToggleSubstitute = (classId) => {
    setClassesList(prev => prev.map(c => {
      if (c.id === classId) {
        const nextState = !c.substituteActive;
        setToastMessage(nextState ? `Substitute Coverage activated for this section.` : `Primary Lead Teacher restored.`);
        return { ...c, substituteActive: nextState };
      }
      return c;
    }));
  };

  const handleTimetableSlotClick = (day, idx, value) => {
    setEditingSlot({ day, idx });
    setEditingSlotVal(value);
  };

  const handleSaveTimetableSlot = () => {
    if (!editingSlot) return;
    const { day, idx } = editingSlot;
    setClassesList(prev => prev.map(c => {
      if (c.id === selectedClassId) {
        const updated = [...c.timetable[day]];
        updated[idx] = editingSlotVal;
        return { ...c, timetable: { ...c.timetable, [day]: updated } };
      }
      return c;
    }));
    setEditingSlot(null);
    setToastMessage("Schedule slot updated successfully.");
  };

  const handleAttendanceChange = (roll, nextStatus) => {
    setClassesList(prev => prev.map(c => {
      if (c.id === selectedClassId) {
        return { ...c, students: c.students.map(s => s.roll === roll ? { ...s, statusToday: nextStatus } : s) };
      }
      return c;
    }));
    setToastMessage("Attendance status updated.");
  };

  const handleOpenProgressCard = (studentGrades) => {
    setSelectedStudentGrades(studentGrades);
    setShowProgressCardModal(true);
  };

  // --- MANDATE 1: +ADD STUDENT ENROLLMENT ADMISSIONS ---
  const handleAdmissionSubmit = (e) => {
    e.preventDefault();
    const newRoll = `STU-ADM-${Math.floor(1000 + Math.random() * 9000)}`;

    const newAdmittedStudent = {
      name: admissionForm.fullName,
      roll: newRoll,
      dob: admissionForm.dob,
      gender: admissionForm.gender,
      bloodGroup: admissionForm.bloodGroup,
      allergies: admissionForm.allergies,
      specialTalents: admissionForm.specialTalents,
      fatherName: admissionForm.fatherName,
      fatherOcc: admissionForm.fatherOcc,
      motherName: admissionForm.motherName,
      motherOcc: admissionForm.motherOcc,
      email: admissionForm.email,
      mobile: admissionForm.mobile,
      languagesSpoken: admissionForm.languagesSpoken,
      foodType: admissionForm.foodType,
      transportPref: admissionForm.transportPref,
      payMode: admissionForm.payMode,
      amountPaid: admissionForm.amountPaid,
      receiptNum: admissionForm.receiptNum,
      classAssignment: "UNASSIGNED"
    };

    setUnassignedStudents([...unassignedStudents, newAdmittedStudent]);
    setShowAddStudentModal(false);
    setToastMessage(`Admissions Registered: ${admissionForm.fullName} placed in pipeline.`);
    
    // Reset form
    setAdmissionForm({
      fullName: '', dob: '', gender: 'Male', bloodGroup: 'O+', allergies: 'None', specialTalents: '',
      fatherName: '', fatherOcc: '', motherName: '', motherOcc: '', email: '', mobile: '',
      languagesSpoken: '', foodType: 'Vegetarian', transportPref: 'School Van',
      payMode: 'Cash', amountPaid: '', receiptNum: ''
    });
  };

  // --- MANDATE 2: PIPELINE UNASSIGNED ALLOCATION ---
  const handleAssignPipelineStudent = (roll, classId) => {
    const student = unassignedStudents.find(s => s.roll === roll);
    const targetClass = classesList.find(c => c.id === classId);

    if (!student || !targetClass) return;

    // 1. Add to Class Students array
    const classStudentObj = {
      name: student.name,
      roll: student.roll,
      age: 4, // Default placement age
      statusToday: "Present",
      grades: { Art: "A", Behavior: "Excellent", Language: "Good", Math: "A-" }
    };

    setClassesList(prev => prev.map(c => {
      if (c.id === classId) {
        return { ...c, students: [...c.students, classStudentObj] };
      }
      return c;
    }));

    // 2. Add to Tuition Finance Ledger
    const tuitionAmt = classId === 'little-sprouts' ? 1200 : classId === 'kindergarten' ? 1500 : 1800;
    const isBus = student.transportPref === 'School Van';

    const financeStudentObj = {
      name: student.name,
      roll: student.roll,
      class: targetClass.name,
      tuitionDue: tuitionAmt,
      tuitionStatus: "Pending",
      paymentMethod: "online",
      usesTransport: isBus,
      transportDue: isBus ? 150 : 0,
      transportStatus: isBus ? "Pending" : "Paid"
    };

    setStudentsList([...studentsList, financeStudentObj]);

    // 3. Remove from Pipeline
    setUnassignedStudents(unassignedStudents.filter(s => s.roll !== roll));
    setToastMessage(`Assigned student ${student.name} to ${targetClass.name} roster.`);
  };

  // --- MANDATE 3: +ADD TEACHER ---
  const handleAddTeacherSubmit = (e) => {
    e.preventDefault();
    if (!newTeacherName.trim()) return;
    setAvailableTeachers([...availableTeachers, newTeacherName]);
    setNewTeacherName('');
    setNewTeacherPhone('');
    setNewTeacherSpec('');
    setShowAddTeacherModal(false);
    setToastMessage(`Faculty Pool: Added ${newTeacherName} to lead choices.`);
  };

  // --- MANDATE 3: SEND EMERGENCY ALERT BROADCASTER ---
  const handleSendAlertSubmit = (e) => {
    e.preventDefault();
    if (!alertMessageContent.trim()) return;

    const newAlertObj = {
      id: announcements.length > 0 ? Math.max(...announcements.map(a => a.id)) + 1 : 1,
      text: alertMessageContent,
      category: "⚠️ EMERGENCY URGENT"
    };

    setAnnouncements([newAlertObj, ...announcements]);
    setAlertMessageContent('');
    setShowSendAlertModal(false);
    setToastMessage("Emergency alert broadcasted live to Announcements.");
  };

  // --- MANDATE 3: DAILY REPORT AUDIT LOADERS ---
  const triggerDailyReportAuditor = () => {
    setDailyReportLoading(true);
    setDailyReportLoadText("Aggregating active attendance metrics...");

    setTimeout(() => {
      setDailyReportLoadText("Auditing tuition ledger transactions...");
      setTimeout(() => {
        setDailyReportLoading(false);
        setShowDailyReportModal(true);
      }, 1500);
    }, 1500);
  };

  // Get category badge color styling classes
  const getAnnounceCategoryBadge = (category) => {
    switch (category) {
      case 'Holiday':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'Health':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Academic':
        return 'bg-green-100 text-green-700 border-green-200';
      case '⚠️ EMERGENCY URGENT':
        return 'bg-red-600 text-white border-red-700 font-extrabold';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="bg-[#f9f9ff] text-[#111c2c] min-h-screen font-sans antialiased relative overflow-x-hidden pb-12">
      
      {/* --- BACKGROUND ACCENTS --- */}
      <div className="fixed top-24 left-12 text-yellow-400/20 pointer-events-none select-none text-6xl font-bold animate-pulse">★</div>
      <div className="fixed bottom-24 right-12 text-blue-400/10 pointer-events-none select-none text-8xl font-bold">☁</div>

      {/* --- FLOATING TOAST NOTIFICATION --- */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-[120] bg-emerald-600 text-white font-semibold text-xs px-5 py-3.5 rounded-2xl shadow-xl flex items-center gap-2 border border-emerald-500 animate-slideIn">
          <span>✓</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* --- FULL SCREEN LOADING MASK (Mandate 3 - Daily Report) --- */}
      {dailyReportLoading && (
        <div className="fixed inset-0 z-[200] bg-[#111c2c]/90 backdrop-blur-md flex flex-col items-center justify-center space-y-6 text-white p-4">
          <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
          <div className="text-center space-y-2">
            <h3 className="text-lg font-bold">Daily Executive Auditor</h3>
            <p className="text-xs text-blue-200 animate-pulse font-medium">{dailyReportLoadText}</p>
          </div>
        </div>
      )}

      {/* --- TOP HEADER NAVIGATION --- */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 w-full shadow-sm border-b border-gray-100">
        <div className="flex justify-between items-center w-full px-6 md:px-10 h-20 max-w-[1280px] mx-auto">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-[#005fb0]">
              <span className="text-xl font-bold">★</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight text-[#005fb0]">Iris World School</h1>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <nav className="flex gap-8 font-medium">
              <button 
                onClick={() => { setViewMode('OPERATIONS'); setClassTier('GRID'); }} 
                className={`text-sm px-3 py-1.5 rounded-full transition ${viewMode === 'OPERATIONS' ? 'text-[#005fb0] font-bold bg-blue-50' : 'text-gray-500 hover:bg-gray-50'}`}
              >
                Principal Portal
              </button>
              <button 
                onClick={() => { setViewMode('CLASSES'); setClassTier('GRID'); }} 
                className={`text-sm px-3 py-1.5 rounded-full transition ${viewMode === 'CLASSES' ? 'text-[#005fb0] font-bold bg-blue-50' : 'text-gray-500 hover:bg-gray-50'}`}
              >
                Classes
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

      {/* --- MAIN CONTAINER --- */}
      <main className="max-w-[1280px] mx-auto px-4 md:px-10 py-8 space-y-8">
        
        {/* Welcome Banner */}
        <header className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-6 p-8 bg-blue-50/50 border border-blue-100 rounded-2xl overflow-hidden shadow-sm">
          <div className="z-10">
            <p className="text-xs font-bold text-[#005fb0] uppercase tracking-widest mb-1">Management Portal</p>
            <h2 className="text-3xl font-extrabold text-[#111c2c]">
              {viewMode === 'OPERATIONS' ? 'Good Morning, Principal' : viewMode === 'FINANCE' ? 'Financial Ledger Console' : 'Class Management Portal'}
            </h2>
            <div className="flex flex-wrap gap-4 mt-3 text-gray-500 text-xs font-medium">
              <span className="flex items-center gap-1">📅 Monday, October 23, 2023</span>
              <span className="flex items-center gap-1">🏫 Academic Year 2023-24</span>
            </div>
          </div>
        </header>

        {/* --- VIEW MODE CONDITIONAL RENDER --- */}
        
        {/* VIEW 1: OPERATIONS */}
        {viewMode === 'OPERATIONS' && (
          <>
            {/* Quick Stats Bento Grid */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {renderStatCard("👶 Total Students", `${124 + unassignedStudents.length}`, "+12%", "Admissions pipeline synced")}
              {renderStatCard("👨🏫 Teachers", `${availableTeachers.length}`, "Stable", "Active Faculty Lead Pool")}
              {renderStatCard("🏫 Active Classes", `${classesList.length}`, "Active", "3 sections per age group")}
              {renderStatCard("📊 Attendance Rate", "94%", "Optimal", "Above monthly average")}
              {renderStatCard("💰 Fees Collected", "82%", "Pending", "$12,400 outstanding")}
              {renderStatCard("🚌 Transport Fleet", "06", "Normal", "All routes on time")}
              {renderStatCard("📝 Pending Admissions", "14", "Review", "Requires attention by Friday")}
              {renderStatCard("🎨 Inventory Items", "24", "Low Stock", "Art supplies need restock")}
            </section>

            {/* Splits */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
                <div className="flex justify-between items-center border-b border-gray-50 pb-2">
                  <h3 className="text-lg font-bold text-gray-800 flex items-center gap-1.5">
                    <span>📢</span> Announcements
                  </h3>
                  <button onClick={() => setShowAnnounceModal(true)} className="w-7 h-7 bg-blue-50 text-[#005fb0] hover:bg-blue-100 rounded-full flex items-center justify-center font-bold text-lg transition">+</button>
                </div>
                {announcements.length === 0 ? (
                  <p className="text-xs text-gray-400 py-4 text-center">No announcements listed.</p>
                ) : (
                  <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
                    {announcements.map(item => (
                      <div key={item.id} className="p-3 bg-gray-50 border border-gray-100 rounded-xl text-xs relative group flex flex-col items-start gap-1 animate-fadeIn">
                        <button onClick={() => handleDeleteAnnouncement(item.id)} className="absolute top-2 right-2 text-gray-400 hover:text-red-500 font-bold text-sm transition">×</button>
                        <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase border ${getAnnounceCategoryBadge(item.category)}`}>
                          {item.category}
                        </span>
                        <p className="font-semibold text-gray-700 mt-0.5 pr-4 leading-normal">{item.text}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Upcoming Events Module */}
              <div className="rounded-2xl p-6 bg-white border border-gray-100 shadow-sm space-y-4">
                <div className="flex justify-between items-center border-b border-gray-50 pb-2">
                  <h3 className="text-lg font-bold text-gray-800 flex items-center gap-1.5">
                    <span>📅</span> Upcoming Events
                  </h3>
                  <button onClick={() => setShowEventModal(true)} className="w-7 h-7 bg-blue-50 text-[#005fb0] hover:bg-blue-100 rounded-full flex items-center justify-center font-bold text-lg transition">+</button>
                </div>
                {events.length === 0 ? (
                  <p className="text-xs text-gray-400 py-4 text-center">No upcoming events scheduled.</p>
                ) : (
                  <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
                    {events.map(item => (
                      <div key={item.id} className="flex gap-4 p-3 bg-gray-50 border border-gray-100 rounded-xl transition relative group animate-fadeIn">
                        <button onClick={() => handleDeleteEvent(item.id)} className="absolute top-2 right-2 text-gray-400 hover:text-red-500 font-bold text-sm transition">×</button>
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

            {/* Quick Actions Panel (Mandate 3 - matching UI buttons layout) */}
            <section className="space-y-4">
              <h3 className="text-lg font-bold text-gray-800">Quick Actions</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button 
                  onClick={() => setShowAddStudentModal(true)}
                  className="p-5 rounded-2xl font-bold text-sm shadow-sm transition active:scale-95 text-center bg-[#005fb0] text-white hover:bg-blue-700"
                >
                  ➕ Add Student
                </button>
                <button 
                  onClick={() => setShowAddTeacherModal(true)}
                  className="p-5 rounded-2xl font-bold text-sm shadow-sm transition active:scale-95 text-center bg-blue-50 text-[#005fb0] border border-blue-100 hover:bg-blue-100/60"
                >
                  💼 Add Teacher
                </button>
                <button 
                  onClick={() => setShowSendAlertModal(true)}
                  className="p-5 rounded-2xl font-bold text-sm shadow-sm transition active:scale-95 text-center bg-red-50 text-red-700 border border-red-100 hover:bg-red-100/60"
                >
                  📢 Send Alert
                </button>
                <button 
                  onClick={triggerDailyReportAuditor}
                  className="p-5 rounded-2xl font-bold text-sm shadow-sm transition active:scale-95 text-center bg-gray-800 text-white hover:bg-gray-900"
                >
                  📊 Daily Report
                </button>
              </div>
            </section>
          </>
        )}

        {/* VIEW 2: CLASSES (With unassigned pipeline alerts) */}
        {viewMode === 'CLASSES' && (
          <div className="space-y-6">
            
            {/* MANDATE 2: UNASSIGNED STUDENT PIPELINE ALERT FRAME */}
            {unassignedStudents.length > 0 && classTier === 'GRID' && (
              <div className="p-5 bg-amber-50 border border-amber-200 rounded-2xl shadow-sm space-y-4 animate-slideIn">
                <div className="flex items-center gap-2 text-amber-800 font-bold text-xs">
                  <span>⚠️</span>
                  <span>Administrative Attention: Enrolled Student Missing Classroom Allocation</span>
                </div>
                
                <div className="divide-y divide-amber-100">
                  {unassignedStudents.map(student => (
                    <div key={student.roll} className="py-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs">
                      <div>
                        <p className="font-bold text-gray-800">{student.name}</p>
                        <p className="text-[10px] text-gray-400 mt-0.5">Mobile: {student.mobile} • Dues Paid: ${student.amountPaid}</p>
                      </div>
                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        <span className="text-gray-500 font-medium">Assign To:</span>
                        <select 
                          onChange={(e) => handleAssignPipelineStudent(student.roll, e.target.value)}
                          defaultValue=""
                          className="bg-white border border-amber-300 rounded-lg text-xs font-semibold px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                        >
                          <option value="" disabled>Select Classroom...</option>
                          {classesList.map(c => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TIER 1: Master Classroom Matrix */}
            {classTier === 'GRID' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">Master Classroom Matrix</h3>
                    <p className="text-xs text-gray-400 mt-0.5">Overview of active Grade Rooms and assigned instructors.</p>
                  </div>
                  <button 
                    onClick={() => setShowAddClassModal(true)}
                    className="px-5 py-2.5 bg-[#005fb0] text-white font-bold text-xs rounded-full hover:shadow-md transition active:scale-95 flex items-center gap-1"
                  >
                    <span>＋</span> Add New Class
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {classesList.map(grade => {
                    const presentCount = grade.students.filter(s => s.statusToday === 'Present').length;
                    const totalStudents = grade.students.length;
                    const liveAttendanceRate = totalStudents > 0 ? Math.round((presentCount / totalStudents) * 100) : 0;

                    return (
                      <div 
                        key={grade.id}
                        className="rounded-2xl p-6 bg-white border border-gray-100 shadow-sm hover:shadow-md transition flex flex-col justify-between h-60 relative group"
                      >
                        <div>
                          <div className="flex justify-between items-start">
                            <h4 
                              onClick={() => { setSelectedClassId(grade.id); setClassTier('COMMAND'); setCommandTab('ROSTER'); }}
                              className="font-black text-gray-800 text-lg hover:text-[#005fb0] cursor-pointer hover:underline"
                            >
                              {grade.name}
                            </h4>
                            {grade.substituteActive && (
                              <span className="bg-amber-100 text-amber-700 text-[9px] font-bold px-2 py-0.5 rounded-full border border-amber-200">SUB COVERAGE</span>
                            )}
                          </div>
                          
                          {/* Lead TeacherDropdown */}
                          <div className="mt-3">
                            <label className="block text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-1">Class Teacher</label>
                            <select 
                              value={grade.teacher}
                              onChange={(e) => handleTeacherAssignChange(grade.id, e.target.value)}
                              className="bg-gray-50 border border-transparent rounded-lg text-xs font-semibold px-2 py-1.5 w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400/25 focus:bg-white"
                            >
                              {availableTeachers.map(t => (
                                <option key={t} value={t}>{t}</option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 border-t border-gray-50 pt-4 mt-4">
                          <div>
                            <span className="text-[10px] text-gray-400 block uppercase font-bold tracking-wider">Enrolled</span>
                            <span className="font-bold text-gray-700 text-sm">{totalStudents} Students</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-gray-400 block uppercase font-bold tracking-wider">Today's Attendance</span>
                            <span className={`font-bold text-sm ${liveAttendanceRate >= 90 ? 'text-green-600' : 'text-red-500'}`}>
                              {liveAttendanceRate}% Live
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TIER 2: Classroom Command Center */}
            {classTier === 'COMMAND' && (
              <div className="space-y-6 animate-fadeIn">
                
                {/* Header Back button */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <button 
                    onClick={() => setClassTier('GRID')}
                    className="inline-flex items-center text-sm font-semibold text-[#005fb0] hover:underline cursor-pointer gap-1"
                  >
                    ← Back to Master Matrix
                  </button>

                  <div className="flex items-center gap-2 bg-white px-4 py-2 border border-gray-100 rounded-xl shadow-sm">
                    <span className="text-xs font-bold text-gray-500">Emergency Substitute Coverage:</span>
                    <button 
                      onClick={() => handleToggleSubstitute(currentClassObj.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition active:scale-95 ${
                        currentClassObj.substituteActive 
                          ? 'bg-amber-600 text-white hover:bg-amber-700 shadow-sm' 
                          : 'bg-amber-50 text-amber-700 hover:bg-amber-100/50 border border-amber-100'
                      }`}
                    >
                      {currentClassObj.substituteActive ? '✓ Substitute Assigned' : 'Assign Substitute'}
                    </button>
                  </div>
                </div>

                {/* Sub-Header Banner */}
                <div className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{currentClassObj.name}</h3>
                    <p className="text-xs text-gray-400 mt-1">
                      Lead Instructor: <span className="font-semibold text-gray-600">{currentClassObj.teacher}</span>
                      {currentClassObj.substituteActive && (
                        <span className="text-amber-600 font-bold ml-1.5">(Emergency Substitute Cover Active)</span>
                      )}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-xs bg-blue-50 border border-blue-100 text-[#005fb0] font-bold px-3 py-1.5 rounded-xl">
                      👦 {currentClassObj.students.length} Enrolled
                    </span>
                    <span className="text-xs bg-green-50 border border-green-100 text-green-700 font-bold px-3 py-1.5 rounded-xl">
                      📅 live schedule active
                    </span>
                  </div>
                </div>

                {/* Command tabs */}
                <div className="flex border-b border-gray-100 gap-6">
                  {renderTabSelector("ROSTER", "👦 Student Roster", commandTab, setCommandTab)}
                  {renderTabSelector("TIMETABLE", "📅 Weekly Timetable", commandTab, setCommandTab)}
                  {renderTabSelector("ATTENDANCE", "📋 Attendance Archive", commandTab, setCommandTab)}
                  {renderTabSelector("PROGRESS", "📊 Progress Reports", commandTab, setCommandTab)}
                </div>

                {/* --- TAB CONTENT --- */}
                
                {/* SUB-VIEW A: Roster */}
                {commandTab === 'ROSTER' && (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    
                    <div className="lg:col-span-8 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs border-collapse">
                          <thead>
                            <tr className="bg-gray-50 text-gray-400 uppercase font-bold border-b border-gray-100">
                              <th className="py-4 px-6">Student Name</th>
                              <th className="py-4 px-6">Roll Number</th>
                              <th className="py-4 px-6">Age</th>
                              <th className="py-4 px-6 text-right">Operations</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-50">
                            {currentClassObj.students.length === 0 ? (
                              <tr>
                                <td colSpan="4" className="py-8 text-center text-gray-400 italic">No students registered in this class.</td>
                              </tr>
                            ) : (
                              currentClassObj.students.map(s => (
                                <tr key={s.roll} className="hover:bg-gray-50/50 transition">
                                  <td className="py-4 px-6 font-bold text-gray-700">{s.name}</td>
                                  <td className="py-4 px-6 text-gray-400">{s.roll}</td>
                                  <td className="py-4 px-6 font-semibold">{s.age} yrs</td>
                                  <td className="py-4 px-6 text-right">
                                    <button 
                                      onClick={() => handleRemoveStudentFromClass(s.roll)}
                                      className="px-2.5 py-1 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 rounded-lg font-bold text-[10px] uppercase transition active:scale-95"
                                    >
                                      Remove
                                    </button>
                                  </td>
                                </tr>
                              ))
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Add Student block */}
                    <div className="lg:col-span-4 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-4">
                      <div>
                        <h4 className="text-sm font-bold text-gray-800">Enroll Student</h4>
                        <p className="text-[11px] text-gray-400 mt-0.5">Add a new profile to this classroom ledger.</p>
                      </div>
                      <form onSubmit={handleAddStudentToClass} className="space-y-4">
                        <div>
                          <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Student Name</label>
                          <input 
                            type="text"
                            placeholder="e.g. Liam Jenkins"
                            value={newStudentName}
                            onChange={(e) => setNewStudentName(e.target.value)}
                            className="w-full px-3 py-2 bg-gray-50 border border-transparent rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-400/20"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Age</label>
                          <input 
                            type="number"
                            placeholder="e.g. 4"
                            value={newStudentAge}
                            onChange={(e) => setNewStudentAge(e.target.value)}
                            className="w-full px-3 py-2 bg-gray-50 border border-transparent rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-400/20"
                            required
                          />
                        </div>
                        <button type="submit" className="w-full py-2.5 bg-[#005fb0] text-white text-xs font-bold rounded-xl hover:bg-blue-700 transition active:scale-95">
                          Submit Enrollment
                        </button>
                      </form>
                    </div>

                  </div>
                )}

                {/* SUB-VIEW B: Timetable */}
                {commandTab === 'TIMETABLE' && (
                  <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-4">
                    <div>
                      <h4 className="text-sm font-bold text-gray-800">Weekly Schedule Grid</h4>
                      <p className="text-[11px] text-gray-400 mt-0.5">Click any timetable block to edit subjects live.</p>
                    </div>

                    {currentClassObj.substituteActive && (
                      <div className="p-3 bg-amber-50 text-amber-700 border border-amber-200 rounded-xl text-xs font-semibold animate-pulse">
                        ⚠️ EMERGENCY SUBSTITUTE ACTIVE: General curriculum coverage overrides shown in scheduling blocks below.
                      </div>
                    )}

                    <div className="overflow-x-auto">
                      <div className="min-w-[800px] border border-gray-100 rounded-xl divide-y divide-gray-100">
                        <div className="grid grid-cols-6 bg-gray-50/50 p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
                          <div>Day</div>
                          <div>Period 1<br/><span className="text-[9px] font-normal capitalize">09:00 - 10:00</span></div>
                          <div>Period 2<br/><span className="text-[9px] font-normal capitalize">10:00 - 11:00</span></div>
                          <div>Period 3<br/><span className="text-[9px] font-normal capitalize">11:00 - 12:00</span></div>
                          <div>Period 4<br/><span className="text-[9px] font-normal capitalize">12:00 - 01:00</span></div>
                          <div className="text-right">Actions</div>
                        </div>

                        {Object.keys(currentClassObj.timetable).map(day => (
                          <div key={day} className="grid grid-cols-6 items-center p-4 text-xs">
                            <div className="font-bold text-gray-700">{day}</div>
                            {currentClassObj.timetable[day].map((subject, idx) => {
                              const isEditing = editingSlot && editingSlot.day === day && editingSlot.idx === idx;

                              return (
                                <div key={idx} className="pr-4">
                                  {isEditing ? (
                                    <div className="flex items-center gap-1.5">
                                      <input 
                                        type="text"
                                        value={editingSlotVal}
                                        onChange={(e) => setEditingSlotVal(e.target.value)}
                                        className="px-2 py-1 bg-gray-50 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-400 w-full text-xs font-semibold"
                                        autoFocus
                                        onKeyDown={(e) => { if (e.key === 'Enter') handleSaveTimetableSlot(); }}
                                      />
                                      <button onClick={handleSaveTimetableSlot} className="text-green-600 font-bold hover:underline">✓</button>
                                    </div>
                                  ) : (
                                    <div 
                                      onClick={() => handleTimetableSlotClick(day, idx, subject)}
                                      className={`p-2.5 rounded-xl border border-dashed border-gray-200 cursor-pointer hover:border-blue-400 hover:bg-blue-50/20 transition ${
                                        currentClassObj.substituteActive ? 'text-amber-700 bg-amber-50/20' : 'text-[#005fb0] bg-blue-50/10'
                                      }`}
                                    >
                                      <span className="font-semibold block">{subject}</span>
                                      <span className="text-[9px] text-gray-400 font-normal">
                                        {currentClassObj.substituteActive ? 'Sub Cover' : 'Lead'}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                            <div className="text-right">
                              <span className="text-gray-300 text-[10px] font-semibold">Active</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* SUB-VIEW C: Attendance */}
                {commandTab === 'ATTENDANCE' && (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    
                    <div className="lg:col-span-8 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                      <div className="p-4 border-b border-gray-50">
                        <h4 className="text-sm font-bold text-gray-800">Daily Attendance Registry</h4>
                        <p className="text-[11px] text-gray-400 mt-0.5">Review or update student attendance status tags.</p>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs border-collapse">
                          <thead>
                            <tr className="bg-gray-50 text-gray-400 uppercase font-bold border-b border-gray-100">
                              <th className="py-4 px-6">Student Name</th>
                              <th className="py-4 px-6">Roll Number</th>
                              <th className="py-4 px-6">Status Today</th>
                              <th className="py-4 px-6 text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-50">
                            {currentClassObj.students.map(s => (
                              <tr key={s.roll} className="hover:bg-gray-50/50 transition">
                                <td className="py-4 px-6 font-bold text-gray-700">{s.name}</td>
                                <td className="py-4 px-6 text-gray-400">{s.roll}</td>
                                <td className="py-4 px-6">
                                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                    s.statusToday === 'Present' 
                                      ? 'bg-green-50 text-green-700 border border-green-100' 
                                      : s.statusToday === 'Absent'
                                      ? 'bg-red-50 text-red-700 border border-red-100'
                                      : 'bg-yellow-50 text-yellow-700 border border-yellow-100'
                                  }`}>
                                    {s.statusToday}
                                  </span>
                                </td>
                                <td className="py-4 px-6 text-right">
                                  <div className="flex gap-1.5 justify-end">
                                    <button onClick={() => handleAttendanceChange(s.roll, 'Present')} className="px-2 py-1 bg-green-50 text-green-600 hover:bg-green-100 rounded text-[10px] font-bold">Present</button>
                                    <button onClick={() => handleAttendanceChange(s.roll, 'Absent')} className="px-2 py-1 bg-red-50 text-red-600 hover:bg-red-100 rounded text-[10px] font-bold">Absent</button>
                                    <button onClick={() => handleAttendanceChange(s.roll, 'Leave')} className="px-2 py-1 bg-yellow-50 text-yellow-600 hover:bg-yellow-100 rounded text-[10px] font-bold">Leave</button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="lg:col-span-4 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-4">
                      <div>
                        <h4 className="text-sm font-bold text-gray-800">Historical Archives</h4>
                        <p className="text-[11px] text-gray-400 mt-0.5">Recent daily attendance tracking logs.</p>
                      </div>
                      <div className="space-y-3">
                        {currentClassObj.attendanceHistory.map((h, idx) => (
                          <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 border border-gray-100 rounded-xl text-xs">
                            <div>
                              <p className="font-bold text-gray-700">{h.date}, 2024</p>
                              <p className="text-[10px] text-gray-400 mt-0.5">Ratio: {h.count} Present</p>
                            </div>
                            <span className="bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded text-[9px] border border-green-200">ARCHIVED</span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                )}

                {/* SUB-VIEW D: Academics & Report cards */}
                {commandTab === 'PROGRESS' && (
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="p-4 border-b border-gray-50">
                      <h4 className="text-sm font-bold text-gray-800">Class Performance Roster</h4>
                      <p className="text-[11px] text-gray-400 mt-0.5">Assess student report cards and behavioral grades.</p>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="bg-gray-50 text-gray-400 uppercase font-bold border-b border-gray-100">
                            <th className="py-4 px-6">Student Name</th>
                            <th className="py-4 px-6">Roll Number</th>
                            <th className="py-4 px-6">Academic Status</th>
                            <th className="py-4 px-6 text-right">Report Card</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                          {currentClassObj.students.map(s => (
                            <tr key={s.roll} className="hover:bg-gray-50/50 transition">
                              <td className="py-4 px-6 font-bold text-gray-700">{s.name}</td>
                              <td className="py-4 px-6 text-gray-400">{s.roll}</td>
                              <td className="py-4 px-6">
                                <span className="inline-flex items-center px-2 py-0.5 rounded bg-blue-50 text-[#005fb0] font-bold text-[10px] border border-blue-100">Grade: A</span>
                              </td>
                              <td className="py-4 px-6 text-right">
                                <button 
                                  onClick={() => handleOpenProgressCard(s.grades)}
                                  className="px-3.5 py-1.5 bg-gradient-to-b from-[#4f9dff] to-[#005fb0] text-white font-bold rounded-lg hover:shadow-md transition active:scale-95 text-[10px] uppercase tracking-wider"
                                >
                                  View Progress Card
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

              </div>
            )}

          </div>
        )}

        {/* VIEW 3: FINANCE */}
        {viewMode === 'FINANCE' && (
          <div className="space-y-6">
            
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

            {/* FINANCE TIER 1 */}
            {financeTier === 'HOME' && (
              <div className="space-y-8 animate-fadeIn">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {renderFinancialStatCard("💰 Total Tuition Collected", `$${totalTuitionCollected.toLocaleString()}`, "bg-green-50 border-green-100 text-green-700")}
                  {renderFinancialStatCard("⚠️ Outstanding Balance Arrears", `$${outstandingBalanceArrears.toLocaleString()}`, "bg-red-50 border-red-100 text-red-700")}
                  {renderFinancialStatCard("🚌 Overall Transport Collection", `$${totalTransportCollected.toLocaleString()}`, "bg-blue-50 border-blue-100 text-blue-700")}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div 
                    onClick={() => { setFinanceType('TUITION'); setFinanceTier('CLASSES'); }}
                    className="rounded-2xl p-8 bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-[#005fb0]/20 transition cursor-pointer flex flex-col justify-between group h-64"
                  >
                    <div>
                      <div className="w-12 h-12 bg-blue-50 text-[#005fb0] rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-105 transition">📊</div>
                      <h3 className="text-xl font-bold text-gray-800">Tuition Fees by Class</h3>
                      <p className="text-xs text-gray-400 mt-1 max-w-sm font-medium">Review class-wise Tuition receipts progress, pay status rosters, and perform fee collection.</p>
                    </div>
                    <span className="text-xs text-[#005fb0] font-bold group-hover:translate-x-1.5 transition inline-flex items-center gap-1 mt-4">Open Tuition Ledger →</span>
                  </div>

                  <div 
                    onClick={() => { setFinanceType('TRANSPORT'); setFinanceTier('CLASSES'); }}
                    className="rounded-2xl p-8 bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-[#005fb0]/20 transition cursor-pointer flex flex-col justify-between group h-64"
                  >
                    <div>
                      <div className="w-12 h-12 bg-yellow-50 text-[#735c00] rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-105 transition">🚌</div>
                      <h3 className="text-xl font-bold text-gray-800">Transport Fee Ledger</h3>
                      <p className="text-xs text-gray-400 mt-1 max-w-sm font-medium">Manage student transport ledger lists, identify active bus route subscribers, and record vehicle dues.</p>
                    </div>
                    <span className="text-xs text-[#005fb0] font-bold group-hover:translate-x-1.5 transition inline-flex items-center gap-1 mt-4">Open Transport Ledger →</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                  <div className="lg:col-span-6 rounded-2xl p-6 bg-white border border-gray-100 shadow-sm space-y-4">
                    <div>
                      <h4 className="text-sm font-bold text-gray-800">Payment Method Breakdown</h4>
                      <p className="text-[11px] text-gray-400 mt-0.5">Summary split of tuition streams received</p>
                    </div>
                    <div className="space-y-3 pt-2">
                      {renderBreakdownBar("💻 Online Portal", methodBreakdown.online, `$${(methodBreakdown.onlineAmt || 0).toLocaleString()}`, "bg-indigo-500")}
                      {renderBreakdownBar("🏦 Bank Transfer", methodBreakdown.bank, `$${(methodBreakdown.bankAmt || 0).toLocaleString()}`, "bg-emerald-500")}
                      {renderBreakdownBar("🗄️ Desk Cash/Cheque", methodBreakdown.desk, `$${(methodBreakdown.deskAmt || 0).toLocaleString()}`, "bg-amber-500")}
                    </div>
                  </div>

                  <div className="lg:col-span-6 rounded-2xl p-6 bg-white border border-gray-100 shadow-sm flex flex-col justify-between gap-4">
                    <div>
                      <h4 className="text-sm font-bold text-gray-800">Dues Broadcast Controller</h4>
                      <p className="text-[11px] text-gray-400 mt-0.5">Issue reminders to parents with outstanding accounts</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <button onClick={() => { setBroadcastType('TUITION'); setShowBroadcastModal(true); }} className="py-4 px-4 bg-gradient-to-b from-[#4f9dff] to-[#005fb0] text-white hover:shadow-md rounded-xl font-bold text-xs transition active:scale-95 flex items-center justify-center gap-2"><span>📢</span> Broadcast Tuition</button>
                      <button onClick={() => { setBroadcastType('TRANSPORT'); setShowBroadcastModal(true); }} className="py-4 px-4 bg-gradient-to-b from-yellow-400 to-[#735c00] text-white hover:shadow-md rounded-xl font-bold text-xs transition active:scale-95 flex items-center justify-center gap-2"><span>🚌</span> Broadcast Transport</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* FINANCE TIER 2 */}
            {financeTier === 'CLASSES' && (
              <div className="space-y-6 animate-fadeIn">
                <h3 className="text-xl font-bold text-gray-800">{financeType === 'TUITION' ? 'Tuition Roster: Class Selector' : 'Transport Roster: Class Selector'}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {classesList.map(grade => {
                    const classStudents = studentsList.filter(s => s.class === grade.name);
                    const totalCount = financeType === 'TUITION' ? classStudents.length : classStudents.filter(s => s.usesTransport).length;
                    const paidCount = financeType === 'TUITION' ? classStudents.filter(s => s.tuitionStatus === 'Paid').length : classStudents.filter(s => s.usesTransport && s.transportStatus === 'Paid').length;

                    return (
                      <div key={grade.id} className="rounded-2xl p-6 bg-white border border-gray-100 shadow-sm hover:border-[#005fb0]/20 hover:shadow-md transition flex flex-col justify-between h-56">
                        <h4 className="font-bold text-gray-800 text-lg">{grade.name}</h4>
                        <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-gray-50">
                          <div className="flex justify-between items-center text-xs">
                            <div>
                              <span className="text-[10px] text-gray-400 block uppercase font-bold tracking-wider">Ledger Status</span>
                              <span className="font-bold text-gray-700">{paidCount}/{totalCount} Paid</span>
                            </div>
                            <button onClick={() => { setSelectedFinanceClass(grade.name); setFinanceTier('ROSTER'); setFinanceSearchQuery(''); }} className="px-3.5 py-1.5 bg-blue-50 text-[#005fb0] font-bold rounded-lg hover:bg-blue-100 transition text-[11px]">Open List</button>
                          </div>
                          <button onClick={() => handleClassLevelBroadcast(grade.name)} className="w-full py-2 bg-gray-50 border border-gray-100 hover:bg-gray-100 rounded-xl text-[10px] font-bold text-gray-500 uppercase tracking-wider transition active:scale-[0.97]">📢 Remind Pending Parents</button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* FINANCE TIER 3 */}
            {financeTier === 'ROSTER' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <span className="text-xs font-bold text-[#005fb0] uppercase tracking-wider">{financeType === 'TUITION' ? 'Tuition Ledger' : 'Transport Dues Ledger'}</span>
                    <h3 className="text-xl font-bold text-gray-800">{selectedFinanceClass} Roster</h3>
                  </div>
                  <div className="relative w-full md:w-64">
                    <span className="absolute left-3 top-2.5 text-gray-400 text-xs">🔍</span>
                    <input type="text" placeholder="Search student..." value={financeSearchQuery} onChange={(e) => setFinanceSearchQuery(e.target.value)} className="w-full pl-8 pr-4 py-1.5 rounded-full bg-white border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-400/20" />
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-gray-50 text-gray-400 uppercase font-bold border-b border-gray-100">
                          <th className="py-4 px-6">Student Name</th>
                          <th className="py-4 px-6">Roll Number</th>
                          <th className="py-4 px-6">Dues Amount</th>
                          <th className="py-4 px-6">Payment Status</th>
                          <th className="py-4 px-6 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {(() => {
                          const filtered = studentsList.filter(s => {
                            if (s.class !== selectedFinanceClass) return false;
                            if (financeType === 'TRANSPORT' && !s.usesTransport) return false;
                            return s.name.toLowerCase().includes(financeSearchQuery.toLowerCase());
                          });
                          if (filtered.length === 0) return <tr><td colSpan="5" className="py-8 text-center text-gray-400 italic">No student records match filters.</td></tr>;
                          return filtered.map(student => {
                            const due = financeType === 'TUITION' ? student.tuitionDue : student.transportDue;
                            const status = financeType === 'TUITION' ? student.tuitionStatus : student.transportStatus;
                            const reason = financeType === 'TUITION' ? student.tuitionWaiveReason : student.transportWaiveReason;
                            return (
                              <tr key={student.roll} className="hover:bg-gray-50/50 transition">
                                <td className="py-4 px-6 font-bold text-gray-700">{student.name} {status === 'Waived' && <span className="block text-[9px] text-amber-600 font-medium normal-case mt-0.5">Reason: {reason}</span>}</td>
                                <td className="py-4 px-6 text-gray-400">{student.roll}</td>
                                <td className="py-4 px-6 font-semibold">${due}</td>
                                <td className="py-4 px-6"><span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold ${status === 'Paid' ? 'bg-green-50 text-green-700 border border-green-100' : status === 'Waived' ? 'bg-amber-50 text-amber-700 border border-amber-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>{status === 'Paid' ? '✓ Paid' : status === 'Waived' ? '⚖ Waived' : '● Pending'}</span></td>
                                <td className="py-4 px-6 text-right">
                                  <div className="flex gap-2 justify-end items-center">
                                    {status === 'Pending' ? (
                                      <>
                                        <button onClick={() => handleCollectFees(student.roll, financeType)} className="px-3 py-1.5 bg-[#005fb0] text-white rounded-lg font-bold hover:bg-blue-700 text-[11px]">Collect</button>
                                        <button onClick={() => handleOpenWaiveModal(student.roll)} className="px-3 py-1.5 border border-amber-200 text-amber-700 bg-amber-50 hover:bg-amber-100/50 rounded-lg font-bold text-[11px]">Waive</button>
                                        <button onClick={() => handleTargetedAlert(student.name)} className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-200 text-gray-500 hover:text-[#005fb0] flex items-center justify-center font-bold text-xs">✉️</button>
                                      </>
                                    ) : <span className="text-gray-400 text-xs font-semibold italic">Processed</span>}
                                  </div>
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

      {/* --- +ADD STUDENT ENROLLMENT MODAL (Mandate 1) --- */}
      {showAddStudentModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xl max-w-2xl w-full my-8 animate-modalScale">
            <header className="flex justify-between items-center border-b border-gray-50 pb-3 mb-4">
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-1">
                <span>➕</span> Admission Enrollment Intake Form
              </h3>
              <button onClick={() => setShowAddStudentModal(false)} className="text-gray-400 hover:text-gray-600 font-bold text-xl">×</button>
            </header>

            <form onSubmit={handleAdmissionSubmit} className="space-y-6 max-h-[70vh] overflow-y-auto pr-2 text-xs">
              
              {/* Category 1: Student Information */}
              <fieldset className="border border-gray-100 rounded-2xl p-4 bg-gray-50/50 space-y-3">
                <legend className="px-2 font-bold text-[#005fb0] uppercase tracking-wider text-[10px]">Student Info</legend>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 mb-1">Full Name</label>
                    <input type="text" className="w-full p-2 bg-white border border-gray-200 rounded-lg focus:outline-none" value={admissionForm.fullName} onChange={(e) => setAdmissionForm({...admissionForm, fullName: e.target.value})} required />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 mb-1">Date of Birth</label>
                    <input type="date" className="w-full p-2 bg-white border border-gray-200 rounded-lg focus:outline-none" value={admissionForm.dob} onChange={(e) => setAdmissionForm({...admissionForm, dob: e.target.value})} required />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 mb-1">Gender</label>
                    <select className="w-full p-2 bg-white border border-gray-200 rounded-lg focus:outline-none" value={admissionForm.gender} onChange={(e) => setAdmissionForm({...admissionForm, gender: e.target.value})}>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 mb-1">Blood Group</label>
                    <input type="text" placeholder="e.g. O+" className="w-full p-2 bg-white border border-gray-200 rounded-lg focus:outline-none" value={admissionForm.bloodGroup} onChange={(e) => setAdmissionForm({...admissionForm, bloodGroup: e.target.value})} required />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 mb-1">Allergies</label>
                    <input type="text" placeholder="e.g. Peanuts" className="w-full p-2 bg-white border border-gray-200 rounded-lg focus:outline-none" value={admissionForm.allergies} onChange={(e) => setAdmissionForm({...admissionForm, allergies: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 mb-1">Special Talents</label>
                    <input type="text" placeholder="e.g. Painting, Singing" className="w-full p-2 bg-white border border-gray-200 rounded-lg focus:outline-none" value={admissionForm.specialTalents} onChange={(e) => setAdmissionForm({...admissionForm, specialTalents: e.target.value})} />
                  </div>
                </div>
              </fieldset>

              {/* Category 2: Parent Details */}
              <fieldset className="border border-gray-100 rounded-2xl p-4 bg-gray-50/50 space-y-3">
                <legend className="px-2 font-bold text-[#005fb0] uppercase tracking-wider text-[10px]">Parent Details</legend>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 mb-1">Father's Name</label>
                    <input type="text" className="w-full p-2 bg-white border border-gray-200 rounded-lg focus:outline-none" value={admissionForm.fatherName} onChange={(e) => setAdmissionForm({...admissionForm, fatherName: e.target.value})} required />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 mb-1">Father's Occupation</label>
                    <input type="text" className="w-full p-2 bg-white border border-gray-200 rounded-lg focus:outline-none" value={admissionForm.fatherOcc} onChange={(e) => setAdmissionForm({...admissionForm, fatherOcc: e.target.value})} required />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 mb-1">Mother's Name</label>
                    <input type="text" className="w-full p-2 bg-white border border-gray-200 rounded-lg focus:outline-none" value={admissionForm.motherName} onChange={(e) => setAdmissionForm({...admissionForm, motherName: e.target.value})} required />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 mb-1">Mother's Occupation</label>
                    <input type="text" className="w-full p-2 bg-white border border-gray-200 rounded-lg focus:outline-none" value={admissionForm.motherOcc} onChange={(e) => setAdmissionForm({...admissionForm, motherOcc: e.target.value})} required />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 mb-1">Email Address</label>
                    <input type="email" placeholder="name@domain.com" className="w-full p-2 bg-white border border-gray-200 rounded-lg focus:outline-none" value={admissionForm.email} onChange={(e) => setAdmissionForm({...admissionForm, email: e.target.value})} required />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 mb-1">Primary Mobile Number</label>
                    <input type="tel" placeholder="+91 98765..." className="w-full p-2 bg-white border border-gray-200 rounded-lg focus:outline-none" value={admissionForm.mobile} onChange={(e) => setAdmissionForm({...admissionForm, mobile: e.target.value})} required />
                  </div>
                </div>
              </fieldset>

              {/* Category 3: Logistics & Intake */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <fieldset className="border border-gray-100 rounded-2xl p-4 bg-gray-50/50 space-y-3">
                  <legend className="px-2 font-bold text-[#005fb0] uppercase tracking-wider text-[10px]">Logistics</legend>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 mb-1">Languages Spoken</label>
                    <input type="text" placeholder="e.g. English, Hindi" className="w-full p-2 bg-white border border-gray-200 rounded-lg focus:outline-none" value={admissionForm.languagesSpoken} onChange={(e) => setAdmissionForm({...admissionForm, languagesSpoken: e.target.value})} required />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 mb-1">Food Type</label>
                      <select className="w-full p-2 bg-white border border-gray-200 rounded-lg focus:outline-none" value={admissionForm.foodType} onChange={(e) => setAdmissionForm({...admissionForm, foodType: e.target.value})}>
                        <option>Vegetarian</option>
                        <option>Non-vegetarian</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 mb-1">Transport Route</label>
                      <select className="w-full p-2 bg-white border border-gray-200 rounded-lg focus:outline-none" value={admissionForm.transportPref} onChange={(e) => setAdmissionForm({...admissionForm, transportPref: e.target.value})}>
                        <option>School Van</option>
                        <option>Own</option>
                      </select>
                    </div>
                  </div>
                </fieldset>

                <fieldset className="border border-gray-100 rounded-2xl p-4 bg-gray-50/50 space-y-3">
                  <legend className="px-2 font-bold text-[#005fb0] uppercase tracking-wider text-[10px]">Office Intake</legend>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 mb-1">Mode of Payment</label>
                    <select className="w-full p-2 bg-white border border-gray-200 rounded-lg focus:outline-none" value={admissionForm.payMode} onChange={(e) => setAdmissionForm({...admissionForm, payMode: e.target.value})}>
                      <option>Cash</option>
                      <option>DD</option>
                      <option>Cheque</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 mb-1">Amount Paid ($)</label>
                      <input type="number" className="w-full p-2 bg-white border border-gray-200 rounded-lg focus:outline-none" value={admissionForm.amountPaid} onChange={(e) => setAdmissionForm({...admissionForm, amountPaid: e.target.value})} required />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 mb-1">Receipt Number</label>
                      <input type="text" placeholder="e.g. REC-9921" className="w-full p-2 bg-white border border-gray-200 rounded-lg focus:outline-none" value={admissionForm.receiptNum} onChange={(e) => setAdmissionForm({...admissionForm, receiptNum: e.target.value})} required />
                    </div>
                  </div>
                </fieldset>

              </div>

              <div className="flex gap-3 justify-end pt-3 border-t border-gray-50">
                <button type="button" onClick={() => setShowAddStudentModal(false)} className="px-6 py-2.5 border border-gray-200 text-gray-500 font-bold rounded-full hover:bg-gray-50 transition">Cancel</button>
                <button type="submit" className="px-6 py-2.5 bg-[#005fb0] text-white font-bold rounded-full hover:bg-blue-700 transition">Submit Admission</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- +ADD TEACHER MODAL (Mandate 3) --- */}
      {showAddTeacherModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xl max-w-md w-full animate-modalScale">
            <header className="flex justify-between items-center border-b border-gray-50 pb-3 mb-4">
              <h3 className="text-lg font-bold text-gray-800">Add New Teacher</h3>
              <button onClick={() => setShowAddTeacherModal(false)} className="text-gray-400 hover:text-gray-600 font-bold text-xl">×</button>
            </header>
            <form onSubmit={handleAddTeacherSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Full Name</label>
                <input 
                  type="text"
                  placeholder="e.g. Ms. Emma Watson"
                  value={newTeacherName}
                  onChange={(e) => setNewTeacherName(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border border-transparent rounded-xl focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Phone Number</label>
                <input 
                  type="tel"
                  placeholder="+91 98765..."
                  value={newTeacherPhone}
                  onChange={(e) => setNewTeacherPhone(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border border-transparent rounded-xl focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Area of Specialization</label>
                <input 
                  type="text"
                  placeholder="e.g. Pre-School Arts"
                  value={newTeacherSpec}
                  onChange={(e) => setNewTeacherSpec(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border border-transparent rounded-xl focus:outline-none"
                />
              </div>
              <div className="flex gap-2 justify-end pt-2">
                <button type="button" onClick={() => setShowAddTeacherModal(false)} className="px-4 py-2 border border-gray-200 text-gray-500 font-bold rounded-full hover:bg-gray-50 transition">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-[#005fb0] text-white font-bold rounded-full hover:bg-blue-700 transition">Save Faculty</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- EMERGENCY ALERT BROADCASTER MODAL (Mandate 3) --- */}
      {showSendAlertModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xl max-w-md w-full animate-modalScale">
            <header className="flex justify-between items-center border-b border-gray-50 pb-3 mb-4">
              <h3 className="text-lg font-bold text-red-600 flex items-center gap-1.5">
                <span>📢</span> Send Emergency Broadcast
              </h3>
              <button onClick={() => setShowSendAlertModal(false)} className="text-gray-400 hover:text-gray-600 font-bold text-xl">×</button>
            </header>
            <form onSubmit={handleSendAlertSubmit} className="space-y-4 text-xs">
              <div className="p-3 bg-red-50 text-red-700 rounded-xl font-semibold border border-red-100 leading-normal">
                ⚠️ WARNING: Sending this broadcast inserts an immediate "EMERGENCY URGENT" alert badge notice onto the main Operations Announcements board feed.
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Message Content</label>
                <textarea 
                  rows="4"
                  placeholder="Enter details of alert (e.g. Extreme weather school closure tomorrow)..."
                  value={alertMessageContent}
                  onChange={(e) => setAlertMessageContent(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400/20"
                  required
                />
              </div>
              <div className="flex gap-2 justify-end pt-2">
                <button type="button" onClick={() => setShowSendAlertModal(false)} className="px-4 py-2 border border-gray-200 text-gray-500 font-bold rounded-full hover:bg-gray-50 transition">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-red-600 text-white font-bold rounded-full hover:bg-red-700 transition">Broadcast Alert</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- DAILY REPORT AUDIT SUMMARY MODAL (Mandate 3) --- */}
      {showDailyReportModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xl max-w-lg w-full animate-modalScale">
            <header className="flex justify-between items-center border-b border-gray-50 pb-3 mb-4">
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-1">
                <span>📊</span> Daily Executive Audit Report
              </h3>
              <button onClick={() => setShowDailyReportModal(false)} className="text-gray-400 hover:text-gray-600 font-bold text-xl">×</button>
            </header>

            <div className="space-y-4 text-xs">
              <p className="text-gray-500 leading-relaxed">
                The school auditor engine has scanned all classroom ledger systems for **Monday, October 23, 2023** and generated this audit compliance summary.
              </p>

              {/* Roster & Attendance Checks */}
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-2">
                <h4 className="font-bold text-gray-700 uppercase tracking-wider text-[9px]">Attendance Statistics</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-gray-400 block">Student Live Count</span>
                    <span className="font-bold text-gray-700 text-sm">116/124 Present (94%)</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block">Lead Instructors Shift</span>
                    <span className="font-bold text-gray-700 text-sm">16/18 On-duty (2 Leave)</span>
                  </div>
                </div>
              </div>

              {/* Finance Audit check */}
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-2">
                <h4 className="font-bold text-gray-700 uppercase tracking-wider text-[9px]">Cash Box Ledger Checks</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <span className="text-gray-400 block">Tuition Collected</span>
                    <span className="font-bold text-green-600 text-sm">${totalTuitionCollected.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block">Transport Collections</span>
                    <span className="font-bold text-blue-600 text-sm">${totalTransportCollected.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block">Total Arrears Outstanding</span>
                    <span className="font-bold text-red-500 text-sm">${outstandingBalanceArrears.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-blue-50 text-[#005fb0] rounded-xl font-semibold border border-blue-100">
                ✓ Auditor Verdict: System files are clean. Ready for administrative authentication.
              </div>

              <div className="flex gap-2 justify-end pt-3 border-t border-gray-50">
                <button type="button" onClick={() => setShowDailyReportModal(false)} className="px-5 py-2.5 border border-gray-200 text-gray-500 font-bold rounded-full hover:bg-gray-50 transition">Cancel</button>
                <button 
                  type="button" 
                  onClick={() => { setShowDailyReportModal(false); setToastMessage("Daily Executive Audit signed off successfully."); }} 
                  className="px-5 py-2.5 bg-gray-800 text-white font-bold rounded-full hover:bg-gray-900 transition"
                >
                  ✓ Sign-off Report
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- ADD NEW CLASS MODAL (Classes) --- */}
      {showAddClassModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xl max-w-md w-full animate-modalScale">
            <header className="flex justify-between items-center border-b border-gray-50 pb-3 mb-4">
              <h3 className="text-lg font-bold text-gray-800">Add New Classroom Section</h3>
              <button onClick={() => setShowAddClassModal(false)} className="text-gray-400 hover:text-gray-600 font-bold text-xl">×</button>
            </header>
            <form onSubmit={handleAddNewClass} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Classroom Name / Grade Block</label>
                <input 
                  type="text"
                  placeholder="e.g. Preschool Section B"
                  value={newClassName}
                  onChange={(e) => setNewClassName(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border border-transparent rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-400/20"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Assign Initial Instructor</label>
                <select 
                  value={newClassTeacher}
                  onChange={(e) => setNewClassTeacher(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border border-transparent rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400/20"
                >
                  {availableTeachers.map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div className="flex gap-2 justify-end pt-2">
                <button type="button" onClick={() => setShowAddClassModal(false)} className="px-4 py-2 border border-gray-200 text-gray-500 text-xs font-bold rounded-full hover:bg-gray-50 transition">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-[#005fb0] text-white text-xs font-bold rounded-full hover:bg-blue-700 transition">Create Class</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MOCK PROGRESS CARD MODAL --- */}
      {showProgressCardModal && selectedStudentGrades && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xl max-w-sm w-full animate-modalScale">
            <header className="flex justify-between items-center border-b border-gray-50 pb-3 mb-4">
              <h3 className="text-lg font-bold text-gray-800">Student Progress Card</h3>
              <button onClick={() => setShowProgressCardModal(false)} className="text-gray-400 hover:text-gray-600 font-bold text-xl">×</button>
            </header>
            <div className="space-y-3 py-2">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl text-xs">
                <span className="font-semibold text-gray-500">🎨 Fine Arts & Crafts</span>
                <span className="font-bold text-[#005fb0] bg-blue-50 px-2 py-0.5 rounded border border-blue-100">{selectedStudentGrades.Art}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl text-xs">
                <span className="font-semibold text-gray-500">🧠 Cognitive & Math</span>
                <span className="font-bold text-[#005fb0] bg-blue-50 px-2 py-0.5 rounded border border-blue-100">{selectedStudentGrades.Math}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl text-xs">
                <span className="font-semibold text-gray-500">🗣️ Language & Speaking</span>
                <span className="font-bold text-[#005fb0] bg-blue-50 px-2 py-0.5 rounded border border-blue-100">{selectedStudentGrades.Language}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl text-xs">
                <span className="font-semibold text-gray-500">🤝 Behavioral Development</span>
                <span className="font-bold text-green-700 bg-green-50 px-2.5 py-0.5 rounded-full border border-green-100 text-[10px] uppercase">{selectedStudentGrades.Behavior}</span>
              </div>
            </div>
            <button onClick={() => setShowProgressCardModal(false)} className="w-full mt-4 py-2.5 bg-gray-800 text-white font-bold text-xs rounded-xl hover:bg-gray-900 transition">Close Ledger Card</button>
          </div>
        </div>
      )}

      {/* --- DUES BROADCAST CONTROLLER --- */}
      {showBroadcastModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xl max-w-md w-full animate-modalScale">
            <header className="flex justify-between items-center border-b border-gray-50 pb-3 mb-4">
              <h3 className="text-lg font-bold text-gray-800">📢 {broadcastType === 'TUITION' ? 'Tuition Arrears Reminder' : 'Transport Dues Reminder'}</h3>
              <button onClick={() => setShowBroadcastModal(false)} className="text-gray-400 hover:text-gray-600 font-bold text-xl">×</button>
            </header>
            {broadcastLoading ? (
              <div className="flex flex-col items-center justify-center py-10 space-y-4">
                <div className="w-10 h-10 border-4 border-[#005fb0] border-t-transparent rounded-full animate-spin"></div>
                <p className="text-xs font-bold text-gray-500">Dispatching targeted alerts...</p>
              </div>
            ) : (
              <form onSubmit={handleSendBroadcast} className="space-y-5">
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-gray-500 uppercase">Alert Channels</label>
                  <div className="flex gap-6">
                    <label className="flex items-center cursor-pointer select-none text-xs font-semibold text-gray-700">
                      <input type="checkbox" checked={broadcastSMS} onChange={(e) => setBroadcastSMS(e.target.checked)} className="rounded border-gray-200 text-[#005fb0] w-4 h-4 mr-2" />
                      Send SMS
                    </label>
                    <label className="flex items-center cursor-pointer select-none text-xs font-semibold text-gray-700">
                      <input type="checkbox" checked={broadcastEmail} onChange={(e) => setBroadcastEmail(e.target.checked)} className="rounded border-gray-200 text-[#005fb0] w-4 h-4 mr-2" />
                      Send Email
                    </label>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-gray-500 uppercase">Alert Timing Schedule</label>
                  <div className="flex gap-2">
                    <button type="button" onClick={() => setBroadcastDays('4')} className={`px-4 py-2 rounded-xl text-xs font-bold border transition ${broadcastDays === '4' ? 'bg-blue-50 text-[#005fb0] border-[#005fb0]' : 'bg-gray-50 text-gray-500 border-transparent'}`}>4 Days Before Due</button>
                    <button type="button" onClick={() => setBroadcastDays('2')} className={`px-4 py-2 rounded-xl text-xs font-bold border transition ${broadcastDays === '2' ? 'bg-blue-50 text-[#005fb0] border-[#005fb0]' : 'bg-gray-50 text-gray-500 border-transparent'}`}>2 Days Before Due</button>
                  </div>
                </div>
                <div className="flex gap-2 justify-end pt-2">
                  <button type="button" onClick={() => setShowBroadcastModal(false)} className="px-4 py-2 border border-gray-200 text-gray-500 text-xs font-bold rounded-full hover:bg-gray-50 transition">Cancel</button>
                  <button type="submit" className="px-4 py-2 bg-[#005fb0] text-white text-xs font-bold rounded-full hover:bg-blue-700 transition">Send Broadcast</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* --- ADMINISTRATIVE EXEMPTION OVERRIDE --- */}
      {showWaiveModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xl max-w-md w-full animate-modalScale">
            <header className="flex justify-between items-center border-b border-gray-50 pb-3 mb-4">
              <h3 className="text-lg font-bold text-gray-800">Administrative Exemption Override</h3>
              <button onClick={() => setShowWaiveModal(false)} className="text-gray-400 hover:text-gray-600 font-bold text-xl">×</button>
            </header>
            <form onSubmit={handleWaiveSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Exemption Reason</label>
                <input 
                  type="text"
                  placeholder="e.g. Sibling Scholarship Award"
                  value={waiveReason}
                  onChange={(e) => setWaiveReason(e.target.value)}
                  className="w-full px-3 py-2.5 bg-gray-50 border border-transparent rounded-xl text-xs focus:outline-none"
                  required
                />
              </div>
              <div className="flex gap-2 justify-end pt-2">
                <button type="button" onClick={() => setShowWaiveModal(false)} className="px-4 py-2 border border-gray-200 text-gray-500 text-xs font-bold rounded-full hover:bg-gray-50 transition">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-amber-600 text-white text-xs font-bold rounded-full hover:bg-amber-700 transition">Waive Dues</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

// --- SUB-BUILDERS ---

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

function renderBreakdownBar(label, percent, amount, barColor) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-xs font-semibold">
        <span className="text-gray-600">{label}</span>
        <span className="text-gray-700">{percent}% ({amount})</span>
      </div>
      <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden border border-gray-50">
        <div className={`h-full rounded-full ${barColor}`} style={{ width: `${percent}%` }}></div>
      </div>
    </div>
  );
}

function renderTabSelector(tabName, label, activeTab, setTab) {
  const isActive = activeTab === tabName;
  return (
    <button 
      onClick={() => setTab(tabName)}
      className={`py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition ${
        isActive ? 'border-[#005fb0] text-[#005fb0]' : 'border-transparent text-gray-400 hover:text-gray-600'
      }`}
    >
      {label}
    </button>
  );
}
