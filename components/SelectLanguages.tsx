import React, { useState } from 'react'
import { View, Text } from 'react-native'
import DropDownPicker, { ValueType } from 'react-native-dropdown-picker';
import  { LANGUAGES,getLanguage,setLanguage,translate} from '../constants/DCSLocalize';
import { StyleSheet } from 'react-native';
import { getLocales } from 'expo-localization';
const SelectLanguages = () => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(
        getLanguage()
    );
    const onChangeLanguage = (value:string | null) => {
        if(value) {
            setLanguage(value);
            setValue(value);
        }
    }
    const [items, setItems] = useState(LANGUAGES);
  
    return (
     <View style={styles.container}>
        <Text
            style={styles.text}
        > {
            translate('common:languageSelector')
        } </Text>
         <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        onChangeValue={onChangeLanguage}
        setValue={setValue}
        setItems={setItems}
      />
     </View>
    );
}
const styles = StyleSheet.create({
    container: {
        margin: 20,
        width: '50%',
        alignItems: 'center',
        flexDirection: 'row',

    },
    text:{
        fontSize: 16,
        fontWeight: '500',
        
    }
})

export default SelectLanguages
