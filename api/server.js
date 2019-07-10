const express = require("express");

const configMiddleware = require("./middleware");
const authRouter = require("../auth/auth-router");
const usersRouter = require("../users/users-router");
const jokesRouter = require("../jokes/jokes-router");

const server = express();

configMiddleware(server);

server.use("/api/auth", authRouter);
server.use("/api/users", usersRouter);
server.use("/api/jokes", jokesRouter);

server.get("/", (req, res) => {
  res.status(200).json({ message: "It's alive!" });
});

module.exports = server;
