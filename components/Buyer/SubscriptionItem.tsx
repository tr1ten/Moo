import { Avatar, Badge, Button, ListItem,Text } from '@rneui/themed'
import React from 'react'
import { BuyerSubscription } from '../../app/(menu)/(tabs)/MySubscriptions'
import { deleteSubscription } from '../../services/item'
import { Icon } from '@rneui/base'
import { View } from 'react-native'

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
      <View
            style={
              {
                flexDirection:"row",
                gap:2,
                alignItems:"center"
              }
            }
            >
            <Icon name="account-circle" type="material-community" size={12} />
            <Text>
              
               {sub.item.catalogue?.seller.user.name ?? "Rajesh"}
            </Text>
          </View>
      </ListItem.Subtitle>
      <ListItem.Subtitle>
      <View
            style={
              {
                flexDirection:"row",
                gap:2,
                alignItems:"center"
              }
            }
            >
            <Icon name="shopping" type="material-community" size={12} />
            <Text>
              
               {sub.quantity}
            </Text>
          </View>

      </ListItem.Subtitle>
      <ListItem.Subtitle>
      <View
            style={
              {
                flexDirection:"row",
                gap:2,
                alignItems:"center"
              }
            }
            >
            <Icon name="currency-rupee" type="material-community" size={12} />
            <Text>
            {sub.quantity*sub.item.price} 

            </Text>
          </View>
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