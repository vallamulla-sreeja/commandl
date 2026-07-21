export default function Features() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Interactive Learning Card */}
          <div className="bg-white p-8 rounded-xl border border-gray-100">
            <h3 className="text-2xl font-bold mb-4">Interactive Learning</h3>
            <p className="text-gray-600 mb-6">
              Learn by doing with hands-on coding challenges and real-time feedback. Practice in our built-in IDE with instant execution.
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="px-3 py-1 bg-white rounded-full border border-gray-200">Code</span>
                <span className="px-3 py-1 bg-white rounded-full border border-gray-200">Run</span>
                <span className="px-3 py-1 bg-white rounded-full border border-gray-200">Debug</span>
              </div>
            </div>
          </div>

          {/* Task Management Card */}
          <div className="bg-white p-8 rounded-xl border border-gray-100">
            <h3 className="text-2xl font-bold mb-4">Task Management</h3>
            <p className="text-gray-600 mb-6">
              Track your progress with our dynamic task sidebar. Complete challenges, follow tutorials, and mark your achievements.
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Task tracking</span>
              </div>
            </div>
          </div>

          {/* Smart Assistance Card */}
          <div className="bg-white p-8 rounded-xl border border-gray-100">
            <h3 className="text-2xl font-bold mb-4">Smart Assistance</h3>
            <p className="text-gray-600 mb-6">
              Get instant help with built-in tutorials and contextual hints. Receive real-time suggestions and explanations as you code.
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="h-2 w-24 bg-purple-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Live guidance</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 