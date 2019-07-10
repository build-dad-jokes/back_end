const db = require("../data/dbConfig");
const Users = require("./usersModel");

describe("users model", () => {
  beforeEach(() => {
    return db("users").truncate();
  });

  describe("insert()", () => {
    it("should insert the provided user into db", async () => {
      await Users.insert({ username: "PB", password: "1234" });

      const users = await db("users");
      expect(users).toHaveLength(2);
    });
  });

  describe("remove()", () => {
    it("should remove pfunk from db by id", async () => {
      //   await Users.insert({ username: "PB" });
      await Users.remove(2);

      const users = await db("users");
      expect(users).toHaveLength(1);
    });
  });
});
