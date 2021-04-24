import AWS from 'aws-sdk';

const AvailableAWSComponents = Object.freeze({
    DynamoDB: {
        DocumentClient: 'DynamoDBDocumentClient'
    }
});

class AWSFactory {
    static DynamoDBDocumentClient = null;

    static getComponent(component = '', env = {}) {
        const awsComponentMap = {
            DynamoDBDocumentClient: () => AWSFactory.DynamoDBDocumentClient || AWSFactory.mountDynamoDocumentClient(env),
            '': () => () => {
            } // Default case if component its not defined
        };

        return awsComponentMap[component]();
    }

    static mountDynamoDocumentClient(env = {}) {
        const client = new AWS.DynamoDB.DocumentClient({
            region: env.region,
            endpoint: env.dynamodb_endpoint,
            accessKeyId: env.mock_accessKeyId,
            secretAccessKey: env.mock_secretAccessKey
        });
        AWSFactory.DynamoDBDocumentClient = client;
        return client;
    }
}

export { AWSFactory as default, AWSFactory, AvailableAWSComponents };
