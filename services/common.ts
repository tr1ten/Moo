import { BASE_URL } from "../constants/common";

export function getItemTypes(){
    return fetch(BASE_URL+"/itemType").then((r)=>r.json()).catch((e)=>{
        console.log("error during fetching item types",e);
        return null;
    })
}