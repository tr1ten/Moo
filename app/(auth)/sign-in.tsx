import { View } from "react-native";
import { Input, Text } from "@rneui/themed";
import React from "react";
import { StyleSheet } from "react-native";
import { Button, Card } from "@rneui/base";
import { useAuth } from "../../services/auth/provider";
export default function Signin() {
  const [isRegiser, setIsRegister] = React.useState(false);
  const [mail, setMail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirm, setConfirm] = React.useState("");
  const { signIn } = useAuth();
  const onRegister = () => {
    signIn(); // dummy now
  }
  const onSignIn = () => {  
    signIn(); // dummy now
  }
  return (
    <View
        style={styles.wrapper}

    >
      <Text
        style={styles.welcomeText}
      >Welcome To Moo!</Text>
      <Card>
        <Card.Title>
          {isRegiser ? <Text>Register</Text> : <Text>Sign In</Text>}
        </Card.Title>
        <Card.Divider />
        <View>
            <Input 
                label="Email"
                value={mail}
                onChangeText={setMail}
            />
            <Input
                label="Password"
                value={password}
                onChangeText={setPassword}
            />
            {isRegiser && (
                <Input
                    label="Confirm Password"
                    value={confirm}
                    onChangeText={setConfirm}
                />
            )}
            <Button onPress={
                isRegiser ? onRegister : onSignIn
            } title={isRegiser ? "Register" : "Sign In"} />
            <Text style={styles.btnText}>
                Not a member?{" "}
                <Text style={styles.textRegister}  onPress={() => setIsRegister(!isRegiser)}>
                    {isRegiser ? "Sign In" : "Register"} </Text>

            </Text>
        </View>
      </Card>
    </View>
  );
}
const styles = StyleSheet.create({
    welcomeText:{
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: "center"
        
    },
    wrapper: {
        flex: 1,
        justifyContent: "center",

    },
    textRegister: {
        color: "navy",
        fontWeight:"bold"
    },
    btnText:{
        textAlign: "center",
        marginTop: 10
    }

});
