import {Button, ListGroup} from 'react-bootstrap'
import { Link } from 'react-router-dom'

const TipsList = ({tips}) => {
    return (
    <ListGroup>
        {tips.map(tip => (
            <ListGroup.Item key={tip.id}>
                {tip.message}
                <Button>läst/radera</Button>
            </ListGroup.Item>
        ))}
    </ListGroup>
    )
}

export default TipsList
