
export { ProdRelationService }
/**
 * Generic development implementation of the service that manages crud operations on relations.
 * @type { (url: String) => (relationName: RelationNameType) => RelationServiceType }
 */
const ProdRelationService = url => relationName => { // implement with fetch

    const getAll      = () => {
        return Promise.resolve(undefined);
    };
    const getById     = id => {
        return Promise.resolve(undefined );
    };
    const removeById  = id => {
        return Promise.resolve(undefined);
    };
    const add         = entity => {
        return Promise.resolve(undefined);
    };

    return { getAll, getById, removeById, add }
};
