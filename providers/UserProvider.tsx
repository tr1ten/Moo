import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
export type User = {
    id: string,
    location: string,
    type: number
    image?: string,
    name?: string,
}

const UserContext = React.createContext<{
    user?:User,
    setUser:(user:User)=>void,
}>(
    {
        user:undefined,
        setUser:()=>{}
    }
);

export function useUser() {
    return React.useContext(UserContext);
}

export function Provider(props:any){
    const [user,setUser] = React.useState<User>();
    useEffect(()=>{
        AsyncStorage.getItem('@user').then((value)=>{
            if(value){
                setUser(JSON.parse(value));
            }
        }).catch((err)=>{
            console.log(err);
        });
    },[]);
    useEffect(()=>{
        if(user){AsyncStorage.setItem('@user',JSON.stringify(user));}
    },
    [user]);
    return (
        <UserContext.Provider
            value={{user,setUser}}>
                {props.children}
            </UserContext.Provider>
    )
}