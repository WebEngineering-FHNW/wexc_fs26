export { DevRelationService }
/**
 * Generic development implementation of the service that manages crud operations on relations.
 * @type { (db) => (relationName: RelationNameType) => RelationServiceType }
 */
const DevRelationService = db => relationName => {

    const table = db[relationName];
    let lastId = table.length;
    const findEntityIdxById = id => table.findIndex( entity => entity.id === id);

    const getAll      = () => Promise.resolve(table);
    const getById     = id => Promise.resolve(table[findEntityIdxById(id)] );
    const removeById  = id => {
        // todo: RI by cascade
        return Promise.resolve(table.splice(findEntityIdxById(id),1).length === 1);
    };
    const add         = entity => {
        // todo: RI constraints
        // uniqueness where appropriate
        const newEntity = {...entity};
        newEntity.id = String(++lastId);
        table.push(newEntity);
        return Promise.resolve(newEntity);
    };

    return { getAll, getById, removeById, add }
};
