import React from "react";
import {View,StyleSheet,Text} from 'react-native'
import Background from './Background';
import Btn from "./Btn";

const Home=(props:any)=>{
    return(
        <Background>
            <View style={{marginHorizontal:40,marginVertical:100}}>
                <Text style={{color:'white',fontSize:64}}>Let's start</Text>
                <Text style={{color:'white',fontSize:64,marginBottom:40}}>Coding</Text>
                <Btn bgColor='blue' textColor='white' btnLabel="Login" Press={()=>props.navigation.navigate("sign-in")}/>
                <Btn bgColor='white' textColor='#006A42' btnLabel="SignUp" Press={()=>props.navigation.navigate("sign-in")}/>
            </View>
        </Background>
    );
}

const styles=StyleSheet.create({})

export default Home;