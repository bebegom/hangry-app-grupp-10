import React from 'react'
import {useForm} from 'react-hook-form'
import { Container, Form, Button } from 'react-bootstrap'

const CreateNewPlacePage = () => {
    const {handleSubmit} = useForm()
    return (
        <Container>
            <h1>Create a new place for the hangry</h1>
            <Form noValidate>
                <Form.Group className='mb-3' controlId='namn'>
                    <Form.Label>Namn</Form.Label>
                    <Form.Control type='text' />
                </Form.Group>

                <Form.Group className='mb-3' controlId='adress'>
                    <Form.Label>Adress</Form.Label>
                    <Form.Control type='text' />
                </Form.Group>

                <Form.Group className='mb-3' controlId='ort'>
                    <Form.Label>Ort</Form.Label>
                    <Form.Control type='text' />
                </Form.Group>

                <Form.Group className='mb-3' controlId='beskrivning'>
                    <Form.Label>Beskrivning</Form.Label>
                    <Form.Control type='text' />
                </Form.Group>

                <Form.Group className='mb-3' controlId='cuisine'>
                    <Form.Label>Cuisine</Form.Label>
                    <Form.Control type='text' /> {/* TODO: change to select */}
                </Form.Group>
                
                <Form.Group className='mb-3' controlId='typ'>
                    <Form.Label>Typ</Form.Label>
                    <select className='form-select'>
                        <option value='cafe'>Cafe</option>
                        <option value='restaurang'>Restaurang</option>
                        <option value='snabbmat'>Snabbmat</option>
                        <option value='kiosk/grill'>Kiosk/Grill</option>
                        <option value='foodtruck'>Foodtruck</option>
                    </select>
                </Form.Group>

                <Form.Group className='mb-3' controlId='utbud'>
                    <Form.Label>Utbud</Form.Label>
                    <select className='form-select'>
                        <option value='lunch'>Lunch</option>
                        <option value='after work'>After Work</option>
                        <option value='middag/a la carte'>Middag/A la Carte</option>
                    </select>
                </Form.Group>

                <Button type='submit'>Create</Button>
            </Form>
        </Container>
    )
}

export default CreateNewPlacePage
