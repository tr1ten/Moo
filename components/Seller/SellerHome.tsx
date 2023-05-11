import React, { useEffect, useState } from "react";
import SalesStat from "../../app/SalesStat";
import ProductScroller from "../../app/MyProductScroller";
import TopScroller from "../../app/TopCarousal";
import { Calendar } from "react-native-calendars";
import WeeklySales from "../../app/RenderGraph";
import { View, Modal, Alert, Pressable } from "react-native";
import { useUser } from "../../providers/UserProvider";
import { Text } from "@rneui/themed";
import { StyleSheet } from "@bacons/react-views";
import { SubscriptionStatus, getAllSubscriptions } from "../../services/item";
import { SellerSubscription } from "../../app/(menu)/(tabs)/MyCustomers";

export type Stat = {
    ratings: number,
    revenue: number,
    subscribers:number,
}
function SellerHome() {
  const marked = {
    "2023-05-21": {
      selectedDotColor: "yellow",
    },
    "2023-05-28": {
      marked: true,
      selected: true,
      selectedTextColor: "green",
    },
  };
  const currdate = getcurrdate();
  function getcurrdate() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();
    const curr = yyyy + "-" + mm + "-" + dd;
    return curr;
  }
  const [markedates, changemdates] = useState(marked);
  const [modalVisible, setModalVisible] = useState(false);

  const CalenderModal = () => {
    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                This will give overview of all the transaction on this day
              </Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Hide Modal</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    );
  };
  const [stats, setStats] = useState<Stat>({
    ratings:3,
    revenue: 0,
    subscribers:0,
  });
  const {user} = useUser();
  useEffect(() =>  {
    if(!user?.id) return;
      getAllSubscriptions(user?.id).then((data:SellerSubscription[])=>{
        // count the number of subscribers
        const stats = {
          ratings: 3,
          revenue: data.reduce((acc, curr) => acc + curr.status==SubscriptionStatus.ACTIVE ? (curr.item.price*curr.quantity) : 0, 0),
          subscribers: data.reduce((acc, curr) => acc + curr.status==SubscriptionStatus.ACTIVE ? 1 : 0, 0),
        }
        setStats(stats);
        
      })
  }, [user])
  
  return (
    <>
      <TopScroller />
      <SalesStat stats={stats}/>
      <CalenderModal />
      <Calendar
        initialDate="2023-5-1"
        disableAllTouchEventsForDisabledDays={true}
        markedDates={markedates}
        onDayPress={(day) => {
          setModalVisible(true);
        }}
      />
      <WeeklySales text="Weekly Sales" />
      <ProductScroller />
    </>
  );
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  item: {
    marginRight: 20,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "cover",
  },
  title: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default SellerHome;
