// Filename: helpers/formatResponse.js
module.exports = (
    type,
    message = 'No desription',
    data = [],
    pagination = null
) => {
    const ALLOWED_TYPES = [
        'VALID',
        'INVALID',
        'FOUND',
        'NOT_FOUND',
        'INTERNAL_ERROR',
        'CREATED',
        'NOT_MODIFIED',
        'NOT_AUTHORIZED',
        'FORBIDDEN',
    ]
    if (!ALLOWED_TYPES.includes(type)) {
        throw `${type} is not allowed. Available type is ${ALLOWED_TYPES.join(
            ', '
        )}`
    }
    return pagination === null
        ? { type, message, data }
        : { type, message, data, pagination }
}