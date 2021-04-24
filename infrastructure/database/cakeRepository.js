import { logError } from '../logging/log';
import { AvailableAWSComponents, AWSFactory } from '../aws';
import { queryAllItems } from './transactions';

const docClient = () => AWSFactory.getComponent(AvailableAWSComponents.DynamoDB.DocumentClient, process.env);
const constructParams = (params) => ({ TableName: process.env.dynamodb_tablename, ...params });

const createOrUpdate = async (item) => {
    try {
        const params = constructParams({ Item: item });
        await docClient().put(params).promise();
    } catch (error) {
        logError(error.message);
        throw new Error('Something went wrong while updating data');
    }
};

const getItem = async (partitionKey, id) => {
    try {
        const params = constructParams({ Key: { partitionKey, id } });
        const result = await docClient().get(params).promise();
        return result.Item;
    } catch (error) {
        logError(error.message);
        throw new Error('Something went wrong while retrieving item');
    }
};

const getAllItems = async (partitionKey) => {
    try {
        const params = constructParams({
            KeyConditionExpression: 'partitionKey = :l',
            ExpressionAttributeValues: { ':l': partitionKey }
        });
        const items = await queryAllItems(docClient(), params);
        return items;
    } catch (error) {
        logError(error.message);
        throw new Error('Something went wrong while retrieving data');
    }
};

const deleteItem = async (partitionKey, id) => {
    try {
        const params = constructParams({ Key: { partitionKey, id } });
        await docClient().delete(params).promise();
    } catch (error) {
        logError(error.message);
        throw new Error('Something went wrong while deleting data');
    }
};

export default {
    createOrUpdate,
    getItem,
    getAllItems,
    deleteItem
};
