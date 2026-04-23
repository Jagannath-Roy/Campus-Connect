const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { BookOpen, FileText, CheckSquare, Bell, LogOut, Download } from 'lucide-react';

export default function StudentDashboard() {
  const { user, logout } = useContext(AuthContext);
  const [stats, setStats] = useState({ quizzesAttempted: 0, averageScore: 0, pendingQuizzes: 0, availableNotes: 0 });
  const [activeTab, setActiveTab] = useState('dashboard');

  const [notes, setNotes] = useState([]);
  const [subjectFilter, setSubjectFilter] = useState('');

  const [quizzes, setQuizzes] = useState([]);
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [answers, setAnswers] = useState({});

  const [announcements, setAnnouncements] = useState([]);
  const [attempts, setAttempts] = useState([]);

  useEffect(() => {
    fetchStats();
    if (activeTab === 'notes') fetchNotes();
    if (activeTab === 'quizzes') fetchQuizzes();
    if (activeTab === 'announcements') fetchAnnouncements();
    if (activeTab === 'scores') fetchAttempts();
  }, [activeTab, subjectFilter]);

  const fetchStats = async () => {
    try {
      const res = await axios.get(\, { headers: { Authorization: `Bearer ${user.token}` } });
      setStats(res.data.data);
    } catch (err) { console.error(err); }
  };

  const fetchNotes = async () => {
    try {
      let url = \;
      if (subjectFilter) url += `?subject=${subjectFilter}`;
      const res = await axios.get(url, { headers: { Authorization: `Bearer ${user.token}` } });
      setNotes(res.data.data);
    } catch (err) { console.error(err); }
  };

  const fetchQuizzes = async () => {
    try {
      const res = await axios.get(\, { headers: { Authorization: `Bearer ${user.token}` } });
      setQuizzes(res.data.data);
    } catch (err) { console.error(err); }
  };

  const fetchAnnouncements = async () => {
    try {
      const res = await axios.get(\, { headers: { Authorization: `Bearer ${user.token}` } });
      setAnnouncements(res.data.data);
    } catch (err) { console.error(err); }
  };

  const fetchAttempts = async () => {
    try {
      const res = await axios.get(\, { headers: { Authorization: `Bearer ${user.token}` } });
      setAttempts(res.data.data);
    } catch (err) { console.error(err); }
  };

  const startQuiz = async (id) => {
    try {
      const res = await axios.get(`\/api/quizzes/${id}`, { headers: { Authorization: `Bearer ${user.token}` } });
      setActiveQuiz(res.data.data);
      setAnswers({});
    } catch (err) { console.error(err); }
  };

  const submitQuiz = async () => {
    const formattedAnswers = Object.keys(answers).map(qId => ({ questionId: qId, selectedOption: answers[qId] }));
    try {
      await axios.post(`\/api/quizzes/${activeQuiz._id}/attempt`, { answers: formattedAnswers }, { headers: { Authorization: `Bearer ${user.token}` } });
      alert('Quiz submitted successfully!');
      setActiveQuiz(null);
      fetchStats();
    } catch (err) {
      alert('Error submitting quiz');
    }
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BookOpen },
    { id: 'notes', label: 'Study Materials', icon: FileText },
    { id: 'quizzes', label: 'Attempt Quizzes', icon: CheckSquare },
    { id: 'scores', label: 'My Scores', icon: BookOpen },
    { id: 'announcements', label: 'Announcements', icon: Bell },
  ];

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      <div className="w-64 bg-green-900 text-white flex flex-col">
        <div className="p-6 text-2xl font-bold border-b border-green-800">Campus Connect</div>
        <div className="flex-1 overflow-y-auto py-4">
          {navItems.map(item => (
            <button key={item.id} onClick={() => {setActiveTab(item.id); setActiveQuiz(null);}} className={`w-full flex items-center px-6 py-3 text-left transition-colors ${activeTab === item.id ? 'bg-green-800 border-l-4 border-green-400' : 'hover:bg-green-800'}`}>
              <item.icon className="w-5 h-5 mr-3" /> {item.label}
            </button>
          ))}
        </div>
        <div className="p-4 border-t border-green-800">
          <button onClick={logout} className="flex items-center w-full px-4 py-2 hover:bg-green-800 rounded transition-colors text-red-300 hover:text-red-200">
            <LogOut className="w-5 h-5 mr-3" /> Logout
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-semibold text-gray-800 capitalize">{activeQuiz ? activeQuiz.title : activeTab.replace('-', ' ')}</h1>
          <div className="text-gray-600">Welcome, <span className="font-semibold text-green-600">{user.name}</span></div>
        </div>

        {activeTab === 'dashboard' && !activeQuiz && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center">
              <div className="p-3 bg-blue-100 text-blue-600 rounded-lg"><CheckSquare /></div>
              <div className="ml-4"><p className="text-sm text-gray-500">Quizzes Attempted</p><p className="text-2xl font-bold text-gray-800">{stats.quizzesAttempted}</p></div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center">
              <div className="p-3 bg-green-100 text-green-600 rounded-lg"><BookOpen /></div>
              <div className="ml-4"><p className="text-sm text-gray-500">Average Score (%)</p><p className="text-2xl font-bold text-gray-800">{stats.averageScore}</p></div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center">
              <div className="p-3 bg-yellow-100 text-yellow-600 rounded-lg"><CheckSquare /></div>
              <div className="ml-4"><p className="text-sm text-gray-500">Pending Quizzes</p><p className="text-2xl font-bold text-gray-800">{stats.pendingQuizzes}</p></div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center">
              <div className="p-3 bg-purple-100 text-purple-600 rounded-lg"><FileText /></div>
              <div className="ml-4"><p className="text-sm text-gray-500">Available Notes</p><p className="text-2xl font-bold text-gray-800">{stats.availableNotes}</p></div>
            </div>
          </div>
        )}

        {activeTab === 'notes' && (
          <div>
            <div className="mb-4">
              <input type="text" placeholder="Filter by subject..." className="p-2 border border-gray-300 rounded-md w-64" value={subjectFilter} onChange={e=>setSubjectFilter(e.target.value)} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {notes.map(note => (
                <div key={note._id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-lg text-gray-800">{note.title}</h3>
                    <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full mt-2 mb-4">{note.subject}</span>
                    <p className="text-sm text-gray-600 line-clamp-3 mb-4">{note.description}</p>
                  </div>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                    <span className="text-xs text-gray-500">By {note.teacher?.name}</span>
                    <a href={note.fileUrl} target="_blank" rel="noreferrer" className="flex items-center text-green-600 hover:text-green-800 text-sm font-medium">
                      <Download className="w-4 h-4 mr-1" /> Open
                    </a>
                  </div>
                </div>
              ))}
              {notes.length === 0 && <p className="text-gray-500 col-span-full">No notes available.</p>}
            </div>
          </div>
        )}

        {activeTab === 'quizzes' && !activeQuiz && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizzes.map(quiz => (
              <div key={quiz._id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-lg text-gray-800">{quiz.title}</h3>
                <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full mt-2 mb-4">{quiz.subject}</span>
                <div className="flex justify-between text-sm text-gray-600 mb-6">
                  <span>Questions: {quiz.totalMarks}</span>
                  {quiz.deadline && <span>Due: {new Date(quiz.deadline).toLocaleDateString()}</span>}
                </div>
                <button onClick={() => startQuiz(quiz._id)} className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-colors">Start Quiz</button>
              </div>
            ))}
             {quizzes.length === 0 && <p className="text-gray-500 col-span-full">No quizzes available.</p>}
          </div>
        )}

        {activeTab === 'quizzes' && activeQuiz && (
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 max-w-3xl">
            {activeQuiz.questions.map((q, i) => (
              <div key={q._id} className="mb-8">
                <p className="font-medium text-gray-800 mb-4">{i+1}. {q.questionText}</p>
                <div className="space-y-2">
                  {q.options.map((opt, optIdx) => (
                    <label key={optIdx} className="flex items-center p-3 border border-gray-200 rounded cursor-pointer hover:bg-gray-50">
                      <input type="radio" name={q._id} value={opt} onChange={() => setAnswers({...answers, [q._id]: opt})} className="mr-3 text-green-600" />
                      {opt}
                    </label>
                  ))}
                </div>
              </div>
            ))}
            <div className="flex justify-end gap-4 mt-8 pt-4 border-t border-gray-100">
              <button onClick={() => setActiveQuiz(null)} className="px-6 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50">Cancel</button>
              <button onClick={submitQuiz} className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700">Submit Quiz</button>
            </div>
          </div>
        )}

        {activeTab === 'scores' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quiz</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Attempted</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {attempts.map(att => (
                  <tr key={att._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{att.quiz?.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{att.quiz?.subject}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">{att.score} / {att.totalMarks}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(att.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
             {attempts.length === 0 && <p className="p-6 text-gray-500 text-center">No quiz attempts yet.</p>}
          </div>
        )}

        {activeTab === 'announcements' && (
          <div className="space-y-4 max-w-3xl">
            {announcements.map(ann => (
              <div key={ann._id} className="bg-white p-6 rounded-xl shadow-sm border border-l-4 border-yellow-400">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg text-gray-800">{ann.title}</h3>
                  <span className="text-xs text-gray-500">{new Date(ann.createdAt).toLocaleDateString()}</span>
                </div>
                <p className="text-gray-700 whitespace-pre-wrap">{ann.message}</p>
                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center">
                  <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-bold mr-2">{ann.teacher?.name.charAt(0)}</div>
                  <span className="text-sm text-gray-600">{ann.teacher?.name}</span>
                </div>
              </div>
            ))}
             {announcements.length === 0 && <p className="text-gray-500">No announcements yet.</p>}
          </div>
        )}
      </div>
    </div>
  );
}
