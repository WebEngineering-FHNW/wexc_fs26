export { Observable }

/**
 * @typedef Consumer
 * @type {  <_T_> (_T_) => void }
 */

/**
 * @typedef ObservableType
 * @template _T_
 * @property { () => _T_ } getValue
 * @property { (_T_) => void } setValue
 * @property { (callback: Consumer<_T_>) => void} onChange
 */

/**
 * @template _T_
 * @param { _T_} value
 * @return { ObservableType<_T_>}
 */
const Observable = value => {
    const listeners = [];
    const getValue = () => value;
    const setValue = newValue => {
        if (newValue === value) { return; }
        value = newValue;
        [...listeners].forEach( callback => {
            try {
                callback(newValue);
            } catch (e) {
                console.error("Error in observable callback for value <"+newValue+">", e);
            }
        });
    };
    const onChange = cb => {
        listeners.push(cb);
        cb(value);
    };
    return {getValue, setValue, onChange }
};
