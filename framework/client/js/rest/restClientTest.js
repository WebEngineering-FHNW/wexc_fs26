import { test }          from "../util/test.js";
import { client }        from "./restClient.js";

test("rest")( assert => {
    assert.async("fetch local file", async _ => {
        const todo = await client(window.location.href.replace("app/client/AllTests.html","framework/client/js/rest/testData.json"));
        assert.is(todo['title'], "delectus aut autem");
    })
});
