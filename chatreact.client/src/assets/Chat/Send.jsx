import { Form, FormControl, InputGroup,Button } from 'react-bootstrap';
import { useState } from 'react';
import PropTypes from 'prop-types';

const Send = ({ sendMessage }) => {
    const [message, setMessage] = useState('');

    return (
        <div>
            <Form
                onSubmit={e => {
                    e.preventDefault();
                    sendMessage(message);
                    setMessage('');
                }}>
                <InputGroup className='mb-3'>
                    <FormControl placeholder="message..." onChange={e => setMessage(e.target.value)} value={message}></FormControl>
                    <Button variant='primary' type='submit' disabled={!message}>Send</Button>
                </InputGroup>
            </Form>
        </div>
    );
}

Send.propTypes = {
    sendMessage: PropTypes.func.isRequired
};
export default Send;