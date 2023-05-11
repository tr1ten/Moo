import { Avatar, Badge, Button, ListItem,Text } from '@rneui/themed'
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
      source={{ uri: sub?.item?.type?.image }}
    />
    <ListItem.Content>
      <ListItem.Title>
       {sub.item.type?.label}
      </ListItem.Title>
      
      <ListItem.Subtitle>
      <Text style={{fontWeight:"bold"}}> Seller:</Text>  {sub.item.catalogue?.seller.user.name ?? sub.item.catalogue?.seller.user.id}
      </ListItem.Subtitle>
      <ListItem.Subtitle>
      <Text style={{fontWeight:"bold"}}> Qty:</Text>  {sub.quantity}
      </ListItem.Subtitle>
      <ListItem.Subtitle>
      <Text style={{fontWeight:"bold"}}> Paid: </Text>  &#8377;
       {sub.quantity*sub.item.price} 
      </ListItem.Subtitle>
      <ListItem.Subtitle>
      <Badge 
                badgeStyle={{
                  margin:5,
                }}
                status={sub?.status == "active" ? "success" : 
                sub?.status == "pending" ? "warning" : "error"
              }
                value={sub?.status == "active" ? "Active" : 
                sub?.status == "pending" ? "Pending" : "Rejected"
              }
              />
      </ListItem.Subtitle>
    </ListItem.Content>
    {
      sub.status=="active" && <Button
      onPress={()=>onDelete(sub.id)}
      color={"error"}
      title={"Cancel"} />
    }
  </ListItem>

  )
}

export default SubscriptionItem