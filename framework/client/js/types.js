export { ONE_TO_MANY, MANY_TO_MANY }

/**
 * Type alias to allow app-specific customization
 * @typedef { AppEntityNameType } EntityNameType
 */
/**
 * Type alias to allow app-specific customization
 * @typedef { AppRelationNameType } RelationNameType
 */

/**
 * For each property of an entity
 * @typedef EntityMetaPropertyType
 * @property { String } name                               - must match the property names in the respective DTO
 * @property { "hidden" | "text" | "date" | "url" } type   - for smart projectors
 * @property { String } label                              - for display
 * @property { String } init                               - for create view init
 * @property { String? } extra                             - optional additional information
 */
/**
 * @typedef EntityMetaType
 * @property { String } table                              - for connection to the services
 * @property { String } label                              - for display
 * @property { Array<EntityMetaPropertyType>} properties   - the beef
 */

const ONE_TO_MANY  = "oneToMany";
const MANY_TO_MANY = "manyToMany";
/**
 * @typedef { "oneToMany" | "manyToMany" } CardinalityType
 */

/**
 * @typedef RelationMetaType
 * @property { String }  relationId    - unique id to identify the relation
 * @property { CardinalityType } cardinality - in case of manyToMany, "one" refers to the owner side
 * @property { String }  oneLabel      - for display on the "many" side
 * @property { String }  manyLabel     - for display on the "one" side
 * @property { String }  oneTable      - name of the table that holds the "one" side of the many-to-one relation
 * @property { String }  manyTable     - name of the many table
 * @property { String }  oneFK         - name of the foreign key on the "one" side
 * @property { String }  manyFK        - name of the foreign key on the "many" side
 */

/**
 * Providing the meta information
 * @typedef MetaInfoType
 * @property { Array<EntityNameType> }                   allEntityNames
 * @property { Array<RelationNameType> }                 allRelationNames
 * @property { (EntityNameType)     => EntityMetaType }  getEntityMeta
 * @property { (RelationNameType)   => RelationMetaType} getRelationMeta
 */
