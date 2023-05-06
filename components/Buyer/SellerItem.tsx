import { Dialog } from '@rneui/base';
import { Avatar, Button, Card, ListItem ,Text} from '@rneui/themed'
import React, { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { Icon, Slider } from 'react-native-elements';
import { auth } from '../../firebase/firebaseConfig';
import { subscribeToItem } from '../../services/item';
import { ToastAndroid, View } from 'react-native';
import { StyleSheet } from 'react-native';
import { color } from 'react-native-reanimated';
import { Pressable } from 'react-native';
import { Test } from 'mocha';

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
    id: number;
    type: ItemType;
    capacity: number;
    price: number;
    seller: Seller
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
    <View>
      <View style={style.container}>
          <Avatar
            size={60}
            avatarStyle={{justifyContent:'center'}}
            source={{ uri: item.type?.image }}
          />
        <View style={style.bottom}>
          <View>
            <Text style={style.t1}>
                {item.type?.label}
            </Text>
            <Text style={style.t2}>
              seller {item.seller?.decription ?? "Rajesh"}
            </Text>
            <Text style={style.t3}>
              ₹ {item.price} / kg 
            </Text>  
          </View>    
          <View>
              <Pressable onPress={()=>onToggle()}>
                <View style={style.get}>
                  <Text style={style.t4}>Get now</Text>
                </View>
              </Pressable> 
          </View>  
      </View>
    </View>
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
  </View>
  )
}

const style=StyleSheet.create({
  container:{
    padding:10,
    paddingBottom:15,
    flexDirection:'column',
    backgroundColor:"white",
    borderRadius:20,
    height:150,
    width:150,
    margin:10,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity:  0.17,
    shadowRadius: 3.05,
    elevation: 4,
    justifyContent:'space-between'
    },
  bottom:{
    
    flexDirection:'row',
    alignItems:'flex-end',
    justifyContent:'space-between'
  }
  ,
  t1:{
    fontSize:15,
    fontWeight:'900',
  }
  ,
  t2:{
    fontSize:12,
    color:'grey',
    fontStyle:'italic'
  }
  ,
  t3:{
    fontSize:15,
    color:'green',
    fontStyle:'normal'
  },
  t4:{
    fontWeight:'900',
    fontSize:12,
    color:'white',
    fontStyle:'normal'
  },
  get:{
    alignItems:'center',
    padding:5,
    backgroundColor:'red',
    justifyContent:'center',
    borderRadius:50
  }
})
export default SellerItem