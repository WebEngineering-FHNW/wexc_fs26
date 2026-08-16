// example tests for the testing FW

import {test} from "./test.js";

test("example tests: show various asserts")(assert => {

    assert.notNullish( "a not null obj" , "a non-empty string");

    assert.is(0, 0, "identical zeros");

    assert.async("async setup with async/await", async _ => {
        const one = await Promise.resolve(1);
        assert.is(one, 1, "one is one");
    })
});

