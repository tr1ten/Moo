import { BASE_URL } from "../constants/common";

export async function registerUser(id:string,isSeller:boolean){
    const typeId = isSeller ? 1 : 2;
    const user = await fetch(BASE_URL+"/user",{
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
    const catalog = await fetch(BASE_URL+`/user/catalogue?userId=${id}`).then((r)=>r.json()).catch((e)=>{
        console.log("error during fetching catalog",e);
        return null;
    })
    return catalog;
}