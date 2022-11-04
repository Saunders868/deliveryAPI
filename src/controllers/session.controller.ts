import { Request, Response } from "express";
import config from "config";
import { signJwt } from "../utils/jwt.utils";
import {
  createSession,
  findSessions,
  updateSession,
} from "../service/session.service";
import { validatePassword } from "../service/user.service";

export async function createUserSessionHandler(req: Request, res: Response) {
  // validate user password
  const user = await validatePassword(req.body);

  if (!user) {
    return res.status(401).send("Invalid email or password");
  }

  // create session
  const session = await createSession(user._id, req.get("user-agent") || "");

  // create access token: encodes user and session into jwt signed using sign helper function
  const accessToken = signJwt(
    {
      ...user,
      session: session._id,
    },
    { expiresIn: config.get("accessTokenTtl") }
  );

  // create refresh token
  const refreshToken = signJwt(
    {
      ...user,
      session: session._id,
    },
    { expiresIn: config.get("refreshTokenTtl") }
  );

  // return access and refresh token
  return res.send({ accessToken, refreshToken });
}

// login or start user session
export async function getUserSessionsHandler(req: Request, res: Response) {
  const userId = res.locals.user._id;

  const sessions = await findSessions({ user: userId, valid: true });

  return res.send(sessions);
}

// logout or terminate user session
export async function deleteSessionHandler(req: Request, res: Response) {
  const sessionId = res.locals.user.session;

  await updateSession({ _id: sessionId }, { valid: false });

  return res.send({
    accessToken: null,
    resetToken: null,
  });
}
