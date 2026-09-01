import {USER} from "./appTypes.js";

export {
    PSEUDO_URL, AVATAR_URL, CSS_CLASSNAME_SELECTED,
    ROLE_GUEST, ROLE_AUTH, ROLE_ADMIN,
    ROLES,
    USER_TABLE_NAME
}

const PSEUDO_URL = "https://_";

const AVATAR_URL = "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png";

const CSS_CLASSNAME_SELECTED = "selected";


// we need to configure entry points for the authorization logic

/**
 * @typedef { "GUEST" | "AUTH" | "ADMIN" } RoleType
 */


/** @type { RoleType } */ const ROLE_GUEST = "GUEST";
/** @type { RoleType } */ const ROLE_AUTH  = "AUTH";
/** @type { RoleType } */ const ROLE_ADMIN = "ADMIN";

/** @type { Array<RoleType> } */
const ROLES = [ROLE_GUEST, ROLE_AUTH, ROLE_ADMIN];

const USER_TABLE_NAME = USER;
