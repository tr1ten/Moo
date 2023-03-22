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
      <View>
        <Avatar
          rounded
          source={{ uri: "https://randomuser.me/api/portraits/men/41.jpg" }}
          size="xlarge"
        />
        <Badge
          status="primary"
          value=" edit  "
          containerStyle={{ position: "absolute", top: 140, left: 100 }}
          onPress={() => {
            // router.push("/app");
            navigation.navigate("Editprofile");
          }}
        />
      </View>
      <View style={styles.cont2}>
        <View style={styles.container2}>
          <Text style={styles.text2}>Name:</Text>
          <Text style={styles.text1}> Ram Lal </Text>
        </View>
        <View style={styles.container2}>
          <Text style={styles.text2}>Area:</Text>
          <Text style={styles.text1}> Al-jhunjhunu</Text>
        </View>
        <View style={styles.container2}>
          <Text style={styles.text2}>Phone :</Text>
          <Text style={styles.text1}> 6375281403</Text>
        </View>
        <View style={styles.container2}>
          <Text style={styles.text2}>Adhar:</Text>
          <Text style={styles.text1}> 3421 1234 7689</Text>
        </View>
      </View>
      <View>
        <Avatar
          source={{
            uri: "https://media.istockphoto.com/id/828088276/vector/qr-code-illustration.jpg?s=612x612&w=0&k=20&c=FnA7agr57XpFi081ZT5sEmxhLytMBlK4vzdQxt8A70M=",
          }}
          size={200}
        />
        <Badge
          status="success"
          value=" share  "
          containerStyle={{ position: "absolute", top: 185, left: 160 }}
          onPress={async () => {
            try {
              const result = await Share.share({
                // message:
                //   "React Native | A framework for building native apps using React",
                message:
                  "https://media.istockphoto.com/id/828088276/vector/qr-code-illustration.jpg?s=612x612&w=0&k=20&c=FnA7agr57XpFi081ZT5sEmxhLytMBlK4vzdQxt8A70M=",
              });
              if (result.action === Share.sharedAction) {
                if (result.activityType) {
                  // shared with activity type of result.activityType
                } else {
                  // shared
                }
              } else if (result.action === Share.dismissedAction) {
                // dismissed
              }
            } catch (error: any) {
              console.log(error.message);
            }
          }}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,

    flexDirection: "column",
    // justifyContent: "center",
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
