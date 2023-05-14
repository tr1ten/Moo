import { Avatar, Badge, Button, ListItem, Text } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import { BuyerSubscription } from "../../app/(menu)/(tabs)/MySubscriptions";
import { Dialog, Icon } from "@rneui/base";
import { Slider, ToastAndroid, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Rating } from "react-native-elements";
import { useUser } from "../../providers/UserProvider";
import { changeRating } from "../../services/item";
function SubscriptionItem({
  sub,
  onDelete,
}: {
  sub: BuyerSubscription;
  onDelete: (arg: number) => void;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const toggle = () => setIsVisible(!isVisible);
  const [rat,setRat] = useState(0);
  const {user} = useUser()
  const onUpdateRating = async ()=>{
    if(!user?.id){
      ToastAndroid.show("Please login first!", ToastAndroid.SHORT);
      return;
    }
    try{
      await changeRating(sub.item.id,user?.id,rat);
      ToastAndroid.show("Thanks for your feedback!", ToastAndroid.SHORT);
    }
    catch(e){
      ToastAndroid.show("Something went wrong!", ToastAndroid.SHORT);
    }
    finally{
      toggle();
    }
    
  }
  useEffect(()=>{
    if(!sub.item || !sub.item.ratings) return;
    const rating = (sub.item.ratings.find((e)=>e.buyer.userId===user?.id));
    if(rating){
        setRat(rating.rating);
    }
  },[]);
  return (
    <>
      <Dialog
        isVisible={isVisible}
        onBackdropPress={toggle}
        overlayStyle={{
          backgroundColor: "white",
        }}
      >
        <Dialog.Title
          titleStyle={{
            textAlign: "center",
            padding: 10,
          }}
          title={`${sub.item.type?.label} by ${sub.item.catalogue?.seller.user.name}`}
        />
        <Rating
          showRating
          imageSize={40}
          startingValue={rat}
          onFinishRating={setRat}
          style={{ paddingVertical: 10 }}
        />
        <Dialog.Actions
        >
          <View
          style={{
            flexDirection: "row",
            width:"100%",
            justifyContent:"center"
          }}
          >
          <Dialog.Button
            containerStyle={{
              backgroundColor: "rgb(14, 164, 228)",
            }}
            title={<Text style={{ color: "white" }}>Rate</Text>}
            onPress={onUpdateRating}
          />
          </View>
        </Dialog.Actions>
      </Dialog>
      <ListItem>
        <Avatar rounded source={{ uri: sub?.item?.type?.image }} />
        <ListItem.Content>
          <ListItem.Title>{sub.item.type?.label}</ListItem.Title>

          <ListItem.Subtitle>
            <View
              style={{
                flexDirection: "row",
                gap: 2,
                alignItems: "center",
              }}
            >
              <Icon name="account-circle" type="material-community" size={12} />
              <Text>{sub.item.catalogue?.seller.user.name ?? "Rajesh"}</Text>
            </View>
          </ListItem.Subtitle>
          <ListItem.Subtitle>
            <View
              style={{
                flexDirection: "row",
                gap: 2,
                alignItems: "center",
              }}
            >
              <Icon name="shopping" type="material-community" size={12} />
              <Text>{sub.quantity}</Text>
            </View>
          </ListItem.Subtitle>
          <ListItem.Subtitle>
            <View
              style={{
                flexDirection: "row",
                gap: 2,
                alignItems: "center",
              }}
            >
              <Icon name="currency-rupee" type="material-community" size={12} />
              <Text>{sub.quantity * sub.item.price}</Text>
            </View>
          </ListItem.Subtitle>
          <ListItem.Subtitle>
            <Badge
              badgeStyle={{
                margin: 5,
              }}
              status={
                sub?.status == "active"
                  ? "success"
                  : sub?.status == "pending"
                  ? "warning"
                  : "error"
              }
              value={
                sub?.status == "active"
                  ? "Active"
                  : sub?.status == "pending"
                  ? "Pending"
                  : "Rejected"
              }
            />
          </ListItem.Subtitle>
        </ListItem.Content>
        <View
          style={{
            gap: 5,
          }}
        >
          {sub.status == "active" && (
            <Button
              onPress={() => onDelete(sub.id)}
              color={"error"}
              title={"Cancel"}
            />
          )}
          {sub.status == "active" && (
            <TouchableOpacity onPress={toggle}>
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Rate
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ListItem>
    </>
  );
}

export default SubscriptionItem;
