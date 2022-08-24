// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc, serverTimestamp, onSnapshot, query, orderBy } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBD9lOaLXs1NwVxeVLCgyItmfofu1OXwBE",
  authDomain: "chat-room-5e787.firebaseapp.com",
  projectId: "chat-room-5e787",
  storageBucket: "chat-room-5e787.appspot.com",
  messagingSenderId: "464270410590",
  appId: "1:464270410590:web:7b6c4d4b35c3a4ff08c5cf",
  measurementId: "G-QNSKPY59MN"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

async function loginWithGoogle() {
    try{
        const provider = new GoogleAuthProvider();
        const auth = getAuth();

        const { user } = await signInWithPopup(auth, provider);

        return { uid: user.uid, displayName: user.displayName };
    }catch(error){
        if (error.code !== 'auth/cancelled-popup-request')
            console.error(error);
        
        return null;
    }
}

async function sendMessage(roomId, user, text){
    try{
        await addDoc(collection(db, 'chat-rooms', roomId, 'messages'), {
            uid: user.uid,
            displayName: user.displayName,
            text: text.trim(),
            timestamp: serverTimestamp(),
        }) ;
    } catch(error){
        console.error(error);
    }
}

function getMessages(roomId, callback){
    return onSnapshot(
        query(
            collection(db, 'chat-rooms', roomId, 'messages').orderBy('timestamp', 'asc')
        ),
        (querySnapshot) =>{
            const messages = querySnapshot.docs.map((doc) => ({
                id: doc.id, 
                ...doc.data(),
            }));
            callback(messages);
        }
    )
}

export { loginWithGoogle, sendMessage, getMessages };