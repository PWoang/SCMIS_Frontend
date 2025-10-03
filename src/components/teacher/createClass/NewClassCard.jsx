import { Button, Card } from "react-bootstrap";

const NewClassCard = ({onClick}) => {
    return(
        <Card>
            <Card.Body>
                <div className="display-2">+</div>
                <Button variant="link" className="mt-2 text-decoration-none" onClick={onClick}>
                    New class
                </Button>
            </Card.Body>
        </Card>
    )
}
export default NewClassCard;