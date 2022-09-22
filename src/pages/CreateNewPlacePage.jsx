import React from 'react'
import {useForm} from 'react-hook-form'
import { Container, Form, Button } from 'react-bootstrap'

const CreateNewPlacePage = () => {
    const {handleSubmit} = useForm()
    return (
        <Container>
            <h1>Create a new place for the hangry</h1>
            <Form noValidate>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type='text' />
                </Form.Group>
                <Button type='submit'>Create</Button>
            </Form>
        </Container>
    )
}

export default CreateNewPlacePage
