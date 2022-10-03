import { useState } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import {useForm} from 'react-hook-form'
import {collection, addDoc, serverTimestamp} from 'firebase/firestore'
import { db } from '../firebase'

const CreateTipsForm = () => {
    const {handleSubmit, register, formState: {errors}, reset} = useForm()
    const [loading, setLoading] = useState(false)

    const onCreateTips = async (data) => {
        // setLoading(true)
        console.log(data)

        // store tips in Firestore
        await addDoc(collection(db, 'tips'), {
            message: data.message,
            created: serverTimestamp(),
        })

        reset()
        setLoading(false)
    }

    return (
        <Container>
            <h1>Skicka in tips till oss</h1>

            <Form noValidate onSubmit={handleSubmit(onCreateTips)}>
                <Form.Group className='mb-3' controlId='message'>
                    <Form.Label></Form.Label>
                    <Form.Control {...register('message', {
                        required: 'Please enter a message',
                        minLength: {
                            value: 20,
                            message: 'gotta give us more than that',
                        },
                    })} as='textarea' rows={6} placeholder="Enter at least 20 characters" />
                    {errors.message && <span>{errors.message.message}</span>}
                </Form.Group>


                <Button disabled={loading} type='submit'>
                    {loading ? '...sending' : 'Send'}
                </Button>
            </Form>
        </Container>
    )
}

export default CreateTipsForm
