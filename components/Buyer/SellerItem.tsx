import { Avatar, Button, Card, ListItem ,Text} from '@rneui/themed'
import React from 'react'

export type Seller = {
    location: string;
    decription: string;
}
export type ItemType ={
    id: number;
    label:string;
    description: string;
    image:string;
}
export type Item = {
    id: string;
    type: ItemType;
    capacity: number;
    price: number;
    seller: Seller
}

function SellerItem({item}:{item:Item}) {
  return (
    <ListItem>
    <Avatar
      rounded
      source={{ uri: item.type?.image }}
    />
    <ListItem.Content>
      <ListItem.Title>
       {item.type?.label}
      </ListItem.Title>
      
      <ListItem.Subtitle>
      <Text style={{fontWeight:"bold"}}> Sold By</Text>  {item.seller?.decription ?? "Rajesh"}
      </ListItem.Subtitle>
      <ListItem.Subtitle>
          <Text style={{fontWeight:"bold"}}> Price</Text> ₹ {item.price} / Ltr
      </ListItem.Subtitle>
    </ListItem.Content>
    <Button >Get Now</Button>
  </ListItem>
  )
}

export default SellerItem