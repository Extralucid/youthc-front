import { useEffect, useState } from "react";
import {
  FiChevronDown,
  FiMenu,
  FiX,
  FiBell,
  FiMoon,
  FiSun,
  FiUser,
  FiLogOut,
} from "react-icons/fi";
import logo from "../../assets/logotype.jpg";
import user_pic from "../../assets/user.jpg";
import "./styles.css";
import ROUTES from "../../routes/routes";
import { logout } from "../../slices/auth.slice";
import Swal from "sweetalert2";
import { useAppDispatch } from "../../hooks/redux-hook";
import { useNavigate } from "react-router-dom";

const CompactNavbar = ({ darkMode, setDarkMode }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const toggleMenu = (index) => {
    setActiveMenu(activeMenu === index ? null : index);
  };

  const handleLogout = () => {
    // Add your logout logic here
    // Utiliser Swal.fire pour demander confirmation
    Swal.fire({
      title: "Êtes-vous sûr ?",
      text: "Vous allez vous déconnecter.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, déconnectez-moi",
      cancelButtonText: "Annuler",
    }).then(async (result) => {
      if (result.isConfirmed) {
        // Si l'utilisateur confirme, on procède à la déconnexion
        await dispatch(logout()).unwrap();
        localStorage.removeItem("accessToken"); // Suppression du token (ou autre méthode)
        navigate("/login"); // Redirection vers la page de login
      }
    });
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userDropdownOpen && !e.target.closest(".user-menu-container")) {
        setUserDropdownOpen(false);
      }
    };

    if (userDropdownOpen) {
      document.body.classList.add("click-outside-handler", "active");
      document.addEventListener("click", handleClickOutside);
    } else {
      document.body.classList.remove("click-outside-handler", "active");
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.body.classList.remove("click-outside-handler", "active");
      document.removeEventListener("click", handleClickOutside);
    };
  }, [userDropdownOpen]);

  return (
    <div className={`compact-navbar ${darkMode ? "dark" : ""}`}>
      {/* Left Side - Logo & Menu Items */}
      <div className="nav-left">
        <div className="logo">
          <img src={logo} alt="Logo" width={88} height={48} />
        </div>
        {/* Desktop Menu */}
        <div className="desktop-menu">
          {ROUTES.map((item, index) => (
            <>
              {index > 0 && <div className="menu-separator"></div>}
              <div
                key={index}
                className="menu-item"
                onMouseEnter={() => toggleMenu(index)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <a
                  href={item.path}
                  className="menu-link"
                  onClick={(e) => {
                    // Prevent default if there are children to allow dropdown to open
                    if (item.children) e.preventDefault();
                  }}
                >
                  {item.icon}
                  <span>{item.title}</span>
                  {item.children && (
                    <FiChevronDown
                      size={12}
                      className={`arrow ${
                        activeMenu === index ? "rotate" : ""
                      }`}
                    />
                  )}
                </a>
                {item.children && activeMenu === index && (
                  <div className="dropdown-menu">
                    {item.children.map((sub, i) => (
                      <a
                        key={i}
                        href={`${item.path}/${sub.path}`}
                        className="dropdown-item"
                      >
                        {sub.icon} {sub.title}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </>
          ))}
        </div>
      </div>

      {/* Right Side - Icons */}
      <div className="nav-right">
        <button className="theme-btn" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <FiSun size={14} /> : <FiMoon size={14} />}
        </button>
        <div className="notifications">
          <FiBell size={14} />
          <span className="badge">3</span>
        </div>
        <div className="user-menu-container">
          <div
            className="user-avatar"
            onClick={(e) => {
              e.preventDefault();
              setUserDropdownOpen(!userDropdownOpen);
            }}
          >
            <img src={user_pic} alt="User" width={28} height={28} />
          </div>
          {userDropdownOpen && (
            <div className={`user-dropdown ${darkMode ? "dark" : ""}`}>
              <a href="/settings/profile" className="dropdown-item">
                <FiUser size={14} /> Profile
              </a>
              <button
                className="dropdown-item"
                onClick={(e) => {
                  e.preventDefault();
                  handleLogout();
                }}
              >
                <FiLogOut size={14} /> Logout
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="mobile-btn"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <FiX size={18} /> : <FiMenu size={18} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="mobile-menu">
          {ROUTES.map((item, index) => (
            <div key={index} className="mobile-menu-item">
              <a
                href={item.path}
                className="mobile-link"
                onClick={(e) => {
                  if (item.children) {
                    e.preventDefault();
                    toggleMenu(index);
                  }
                }}
              >
                {item.icon}
                <span>{item.title}</span>
                {item.children && (
                  <FiChevronDown
                    size={12}
                    className={`arrow ${activeMenu === index ? "rotate" : ""}`}
                  />
                )}
              </a>

              {item.children && activeMenu === index && (
                <div className="mobile-dropdown">
                  {item.children.map((sub, i) => (
                    <a
                      key={i}
                      href={`${item.path}/${sub.path}`}
                      className="mobile-dropdown-item"
                    >
                      {sub.title}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CompactNavbar;
