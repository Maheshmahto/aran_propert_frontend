import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSidebar } from "../../hooks/SidebarContext";
import { useLogin } from "../../hooks/LoginContext";

const SidebarItem = ({
  to,
  icon,
  activeIcon,
  label,
  isActive,
  isHovered,
  isSidebarOpen,
  onClick,
  onMouseEnter,
  onMouseLeave,
}) => (
  <Link
    to={to}
    className={`flex items-center gap-4 text-gray-500 menu-item hover:cursor-pointer hover:text-black ${
      isActive ? "text-black" : ""
    }`}
    onClick={onClick}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    <img
      className="object-contain w-6 h-6 menu-icon"
      src={isActive || isHovered ? activeIcon : icon}
      alt={`${label} Icon`}
    />
    {isSidebarOpen && (
      <span className={isActive ? "text-black" : ""}>{label}</span>
    )}
  </Link>
);

const Sidebar = () => {
  const { logout } = useLogin();
  const [isOpened, setIsOpened] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selected, setSelected] = useState(1);
  const [hovered, setHovered] = useState(null);
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const updateDate = () => {
      const now = new Date();
      const formattedDate = new Intl.DateTimeFormat("en-GB", {
        weekday: "short", // Mon
        day: "2-digit", // 10
        month: "short", // Feb
        year: "numeric", // 2025
      }).format(now);

      setCurrentDate(formattedDate);
    };

    updateDate(); // Set initial date
    const interval = setInterval(updateDate, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const handleToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
    if (!isSidebarOpen) {
      setIsOpened(false);
    }
  };

  const handleLogOut = () => {
    logout();
  };

  return (
    <div
      className={`sidebar fixed left-0 top-0 h-screen bg-white transition-all duration-300 ease-in-out ${
        isSidebarOpen ? "w-64" : "w-20"
      } border-r-2 flex flex-col`}
    >
      <div className="flex items-center h-24 px-4 border-b-2">
        <div className="relative flex items-center w-full gap-2">
          <img
            className="object-contain w-14 h-14"
            src="/LeftColumn/Logo.png"
            alt="Logo"
          />
          {isSidebarOpen && (
            <div className="flex flex-col gap-1">
              <h1 className="font-semibold text-md">Welcome, Aryan</h1>
              <p className="text-sm text-gray-600">{currentDate}</p>
            </div>
          )}
          <button
            onClick={handleToggle}
            className={`absolute ${
              isSidebarOpen ? "right-[-32px]" : "right-[-32px]"
            } top-1/2 -translate-y-1/2`}
            aria-label="Toggle Sidebar"
          >
            {isSidebarOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 16 16"
              >
                <path
                  fill="none"
                  stroke="#1e3a8a"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="m11.25 4.75l-6.5 6.5m0-6.5l6.5 6.5"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={30}
                height={30}
                viewBox="0 0 24 24"
              >
                <path
                  fill="#1e3a8a"
                  fillRule="evenodd"
                  d="M3 16h18v2H3zm0-5h18v2H3zm0-5h18v2H3z"
                ></path>
              </svg>
            )}
          </button>
        </div>
      </div>

      <nav className="flex flex-col gap-8 py-8 px-7">
        <SidebarItem
          to="/admin-dashboard"
          icon="/LeftColumn/ic_round-dashboard.png"
          activeIcon="/LeftColumn/ic_round-dashboard (2).png"
          label="Dashboard"
          isActive={selected === 1}
          isHovered={hovered === 1}
          isSidebarOpen={isSidebarOpen}
          onClick={() => setSelected(1)}
          onMouseEnter={() => setHovered(1)}
          onMouseLeave={() => setHovered(null)}
        />

        <SidebarItem
          to="/admin-user"
          icon="/LeftColumn/User (2).png"
          activeIcon="/LeftColumn/Rectangle (2).png"
          label="User"
          isActive={selected === 2}
          isHovered={hovered === 2}
          isSidebarOpen={isSidebarOpen}
          onClick={() => setSelected(2)}
          onMouseEnter={() => setHovered(2)}
          onMouseLeave={() => setHovered(null)}
        />

        <SidebarItem
          to="/admin-property"
          icon="/LeftColumn/House (1).png"
          activeIcon="/LeftColumn/Rectangle (1).png"
          label="Property"
          isActive={selected === 3}
          isHovered={hovered === 3}
          isSidebarOpen={isSidebarOpen}
          onClick={() => setSelected(3)}
          onMouseEnter={() => setHovered(3)}
          onMouseLeave={() => setHovered(null)}
        />

        <SidebarItem
          to="/admin-client"
          icon="/LeftColumn/accountant 1 (1).png"
          activeIcon="/LeftColumn/accountant 1.png"
          label="Client"
          isActive={selected === 4}
          isHovered={hovered === 4}
          isSidebarOpen={isSidebarOpen}
          onClick={() => setSelected(4)}
          onMouseEnter={() => setHovered(4)}
          onMouseLeave={() => setHovered(null)}
        />

        <div
          className="relative"
          onMouseEnter={() => setHovered(5)}
          onMouseLeave={() => selected !== 5 && setHovered(null)}
        >
          <button
            className={`flex items-center gap-4 w-full text-gray-500 hover:text-black ${
              selected === 5 ? "text-black" : ""
            }`}
            onClick={() => {
              setIsOpened(!isOpened);
              setSelected(5);
            }}
          >
            <img
              className="object-contain w-6 h-6"
              src={
                isOpened || hovered === 5
                  ? "/LeftColumn/icon (1).png"
                  : "/LeftColumn/Settings.png"
              }
              alt="Settings"
            />
            {isSidebarOpen && (
              <>
                <span>Settings</span>
                <img
                  className={`ml-auto transition-transform ${
                    isOpened ? "rotate-180" : ""
                  }`}
                  src="/LeftColumn/Closed.png"
                  alt=""
                />
              </>
            )}
          </button>
          {isOpened && isSidebarOpen && (
            <div className="flex flex-col gap-3 mt-4 ml-10">
              <Link
                to="/admin-access"
                className="text-black hover:text-blue-700"
              >
                Access
              </Link>
              <Link
                to="/admin-inputfield"
                className="text-black hover:text-blue-700"
              >
                Input Field
              </Link>
            </div>
          )}
        </div>
      </nav>

      <button
        onClick={handleLogOut}
        className={`mt-auto mb-10 mx-5 bg-blue-900 text-white rounded-md p-3 flex items-center gap-4 hover:bg-blue-800 transition-colors ${
          isSidebarOpen ? "justify-start" : "justify-center"
        }`}
      >
        <img className="w-6 h-6" src="/LeftColumn/Logout.png" alt="Logout" />
        {isSidebarOpen && <span>Logout</span>}
      </button>
    </div>
  );
};

export default Sidebar;
