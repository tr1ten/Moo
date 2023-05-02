import React, { useEffect } from 'react'
import { View } from 'react-native'
import { Text } from '@rneui/themed';
import { getNearbySellerItems } from '../../services/user';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/firebaseConfig';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import SellerItem, { Item } from './SellerItem';
function DisplaySellers() {
    const [sellerItems, setsellerItems] = React.useState<Item[]>([]);
    const [loading, setLoading] = React.useState(false);
    const [user] = useAuthState(auth);
    useEffect(() => {
        // fetch sellers
        const fetchSeller = async () => {
            setLoading(true);
            if(!user?.email) return;
            const items = await getNearbySellerItems(user?.email);
            setsellerItems(items);
            setLoading(false);
        }
        fetchSeller();
    },[]);
  return (
    <View>
        {loading ? <Text>Loading data...</Text> : 
        <ScrollView>
        {sellerItems ?  sellerItems.map(
            (item,key)=><SellerItem item={item} key={key}/>
        ) : 
        <Text>No Sellers Found</Text>
        }
    </ScrollView>
        }
    </View>
  )
}

export default DisplaySellers