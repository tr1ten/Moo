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
        if(!items || !(items instanceof Array)) return;
        setsellerItems(items);
        setLoading(false);
    }
    useEffect(() => {
        // fetch sellers
        fetchSeller();
    },[isFocused]);
  return (
    <View>
        {loading ? <Text>Loading data...</Text> : 
        <ScrollView>
        {!!sellerItems ?  sellerItems.map(
            (item,key)=><SellerItem onRefresh={()=>fetchSeller()} item={item} key={key}/>
        ) : 
        <Text>No Sellers Found</Text>
        }
    </ScrollView>
        }
    </View>
  )
}

export default DisplaySellers;