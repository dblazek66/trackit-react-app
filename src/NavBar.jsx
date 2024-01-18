import { Link } from "react-router-dom";
import { VscAdd, VscCalendar, VscDashboard,VscChecklist, VscGear   } from "react-icons/vsc";
import { FiLogOut } from "react-icons/fi";
import { SlTarget } from "react-icons/sl";
export default function NavBar({display}) {
  return (
    <>
    <div className={`topnav ${display}`}>
      <span className="app-brand"><SlTarget /> TRACKIT</span>
      <Link to="/"><VscDashboard /> DashBoard</Link >
      <Link to="/inventory"><VscChecklist /> Inventory</Link>
      <Link to="/customers"><VscAdd /> New Customer</Link>
      <Link to="/schedule"><VscCalendar /> Schedule</Link>
      <Link to="/admin"><VscGear /> Administration</Link>
      <div className="toRight">
        <Link to="/login"><FiLogOut /> Logout</Link>
      </div>
    </div>
    </>
  );
}
