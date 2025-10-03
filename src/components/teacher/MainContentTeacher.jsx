import { useMemo, useState } from "react";
import { Trophy } from "react-bootstrap-icons";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Col, Card, Row } from "react-bootstrap";
import NewClassCard from "./createClass/NewClassCard";
import CreateClassModal from "./createClass/CreateClassModal";

const LS_KEY = "classes"

const loadClasses = () => {
    try {
        const raw = localStorage.getItem(LS_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
}

const saveClasses = (items) => localStorage.setItem(LS_KEY, JSON.stringify(items))
const MainContentTeacher = () => {
    const [items, setItems] = useState(() => loadClasses());
    const location = useLocation();
    const navigate = useNavigate();

    const showCreate = useMemo(() => location.pathname.endsWith("/new"), [location.pathname]);
    const openCreate = () => navigate("/teacher/new");

    const closeCreate = () => navigate("/teacher");

    const handleCreated = (cls) => {
        const next = [cls, ...items];
        setItems(next);
        saveClasses(next);
        navigate("/teacher")
    }

    return(

            <section className="container-fluid">
                <Row className="g-3">
                    {items.map((c) => (
                        <Col xs={12} md={6} lg={4} key={c.id}>
                        <Card className="h-100 shadow-sm">
                            <Card.Body>
                                <div>
                                    <span className="text-muted">setting</span>
                                </div>
                                <Card.Title className="mt-3 mb-1">{c.name}</Card.Title>
                                <Card.Text className="text-muted">
                                    {c.studentCount} Student : {c.parentCount} Parents
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        </Col>
                    ))}
                    <Col xs={12} md={6} lg={4}>
                        <NewClassCard onClick={openCreate}/>
                    </Col>
                </Row>
                
                <CreateClassModal show={showCreate} onClose={closeCreate} onCreate={handleCreated}/>
                
            </section>
        
    )
}

export default MainContentTeacher;