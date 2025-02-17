import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSidebar } from "../../hooks/SidebarContext";
import { useLogin } from "../../hooks/LoginContext";
import { SidebarOpen } from "lucide-react";

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
  children,
  ref
}) => (
  <div
    className="relative"
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    ref={ref}
  >
    {to ? (
      <Link
        to={to}
        className={`flex items-center gap-4 text-gray-500 menu-item hover:cursor-pointer hover:text-black ${
          isActive ? "text-black" : ""
        }`}
        onClick={onClick}
      >
        <img
          className="object-contain w-6 h-6 menu-icon"
          src={isActive || isHovered ? activeIcon : icon}
          alt={`${label} Icon`}
        />
        {isSidebarOpen && <span className={isActive ? "text-black" : ""}>{label}</span>}
      </Link>
    ) : (
      <button
        className={`flex items-center gap-4 w-full text-gray-500 hover:text-black ${
          isActive ? "text-black" : ""
        }`}
        onClick={onClick}
      >
        <img
          className="object-contain w-6 h-6"
          src={isActive || isHovered ? activeIcon : icon}
          alt={`${label} Icon`}
        />
        {isSidebarOpen && (
          <>
            <span className={isActive ? "text-black" : ""}>{label}</span>
            <img
              className={`ml-auto transition-transform ${
                isActive ? "rotate-180" : ""
              }`}
              src="/LeftColumn/Closed.png"
              alt=""
            />
          </>
        )}
      </button>
    )}
    {children}
  </div>
);

const Sidebar = ({isSidebarOpen , setIsSidebarOpen}) => {
  const { logout } = useLogin();
  const [isOpened, setIsOpened] = useState(false);
  
  const [selected, setSelected] = useState(1);
  const [hovered, setHovered] = useState(null);
  const [currentDate, setCurrentDate] = useState("");
  const settingsRef = useRef(null);

  useEffect(() => {
    const updateDate = () => {
      const now = new Date();
      const formattedDate = new Intl.DateTimeFormat("en-GB", {
        weekday: "short",
        day: "2-digit",
        month: "short",
        year: "numeric",
      }).format(now);

      setCurrentDate(formattedDate);
    };

    updateDate();
    const interval = setInterval(updateDate, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setIsOpened(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
    if (!isSidebarOpen) {
      setIsOpened(false);
    }
    console.log("Sidebar is",  isSidebarOpen);
  };

  const handleLogOut = () => {
    logout();
  };

  const handleNavItemClick = (itemNumber) => {
    setSelected(itemNumber);
    if (itemNumber !== 5) {
      setIsOpened(false);
    }
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
            className={`absolute ${isSidebarOpen ? "right-[-31.5px]" : "right-[-31px]"} top-1/2 -translate-y-1/2`}
            aria-label="Toggle Sidebar"
          >
            {/* <img
              src="https://img.icons8.com/?size=100&id=Rdp3AydLFY2A&format=png&color=000000"
              className="w-6 h-6"
              alt="Toggle"
            /> */}
            
                {
        isSidebarOpen ? <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 16 16"><path fill="none" stroke="#1e3a8a" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m11.25 4.75l-6.5 6.5m0-6.5l6.5 6.5"/></svg> :(    
            <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 24 24"><path fill="#1e3a8a" fillRule="evenodd" d="M3 16h18v2H3zm0-5h18v2H3zm0-5h18v2H3z"></path></svg>
        )
      }
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
          onClick={() => handleNavItemClick(1)}
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
          onClick={() => handleNavItemClick(2)}
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
          onClick={() => handleNavItemClick(3)}
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
          onClick={() => handleNavItemClick(4)}
          onMouseEnter={() => setHovered(4)}
          onMouseLeave={() => setHovered(null)}
        />

        <SidebarItem
          icon="/LeftColumn/Settings.png"
          activeIcon="/LeftColumn/icon (1).png"
          label="Settings"
          isActive={selected === 5}
          isHovered={hovered === 5}
          isSidebarOpen={isSidebarOpen}
          onClick={() => {
            setIsOpened(!isOpened);
            setSelected(5);
            setIsSidebarOpen(true);
          }}
          onMouseEnter={() => setHovered(5)}
          onMouseLeave={() => setHovered(null)}
          ref={settingsRef}
        >
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
        </SidebarItem>
      </nav>

      <button
        onClick={handleLogOut}
        className={`mt-auto mb-10 mx-5 bg-blue-900 text-white rounded-md p-3 flex items-center gap-4 hover:bg-blue-800 transition-colors ${
          isSidebarOpen ? "justify-start" : "justify-center"
        }`}
      >
        <img className=" h-5" src="/LeftColumn/Logout.png" alt="Logout" />
        {isSidebarOpen && <span>Logout</span>}
      </button>
    </div>
  );
};

export default Sidebar;