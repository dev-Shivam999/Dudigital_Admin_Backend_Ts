import { useState } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Building2,
  MessageSquare,
  Users,
  Images,
  Newspaper,
  Calendar,
  Briefcase,
  UserCheck,
  Play,
  PenTool,
  Menu,
  X,
  LogOut,
  Settings,
  Bell,
} from "lucide-react";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const navigation = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Content Management", type: "section" },
    { name: "Blogs", href: "/blogs", icon: PenTool },
    { name: "News", href: "/news", icon: Newspaper },
    { name: "Events", href: "/events", icon: Calendar },
    { name: "Gallery", href: "/gallery", icon: Images },
    { name: "Videos", href: "/videos", icon: Play },
    { name: "Business Management", type: "section" },
    { name: "Investor Relations", href: "/investor-relations", icon: FileText },
    { name: "Offices", href: "/offices", icon: Building2 },
    { name: "Partners", href: "/partners", icon: Users },
    { name: "Careers", href: "/careers", icon: Briefcase },
    { name: "Team Management", type: "section" },
    { name: "Team Members", href: "/team-members", icon: UserCheck },
    { name: "Sales Experts", href: "/sales-experts", icon: Users },
    { name: "Communication", type: "section" },
    { name: "Inquiries", href: "/contacts", icon: MessageSquare },
    { name: "Applicants", href: "/applicants", icon: UserCheck },
  ];

  const isActive = (href) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <div
        className={`sidebar ${
          sidebarOpen ? "sidebar-open" : "sidebar-closed"
        }`}>
        <div className="sidebar-header">
          <div className="logo">
            <h2>DU Digital</h2>
            <span>Admin Panel</span>
          </div>
          <button
            className="sidebar-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="sidebar-nav">
          {navigation.map((item, index) => {
            if (item.type === "section") {
              return (
                <div key={index} className="nav-section">
                  <span className="nav-section-title">{item.name}</span>
                </div>
              );
            }

            const Icon = item.icon;
            return (
              <Link
                key={index}
                to={item.href}
                className={`nav-item ${
                  isActive(item.href) ? "nav-item-active" : ""
                }`}>
                <Icon size={20} />
                <span className="nav-item-text">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Top Header */}
        <header className="top-header">
          <div className="header-left">
            <button
              className="mobile-menu-btn"
              onClick={() => setSidebarOpen(!sidebarOpen)}>
              <Menu size={20} />
            </button>
            <h1 className="page-title">
              {navigation.find((item) => item.href && isActive(item.href))
                ?.name || "Dashboard"}
            </h1>
          </div>

          <div className="header-right">
            <button className="header-btn">
              <Bell size={20} />
            </button>
            <button className="header-btn">
              <Settings size={20} />
            </button>
            <div className="user-menu">
              <div className="user-avatar">
                <span>AD</span>
              </div>
              <div className="user-info">
                <span className="user-name">Admin</span>
                <span className="user-role">Administrator</span>
              </div>
              <button className="logout-btn">
                <LogOut size={16} />
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="page-content">
          <Outlet />
        </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div className="mobile-overlay" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  );
};

export default Layout;
