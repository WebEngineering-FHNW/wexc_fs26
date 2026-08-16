
export { DevEntityService }

/**
 * Generic development implementation of the service that manages crud operations on entities.
 * @type { <_T_> (db: Object<EntityNameType, Array<_T_>>) => (entityName: EntityNameType) => EntityServiceType<_T_> }
 */
const DevEntityService = db => tableName => {

    const table = db[tableName];
    let lastId = table.length;
    const findEntityIdxById = id => table.findIndex( entity => entity.id === id);

    const getAll      = () => Promise.resolve(table);
    const getById     = id => Promise.resolve(table[findEntityIdxById(id)] );
    const removeById  = id => {
        // todo: RI constraints, cascading delete?
        return Promise.resolve(table.splice(findEntityIdxById(id),1).length === 1);
    };
    const add         = entity => {
        const newEntity = {...entity};
        newEntity.id = String(++lastId);
        table.push(newEntity);
        return Promise.resolve(newEntity);
    };
    const put         = entity => Promise.resolve(entity); // atm nothing to do since we work directly on the instance

    return { getAll, getById, removeById, add, put }
};

