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

            // before the dialog opens, fill the options with all available artworks
            workbenchController
                .getAllEntities(ARTWORK)
                .then(artworks => {
                    const optionsHtml = artworks.map(artwork=>`<option value="${artwork.id}">${artwork.displayedAs}</option>`).join("");
                    dialogSelEl.innerHTML = optionsHtml;
                });

            // when the dialog closes...
            // update the list of artworks in the closed view with info from the current user selection
            submitButton.onclick = _evt => {
                const selectedValues = [...dialogSelEl.selectedOptions].map(option => option.value);
                ulEl.innerHTML       = selectedValues.map(value => `<li>${value}</li>`).join("");
            };

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

