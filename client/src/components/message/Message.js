import './Message.scss';
import { format } from 'timeago.js';

export default function Message({ message, own }) {
    return message ? (
        <div className={own ? 'message own' : 'message'}>
            <div className="messageTop">
                <img
                    className="messageImg"
                    src="https://images.pexels.com/photos/1382734/pexels-photo-1382734.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                    alt=""
                />
                <p className="messageText">{message?.text}</p>
            </div>
            <div className="messageBottom">{format(message?.createdAt)}</div>
        </div>
    ) : null;
}
