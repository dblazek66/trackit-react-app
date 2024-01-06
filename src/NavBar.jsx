import { Link } from "react-router-dom";
import { VscAdd, VscCalendar, VscDashboard,VscChecklist, VscGear   } from "react-icons/vsc";

export default function NavBar() {
  return (
    <div className="topnav">
      <span className="app-brand">TRACKIT</span>
      <Link to="/"><VscDashboard /> DashBoard</Link >
      <Link to="/inventory"><VscChecklist /> Inventory</Link>
      <Link to="/customers"><VscAdd /> New Customer</Link>
      <Link to="/schedule"><VscCalendar /> Schedule</Link>
      <Link to="/admin"><VscGear /> Administration</Link>
    </div>
  );
}
