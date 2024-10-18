import jwt from "jsonwebtoken";

export const generateJwt = (payload: object): string => {
  // Better to move this to the index.js at the beginning so that
  //it is checked first and the pod wont even create if JWT is not present
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY not found!");
  }

  return jwt.sign(payload, process.env.JWT_KEY);
};
