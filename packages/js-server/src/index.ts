import { gRPCStatus, JarspecErrorResponse, JarspecSuccessResponse } from './common/@types';
import { gRPCtoHTTP } from './common/lib/GRPCtoHTTP';

export type {
  gRPCStatus,
  HTTPStatus,
  CommonResponse,
  Data,
  JarspecSuccessResponse,
  JarspecErrorResponse,
} from './common/@types';

export namespace Jarspec {

  const response = <T>(
    rpcCode: gRPCStatus,
    message: string,
    data?: T | T[],
    id?: string
  ) => {
    return {
      status: rpcCode,
      code: gRPCtoHTTP[rpcCode],
      data: data ?? null,
      message,
      id,
      timestamp: new Date().toISOString(),
      version: '2.0.0' as const
    }
  }

  export function success<T>(data?: T[], id?: string): JarspecSuccessResponse<T>;
  export function success<T extends object>(data?: T, id?: string): JarspecSuccessResponse<T>;
  export function success<T>(
    data?: T | T[],
    id?: string
  ): JarspecSuccessResponse<T> {
    const generic = response('ok', 'success', data, id);
    delete generic.message;
    return generic as any;
  }

  export function error<T>(rpcCode: gRPCStatus, message: string, id?: string, data?: T[], error?: any): JarspecErrorResponse<T>;
  export function error<T extends object>(rpcCode: gRPCStatus, message: string, id?: string, data?: T, error?: any): JarspecErrorResponse<T>;
  export function error<T>(
    rpcCode: gRPCStatus,
    message: string,
    id?: string,
    data?: T | T[],
    error?: any
  ): JarspecErrorResponse<T> {
    const generic = response(rpcCode, message, data, id);
    console.error(`[${generic.id ?? ' - '}] ${rpcCode} - ${message}`, error);
    return generic;
  }

  export const expressMiddleware = (req: any, res: any, next: any) => {
    res.jarspec = {
      success: <T>(
        data?: T | T[],
        id?: string
      ) => {
        const jarspecSuccess = success(data as any, id);
        res.status(200).json(jarspecSuccess);
      },
      error: <T>(
        rpcCode: gRPCStatus,
        message: string,
        id?: string,
        data?: T | T[],
        err?: any
      ) => {
        const jarspecError = error(rpcCode, message, id, data as any, err);
        res.status(jarspecError.code).json(jarspecError);
      }
    }

    next();
  };

}
