import {assert,expect} from "chai";
import { DUMMY_USER } from "./item.test";
import {fetchSellerCatalog, registerUser} from "./user";
const fakeIdGenerator = () => Math.floor(Math.random() * 1000000).toString();

describe('test services/user', function() {
    it('test registerUser seller', async function() {
        const res = await registerUser(
            fakeIdGenerator()
            ,false);
        expect(res).not.null;

    });
    it('test registerUser buyer', async function() {
        const res = await registerUser(fakeIdGenerator(),true);
        expect(res).not.null;
    });
    it.only('test user catalogue fetch', async function() {
        const catalog = await fetchSellerCatalog(DUMMY_USER);
        expect(catalog).not.null;
    })
})