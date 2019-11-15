const request = require("supertest");
const server = require("../api/server");
const jwt = require("jsonwebtoken");

describe("Jokes Router", () => {
  describe("GET /api/jokes/", () => {
    it("should return a status 200", async () => {
      const token = jwt.sign(
        { username: "Amberly" },
        "a3289rh3298fdn2983hj2nf90-9-n@!)@0",
        {
          expiresIn: "1d"
        }
      );

      const res = await request(server)
        .get("/api/jokes/")
        .set({ authorization: token });

      expect(res.status).toBe(200);
    });

    it("should return an array of jokes", async () => {
      const token = jwt.sign(
        { username: "Amberly" },
        "a3289rh3298fdn2983hj2nf90-9-n@!)@0",
        {
          expiresIn: "1d"
        }
      );

      const res = await request(server)
        .get("/api/jokes/")
        .set({ authorization: token });

      expect(res.body).toHaveLength(20);
    });
  });
});
