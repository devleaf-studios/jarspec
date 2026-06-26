import { gRPCStatus } from "./GRPCStatus";
import { HTTPStatus } from "./HTTPStatus";
export type Data<T = any> = T | T[] | null;
export interface CommonResponse<T = any> {
    status: gRPCStatus;
    code: HTTPStatus;
    data: Data<T>;
    id?: string;
    timestamp: string;
    version: '2.0.0';
}
//# sourceMappingURL=CommonResponse.d.ts.map