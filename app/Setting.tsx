import { Text } from '@rneui/themed'
import React from 'react'
import { View } from 'react-native'
import SelectLanguages from '../components/SelectLanguages'
import SelectTheme from '../components/SelectTheme'

function Setting() {
  return (
    <View
     className='m-4 w-8/12 justify-center text-lg font-bold'
    >
        <SelectLanguages /> 
        <SelectTheme />
    </View>
  )
}

export default Setting