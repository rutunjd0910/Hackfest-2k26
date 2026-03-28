import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import DashboardIndividual from "./pages/DashboardIndividual";
import DashboardBusiness from "./pages/DashboardBusiness";
import SidebarLayout from "./components/layout/SidebarLayout";
import Simulation from "./pages/Simulation";
import LocalActions from "./pages/LocalActions";
import ImpactReport from "./pages/ImpactReport";
import AdminPanel from "./pages/AdminPanel";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        
        {/* Protected Dashboard Routes */}
        <Route element={<SidebarLayout />}>
          <Route path="/individual/dashboard" element={<DashboardIndividual />} />
          <Route path="/business/dashboard" element={<DashboardBusiness />} />
          <Route path="/projects" element={<LocalActions />} />
          <Route path="/simulation" element={<Simulation />} />
          <Route path="/report" element={<ImpactReport />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
