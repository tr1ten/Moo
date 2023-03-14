import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { useState, useEffect } from 'react';
import { Button } from '@rneui/themed';
import { useThemeMode } from '@rneui/themed';
import { useTheme } from '@rneui/themed';
import { Text } from '@rneui/themed';
import { useFCM } from '../../../services/push_notification';
export default function TabTwoScreen() {
  return (
    <View>
      <Text>Hey</Text>
    </View>
  );
}

