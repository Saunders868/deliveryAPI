import supertest from "supertest";
import createServer from "../utils/server";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { createProduct } from "../service/product.service";
import { signJwt } from "../utils/jwt.utils";

const app = createServer();

const userId = new mongoose.Types.ObjectId().toString();

export const productPayload = {
  user: userId,
  title: "New Product",
  desc: "Designed for first-time DSLR owners who want impressive results straight out of the box, capture those magic moments no matter your level with the EOS 1500D. With easy to use automatic shooting modes, large 24.1 MP sensor, Canon Camera Connect app integration and built-in feature guide, EOS 1500D is always ready to go.",
  price: 879.99,
  image: "https://i.imgur.com/QlRphfQ.jpg",
};

export const AuthorizedUserPayload = {
  _id: userId,
  email: {
    address: "jane.doe@email.com",
  },
  password: "password",
  username: "alejandrogarnacho",
  isAdmin: true,
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

describe("product", () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();

    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  // get a product that doesn't exist
  describe("get product route", () => {
    // USER LOGGED IN
    describe("given the product does not exists", () => {
      it("should return a 404", async () => {
        const jwt = signJwt(userPayload);

        const productId = "product-123";

        await supertest(app)
          .get(`/api/products/${productId}`)
          .set("Authorization", `Bearer ${jwt}`)
          .expect(404);
      });
    });

    // USER LOGGED OUT
    describe("given the product does not exists", () => {
      it("should return a 403", async () => {

        const productId = "product-123";

        await supertest(app)
          .get(`/api/products/${productId}`)
          .expect(403);
      });
    });
  });

  // get a product that exists
  describe("get product route", () => {
    // USER LOGGED IN
    describe("given the product does exists", () => {
      it("should return a 200 status and the product", async () => {
        const jwt = signJwt(userPayload);
        const product = await createProduct(productPayload);

        const productId = product.id;

        const { body, statusCode } = await supertest(app)
          .get(`/api/products/${productId}`)
          .set("Authorization", `Bearer ${jwt}`);

        expect(statusCode).toBe(200);
        expect((body.id = productId));
      });
    });

    // USER LOGGED OUT
    describe("given the product does exists", () => {
      it("should return a 200 status and the product", async () => {
        const product = await createProduct(productPayload);

        const productId = product.id;

        const { statusCode } = await supertest(app)
          .get(`/api/products/${productId}`)

        expect(statusCode).toBe(403);
      });
    });
  });

  // create a product
  describe("create product route", () => {
    // user not an admin
    describe("given the user is not an admin", () => {
      it("should return a 403", async () => {
        const jwt = signJwt(userPayload);
        const { statusCode } = await supertest(app).post("/api/products/").set("Authorization", `Bearer ${jwt}`);

        expect(statusCode).toBe(403);
      });
    });

    // user logged in and is an admin
    describe("given the user is logged in and an admin", () => {
      it("should return a 200 and create the product", async () => {
        const jwt = signJwt(AuthorizedUserPayload);

        const { statusCode, body } = await supertest(app)
          .post("/api/products/")
          .set("Authorization", `Bearer ${jwt}`)
          .send(productPayload);

        expect(statusCode).toBe(200);
        expect(body).toEqual({
          __v: 0,
          _id: expect.any(String),
          createdAt: expect.any(String),
          desc: "Designed for first-time DSLR owners who want impressive results straight out of the box, capture those magic moments no matter your level with the EOS 1500D. With easy to use automatic shooting modes, large 24.1 MP sensor, Canon Camera Connect app integration and built-in feature guide, EOS 1500D is always ready to go.",
          id: expect.any(String),
          image: "https://i.imgur.com/QlRphfQ.jpg",
          price: 879.99,
          title: "New Product",
          updatedAt: expect.any(String),
          user: expect.any(String),
        });
      });
    });
  });
});
