import express from "express";
import { Request, Response } from "express";
import { body } from "express-validator";
import { User } from "../models/user";
import { UserExistsError } from "../errors/user-exists-error";
import { generateJwt } from "../util/jwt";
import { validateRequest } from "../middlewares/validate-request";

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
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      console.log("Email in use");
      throw new UserExistsError("Email in use");
    }

    const user = User.build({ email, password });

    await user.save();

    // Generate JWT
    const userJwt = generateJwt({
      id: user.id,
      email: user.email,
    });

    // Store it in session
    req.session = {
      jwt: userJwt,
    };

    console.log("User Created", user);
    res.status(201).send(user);
  }
);

export { router as userSignupRoute };
