import { BASE_URL } from "../constants/common";
import { User } from "../providers/UserProvider";

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
    },
    catalogue?: Catalog
}
export type Catalog = {
    id: number;
    seller: User;
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

export function subscribeToItem(quantity: number, itemId: number, userId: string) {
    return fetch(BASE_URL+"/subscription",{
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
    return fetch(BASE_URL+"/subscription?userId="+userId).then((r)=>r.json()).catch((e)=>{
        console.log("error during getting subscriptions",e);
        return null;
    });
}

export function deleteSubscription(subId: number) {
    return fetch(BASE_URL+"/subscription/",{
        method: "delete",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({subId})
    }).then((r)=>r.json()).catch((e)=>{
        console.log("error during deleting subscription",e);
        return null;
    });
}