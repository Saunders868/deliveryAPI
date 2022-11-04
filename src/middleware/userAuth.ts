import { NextFunction, Request, Response } from "express";

// ensure the user is verified for a restricted route
export const requireAuthorizedUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = res.locals.user;

  if (user._id === req.params.id || user.isAdmin === true) {
    return next();
  }

  return res.sendStatus(403);
};
