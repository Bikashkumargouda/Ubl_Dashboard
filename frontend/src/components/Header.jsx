import {
  Menu,
  Bell,
  UserCircle,
} from "lucide-react";

function Header({ setMobileOpen }) {

  return (
    <header className="top-header">

      <button
        className="menu-button"
        onClick={() => setMobileOpen(true)}
      >
        <Menu size={22} />
      </button>

      <div className="header-title">
        <span>Training Management</span>
      </div>

      <div className="header-actions">

        <button className="icon-button">
          <Bell size={19} />
        </button>

        <div className="user-profile">

          <UserCircle size={34} />

          <div>
            <strong>Administrator</strong>
            <small>HR & Administration</small>
          </div>

        </div>

      </div>

    </header>
  );
}

export default Header;