export { EXIST_ERROR, NOT_EXIST_ERROR }

const EXIST_ERROR = function (name, value) {
    return {
        type: 'exist',
        name: name,
        value: value
    };
}

const NOT_EXIST_ERROR = function (name, value) {
    return {
        type: 'not_exist',
        name: name,
        value: value
    };
}