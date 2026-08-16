import {ProdEntityService}   from "./prodEntityService.js";
import {ProdRelationService} from "./prodRelationService.js";
import {ProdMetaService} from "./prodMetaService.js";

export { ProdServiceFactory }

/**
 * Factory for the production (remote) services
 * @return ServiceFactoryType
 */
const ProdServiceFactory = url => {
    const prodEntityService   = ProdEntityService(url);
    const prodRelationService = ProdRelationService(url);
    const prodMetaService     = ProdMetaService(url);
    return {
        getEntityService:   tableName    => prodEntityService(tableName),
        getRelationService: relationName => prodRelationService(relationName),
        getMetaService:     ()           => prodMetaService
    }
};
