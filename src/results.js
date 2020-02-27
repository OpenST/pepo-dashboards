export function toObjs(dataSources, ds = 'primary') {
    if (
        dataSources &&
        dataSources[ds] &&
        dataSources[ds].data &&
        dataSources[ds].data.fields &&
        dataSources[ds].data.columns &&
        dataSources[ds].data.columns.length > 0
    ) {
        const fields = dataSources[ds].data.fields.map(f => f.name);
        return dataSources[ds].data.columns[0].map((_, i) => {
            const obj = {};
            fields.forEach((f, j) => {
                obj[f] = dataSources[ds].data.columns[j][i];
            });
            return obj;
        });
    }
    return [];
}
