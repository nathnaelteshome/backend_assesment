export const createError = (message: string, status: number) => {
  const error: any = new Error();
  error.status = status;
  error.message = message;
  return error;
};
