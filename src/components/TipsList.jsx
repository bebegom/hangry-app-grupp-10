import {Button, ListGroup} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { doc, deleteDoc } from 'firebase/firestore'
import { db } from '../firebase'

const TipsList = ({ tips }) => {
    const handleDelete = async tip => {
        console.log(tip)
        
        const ref = doc(db, 'tips', tip.id)
        await deleteDoc(ref)
    }

    return (
        <ListGroup>
            {tips.map(tip => (
                <ListGroup.Item key={tip.id}>
                    {tip.message}
                    <Button className="mt-2"
                        as={Link}
                        to="/create-new-restaurant"
                    >Create</Button>
                    <Button onClick={() => handleDelete(tip)} className="mt-2"
                    >Delete</Button>
                </ListGroup.Item>
            ))}
        </ListGroup>
    )
}

export default TipsList
