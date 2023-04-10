import React from "react";
import {View, ImageBackground,StyleSheet,Text} from 'react-native'

const Background=({children}:any)=>{
    return(
        <View style={{flex:1,backgroundColor:'#607A00'}}>
            <ImageBackground 
                source={require("../../assets/images/cow.jpg")} 
                style={{
                    width:"100%",
                    height:"50%",
                    position:'absolute',
                    top:0
                }}
                imageStyle={{
                    resizeMode: "cover",
                }}
            />
            <View style={{position:"absolute"}}>
                {children}
            </View>


        </View>
    );
}

const styles=StyleSheet.create({});

export default Background;