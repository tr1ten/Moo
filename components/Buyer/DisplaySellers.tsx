import React, { useEffect } from 'react'
import { View } from 'react-native'
import { Text } from '@rneui/themed';
import { getNearbySellerItems } from '../../services/user';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/firebaseConfig';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import SellerItem, { Item } from './SellerItem';
import { useIsFocused } from '@react-navigation/native';
function DisplaySellers() {
    const [sellerItems, setsellerItems] = React.useState<Item[]>([]);
    const [loading, setLoading] = React.useState(false);
    const [user] = useAuthState(auth);
    const isFocused = useIsFocused();
    const fetchSeller = async () => {
        setLoading(true);
        if(!user?.email) return;
        const items = await getNearbySellerItems(user?.email);
        setsellerItems(items);
        if(setLoading) setLoading(false);
    }
    useEffect(() => {
        // fetch sellers
        fetchSeller();
    },[isFocused]);
if(loading) return <Text>Loading data...</Text>;
  return (
    <View>
        {sellerItems ?   <FlatList
        contentContainerStyle={{ paddingBottom: 50 }}
        data={sellerItems}
        renderItem={ ({item}) =><SellerItem onRefresh={fetchSeller} item={item} />}
        numColumns={2}
     />
        : 
        <Text>No Sellers Found</Text>
        }
    </View>
  )
}

export default DisplaySellers;