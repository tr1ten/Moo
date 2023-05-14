import React, { useState, useEffect } from "react";
import { View, Image, ImageSourcePropType, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

const images: ImageSourcePropType[] = [
  require("../assets/images/Slice1.png"),
  require("../assets/images/Slice2.png"),
  require("../assets/images/Slice3.png"),
];

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "90%",
    height: 200,
    overflow: "hidden",
    flex:1,
    alignSelf:'center',
  },
  image: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    borderRadius:5,
  },
});

const Carousel = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const progress = useSharedValue(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((currentImageIndex + 1) % images.length);
      progress.value = withTiming(1, { duration: 500 });
    }, 6000);

    return () => clearInterval(intervalId);
  }, [currentImageIndex, progress]);

  const imageStyles = images.map((image, index) => {
    const opacity = useSharedValue(index === currentImageIndex ? 1 : 0);
    const animatedStyle = useAnimatedStyle(() => {
      return {
        opacity: opacity.value,
        transform: [{ scale: progress.value }],
      };
    });

    useEffect(() => {
      if (index === currentImageIndex) {
        opacity.value = withTiming(1, { duration: 500 });
      } else {
        opacity.value = withTiming(0, { duration: 500 });
      }
    }, [currentImageIndex, opacity, index]);

    return animatedStyle;
  });

  return (
    <View style={styles.container}>
      {images.map((image, index) => (
        <Animated.Image
          key={index}
          source={image}
          style={[styles.image, imageStyles[index]]}
        />
      ))}
    </View>
  );
};

export default Carousel;
