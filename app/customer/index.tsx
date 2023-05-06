import {Text, View,Image,FlatList} from 'react-native'
import { ListItem } from '@rneui/themed';
import { Stack } from 'expo-router';
import { useSearchParams } from 'expo-router';
import React,{useState} from 'react';
import { StyleSheet } from 'react-native';
import { Avatar } from '@rneui/themed';
import { FlipInEasyX } from 'react-native-reanimated';
import { ListItemContent } from '@rneui/base/dist/ListItem/ListItem.Content';
import { ScreenHeight } from '@rneui/base';
import { ScreenContainer } from 'react-native-screens';
import { ScrollView } from 'react-native-gesture-handler';
export default function CustomerLayout(){
    let arrlst=[
        {
            date:'2023-03-21',
            due:101023
        },
        {
            date:'2023-03-21',
            due:101023
        },
        {
            date:'2023-03-21',
            due:101023
        },
        {
            date:'2023-03-21',
            due:101023
        },
        {
            date:'2023-03-21',
            due:101023
        },
        {
            date:'2023-03-21',
            due:101023
        },
        {
            date:'2023-03-21',
            due:101023
        },
    ]
    const {name,area,dues,image,eggs,milk}=useSearchParams()
    return (
        <View style={{flex:1}}>
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
            <View style={styles.container3}>
                    <View style={{flex:1,flexDirection:"row",alignItems:"baseline"}}>
                        <Avatar
                            size={'medium'}
                            containerStyle={{margin:10}}
                            source={{ uri:`${milk}` }}
                        /> 
                        <Text style={styles.text1}>3</Text>
                    </View>
                    <View style={{flex:1,flexDirection:"row",alignItems:"baseline"}}>
                        <Avatar
                            size={'medium'}
                            containerStyle={{margin:10}}
                            source={{ uri:`${eggs}` }}
                        /> 
                        <Text style={styles.text1}>3</Text>
                    </View>
                     
                
            </View>
            
            <View style={{flex:10}}>
                <View style={styles.container2}>
                    <View style={styles.child}>
                        <Text >Payments History</Text>
                    </View>
                </View>
                <FlatList style={{flex:1}}
                    data={arrlst}
                    renderItem={({item}) =>
                        <History date={item.date} dues={item.due}/>
                    }
                    keyExtractor={(item,i) =>`${i}`}
                />
            </View>
        </View>
    )
    
        
}
type Props = {
    date:string;
    dues:number
}
function History(prop:Props){

    return (
        <ListItem bottomDivider>
            <ListItemContent>
                <ListItem.Title style={styles.text4}>₹ {prop.dues}</ListItem.Title>
                <ListItem.Subtitle style={styles.text1}> {prop.date}</ListItem.Subtitle>
            </ListItemContent>
        </ListItem>
    )
}
const styles=StyleSheet.create({
    container:{
        flex:3,
        color:"white",
        backgroundColor:"white"
        ,borderRadius:10
        ,margin:10
        ,display:"flex"
        ,padding:10
    },
    container2:{

        color:"white",
        backgroundColor:"white"
        ,borderRadius:10
        ,margin:2
        ,display:"flex"
        ,padding:10
    },
    container3:{
        flex:1,
        flexDirection:"row",
        color:"white",
        backgroundColor:"white",
        justifyContent:"space-between",
        alignItems:"center"
        ,borderRadius:5
        ,marginBottom:5
        ,display:"flex"
        ,padding:10,
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
    text3:{
        fontSize:20,
        fontWeight:900,
        marginLeft:10,
        color:"black"
    },
    text4:{
        color:"black"
    },
}
)