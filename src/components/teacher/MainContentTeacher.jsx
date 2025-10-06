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
                
                <h1>My classes</h1>
                <Row className="g-2 p-3 h-100">
                    {items.map((c) => (
                        <Col xs={12} md={6} lg={3} key={c.id} className="mb-3">
                        <Card className="h-100 shadow-sm"
                        style={{width: "60%"}}
                        >
                            <Card.Body className="d-flex flex-column">
                                <Card.Title className="mb-3 ">{c.name}</Card.Title>
                                <Card.Img style={{width: "5rem", height: "5rem"}}
                                className="mx-auto mb-2"
                                variant="top" src="/logo-classroom.png"/>
                                <Card.Text className="text-muted mt-auto ms-4">
                                     Students {c.studentCount}  Parents {c.parentCount}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        </Col>
                    ))}
                    <Col xs={12} md={6} lg={3} className="mb-3">
                        <NewClassCard onClick={openCreate}/>
                    </Col>
                </Row> 
                
                <CreateClassModal show={showCreate} onClose={closeCreate} onCreate={handleCreated}/>
                
            </section>
        
    )
}

export default MainContentTeacher;