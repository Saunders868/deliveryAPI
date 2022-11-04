import { NextFunction, Request, Response } from "express";

// ensure the user is an admin for restricted routes
export const requireAdminUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = res.locals.user;

  if (user.isAdmin === false) {
    return res.sendStatus(403)
  }

  return next();
};
