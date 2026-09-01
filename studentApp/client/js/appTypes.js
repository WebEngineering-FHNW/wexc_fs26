/**
 * The application can register its application-specific types here.
 */

export {
    USER,
    STUDENT,
    MODULE,
    STUDENT_MODULE
};

/** @type { EntityNameType } */ const USER       = "user";
/** @type { EntityNameType } */ const STUDENT       = "student";
/** @type { EntityNameType } */ const MODULE       = "module";

/** @type { RelationNameType } */ const STUDENT_MODULE          = "student_module";


/**
 * @typedef { "student" | "user"| "module" } AppEntityNameType
 */
/**
 * @typedef { "student_module"  } AppRelationNameType
 */

