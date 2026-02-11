import type { NextFunction, Request, Response } from "express";
import { errorResponse, MessageType } from "../utils/api-response";
import { HttpException } from "../utils/http-exception";

export const errorHandler = (
  err: Error | HttpException,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof HttpException) {
    console.error(err.message);

    errorResponse({
      res,
      message: err.message,
      statusCode: err.status,
      data: null,
      type: MessageType.ERROR,
    });
    return;
  }
  console.error(err.message);
  errorResponse({
    res,
    message: "Internal Server Error",
    statusCode: 500,
    data: null,
    type: MessageType.ERROR,
  });
};
