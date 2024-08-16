import { Router } from "express";
import { userModel } from "../Daos/models/user.model.js";
import { createHash } from "../utils/hash.js";
import { generateToken } from "../utils/jwt.js";
import passport from "passport";
import * as service from '../services/cart.services.js'

const router = Router();

router.post("/register", async (req, res) => {
  const { first_name, last_name, age, email, role, password } = req.body;

  if (!first_name || !last_name || !email || !password || !age) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  try {
    const hashPassword = await createHash(password);

    const userCart = await await service.createCart();

    const user = await userModel.create({
      first_name,
      last_name,
      age,
      email,
      password: hashPassword,
      role,
      cart: userCart._id,
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post(
  "/login",
  passport.authenticate("login", {
    session: false,
    failureRedirect: "/api/auth/login-error",
  }),
  async (req, res) => {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ error: "Credenciales incorrectas" });
    }

    const payload = {
        first_name: user.first_name,
        last_name: user.last_name,
      email: user.email,
      role: user.role,
      cart: user.cart
    };

    const token = generateToken(payload);

    res.cookie("access-token", token, { maxAge: 900000, httpOnly: true });

    res.status(200).json({ message: "Sesion Iniciada", token: token });
  }
);

router.get("/login-error", (req, res) => {
  res.status(401).json({ error: "Credenciales incorrectas" });
});

router.get(
  "/current",
  passport.authenticate("current", { session: false }),
  (req, res) => {
    res.status(200).json({ message: "bienvenido", user: req.user });
  }
);

export default router;
