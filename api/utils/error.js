//middleware to error handle
export const errorHandler = (status, message) =>{
    const error = new Error();
    error.status = status;
    error.message = message;
    return error;
}