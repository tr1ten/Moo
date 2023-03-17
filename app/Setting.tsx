import { Text } from '@rneui/themed'
import React from 'react'
import { View } from 'react-native'
import SelectLanguages from '../components/SelectLanguages'
import SelectTheme from '../components/SelectTheme'
import { StyleSheet } from 'react-native'
function Setting() {
  return (
    <View
      style={style.container}
    >
        <SelectLanguages /> 
        <SelectTheme />
    </View>
  )
}

export default Setting

const style = StyleSheet.create({
  container: {
     margin: 10,
     padding: 10,
     gap: 10,
  }
})