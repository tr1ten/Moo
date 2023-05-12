import { Image, Text } from "@rneui/themed";
import React, { useState } from "react";
import { Alert, ToastAndroid, View } from "react-native";

import { StyleSheet } from "react-native";
import { Button } from "@rneui/themed";
import { TextInput } from "react-native-gesture-handler";
import {
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebaseConfig";
// Now you can use that to reauthenticate
function changepassword() {
  const [user] = useAuthState(auth);
  const [email, setEmail] = useState("");
  return (
    <View 
    style={style.container}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        Enter your email
      </Text>
      <TextInput
        style={style.TextInput}
        value={email}
        placeholder="ramu@google.com"
        onChangeText={setEmail}
      />
      <Button
        title="Send Link"
        onPress={() => {
          if(email!=user?.email) {
            ToastAndroid.show("Email not registered", ToastAndroid.SHORT);
            setEmail("");
            return;
          }
          sendPasswordResetEmail(auth, email)
            .then(() => {
              ToastAndroid.show("Email sent", ToastAndroid.SHORT);
              signOut(auth);
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              console.log(error);
            });
        }}
      />
    </View>
  );
}

export default changepassword;

const style = StyleSheet.create({
  container: {
    margin: 10,
    padding: 10,
    flex: 1,
    width: "100%",
    gap: 10,
  },
  TextInput: {
    borderWidth: 1,
    borderColor: "gray",
    marginVertical: 20,
    padding: 10,
    height: 40,
    alignContent: "center",
  },
});
