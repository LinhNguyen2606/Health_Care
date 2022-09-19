import { useEffect, useRef, useState } from 'react';
import './Messenger.scss';
import { connect } from 'react-redux';
import Topbar from '../../components/topbar/Topbar';
import DoctorConversation from '../../components/conversations/Doctor/DoctorConversation';
import PatientConversation from '../../components/conversations/Patient/PatientConversation';
import Message from '../../components/message/Message';
import axios from 'axios';
import { io } from 'socket.io-client';
import { useLocation } from 'react-router-dom';
import { createConversationService } from '../../services/chatService';

function Messenger(props) {
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const socket = useRef();
    const scrollRef = useRef();
    const location = useLocation();
    const idDoctor = location.state;

    useEffect(() => {
        socket.current = io('ws://localhost:8900');
        socket.current.on('getMessage', (data) => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now(),
            });
        });
    }, []);

    useEffect(() => {
        let curentChatId = props.user?.userInfo?.roleId === 'R2' ? currentChat?.patientId : currentChat?.doctorId;
        arrivalMessage &&
            curentChatId?.toString().includes(arrivalMessage.sender) &&
            setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage, currentChat]); /* eslint-disable-line */

    useEffect(() => {
        socket.current.emit('addUser', props.user?.userInfo?.id);
        socket.current.on('getUsers', (users) => {});
    }, [props.user]);

    useEffect(() => {
        const getConversations = async () => {
            try {
                let res = '';
                if (props.user?.userInfo?.roleId === 'R2') {
                    res = await axios.get(
                        `http://localhost:8080/api/conversation/search-by-doctor/${props.user?.userInfo?.id}`,
                    );
                } else if (props.user?.userInfo?.roleId === 'R3') {
                    res = await axios.get(
                        `http://localhost:8080/api/conversation/search-by-patient/${props.user?.userInfo?.id}`,
                    );
                }
                createNewConversation(res);
            } catch (e) {
                console.log(e);
            }
        };
        getConversations();
    }, [props.user]); /* eslint-disable-line */

    const createNewConversation = async (res) => {
        //check xem co doctorId chua, co roi k can tao
        if (props.user?.userInfo?.roleId === 'R3' && res.data.some((item) => item.doctorId === idDoctor.id)) {
            setConversations(res.data);
        }
        //check xem co doctorId chua
        else if (props.user?.userInfo?.roleId === 'R3' && res.data.some((item) => item.doctorId !== idDoctor.id)) {
            let createNewConversation = await createConversationService({
                patientId: props.user?.userInfo?.id,
                doctorId: idDoctor.id,
            });
            setConversations(createNewConversation);
        }
        //check xem co chat chua, chua co thi tao
        else if (props.user?.userInfo?.roleId === 'R3' && res.data.length === 0) {
            let createNewConversation = await createConversationService({
                patientId: props.user?.userInfo?.id,
                doctorId: idDoctor.id,
            });
            setConversations(createNewConversation);
        }
        //okee
        else {
            setConversations(res.data);
        }
    };

    useEffect(() => {
        const getMessages = async () => {
            try {
                let res = await axios.get(`http://localhost:8080/api/message/${currentChat?.id}`);
                setMessages(res.data);
            } catch (e) {
                console.log(e);
            }
        };
        getMessages();
    }, [currentChat]);

    const handleSubmit = async () => {
        const message = {
            sender: props.user?.userInfo?.id,
            text: newMessage,
            conversationId: currentChat.id,
        };

        const receiverId = props.user?.userInfo?.roleId === 'R2' ? currentChat?.patientId : currentChat?.doctorId;

        socket.current.emit('sendMessage', {
            senderId: props.user?.userInfo?.id,
            receiverId,
            text: newMessage,
        });

        try {
            const res = await axios.post(`http://localhost:8080/api/message/`, message);
            setMessages([...messages, res.data]);
            setNewMessage('');
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' || e.keyCode === 13) {
            handleSubmit();
        }
    };

    return (
        <>
            <Topbar currentUser={props.user} />
            <div className="messenger">
                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        <span className="list-friends">List of Friends</span>
                        {props.user?.userInfo?.roleId === 'R2' ? (
                            <>
                                {conversations?.map((item, index) => (
                                    <div onClick={() => setCurrentChat(item)} key={index}>
                                        <DoctorConversation conversation={item} currentUser={props.user} />
                                    </div>
                                ))}
                            </>
                        ) : (
                            <>
                                {conversations?.map((item, index) => (
                                    <div onClick={() => setCurrentChat(item)} key={index}>
                                        <PatientConversation conversation={item} currentUser={props.user} />
                                    </div>
                                ))}
                            </>
                        )}
                    </div>
                </div>
                <div className="chatBox">
                    <div className="chatBoxWrapper">
                        {currentChat ? (
                            <>
                                <div className="chatBoxTop">
                                    {messages.map((item, index) => (
                                        <div key={index} ref={scrollRef}>
                                            <Message message={item} own={+item.sender === props.user?.userInfo?.id} />
                                        </div>
                                    ))}
                                    <Message />
                                </div>
                                <div className="chatBoxBottom">
                                    <textarea
                                        className="chatMessageInput"
                                        placeholder="write something..."
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        value={newMessage}
                                        onKeyDown={(e) => handleKeyDown(e)}
                                    ></textarea>
                                    <button className="chatSubmitButton" onClick={handleSubmit}>
                                        Send
                                    </button>
                                </div>
                            </>
                        ) : (
                            <span className="noConversationText">Open a conversation to start a chat.</span>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Messenger);
