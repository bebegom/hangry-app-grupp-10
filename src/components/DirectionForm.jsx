import { useRef } from 'react'
import  Form  from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Autocomplete } from '@react-google-maps/api'


const DirectionForm = ({ onSubmit }) => {

    /* Initiate reference */
    const startPointRef = useRef()
    const endPointRef = useRef()

    /* Check if form has value(is valid) */
    const handleForm = (e) => {
        e.preventDefault()

        // check if value is true otherwise cancel
        if(!startPointRef.current.value) {
            console.log(startPointRef.current.value)
            return
        }

        if(!endPointRef.current.value) {
            console.log(endPointRef.current.value)
            return
        }

        /* Submit the values to caller */
        onSubmit(startPointRef.current.value, endPointRef.current.value)
    }

    return (
        <Form onSubmit={handleForm}>
            <Form.Group className="d-flex justify-content-center">
                <Autocomplete>
                    <Form.Control
                        type="text"
                        ref={startPointRef}
                        placeholder="Enter startpoint"
                        required
                    />
                </Autocomplete>
                <Autocomplete>
                     <Form.Control
                        type="text"
                        ref={endPointRef}
                        placeholder="Enter endpoint"
                        required
                    />
                </Autocomplete>
               <Button type="submit" variant="outline-primary">Show me the way!</Button>
            </Form.Group>
        </Form>
    )
}

export default DirectionForm