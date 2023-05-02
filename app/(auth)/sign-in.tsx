import { CheckBox, Input, Text } from "@rneui/themed";
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  TextInput,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { auth } from "../../firebase/firebaseConfig";
import { StyleSheet } from "react-native";
import { Button, Card } from "@rneui/base";

import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { color } from "react-native-reanimated";
import { getUser, registerUser } from "../../services/user";
import { useUser } from "../../providers/UserProvider";

export default function Signin() {
  const [isRegiser, setIsRegister] = React.useState(true);
  const {user:dUser, setUser} = useUser();
  const [mail, setMail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirm, setConfirm] = React.useState("");

  const [error, setError] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [signInWithEmailAndPassword, signUser, SignLoading, SignError] =
    useSignInWithEmailAndPassword(auth);
  const [createUserWithEmailAndPassword, user, loading, userError] =
    useCreateUserWithEmailAndPassword(auth);

  const [isSeller, setIsSeller] = React.useState(0);
  const onRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (error) setError("");
    if (password != confirm) {
      setError("Passwords do not match!");
      return;
    }
    createUserWithEmailAndPassword(mail, password).then(async (user) => {
      if (!user) return;
      await registerUser(mail, isSeller == 1);
      await signInWithEmailAndPassword(mail, password);
      const usr = await getUser(mail);
      setUser({
        id: mail,
        location: usr.location,
        type: usr?.type?.id,
      })
    });
  };
  const onSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // improve
    const user = await getUser(mail);
    if(!user) {
      setError("This user not registered with db");
      return;
    }
    await signInWithEmailAndPassword(mail, password);
    setUser({
      id: mail,
      location: user.location,
      type: user?.type?.id,
    })
    

  };
  useEffect(() => {
    if (userError) {
      setError(userError.message);
    }
    if (!userError && SignError) {
      setError(SignError.message);
    }
  }, [SignError, userError]);

  useEffect(() => {
    setIsLoading(loading || SignLoading);
  }, [loading, SignLoading]);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.welcomeText}>Welcome To Moo!</Text>
      <Card>
        <Card.Title>
          {isRegiser ? <Text>Register</Text> : <Text>Sign In</Text>}
        </Card.Title>
        <Card.Divider />
        <View>
          <Input
            disabled={isLoading}
            label="Email"
            value={mail}
            onChangeText={setMail}
          />
          <Input
            disabled={isLoading}
            label="Password"
            value={password}
            onChangeText={setPassword}
          />
          {isRegiser && (
            <View>
              <Input
                disabled={isLoading}
                label="Confirm Password"
                value={confirm}
                onChangeText={setConfirm}
              />
              <View style={styles.utype}>
                <Text style={styles.utext}>You are</Text>
                <CheckBox
                  checked={isSeller === 1}
                  onPress={() => setIsSeller(1)}
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                  title={"Seller"}
                />
                <CheckBox
                  checked={isSeller === 0}
                  onPress={() => setIsSeller(0)}
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                  title={"Buyer"}
                />
              </View>
            </View>
          )}
          <Text style={styles.error}>{error}</Text>
          <Button
            loading={isLoading}
            onPress={isRegiser ? onRegister : onSignIn}
            title={isRegiser ? "Register" : "Sign In"}
          />
        </View>

        <Text style={styles.btnText}>
          {isRegiser ? "Already a member ?" : "Not a member ?"}{" "}
          <Text
            style={styles.textRegister}
            onPress={() => setIsRegister(!isRegiser)}
          >
            {isRegiser ? "Sign In" : "Register"}{" "}
          </Text>
        </Text>
      </Card>
    </View>
    // </ScrollView>
  );
}
const styles = StyleSheet.create({
  InBack: {
    backgroundColor: "#DCFFFF",
    height: 750,
    width: 460,
    borderTopLeftRadius: 130,
    paddingTop: 100,
    alignItems: "center",
    paddingRight: 30,
  },
  welcomeText: {
    fontSize: 40,
    fontWeight: "bold",
    paddingLeft: 30,
    paddingTop: 60,
  },
  Moo: {
    fontSize: 60,
    fontWeight: "bold",
    paddingLeft: 30,
  },
  error: {
    color: "red",
    textAlign: "center",
    margin: 10,
  },
  wrapper: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "lightblue",
  },
  textRegister: {
    color: "navy",
    fontWeight: "bold",
  },
  btnText: {
    textAlign: "center",
    marginTop: 10,
  },
  TopText: {
    fontSize: 40,
    color: "#3A4F8A",
    fontWeight: "bold",
    paddingBottom: 50,
    textAlign: "center",
  },
  FieldStyle: {
    borderRadius: 100,
    color: "#101626",
    paddingHorizontal: 20,
    width: "78%",
    backgroundColor: "rgb(220,220,220)",
    height: 40,
    marginVertical: 20,
  },
  utype: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "rgb(255,255,255)",
  },
  utext: {
    fontSize: 17,
    fontWeight: "bold",
  },
});
