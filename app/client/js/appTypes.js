/**
 * The application can register its application-specific types here.
 */

export {
    ARTWORK, ARTIST, PROVENANCE, EPOCH, RATING, USER, ROLE, STARS,
    ROLE_USER, ARTIST_ARTWORK, EPOCH_ARTIST, PROVENANCE_ARTWORK,
    STARS_RATING, USER_RATING, ARTWORK_RATING
};


/** @type { EntityNameType } */ const ARTIST     = "artist";
/** @type { EntityNameType } */ const ARTWORK    = "artwork";
/** @type { EntityNameType } */ const PROVENANCE = "provenance";
/** @type { EntityNameType } */ const EPOCH      = "epoch";
/** @type { EntityNameType } */ const RATING     = "rating";
/** @type { EntityNameType } */ const STARS      = "stars";
/** @type { EntityNameType } */ const USER       = "user";
/** @type { EntityNameType } */ const ROLE       = "role";

/** @type { RelationNameType } */ const ROLE_USER          = "role_user";
/** @type { RelationNameType } */ const ARTIST_ARTWORK     = "artist_artwork";
/** @type { RelationNameType } */ const PROVENANCE_ARTWORK = "provenance_artwork";
/** @type { RelationNameType } */ const EPOCH_ARTIST       = "epoch_artist";
/** @type { RelationNameType } */ const STARS_RATING       = "stars_rating";
/** @type { RelationNameType } */ const USER_RATING        = "user_rating";
/** @type { RelationNameType } */ const ARTWORK_RATING     = "artwork_rating";

/**
 * @typedef { "artist" | "artwork" | "provenance" | "epoch" | "rating" | "user"| "role" | "stars" } AppEntityNameType
 */
/**
 * @typedef { "role_user" | "artist_artwork" | "epoch_artist" | "provenance_artwork" |
 *            "stars_rating" | "user_rating" | "artwork_rating" } AppRelationNameType
 */

