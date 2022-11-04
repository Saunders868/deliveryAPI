import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

// ensures the correct schema is being passed on each request and parses the schema into body, query and params
const validate =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (e: any) {
      return res.status(400).send(e.errors);
    }
  };

export default validate;
