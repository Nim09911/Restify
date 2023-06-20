import Router from 'restify-router';
import rjwt from 'restify-jwt-community';

import { getAllCustomers, setCustomer, getCustomer, updateCustomer, deleteCustomer } from "../controllers/customers_controller.js";
import {authUser, registerUser} from "../controllers/users_controller.js"
import { config } from '../config.js';


export const Routes  = (server) => {
    
    const router = new Router.Router();

    
    // customer controllers
    router.get('/customers', rjwt({secret: config.JWT_SECRET}), getAllCustomers);
    router.get('/customers/:customerId', rjwt({secret: config.JWT_SECRET}), getCustomer);
    router.post('/customers/set', rjwt({secret: config.JWT_SECRET}), setCustomer);
    router.put('/customers/:contactId',rjwt({secret: config.JWT_SECRET}), updateCustomer);
    router.del('/customers/:contactId',rjwt({secret: config.JWT_SECRET}), deleteCustomer);

    // user controllers
    router.post('/register',registerUser);
    router.post('/login', authUser);

    //apply and protect routes
    // server.use(rjwt({"secret": config.JWT_SECRET}).unless({"path": ['/login']}));
    router.applyRoutes(server);
}