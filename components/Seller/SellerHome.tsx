import React, { useEffect, useState } from "react";
import SalesStat from "../../app/SalesStat";
import ProductScroller from "../../app/MyProductScroller";
import TopScroller from "../../app/TopCarousal";
import { Calendar } from "react-native-calendars";
import MonthlySales from "../../app/MonthlySales";
import { View, Modal, Alert, Pressable } from "react-native";
import { useUser } from "../../providers/UserProvider";
import { Text } from "@rneui/themed";
import { StyleSheet } from "@bacons/react-views";
import { SubscriptionStatus, getAllSubscriptions } from "../../services/item";
import { SellerSubscription } from "../../app/(menu)/(tabs)/MyCustomers";
import { useIsFocused } from "@react-navigation/native";
import { MarkedDates } from "react-native-calendars/src/types";
const data = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43],
      strokeWidth: 2, // optional
    },
  ],
};
const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
]
export type Stat = {
    ratings: number,
    revenue: number,
    subscribers:number,
}
function SellerHome() {
  const currdate = getcurrdate();
  function getcurrdate() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();
    const curr = yyyy + "-" + mm + "-" + dd;
    return curr;
  }
  const [markedates, setMarkedDates] = useState<MarkedDates>();
  const [modalVisible, setModalVisible] = useState(false);
  const [monthlySales, setMonthlySales] = useState([0,0,0,0,0,0,0,0,0,0,0,0]);
  
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
                <Text style={styles.textStyle}>Ok</Text>
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
  const isFocused = useIsFocused();
  const {user} = useUser();
  useEffect(() =>  {
    if(!user?.id) return;
      getAllSubscriptions(user?.id).then((data:SellerSubscription[])=>{
        if(!data) return;
        let itemRatingSum = 0;
        let itemCount = 0;
        // calculate the average rating
        data.forEach((item) => {
          if(!item?.item?.ratings) return;
          itemRatingSum += item.item.ratings.reduce((acc, curr) => acc + curr.rating, 0);
          itemCount += item.item.ratings.length;
        });
        let avgRating = 0;
        if (itemCount > 0) {
          avgRating = itemRatingSum / itemCount;
        }
        // count the number of subscribers
        const stats = {
          ratings: avgRating,
          revenue: data.reduce((acc, curr) => acc + (curr.status==SubscriptionStatus.ACTIVE ? (curr.item.price*curr.quantity) : 0), 0),
          subscribers: data.reduce((acc, curr) => acc +( curr.status==SubscriptionStatus.ACTIVE ? 1 : 0), 0),
        }
        setStats(stats);
        // monthly sales
        const monthlySales = data.reduce((acc, curr) => {
          const month = new Date(curr.createdAt).getMonth();
          acc[month] += curr.status==SubscriptionStatus.ACTIVE ? (curr.item.price*curr.quantity) : 0;
          return acc;
        }
        , [0,0,0,0,0,0,0,0,0,0,0,0]);
        setMonthlySales(monthlySales);
      });
      setMarkedDates({
        
        [getcurrdate()]: {
          selected: true,
        },
        "2021-05-09": {
          textColor: "green",
          
        },
        "2021-05-08": {
          textColor: "red",
          color: "green",
          marked: true,
          
        }
      })
      
  }, [user,isFocused])
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
      <MonthlySales text="Your Sales" data={
        {
          // show last 3 months from current month
          labels: (new Array(3).fill(0).map((_, i) => {
            const month = new Date().getMonth() - i;
            return MONTHS[month < 0 ? 12 + month : month];
          })).reverse(),
          datasets: [{
            data:(new Array(3).fill(0).map((_, i) => {
              const month = new Date().getMonth() - i;
              return monthlySales[month < 0 ? 12 + month : month];
            })).reverse(),
            strokeWidth: 2
          }]
        }
      }/>
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
