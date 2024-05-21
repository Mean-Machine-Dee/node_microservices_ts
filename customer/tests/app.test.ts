import request from "supertest";
import Server from "../src";
import { Application } from "express";

const app = new Server().app;

describe("API endpoint home", () => {
  it("should return API default page", async () => {
    const res = await request(app).get("/api").expect("Content-Type", /json/);
    expect(res.status).toEqual(200);
    expect(res.body.message).toEqual("Wecome to the shopping mall");
  });
});

describe("API create customer", () => {
  it("should create and return customer", async () => {
    const payload = {
      email: "dee2@gmail.com",
      password: "hacker90",
      phone: "254716904375",
      confirm: "hacker90",
    };
    const res = await request(app)
      .post("/api/customers/signup")
      .send(payload)
      .expect("Content-Type", /json/);
    expect(res.status).toEqual(201);
    expect(res.body).toEqual({});
  });

  it("should return 500 on same email address", async () => {
    const payload = {
      email: "dee2@gmail.com",
      password: "hacker90",
      phone: "254716904375",
      confirm: "hacker90",
    };
    const res = await request(app)
      .post("/api/customers/signup")
      .send(payload)
      .expect("Content-Type", /json/);
    expect(res.status).toEqual(500);
  });
});
