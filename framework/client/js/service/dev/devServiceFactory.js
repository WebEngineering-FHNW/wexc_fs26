import {DevEntityService} from "./devEntityService.js";
import {DevRelationService} from "./devRelationService.js";
import {DevMetaService} from "./devMetaService.js";

export { DevServiceFactory }

/**
 * @return ServiceFactoryType
 */
const DevServiceFactory = (meta, db) => {
    const devEntityService   = DevEntityService(db);
    const devRelationService = DevRelationService(db);
    const devMetaService     = DevMetaService(meta);

    return {
        getEntityService:   tableName    => devEntityService(tableName),
        getRelationService: relationName => devRelationService(relationName),
        getMetaService:     ()           => devMetaService
    };
};
