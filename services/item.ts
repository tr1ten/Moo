import { BASE_URL } from "../constants/common";

export type Item = {
    price: number;
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
    return fetch(BASE_URL+"/item",{
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