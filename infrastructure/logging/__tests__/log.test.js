import { logDebug, logInfo, logWarn, logError, createBodyMessage } from '../log';

describe('logger', () => {
    it('should not output the provided message to the console for logDebug', () => {
        logDebug('My log debug method is working');
        expect(console.log).toHaveBeenCalledTimes(0);
    });

    it('should output the provided message to the console for logDebug', () => {
        process.env.IS_OFFLINE = true;
        logDebug('My log debug method is working');
        expect(console.log).toHaveBeenCalledWith(JSON.stringify({
            service: 'delicious-cakes-api',
            handler: 'TestHandler',
            version: '1.2.3',
            content: 'My log debug method is working',
            type: 'DEBUG'
        }));
    });

    it('should output the provided message to the console for logInfo', () => {
        logInfo('My log info method is working');
        expect(console.log).toHaveBeenCalledWith(JSON.stringify({
            service: 'delicious-cakes-api',
            handler: 'TestHandler',
            version: '1.2.3',
            content: 'My log info method is working',
            type: 'INFO'
        }));
    });

    it('should output the provided message to the console for logWarn', () => {
        logWarn('My log warn method is working');
        expect(console.log).toHaveBeenCalledWith(JSON.stringify({
            service: 'delicious-cakes-api',
            handler: 'TestHandler',
            version: '1.2.3',
            content: 'My log warn method is working',
            type: 'WARN'
        }));
    });

    it('should output the provided message to the console for logError', () => {
        logError('My log error method is working');
        expect(console.log).toHaveBeenCalledWith(JSON.stringify({
            service: 'delicious-cakes-api',
            handler: 'TestHandler',
            version: '1.2.3',
            content: 'My log error method is working',
            type: 'ERROR'
        }));
    });
    it('should output the provided error message to the console for logError', () => {
        logError({ message: 'error is in the message' });
        expect(console.log).toHaveBeenCalledWith(JSON.stringify({
            service: 'delicious-cakes-api',
            handler: 'TestHandler',
            version: '1.2.3',
            content: 'error is in the message',
            type: 'ERROR'
        }));
    });
    it('should handle empty object for logError', () => {
        logError(null);
        expect(console.log).toHaveBeenCalledWith(JSON.stringify({
            service: 'delicious-cakes-api',
            handler: 'TestHandler',
            version: '1.2.3',
            content: null,
            type: 'ERROR'
        }));
    });
});

describe('logHelper', () => {
    it('should output the provided template to the console', () => {
        const result = createBodyMessage('TYPE', 'message');
        expect(result).toEqual({
            service: 'delicious-cakes-api',
            handler: 'TestHandler',
            version: '1.2.3',
            content: 'message',
            type: 'TYPE'
        });
    });
});
