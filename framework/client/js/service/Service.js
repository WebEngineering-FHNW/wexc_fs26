
/**
 * Promises are rejected if request cannot be fulfilled, which is different from e.g. not finding a DTO.
 * @typedef EntityServiceType
 * @template _T_
 * @property { ()            => Promise<Array<_T_>> }     getAll
 * @property { (id: String)  => Promise<_T_|undefined> }  getById
 * @property { (id: String)  => Promise<Boolean> }        removeById - returns success
 * @property { (dto: _T_)    => Promise<_T_> }            add        - returns new dto with updated ID
 * @property { (dto: _T_)    => Promise<_T_> }            put        - returns updated dto
 */

/**
 * Promises are rejected if request cannot be fulfilled, which is different from e.g. not finding a DTO.
 * @typedef RelationServiceType
 * @template _T_
 * @property { ()            => Promise<Array<_T_>> }     getAll
 * @property { (id: String)  => Promise<_T_|undefined> }  getById
 * @property { (id: String)  => Promise<Boolean> }        removeById - has to check for referential integrity
 * @property { (dto: _T_)    => Promise<_T_> }            add        - has to check for referential integrity
 */

/**
 * For Services that return the meta information about this app
 * @typedef MetaServiceType
 * @property { ()            => Promise<MetaInfoType> }   getMeta
 */

/**
 * Hub of the Abstract Factory Pattern.
 * Used to switch between local and remote services.
 * @typedef ServiceFactoryType
 * @property { (EntityNameType)    => EntityServiceType   } getEntityService
 * @property { (RelationNameType)  => RelationServiceType } getRelationService
 * @property { ()                  => MetaServiceType     } getMetaService
 */

