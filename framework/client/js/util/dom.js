export { dom }

/**
 * @param innerString
 * @return { HTMLCollection }
 */
const dom = innerString => {
    const holder = document.createElement("DIV");
    holder.innerHTML = innerString;
    return holder.children;
};
