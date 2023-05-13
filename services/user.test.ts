import {assert,expect} from "chai";
import { DUMMY_USER } from "./item.test";
import {fetchAPISellerCatalog, getNearbySellerItems, getUser, registerUser} from "./user";
const fakeIdGenerator = () => Math.floor(Math.random() * 1000000).toString();

describe('test services/user', function() {
    it('test registerUser seller', async function() {
        const res = await registerUser(
            fakeIdGenerator()
            ,false,
            "test",
            "test"
            );
        expect(res).not.null;

    });
    it('test registerUser buyer', async function() {
        const res = await registerUser(fakeIdGenerator(),true,
        "test",
        "test"
        );
        expect(res).not.null;
    });
    it('test user catalogue fetchAPI', async function() {
        const catalog = await fetchAPISellerCatalog(DUMMY_USER);
        expect(catalog).not.null;
    })
    it('test fetchAPIing sellers', async () => {
        const sellers = await getNearbySellerItems('1');
        console.log(sellers);
        expect(sellers).not.null;
    });
    it('test user info',async ()=>{
        const user= await getUser('1');
        console.log(user,user?.type?.id);
        expect(user).not.null;
    })
})
