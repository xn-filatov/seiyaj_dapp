import jwt from "jsonwebtoken";
import env from "./environment";

export function generateAccessToken(login: string) {
  return jwt.sign(login, env.TOKEN_SECRET /*, { expiresIn: "10h" }*/);
}
