import { View, Text } from 'react-native'
import React from 'react'
import { deleteUserItem, Item } from '../services/item'
import { FlatList } from 'react-native-gesture-handler'
import { CatalogItem } from './CatalogItem'
import { useRoute } from '@react-navigation/native'
import { useNavigation, useRouter } from 'expo-router'
type Props = {
    ditems:Item[]
}
const ShowCatalogue = ({ditems}:Props) => {
  const [items,setItems] = React.useState<Item[]>([]);
  const navigate = useRouter()
  const onDeleteItem = (id:string)=>{
    setItems(items.filter((item)=>item.id!=id));
    deleteUserItem(id);
  }
  const onEditHandler = (id:string)=>{
      navigate.push("/AddItemModal?id="+id);
      
  }
  React.useEffect(()=>{
    setItems(ditems);
  },[ditems]);
  return (
    <View>
      <FlatList data={items} renderItem={({item}) => <CatalogItem onEditHandler={onEditHandler} onDeleteItem={onDeleteItem} item={item} />} keyExtractor={(item,index) => index.toString()}/>
    </View>
  )
}

export default ShowCatalogue;