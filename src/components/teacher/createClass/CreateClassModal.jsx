import { useEffect, useRef, useState } from "react";
import { Button, Form, Modal, Spinner, InputGroup } from "react-bootstrap";
import { createClassroom } from "../../../services/createClassApi";
import { authFetch } from "../../../services/authFetch";
import './createclassmodal.css'
const CreateClassModal = ({ show, onClose, onCreate, defaultValues }) => {
  const [name, setName] = useState("");
  const [grade, setGrade] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const inputRef = useRef(null);
  
  const [startDate, setStartDate] = useState(() => new Date().toISOString().slice(0,16));
  const [endDate, setEndDate] = useState(() => {
  const d = new Date();
  d.setMonth(d.getMonth() + 2);
  return d.toISOString().slice(0,16);
  });

  const isEditMode = !!defaultValues;

  useEffect(() => {
    if (show) {
      setTimeout(() => inputRef.current?.focus(), 0);
      if (defaultValues) {
        setName(defaultValues.name || "");
        setGrade(defaultValues.grade || "");
      }
    } else {
      setName("");
      setGrade("");
      setSubmitting(false);
    }
  }, [show, defaultValues]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    setSubmitting(true);

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You are not logged in!");
      setSubmitting(false);
      return;
    }

    const payload = {
      className: name.trim(),
      grade: grade,
       startDate: new Date().toISOString(),
  endDate: new Date(new Date().setMonth(new Date().getMonth() + 2)).toISOString(),
    };

    try {
      let result;
      if (isEditMode) {
        result = await updateClassroom(defaultValues.id, payload, token);
      } else {
        result = await createClassroom(payload, token);
      }

      const classObj = {
        id: isEditMode ? defaultValues.id : crypto.randomUUID(),
        name: name.trim(),
        grade: grade || "",
        studentCount: defaultValues?.studentCount || 0,
        parentCount: defaultValues?.parentCount || 0,
        createdAt: defaultValues?.createdAt || new Date().toISOString(),
      };

      onCreate(classObj);
      onClose();
    } catch (err) {
      console.error("❌ Error:", err);
      alert(
        `Failed to ${isEditMode ? "update" : "create"} classroom: ${
          err.message || "Unknown error"
        }`
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      show={show}
      onHide={onClose}
      centered
      backdrop="static"
      keyboard
      animation 
      dialogClassName="rounded-5"
    >
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title
            className="fw-bold text-center w-100"
            style={{ color: "#6f42c1" }}
          >
            {isEditMode ? "Edit Class" : "Create New Class"}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="pt-2">
          {/* School name
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold text-secondary">School</Form.Label>
            <Form.Control value="Clgt" disabled className="bg-light border-0" />
          </Form.Group> */}

          {/* Class name with 🌍 emoji */}
          <Form.Group className="mb-3" controlId="className">
            <Form.Label className="fw-semibold text-secondary">
              Class name
            </Form.Label>
            <InputGroup>
              <Form.Control
                ref={inputRef}
                placeholder="Enter class name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                minLength={2}
                className="py-2 rounded-end-4 border-start-0"
              />
            </InputGroup>
            <Form.Text className="text-muted">
              Name must be at least 2 characters
            </Form.Text>
          </Form.Group>

          {/* Grade select */}
          <Form.Group className="mb-1">
            <Form.Label className="fw-semibold text-secondary">Grade</Form.Label>
            <Form.Select
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              className="py-2 rounded-4"
              required
            >
              <option value="">Choose grade</option>
              {["6", "7", "8", "9"].map((g) => (
                <option key={g} value={g}>
                  Grade {g}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

        <Form.Group className="mb-3">
        <Form.Label>Start Date</Form.Label>
        <Form.Control
            type="datetime-local"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
        />
        </Form.Group>

        <Form.Group className="mb-3">
        <Form.Label>End Date</Form.Label>
        <Form.Control
            type="datetime-local"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
        />
        </Form.Group>
        </Modal.Body>

        <Modal.Footer className="border-0 d-flex justify-content-between">
          <Button
            variant="outline-secondary"
            onClick={onClose}
            disabled={submitting}
            className="rounded-3 px-4"
          >
            Cancel
          </Button>

          <Button
            type="submit"
            className="btn-purple rounded-pill px-4 border-0"
            disabled={submitting}
          >
            {submitting ? (
              <>
                <Spinner size="sm" animation="border" className="me-2" />
                {isEditMode ? "Saving..." : "Creating..."}
              </>
            ) : isEditMode ? (
              "Save changes"
            ) : (
              "Create"
            )}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default CreateClassModal;
