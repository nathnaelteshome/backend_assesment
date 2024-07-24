"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createError = void 0;
const createError = (message, status) => {
    const error = new Error();
    error.status = status;
    error.message = message;
    return error;
};
exports.createError = createError;
