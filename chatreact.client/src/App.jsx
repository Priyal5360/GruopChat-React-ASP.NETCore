import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { useState } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import Room from './assets/Chat/Room';
import Chat from './assets/Chat/Chat';
function App() {

    const [connection, setConnection] = useState(null);
    const [messages, setMessage] = useState([]);
    const [user, setUser] = useState([]);
    const [Currentuser, setCurrentuser] = useState('');

    const joinChatRoom = async (username, chatroom) => {
        try {
            const con = new HubConnectionBuilder()
                .withUrl("https://localhost:7069/chatHub")
                .configureLogging(LogLevel.Information)
                .build();

            con.on("UserInRoom", (user) => {
                setUser(user);
            })

            con.on("UserInRoom", (Currentuser) => {
                setCurrentuser(username);
            })

            con.on("ReceiveMessage", (user, message) => {
                setMessage(messages => [...messages, { user, message }]);
            });

            con.onclose(e => {
                setConnection();
                setMessage([]);
                setUser([]);
                setCurrentuser();
            });

            await con.start();
            await con.invoke("JoinChatRoom", { username, chatroom });

            setConnection(con);
        } catch (e) {
            console.log(e);
        }
    }

    const sendMessage = async (message) => {
        try {
            await connection.invoke("SendMessage", message);
        } catch (e) {
            console.log(e);
        }
    }

    const close = async () => {
        try {
            await connection.stop();
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className='wrapper'>
            <main>
                <Container>
                    <Row className='my-5 px-2'>
                        <Col sm='12'>
                            <h1 className='font-weight-light'>Lets Chat</h1>
                            {!connection
                                ? <Room JoinChatRoom={joinChatRoom} />
                                : <Chat messages={messages} sendMessage={sendMessage}
                                    close={close}
                                    user={user}
                                    Currentuser={Currentuser}/>}
                        </Col>
                    </Row>
                </Container>
            </main>
        </div>
    );
}

export default App;