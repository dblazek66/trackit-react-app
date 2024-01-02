import { Link } from "react-router-dom";
export default function NavBar() {
  return (
    <div className="topnav">
      <span>Trackit</span>
      <Link to="/">DashBoard</Link >
      <Link to="/inventory">Inventory</Link>
      <Link to="/customers">New Customer</Link>
      <Link to="/schedule">Schedule</Link>
    </div>
  );
}
