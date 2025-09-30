import { Outlet } from "react-router-dom";
import Header from "../components/ui/Header";
import SidebarTeacher from '../pages/Teachers/SidebarTeacher';
import { useState } from "react";

const TeacherLayout = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <aside
        className={`border-end bg-white ${showSidebar ? "d-block" : "d-none d-lg-block"}`}
        style={{ width: 288 }}
      >
        <SidebarTeacher onClose={() => setShowSidebar(false)} />
      </aside>

      {/* Content */}
      <div className="flex-grow-1 d-flex flex-column">
        <Header onToggleSidebar={() => setShowSidebar((s) => !s)} />
        <main className="container-fluid p-3">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default TeacherLayout;