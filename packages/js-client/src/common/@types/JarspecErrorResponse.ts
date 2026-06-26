import { CommonResponse } from "./CommonResponse";

export interface JarspecErrorResponse<T = any> extends CommonResponse<T> {
  message: string;
}