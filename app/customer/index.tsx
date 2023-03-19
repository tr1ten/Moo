import {Text, View,Image} from 'react-native'
import { Stack } from 'expo-router';
import { useSearchParams } from 'expo-router';
import React from 'react';
import { Calendar } from 'react-native-calendars';
export default function CustomerLayout(){
    const marked = {
        '2023-03-20': { marked: true,},
        '2023-03-19': { selected: true, selectedColor: 'white', selectedTextColor: 'red' },
        '2023-03-18': {
            marked: true,
            selected: true,
            selectedTextColor: 'red',

        }
    }
    const {name,area,dues,image}=useSearchParams()
    return (
        <>
        <Stack.Screen options={{title:`${name}`}}></Stack.Screen>
            <View>
                <Text>{name}</Text>
                <Text>{dues}</Text>
                <Text>{area}</Text>
            </View>

        </>
    )
        
}