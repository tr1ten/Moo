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
        <Avatar.Accessory size={30}  
          style={styles.edit}
          onPress={() => navigation.navigate("Editprofile")}
        />
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    
  },
  edit:{
    position:'relative',
    bottom:25,
    left:30,
    
  },
});
export default Profile;
