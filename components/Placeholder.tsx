import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Text } from '@rneui/themed';
type Props = {
    title:string
    description?: string
}
const Placeholder = ({  title,description }:Props) => {
  return (
    <View style={styles.container}>
        <Text
            style={
                styles.txt
            }
        >{title }</Text>
        <Text>
            {description}
        </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    aspectRatio: 1,
  },
  txt:{
    fontWeight: "700",
    fontSize: 30
  }
});

export default Placeholder;
