import {
    MODULE,
    STUDENT, STUDENT_MODULE,
    USER,
} from "./appTypes.js";
import {MANY_TO_MANY, ONE_TO_MANY} from "../../../framework/client/js/types.js";

export {
    Meta,
    PSEUDO_URL,
};

const PSEUDO_URL = "https://_";


const user_meta = /** @type { EntityMetaType } */ {
    table:      USER,
    label:      "User",
    properties: [
        { name: "id",           type:"hidden",  label:"ID",            init:"", },
        { name: "displayedAs",  type:"text",    label:"Displayed As",  init:"change", extra: "required"},
    ]
};
const student_meta = /** @type { EntityMetaType } */ {
    table:      STUDENT,
    label:      "Student",
    properties: [
        { name: "id",           type:"hidden",  label:"ID",            init:"", },
        { name: "displayedAs",  type:"text",    label:"Displayed As",  init:"change", extra: "required"},
        { name: "firstname",    type:"text",    label:"First Name",    init:"change", },
        { name: "lastname",     type:"text",    label:"Last Name",     init:"change", },
        { name: "pictureUrl",   type:"text",     label:"Picture URL",   init:PSEUDO_URL, },
    ]
};
const module_meta = /** @type { EntityMetaType } */ {
    table:      MODULE,
    label:      "Module",
    properties: [
        { name: "id",           type:"hidden",  label:"ID",            init:"", },
        { name: "displayedAs",  type:"text",    label:"Displayed As",  init:"change", extra: "required"},
        { name: "pictureUrl",   type:"text",    abel:"Picture URL",   init:PSEUDO_URL, },
    ]
};

const student_module_meta = /** @type { RelationMetaType } */ {
    relationId:  STUDENT_MODULE,
    cardinality: MANY_TO_MANY,
    oneLabel:    "Students in this module",
    manyLabel:   "Module",
    oneTable:    STUDENT,
    manyTable:   MODULE,
    oneFK:       "studentId",
    manyFK:      "moduleId"
};

const meta = /** @type { Object<EntityNameType, EntityMetaType | RelationMetaType> } */ {

    [USER]:    user_meta,
    [STUDENT]: student_meta,
    [MODULE]:  module_meta,

    [STUDENT_MODULE]: student_module_meta,

};

/**
 * Constructor that provides all the meta information
 * @return { MetaInfoType }
 */
const Meta = () => {
    return {
        getEntityMeta         : tableName    => meta[tableName],
        getRelationMeta       : relationName => meta[relationName ],
        allEntityNames   :      [STUDENT, MODULE, USER ],
        allRelationNames :      [ STUDENT_MODULE ],
    }
};

