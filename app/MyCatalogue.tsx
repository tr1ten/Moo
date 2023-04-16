import { View, Text } from "react-native";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebaseConfig";
import { fetchSellerCatalog } from "../services/user";
import { FAB } from "@rneui/base";
import { FontAwesome5 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import ShowCatalogue from "../components/ShowCatalogue";
import { Catalog, Item } from "../services/item";
const MyCatalogue = () => {
  const [user] = useAuthState(auth);
  const [catalogue, setCatalogue] = React.useState<Catalog>();
  const navigate = useRouter();
  React.useEffect(() => {
    if (!user) return;
    fetchSellerCatalog(user.email!).then((catalog) => setCatalogue(catalog));
  }, [user]);

  return (
    <View>
      <ShowCatalogue items={catalogue ? catalogue.items as Item[] : []} />

      <FAB
        icon={<FontAwesome5 name="plus" size={24} color="white" />}
        title="Add Item"
        onPress={() => navigate.push("/AddItemModal")}
      />
    </View>
  );
};

export default MyCatalogue;
