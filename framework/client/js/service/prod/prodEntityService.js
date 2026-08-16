import {client} from "../../rest/restClient.js";

export { ProdEntityService }

/**
 * Generic production implementation of the service that manages crud operations on entities.
 * @type { (url: String) => (entityName: EntityNameType) => EntityServiceType }
 */
const ProdEntityService = url => entityName => {

    const getAll     = () => {
        const fetchUrl = url + "/" + entityName + "s"; // REST convention: plural "s"
        return /** @type { Promise<Array<*>> } */ client(fetchUrl);
    };
    const getById    = id => {
            const fetchUrl = url + "/" + entityName + "/" + id;
            return client(fetchUrl);
        };
    const removeById = id => Promise.resolve(false);      // todo: implement via fetch
    const add        = entity => Promise.resolve(entity);
    const put        = entity => Promise.resolve(entity);

    return { getAll, getById, removeById, add, put }
};
