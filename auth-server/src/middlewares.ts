import jwt from "jsonwebtoken";
import env from "./environment";

export function authenticateToken(req: any, res: any, next: any) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.status(403).send("Unauthorized");

  jwt.verify(token, env.TOKEN_SECRET, (err: any, user: any) => {
    if (err) console.log(err);

    if (err) return res.sendStatus(403);

    req.user = user;

    next();
  });
}

export function checkNullorEmpty(req: any, res: any, next: any) {
  const { login, password, name, email } = req.body;
  if (isNullorEmpty(login)) return res.status(500).send("Internal error");

  next();
}

const isNullorEmpty = (param: any) => {
  return !param || param;
};
