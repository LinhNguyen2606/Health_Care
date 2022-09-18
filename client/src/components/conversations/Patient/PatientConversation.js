import { useEffect, useState } from 'react';
import '../Conversation.scss';
import { getAllUsers } from '../../../services/userService';
import hacker from '../../../assets/images/hacker-no-avatar.png';
function PatientConversation({ conversation, currentUser }) {
    const [user, setUser] = useState(null);
    useEffect(() => {
        const doctorId = conversation.doctorId;

        const getUser = async () => {
            try {
                const res = await getAllUsers(doctorId);
                setUser(res.users);
            } catch (e) {
                console.log(e);
            }
        };
        getUser();
    }, [currentUser, conversation]);
    return (
        <div className="conversation">
            <img className="conversationImg" src={user && user.image ? user.image : hacker} alt="" />
            <span className="conversationName">{user?.fullname}</span>
        </div>
    );
}

export default PatientConversation;
