import {ConnectorProjector}     from "../../../framework/client/js/projector/connectorProjector.js";
import {defaultProjectors}               from "../../../framework/client/js/projector/defaultProjectors.js";
import {ARTIST, ARTIST_ARTWORK, ARTWORK} from "./appTypes.js";
import {dom}                             from "../../../framework/client/js/util/dom.js";

export { appProjectors }

const connectorProjector = (workbenchController) => {

    const SpecialProjector = (workbenchController) => {
        const projectConnection = (rel_meta, entityName, entity) => {
            if (rel_meta.relationId !== ARTIST_ARTWORK || entityName !== ARTIST) {
                return ConnectorProjector(workbenchController).projectConnection(rel_meta, entityName, entity);
            }

            const [labelEl, divEl] = dom(`
                <div>This Artist's Artworks</div>
                <div class="dropzone many">
                    <ul>
                    </ul>
                    <button type="button" 
                        commandfor="artwork_selection_dialog"   
                        command="show-modal">
                        select
                    </button>
                    <dialog id="artwork_selection_dialog">                    
                        <select multiple size=10>
                            <option>Artwork 1</option>
                            <option>Artwork 2</option>
                            <option>Artwork 3</option>
                            <option>Artwork 4</option>
                            <option>Artwork 5</option>
                        </select>                    
                      <button class="submit" type="button" commandfor="artwork_selection_dialog" command="close">
                        Submit
                       </button>                
                      <button type="button" commandfor="artwork_selection_dialog" command="close">
                        Cancel
                       </button>
                    </dialog>
                </div>
            `);

            const submitButton = divEl.querySelector("button.submit");
            const dialogSelEl  = divEl.querySelector("dialog select");
            const ulEl         = divEl.querySelector("ul");
            submitButton.onclick = _evt => {
                const selectedValues = [...dialogSelEl.selectedOptions].map(option => option.value);
                ulEl.innerHTML       = selectedValues.map(value => `<li>${value}</li>`).join("");
            };

            workbenchController
                .getRelationService(ARTIST_ARTWORK)
                .getAll()
                .then ( artist_artwork_rels => {
                    const filtered = artist_artwork_rels.filter( rel => rel.artistId === entity.id); // ...
                    console.log(filtered);
                    const artworkIds = filtered.map( rel => rel.artworkId );
                    ulEl.innerHTML = "";
                    artworkIds.forEach( artworkId => {
                        workbenchController
                            .findEntity(ARTWORK, artworkId)
                            .then ( artwork => {
                                ulEl.innerHTML += `<li>${artwork.displayedAs}</li>`
                            });
                    })

                });

            // // data binding
            // const selectEl = divEl.querySelector("select");
            // workbenchController.getRelationService(ARTIST_ARTWORK).getAll()
            //     .then( artist_artwork_rels => artist_artwork_rels.forEach( artist_artwork_rel => {
            //            console.log(artist_artwork_rel, entity.id);
            //            if ( artist_artwork_rel.artistId !== entity.id) { return; } // not our relations: skip
            //            workbenchController.findEntity(ARTWORK, artist_artwork_rel.artworkId)
            //                 .then( artwork => {
            //                     console.log(artwork);
            //                     const [option] = dom(`<option>${artwork.displayedAs}</option>`);
            //                     selectEl.append(option);
            //                 });
            //        }
            //     ));

            return [labelEl, divEl];
        };
        return { projectConnection }
    };

    console.info("specialized connector projector in use");
    return SpecialProjector(workbenchController);
};


/** @type { ProjectorProviderType } */
const appProjectors = {
    ...defaultProjectors, // default - we only want to specialize the connectors
    connectorProjector,
};

