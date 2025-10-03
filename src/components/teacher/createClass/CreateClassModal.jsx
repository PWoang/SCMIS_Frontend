import { useEffect, useRef, useState } from "react";
import { Button,  Form, Modal, Spinner  } from "react-bootstrap";


const CreateClassModal = ({show, onClose, onCreate}) => {
    const [name, setName] = useState("");
    const [grade, setGrade] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        if(show) {
            setTimeout(() => inputRef.current?.focus(), 0);
        } else {
            setName("");
            setGrade("");
            setSubmitting(false);
        }
    }, [show]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!name.trim()) return;
        setSubmitting(true);
        
        const created = {
            id: crypto.randomUUID(),
            name: name.trim(),
            grade: grade || "",
            studentCount: 0,
            parentCount: 0,
            createAt: new Date().toISOString()
        }

        setTimeout(() => {
            onCreate(created);
            setSubmitting(false)
        }, 500)
    }
    
    return(
        <Modal show={show} onHide={onClose} centered backdrop="static" keyboard>
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>Create new Class</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>
                            School
                        </Form.Label>
                        <Form.Control value="Clgt" disabled/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="className">
                        <Form.Label>Class name</Form.Label>
                        <Form.Control
                        ref={inputRef}
                        placeholder="Enter name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        minLength={2}
                        />
                        <Form.Text className="text-muted">Ten toi thieu 2 ky tu</Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-1">
                        <Form.Label>Grade</Form.Label>
                        <Form.Select value={grade} onChange={(e) => setGrade(e.target.value)}>
                            <option value="">Choose grade</option>
                            {["6", "7", "8", "9"].map((g) =>(
                                <option key={g} value={g}>Grade {g}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={onClose} disabled={submitting}>Cancel</Button>
                    <Button type="submit" variant="primary" className="rounded-pill px-4" disabled={submitting}>
                        {submitting ? (
                            <>
                            <Spinner size="sm" animation="border" className="me-2"/> Creating...
                            </>
                        ): (
                            "Create"
                        )}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default CreateClassModal;