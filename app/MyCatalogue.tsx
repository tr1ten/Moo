import { View, Text } from 'react-native'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebase/firebaseConfig';

const MyCatalogue = () => {
    const [user] = useAuthState(auth);
    return (
    <View>
      <Text>MyCatalogue</Text>
    </View>
  )
}

export default MyCatalogue