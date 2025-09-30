import { useEffect, useState } from "react";
import {
  Navbar, Container, Button, Form, InputGroup, Dropdown, Badge,
} from "react-bootstrap";
import {
  FiMenu, FiSearch, FiSun, FiMoon, FiBell,
  FiCalendar, FiAlertTriangle, FiCreditCard, FiMessageSquare,
  FiSettings, FiUser, FiShield, FiLogOut
} from "react-icons/fi";

/**
 * Props:
 *  - onToggleSidebar?: () => void   // click hamburger
 */
export default function Header({ onToggleSidebar }) {
  const [isDark, setIsDark] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  // Toggle theme bằng Bootstrap 5.3 data attribute
  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <header className="app-header">
      <Navbar bg="white" className="py-3" expand="sm">
        <Container fluid className="px-3 px-sm-4">
          {/* Left: Hamburger + Title */}
         
            {/* Hamburger (mobile) */}
            <Button
              variant="light"
              className="p-2 d-inline-flex d-lg-none"
              onClick={onToggleSidebar}
              aria-label="Toggle sidebar"
            >
              <FiMenu size={18} />
            </Button>

            <div className="min-w-0">
              <h2 className="h5 h4-sm m-0 fw-bold text-truncate">Welcome back,</h2>
              <div className="text-muted small  text-truncate">
                Role, Name!
              </div>
            </div>
          

          {/* Right actions */}
          <div className="d-flex align-items-center flex-shrink-0 gap-2 gap-sm-3">
            {/* Search (>= sm)
            <div className="d-none d-sm-block">
              <InputGroup>
                <InputGroup.Text>
                  <FiSearch size={16} />
                </InputGroup.Text>
                <Form.Control
                  placeholder="Search ..."
                  aria-label="Search"
                  style={{ width: 280 }}
                />
              </InputGroup>
            </div> */}

            {/* Mobile search button */}
            <Button
              variant="link"
              className="text-muted d-sm-none p-2"
              onClick={() => setShowMobileSearch((s) => !s)}
              aria-label="Open search"
            >
              <FiSearch size={20} />
            </Button>

            {/* Theme toggle */}
            <Button
              variant="link"
              className="text-muted p-2"
              onClick={() => setIsDark((s) => !s)}
              aria-label="Toggle theme"
              title="Toggle theme"
            >
              {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
            </Button>

            {/* Notifications */}
            <Dropdown align="end">
              <Dropdown.Toggle as={Button} variant="link" className="position-relative text-muted p-2">
                <FiBell size={20} />
                <Badge bg="danger" pill className="position-absolute top-0 end-0 translate-middle p-1">
                  {/* dot */}
                </Badge>
              </Dropdown.Toggle>
              <Dropdown.Menu style={{ width: 380, maxWidth: '90vw' }} className="p-0 rounded-4 overflow-hidden">
                <div className="px-3 py-2 border-bottom d-flex justify-content-between align-items-center">
                  <div className="fw-semibold">Notifications</div>
                  <Button variant="link" size="sm" className="text-primary text-decoration-none">
                    Mark all as read
                  </Button>
                </div>

                <div style={{ maxHeight: 360, overflowY: "auto" }}>
                  {/* Item 1 */}
                  {/* <Dropdown.Item as="div" className="px-3 py-3">
                    <div className="d-flex align-items-start gap-3">
                      <div className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                           style={{ width: 40, height: 40, background: "linear-gradient(135deg,#3b82f6,#2563eb)" }}>
                        <FiCalendar color="#fff" />
                      </div>
                      <div className="flex-grow-1">
                        <div className="fw-medium text-truncate">New appointment scheduled</div>
                        <div className="text-muted small mt-1">
                          John Smith booked an appointment for tomorrow at 10:00 AM
                        </div>
                        <div className="text-secondary small mt-1">2 minutes ago</div>
                      </div>
                    </div>
                  </Dropdown.Item> */}

                  {/* Item 2 */}
                  {/* <Dropdown.Item as="div" className="px-3 py-3">
                    <div className="d-flex align-items-start gap-3">
                      <div className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                           style={{ width: 40, height: 40, background: "linear-gradient(135deg,#ef4444,#dc2626)" }}>
                        <FiAlertTriangle color="#fff" />
                      </div>
                      <div className="flex-grow-1">
                        <div className="fw-medium text-truncate">Critical lab result</div>
                        <div className="text-muted small mt-1">
                          Patient #2847 has abnormal test results requiring review
                        </div>
                        <div className="text-secondary small mt-1">15 minutes ago</div>
                      </div>
                    </div>
                  </Dropdown.Item> */}

                  {/* Item 3 */}
                  {/* <Dropdown.Item as="div" className="px-3 py-3">
                    <div className="d-flex align-items-start gap-3">
                      <div className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                           style={{ width: 40, height: 40, background: "linear-gradient(135deg,#22c55e,#16a34a)" }}>
                        <FiCreditCard color="#fff" />
                      </div>
                      <div className="flex-grow-1">
                        <div className="fw-medium text-truncate">Payment received</div>
                        <div className="text-muted small mt-1">
                          Invoice #INV-2024-0189 has been paid by Robert Johnson
                        </div>
                        <div className="text-secondary small mt-1">1 hour ago</div>
                      </div>
                    </div>
                  </Dropdown.Item> */}

                  {/* Item 4 */}
                  {/* <Dropdown.Item as="div" className="px-3 py-3">
                    <div className="d-flex align-items-start gap-3">
                      <div className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                           style={{ width: 40, height: 40, background: "linear-gradient(135deg,#a855f7,#7e22ce)" }}>
                        <FiMessageSquare color="#fff" />
                      </div>
                      <div className="flex-grow-1">
                        <div className="fw-medium text-truncate">New message from patient</div>
                        <div className="text-muted small mt-1">
                          Miller sent a new message regarding her prescription
                        </div>
                        <div className="text-secondary small mt-1">3 hours ago</div>
                      </div>
                    </div>
                  </Dropdown.Item> */}
                </div>

                <div className="px-3 py-2 border-top text-center">
                  <Button variant="link" className="text-primary text-decoration-none small">
                    View all notifications
                  </Button>
                </div>
              </Dropdown.Menu>
            </Dropdown>

            {/* Settings */}
            <Dropdown align="end">
              <Dropdown.Toggle as={Button} variant="link" className="text-muted p-2">
                <FiSettings size={20} />
              </Dropdown.Toggle>
              <Dropdown.Menu className="rounded-4 overflow-hidden" style={{ width: 280 }}>
                <div className="px-3 py-2 border-bottom fw-semibold">Settings</div>
                <Dropdown.Item href="#">
                  <FiUser className="me-2" /> Profile Settings
                </Dropdown.Item>
                <Dropdown.Item href="#">
                  <FiBell className="me-2" /> Notifications
                </Dropdown.Item>
                <Dropdown.Item href="#">
                  <FiShield className="me-2" /> Privacy &amp; Security
                </Dropdown.Item>
                <Dropdown.Item href="#">
                  <FiCreditCard className="me-2" /> Billing
                </Dropdown.Item>
                <div className="px-3 py-2 border-top">
                  <Button variant="light" className="w-100 d-flex align-items-center justify-content-center">
                    <FiLogOut className="me-2" /> Sign out
                  </Button>
                </div>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Container>
      </Navbar>

      {/* Mobile search (ẩn/hiện) */}
      {showMobileSearch && (
        <div className="bg-white px-3 px-sm-4 pb-3">
          <InputGroup>
            <InputGroup.Text>
              <FiSearch size={16} />
            </InputGroup.Text>
            <Form.Control placeholder="Search..." aria-label="Search mobile" />
          </InputGroup>
        </div>
      )}
    </header>
  );
}