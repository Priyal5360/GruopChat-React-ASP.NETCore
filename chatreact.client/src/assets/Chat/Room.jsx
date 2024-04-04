import { Form, Button, FormControl } from 'react-bootstrap';
import { useState } from 'react';
import PropTypes from 'prop-types';

function Room({ JoinChatRoom }) {

    const [username, setUsername] = useState();
    const [chatroom, setChatroom] = useState();

    return (
        <Form className='lobby' onSubmit={e => {
            e.preventDefault();
            { JoinChatRoom(username, chatroom) }
        }}>
            <Form.Group>
                <FormControl id='control' placeholder='username' onChange={e => setUsername(e.target.value)} />
                <FormControl id='control' placeholder='chatroom' onChange={e => setChatroom(e.target.value)} />
            </Form.Group>
            <Button id='Button' variant='success' type='submit' disabled={!username || !chatroom}>Join</Button>
        </Form>
    );
}
Room.propTypes = {
    JoinChatRoom: PropTypes.func.isRequired
};

export default Room;