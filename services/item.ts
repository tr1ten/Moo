import { User } from "../providers/UserProvider";
import { async } from "@firebase/util";
import { API_URL } from "../constants/common";
import { Item, Seller } from "../components/Buyer/SellerItem";
import { fetchAPI } from "./utils";

export type Catalog = {
    id: number;
    seller: Seller;
    items: Item[];
}

export function addUserItem(item:Item,userId:string){
    return fetchAPI(API_URL+"/item",{
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
    return fetchAPI(API_URL+"/item/delete",{
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
    return fetchAPI(API_URL+"/item?itemId="+itemId).then((res)=>res.json()).catch(()=>null);
}

export function subscribeToItem(quantity: number, itemId: string, userId: string) {
    return fetchAPI(API_URL+"/subscription",{
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
    return fetchAPI(API_URL+"/subscription?userId="+userId).then((r)=>r.json()).catch((e)=>{
        console.log("error during getting subscriptions",e);
        return null;
    });
}

export function deleteSubscription(subId: number) {
    return fetchAPI(API_URL+"/subscription/",{
        method: "delete",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({subId})
    }).then((r)=>r.json()).catch((e)=>{
        console.log("error during deleting subscription",e);
        return null;
    });
}

export enum SubscriptionStatus {
    PENDING = "pending",
    ACTIVE = "active",
    CANCELLED = "cancelled",
}
export function changeSubscriptionStatus(id:string,status:SubscriptionStatus){
    return fetchAPI(API_URL+"/subscription/status",{
        method: "post",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({id,status})
    }).then((r)=>r.json()).catch((e)=>{
        console.log("error during changing subscription status",e);
        return null;
    });
}

export function changeRating(itemId:string,userId:string,rating:number){
    return fetchAPI(API_URL+"/rating",{
        method: "post",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({itemId,userId,rating})
    }).then((r)=>r.json()).catch((e)=>{
        console.log("error while updating rating ",e);
        return null;
    })
}