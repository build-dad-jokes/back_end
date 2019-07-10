const db = require("../data/dbConfig");
const Users = require("./users-model");

describe("users model", () => {
  beforeEach(() => {
    return db("users").truncate();
  });

  describe("insert()", () => {
    it("should insert the provided user into db", async () => {
      await Users.add({ username: "PB", password: "1234" });
      await Users.add({ username: "BP", password: "4321" });

      const users = await db("users");
      expect(users).toHaveLength(2);
    });
  });

  describe("remove()", () => {
    it("should remove BP from db by id", async () => {
      await Users.add({ username: "PB", password: "1234" });
      await Users.add({ username: "BP", password: "4321" });

      await Users.remove(2);

      const users = await db("users");
      expect(users).toHaveLength(1);
    });
  });
});
