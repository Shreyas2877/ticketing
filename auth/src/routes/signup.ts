import express from 'express';
import { Request, Response } from 'express';
import { body } from 'express-validator';
import { validationResult } from 'express-validator';
import { DatabaseConnectionError } from '../errors/database-connection-error';
import { RequestValidationError } from '../errors/request-validation-error';

const router = express.Router();

router.post('/api/users/signup', [
    body('email')
        .isEmail()
        .withMessage('Please enter a valid email'),
    body('password')
        .trim()
        .isLength({ min: 4 })
        .withMessage('Password must be at least 4 chars long')
] ,(req : Request, res: Response) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        throw new RequestValidationError(errors.array());
    }

    const { email, password } = req.body;

    console.log("Creating user...");

    throw new DatabaseConnectionError();

    return res.status(200).json({});
});

export { router as userSignupRoute }