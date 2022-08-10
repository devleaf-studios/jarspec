import { gRPCStatus } from "./GRPCStatus";
import { HTTPStatus } from "./HTTPStatus";
export interface CommonResponse<T = any> {
    status: gRPCStatus;
    code: HTTPStatus;
    data: T[] | null;
    id?: string;
    timestamp: string;
    version: '1.0.0';
}
//# sourceMappingURL=CommonResponse.d.ts.map