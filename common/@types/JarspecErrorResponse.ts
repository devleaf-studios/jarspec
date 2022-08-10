import { CommonResponse } from "./CommonResponse";

export interface JarspecErrorResponse<T = unknown> extends CommonResponse<T> {
  message: string;
}