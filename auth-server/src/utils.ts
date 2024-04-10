import jwt from "jsonwebtoken";
import env from "./environment";

export function generateAccessToken(email: string) {
  return jwt.sign({ email }, env.TOKEN_SECRET, { expiresIn: "1h" });
}
