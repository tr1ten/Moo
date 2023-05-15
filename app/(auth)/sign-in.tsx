import { CheckBox, Input, Text } from "@rneui/themed";
import {
  ImageBackground,
  Keyboard,
  ScrollView,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { auth } from "../../firebase/firebaseConfig";
import { StyleSheet } from "react-native";
import { Button, Card } from "@rneui/base";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { getUser, registerUser } from "../../services/user";
import { useUser } from "../../providers/UserProvider";
import * as Location from 'expo-location';

export default function Signin() {
  const [isRegiser, setIsRegister] = React.useState(true);
  const {user:dUser, setUser} = useUser();
  const [mail, setMail] = React.useState("");
  const [Name, setName] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirm, setConfirm] = React.useState("");

  const [error, setError] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);
  const [signInWithEmailAndPassword, signUser, SignLoading, SignError] =
    useSignInWithEmailAndPassword(auth);
  const [createUserWithEmailAndPassword, user, loading, userError] =
    useCreateUserWithEmailAndPassword(auth);

  const [isSeller, setIsSeller] = React.useState(false);
  function validate(){
      if(!mail || !password) return false;
      if(isRegiser && !Name) return false;
      // check mail
      if(!RegExp("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$").test(mail)) return false;
      return true;
  }
  const onRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (error) setError("");
    if(!validate()) {
      setError("Please fill all fields");
      return;
    }
    if (password != confirm) {
      setError("Passwords do not match!");
      return;
    }
    createUserWithEmailAndPassword(mail, password).then(async (user) => {
      if (!user) return;
      await registerUser(mail, isSeller,Name,location);
      await signInWithEmailAndPassword(mail, password);
      const usr = await getUser(mail);
      // console.log("register user ",usr);
      setUser({
        id: mail,
        location: usr.location,
        name: usr.name,
        type: usr?.type,
        image: usr.image,
        bio: usr.bio,
      })
    });
  };
  const onSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (error) setError("");
    if(!validate()) {
      setError("Please fill all fields");
      return;
    }
    // improve
    const user = await getUser(mail);
    if(!user) {
      setError("This user not registered with db");
      return;
    }
    // console.log("recieved user name ",user);
    await signInWithEmailAndPassword(mail, password);
    setUser({
      id: mail,
      location: user.location,
      type: user?.type,
      name: user.name,
      image: user.image,
      bio: user.bio,
    })


  };
  useEffect(() => {
    Location.requestForegroundPermissionsAsync()
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


  const scrollViewRef = useRef<ScrollView>(null);

  const handleFocus = () => {
    scrollViewRef.current?.setNativeProps({ scrollEnabled: true });
  };

  const handleBlur = () => {
    scrollViewRef.current?.setNativeProps({ scrollEnabled: false });
  }; 
  
  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: true });
    });

    return () => {
      keyboardDidHideListener.remove();
    };
  }, []);
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords.latitude + "," + location.coords.longitude);
    })();
  },[]);
  return (
    <View style={{ flex: 1 }}>
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
        ref={scrollViewRef}
        scrollEnabled={false}
        keyboardShouldPersistTaps="handled"
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
        {isRegiser ? <Text style={styles.TopText}>Sign-Up</Text> : <Text style={styles.TopText}>Sign-In</Text>}  
        {isRegiser && (<Input
        inputContainerStyle={{
          borderBottomWidth:0,
        }}
        leftIcon={{ type: "font-awesome", name: "user",size:17,color:'#101626'  }}
        
        containerStyle={styles.FieldStyle} editable={!isLoading} selectTextOnFocus={!isLoading} placeholder="name" value={Name} onChangeText={setName} onFocus={handleFocus} onBlur={handleBlur} />)}
        <Input
        inputContainerStyle={{
          borderBottomWidth:0,
        }}
        leftIcon={{ type: "font-awesome", name: "envelope",size:17,color:'#101626'  }}
        containerStyle={styles.FieldStyle} editable={!isLoading} selectTextOnFocus={!isLoading} placeholder="email" value={mail} onChangeText={setMail} onFocus={handleFocus} onBlur={handleBlur} />
        <Input 
        inputContainerStyle={{
          borderBottomWidth:0,
        }}
        leftIcon={{ type: "font-awesome", name: "lock",size:17,color:'#101626'  }}
        secureTextEntry={true} containerStyle={styles.FieldStyle} editable={!isLoading} selectTextOnFocus={!isLoading} placeholder="password" value={password} onChangeText={setPassword} onFocus={handleFocus} onBlur={handleBlur} />
        {isRegiser && (<Input
          inputContainerStyle={{
            borderBottomWidth:0,
          }}
          leftIcon={{ type: "font-awesome", name: "lock",size:17,color:'#101626'  }}
        secureTextEntry={true} containerStyle={styles.FieldStyle} editable={!isLoading} selectTextOnFocus={!isLoading} placeholder="confirm password" value={confirm} onChangeText={setConfirm} onFocus={handleFocus} onBlur={handleBlur} />)}
        {isRegiser && (
            <View style={styles.utype}>
              <Text 
                style={styles.utext}
              >You are</Text>
              <CheckBox
                checked={isSeller}

                onPress={() => setIsSeller(true)}
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                title={"Seller"}
                containerStyle={{
                  backgroundColor: "transparent",
                }}
              />
              <CheckBox
                checked={!isSeller}
                onPress={() => setIsSeller(false)}
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                title={"Buyer"}
                containerStyle={{
                  backgroundColor: "transparent",
                }}
              />
            </View>
        )}
        <Text style={styles.error}>{error}</Text>
            <Button
              loading={isLoading}
              onPress={isRegiser ? onRegister : onSignIn as any}
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
    </View>
  );
}
const styles = StyleSheet.create({
  InBack:{
    backgroundColor:"#DCFFFF",
    height:750,
    width:460,
    borderTopLeftRadius:130,
    paddingTop:20,
    alignItems:'center',
    paddingRight:40,
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
    paddingBottom:10,
    textAlign:'center',
  },
  FieldStyle:{
    // borderRadius:20,
    borderBottomColor: '#3A4F8A',
    borderBottomWidth: 1,
    width:"80%",
    backgroundColor:'white',
    height:40,
    marginVertical:10,
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


