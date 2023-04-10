import {Text, View,Image} from 'react-native'
import { Stack } from 'expo-router';
import { useSearchParams } from 'expo-router';
import React,{useState} from 'react';
import { StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Dialog } from '@rneui/themed';
import { Avatar } from 'react-native-elements';
export default function CustomerLayout(){
    const marked = {
        '2023-03-20': { marked: true,},
        '2023-03-1': { selected: true, selectedColor: 'white', selectedTextColor: 'red' },
        '2023-03-18': {
            marked: true,
            selected: true,
            selectedTextColor: 'green',

        }
    }
    const currdate=getcurrdate()
    function getcurrdate(){
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = today.getFullYear();
        const curr = yyyy + '-' + mm + '-' + dd
        return curr
    }
    const[popup,vis]=useState(true)
    const[markedates,changemdates]=useState(marked)
    console.log(markedates)
    const {name,area,dues,image}=useSearchParams()
    return (
        <>
        <Stack.Screen options={{title:`${name}`}}></Stack.Screen>
            <View style={styles.container}>
            <Avatar
            size={'medium'}
            containerStyle={{margin:10}}
          source={{ uri:`${image}` }}
        />
                <View style={styles.child}>
                    <Text style={styles.text1}>DUES</Text>
                    <Text style={styles.text2}>{dues}</Text>
                </View>
                <View style={styles.child}>
                    <Text style={styles.text1}>AREA</Text>
                    <Text style={styles.text2}>{area}</Text>
                </View>
            </View>
            <Dialog isVisible={popup}
                onBackdropPress={()=>vis(false)}
            >
                <Dialog.Title title="Dis you delivered today's milk"/>
                <Dialog.Button title="YES" onPress={()=>{
                   
                    vis(false)
                }}/>
                <Dialog.Button title="NO" onPress={()=>vis(false)}/>
            </Dialog>
            <Calendar
            initialDate="2023-3-1"
            disableAllTouchEventsForDisabledDays={true}
            markedDates={markedates}
            />

        </>
    )
    
        
}
const styles=StyleSheet.create({
    container:{
        color:"white",
        backgroundColor:"white"
        ,borderRadius:10
        ,margin:10
        ,display:"flex"
        ,padding:10
    },
    child:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"flex-start"
    },
    text1:{
        color:"grey"
    },
    text2:{
        marginLeft:10,
        color:"black"
    },
}
)