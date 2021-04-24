const scanAllItems = (docClient, params, items = [], lastEvaluatedKey = null) => new Promise((resolve) => {
    const newParams = { ...params };
    if (lastEvaluatedKey) {
        newParams.ExclusiveStartKey = lastEvaluatedKey;
    }
    docClient.scan(newParams)
        .promise()
        .then((result) => {
            const list = items.concat(result.Items);
            if (result.LastEvaluatedKey) {
                resolve(scanAllItems(docClient, newParams, list, result.LastEvaluatedKey));
            }
            resolve(list);
        });
});

const queryAllItems = async (docClient, params, items = [], lastEvaluatedKey = null) => {
    const newParams = { ...params };
    if (lastEvaluatedKey) {
        newParams.ExclusiveStartKey = lastEvaluatedKey;
    }
    const result = await docClient.query(newParams)
        .promise();
    const list = items.concat(result.Items);
    if (result.LastEvaluatedKey) {
        return queryAllItems(docClient, newParams, list, result.LastEvaluatedKey);
    }
    return list;
};

export { scanAllItems, queryAllItems };
