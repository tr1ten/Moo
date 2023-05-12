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
import { User, useUser } from "../../providers/UserProvider";

const Chat: React.FC = (props: User) => {
  const [messages, setMessages] = React.useState([]);
  const {user} = useUser();
  const SENDER_ID = user!.id;
  let RECEIVER_ID:string;
  let chatId:string;
  const item:User = (useSearchParams() as any);
  // console.log("item is", item);
  useEffect(() => {
    RECEIVER_ID = item.id ?? "123";
    chatId = `${SENDER_ID}_${RECEIVER_ID}`;
    
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
          user:{
            _id: data.senderId,
            name: data.senderId===user?.id?user?.name:item.name,
            avatar: data.senderId===user?.id?user?.image:item.image,
          },
          ...data,
          createdAt: new Date(),
        };
      });

      setMessages(messages);
    });

    return () => unsubscribe();
  }, []);

  const onSend = React.useCallback((newMessages = []) => {
    addDoc(collection(firestore, "chat", chatId, "message"), {
      ...newMessages[0],
      senderid: SENDER_ID,
      receiverId: RECEIVER_ID,
      createdAt: serverTimestamp(),
    });
  }, []);

  return (
    <>
      <Stack.Screen options={{ title: `${item.name}` }}></Stack.Screen>
      <GiftedChat
        messages={messages}
        onSend={onSend}
        user={{
          _id: user!.id,
          name: user?.name,
          avatar: user?.image,
        }}
      />
    </>
  );
};
export default Chat;
