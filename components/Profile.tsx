import { View, Text, Image, StyleSheet, Share } from "react-native";
import { Avatar, Badge, Icon, withBadge } from "@rneui/themed";
// import Share from "react-native-share";

import React from "react";
import { Link, useRouter, Navigator } from "expo-router";
import { async } from "@firebase/util";

const Profile = (props: any) => {
  const navigation = props.navigation;
  const router = useRouter();

  return (
    <View style={styles.container}>
        <Avatar
          rounded
          source={{ uri: "https://img.freepik.com/premium-vector/man-avatar-profile-round-icon_24640-14044.jpg?w=740" }}
          size={100}
        /> 

    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
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
  },
});
export default Profile;
