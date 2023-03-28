import { expect } from "chai";
import { deleteUser } from "firebase/auth";
import { addUserItem, deleteUserItem } from "./item";
export const DUMMY_USER = "a@g.com"
describe('test services/item', function() {
    it('test addItem', async function() {
        const res = await addUserItem(
            {
                price: 100,
                capacity: 100,
                itemTypeId: 1
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
                itemTypeId: 1
            },
            DUMMY_USER
        );
        expect(res).not.null;
        console.log("item ",res);
        deleteUserItem(res.item.id);
    });

});