import { logError } from '../infrastructure/logging/log';
import responses from '../utils/http-responses';
import cakeService from '../domain/services/cakeService';

const createCake = async (event) => {
    try {
        const data = JSON.parse(event.body);
        const validationCheck = await cakeService.createCake(data);
        if (validationCheck.isValid) return responses.success(validationCheck);
        return responses.validationerror(validationCheck);
    } catch (error) {
        logError(error);
        return responses.error(error);
    }
};

export {
    createCake
};
