import {Link, useParams} from 'react-router-dom';
import {chatRooms} from '../../data/chatRooms';
import { MessageInput } from '../MessageInput';
import './styles.css';

function ChatRoom() {
    const params = useParams();
    const room = chatRooms.find(room => room.id === params.id);

    if(!room){
        return <div>Chat room not found</div>
    }

    return (
        <>
            <h2>{room.title}</h2>
            <div>
                <Link to={`/`}>Back to chat rooms</Link>
            </div>
            <div className='messages-container'>
                <MessageInput roomId={room.id} />
            </div>
        </>
  )
}

export {ChatRoom};