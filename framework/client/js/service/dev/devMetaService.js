export { DevMetaService }
/**
 * Generic development implementation of the service that provides the meta information.
 * @type { (meta: MetaInfoType) => MetaServiceType }
 */
const DevMetaService = meta =>  {
    // this is only to satisfy the interface and make dev and prod exchangeable
    return { getMeta: () => Promise.resolve(meta) }
};
