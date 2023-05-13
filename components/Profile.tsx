import { View, Text, StyleSheet,Pressable } from "react-native";
import { Avatar } from "@rneui/themed";
import React from "react";
import {  useRouter } from "expo-router";
import { useUser } from "../providers/UserProvider";

const Profile = (props: any) => {
  const {user} = useUser();
  const navigation = props.navigation;
  const router = useRouter();

  return (
    <>
      <View style={styles.container}>
          <Avatar
            rounded
            source={{ uri: user?.image ??  "https://img.freepik.com/premium-vector/man-avatar-profile-round-icon_24640-14044.jpg?w=740" }}
            size={100}
          />
      </View>
      <Pressable  onPress={() => navigation.navigate("Editprofile")}>
        <View style={styles.edit}>
          <Text style={styles.textedit}>
            Edit
          </Text>
        </View>
      </Pressable>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    
  },
  container2: {
    flex: 1,
    flexDirection: "row",
    textAlign: "left",

    justifyContent: "center",
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
  text3: {
    marginLeft: 5,
    margin: 5,
    fontSize: 15,
    fontWeight: "700",
    color: "black",
  },

  area: {
    flex: 1,
    flexDirection: "row",
  },
  image: {
    borderRadius: 200,
    margin: 15,
    width: 250,
    height: 250,
  },
  cont2: {
    height: 100,
    margin: 30,
  }
  ,edit:{
    alignItems:'flex-end',
    paddingRight:50,
    marginLeft:10,
    marginRight:10,
    
  },textedit:{
    color:"blue",
//     fontFamily:'sans',
    borderBottomWidth:1,
    borderColor:'blue'
  }
});
export default Profile;
