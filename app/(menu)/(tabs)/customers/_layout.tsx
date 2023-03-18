import { Stack, Tabs } from 'expo-router';
import React from 'react';
export default function CustomerLayout(){
    return (
        <Stack>
            <Stack.Screen name="index"></Stack.Screen>
            <Stack.Screen name="data"></Stack.Screen>
        </Stack>
    )
        
}