function cloneDeep(value) {
    if (typeof value !== 'object') {
        return value;
    }
    if (Array.isArray(value)) {
        return value.map(v => cloneDeep(v));
    } 
    const res = {};
    for (key in value) {
        res[key] = cloneDeep(value[key])
    }
    return res;
}

module.exports = cloneDeep;