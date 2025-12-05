export interface CustomError extends Error {
  readonly statusCode: number;
}
