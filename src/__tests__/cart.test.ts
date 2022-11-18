import supertest from "supertest";
import createServer from "../utils/server";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { signJwt } from "../utils/jwt.utils";
import { createCart } from "../service/cart.service";
import * as CartService from "../service/cart.service";
import { createCartHandler } from "../controllers/cart.controller";

const app = createServer();

const userId = new mongoose.Types.ObjectId().toString();
const Id = new mongoose.Types.ObjectId().toString();

const cartPayload = {
  products : [
    {
        product_id: "product_73872ef3-e4bc-4659-868d-2562e42d9bae",
        quantity: 1,
        price: 100,
        title: 'title'
    }
]
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

describe("cart", () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();

    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  // get a cart that doesn't exist
  describe("get cart route", () => {
    // USER LOGGED IN
    describe("given the cart does not exists", () => {
      it("should return a 404", async () => {
        const jwt = signJwt(userPayload);

        const cartId = "cart-123";

        await supertest(app)
          .get(`/api/carts/${cartId}`)
          .set("Authorization", `Bearer ${jwt}`)
          .expect(404);
      });
    });

    // USER LOGGED OUT
    describe("given the cart does not exists", () => {
      it("should return a 403", async () => {

        const cartId = "cart-123";

        await supertest(app)
          .get(`/api/carts/${cartId}`)
          .expect(403);
      });
    });
  });

  // get a cart that exists
  describe("get cart route", () => {
    // USER LOGGED IN
    describe("given the cart does exists", () => {
      it("should return a 200 status and the cart", async () => {
        const jwt = signJwt(userPayload);
        const cart = await createCart({...cartPayload, userId: userId});

        const cartId = cart.id;

        const { body, statusCode } = await supertest(app)
          .get(`/api/carts/${cartId}`)
          .set("Authorization", `Bearer ${jwt}`);

        expect(statusCode).toBe(200);
        expect((body.id = cartId));
      });
    });

    // USER LOGGED OUT
    describe("given the cart does exists", () => {
      it("should return a 200 status and the cart", async () => {
        const cart = await createCart({...cartPayload, userId: userId});

        const cartId = cart.id;

        const { statusCode } = await supertest(app)
          .get(`/api/carts/${cartId}`)

        expect(statusCode).toBe(403);
      });
    });
  });

  // // create a cart
  describe("create cart route", () => {
    // user logged out
    describe("given the user is not logged in", () => {
      it("should return a 403", async () => {
        const { statusCode } = await supertest(app).post("/api/carts/");

        expect(statusCode).toBe(403);
      });
    });

    // user logged in
    describe("given the user is logged in", () => {
      it("should return a 200 and create the cart", async () => {
        const jwt = signJwt(userPayload);

        const createUserServiceMock = jest
          .spyOn(CartService, "createCart")
          // @ts-ignore
          .mockReturnValueOnce({...cartPayload, userId: userId});

          const { statusCode, body } = await supertest(app).post(`/api/carts/`).set("Authorization", `Bearer ${jwt}`).send({...cartPayload, userId: userId})

          expect(statusCode).toBe(200)
          expect(body).toEqual({...cartPayload, userId: userId})
          expect(createUserServiceMock).toHaveBeenCalledWith(cartPayload)
      })
    });
  });
});
