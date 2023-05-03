import React, { useEffect, useState } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { useAuthState } from "react-firebase-hooks/auth";
import { Stack, useSearchParams } from "expo-router";

import { auth, app, firestore } from "../../firebase/firebaseConfig";
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
  const [user] = useAuthState(auth);
  const SENDER_ID = user?.uid;
  const RECEIVER_ID = "134";
  const { name, area, dues, image } = useSearchParams();

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

  return (
    <>
      <Stack.Screen options={{ title: `${name}` }}></Stack.Screen>
      <GiftedChat
        messages={messages}
        onSend={onSend}
        user={{
          _id: user?.uid!,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        }}
      />
    </>
  );
};
export default Chat;
