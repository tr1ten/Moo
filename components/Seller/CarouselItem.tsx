import React from 'react'
import { View } from 'react-native';
import { Image,Badge,Text } from '@rneui/themed';
import { StyleSheet } from '@bacons/react-views';
type Props = {
    title?: string,
    image?: string,
    capacity: number
}
function CarouselItem({title,image,capacity}:Props) {
    return (
      <View style={{ marginRight: 20 }}>
        <View style={styles.img}>
          <View>
            <Text
              style={{
                paddingBottom: 5,
                paddingRight: 10,
                fontWeight: "700",
                color: "#ced6d6",
                fontSize: 15,
              }}
            >
              {title}
            </Text>
            <Badge
              value={capacity}
              badgeStyle={{
                padding: 2,
                borderColor: "#4B6385",
                backgroundColor: "#268dc2"
              }} />
          </View>
          <View>
            <Image
              source={{
                uri: image
              }}
              resizeMode="cover"
              style={{ height: 50, width: 50 }} />
          </View>
  
        </View>
      </View>
    );
  }
  
  

  const styles = StyleSheet.create({
    img: {
      width: 160,
      height: 70,
      borderRadius: 10,
      backgroundColor: "#4B6385",
      fontWeight: "700",
      color: "#ced6d6",
      flexDirection: "row",
      justifyContent:"center",
      alignItems:'center'
    },
    title: {
      marginTop: 10,
      fontSize: 18,
      fontWeight: "bold",
    },
  });
  
export default CarouselItem