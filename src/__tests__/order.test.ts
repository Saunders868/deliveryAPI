import supertest from "supertest";
import createServer from "../utils/server";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { signJwt } from "../utils/jwt.utils";
import { createOrder } from "../service/order.service";

const app = createServer();

const Id = new mongoose.Types.ObjectId().toString();
const cartId = new mongoose.Types.ObjectId().toString();
const userId = new mongoose.Types.ObjectId().toString();
const userIdM = new mongoose.Types.ObjectId();

const orderPayload = {
  user: userIdM,
  id: Id,
  cart: cartId
};

export const userPayload = {
  _id: userId,
  email: {
    address: "jane.doe@email.com",
  },
  password: "password",
  username: "alejandrogarnacho",
  isAdmin: false
};

describe("order", () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();

    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  // get a order that doesn't exist
  describe("get order route", () => {
    // USER LOGGED IN
    describe("given the order does not exists", () => {
      it("should return a 404", async () => {
        const jwt = signJwt(userPayload);

        const orderId = "order-123";

        await supertest(app)
          .get(`/api/orders/${orderId}`)
          .set("Authorization", `Bearer ${jwt}`)
          .expect(404);
      });
    });

    // USER LOGGED OUT
    describe("given the order does not exists", () => {
      it("should return a 403", async () => {

        const orderId = "order-123";

        await supertest(app)
          .get(`/api/orders/${orderId}`)
          .expect(403);
      });
    });
  });

  // get a order that exists
  describe("get order route", () => {
    // USER LOGGED IN
    // describe("given the order does exists", () => {
    //   it("should return a 200 status and the order", async () => {
    //     const jwt = signJwt(userPayload);
    //     const order = await createOrder(orderPayload);

    //     const orderId = order.id;

    //     const { body, statusCode } = await supertest(app)
    //       .get(`/api/orders/${orderId}`)
    //       .set("Authorization", `Bearer ${jwt}`);

    //     expect(statusCode).toBe(200);
    //     expect((body.id = orderId));
    //   });
    // });

    // USER LOGGED OUT
    describe("given the order does exists", () => {
      it("should return a 403 status and the order", async () => {
        const order = await createOrder(orderPayload);

        const orderId = order.id;

        const { statusCode } = await supertest(app)
          .get(`/api/orders/${orderId}`)

        expect(statusCode).toBe(403);
      });
    });
  });

  // // create a order
  describe("create order route", () => {
    // user logged out
    describe("given the user is not logged in", () => {
      it("should return a 403", async () => {
        const { statusCode } = await supertest(app).post("/api/orders/");

        expect(statusCode).toBe(403);
      });
    });

    // user logged in
    describe("given the user is logged in", () => {
      it("should return a 200 and create the order", async () => {
        const jwt = signJwt(userPayload);

        const { statusCode, body } = await supertest(app)
          .post("/api/orders/")
          .set("Authorization", `Bearer ${jwt}`)
          .send({ ...orderPayload, isCompleted: false })

        expect(statusCode).toBe(200);
        expect(body).toEqual({});
      })
    });
  });
});
