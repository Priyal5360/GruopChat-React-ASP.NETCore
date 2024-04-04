import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';

const MessageCont = ({ messages, Currentuser }) => {

    const mesRef = useRef();

    useEffect(() => {
        if (mesRef && mesRef.current) {
            const { scrollHeight, clientHeight } = mesRef.current;
            mesRef.current.scrollTo({
                left: 0, top: scrollHeight - clientHeight,
                behavior: 'smooth'
            });
        }
    }, [messages]);

    return (
        <div className='message-container' ref={mesRef}>
            {messages.map((m, index) =>
                <div key={index} className={m.user === Currentuser ? 'user-message' : 'other-user-message'}>
                    <div className='message'>{m.message}</div>
                    <div className='from-user'>{m.user === Currentuser ? 'you' : m.user}</div>
                </div>
            )}
        </div>
    );
}

MessageCont.propTypes = {
    messages: PropTypes.arrayOf(
        PropTypes.shape({
            message: PropTypes.string.isRequired,
            user: PropTypes.string.isRequired
        })
    ).isRequired,
    Currentuser: PropTypes.string.isRequired
};

export default MessageCont;