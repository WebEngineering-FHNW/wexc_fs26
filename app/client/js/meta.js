import {
    ARTIST,
    ARTIST_ARTWORK,
    ARTWORK, ARTWORK_RATING,
    EPOCH,
    EPOCH_ARTIST,
    PROVENANCE, PROVENANCE_ARTWORK,
    RATING,
    ROLE,
    ROLE_USER, STARS, STARS_RATING,
    USER, USER_RATING
} from "./appTypes.js";
import {MANY_TO_MANY, ONE_TO_MANY} from "../../../framework/client/js/types.js";

export {
    Meta,
    PSEUDO_URL,
};

const PSEUDO_URL = "https://_";


const artist_meta = /** @type { EntityMetaType } */ {
    table:      ARTIST,
    label:      "Artist",
    properties: [
        { name: "id",           type:"hidden",  label:"ID",            init:"", },
        { name: "displayedAs",  type:"text",    label:"Displayed As",  init:"change-me", extra: "required"},
        { name: "fullName",     type:"text",    label:"Full Name",     init:"",          },
        { name: "birthDate",    type:"date",    label:"Date of Birth", init:"", },
        { name: "deathDate",    type:"date",    label:"Date of Death", init:"", },
        { name: "bioUrl",       type:"url",     label:"Biography URL", init:PSEUDO_URL, },
        { name: "pictureUrl",   type:"url",     label:"Portrait URL",  init:PSEUDO_URL, },
    ]
};
const artwork_meta = /** @type { EntityMetaType } */ {
    table:      ARTWORK,
    label:      "Artwork",
    properties: [
        { name: "id",           type:"hidden",  label:"ID",            init:"", },
        { name: "displayedAs",  type:"text",    label:"Displayed As",  init:"change", extra: "required"},
        { name: "material",     type:"text",    label:"Material",      init:"",       },
        { name: "pictureUrl",   type:"url",     label:"Picture URL",   init:PSEUDO_URL, },
    ]
};
const provenance_meta = /** @type { EntityMetaType } */ {
    table:      PROVENANCE,
    label:      "Provenance",
    properties: [
        { name: "id",           type:"hidden",  label:"ID",            init:"", },
        { name: "displayedAs",  type:"text",    label:"Displayed As",  init:"change", extra: "required"},
    ]
};
const epoch_meta = /** @type { EntityMetaType } */ {
    table:      EPOCH,
    label:      "Epoch",
    properties: [
        { name: "id",           type:"hidden",  label:"ID",            init:"", },
        { name: "displayedAs",  type:"text",    label:"Displayed As",  init:"change", extra: "required"},
    ]
};
const rating_meta = /** @type { EntityMetaType } */ {
    table:      RATING,
    label:      "Rating",
    properties: [
        { name: "id",           type:"hidden",  label:"ID",            init:"", },
        { name: "displayedAs",  type:"text",    label:"Displayed As",  init:"change", extra: "required"},
    ]
};
const stars_meta = /** @type { EntityMetaType } */ {
    table:      STARS,
    label:      "Stars",
    properties: [
        { name: "id",           type:"hidden",  label:"ID",            init:"", },
        { name: "displayedAs",  type:"text",    label:"Displayed As",  init:"change", extra: "required"},
    ]
};
const user_meta = /** @type { EntityMetaType } */ {
    table:      USER,
    label:      "User",
    properties: [
        { name: "id",           type:"hidden",  label:"ID",            init:"", },
        { name: "displayedAs",  type:"text",    label:"Displayed As",  init:"change", extra: "required"},
    ]
};
const role_meta = /** @type { EntityMetaType } */ {
    table:      ROLE,
    label:      "Role",
    properties: [
        { name: "id",           type:"hidden",  label:"ID",            init:"", },
        { name: "displayedAs",  type:"hidden",  label:"Displayed As",  init:"", extra: "disabled"},
    ]
};

const role_user_meta = /** @type { RelationMetaType } */ {
    relationId:  ROLE_USER,
    cardinality: ONE_TO_MANY, // for the time being, we model users as having exactly one role
    oneLabel:    "Users for Role",
    manyLabel:   "Role", // todo: we might want to infer this from the oneTable.label
    oneTable:    ROLE,
    manyTable:   USER,
    oneFK:       "roleId",
    manyFK:      "userId"
};

const artist_artwork_meta = /** @type { RelationMetaType } */ {
    relationId:  ARTIST_ARTWORK,
    cardinality: ONE_TO_MANY, // for the moment, we model artworks as being assigned to exactly one Artist
    oneLabel:    "Artist's Artworks",
    manyLabel:   "Artist",
    oneTable:    ARTIST,
    manyTable:   ARTWORK,
    oneFK:       "artistId",
    manyFK:      "artworkId"
};

const provenance_artwork_meta = /** @type { RelationMetaType } */ {
    relationId:  PROVENANCE_ARTWORK,
    cardinality: ONE_TO_MANY,
    oneLabel:    "Artworks of this Provenance",
    manyLabel:   "Provenance",
    oneTable:    PROVENANCE,
    manyTable:   ARTWORK,
    oneFK:       "provenanceId",
    manyFK:      "artworkId"
};

const epoch_artist_meta = /** @type { RelationMetaType } */ {
    relationId:  EPOCH_ARTIST,
    cardinality: MANY_TO_MANY, // an artist can belong to more than one epoch, epochs have many artists
    oneLabel:    "Epoch's Artists",
    manyLabel:   "Artist's Epochs",
    oneTable:    EPOCH,
    manyTable:   ARTIST,
    oneFK:       "epochId",
    manyFK:      "artistId"
};


const artwork_rating_meta = /** @type { RelationMetaType } */ {
    relationId:  ARTWORK_RATING,
    cardinality: ONE_TO_MANY, // for the moment, we model artworks as being assigned to exactly one Artist
    oneLabel:    "Artwork's Ratings",
    manyLabel:   "Artwork",
    oneTable:    ARTWORK,
    manyTable:   RATING,
    oneFK:       "artworkId",
    manyFK:      "ratingId"
};
const stars_rating_meta = /** @type { RelationMetaType } */ {
    relationId:  STARS_RATING,
    cardinality: ONE_TO_MANY,
    oneLabel:    "Starred Ratings",
    manyLabel:   "Stars",
    oneTable:    STARS,
    manyTable:   RATING,
    oneFK:       "starsId",
    manyFK:      "ratingId"
};
const user_rating_meta = /** @type { RelationMetaType } */ {
    relationId:  USER_RATING,
    cardinality: ONE_TO_MANY,
    oneLabel:    "User's Ratings",
    manyLabel:   "User",
    oneTable:    USER,
    manyTable:   RATING,
    oneFK:       "userId",
    manyFK:      "ratingId"
};


const meta = /** @type { Object<EntityNameType, EntityMetaType | RelationMetaType> } */ {
    [ARTIST]:     artist_meta,
    [ARTWORK]:    artwork_meta,
    [PROVENANCE]: provenance_meta,
    [EPOCH]:      epoch_meta,
    [RATING]:     rating_meta,
    [STARS]:      stars_meta,
    [USER]:       user_meta,
    [ROLE]:       role_meta,

    [ROLE_USER]:          role_user_meta,
    [ARTIST_ARTWORK]:     artist_artwork_meta,
    [PROVENANCE_ARTWORK]: provenance_artwork_meta,
    [EPOCH_ARTIST]:       epoch_artist_meta,
    [ARTWORK_RATING]:     artwork_rating_meta,
    [STARS_RATING]:       stars_rating_meta,
    [USER_RATING]:        user_rating_meta,
};

/**
 * Constructor that provides all the meta information
 * @return { MetaInfoType }
 */
const Meta = () => {
    return {
        getEntityMeta         : tableName    => meta[tableName],
        getRelationMeta       : relationName => meta[relationName ],
        allEntityNames   :      [ARTIST, ARTWORK, PROVENANCE, EPOCH, USER, ROLE, RATING, STARS],
        allRelationNames :      [ARTIST_ARTWORK, PROVENANCE_ARTWORK, EPOCH_ARTIST, ROLE_USER,
                                 ARTWORK_RATING, STARS_RATING, USER_RATING],
    }
};

