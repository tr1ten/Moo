import { API_URL } from "../constants/common";

export async function registerUser(id:string,isSeller:boolean){
    const typeId = isSeller ? 1 : 2;
    const user = await fetch(API_URL+"/user",{
        method: "post",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            typeId,
            id
        })
    }).then((r)=>r.json()).catch((e)=>{
        console.log("error during registering",e);
        return null;
    })
    return user;
}

export async function fetchSellerCatalog(id:string){
    const catalog = await fetch(API_URL+`/user/catalogue?userId=${id}`).then((r)=>r.json()).catch((e)=>{
        console.log("error during fetching catalog",e);
        return null;
    })
    return catalog;
}

export async function getNearbySellerItems(userId:string){
    const sellers = await fetch(API_URL+`/seller/nearby?userId=${userId}`).then((r)=>r.json()).catch((e)=>{});
    return sellers;
}

export async function getUser(userId:string) {
    const user = await fetch(API_URL+`/user?userId=${userId}`).then((r)=>r.ok && r.json()).catch((e)=>console.log("error while getting user",e));
    return user;
}