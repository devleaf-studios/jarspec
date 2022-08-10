import { JarspecErrorResponse, JarspecSuccessResponse } from '../../../common/@types';

const isErrorResponse = <T>(response: any): response is JarspecErrorResponse<T> => {
  return response.status 
    && response?.code >= 400
    && response.timestamp;
}

const isSuccessResponse = <T>(response: any): response is JarspecSuccessResponse<T> => {
  return response?.status === 'OK'
    && response?.code >= 200
    && response?.code < 300
    && response.timestamp;
}

export const jarspecRequest = async <T = unknown>(input: RequestInfo, init?: RequestInit): Promise<JarspecErrorResponse<T>|JarspecSuccessResponse<T>> => {
  try {
    const call = await fetch(input, init);
    const res = await call.json();
    if (isErrorResponse<T>(res)) throw res;
    if (!isSuccessResponse<T>(res)) throw new TypeError('The response of the call was not a valid jarspec response.');
    return res;
  } catch (err) {
    if (isErrorResponse<typeof err>(err)) return err;
    return {
      status: 'na',
      code: 502,
      message: err.message,
      data: [err],
      timestamp: new Date().toISOString(),
      version: '1.0.0'
    };
  }
}