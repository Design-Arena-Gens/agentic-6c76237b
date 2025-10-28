import { Page } from '../App';

interface LandingProps {
  onNavigate: (page: Page) => void;
}

export default function Landing({ onNavigate }: LandingProps) {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-india-orange via-orange-500 to-india-green text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              CityFix Agent
            </h1>
            <p className="text-2xl md:text-3xl font-semibold mb-4">
              Autonomous AI for Responsive Civic Governance
            </p>
            <p className="text-xl md:text-2xl mb-12 opacity-95">
              India's first autonomous AI system managing civic complaints from submission to resolution
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => onNavigate('submit')}
                className="px-8 py-4 bg-india-orange text-white text-lg font-semibold rounded-lg shadow-xl hover:bg-orange-600 transition-all hover:scale-105 hover:shadow-2xl"
              >
                Submit Complaint
              </button>
              <button
                onClick={() => onNavigate('dashboard')}
                className="px-8 py-4 bg-white text-gray-800 text-lg font-semibold rounded-lg shadow-xl hover:bg-gray-100 transition-all hover:scale-105 hover:shadow-2xl"
              >
                View Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 border border-gray-100">
            <div className="w-16 h-16 bg-gradient-to-br from-india-orange to-orange-400 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Instant AI Classification</h3>
            <p className="text-gray-600 text-lg">
              Advanced AI analyzes and categorizes complaints in seconds, ensuring rapid response and accurate routing.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 border border-gray-100">
            <div className="w-16 h-16 bg-gradient-to-br from-india-green to-green-600 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Smart Auto-Routing</h3>
            <p className="text-gray-600 text-lg">
              Intelligent department assignment ensures complaints reach the right team immediately, minimizing delays.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 border border-gray-100">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Complete Transparency</h3>
            <p className="text-gray-600 text-lg">
              Real-time status tracking and updates keep citizens informed at every step of the resolution process.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-lg">
            Built with ❤️ by <span className="font-bold text-india-orange">Código Sereno</span>
          </p>
          <p className="text-gray-400 mt-2">Empowering cities through intelligent automation</p>
        </div>
      </div>
    </div>
  );
}
