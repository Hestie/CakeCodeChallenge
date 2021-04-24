import { serializeError } from 'serialize-error';

const { service_name: service, _HANDLER: handler, npm_package_version: version } = process.env;
const template = {
    service,
    handler,
    version
};

// For logging local debugging
export const logDebug = (content) => {
    const body = createBodyMessage('DEBUG', content);
    if (process.env.IS_OFFLINE) {
        console.log(JSON.stringify(body));
    }
};

// For log info
export const logInfo = (content) => {
    const body = createBodyMessage('INFO', content);
    console.log(JSON.stringify(body));
};

// For log warn, example if there is a validation message
export const logWarn = (content) => {
    const body = createBodyMessage('WARN', content);
    console.log(JSON.stringify(body));
};

// For log error, example if there is a technical error occurred.
export const logError = (content) => {
    const { message } = content || {};
    const error = message || content;
    const body = createBodyMessage('ERROR', serializeError(error));
    console.log(JSON.stringify(body));
};

export const createBodyMessage = (type, content) => {
    const body = {
        ...template,
        content,
        type
    };
    return body;
};
