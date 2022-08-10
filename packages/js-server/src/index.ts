import { gRPCStatus, JarspecErrorResponse, JarspecSuccessResponse } from '../../../common/@types';
import { gRPCtoHTTP } from '../../../common/lib/GRPCtoHTTP';

export namespace Jarspec {

  const response = <T>(
    rpcCode: gRPCStatus,
    message: string,
    data?: T[],
    id?: string
  ) => {
    return {
      status: rpcCode,
      code: gRPCtoHTTP[rpcCode],
      data: data ?? null,
      message,
      id,
      timestamp: new Date().toISOString(),
      version: '1.0.0' as const
    }
  }

  export const success = <T>(
    data: T[],
    id?: string
  ): JarspecSuccessResponse<T> => {
    const generic = response('ok', 'success', data, id);
    delete generic.message;
    return generic as any;
  }

  export const error = <T>(
    rpcCode: gRPCStatus,
    message: string,
    id?: string,
    data?: T[],
    error?: any
  ): JarspecErrorResponse<T> => {
    const generic = response(rpcCode, message, data, id);
    console.error(`[${generic.id ?? ' - '}] ${rpcCode} - ${message}`, error);
    return generic;
  }

  export const expressMiddleware = (req: any, res: any, next: any) => {
    res.jarspec = {
      success: <T>(
        data?: T[],
        id?: string
      ) => {
        const jarspecSuccess = success(data, id);
        res.status(200).json(jarspecSuccess);
      },
      error: <T>(
        rpcCode: gRPCStatus,
        message: string,
        id?: string,
        data?: T[],
        err?: any
      ) => {
        const jarspecError = error(rpcCode, message, id, data, err);
        res.status(jarspecError.code).json(jarspecError);
      }
    }

    next();
  };

}