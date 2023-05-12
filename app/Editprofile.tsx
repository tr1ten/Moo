import { Input, Text, Button } from "@rneui/themed";
import React from "react";
import { ToastAndroid, View } from "react-native";
import SelectLanguages from "../components/SelectLanguages";
import SelectTheme from "../components/SelectTheme";
import { Avatar, Badge, Icon, withBadge } from "@rneui/themed";
import { StyleSheet, Pressable } from "react-native";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { useFonts } from "expo-font";
import { sendPasswordResetEmail, signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { useUser } from "../providers/UserProvider";
function Editprofile() {
  const [fontsLoaded] = useFonts({
    sans: require("./../assets/fonts/ProductSans-Bold.ttf"),
  });
  const [name, setname] = React.useState("FIRST");
  const { user } = useUser();
  const [loc, setloc] = React.useState("MARS");
  const [img, setimg] = React.useState(
    "https://img.freepik.com/premium-vector/man-avatar-profile-round-icon_24640-14044.jpg?w=740"
  );
  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }
  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <View style={styles.c}>
          <Avatar rounded source={{ uri: img }} size="xlarge" />
          <Badge
            status="black"
            value=" change  "
            containerStyle={{ position: "absolute", top: 140, left: 220 }}
            onPress={() => {
              const options = {};
              launchImageLibrary(options, (response) => {
                console.log("reesponse", response);
              });
            }}
          />
          <View style={styles.cont2}>
            <View style={styles.container1}>
              <Input
                style={styles.input}
                placeholder="Name"
                onChangeText={setname}
              />
            </View>
            <View style={styles.container1}>
              <Input
                style={styles.input}
                onChangeText={setloc}
                placeholder="Location"
              />
            </View>
            <Pressable onPress={() => {}}>
              <View style={styles.Button}>
                <Text style={styles.buttontext}>UPDATE</Text>
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
  cont2: {
    marginLeft: 10,
    marginRight: 10,
    gap: 30,
  },
  Button: {
    alignItems: "center",
    justifyContent: "center",
  },
  buttontext: {
    backgroundColor: "black",
    borderRadius: 3,
    fontWeight: "900",
    // //     fontFamily:'sans',
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
