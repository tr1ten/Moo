import {assert,expect} from "chai";
import {registerUser} from "./user";
describe('test services/user', function() {
    it('test registerUser seller', async function(done) {
        const res = await registerUser(
            "1000"
            ,false);
        expect(res).not.null;
        done()

    });
    it('test registerUser buyer', async function(done) {
        const res = await registerUser("10001",true);
        expect(res).not.null;
    });
    
})