import React, { useEffect, useState } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth, app, firestore } from "../firebase/firebaseConfig";
import {
  getFirestore,
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

const Chat: React.FC = (props: any) => {
  const [messages, setMessages] = React.useState([]);
  const navigation = props.navigation;

  useEffect(() => {
    const messagesCollection = collection(
      firestore,
      "chat",
      "123456",
      "message"
    );
    const q = query(messagesCollection, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messages = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        const { createdAt } = data;

        return {
          ...data,
          createdAt: new Date(),
        };
      });

      setMessages(messages);
    });

    return () => unsubscribe();
  }, []);

  const onSend = React.useCallback((newMessages = []) => {
    addDoc(collection(firestore, "chat", "123456", "message"), {
      ...newMessages[0],
      senderid: user?.uid,
      receiverId: user?.providerId,
      createdAt: serverTimestamp(),
    });
  }, []);
  const [user] = useAuthState(auth);
  return (
    <GiftedChat
      messages={messages}
      onSend={onSend}
      user={{
        _id: user?.uid!,
        name: "Your Name",
        avatar: "https://your-photo-url.com",
      }}
    />
  );
};

export default Chat;
