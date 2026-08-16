
export { ProdMetaService }
/**
 * Generic development implementation of the service that provides the meta information.
 * @type { (url: String) => MetaServiceType }
 */
const ProdMetaService = url =>  {
    // this is only to satisfy the interface and make dev and prod exchangeable
    return { getMeta: () => Promise.resolve(undefined)} // implement with fetch
};
