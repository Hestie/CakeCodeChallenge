import cakeModel from '../cake';

describe('checkValueLimit', () => {
    it('should return error if yumFactor exceeds 5', async () => {
        const cake = {
            id: 2,
            name: 'cake2',
            comment: 'things to eat',
            imageUrl: 'https:xxx',
            yumFactor: 6
        };
        const errors = cakeModel.checkRange(cake, []);
        expect(errors).toEqual([{ detail: "Field 'Yum Factor' should be between 1 and 5", message: 'Incorrect value' }]);
    });
    it('should return error if yumFactor is less than 1', async () => {
        const cake = {
            id: 2,
            name: 'cake2',
            comment: 'things to eat',
            imageUrl: 'https:xxx',
            yumFactor: 0
        };
        const errors = cakeModel.checkRange(cake, []);
        expect(errors).toEqual([{ detail: "Field 'Yum Factor' should be between 1 and 5", message: 'Incorrect value' }]);
    });
});

describe('checkStringLength', () => {
    it('should return error if name exceeds 30 characters', async () => {
        const cake = {
            id: 2,
            name: 'very very very very long long long long cake name goes here',
            comment: 'things to eat',
            imageUrl: 'https:xxx',
            yumFactor: 4
        };
        const errors = cakeModel.checkStringLength(cake, []);
        expect(errors).toEqual([{ detail: "Field 'Name' should be less than 30 characters", message: 'Too long' }]);
    });
    it('should return no error if name less than 30 characters', async () => {
        const cake = {
            id: 2,
            name: 'cake2',
            comment: 'things to eat',
            imageUrl: 'https:xxx',
            yumFactor: 4
        };
        const errors = cakeModel.checkStringLength(cake, []);
        expect(errors).toEqual([]);
    });
});
