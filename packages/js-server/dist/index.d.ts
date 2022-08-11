import { gRPCStatus, JarspecErrorResponse, JarspecSuccessResponse } from '../../../common/@types';
export declare namespace Jarspec {
    const success: <T>(data?: T[], id?: string) => JarspecSuccessResponse<T>;
    const error: <T>(rpcCode: gRPCStatus, message: string, id?: string, data?: T[], error?: any) => JarspecErrorResponse<T>;
    const expressMiddleware: (req: any, res: any, next: any) => void;
}
//# sourceMappingURL=index.d.ts.map