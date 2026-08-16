export { RelationController }

// todo dk: consider name RelationController
const RelationController = (workbenchController) => {

    const relationsById = (relationTable, key, id ) =>
        relationTable.filter( relation => relation[key] === id);

    const removeByIndex = (relationTable, index) => {
        if (index < 0) {
            console.error("cannot remove relation with index < 0");
            return;
        }
        relationTable.splice(index, 1);                     // todo dk: connect with relation service and handle errors
    };

    const relationIndexByPair = (relationTable, key, id, otherKey, otherId) => {
        return relationTable.findIndex( relationRow =>
                               relationRow[key]        === id
                            && relationRow[otherKey]   === otherId
        );
    };

    const removeAllById = (relationTable, key, id ) => {    // todo dk: might need transaction support
        [...relationTable].forEach( (relation, index) => {  // iterate over copy when removing on the go
            if(relation[key] === id) {
                removeByIndex(relationTable, index);
            }
        });
    };

    const addRelation = (rel_meta, relationTable, data) => { // todo dk: add via relation service
        relationTable.push({id: "_", ...data });
    } ;

    return {
        addRelation,
        relationsById,
        removeAllById,
        relationIndexByPair,
        removeByIndex, // at least for testing
    }
};
