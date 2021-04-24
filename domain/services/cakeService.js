import cakeModel from '../models/cake';
import cakeRepository from '../../infrastructure/database/cakeRepository';

const { partitionKey } = cakeModel;

const createCake = async (cake) => {
    const validationCheck = cakeModel.validateCake(cake);
    if (validationCheck.isValid) {
        await cakeRepository.createOrUpdate(cakeModel.mapFromDto(cake));
    }
    return validationCheck;
};

const getCake = async (id) => {
    const cakeId = parseInt(id, 10);
    if (Number.isNaN(cakeId)) {
        throw new Error('Id is not a number');
    }
    const cake = await cakeRepository.getItem(partitionKey, cakeId);
    return cakeModel.mapToDto(cake);
};

const getAllCakes = async () => {
    const cakes = await cakeRepository.getAllItems(partitionKey);
    return cakes.map((p) => cakeModel.mapToDto(p));
};

const deleteCake = async (id) => {
    const cakeId = parseInt(id, 10);
    if (Number.isNaN(cakeId)) {
        throw new Error('Id is not a number');
    }
    await cakeRepository.deleteItem(partitionKey, cakeId);
};

export default {
    createCake,
    getCake,
    getAllCakes,
    deleteCake
};
