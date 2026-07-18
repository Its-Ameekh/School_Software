// src/components/teacher/EvaluationForm.jsx
'use client';

import React, { useState } from 'react';
import { teacherAPI } from '../../shared/api/teacher';

export default function EvaluationForm({ studentId, studentName, onCompleted }) {
  const [formData, setFormData] = useState({
    term: 'Term 1',
    subject: '',
    max_score: '',
    scored_value: '',
    grade_value: '',
    remark: ''
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg({ type: '', text: '' });

    const maxScoreNum = parseFloat(formData.max_score);
    const scoredValueNum = parseFloat(formData.scored_value);

    if (scoredValueNum > maxScoreNum) {
      setMsg({ type: 'error', text: 'Validation Error: Scored value cannot exceed maximum possible score.' });
      setLoading(false);
      return;
    }

    const payload = {
      student_id: Number(studentId),
      term: formData.term,
      subject: formData.subject,
      max_score: maxScoreNum,
      scored_value: scoredValueNum,
      grade_value: formData.grade_value,
      remark: formData.remark
    };

    try {
      await teacherAPI.enterEvaluation(payload);
      setMsg({ type: 'success', text: 'Evaluation record securely synchronized via backend database transactions.' });
      setFormData(prev => ({ ...prev, max_score: '', scored_value: '', grade_value: '', remark: '' }));
      if (onCompleted) onCompleted();
    } catch (error) {
      const serverMsg = error.response?.data?.message || 'Transaction submission failed.';
      setMsg({ type: 'error', text: serverMsg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-xs bg-gray-50/50 p-4 rounded-xl border border-gray-100 mt-4">
      <p className="font-bold text-gray-700">Add Academic Evaluation for {studentName}</p>
      
      {msg.text && (
        <div className={`p-2.5 rounded-lg font-bold ${msg.type === 'success' ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-red-50 text-red-600 border border-red-100'}`}>
          {msg.text}
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block font-bold text-gray-600 mb-1">Academic Term</label>
          <select name="term" value={formData.term} onChange={handleChange} className="w-full px-3 py-2 border border-gray-100 rounded-xl bg-white focus:outline-none font-medium">
            <option value="Term 1">First Terminal</option>
            <option value="Term 2">Second Terminal</option>
            <option value="Term 3">Third Terminal</option>
          </select>
        </div>
        <div>
          <label className="block font-bold text-gray-600 mb-1">Subject Portfolio</label>
          <input required type="text" name="subject" value={formData.subject} onChange={handleChange} className="w-full px-3 py-2 border border-gray-100 rounded-xl bg-white focus:outline-none" placeholder="e.g. Mathematics" />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="block font-bold text-gray-600 mb-1">Max Score</label>
          <input required type="number" step="0.1" name="max_score" value={formData.max_score} onChange={handleChange} className="w-full px-3 py-2 border border-gray-100 rounded-xl bg-white focus:outline-none" />
        </div>
        <div>
          <label className="block font-bold text-gray-600 mb-1">Scored Value</label>
          <input required type="number" step="0.1" name="scored_value" value={formData.scored_value} onChange={handleChange} className="w-full px-3 py-2 border border-gray-100 rounded-xl bg-white focus:outline-none" />
        </div>
        <div>
          <label className="block font-bold text-gray-600 mb-1">Grade Designation</label>
          <input required type="text" name="grade_value" value={formData.grade_value} onChange={handleChange} className="w-full px-3 py-2 border border-gray-100 rounded-xl bg-white focus:outline-none" placeholder="A+, B" />
        </div>
      </div>

      <div>
        <label className="block font-bold text-gray-600 mb-1">Remarks Statement</label>
        <textarea required name="remark" value={formData.remark} onChange={handleChange} rows="2" className="w-full px-3 py-2 border border-gray-100 rounded-xl bg-white focus:outline-none" placeholder="Provide assessment details..."></textarea>
      </div>

      <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-xs transition-colors">
        {loading ? 'Processing Transaction...' : 'Commit Evaluation Record'}
      </button>
    </form>
  );
}