process.env.region = 'testregion';
process.env.dynamodb_endpoint = 'testendpoint';
process.env.dynamodb = {};
process.env.dynamodb_tablename = 'Dummy_tableName';
process.env.service_name = 'delicious-cakes-api';
// eslint-disable-next-line no-underscore-dangle
process.env._HANDLER = 'TestHandler';
process.env.npm_package_version = '1.2.3';

const mockFunction = {
    config: {
        update: jest.fn()
    },
    DynamoDB: {
        DocumentClient: function DocumentClient() {
            this.batchWrite = (params, callback) => callback();
            this.get = (params, callback) => callback();
            this.query = (params, callback) => callback();
            this.scan = (params, callback) => callback(jest.fn());
        }
    }
};

jest.mock('aws-sdk', () => mockFunction);
console = { log: jest.fn() };
