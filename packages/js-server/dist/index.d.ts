import { gRPCStatus, JarspecErrorResponse, JarspecSuccessResponse } from './common/@types';
export declare namespace Jarspec {
    function success<T>(data?: T[], id?: string): JarspecSuccessResponse<T>;
    function success<T extends object>(data?: T, id?: string): JarspecSuccessResponse<T>;
    function error<T>(rpcCode: gRPCStatus, message: string, id?: string, data?: T[], error?: any): JarspecErrorResponse<T>;
    function error<T extends object>(rpcCode: gRPCStatus, message: string, id?: string, data?: T, error?: any): JarspecErrorResponse<T>;
    const expressMiddleware: (req: any, res: any, next: any) => void;
}
//# sourceMappingURL=index.d.ts.map