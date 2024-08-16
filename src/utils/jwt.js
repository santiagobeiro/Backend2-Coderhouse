import jwt from "jsonwebtoken";

const PRIVATE_KEY = "merenguetengue";

export function generateToken(payload) {
  return jwt.sign(payload, PRIVATE_KEY, {
    expiresIn: "45m",
  });
}

export function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, PRIVATE_KEY);

    return decoded;
  } catch (error) {
    throw new Error("Token no valido");
  }
}
