const API_URL = import.meta.env.VITE_API_URL || \;
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { BookOpen, FileText, CheckSquare, Bell, LogOut } from 'lucide-react';

export default function TeacherDashboard() {
  const { user, logout } = useContext(AuthContext);
  const [stats, setStats] = useState({ totalStudents: 0, totalNotes: 0, totalQuizzes: 0, totalAnnouncements: 0 });
  const [activeTab, setActiveTab] = useState('dashboard');

  const [noteTitle, setNoteTitle] = useState('');
  const [noteSubject, setNoteSubject] = useState('');
  const [noteDesc, setNoteDesc] = useState('');
  const [noteFile, setNoteFile] = useState(null);

  const [quizTitle, setQuizTitle] = useState('');
  const [quizSubject, setQuizSubject] = useState('');
  const [questions, setQuestions] = useState([{ questionText: '', options: ['', '', '', ''], correctAnswer: '' }]);

  const [annTitle, setAnnTitle] = useState('');
  const [annMessage, setAnnMessage] = useState('');

  const [attempts, setAttempts] = useState([]);

  useEffect(() => {
    fetchStats();
    if (activeTab === 'attempts') fetchAttempts();
  }, [activeTab]);

  const fetchStats = async () => {
    try {
      const res = await axios.get(\, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setStats(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchAttempts = async () => {
    try {
      const res = await axios.get(\, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setAttempts(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUploadNote = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', noteTitle);
    formData.append('subject', noteSubject);
    formData.append('description', noteDesc);
    formData.append('file', noteFile);

    try {
      await axios.post(\, formData, {
        headers: { Authorization: `Bearer ${user.token}`, 'Content-Type': 'multipart/form-data' }
      });
      alert('Note uploaded successfully');
      setNoteTitle(''); setNoteSubject(''); setNoteDesc(''); setNoteFile(null);
      fetchStats();
    } catch (err) {
      alert('Error uploading note');
    }
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, { questionText: '', options: ['', '', '', ''], correctAnswer: '' }]);
  };

  const handleCreateQuiz = async (e) => {
    e.preventDefault();
    try {
      await axios.post(\, {
        title: quizTitle,
        subject: quizSubject,
        questions
      }, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      alert('Quiz created successfully');
      setQuizTitle(''); setQuizSubject(''); setQuestions([{ questionText: '', options: ['', '', '', ''], correctAnswer: '' }]);
      fetchStats();
    } catch (err) {
      alert('Error creating quiz');
    }
  };

  const handlePostAnnouncement = async (e) => {
    e.preventDefault();
    try {
      await axios.post(\, {
        title: annTitle,
        message: annMessage
      }, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      alert('Announcement posted');
      setAnnTitle(''); setAnnMessage('');
      fetchStats();
    } catch (err) {
      alert('Error posting announcement');
    }
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BookOpen },
    { id: 'notes', label: 'Upload Notes', icon: FileText },
    { id: 'quizzes', label: 'Create Quiz', icon: CheckSquare },
    { id: 'announcements', label: 'Announcements', icon: Bell },
    { id: 'attempts', label: 'Student Attempts', icon: CheckSquare },
  ];

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      {/* Sidebar */}
      <div className="w-64 bg-green-900 text-white flex flex-col">
        <div className="p-6 text-2xl font-bold border-b border-green-800">Campus Connect</div>
        <div className="flex-1 overflow-y-auto py-4">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center px-6 py-3 text-left transition-colors ${activeTab === item.id ? 'bg-green-800 border-l-4 border-green-400' : 'hover:bg-green-800'}`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
            </button>
          ))}
        </div>
        <div className="p-4 border-t border-green-800">
          <button onClick={logout} className="flex items-center w-full px-4 py-2 hover:bg-green-800 rounded transition-colors text-red-300 hover:text-red-200">
            <LogOut className="w-5 h-5 mr-3" /> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-semibold text-gray-800 capitalize">{activeTab.replace('-', ' ')}</h1>
          <div className="text-gray-600">Welcome, <span className="font-semibold text-green-600">{user.name}</span></div>
        </div>

        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center">
              <div className="p-3 bg-blue-100 text-blue-600 rounded-lg"><BookOpen /></div>
              <div className="ml-4"><p className="text-sm text-gray-500">Total Students</p><p className="text-2xl font-bold text-gray-800">{stats.totalStudents}</p></div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center">
              <div className="p-3 bg-green-100 text-green-600 rounded-lg"><FileText /></div>
              <div className="ml-4"><p className="text-sm text-gray-500">Notes Uploaded</p><p className="text-2xl font-bold text-gray-800">{stats.totalNotes}</p></div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center">
              <div className="p-3 bg-purple-100 text-purple-600 rounded-lg"><CheckSquare /></div>
              <div className="ml-4"><p className="text-sm text-gray-500">Quizzes Created</p><p className="text-2xl font-bold text-gray-800">{stats.totalQuizzes}</p></div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center">
              <div className="p-3 bg-yellow-100 text-yellow-600 rounded-lg"><Bell /></div>
              <div className="ml-4"><p className="text-sm text-gray-500">Announcements</p><p className="text-2xl font-bold text-gray-800">{stats.totalAnnouncements}</p></div>
            </div>
          </div>
        )}

        {activeTab === 'notes' && (
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 max-w-2xl">
            <form onSubmit={handleUploadNote} className="space-y-4">
              <div><label className="block text-sm font-medium text-gray-700">Note Title</label><input type="text" required className="mt-1 block w-full border border-gray-300 rounded-md p-2" value={noteTitle} onChange={e=>setNoteTitle(e.target.value)} /></div>
              <div><label className="block text-sm font-medium text-gray-700">Subject</label><input type="text" required className="mt-1 block w-full border border-gray-300 rounded-md p-2" value={noteSubject} onChange={e=>setNoteSubject(e.target.value)} /></div>
              <div><label className="block text-sm font-medium text-gray-700">Description</label><textarea className="mt-1 block w-full border border-gray-300 rounded-md p-2" value={noteDesc} onChange={e=>setNoteDesc(e.target.value)} /></div>
              <div><label className="block text-sm font-medium text-gray-700">PDF File</label><input type="file" accept="application/pdf" required className="mt-1 block w-full" onChange={e=>setNoteFile(e.target.files[0])} /></div>
              <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Upload Note</button>
            </form>
          </div>
        )}

        {activeTab === 'quizzes' && (
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <form onSubmit={handleCreateQuiz} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700">Quiz Title</label><input type="text" required className="mt-1 block w-full border border-gray-300 rounded-md p-2" value={quizTitle} onChange={e=>setQuizTitle(e.target.value)} /></div>
                <div><label className="block text-sm font-medium text-gray-700">Subject</label><input type="text" required className="mt-1 block w-full border border-gray-300 rounded-md p-2" value={quizSubject} onChange={e=>setQuizSubject(e.target.value)} /></div>
              </div>
              <hr />
              {questions.map((q, i) => (
                <div key={i} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Question {i+1}</label>
                  <input type="text" required placeholder="Question text" className="block w-full border border-gray-300 rounded-md p-2 mb-3" value={q.questionText} onChange={e=>{const newQ = [...questions]; newQ[i].questionText = e.target.value; setQuestions(newQ);}} />
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    {q.options.map((opt, optIdx) => (
                      <input key={optIdx} required type="text" placeholder={`Option ${optIdx+1}`} className="block w-full border border-gray-300 rounded-md p-2" value={opt} onChange={e=>{const newQ = [...questions]; newQ[i].options[optIdx] = e.target.value; setQuestions(newQ);}} />
                    ))}
                  </div>
                  <input type="text" required placeholder="Exact Correct Answer" className="block w-full border border-green-300 rounded-md p-2" value={q.correctAnswer} onChange={e=>{const newQ = [...questions]; newQ[i].correctAnswer = e.target.value; setQuestions(newQ);}} />
                </div>
              ))}
              <div className="flex justify-between">
                <button type="button" onClick={handleAddQuestion} className="text-green-600 bg-green-50 px-4 py-2 rounded border border-green-200">+ Add Question</button>
                <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">Create Quiz</button>
              </div>
            </form>
          </div>
        )}

        {activeTab === 'announcements' && (
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 max-w-2xl">
            <form onSubmit={handlePostAnnouncement} className="space-y-4">
              <div><label className="block text-sm font-medium text-gray-700">Title</label><input type="text" required className="mt-1 block w-full border border-gray-300 rounded-md p-2" value={annTitle} onChange={e=>setAnnTitle(e.target.value)} /></div>
              <div><label className="block text-sm font-medium text-gray-700">Message</label><textarea required rows="4" className="mt-1 block w-full border border-gray-300 rounded-md p-2" value={annMessage} onChange={e=>setAnnMessage(e.target.value)} /></div>
              <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Post Announcement</button>
            </form>
          </div>
        )}

        {activeTab === 'attempts' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quiz</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {attempts.map(att => (
                  <tr key={att._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{att.student?.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{att.quiz?.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{att.score} / {att.totalMarks}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(att.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
