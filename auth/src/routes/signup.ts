import express from "express";
import { Request, Response } from "express";
import { body } from "express-validator";
import { validationResult } from "express-validator";
import { DatabaseConnectionError } from "../errors/database-connection-error";
import { RequestValidationError } from "../errors/request-validation-error";
import { User } from "../models/user";
import { UserExistsError } from "../errors/user-exists-error";

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("password")
      .trim()
      .isLength({ min: 4 })
      .withMessage("Password must be at least 4 chars long"),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log("Entered here!");
      throw new RequestValidationError(errors.array());
    }

    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      console.log("Email in use");
      throw new UserExistsError("Email in use");
    }

    const user = User.build({ email, password });

    await user.save();

    console.log("User Created", user);
    res.status(201).send(user);
  }
);

export { router as userSignupRoute };
