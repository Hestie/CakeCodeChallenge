import { logError } from '../infrastructure/logging/log';
import responses from '../utils/http-responses';
import cakeService from '../domain/services/cakeService';

const getAllCakes = async () => {
    try {
        const cakes = await cakeService.getAllCakes();
        return responses.success(cakes);
    } catch (error) {
        logError(error);
        return responses.error(error);
    }
};

const getCake = async (event) => {
    try {
        const { id } = event.pathParameters;
        const cake = await cakeService.getCake(id);
        return responses.success(cake);
    } catch (error) {
        logError(error);
        return responses.error(error);
    }
};

export {
    getAllCakes,
    getCake
};
