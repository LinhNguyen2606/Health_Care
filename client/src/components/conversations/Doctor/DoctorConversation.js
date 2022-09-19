import { useEffect, useState } from 'react';
import '../Conversation.scss';
import { getDetailInforDoctorsService } from '../../../services/doctorService';
import hacker from '../../../assets/images/hacker-no-avatar.png';
import { Link } from 'react-router-dom';

function DoctorConversation({ conversation, currentUser }) {
    const [user, setUser] = useState(null);
    useEffect(() => {
        const patientId = conversation.patientId;

        const getUser = async () => {
            try {
                const res = await getDetailInforDoctorsService(patientId);
                setUser(res.data);
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
            <Link to="/video-call">
                <span className="conversationPhone">
                    <i className="fa-solid fa-phone"></i>
                </span>
            </Link>
        </div>
    );
}

export default DoctorConversation;
