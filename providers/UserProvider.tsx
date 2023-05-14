import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
type UserType = {
    id: number,
    label: string,
}
export type User = {
    id: string,
    location: string,
    type: UserType,
    image?: string,
    name?: string,
    bio: string,
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
    const setUserAsync = (user:User)=>{
        setUser(user);
        if(user){AsyncStorage.setItem('@user',JSON.stringify(user));}
    }
    return (
        <UserContext.Provider
            value={{user,setUser:setUserAsync}}>
                {props.children}
            </UserContext.Provider>
    )
}