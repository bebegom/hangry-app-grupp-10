import {Button, ListGroup} from 'react-bootstrap'
import { Link } from 'react-router-dom'

const TipsList = ({ tips }) => {
    return (
        <ListGroup>
            {tips.map(tip => (
                <ListGroup.Item key={tip.id}>
                    {tip.message}
                    <Button className="mt-2"
                        as={Link}
                        to="/create-new-restaurant"
                    >Create</Button>
                    <Button className="mt-2"
                    >Delete</Button>
                </ListGroup.Item>
            ))}
        </ListGroup>
    )
}

export default TipsList
