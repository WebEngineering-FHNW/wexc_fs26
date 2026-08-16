//

import {DevServiceFactory} from "./devServiceFactory.js";
import {test}              from "../../util/test.js";

const FIRST = /** @type { EntityNameType } */ "first";

const first_entity = [
    {
        id:          "0",
        whatever:    "whatever",
    },
];

const factoryTestDB = {
    [FIRST]: first_entity,
};

const first_meta = /** @type { EntityMetaType } */ {
    table:      FIRST,
    label:      "First",
    properties: [
        { name: "id",           type:"hidden",  label:"ID",            init:"", },
        { name: "whatever",     type:"text",    label:"Displayed As",  init:"change-me", extra: "required"},
    ]
};

const meta = {
    [FIRST]:  "first_meta",
};

/**
 * Constructor that provides all the meta information
 * @return { MetaInfoType }
 */
const Meta = () => {
    return {
        getEntityMeta         : tableName    => meta[tableName],
        getRelationMeta       : relationName => meta[relationName ],
        allEntityNames   :      [FIRST],
        allRelationNames :      [],
    }
};


test("service: factory setup")( assert => {

    /** @type { ServiceFactoryType } */
    const serviceFactory = DevServiceFactory(Meta(), factoryTestDB);

    const entityService = serviceFactory.getEntityService(FIRST);
    assert.notNullish(entityService, "service found");

    assert.async("first service call getAll()", async _ => {
        const allArtists = await entityService.getAll();
        assert.is(allArtists.length, 1, "1 entity at startup");
    })
});
