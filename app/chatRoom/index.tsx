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
const name = "ramlal";
const [user] = useAuthState(auth);
const SENDER_ID = user?.uid;
const RECEIVER_ID = "134";
const Chat: React.FC = (props: any) => {
  const [messages, setMessages] = React.useState([]);
  const navigation = props.navigation;

  useEffect(() => {
    console.log("everything is perfect");
    let chatId = `${SENDER_ID}_${RECEIVER_ID}`;
    if (SENDER_ID > RECEIVER_ID) {
      chatId = `${RECEIVER_ID}_${SENDER_ID}`;
    }

    const messagesCollection = collection(firestore, "chat", chatId, "message");
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
    let chatId = `${SENDER_ID}_${RECEIVER_ID}`;
    if (SENDER_ID > RECEIVER_ID) {
      chatId = `${RECEIVER_ID}_${SENDER_ID}`;
    }

    addDoc(collection(firestore, "chat", chatId, "message"), {
      ...newMessages[0],
      senderid: user?.uid,
      receiverId: user?.providerId,
      createdAt: serverTimestamp(),
    });
  }, []);

  const { name, area, dues, image } = useSearchParams();
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
