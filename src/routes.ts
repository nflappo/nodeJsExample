import { Router } from "express";
import { AuthenticatedUser, Login, Logout, Register, UpdateInfo, UpdatePassword } from "./controllers/auth.controller";
import { AuthMiddleware } from "./middlewares/auth.middleware";
import { Ambassadors } from "./controllers/user.controller";
import { GetProductById, Products } from "./controllers/product.controller";
import { Links } from "./controllers/link.controller";
import { Orders } from "./controllers/order.controller";

 
export const routes = (router: Router) => {
    router.post('/api/admin/register', Register);
    router.post('/api/admin/login', Login);
    router.post('/api/admin/logout',AuthMiddleware, Logout);
    router.get('/api/admin/user',AuthMiddleware, AuthenticatedUser);
    router.put('/api/admin/users/info', AuthMiddleware, UpdateInfo);
    router.put('/api/admin/users/password', AuthMiddleware, UpdatePassword);

    router.get('/api/admin/ambassadors', AuthMiddleware, Ambassadors);

    router.get('/api/admin/products',AuthMiddleware, Products);
    router.get('/api/admin/products/:id',AuthMiddleware, GetProductById);

    router.get('/api/admin/users/:id/links',AuthMiddleware, Links);
    router.get('/api/admin/orders',AuthMiddleware, Orders);
};