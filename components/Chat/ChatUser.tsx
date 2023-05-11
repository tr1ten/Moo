import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { ListItem, Avatar } from '@rneui/themed';
import { auth, firestore } from '../../firebase/firebaseConfig';
import { User } from '../../providers/UserProvider';
import { Text } from '@rneui/themed';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
function ChatUser(item: User) {
    const [user] = useAuthState(auth);
    let RECEIVER_ID:string;
  
    const [lastMessege, setLastMessege] = useState<any>();
    const [lastIsSender, setLastIsSender] = useState<boolean>(false);
    useEffect(() => {
    const SENDER_ID = user?.email;
    RECEIVER_ID = item?.id;
      const chatId = [SENDER_ID, RECEIVER_ID].sort().join("_");
      // get last messege from firebase
      const messagesCollection = collection(firestore, "chat", chatId, "message");
      const docSnap = query(messagesCollection, orderBy("createdAt", "desc"));
      getDocs(docSnap).then((querySnapshot) => {
        if (querySnapshot.empty) {
          return;
        }
        const lastMessage = querySnapshot.docs[0].data();
        setLastMessege(lastMessage);
        setLastIsSender(lastMessage.senderId === SENDER_ID);
      });
    },[]);
    return <ListItem>
      <Avatar rounded source={{
        uri: item?.image ?? "https://cdn-icons-png.flaticon.com/512/9763/9763805.png"
  
      }} />
      <ListItem.Content>
        <ListItem.Title>{item?.name || "Shubh"}</ListItem.Title>
        <ListItem.Subtitle
            style={
                {
                    fontWeight: lastIsSender ? "bold" : "normal",
                    color: lastIsSender ? "black" : "grey",
                    
                }
            }
        >
            {lastIsSender ? "You: " : ""}
            {lastMessege?.text}
        </ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron 
        size={30}
      />
    </ListItem>;
}

export default ChatUser