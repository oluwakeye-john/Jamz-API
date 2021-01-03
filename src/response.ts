export interface ResponseHandler {
  data?: any;
  msg?: string;
  statusCode?: number;
}

export const responseHandler = ({ data, msg, statusCode }: ResponseHandler) => {
  const payload: any = { statusCode: statusCode || 200, data };
  if (msg) {
    payload.message = msg;
  }
  return payload;
};
