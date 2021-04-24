import { logError } from '../infrastructure/logging/log';
import responses from '../utils/http-responses';
import cakeService from '../domain/services/cakeService';

const deleteCake = async (event) => {
    try {
        const { id } = event.pathParameters;
        await cakeService.deleteCake(id);
        return responses.success('Cake deleted');
    } catch (error) {
        logError(error);
        return responses.error(error);
    }
};

export {
    deleteCake
};
