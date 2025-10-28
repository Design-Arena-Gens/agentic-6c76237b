import { useState } from 'react';
import { Page } from '../App';
import { sampleComplaints, departmentColors, Complaint } from '../data/complaints';

interface MapViewProps {
  onNavigate: (page: Page) => void;
}

export default function MapView({ onNavigate }: MapViewProps) {
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);

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
                onClick={() => onNavigate('dashboard')}
                className="px-4 py-2 text-gray-700 hover:text-india-orange transition-colors font-medium"
              >
                Dashboard
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Map View</h1>
          <p className="text-gray-600 text-lg">Geographic visualization of civic complaints</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Map Container */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              {/* Map Embed */}
              <div className="relative" style={{ height: '600px' }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.8955929859843!2d80.94378887532748!3d26.8466799767027!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bfd991f32b16b%3A0x93ccba8909978be7!2sLucknow%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1699999999999!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Complaints Map"
                ></iframe>

                {/* Overlay Legend */}
                <div className="absolute bottom-6 left-6 bg-white bg-opacity-95 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-gray-200">
                  <h3 className="font-bold text-gray-800 mb-3 text-sm">Status Legend</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-gray-700">Escalated</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span className="text-gray-700">Pending</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-gray-700">Resolved</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-700">New</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Complaints List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6" style={{ height: '600px', overflowY: 'auto' }}>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Complaint Locations</h2>
              <div className="space-y-4">
                {sampleComplaints
                  .filter(c => c.lat && c.lng)
                  .map((complaint) => (
                    <div
                      key={complaint.id}
                      onClick={() => setSelectedComplaint(complaint)}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all hover:shadow-lg ${
                        selectedComplaint?.id === complaint.id
                          ? 'border-india-orange bg-orange-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${departmentColors[complaint.department]}`}>
                          {complaint.department}
                        </span>
                        <div className="flex items-center gap-1">
                          <span className="text-lg">{priorityEmoji[complaint.priority]}</span>
                          <div className={`w-3 h-3 rounded-full ${
                            complaint.status === 'Escalated' ? 'bg-red-500' :
                            complaint.status === 'Pending' ? 'bg-yellow-500' :
                            complaint.status === 'Resolved' ? 'bg-green-500' :
                            'bg-blue-500'
                          }`}></div>
                        </div>
                      </div>

                      <p className="text-gray-800 text-sm mb-2 line-clamp-2">
                        {complaint.text}
                      </p>

                      <div className="flex items-center gap-2 text-gray-600">
                        <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="text-xs truncate">{complaint.location}</span>
                      </div>

                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
                        <span className="text-xs text-gray-500">{complaint.id}</span>
                        <span className="text-xs text-gray-500">{getRelativeTime(complaint.timestamp)}</span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>

        {/* Selected Complaint Detail Modal */}
        {selectedComplaint && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedComplaint(null)}
          >
            <div
              className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <span className={`px-4 py-2 rounded-lg font-bold ${departmentColors[selectedComplaint.department]}`}>
                    {selectedComplaint.department}
                  </span>
                  <span className="text-3xl">{priorityEmoji[selectedComplaint.priority]}</span>
                </div>
                <button
                  onClick={() => setSelectedComplaint(null)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Complaint Details</h3>
                  <p className="text-gray-800 text-lg">{selectedComplaint.text}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <p className="text-sm text-gray-500 mb-1">Location</p>
                    <p className="font-semibold text-gray-800">{selectedComplaint.location}</p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-xl">
                    <p className="text-sm text-gray-500 mb-1">Complaint ID</p>
                    <p className="font-semibold text-gray-800">{selectedComplaint.id}</p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-xl">
                    <p className="text-sm text-gray-500 mb-1">Status</p>
                    <p className="font-semibold text-gray-800">{selectedComplaint.status}</p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-xl">
                    <p className="text-sm text-gray-500 mb-1">Priority</p>
                    <p className="font-semibold text-gray-800">{selectedComplaint.priority}</p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-xl">
                    <p className="text-sm text-gray-500 mb-1">Reported</p>
                    <p className="font-semibold text-gray-800">{getRelativeTime(selectedComplaint.timestamp)}</p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-xl">
                    <p className="text-sm text-gray-500 mb-1">Est. Resolution</p>
                    <p className="font-semibold text-gray-800">{selectedComplaint.estimatedResolution}</p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-india-orange to-india-green text-white p-4 rounded-xl">
                  <p className="text-sm mb-1">AI Classification Confidence</p>
                  <p className="text-3xl font-bold">{selectedComplaint.confidence}%</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
