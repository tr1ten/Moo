import { Text } from '@rneui/themed'
import React from 'react'
import { View } from 'react-native'
import SelectLanguages from '../components/SelectLanguages'
import SelectTheme from '../components/SelectTheme'

function Setting() {
  return (
    <View
    >
        <SelectLanguages /> 
        <SelectTheme />
    </View>
  )
}

export default Setting