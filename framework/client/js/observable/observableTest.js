import {test}       from "../util/test.js";
import {Observable} from "./observable.js";

test("observable: basics")(assert => {
    const collect = [];
    const obs     = Observable(0);
    assert.is(obs.getValue(), 0, "start value");
    assert.is(collect.length, 0, "collect initial empty");

    obs.setValue(1);
    assert.is(obs.getValue(), 1, "value change");
    assert.is(collect.length, 0, "no notification, yet");

    obs.onChange(newVal => collect.push(newVal));
    assert.is(collect.length, 1, "immediate notification on subscribe");

    obs.setValue(2);
    assert.is(obs.getValue(), 2, "second value change");
    assert.is(collect.length, 2, "staying in sync");
});
