import { User } from "../providers/UserProvider";
import { async } from "@firebase/util";
import { API_URL } from "../constants/common";
import { Seller } from "../components/Buyer/SellerItem";

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
    },
    catalogue?: Catalog
}
export type Catalog = {
    id: number;
    seller: Seller;
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

export function subscribeToItem(quantity: number, itemId: number, userId: string) {
    return fetch(API_URL+"/subscription",{
        method: "post",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(
            {
                quantity,
                itemId,
                userId
            }
        )
    }).then((r)=>r.json()).catch((e)=>{
        console.log("error during subscribing to item",e);
        return null;
    })
}

export function getAllSubscriptions(userId: string) {
    return fetch(API_URL+"/subscription?userId="+userId).then((r)=>r.json()).catch((e)=>{
        console.log("error during getting subscriptions",e);
        return null;
    });
}

export function deleteSubscription(subId: number) {
    return fetch(API_URL+"/subscription/",{
        method: "delete",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({subId})
    }).then((r)=>r.json()).catch((e)=>{
        console.log("error during deleting subscription",e);
        return null;
    });
}