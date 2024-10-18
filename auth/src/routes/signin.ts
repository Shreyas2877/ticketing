import express, { Request, Response } from "express";
import { body } from "express-validator";
import { validateRequest } from "../middlewares/validate-request";
import { User } from "../models/user";
import { BadRequestError } from "../errors/bad-request-error";
import { Password } from "../services/passwords";
import { generateJwt } from "../util/jwt";

const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("password").trim().notEmpty().withMessage("Password is required"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      throw new BadRequestError("Invalid credentials");
    }
    const passwordMatch = await Password.compare(user.password, password);
    if(!passwordMatch){
      throw new BadRequestError("Invalid credentials");
    }
    const userJwt = generateJwt({
      id: user.id,
      email: user.email,
    })

    req.session = {
      jwt: userJwt,
    };
    res.status(200).send(user);
  }
);

export { router as userSigninRouter };
