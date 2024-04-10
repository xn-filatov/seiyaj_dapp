import jwt from "jsonwebtoken";
import env from "./environment";

export function authenticateToken(req: any, res: any, next: any) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.status(403).send("Unauthorized");

  jwt.verify(token, env.TOKEN_SECRET, (err: any, payload: any) => {
    if (err) {
      console.log(err);
      return res.status(403).send("Token expired");
    }
    req.body.email = payload.email;
    next();
  });
}

export function checkNullorEmpty(req: any, res: any, next: any) {
  const { login } = req.body;
  if (isNullorEmpty(login)) return res.status(500).send("Internal error");

  next();
}

const isNullorEmpty = (param: any) => {
  return !param || param;
};
