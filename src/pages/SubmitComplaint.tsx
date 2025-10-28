import { useState } from 'react';
import { Page } from '../App';
import { Complaint } from '../data/complaints';

interface SubmitComplaintProps {
  onNavigate: (page: Page) => void;
}

export default function SubmitComplaint({ onNavigate }: SubmitComplaintProps) {
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<Complaint | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const departments: Complaint['department'][] = [
    'Waste Management',
    'Infrastructure',
    'Water Supply',
    'Electricity',
    'Health',
    'Public Safety',
  ];

  const analyzeLikelihood = (text: string): Complaint['department'] => {
    const lower = text.toLowerCase();
    if (lower.includes('garbage') || lower.includes('waste') || lower.includes('trash') || lower.includes('dump') || lower.includes('sewage')) {
      return 'Waste Management';
    } else if (lower.includes('road') || lower.includes('pothole') || lower.includes('traffic') || lower.includes('footpath') || lower.includes('manhole') || lower.includes('bridge')) {
      return 'Infrastructure';
    } else if (lower.includes('water') || lower.includes('supply') || lower.includes('pipe') || lower.includes('leak')) {
      return 'Water Supply';
    } else if (lower.includes('electricity') || lower.includes('power') || lower.includes('light') || lower.includes('transformer')) {
      return 'Electricity';
    } else if (lower.includes('health') || lower.includes('hospital') || lower.includes('medical') || lower.includes('hygiene') || lower.includes('sanitation')) {
      return 'Health';
    } else if (lower.includes('safety') || lower.includes('crime') || lower.includes('stray') || lower.includes('dog')) {
      return 'Public Safety';
    }
    return departments[Math.floor(Math.random() * departments.length)];
  };

  const calculatePriority = (text: string): Complaint['priority'] => {
    const lower = text.toLowerCase();
    const urgentWords = ['immediate', 'urgent', 'emergency', 'dangerous', 'accident', 'injury', 'critical', 'hazard'];
    const mediumWords = ['concern', 'issue', 'problem', 'need', 'affect'];

    if (urgentWords.some(word => lower.includes(word))) {
      return 'High';
    } else if (mediumWords.some(word => lower.includes(word))) {
      return 'Medium';
    }
    return Math.random() > 0.5 ? 'High' : 'Medium';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!description.trim() || !location.trim()) {
      return;
    }

    setIsAnalyzing(true);
    setResult(null);
    setShowSuccess(false);

    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 2500));

    const department = analyzeLikelihood(description);
    const priority = calculatePriority(description);

    const newComplaint: Complaint = {
      id: `CFX-${String(Math.floor(Math.random() * 900) + 100).padStart(3, '0')}`,
      text: description,
      location: location,
      department: department,
      status: 'New',
      priority: priority,
      timestamp: new Date(),
      confidence: Math.floor(Math.random() * 10) + 88,
      estimatedResolution: priority === 'High' ? '12 hours' : priority === 'Medium' ? '24 hours' : '48 hours',
    };

    setResult(newComplaint);
    setIsAnalyzing(false);
    setShowSuccess(true);

    // Hide success message after 3 seconds
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const departmentColors: Record<Complaint['department'], string> = {
    'Waste Management': 'bg-green-100 text-green-800 border-green-300',
    'Infrastructure': 'bg-orange-100 text-orange-800 border-orange-300',
    'Water Supply': 'bg-blue-100 text-blue-800 border-blue-300',
    'Electricity': 'bg-yellow-100 text-yellow-800 border-yellow-300',
    'Health': 'bg-red-100 text-red-800 border-red-300',
    'Public Safety': 'bg-purple-100 text-purple-800 border-purple-300',
  };

  const priorityEmoji: Record<Complaint['priority'], string> = {
    'High': '🔴',
    'Medium': '🟡',
    'Low': '🟢',
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
                onClick={() => onNavigate('dashboard')}
                className="px-4 py-2 text-gray-700 hover:text-india-orange transition-colors font-medium"
              >
                Dashboard
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

      {/* Success Notification */}
      {showSuccess && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-4 rounded-lg shadow-2xl z-50 animate-pulse">
          <div className="flex items-center gap-3">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="font-semibold">Complaint submitted successfully!</span>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Submit Civic Complaint</h1>
          <p className="text-gray-600 text-lg">Our AI will analyze and route your complaint to the right department</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
          <div className="mb-6">
            <label htmlFor="description" className="block text-lg font-semibold text-gray-700 mb-3">
              Describe your complaint
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your civic complaint in detail..."
              maxLength={400}
              rows={6}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-india-orange focus:ring-2 focus:ring-india-orange focus:ring-opacity-20 outline-none transition-all text-gray-800 text-lg"
              required
            />
            <div className="text-right text-sm text-gray-500 mt-2">
              {description.length}/400 characters
            </div>
          </div>

          <div className="mb-8">
            <label htmlFor="location" className="block text-lg font-semibold text-gray-700 mb-3">
              Location
            </label>
            <input
              id="location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g., MG Road, Kanpur"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-india-orange focus:ring-2 focus:ring-india-orange focus:ring-opacity-20 outline-none transition-all text-gray-800 text-lg"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isAnalyzing || !description.trim() || !location.trim()}
            className="w-full py-4 bg-gradient-to-r from-india-orange to-orange-500 text-white text-lg font-bold rounded-xl shadow-lg hover:shadow-xl hover:from-orange-600 hover:to-orange-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02]"
          >
            {isAnalyzing ? 'Analyzing...' : 'Submit Complaint'}
          </button>
        </form>

        {/* Loading Animation */}
        {isAnalyzing && (
          <div className="bg-white rounded-2xl shadow-xl p-12 border border-gray-100 text-center">
            <div className="flex flex-col items-center">
              <div className="relative mb-6">
                <div className="w-20 h-20 border-4 border-india-orange border-t-transparent rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-10 h-10 text-india-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-800 mb-2">AI Agent Analyzing...</p>
              <p className="text-gray-600 text-lg">Classifying complaint and determining optimal routing</p>
            </div>
          </div>
        )}

        {/* Results */}
        {result && !isAnalyzing && (
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h2 className="text-3xl font-bold text-gray-900">Analysis Complete</h2>
            </div>

            <div className="space-y-5">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <span className="text-lg font-semibold text-gray-700">Department:</span>
                <span className={`px-4 py-2 rounded-lg font-bold text-lg border-2 ${departmentColors[result.department]}`}>
                  {result.department}
                </span>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <span className="text-lg font-semibold text-gray-700">AI Confidence:</span>
                <span className="text-2xl font-bold text-india-green">{result.confidence}%</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <span className="text-lg font-semibold text-gray-700">Priority:</span>
                <span className="flex items-center gap-2 text-lg font-bold text-gray-800">
                  <span className="text-2xl">{priorityEmoji[result.priority]}</span>
                  {result.priority}
                </span>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <span className="text-lg font-semibold text-gray-700">Estimated Resolution:</span>
                <span className="text-lg font-bold text-india-orange">{result.estimatedResolution}</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-india-orange to-india-green text-white rounded-xl">
                <span className="text-lg font-semibold">Complaint ID:</span>
                <span className="text-2xl font-bold">{result.id}</span>
              </div>
            </div>

            <div className="mt-8 flex gap-4">
              <button
                onClick={() => {
                  setDescription('');
                  setLocation('');
                  setResult(null);
                }}
                className="flex-1 py-3 bg-gray-200 text-gray-800 font-semibold rounded-xl hover:bg-gray-300 transition-all"
              >
                Submit Another
              </button>
              <button
                onClick={() => onNavigate('dashboard')}
                className="flex-1 py-3 bg-gradient-to-r from-india-orange to-india-green text-white font-semibold rounded-xl hover:shadow-lg transition-all"
              >
                View Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
