import { CommonResponse } from "./CommonResponse";
export interface JarspecSuccessResponse<T = unknown> extends CommonResponse<T> {
    status: 'ok';
    code: 200;
}
//# sourceMappingURL=JarspecSuccessResponse.d.ts.map