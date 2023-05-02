import { Avatar, Button, ListItem,Text } from '@rneui/themed'
import React from 'react'
import { BuyerSubscription } from '../../app/(menu)/(tabs)/MySubscriptions'
import { deleteSubscription } from '../../services/item'
import { ToastAndroid } from 'react-native'
import { Toast } from 'expo-router/src/views/Toast'

function SubscriptionItem({sub,onDelete}:{sub:BuyerSubscription,onDelete:(arg:number)=>void}) {
    
  return (
    <ListItem>
    <Avatar
      rounded
      source={{ uri: sub.item.type?.image }}
    />
    <ListItem.Content>
      <ListItem.Title>
       {sub.item.type?.label}
      </ListItem.Title>
      
      <ListItem.Subtitle>
      <Text style={{fontWeight:"bold"}}> Seller:</Text>  {sub.item.catalogue?.seller.id ?? "Rajesh"}
      </ListItem.Subtitle>
      <ListItem.Subtitle>
      <Text style={{fontWeight:"bold"}}> Qty:</Text>  {sub.quantity}
      </ListItem.Subtitle>
      <ListItem.Subtitle>
      <Text style={{fontWeight:"bold"}}> Paid: </Text>  {sub.quantity*sub.item.price} Rs/ mo
      </ListItem.Subtitle>
    </ListItem.Content>
    <Button
      onPress={()=>onDelete(sub.id)}
      color={"error"}
    >Cancel</Button>
  </ListItem>

  )
}

export default SubscriptionItem