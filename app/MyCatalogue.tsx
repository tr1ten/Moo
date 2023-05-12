import { View } from "react-native";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebaseConfig";
import { fetchSellerCatalog } from "../services/user";
import { FAB } from "@rneui/base";
import { FontAwesome5 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import ShowCatalogue from "../components/ShowCatalogue";
import { Catalog, Item } from "../services/item";
import { useIsFocused } from "@react-navigation/native";
const MyCatalogue = () => {
  const [user] = useAuthState(auth);
  const [catalogue, setCatalogue] = React.useState<Catalog>();
  const navigate = useRouter();
  const [refresh, setRefresh] = React.useState(false);
  const onRefresh = () => {
    setRefresh(true);
    if (!user) return;
    fetchSellerCatalog(user.email!).then((catalog) => setCatalogue(catalog));
    setRefresh(false);
  }
  const isFocused = useIsFocused();
  React.useEffect(() => {
    onRefresh();
  }, [user]);
  React.useEffect(() => {
    if (isFocused) {
      onRefresh();
    }
  },[isFocused]);

  return (
    <View
    style={
      {
        height:"100%",
        justifyContent:"space-between"
      }
    }
    >
      <ShowCatalogue 
      refreshing={refresh}
      onRefresh={onRefresh}
      ditems={catalogue ? catalogue.items as Item[] : []} />

      <View style={{
        padding:10
      }}>
      <FAB
        placement="right"
        icon={<FontAwesome5 name="plus" size={24} color="white" />}
        title="Add Item"
        onPress={() => navigate.push("/AddItemModal")}

      />
      </View>
    </View>
  );
};

export default MyCatalogue;
