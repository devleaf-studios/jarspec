import { CommonResponse } from "./CommonResponse";

export interface JarspecSuccessResponse<T = any> extends CommonResponse<T> {
  status: 'ok';
  code: 200;
}