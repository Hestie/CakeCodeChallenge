import cakeService from '../cakeService';
import cakeRepository from '../../../infrastructure/database/cakeRepository';

jest.mock('../../../infrastructure/database/cakeRepository', () => ({
    createOrUpdate: jest.fn(async () => ({})),
    getItem: jest.fn(async () => ({}))
}));

describe('createCake', () => {
    it('should return valid if all mandatory fields are present', async () => {
        const cake = {
            id: 2,
            name: 'cake2',
            comment: 'things to eat',
            imageUrl: 'https:xxx',
            yumFactor: 3
        };
        const result = await cakeService.createCake(cake);
        expect(result).toEqual({
            isValid: true,
            errors: []
        });
    });
    it('should return valid is false if any mandatory fields are not present', async () => {
        const cake = {
            id: 2,
            comment: 'things to eat',
            imageUrl: 'https:xxx',
            yumFactor: 3
        };
        const result = await cakeService.createCake(cake);
        expect(result).toEqual({
            isValid: false,
            errors: [{ detail: "Mandatory field 'Name' is empty", message: 'Mandatory Field Empty' }]
        });
    });
});

describe('getCake', () => {
    const cake = {
        id: 2,
        name: 'cake2',
        comment: 'things to eat',
        imageUrl: 'https:xxx',
        yumFactor: 3
    };
    cakeRepository.getItem.mockImplementation(() => (cake));

    it('should throw error if id is not a number', async () => {
        try {
            await cakeService.getCake('f');
        } catch (error) {
            expect(error.message).toBe('Id is not a number');
        }
    });
    it('should return cake if id is number', async () => {
        const result = await cakeService.getCake(2);
        expect(result).toEqual(cake);
    });
});
