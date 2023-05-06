import { Dialog } from '@rneui/base';
import { Avatar, Button, Card, ListItem ,Text} from '@rneui/themed'
import React, { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { Icon, Slider } from '@rneui/themed';
import { auth } from '../../firebase/firebaseConfig';
import { Catalog, subscribeToItem } from '../../services/item';
import { ToastAndroid } from 'react-native';
import { User } from '../../providers/UserProvider';

export type Seller = User & {
    location: string;
    decription: string;
    userId: string;
    user:User;
};
export type ItemType ={
    id: number;
    label:string;
    description: string;
    image:string;
}
export type Item = {
    id: number;
    type: ItemType;
    capacity: number;
    price: number;
    catalogue: Catalog
}

function SellerItem({item}:{item:Item}) {
  const [visible, setVisible] = useState(false);
  const [user] = useAuthState(auth);
  const onToggle = () => setVisible(!visible);
  const [quantity, setQuantity] = useState(1);
  const onSubmit = async () => {
    // console.log("Subscribing ",item.id, " By ",user?.email);
    if(!user?.email) {return;}
    try{
      await subscribeToItem(quantity,item.id,user?.email);
      ToastAndroid.show('Added Subscription!', ToastAndroid.SHORT); 

    }
    catch(e){
      ToastAndroid.show('Failed to add Subscription...', ToastAndroid.SHORT); 
    }
    finally{
      setVisible(false);
    }
  };
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
      <Text style={{fontWeight:"bold"}}> Sold By</Text>  {item.catalogue?.seller.user?.id}
      </ListItem.Subtitle>
      <ListItem.Subtitle>
          <Text style={{fontWeight:"bold"}}> Price</Text> ₹ {item.price} / Ltr
      </ListItem.Subtitle>
    </ListItem.Content>
    <Button
      onPress={onToggle}
    >Get Now</Button>
    <Dialog
      isVisible={visible}
      onBackdropPress={onToggle}
      overlayStyle={
        {
          backgroundColor: 'white',
        }
      }
    >
      <Dialog.Title title={item.type.label} />
      <Text>
          Quantity : {quantity}
      </Text>
      <Text>
         Approx Cost : {quantity*item.price} Rs
      </Text>
      
      <Slider
        value={quantity}
        onValueChange={setQuantity}
        maximumValue={item.capacity}
        minimumValue={1}
        step={1}
        trackStyle={{ height: 10, backgroundColor: 'transparent' }}
        thumbStyle={{ height: 20, width: 20, backgroundColor: 'transparent' }}
        thumbProps={{
          children: (
            <Icon
              name="favorite"
              // type="font-awesome"
              size={12}
              reverse
              containerStyle={{ bottom: 12, right: 12 }}
              color="red"
            />
          ),
        }}
      />
      <Dialog.Actions>
        <Dialog.Button title={<Text>Confirm</Text>} onPress={onSubmit} />
        <Dialog.Button title={<Text>Cancel</Text>} onPress={onToggle} />
      </Dialog.Actions>

    </Dialog>
  </ListItem>
  )
}


export default SellerItem