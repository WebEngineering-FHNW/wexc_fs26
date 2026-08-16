export { registerDropzone, registerDraggable, dragData}

const registerDraggable = (element, dataFn) => {
    element.setAttribute("draggable", true);
    element.ondragstart = evt => {
        evt.dataTransfer.setData("text/json", JSON.stringify(dataFn(element)));
    }
};
const registerDropzone = (element, dropHandler, effect="copy") => {
    element.ondragover = evt => {
        evt.preventDefault();
        evt.dataTransfer.dropEffect = effect;
    };
    element.ondrop = evt => {
        evt.preventDefault();
        const data = JSON.parse(evt.dataTransfer.getData("text/json"));
        dropHandler(data);
    };
};

// general utility, might go into FW
// for DnD, use key "id" with value from attribute "data-id" and domain from "data-domain"
const dragData = el => ({
    id:     el.getAttribute("data-id"),
    domain: el.getAttribute("data-domain")
});
