import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { Leaf, User, Map, BarChart2, FileText, Settings, LogOut, Shield } from "lucide-react";

const PAGE_TITLES = {
  dashboard: "Dashboard",
  projects: "Local Actions Map",
  simulation: "Growth Simulation",
  report: "Impact Report",
  admin: "Admin Console",
};

export default function SidebarLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  // Determine role based on URL first, then fallback to session storage
  let role = sessionStorage.getItem("envify_role") || "individual";
  if (location.pathname.includes('/individual/')) {
    role = "individual";
    sessionStorage.setItem("envify_role", role);
  } else if (location.pathname.includes('/business/')) {
    role = "business";
    sessionStorage.setItem("envify_role", role);
  }
  const isBusiness = role === "business";
  
  // Extract user's name from memory
  const userName = sessionStorage.getItem('envify_user_name') || (isBusiness ? "Acme Industries" : "Rutunj Dewase");

  const active = (path) =>
    location.pathname.includes(path)
      ? "bg-brand-terracotta text-white shadow-md"
      : "text-gray-600 hover:bg-brand-cream hover:text-brand-teal transition-all";

  const currentPage = location.pathname.split("/").pop();
  const pageTitle = PAGE_TITLES[currentPage] || "Overview";

  const handleLogout = () => {
    sessionStorage.removeItem("envify_role");
    sessionStorage.removeItem("envify_user_name");
    navigate("/auth");
  };

  return (
    <div className="flex h-screen bg-brand-cream relative overflow-hidden font-sans">
      {/* Decorative Background Blobs */}
      <div className="absolute -top-24 -right-24 w-96 h-96 decorative-blob opacity-40 pointer-events-none"></div>
      <div className="absolute top-1/2 -left-32 w-80 h-80 decorative-blob opacity-20 pointer-events-none bg-brand-teal/10"></div>
      <div className="absolute -bottom-48 right-1/4 w-[500px] h-[500px] decorative-blob opacity-30 pointer-events-none bg-brand-mint/5"></div>

      {/* Sidebar */}
      <div className="w-64 bg-white/80 backdrop-blur-md border-r border-gray-200 flex flex-col justify-between shrink-0 z-20">
        <div>
          {/* Logo */}
          <div className="h-20 flex items-center px-6 border-b border-gray-100">
            <Leaf className="w-6 h-6 text-brand-terracotta mr-2" />
            <span className="text-2xl font-black text-brand-black tracking-tighter font-serif italic">Envify</span>
            {isBusiness && (
              <span className="ml-2 text-[10px] bg-brand-teal text-white rounded-full px-2 py-0.5 font-bold uppercase tracking-widest">Biz</span>
            )}
          </div>

          {/* Nav Links */}
          <nav className="p-4 space-y-2">
            <Link
              to={isBusiness ? "/business/dashboard" : "/individual/dashboard"}
              className={`flex items-center space-x-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all ${active("dashboard")}`}
            >
              <BarChart2 className="w-5 h-5 shrink-0" />
              <span>Dashboard</span>
            </Link>

            {isBusiness && (
              <Link
                to="/simulation"
                className={`flex items-center space-x-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all ${active("simulation")}`}
              >
                <Settings className="w-5 h-5 shrink-0" />
                <span>Simulate Growth</span>
              </Link>
            )}

            <Link
              to="/projects"
              className={`flex items-center space-x-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all ${active("projects")}`}
            >
              <Map className="w-5 h-5 shrink-0" />
              <span>Local Actions</span>
            </Link>

            <Link
              to="/report"
              className={`flex items-center space-x-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all ${active("report")}`}
            >
              <FileText className="w-5 h-5 shrink-0" />
              <span>Impact Report</span>
            </Link>

            <Link
              to="/admin"
              className={`flex items-center space-x-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all ${active("admin")}`}
            >
              <Shield className="w-5 h-5 shrink-0" />
              <span>Admin Console</span>
            </Link>
          </nav>
        </div>

        {/* User badge + Logout */}
        <div className="p-5 space-y-4 border-t border-gray-100 bg-gray-50/50">
          <div className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 shadow-sm ${isBusiness ? 'bg-brand-teal/10 text-brand-teal' : 'bg-brand-terracotta/10 text-brand-terracotta'}`}>
              <User className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-black text-gray-900 leading-none">{userName}</h4>
              <p className="text-[11px] text-gray-500 mt-1 uppercase font-bold tracking-widest">{role}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-sm font-bold text-gray-500 hover:bg-red-50 hover:text-red-600 transition-all border border-transparent hover:border-red-100"
          >
            <LogOut className="w-5 h-5 shrink-0" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto min-w-0 z-10">
        {/* Header */}
        <header className="h-20 bg-white/60 backdrop-blur-md border-b border-gray-200 flex items-center justify-between px-10 shrink-0 sticky top-0 z-30">
          <h1 className="text-2xl font-black text-brand-black font-serif italic">{pageTitle}</h1>
          <div className="flex items-center space-x-3">
            <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-[0.2em] shadow-sm ${isBusiness ? "bg-brand-teal text-white" : "bg-brand-terracotta text-white"}`}>
              {role}
            </span>
          </div>
        </header>

        <main className="p-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
