import { View, Text } from 'react-native'
import React from 'react'
import { Item } from '../services/item'
import { FlatList } from 'react-native-gesture-handler'
import { CatalogItem } from './CatalogItem'
type Props = {
    items:Item[]
}
const ShowCatalogue = ({items}:Props) => {
  return (
    <View>
      <FlatList data={items} renderItem={({item}) => <CatalogItem {...item} />} keyExtractor={(item,index) => index.toString()}/>
    </View>
  )
}

export default ShowCatalogue;