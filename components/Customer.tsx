import {
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  View,
  Image,
  ToastAndroid,
} from "react-native";
import React, { useState } from "react";
import { ListItem } from "@rneui/themed";
import { Avatar } from "@rneui/base";
import { useTranslation } from "react-i18next";
import { User } from "../providers/UserProvider";
import { Seller } from "./Buyer/SellerItem";
import { useRouter } from "expo-router";
import { SellerSubscription } from "../app/(menu)/(tabs)/MyCustomers";
import { Badge, ButtonGroup } from "@rneui/themed";
import { SubscriptionStatus, changeSubscriptionStatus } from "../services/item";
import { todayString } from "react-native-calendars/src/expandableCalendar/commons";
import { Icon } from "react-native-elements";

function Customer(prop: { data: SellerSubscription; onRefresh: () => void }) {
  const { t } = useTranslation();
  const router = useRouter();
  // icon button group to accept or reject the request
  function RequestBtn() {
    return (
      <ButtonGroup
        onPress={(i) => {
          if (i == 0) {
            changeSubscriptionStatus(
              prop.data.id.toString(),
              SubscriptionStatus.ACTIVE
            ).then((data) => {
              ToastAndroid.show(t("Accepted"), ToastAndroid.SHORT);
              prop.onRefresh();
            });
          } else {
            changeSubscriptionStatus(
              prop.data.id.toString(),
              SubscriptionStatus.CANCELLED
            ).then((data) => {
              ToastAndroid.show(t("Rejected"), ToastAndroid.SHORT);
              prop.onRefresh();
            });
          }
        }}
        buttons={[t("Accept") as string, t("Reject") as string]}
      />
    );
  }
  return (
    <ListItem bottomDivider>
      <Avatar
        rounded
        avatarStyle={{
          borderColor: "gold",
          borderWidth: prop.data?.status == "pending" ? 2 : 0,
        }}
        size={40}
        source={{
          uri:
            prop.data?.buyer?.user?.image ??
            "https://cdn-icons-png.flaticon.com/512/9763/9763805.png",
        }}
      />
      <ListItem.Content>
        <ListItem.Title>
          {prop.data.buyer.user.name ?? prop.data.buyer.user.id}
          {prop.data.status == "pending" && (
            <Badge
              value={t("Pending")}
              status="warning"
              badgeStyle={{
                marginTop: 15,
                marginLeft: 10,
              }}
            />
          )}
        </ListItem.Title>
        <ListItem.Subtitle>
          <Text style={{ fontWeight: "bold" }}> Paid: </Text>
          &#8377;
          {prop.data.item.price * prop.data.quantity}
        </ListItem.Subtitle>
        <ListItem.Subtitle>
          <Text style={{ fontWeight: "bold" }}> Item: </Text>
          {prop.data.item.type?.label}
        </ListItem.Subtitle>
        <ListItem.Subtitle>
          <Text style={{ fontWeight: "bold" }}> Quantity: </Text>
          {prop.data.quantity}
        </ListItem.Subtitle>
        <ListItem.Subtitle>
          {/* <Text style={{ fontWeight: "bold" }}> Dated: </Text> */}
          <Icon name="calendar" type="entypo" size={15} />
            {" "}
          {new Date(prop.data.createdAt).toLocaleDateString()}
        </ListItem.Subtitle>
        <ListItem.Subtitle>
          {/* <Text style={{ fontWeight: "bold" }}> Distance: </Text> */}
          <Icon name="location-pin" type="entypo" size={15} />
          <Text>{prop.data.distance} Km away</Text>
        </ListItem.Subtitle>
        <ListItem.Subtitle>
          {prop.data.status === SubscriptionStatus.ACTIVE && (
            <Badge
              badgeStyle={{
                margin: 5,
              }}
              status={prop.data?.status == "active" ? "success" : "warning"}
              value={prop.data?.status == "active" ? "Active" : "Inactive"}
            />
          )}
        </ListItem.Subtitle>
        {prop.data?.status == "pending" ? <RequestBtn /> : null}
      </ListItem.Content>
      {prop.data.status == "active" && (
        <ListItem.Chevron
          name="message"
          size={24}
          color="lightblue"
          onPress={() => {
            router.push("/chatRoom");
            router.setParams(prop.data.buyer.user as any);
          }}
        />
      )}
    </ListItem>
  );
}
export default Customer;
