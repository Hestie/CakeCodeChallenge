const partitionKey = 'DeliciousCakes';

const cakeDefinition = {
    id: { label: 'Id', required: true, type: 'int' },
    name: { label: 'Name', required: true, type: 'string', length: 30 },
    comment: { label: 'Comment', required: true, type: 'string', length: 200 },
    imageUrl: { label: 'Image Url', required: true, type: 'string' },
    yumFactor: { label: 'Yum Factor', required: true, type: 'int', range: { max: 5, min: 1 } }
};

const mapToDto = (dbCake) => {
    if (!dbCake) return {};
    const { partitionKey: key, ...cake } = dbCake;
    return cake;
};

const mapFromDto = (cake) => {
    if (!cake) return null;
    const { id, name, comment, imageUrl, yumFactor } = cake;
    return {
        partitionKey,
        id,
        name,
        comment,
        imageUrl,
        yumFactor
    };
};

const checkMandatory = (cake, errors) => {
    Object.keys(cakeDefinition)
        .forEach((key) => {
            const { required, label } = cakeDefinition[key];
            if (required && (cake[key] === undefined || cake[key] === '' || cake[key] === null)) {
                errors.push({ message: 'Mandatory Field Empty', detail: `Mandatory field '${label}' is empty` });
            }
        });
    return errors;
};

const checkType = (cake, errors) => {
    Object.keys(cakeDefinition)
        .forEach((key) => {
            const { type, label } = cakeDefinition[key];
            if (type === 'int' && cake[key]) {
                const value = parseInt(cake[key], 10);
                if (Number.isNaN(value)) {
                    errors.push({ message: 'Not a number', detail: `Field '${label}' is not a number` });
                }
            }
            if (type === 'string') {
                if (typeof cake[key] !== 'string') {
                    errors.push({ message: 'Not a string', detail: `Field '${label}' is not a string` });
                }
            }
        });
    return errors;
};

const checkStringLength = (cake, errors) => {
    Object.keys(cakeDefinition)
        .forEach((key) => {
            const { length, label } = cakeDefinition[key];
            if ((length && cake[key]) && cake[key].length > length) {
                errors.push({ message: 'Too long', detail: `Field '${label}' should be less than ${length} characters` });
            }
        });
    return errors;
};

const checkRange = (cake, errors) => {
    Object.keys(cakeDefinition)
        .forEach((key) => {
            const { range, label } = cakeDefinition[key];
            if (range) {
                const { max, min } = range;
                if (cake[key] > max || cake[key] < min) {
                    errors.push({ message: 'Incorrect value', detail: `Field '${label}' should be between ${min} and ${max}` });
                }
            }
        });
    return errors;
};

const validateCake = (cake) => {
    const errors = [];
    checkMandatory(cake, errors);
    checkType(cake, errors);
    checkStringLength(cake, errors);
    checkRange(cake, errors);
    return { isValid: errors.length === 0, errors };
};

export default {
    partitionKey,
    mapToDto,
    mapFromDto,
    validateCake,
    checkRange,
    checkStringLength
};
