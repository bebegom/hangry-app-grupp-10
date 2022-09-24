import {ListGroup} from 'react-bootstrap'
import { Link } from 'react-router-dom'

const TipsList = ({tips}) => {
    return (
    <ListGroup>
        {tips.map(tip => (
            <ListGroup.Item action as={Link} to={`/tips/${tip.id}`} key={tip.id}>
                {tip.message}
            </ListGroup.Item>
        ))}
    </ListGroup>
    )
}

export default TipsList
