import { View } from 'react-native'
import { Text } from '@rneui/themed'
import React from 'react'
import { EvilIcons, FontAwesome } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler'
type Props ={
    title: string,
    onPress: () => void
}
const TabHeader = (props:Props) => {
  return (
    <View
        style={{
            height: 80,
            justifyContent: 'flex-start',
            paddingTop: 20,
            alignItems: 'center',
            flexDirection: 'row',
            borderRadius: 10,
            marginHorizontal: 10,
            marginTop: 10,
            backgroundColor: 'white',
        }}
    >
        <TouchableOpacity
        onPress={props.onPress}    
        >
        <EvilIcons name="navicon" size={24} color="black" />
        </TouchableOpacity>
        <Text
            style={{
                fontSize: 20,
                fontWeight: '500',
                marginLeft: 10,
                
            }}
        >{props.title}</Text>
        
    </View>

  )
}

export default TabHeader