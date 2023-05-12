import { API_URL } from "../constants/common";
import { fetchAPI } from "./utils";

export function getItemTypes(){
    console.log("here api url", API_URL);
    return fetchAPI(API_URL+"/itemType").then((r)=>r.json()).catch((e)=>{
        console.log("error during fetchAPIing item types",e);
        return null;
    })
}