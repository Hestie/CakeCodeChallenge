import AWSFactory, { AvailableAWSComponents } from '../../aws';

const envMock = {
    region: 'west-2',
    dynamodb: {
        endpoint: 'https://fill.com'
    },
    mock_accessKeyId: 'MOCK_KEY_ID',
    mock_secretAccessKey: 'MOCK_SECRET_KEY_ID'
};

describe('awsFactory', () => {
    it('should instantiate an empty function when no component and env are passed', (done) => {
        const emptyClient = AWSFactory.getComponent();
        expect(emptyClient).not.toBe(null);
        done();
    });

    it('should instantiate a DynamoDB Document client based on the env passed', (done) => {
        const documentClient = AWSFactory.getComponent(AvailableAWSComponents.DynamoDB.DocumentClient, envMock);
        expect(documentClient).not.toBe(null);
        done();
    });

    it('should return existing instance of DynamoDB Client if there is already on instance of it', (done) => {
        const id = 10;
        AWSFactory.DynamoDBDocumentClient = {
            DocumentClient: () => {
            },
            id
        };
        const documentClient = AWSFactory.getComponent(AvailableAWSComponents.DynamoDB.DocumentClient, envMock);
        expect(documentClient.id).toBe(id);
        done();
    });
});
