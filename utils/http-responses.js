import { version } from '../package.json';

const responseHeaders = {
    'X-API-Version': version,
    'Access-Control-Expose-Headers': 'X-API-Version',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*', // Required for CORS support to work
    'Access-Control-Allow-Credentials': true // Required for cookies, authorization headers with HTTPS
};

const expectedErrors = [
    'Id is not a number'
];
const sanitiseResponseError = (error) => {
    const { message } = error;
    if (expectedErrors.includes(message)) return JSON.stringify(message);
    return JSON.stringify('An unexpected error occurred');
};

export default {
    success: (data = {}, code = 200) => ({
        statusCode: code,
        headers: responseHeaders,
        body: JSON.stringify(data)
    }),
    error: (error) => ({
        statusCode: error.code || 400,
        headers: responseHeaders,
        body: sanitiseResponseError(error)
    }),
    validationerror: (error) => ({
        statusCode: error.code || 400,
        headers: responseHeaders,
        body: JSON.stringify(error)
    })
};
