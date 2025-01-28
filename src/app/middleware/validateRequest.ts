import { AnyZodObject } from "zod";
import catchAsync from "../utils/catch-async";
import { NextFunction, Request, Response } from "express";

export const validationMiddleWare = (schema: AnyZodObject) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    console.log(req?.cookies);

    await schema.parseAsync(req?.body, req?.cookies);
    // if(req?.body) {
    //   // next()
    // }

    // if(req?.cookies) {
    //   await schema.parseAsync(req.cookies)
    // }
    
    next();
  });
};
