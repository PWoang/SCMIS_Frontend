import { useState } from "react";
import { Offcanvas, Button, Collapse } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import {
  FiActivity, FiX, FiLayout, FiUsers, FiCalendar, FiCreditCard,
  FiUserCheck, FiBarChart2, FiFilter, FiChevronDown,
  FiRotateCcw, FiCircle, FiLogOut, FiColumns
} from "react-icons/fi";
import { MdSchool } from "react-icons/md";

import {
  LuFlaskConical, LuLayoutDashboard, LuStickyNote, LuColumns2
} from "react-icons/lu";
const  SidebarTeacher = ({ onClose }) => {
  const [openPages, setOpenPages] = useState(false);

  return (
    <div className="d-flex flex-column " style={{ minHeight: "100%" }}>
      {/* Header cua sidebar */}
      <div
        className="sidebar-header d-flex align-items-center justify-content-between border-bottom px-4"
       style={{ height: "79px" }}
      >
        <NavLink to="/" className="d-flex align-items-center text-decoration-none  py-3 ">
          <div className="brand-badge me-3 d-flex align-items-center justify-content-center">
            {/* activity icon */}
            <MdSchool size={24} color="#7412f5ff" />
          </div>
          <div className="d-flex flex-column">
            <h1 className="h5 m-0 fw-bold text-dark">EduBridge</h1>
            <small className="text-secondary">Secondary Class Management</small>
          </div>
        </NavLink>

        <Button
          variant="light"
          onClick={onClose}
          className="d-lg-none p-2 d-inline-flex"  
          aria-label="Close sidebar"
        >
          <FiX size={18} />
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-grow-1 overflow-auto py-4 px-3">
        <ul className="list-unstyled m-0">
          {/* Dashboard (active ví dụ) */}
          <li className="mb-2">
            <a
              href="index.html"
              className="d-flex align-items-center gap-2 px-3 py-3 rounded-3 text-decoration-none
                         text-primary bg-opacity-10 bg-gradient"
              style={{
                background:
                  "linear-gradient(90deg, rgba(238,242,255,.9) 0%, rgba(243,232,255,.9) 100%)",
              }}
            >
              {/* Bạn có thể dùng LuLayoutDashboard để sát nhất bản gốc */}
              <LuLayoutDashboard size={20} />
              <span className="fw-medium">Dashboard</span>
            </a>
          </li>

          <li className="mb-2">
            <a
              href="patients.html"
              className="d-flex align-items-center gap-2 px-3 py-3 rounded-3 text-decoration-none text-body
                         hover-bg"
            >
              <FiUsers size={20} />
              <span className="fw-medium">Patients</span>
            </a>
          </li>

          <li className="mb-2">
            <a
              href="appointments.html"
              className="d-flex align-items-center gap-2 px-3 py-3 rounded-3 text-decoration-none text-body hover-bg"
            >
              <FiCalendar size={20} />
              <span className="fw-medium">Appointments</span>
            </a>
          </li>

          <li className="mb-2">
            <a
              href="billing.html"
              className="d-flex align-items-center gap-2 px-3 py-3 rounded-3 text-decoration-none text-body hover-bg"
            >
              <FiCreditCard size={20} />
              <span className="fw-medium">Billing</span>
            </a>
          </li>

          <li className="mb-2">
            <a
              href="lab-results.html"
              className="d-flex align-items-center gap-2 px-3 py-3 rounded-3 text-decoration-none text-body hover-bg"
            >
              <LuFlaskConical size={20} />
              <span className="fw-medium">Lab Results</span>
            </a>
          </li>

          <li className="mb-2">
            <a
              href="staff.html"
              className="d-flex align-items-center gap-2 px-3 py-3 rounded-3 text-decoration-none text-body hover-bg"
            >
              <FiUserCheck size={20} />
              <span className="fw-medium">Staff</span>
            </a>
          </li>

          <li className="mb-2">
            <a
              href="reports.html"
              className="d-flex align-items-center gap-2 px-3 py-3 rounded-3 text-decoration-none text-body hover-bg"
            >
              <FiBarChart2 size={20} />
              <span className="fw-medium">Reports</span>
            </a>
          </li>

          {/* Pages dropdown */}
          <li className="mb-2">
            <button
              type="button"
              className="w-100 d-flex align-items-center justify-content-between px-3 py-3 rounded-3
                         btn btn-link text-decoration-none text-body fw-medium"
              onClick={() => setOpenPages((s) => !s)}
              aria-expanded={openPages}
            >
              <span className="d-flex align-items-center gap-2">
                <FiFilter size={20} />
                <span>Pages</span>
              </span>
              <FiChevronDown
                size={18}
                className={`transition ${openPages ? "rotate-180" : ""}`}
                style={{ transition: "transform .2s" }}
              />
            </button>

            <Collapse in={openPages}>
              <ul className="list-unstyled ps-2 mt-1 mb-0">
                <li className="mb-1">
                  <a
                    href="login.html"
                    className="d-flex align-items-center gap-2 px-3 py-2 rounded-2 text-decoration-none text-body hover-bg"
                  >
                    <FiRotateCcw size={18} />
                    <span>Login</span>
                  </a>
                </li>
                <li className="mb-1">
                  <a
                    href="signup.html"
                    className="d-flex align-items-center gap-2 px-3 py-2 rounded-2 text-decoration-none text-body hover-bg"
                  >
                    <FiCircle size={18} />
                    <span>Signup</span>
                  </a>
                </li>
                <li className="mb-1">
                  <a
                    href="forgot-password.html"
                    className="d-flex align-items-center gap-2 px-3 py-2 rounded-2 text-decoration-none text-body hover-bg"
                  >
                    <FiRotateCcw size={18} />
                    <span>Forgot password</span>
                  </a>
                </li>
                <li className="mb-1">
                  <a
                    href="404.html"
                    className="d-flex align-items-center gap-2 px-3 py-2 rounded-2 text-decoration-none text-body hover-bg"
                  >
                    <LuStickyNote size={18} />
                    <span>404 page</span>
                  </a>
                </li>
                <li className="mb-1">
                  <a
                    href="500.html"
                    className="d-flex align-items-center gap-2 px-3 py-2 rounded-2 text-decoration-none text-body hover-bg"
                  >
                    {/* Feather có FiColumns; nếu muốn “columns-2”, dùng LuColumns2 */}
                    <LuColumns2 size={18} />
                    <span>500 page</span>
                  </a>
                </li>
              </ul>
            </Collapse>
          </li>
        </ul>
      </nav>

      {/* User Profile */}
      <div className="border-top p-3">
        <div className="d-flex align-items-center gap-2 p-3 rounded-3 bg-light w-100">
          <div className="profile-badge d-flex align-items-center justify-content-center">
            <span className="text-black fw-semibold small mr-">DR</span>
          </div>
          <div className="flex-grow-1 ms-3">
            <p className="m-0 fw-semibold text-dark small">Dr. Wilson</p>
            <p className="m-0 text-secondary" style={{ fontSize: 12 }}>
              Chief Medical Officer
            </p>
          </div>
          <a href="#" className="text-secondary text-decoration-none">
            <FiLogOut size={18} />
          </a>
        </div>
      </div>
    </div>
  );
}
export default SidebarTeacher;