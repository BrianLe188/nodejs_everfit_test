import { RESPONSE_MESSAGE } from "@/constants/message";
import { Response } from "express";

export function errorHandler(
  res: Response,
  error: unknown,
  status = 500,
  message = RESPONSE_MESSAGE.SOMETHING_WENT_WRONG,
) {
  console.error(error);
  res.status(status).json({ error: message });
}

export function successHandler(res: Response, status = 200, data: any) {
  res.status(status).json({ data });
}
