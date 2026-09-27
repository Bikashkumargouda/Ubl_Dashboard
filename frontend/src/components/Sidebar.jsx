import {
  LayoutDashboard,
  PlusCircle,
  ClipboardList,
  Users,
  FileBarChart,
  X,
} from "lucide-react";

import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

function Sidebar({ mobileOpen, setMobileOpen }) {

  const menuItems = [
    {
      name: "Dashboard",
      path: "/",
      icon: LayoutDashboard,
    },
    {
      name: "New Session",
      path: "/new-session",
      icon: PlusCircle,
    },
    {
      name: "Training Sessions",
      path: "/sessions",
      icon: ClipboardList,
    },
  ];

  return (
    <>
      {mobileOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`sidebar ${mobileOpen ? "sidebar-open" : ""
          }`}
      >

        <div className="sidebar-header">

          <div className="ubl-logo">
            UBL
          </div>

          <div>
            <h2>United Breweries</h2>
            <span>Khordha</span>
          </div>

          <button
            className="mobile-close"
            onClick={() => setMobileOpen(false)}
          >
            <X size={20} />
          </button>

        </div>

        <div className="sidebar-section">

          <p className="menu-title">
            MAIN MENU
          </p>

          {menuItems.map((item) => {

            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""
                  }`
                }
                onClick={() => setMobileOpen(false)}
              >

                <Icon size={19} />

                <span>
                  {item.name}
                </span>

              </NavLink>
            );

          })}

        </div>

        <div className="sidebar-section">

          <p className="menu-title">
            MANAGEMENT
          </p>

          <div className="nav-link">
            <Users size={19} />
            <span>Contractors</span>
          </div>

          <div className="nav-link">
            <FileBarChart size={19} />
            <span>Reports</span>
          </div>

        </div>

        <div className="sidebar-footer">

          <div className="footer-badge">
            UBL
          </div>

          <div>
            <strong>Training System</strong>
            <small>Version 1.0</small>
          </div>

        </div>

      </aside>
    </>
  );
}

export default Sidebar;