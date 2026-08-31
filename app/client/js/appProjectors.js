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

            // --- data binding ---

            // before the dialog opens, fill the options with all available artworks
            workbenchController
                .getAllEntities(ARTWORK)
                .then(artworks => {
                    const optionsHtml = artworks.map(artwork=>`<option data-text="${artwork.displayedAs}" value="${artwork.id}">${artwork.displayedAs}</option>`).join("");
                    dialogSelEl.innerHTML = optionsHtml;
                });


            // fill the list of artworks in the closed view with info from the relation service
            // and update the selected attribute of the select options
            dialogSelEl.querySelectorAll("option").forEach(option => option.removeAttribute("selected"));
            workbenchController
                .getRelationService(ARTIST_ARTWORK)
                .getAll()
                .then ( artist_artwork_rels => {
                    const filtered = artist_artwork_rels.filter( rel => rel.artistId === entity.id); // ...
                    const artworkIds = filtered.map( rel => rel.artworkId );
                    ulEl.innerHTML = "";
                    artworkIds.forEach( artworkId => {
                        workbenchController
                            .findEntity(ARTWORK, artworkId)
                            .then ( artwork => {
                                // update the result view
                                ulEl.innerHTML += `<li>${artwork.displayedAs}</li>`;
                                // update the select options to mark the selected ones
                                dialogSelEl.querySelector(`[value="${artworkId}"]`)?.setAttribute("selected","selected");
                            });
                    })
                });

            // --- view binding

            // when the dialog closes...
            // update the list of artworks in the closed view with info from the current user selection
            submitButton.onclick = _evt => {
                const selectedValues     = [...dialogSelEl.selectedOptions].map(option => option.getAttribute("data-text"));
                const selectedArtworkIds = [...dialogSelEl.selectedOptions].map(option => option.value);
                ulEl.innerHTML       = selectedValues.map(value => `<li>${value}</li>`).join("");

                const relationService = workbenchController.getRelationService(ARTIST_ARTWORK);
                relationService
                    .getAll()
                    .then ( artist_artwork_rels => { // TODO: this is complex and should rather go into a controller
                        // first remove all relations that might get in the way, then add the selected ones
                        const removePromises =
                            artist_artwork_rels
                            .filter(rel => { // remove all artw for this artist
                                if (rel.artistId===entity.id) return true;
                                // we are in a one-to-many relation, therefore:
                                // remove the artwork if we will set it but some else might be in a relation
                                if ( selectedArtworkIds.indexOf( rel.artworkId) > -1 ) return true;
                                return false;
                            })
                            .map( artist_artwork_rel => {
                                return relationService.removeById(artist_artwork_rel.id);
                        });
                        // make sure all removals are finished before we add the selection
                        Promise.all(removePromises)
                           .then( _ => {
                               selectedArtworkIds.forEach( artwId => {
                                   relationService.add({artistId:entity.id, artworkId:artwId});
                               })
                           })
                    });
            };

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

