import { View, Text } from 'react-native'
import React from 'react'
import { deleteUserItem, Item } from '../services/item'
import { FlatList } from 'react-native-gesture-handler'
import { CatalogItem } from './CatalogItem'
type Props = {
    ditems:Item[]
}
const ShowCatalogue = ({ditems}:Props) => {
  const [items,setItems] = React.useState<Item[]>([]);
  const onDeleteItem = (id:string)=>{
    setItems(items.filter((item)=>item.id!=id));
    deleteUserItem(id);
  }
  React.useEffect(()=>{
    setItems(ditems);
  },[ditems]);
  return (
    <View>
      <FlatList data={items} renderItem={({item}) => <CatalogItem onDeleteItem={onDeleteItem} item={item} />} keyExtractor={(item,index) => index.toString()}/>
    </View>
  )
}

export default ShowCatalogue;