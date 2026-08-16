// example tests for the testing FW

import {test} from "./test.js";

test("test the test: show how failure is reported")(assert => {

    assert.notNullish( null , "null");
    assert.notNullish( undefined , "undefined");

    assert.is(0, 1, "0 !== 1");

    assert.async("async setup with Promise", _ => {
        return Promise.resolve(1)
            . then ( one => assert.is(one, 0, "0 !== 1 promise"));
    });
    assert.async("async setup with async/await", async _ => {
        const one = await Promise.resolve(1);
        assert.is(one, 0, "0 !== 1 async");
    });
    assert.async("async with error", async _ => {
        throw Error("enforced error in test execution");
    });
});

