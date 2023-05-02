import { async } from "@firebase/util";
import { API_URL } from "../constants/common";

export type Item = {
    price: number;
    id?: string;
    capacity: number;
    itemTypeId : number;
    type?: {
        id: number;
        name: string;
        description: string;
        label: string;
        image: string;
    }
}
export type Catalog = {
    id: number;
    items: Item[];
}

export function addUserItem(item:Item,userId:string){
    return fetch(API_URL+"/item",{
        method: "post",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(
            {
                ...item,
                userId
            }
        )
    }).then((r)=>r.json()).catch((e)=>{
        console.log("error during adding item",e);
        return null;
    })
}

export function deleteUserItem(itemId:string){
    return fetch(API_URL+"/item/delete",{
        method: "post",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            itemId
        })

    }).then((r)=>r.json()).catch((e)=>{
        console.log("error during deleting item",e);
        return null;
    })
}

export async function itemInfo(itemId:string):Promise<Item>{
    return fetch(API_URL+"/item?itemId="+itemId).then((res)=>res.json()).catch(()=>null);
}