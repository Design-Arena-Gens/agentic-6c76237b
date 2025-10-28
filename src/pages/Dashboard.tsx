import { useState } from 'react';
import { Page } from '../App';
import { sampleComplaints, departmentColors, statusColors, Complaint } from '../data/complaints';

interface DashboardProps {
  onNavigate: (page: Page) => void;
}

export default function Dashboard({ onNavigate }: DashboardProps) {
  const [filter, setFilter] = useState<'All' | Complaint['department']>('All');
  const [showSimulation, setShowSimulation] = useState(false);
  const [simulationProgress, setSimulationProgress] = useState(0);
  const [simulationComplete, setSimulationComplete] = useState(false);

  const filteredComplaints = filter === 'All'
    ? sampleComplaints
    : sampleComplaints.filter(c => c.department === filter);

  const totalComplaints = 150;
  const pendingCount = 45;
  const escalatedCount = 12;
  const resolvedCount = 33;

  const priorityEmoji: Record<Complaint['priority'], string> = {
    'High': '🔴',
    'Medium': '🟡',
    'Low': '🟢',
  };

  const getRelativeTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));

    if (hours < 1) return `${minutes} minutes ago`;
    if (hours < 24) return `${hours} hours ago`;
    const days = Math.floor(hours / 24);
    return `${days} days ago`;
  };

  const runSimulation = async () => {
    setShowSimulation(true);
    setSimulationProgress(0);
    setSimulationComplete(false);

    // Animate progress
    for (let i = 0; i <= 100; i += 5) {
      await new Promise(resolve => setTimeout(resolve, 80));
      setSimulationProgress(i);
    }

    setSimulationComplete(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => onNavigate('landing')}
              className="text-2xl font-bold bg-gradient-to-r from-india-orange to-india-green bg-clip-text text-transparent"
            >
              CityFix Agent
            </button>
            <div className="flex gap-4">
              <button
                onClick={() => onNavigate('submit')}
                className="px-4 py-2 text-gray-700 hover:text-india-orange transition-colors font-medium"
              >
                Submit Complaint
              </button>
              <button
                onClick={() => onNavigate('map')}
                className="px-4 py-2 text-gray-700 hover:text-india-orange transition-colors font-medium"
              >
                Map View
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Complaints Dashboard</h1>
            <p className="text-gray-600 text-lg">Real-time civic complaint monitoring and management</p>
          </div>
          <button
            onClick={runSimulation}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            🤖 Demo Mode
          </button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">Total Complaints</p>
                <p className="text-4xl font-bold text-gray-900">{totalComplaints}</p>
              </div>
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">Pending</p>
                <p className="text-4xl font-bold text-yellow-600">{pendingCount}</p>
              </div>
              <div className="w-14 h-14 bg-yellow-100 rounded-xl flex items-center justify-center">
                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">Escalated</p>
                <p className="text-4xl font-bold text-red-600">{escalatedCount}</p>
              </div>
              <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">Resolved</p>
                <p className="text-4xl font-bold text-green-600">{resolvedCount}</p>
              </div>
              <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 mb-8">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setFilter('All')}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                filter === 'All'
                  ? 'bg-gradient-to-r from-india-orange to-india-green text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('Waste Management')}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                filter === 'Waste Management'
                  ? 'bg-green-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Waste
            </button>
            <button
              onClick={() => setFilter('Infrastructure')}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                filter === 'Infrastructure'
                  ? 'bg-orange-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Infrastructure
            </button>
            <button
              onClick={() => setFilter('Water Supply')}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                filter === 'Water Supply'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Water
            </button>
            <button
              onClick={() => setFilter('Electricity')}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                filter === 'Electricity'
                  ? 'bg-yellow-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Electricity
            </button>
            <button
              onClick={() => setFilter('Health')}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                filter === 'Health'
                  ? 'bg-red-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Health
            </button>
          </div>
        </div>

        {/* Complaints Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredComplaints.map((complaint) => (
            <div
              key={complaint.id}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-2xl hover:-translate-y-1 transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <span className={`px-3 py-1 rounded-lg text-sm font-semibold ${departmentColors[complaint.department]}`}>
                  {complaint.department}
                </span>
                <span className="text-2xl">{priorityEmoji[complaint.priority]}</span>
              </div>

              <p className="text-gray-800 text-base mb-4 line-clamp-3">
                {complaint.text}
              </p>

              <div className="flex items-center gap-2 text-gray-600 mb-3">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-sm">{complaint.location}</span>
              </div>

              <div className="flex items-center gap-2 text-gray-500 mb-4">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm">{getRelativeTime(complaint.timestamp)}</span>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${statusColors[complaint.status]}`}>
                  {complaint.status}
                </span>
                <span className="text-xs text-gray-500 font-medium">{complaint.id}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Simulation Modal */}
      {showSimulation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-8">
            {!simulationComplete ? (
              <div className="text-center">
                <div className="mb-6">
                  <div className="w-24 h-24 mx-auto border-8 border-india-orange border-t-transparent rounded-full animate-spin"></div>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Processing Complaints...</h2>
                <p className="text-gray-600 text-xl mb-6">AI Agent analyzing 100 complaints</p>
                <div className="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-india-orange to-india-green transition-all duration-300"
                    style={{ width: `${simulationProgress}%` }}
                  ></div>
                </div>
                <p className="text-2xl font-bold text-india-orange mt-4">{simulationProgress}%</p>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h2 className="text-3xl font-bold text-gray-900">Demo Complete!</h2>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="bg-gradient-to-r from-india-orange to-india-green text-white p-4 rounded-xl">
                    <p className="text-xl font-bold">100 complaints processed in 8 seconds</p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-xl">
                    <p className="text-lg"><span className="font-bold text-green-600">95%</span> classification accuracy</p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-xl">
                    <p className="text-lg"><span className="font-bold text-blue-600">38</span> duplicate complaints detected and merged</p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-xl">
                    <p className="text-lg"><span className="font-bold text-red-600">12</span> complaints auto-escalated to priority departments</p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-xl">
                    <p className="text-lg font-semibold mb-2">Distribution:</p>
                    <p className="text-gray-700">Waste: 31 | Roads: 27 | Water: 19 | Electricity: 15 | Health: 8</p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setShowSimulation(false);
                    setSimulationComplete(false);
                  }}
                  className="w-full py-4 bg-gradient-to-r from-india-orange to-india-green text-white text-lg font-bold rounded-xl hover:shadow-xl transition-all"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
