import { Input, Text, Button } from "@rneui/themed";
import React from "react";
import { TextInput, ToastAndroid, View } from "react-native";
import { Avatar, Badge, Icon, withBadge } from "@rneui/themed";
import { StyleSheet, Pressable } from "react-native";
import { useFonts } from "expo-font";
import { sendPasswordResetEmail, signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { useUser } from "../providers/UserProvider";
import { getUser, updateUser } from "../services/user";
import {  useRouter } from "expo-router";
import * as ImagePicker from 'expo-image-picker';
import { uploadImageAsync } from "../services/utils";
function Editprofile() {
  const { user,setUser} = useUser();
  const [name, setname] = React.useState(user?.name);
  const [bio,setBio] = React.useState(user?.bio);
  const [loading, setLoading] = React.useState(false);
  const navigation = useRouter(); 
  const [img, setimg] = React.useState(
    user?.image ??
      "https://img.freepik.com/premium-vector/man-avatar-profile-round-icon_24640-14044.jpg?w=740"
  );
  const onUpdate = async ()=>{
    if(!user) return;
    if(!name) return;
    setLoading(true);  
    const firebaseUrl = await uploadImageAsync(img);
    const res = await updateUser(user?.id,name,bio,firebaseUrl ?? user?.image);
      if(res){
        ToastAndroid.show("Updated", ToastAndroid.SHORT);
        const fs = await getUser(user.id);
        if(fs) {
          setUser(fs);
        }
        navigation.push("/");
      }
      else{
        ToastAndroid.show("Something went wrong", ToastAndroid.SHORT);
      }
      setLoading(false);
  }
  const onImageChange = async () => {
    setLoading(true);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });
    if (!result.canceled) {
      setimg(result.assets[0].uri);
    }
    setLoading(false);
  };
  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <View style={styles.c}>
          {/* <Avatar 
          rounded source={{ uri: img }} size="xlarge" 
          /> */}
                  <Avatar
          rounded source={{ uri: img }} size="xlarge" 

          containerStyle={{ backgroundColor: 'blue' }}
        >
          <Avatar.Accessory size={40} 
          iconProps={
            {
              name:"camera",
            }
          }
          onPress={onImageChange}
          />
        </Avatar>
          <View style={styles.cont2}>
            <View style={styles.container1}>
              <Input
                style={styles.input}
                defaultValue={user?.name}
                placeholder="Name"
                onChangeText={setname}
              />
            </View>
            <View style={styles.container1}>
              <TextInput
                editable
                multiline
                numberOfLines={7}
                placeholder="Bio"
                defaultValue={user?.bio}
                onChangeText={setBio}
                style={styles.text3}
              />
            </View>
            <Pressable 
            disabled={loading}
            
            onPress={onUpdate}>
              <View style={styles.Button}>
                <Text style={styles.buttontext}>
                  {loading ? "Saving..." : "Save"}
                </Text>
              </View>
            </Pressable>
            <Pressable
              onPress={() => {
                if (!user?.id) return;
                sendPasswordResetEmail(auth, user?.id)
                  .then(() => {
                    ToastAndroid.show("Reset Email sent", ToastAndroid.SHORT);
                  })
                  .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(error);
                  });
              }}
            >
              <View>
                <Text
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    color: "#006fd7",
                  }}
                >
                  Change Password
                </Text>
              </View>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}

export default Editprofile;

const styles = StyleSheet.create({
  container: {
    borderRadius: 50,
    margin: 10,
    padding: 10,
    gap: 10,
    height: "110%",
    backgroundColor: "white",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 4,
    // alignItems: "center",
  },
  container1: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    alignItems: "center",
    //margin: "auto",
    marginLeft: 60,
    marginRight: 60,
    // width: 200,
  },
  container2: {
    alignItems: "center",
    flexDirection: "column",
    textAlign: "center",
    //justifyContent: "center",
  },
  text1: {
    margin: "auto",
    fontSize: 15,
    fontWeight: "500",
    color: "black",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    // marginLeft: 70,
  },
  text2: {
    alignItems: "center",
    justifyContent: "center",

    fontSize: 15,
    fontWeight: "700",
    color: "grey",
  },
  text3:{
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    width: "100%",
    color: "black",
    textAlignVertical: "top",

  },
  cont2: {
    marginLeft: 10,
    marginRight: 10,
    gap: 15,
  },
  Button: {
    alignItems: "center",
    justifyContent: "center",
  },
  buttontext: {
    backgroundColor: "black",
    borderRadius: 3,
    fontWeight: "900",
    textAlign: "center",
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 15,
    color: "white",
  },
  c: {
    gap: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    padding: 10,
  },
});
