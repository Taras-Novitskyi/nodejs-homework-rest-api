const request = require("supertest");
const mongoose = require("mongoose");
// const jest = require("jest");
require("dotenv").config();

const app = require("../../app");

const { DB_HOST, PORT = 3001 } = process.env;

describe("Auth login test", function () {
  const connection = mongoose.connect(DB_HOST);

  beforeAll(async () => {
    await connection
      .then(() => {
        app.listen(PORT);
      })
      .catch((err) => {
        console.log(`Server not running. Error message: ${err.message}`);
        process.exit(1);
      });
  });

  //   afterAll(async () => {
  //     await connection.close();
  //     app.exit(1);
  //   });

  test("should return response with token and user object", async () => {
    const response = await request(app)
      .post("/api/users/login")
      .send({ email: "maxum@gmail.com", password: "123456" });

    expect(response.statusCode).toBe(200);
    expect(response.body.ResponseBody.token).toBeDefined();
    expect(Object.hasOwn(response.body.ResponseBody.user, "email")).toBe(true);
    expect(Object.hasOwn(response.body.ResponseBody.user, "subscription")).toBe(
      true
    );

    const { email, subscription } = response.body.ResponseBody.user;

    expect(typeof email).toBe("string");
    expect(typeof subscription).toBe("string");
  });

  //   test("should return response with token", async () => {});

  //   test("should return response with object user with email and subscription type String", async () => {});
});
