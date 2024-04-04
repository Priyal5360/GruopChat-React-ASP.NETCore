import MessageCont from "./MessageCont";
import PropTypes from 'prop-types';
import Send from "./Send.jsx";
import { Button } from "react-bootstrap";
import ConnectedUser from "./ConnectedUser";

const Chat = ({ messages, sendMessage, close, user, Currentuser}) => {
    return (
        <div>
            <ConnectedUser user={user} />
            <div className='chat'>
                <MessageCont messages={messages} Currentuser={Currentuser} />
                <Send sendMessage={sendMessage} />
            </div>
            <div className='leave-room'>
                <Button variant='danger' onClick={() => close()}>Leave Room</Button>
            </div>
        </div>
    );
}
Chat.propTypes = {
    messages: PropTypes.arrayOf(
        PropTypes.shape({
            message: PropTypes.string.isRequired,
            user: PropTypes.string.isRequired
        })
    ).isRequired,
    sendMessage: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired,
    user: PropTypes.arrayOf(PropTypes.string).isRequired,
    Currentuser: PropTypes.string.isRequired
};


export default Chat;