import { ImageBackground, SafeAreaView, ScrollView, TextInput, View } from "react-native";
import { Input, Text } from "@rneui/themed";
import React, { useEffect } from "react";
import { auth } from "../../firebase/firebaseConfig";
import { StyleSheet } from "react-native";
import { Button, Card} from "@rneui/base";
import { CheckBox } from "react-native-elements";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { color } from "react-native-reanimated";
import { registerUser } from "../../services/user";

export default function Signin() {
  const [isRegiser, setIsRegister] = React.useState(true);
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
    createUserWithEmailAndPassword(mail, password).then((user) => {
      if(!user) return;
      registerUser(mail,true); 
      signInWithEmailAndPassword(mail, password);

    });
    
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
    <ScrollView

        showsVerticalScrollIndicator={false}
        style={{
            flex: 1,
            backgroundColor:'#607A00',
        }}
        contentContainerStyle={{
            flexGrow: 1,
        }} 
        automaticallyAdjustKeyboardInsets={true}
      >
      <ImageBackground 
                source={require("../../assets/images/cow.jpg")} 
                style={{
                    width:"100%",
                    height:"50%",
                    position:'absolute',
                    top:0
                }}
                imageStyle={{
                    resizeMode: "cover",
                }}
      />
      <Text style={styles.welcomeText}>Welcome To</Text>
      <Text style={styles.Moo}>Moo!</Text>
      <View style={styles.InBack}>
        
        {isRegiser ? <Text style={styles.TopText}>Create a{"\n"}new account</Text> : <Text style={styles.TopText}>Login To Your{"\n"}Account</Text>}  

        <TextInput style={styles.FieldStyle} editable={!isLoading} selectTextOnFocus={!isLoading} placeholder="Email" value={mail} onChangeText={setMail} placeholderTextColor='#101626' />
        <TextInput secureTextEntry={true} style={styles.FieldStyle} editable={!isLoading} selectTextOnFocus={!isLoading} placeholder="Password" value={password} onChangeText={setPassword} placeholderTextColor='#101626' />
        {isRegiser && (<TextInput style={styles.FieldStyle} editable={!isLoading} selectTextOnFocus={!isLoading} placeholder="Confirm Password" value={confirm} onChangeText={setConfirm} placeholderTextColor='#101626' />)}
        <View style={styles.utype} >
          <Text 
            style={styles.utext}
          >You are</Text>
          <CheckBox
            checked={isSeller === 0}
            
            onPress={() => setIsSeller(0)}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            title={"Seller"}
          />
          <CheckBox
            checked={isSeller === 1}
            onPress={() => setIsSeller(1)}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            title={"Buyer"}
          />
        </View>
        <Text style={styles.error}>{error}</Text>
            <Button
              loading={isLoading}
              onPress={isRegiser ? onRegister : onSignIn}
              title={isRegiser ? "Register" : "Sign In"}
            />
            <Text style={styles.btnText}>
              {isRegiser?"Already a member ?":"Not a member ?"}{" "}
            <Text style={styles.textRegister} onPress={() => setIsRegister(!isRegiser)}>
                {isRegiser ? "Sign In" : "Register"}{" "}
            </Text>
        </Text>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  InBack:{
    backgroundColor:"#DCFFFF",
    height:750,
    width:460,
    borderTopLeftRadius:130,
    paddingTop:100,
    alignItems:'center',
    paddingRight:30,
  },
  welcomeText: {
    fontSize: 40,
    fontWeight: "bold",
    paddingLeft:30,
    paddingTop:60
  },
  Moo:{
    fontSize: 60,
    fontWeight: "bold",
    paddingLeft:30,
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
  TopText:{
    fontSize:40,
    color:"#3A4F8A",
    fontWeight:"bold",
    paddingBottom:50,
    textAlign:'center',
  },
  FieldStyle:{
    borderRadius:100,
    color:'#101626',
    paddingHorizontal:20,
    width:"78%",
    backgroundColor:'rgb(220,220,220)',
    height:40,
    marginVertical:20,
  },
  utype: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor:"#DCFFFF",
  },
  utext:{
    fontSize: 17,
    fontWeight: "bold",
    backgroundColor:"#DCFFFF",
  },
});



