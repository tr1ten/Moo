import { expect } from "chai";
import { addUserItem } from "./item";
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
});