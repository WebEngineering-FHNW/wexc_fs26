import {dom} from "./dom.js";

export { test, projectTestReport, setTestDebugging }

// {id:,name:,namedFn:}
const allTests = []; // the collection of named functions as assembled by using "test"

const test = name => namedFn => allTests.push( { name, namedFn }); // store for later execution

let testDebugging = false;
const setTestDebugging = val => testDebugging = val;

const TestResultCollector = (resultCollectorCb) => {
    const is = (actual, expected, note="") => {
        const result = { assert: "identical", passed:undefined, message:"", note};
        if (actual !== expected) {
            result.passed = false;
            const message = `actual (${actual}), expected (${expected})`;
            result.message = message;
            console.error("test failed", note, message);
            if (testDebugging) {
                debugger;
            }
        } else {
            result.passed = true;
        }
        resultCollectorCb(result);
        return result.passed;
    };
    const async = (note, callback) => {
        new Promise( resolve => {
            callback()
                .then(resolve)
                .catch( e => {
                    const result = {assert: "async", passed: false, message: e, note};
                    console.error(result, e.name, e.message, e.stack);
                    if (testDebugging) {
                        debugger;
                    }
                    resultCollectorCb(result);
                })
                // currently not needed but might come handy when debugging the test fw for async errors
                // .finally(_ => {
                //     const result = {assert: "lazy", passed: true, message: "tested", note};
                //     resultCollectorCb(result);
                // });
        });
    };
    const notNullish = (obj, note="") => {
        const result = { assert: "not nullish", passed:undefined, message:"", note};
        if (obj === null || obj === undefined) {
            result.passed = false;
            const message = "Obj should not be nullish but was: (" + obj + ")";
            result.message = message;
            console.error("test failed", note, message);
            if (testDebugging) {
                debugger;
            }
        } else {
            result.passed = true;
        }
        resultCollectorCb(result);
        return result.passed;
    };
    return {
        asserts: {notNullish, is, async} ,
    }
};


const execute = (providedTestFn, resultCollectorCb) => {
    const collector = TestResultCollector(resultCollectorCb); // collecting parameter pattern
    providedTestFn(collector.asserts);
};

const TestController = () => {
    const testAddListeners = [];
    const resultAddedListeners = [];
    const namedTestFns = [];

    const onTestAdded   = cb => testAddListeners.push(cb);
    const onResultAdded = cb => resultAddedListeners.push(cb);

    let numberOfAsserts = 0;
    let numberOfFailed  = 0;

    let runningId = 0;  // give named test fns an id for result attachment
    const addTest = (namedTestFn) => {
        namedTestFn= {id:"test"+(runningId++), ...namedTestFn};
        namedTestFns.push(namedTestFn);
        testAddListeners.forEach(cb => cb(namedTestFn));
    };
    const addResult = namedFn => assertionResult => {
        numberOfAsserts++;
        if (assertionResult.passed === false) {
            numberOfFailed++;
        }
        resultAddedListeners.forEach(cb => cb(namedFn, assertionResult));
    };
    const run = () => {
        namedTestFns.forEach( namedFn => {            // test execution
            console.debug("testing",namedFn);
            execute(namedFn.namedFn, addResult(namedFn));
        });
    };
    return {
        run,
        addTest,
        onTestAdded,
        onResultAdded,
        testCount :  () => namedTestFns.length,
        assertCount: () => numberOfAsserts,
        failedCount: () => numberOfFailed,
    }
};

const projectTestReport = () => {
    const testController = TestController();
    const [statisticsEl, namedTestResultsEl] = dom(`
            <div class="statistics">
                <span class="number">0</span><span>Tests     </span>     
                <span class="number">0</span><span>Assertions</span>     
                <span class="number">0</span><span>Failed    </span>     
            </div>
            <div class="namedTestResults">
            </div>    
        `);
    const [testCountEl, assertCountEl, failedCountEl] = statisticsEl.querySelectorAll(".number");

    testController.onTestAdded( namedTest => {
        console.debug("test added", namedTest);
        testCountEl.textContent = String(testController.testCount());
    });

    // caching the result details elements
    const testDetailEls = {}; // id: el

    testController.onTestAdded( namedTest => {
        const [testDetailsEl] = dom(`
                <details>
                    <summary>
                        ${namedTest.name} ( <span class="passCount">0</span> / <span class="assertCount">0</span> )
                    </summary>
                    <div class="namedResult todoPassedFailed">                    
                    </div>
                </details>   
            `);
        testDetailEls[namedTest.id] = testDetailsEl;
        namedTestResultsEl.append(testDetailsEl);
    });

    testController.onResultAdded( (namedTest, assertResult) => {
        const [assertSection] = dom(`
        <div class="test">
            <div>${assertResult.note}</div>
            <div>${assertResult.assert}</div>
            <div>${assertResult.message}</div>
            <div>${assertResult.passed}</div>
        </div>`);
        const testDetailsEl = testDetailEls[namedTest.id];
        const resultDiv     = testDetailsEl.querySelector(".namedResult");
        const passCount     = testDetailsEl.querySelector(".passCount");
        const assertCount   = testDetailsEl.querySelector(".assertCount");

        resultDiv.append(assertSection);
        assertCount.textContent = String(Number(assertCount.textContent)+1); // well, not nice..
        passCount  .textContent = String(Number(passCount  .textContent)+1); // well, not nice..

        if (assertResult.passed === false){
            assertSection.classList.add("failed");
            resultDiv.classList.add("failed");
            testDetailsEl.setAttribute("open","open");
            passCount.textContent = String(Number(passCount  .textContent)-1); // well, not nice..
        }

        assertCountEl.textContent = String(testController.assertCount());
        failedCountEl.textContent = String(testController.failedCount());
    } );

    allTests.forEach( namedTest => testController.addTest(namedTest));

    testController.run();

    return [statisticsEl, namedTestResultsEl];
};
