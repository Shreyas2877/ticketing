import express from "express";
import mongoose from "mongoose";
import "express-async-errors";
import bodyParser from "body-parser";
import { currentUserRouter } from "./routes/current-user";
import { userSignupRoute } from "./routes/signup";
import { userSigninRouter } from "./routes/signin";
import { userSignoutRouter } from "./routes/signout";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";

import { DatabaseConnectionError } from "./errors/database-connection-error";
import { connectDB } from "./config/db";

const app = express();

app.use(bodyParser.json());
app.use(currentUserRouter);
app.use(userSignupRoute);
app.use(userSigninRouter);
app.use(userSignoutRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.post("*", () => {
  throw new NotFoundError();
});

app.use(errorHandler);

const startUp = async () => {
  connectDB();
  app.listen(3000, () => {
    console.log("Server is running on port 3000!");
  });
};

startUp();
