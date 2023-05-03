// test common service

import { expect } from "chai";
import { getItemTypes } from "./common";

describe('test services/common', function() {
    it('test getItemTypes', async function() {
        const res = await getItemTypes();
        console.log("recieved item types ",res);
        expect(res).not.null;
    });
});