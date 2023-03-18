import {Text, View} from 'react-native'
import { Stack } from 'expo-router';
import { useSearchParams } from 'expo-router';
import React from 'react';
export default function CustomerLayout(){
        const {name,area,dues}=useSearchParams()
    return (
        <>
        <Stack.Screen options={{title:`${name}`}}></Stack.Screen>
            <View>
                <Text>{name}</Text>
                <Text>{area}</Text>
                <Text>{dues}</Text>
            </View>

        </>
    )
        
}