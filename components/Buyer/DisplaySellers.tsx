import React, { useEffect } from "react";
import { Text } from "@rneui/themed";
import { getNearbySellerItems } from "../../services/user";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebaseConfig";
import { FlatList } from "react-native-gesture-handler";
import SellerItem, { Item } from "./SellerItem";
import { useIsFocused } from "@react-navigation/native";
function DisplaySellers() {
  const [sellerItems, setsellerItems] = React.useState<Item[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [user] = useAuthState(auth);
  const isFocused = useIsFocused();
  const fetchSeller = async () => {
    setLoading(true);
    if (!user?.email) return;
    const items = await getNearbySellerItems(user?.email);
    if (!items) return;
    // capcity<0
    setsellerItems(items.filter((item: Item) => item.capacity > 0));
    if (setLoading) setLoading(false);
  };
  useEffect(() => {
    // fetch sellers
    fetchSeller();
  }, [isFocused]);
  if (loading) return <Text>Loading data...</Text>;
  if (!sellerItems) return <Text>No Sellers Found</Text>;
  return (
    <FlatList
      contentContainerStyle={{
        paddingBottom: 100,
        paddingLeft: 10,
      }}
      data={sellerItems}
      renderItem={({ item }) => (
        <SellerItem onRefresh={fetchSeller} item={item} />
      )}
      numColumns={2}
    />
  );
}

export default DisplaySellers;
