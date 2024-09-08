import { Router } from "express";
import * as cartController from "../controllers/cart.controller.js";
import passport from "passport";
import { roleValidation } from "../middlewares/rolevalidation.js";

// instancias

const cartRouter = Router();

// rutas para carts

cartRouter.get("/", passport.authenticate("jwt",{session: false}), roleValidation(['admin']), cartController.getAllCarts)

cartRouter.get("/:cid", passport.authenticate("jwt",{session: false}), roleValidation(['admin','user']), cartController.getCartById);

cartRouter.post("/", passport.authenticate("jwt",{session: false}), roleValidation(['admin','user']), cartController.createCart);

cartRouter.post("/:cid/product/:pid", passport.authenticate("jwt",{session: false}), roleValidation(['admin','user']), cartController.addProductToCart);

cartRouter.put("/:cid", passport.authenticate("jwt",{session: false}), roleValidation(['admin','user']), cartController.updateCart);

cartRouter.put("/:cid/product/:pid", passport.authenticate("jwt",{session: false}), roleValidation(['admin','user']), cartController.updateProdQuantity);

cartRouter.delete("/:cid/erase", passport.authenticate("jwt",{session: false}), roleValidation(['admin']), cartController.deleteCart);

cartRouter.delete("/:cid/product/:pid", passport.authenticate("jwt",{session: false}), roleValidation(['admin','user']), cartController.removefromCart);

cartRouter.delete("/:cid", passport.authenticate("jwt",{session: false}), roleValidation(['admin','user']), cartController.clearCart);

cartRouter.get('/:cid/purchase',passport.authenticate("jwt",{session: false}), roleValidation(['admin','user']), cartController.purchase)

export default cartRouter;