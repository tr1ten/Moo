import { Input, Text, Button } from "@rneui/themed";
import React from "react";
import { View } from "react-native";
import SelectLanguages from "../components/SelectLanguages";
import SelectTheme from "../components/SelectTheme";
import { Avatar, Badge, Icon, withBadge } from "@rneui/themed";
import { StyleSheet } from "react-native";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";

function Editprofile() {
  const [name, setname] = React.useState("Ram lal");
  const [adhar, setadhar] = React.useState("9876 1234 5322");
  const [area, setarea] = React.useState("Al- jhunjhunu");
  const [num, setnum] = React.useState("989737321");

  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <View style={styles.c}>
          <Avatar
            rounded
            source={{ uri: "https://randomuser.me/api/portraits/men/41.jpg" }}
            size="xlarge"
          />
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
              <Text>Name: </Text>
              <Input value={name} onChangeText={setname} />
            </View>
            <View style={styles.container1}>
              <Text>Adhaar: </Text>
              <Input value={adhar} onChangeText={setadhar} />
            </View>
            <View style={styles.container1}>
              <Text>Mobile: </Text>
              <Input value={num} onChangeText={setnum} />
            </View>
            <View style={styles.container1}>
              <Text>Area: </Text>
              <Input value={area} onChangeText={setarea} />
            </View>
            {/* <Input label="Mobile" value={name} onChangeText={setname} />
            <Input label="Area" value={password} onChangeText={setPassword} /> */}
            <Button style={styles.Button} onPress={() => {}} title={"update"} />
          </View>
        </View>
      </View>
      <SelectLanguages />
      <SelectTheme />
    </View>
  );
}

export default Editprofile;

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 10,
    gap: 10,
    flex: 1,
    // alignItems: "center",
  },
  container1: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    //margin: "auto",
    marginLeft: 60,
    marginRight: 60,
    // width: 200,
  },
  container2: {
    alignItems: "center",
    flex: 1,
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
    height: 400,
    margin: 10,
  },
  Button: {
    backgroundColor: "success",
    borderRadius: 20,
    width: 20,
  },
  c: {
    alignItems: "center",
    justifyContent: "center",
  },
});
