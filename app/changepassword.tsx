import { Text } from "@rneui/themed";
import React, { useState } from "react";
import { View } from "react-native";

import { StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { TextInput } from "react-native-gesture-handler";
import {
  getAuth,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  sendSignInLinkToEmail,
} from "firebase/auth";
const auth = getAuth();
var actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be in the authorized domains list in the Firebase Console.
  url: "www.myDomain.com",
  // This must be true.
  handleCodeInApp: true,
  iOS: {
    bundleId: "com.example.ios",
  },
  android: {
    packageName: "com.example.android",
    installApp: true,
    minimumVersion: "12",
  },
  dynamicLinkDomain: "example.page.link",
};

const user = auth.currentUser;

// Now you can use that to reauthenticate

console.log(user);
function changepassword() {
  const [email, setPassword] = useState("");
  return (
    <View style={style.container}>
      <TextInput
        style={style.TextInput}
        value={email}
        placeholder="New password "
        onChangeText={setPassword}
      />
      <Button
        title="change Passowrd"
        onPress={() => {
          // reauthenticateWithCredential(
          //   auth.currentUser?.email,
          //   auth.currentUser?.providerId
          // );
          sendSignInLinkToEmail(auth, email, actionCodeSettings)
            .then(() => {
              // The link was successfully sent. Inform the user.
              // Save the email locally so you don't need to ask the user for it again
              // if they open the link on the same device.
              window.localStorage.setItem("emailForSignIn", email);
              // ...
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              console.log(error);
              // ...
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
