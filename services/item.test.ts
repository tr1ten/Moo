import { expect } from "chai";
import { deleteUser } from "firebase/auth";
import {deleteUserItem, itemInfo } from "./item";
import { addUserItem, deleteSubscription, getAllSubscriptions, subscribeToItem } from "./item";
export const DUMMY_USER = "a@g.com"
describe('test services/item', function() {
    it('test addItem', async function() {
        const res = await addUserItem(
            {
                price: 100,
                capacity: 100,
                itemTypeId: 1,
            },
            DUMMY_USER
        );
        expect(res).not.null;
    });
    it('test deleteItem', async function() {
        const res = await addUserItem(
            {
                price: 100,
                capacity: 100,
                itemTypeId: 1,
            },
            DUMMY_USER
        );
        expect(res).not.null;
        console.log("item ",res);
        deleteUserItem(res.item.id);
    });
    it('test itemInfo',async function(){
        const res = await addUserItem(
            {
                price: 100,
                capacity: 100,
                itemTypeId: 1,
            },
            DUMMY_USER
        );
        expect(res).not.null;
        const item = await itemInfo(res.item.id);
        expect(item).not.null;
    })

    it('add subscription', async function() {
        const res = await subscribeToItem(1,1,"by2@b.com")
        console.log("res",res);
        expect(res).not.null;
    });
    it('get subscriptions', async function() {
        const res = await getAllSubscriptions("by2@b.com");
        console.log("res",res);
        expect(res).not.null;
    });
    it('delete subscription', async function() {
        const res = await deleteSubscription(5);
        console.log("res",res);
        expect(res).not.null;
    });
});
