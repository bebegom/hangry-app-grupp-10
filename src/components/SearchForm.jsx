import { useRef } from 'react'
import  Form  from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Autocomplete } from '@react-google-maps/api'
import '../assets/scss/HomePage.scss'


const SearchForm = ({ onSubmit }) => {
    /* Initiate reference */
    const ref = useRef()

    /* Check if form has value(is valid) */
    const handleForm = (e) => {
        e.preventDefault()

        if(!ref.current.value) {
            console.log(ref.current.value)
            return
        }

        /* Submit the value to caller */
        onSubmit(ref.current.value)
    }

    return (
        <Form onSubmit={handleForm}>
            <Form.Group className="mt-3 text-center">
               <Autocomplete>
                    <Form.Control
                        type="text"
                        ref={ref}
                        placeholder="Enter an adress"
                        required
                    />
               </Autocomplete>
               <Button type="submit" className="mt-2 submitButton">Go now!</Button>
            </Form.Group>
        </Form>
    )
}

export default SearchForm