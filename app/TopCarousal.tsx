import React, { useState, useEffect } from "react";
import { View, Image, ImageSourcePropType } from "react-native";
const images: ImageSourcePropType[] = [
  require("../assets/images/img1.jpg"),
  require("../assets/images/img2.jpg"),
  require("../assets/images/cow.jpg"),
];

const Carousel = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((currentImageIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [currentImageIndex]);

  return (
    <>
      {images.map((image, index) => (
        <Image
          key={index}
          source={image}
          style={{
            height: 200,
            width: 400,
            display: index === currentImageIndex ? "flex" : "none",
          }}
        />
      ))}
    </>
  );
};

export default Carousel;

// import React, { useRef } from 'react';
// import { View, Image, StyleSheet, Dimensions, Animated, ImageSourcePropType } from 'react-native';

// const images: ImageSourcePropType[] = [
//   require("../assets/images/img1.jpg"),
//   require("../assets/images/img2.jpg"),
//   require("../assets/images/cow.jpg"),
// ];

// const { width } = Dimensions.get('window');
// const ITEM_WIDTH = width * 0.8;
// const ITEM_SPACING = (width - ITEM_WIDTH) / 2;

// const Carousel = () => {
//   const scrollX = useRef(new Animated.Value(0)).current;

//   return (
//     <View style={styles.container}>
//       <Animated.FlatList
//         horizontal
//         data={images}
//         keyExtractor={(item, index) => index.toString()}
//         renderItem={({ item, index }) => {
//           const inputRange = [
//             (index - 1) * ITEM_WIDTH,
//             index * ITEM_WIDTH,
//             (index + 1) * ITEM_WIDTH,
//           ];

//           const translateX = scrollX.interpolate({
//             inputRange,
//             outputRange: [-ITEM_WIDTH, 0, ITEM_WIDTH],
//           });

//           return (
//             <Animated.View style={{ ...styles.item, transform: [{ translateX }] }}>
//               <Image source={{ uri: item.uri }} style={styles.image} />
//             </Animated.View>
//           );
//         }}
//         showsHorizontalScrollIndicator={false}
//         snapToInterval={ITEM_WIDTH}
//         decelerationRate={0.5}
//         contentContainerStyle={{ paddingHorizontal: ITEM_SPACING }}
//         onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: true })}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   item: {
//     width: ITEM_WIDTH,
//     height: ITEM_WIDTH * 1.5,
//     borderRadius: 16,
//     overflow: 'hidden',
//     marginHorizontal: ITEM_SPACING,
//   },
//   image: {
//     flex: 1,
//   },
// });

// export default Carousel;
