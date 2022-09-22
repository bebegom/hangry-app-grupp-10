import React from 'react'
import {useForm} from 'react-hook-form'
import { Container, Form, Button } from 'react-bootstrap'

const CreateNewPlacePage = () => {
    const {handleSubmit, register} = useForm()

    const onCreatePlace = (data) => {
        console.log(data)
    }

    return (
        <Container>
            <h1>Create a new place for the hangry</h1>
            <Form noValidate onSubmit={handleSubmit(onCreatePlace)}>
                <Form.Group className='mb-3' controlId='namn'>
                    <Form.Label>Namn</Form.Label>
                    <Form.Control {...register('name')} type='text' />
                </Form.Group>

                <Form.Group className='mb-3' controlId='adress'>
                    <Form.Label>Adress</Form.Label>
                    <Form.Control {...register('adress')} type='text' />
                </Form.Group>

                <Form.Group className='mb-3' controlId='ort'>
                    <Form.Label>Ort</Form.Label>
                    <Form.Control {...register('ort')} type='text' />
                </Form.Group>

                <Form.Group className='mb-3' controlId='beskrivning'>
                    <Form.Label>Beskrivning</Form.Label>
                    <Form.Control {...register('beskrivning')} type='text' />
                </Form.Group>

                <Form.Group className='mb-3' controlId='cuisine'>
                    <Form.Label>Cuisine</Form.Label>
                    <Form.Control {...register('cuisine')} type='text' /> {/* TODO: change to select */}
                </Form.Group>
                
                <Form.Group className='mb-3' controlId='typ'>
                    <Form.Label>Typ</Form.Label>
                    <select {...register('typ')} className='form-select'>
                        <option value='cafe'>Cafe</option>
                        <option value='restaurang'>Restaurang</option>
                        <option value='snabbmat'>Snabbmat</option>
                        <option value='kiosk/grill'>Kiosk/Grill</option>
                        <option value='foodtruck'>Foodtruck</option>
                    </select>
                </Form.Group>

                <Form.Group className='mb-3' controlId='utbud'>
                    <Form.Label>Utbud</Form.Label>
                    <select {...register('utbud')} className='form-select'>
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
