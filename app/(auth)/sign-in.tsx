import { View } from "react-native";
import { Input, Text } from "@rneui/themed";
import React, { useEffect } from "react";
import { auth } from "../../firebase/firebaseConfig";
import { StyleSheet } from "react-native";
import { Button, Card } from "@rneui/base";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { color } from "react-native-reanimated";

export default function Signin() {
  const [isRegiser, setIsRegister] = React.useState(false);
  const [mail, setMail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirm, setConfirm] = React.useState("");

  const [error, setError] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [signInWithEmailAndPassword, signUser, SignLoading, SignError] =
    useSignInWithEmailAndPassword(auth);
  const [createUserWithEmailAndPassword, user, loading, userError] =
    useCreateUserWithEmailAndPassword(auth);

  const onRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (error) setError("");
    if (password != confirm) {
      setError("Passwords do not match!");
      return;
    }
    await createUserWithEmailAndPassword(mail, password);
    await signInWithEmailAndPassword(mail, password);
  };
  const onSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // improve
    await signInWithEmailAndPassword(mail, password);
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
      setIsLoading( loading || SignLoading);
  },[loading,SignLoading]);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.welcomeText}>Welcome To Moo!</Text>
      <Card>
        <Card.Title>
          {isRegiser ? <Text>Register</Text> : <Text>Sign In</Text>}
        </Card.Title>
        <Card.Divider />
        <View>
          <Input disabled={isLoading} label="Email" value={mail} onChangeText={setMail} />
          <Input disabled={isLoading} label="Password" value={password} onChangeText={setPassword} />
          {isRegiser && (
            <Input disabled={isLoading}
              label="Confirm Password"
              value={confirm}
              onChangeText={setConfirm}
            />
          )}
          <Text style={styles.error}>{error}</Text>
          <Button
            loading={isLoading}
            onPress={isRegiser ? onRegister : onSignIn}
            title={isRegiser ? "Register" : "Sign In"}
          />
          <Text style={styles.btnText}>
            Not a member?{" "}
            <Text
              style={styles.textRegister}
              onPress={() => setIsRegister(!isRegiser)}
            >
              {isRegiser ? "Sign In" : "Register"}{" "}
            </Text>
          </Text>
        </View>
      </Card>
    </View>
  );
}
const styles = StyleSheet.create({
  welcomeText: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  error:{
    color:"red",
    textAlign:"center",
    margin: 10
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
});
