import request from "supertest";
import app from "@/core/app";
import { connectDB, disconnectDB } from "@/core/db";
import qs from "querystring";

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  await disconnectDB();
});

describe("Metric API", () => {
  it("create new should return a metric object", async () => {
    const payload = {
      user_id: "123",
      type: "distance",
      value: 98.6,
      unit: "meter",
      date: "2025-07-20T10:00:00.000Z",
    };
    const response = await request(app).post("/metrics").send(payload);

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      _id: expect.any(String),
      ...payload,
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });

  it("create new should failed by missing user_id", async () => {
    const payload = {
      type: "distance",
      value: 98.6,
      unit: "meter",
      date: "2025-07-20T10:00:00.000Z",
    };

    const response = await request(app)
      .post("/metrics")
      .send(payload)
      .set("Accept", "application/json");

    expect(response.status).toBe(400);
  });

  it("get chart metrics by type", async () => {
    const param = "distance";
    const query = {
      user_id: "123",
      unit: "meter",
      period: "1month",
    };
    const response = await request(app).get(
      `/metrics/${param}/chart?${qs.stringify(query)}`,
    );

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          date: expect.any(String),
          unit: expect.any(String),
          value: expect.any(Number),
        }),
      ]),
    );
  });

  it("get chart metrics by type but missing user_id return empty array", async () => {
    const param = "distance";
    const query = {
      unit: "meter",
    };
    const response = await request(app).get(
      `/metrics/${param}/chart?${qs.stringify(query)}`,
    );

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body).toEqual([]);
  });

  it("get all metrics by type", async () => {
    const param = "distance";
    const query = {
      user_id: "123",
      unit: "meter",
    };
    const response = await request(app).get(
      `/metrics/${param}?${qs.stringify(query)}`,
    );

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          _id: expect.any(String),
          user_id: expect.any(String),
          type: expect.any(String),
          value: expect.any(Number),
          unit: expect.any(String),
          date: expect.any(String),
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        }),
      ]),
    );
  });

  it("get all metrics by type but missing user_id return empty array", async () => {
    const param = "distance";
    const query = {
      unit: "meter",
    };
    const response = await request(app).get(
      `/metrics/${param}?${qs.stringify(query)}`,
    );

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body).toEqual([]);
  });
});
