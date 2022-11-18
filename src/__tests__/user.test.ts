import mongoose from "mongoose";
import supertest from "supertest";
import createServer from "../utils/server";
import * as UserService from "../service/user.service";
import * as SessionService from "../service/session.service";
import { createUserSessionHandler } from "../controllers/session.controller";

const app = createServer();
const userId = new mongoose.Types.ObjectId().toString();
const sessionId = new mongoose.Types.ObjectId().toString();

const userPayload = {
  _id: userId,
  email: {
    address: "jane.doe@email.com",
  },
  username: "alejandrogarnacho",
};

const userinput = {
  email: {
    address: "jane.doe@email.com",
  },
  password: "password",
  passwordConfirmation: "password",
  username: "alejandrogarnacho",
};

const sessionPayload = {
  _id: sessionId,
  user: userId,
  valid: true,
  userAgent: 'PostmanRuntime/7.28.4',
  createdAt: new Date("2022-09-30T13:31:07.674Z"),
  updatedAt: new Date("2022-09-30T13:31:07.674Z"),
  __v: 0
}

describe("user", () => {
  // user registration
  describe("user registration", () => {
    // username and password get validated
    describe("given the username and password are valid", () => {
      it("should return the user payload", async () => {
        const createUserServiceMock = jest
          .spyOn(UserService, "createUser")
          // @ts-ignore
          .mockReturnValueOnce(userPayload);

          const { statusCode, body } = await supertest(app).post(`/api/users/`).send(userinput)

          expect(statusCode).toBe(200)
          expect(body).toEqual(userPayload)
          expect(createUserServiceMock).toHaveBeenCalledWith(userinput)
      });
    });

    // verify that the passwords must match
    describe("given the passwords do not match", () => {
      it("should return a 400", async () => {
        const createUserServiceMock = jest
          .spyOn(UserService, "createUser")
          // @ts-ignore
          .mockReturnValueOnce(userPayload);

          const { statusCode } = await supertest(app).post(`/api/users/`).send({...userinput, passwordConfirmation: 'doesnotmatch'})

          expect(statusCode).toBe(400)
          expect(createUserServiceMock).not.toHaveBeenCalled()
      });
    });

    // verify that the handler handles any errors
    describe("the user service throws", () => {
      it("should return a 409 error", async () => {
        const createUserServiceMock = jest
          .spyOn(UserService, "createUser")
          // @ts-ignore
          .mockRejectedValue('oh no :(');

          const { statusCode } = await supertest(app).post(`/api/users/`).send(userinput)

          expect(statusCode).toBe(409)
          expect(createUserServiceMock).toHaveBeenCalled()
      });
    });
  });

  // create a user session
  describe("create user session",  () => {
    // a user can login with a valid email and password
    describe("given the username and password are valid", () => {
      it("should return a signed access token & refresh token", async () => {
        jest.spyOn(UserService, 'validatePassword')
        // @ts-ignore
        .mockReturnValue(userPayload)

        jest.spyOn(SessionService, 'createSession')
        // @ts-ignore
        .mockReturnValue(sessionPayload)  

        const req = {
          get: () => {
            return 'a user agent'
          },
          body: {
            email: "jane.doe@email.com",
            password: 'password'
          }
        }

        const send = jest.fn()

        const res = {
          send
        }

        // @ts-ignore
        await createUserSessionHandler(req, res)

        expect(send).toHaveBeenCalledWith({
          accessToken: expect.any(String),
          refreshToken: expect.any(String),
        })
      });
    });
  });
});
