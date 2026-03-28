import { useState } from "react";
import { ShieldCheck, Users, TrendingUp, AlertCircle, Check } from "lucide-react";

const DEMO_USERS = [
  { id: 1, name: "Rutunj Dewase", email: "rutunj@demo.com", role: "Individual", date: "2025-10-12" },
  { id: 2, name: "Acme Industries", email: "admin@acme.com", role: "Business", date: "2025-10-14" },
];

const PENDING_PROJECTS = [
  { id: 101, title: "Orange Peel Waste-to-Compost", host: "AgriTech LLC", impact: "400t CO₂/yr", reqDate: "2025-10-14" }
];

export default function AdminPanel() {
  const [projects, setProjects] = useState(PENDING_PROJECTS);
  const [verifiedMsg, setVerifiedMsg] = useState("");

  const handleVerify = (id) => {
    setProjects(projects.filter(p => p.id !== id));
    setVerifiedMsg("✓ Satellite verification triggered via Earth Engine. Project is now ACTIVE in the marketplace!");
    setTimeout(() => setVerifiedMsg(""), 5000);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center space-x-3 mb-8">
        <ShieldCheck className="w-8 h-8 text-brand-black" />
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Admin Console</h2>
          <p className="text-gray-500 text-sm">System oversight and verification layer.</p>
        </div>
      </div>

      {/* Toast notification */}
      {verifiedMsg && (
        <div className="flex items-center space-x-3 bg-green-50 border border-green-200 text-green-800 text-sm font-semibold px-5 py-3.5 rounded-xl shadow-sm animate-pulse">
          <ShieldCheck className="w-5 h-5 text-green-600 shrink-0" />
          <span>{verifiedMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-gray-500 uppercase">Total Users</p>
            <p className="text-3xl font-black text-brand-black mt-1">2,408</p>
          </div>
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-600"><Users /></div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-gray-500 uppercase">Credits Volume</p>
            <p className="text-3xl font-black text-brand-blue mt-1">1.2M</p>
          </div>
          <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-brand-blue"><TrendingUp /></div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-gray-500 uppercase">Pending Verifications</p>
            <p className="text-3xl font-black text-brand-amber mt-1">{projects.length}</p>
          </div>
          <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center text-brand-amber"><AlertCircle /></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Verification Queue */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-5 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
            <h3 className="font-bold text-gray-800">Verification Queue</h3>
            <span className="text-xs bg-brand-amber text-white font-bold px-2 py-1 rounded-full">{projects.length} Pending</span>
          </div>
          <div className="divide-y divide-gray-100">
            {projects.length === 0 ? (
              <div className="p-8 text-center text-gray-500">No pending projects.</div>
            ) : (
              projects.map(proj => (
                <div key={proj.id} className="p-5 hover:bg-gray-50 transition">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-bold text-gray-900">{proj.title}</h4>
                      <p className="text-xs text-gray-500">By {proj.host} • {proj.impact}</p>
                    </div>
                    <span className="text-xs text-gray-400">{proj.reqDate}</span>
                  </div>
                  <div className="mt-4 flex space-x-3">
                    <button 
                      onClick={() => handleVerify(proj.id)}
                      className="flex-1 bg-brand-green text-white py-2 text-sm font-bold rounded-lg hover:bg-green-700 transition flex items-center justify-center"
                    >
                      <Check className="w-4 h-4 mr-1"/> Approve & Verify (Earth Engine)
                    </button>
                    <button className="px-4 py-2 border border-gray-200 text-gray-600 font-bold text-sm rounded-lg hover:bg-gray-100 transition">
                      Reject
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* User Registry */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-5 border-b border-gray-100 bg-gray-50">
            <h3 className="font-bold text-gray-800">Recent Users</h3>
          </div>
          <div className="divide-y divide-gray-100">
            {DEMO_USERS.map(user => (
              <div key={user.id} className="p-5 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-gray-900">{user.name}</h4>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                <div className="text-right">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase font-bold tracking-wider ${user.role === 'Business' ? 'bg-gray-800 text-white' : 'bg-blue-100 text-blue-700'}`}>
                    {user.role}
                  </span>
                  <p className="text-xs text-gray-400 mt-1">Joined {user.date}</p>
                </div>
              </div>
            ))}
            <div className="p-4 text-center">
              <button className="text-sm font-semibold text-brand-blue hover:underline">View All Users</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
