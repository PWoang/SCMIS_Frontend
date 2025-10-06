import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Col, Card, Row, Dropdown } from "react-bootstrap";
import { Gear } from "react-bootstrap-icons";
import NewClassCard from "./createClass/NewClassCard";
import CreateClassModal from "./createClass/CreateClassModal";

const LS_KEY = "classes";

const loadClasses = () => {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const saveClasses = (items) =>
  localStorage.setItem(LS_KEY, JSON.stringify(items));

const MainContentTeacher = () => {
  const [items, setItems] = useState(() => loadClasses());
  const [editItem, setEditItem] = useState(null); // ✅ class đang được sửa
  const location = useLocation();
  const navigate = useNavigate();

  const showCreate =
    useMemo(() => location.pathname.endsWith("/new"), [location.pathname]) ||
    !!editItem;

  const openCreate = () => navigate("/teacher/new");
  const closeCreate = () => {
    navigate("/teacher");
    setEditItem(null);
  };

  const handleCreated = (cls) => {
    let next;
    if (editItem) {
      // ✅ cập nhật class
      next = items.map((c) => (c.id === editItem.id ? cls : c));
    } else {
      // ✅ tạo mới
      next = [cls, ...items];
    }
    setItems(next);
    saveClasses(next);
    closeCreate();
  };

  const handleEdit = (cls) => {
    setEditItem(cls);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this class?")) {
      const next = items.filter((c) => c.id !== id);
      setItems(next);
      saveClasses(next);
    }
  };

  return (
    <section className="container-fluid py-3">
      <h1 className="fw-bold mb-4">My Classes</h1>

      <Row className="g-4 justify-content-center">
        {items.map((c) => (
          <Col
            key={c.id}
            xs={6}
            sm={6}
            md={4}
            lg={3}
            className="d-flex justify-content-center"
          >
            <Card
              className="h-100 shadow-sm border-0 p-3 rounded-4 position-relative"
              style={{ width: "100%", maxWidth: "200px" }}
            >
              {/* ⚙️ Nút setting */}
              <Dropdown className="position-absolute top-0 end-0 mt-2 me-2">
                <Dropdown.Toggle
                  variant="light"
                  className="border-0 p-1"
                  bsPrefix="no-arrow"
                >
                  <Gear size={18} />
                </Dropdown.Toggle>

                <Dropdown.Menu align="end">
                  <Dropdown.Item onClick={() => handleEdit(c)}>
                    ✏️ Edit
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => handleDelete(c.id)}
                    className="text-danger"
                  >
                    🗑️ Delete
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              <Card.Img
                variant="top"
                src="/logo-classroom.png"
                style={{ width: "5rem", height: "5rem" }}
                className="mx-auto d-block mt-3"
              />
              <Card.Body className="text-center">
                <Card.Title className="fw-semibold fs-6 mb-2">
                  {c.name}
                </Card.Title>
                <Card.Text className="text-muted small">
                  {c.studentCount} Students {c.parentCount} Parents
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}

        {/* Thẻ tạo class mới */}
        <Col
          xs={6}
          sm={6}
          md={4}
          lg={3}
          className="d-flex justify-content-center"
        >
          <NewClassCard onClick={openCreate} />
        </Col>
      </Row>

      {/* ✅ Modal có thể dùng cho cả tạo mới và sửa */}
      <CreateClassModal
        show={showCreate}
        onClose={closeCreate}
        onCreate={handleCreated}
        defaultValues={editItem} // truyền class đang edit (nếu có)
      />
    </section>
  );
};

export default MainContentTeacher;
