import { gRPCStatus } from "../@types/GRPCStatus";
import { HTTPStatus } from "../@types/HTTPStatus";

export const gRPCtoHTTP: {
  [key in gRPCStatus]: HTTPStatus
} = {
  'ok': 200,
  'invalid-argument': 400,
  'failed-precondition': 400,
  'out-of-range': 400,
  'unauthenticated': 401,
  'permission-denied': 403,
  'not-found': 404,
  'aborted': 409,
  'already-exists': 409,
  'resource-exhausted': 429,
  'cancelled': 499,
  'data-loss': 500,
  'unknown': 500,
  'internal': 500,
  'not-implemented': 501,
  'na': 502,
  'unavailable': 503,
  'deadline-exceeded': 504
};