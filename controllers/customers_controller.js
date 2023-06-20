
import errors from 'restify-errors'
import { ObjectId } from 'mongodb';
import {Customer} from '../models/customers_model.js'
import asyncwrapper from './async_wrapper.js'

//? using asyncwrapper
//$ GET
export const getAllCustomers = asyncwrapper(async (req, res, next) => {
    try {
        const customers = await Customer.find({});
        res.json(customers);
        next();
    } catch(err) {
        return next(new errors.InvalidContentError(err));
    }
});

//? using .then() and .catch()

//$GET
export const getCustomer = (req, res, next) => {
    Customer.findById(new ObjectId(req.params.customerId)).then((customer, err) => {
        if(customer === null) {
            throw err;
        }
        res.json(customer);
        next();
    }).catch((err) => {
        return next(new errors.ResourceNotFoundError("There is no such resource"));
    });
}

//$ POST
export const setCustomer = (req, res, next) => {
    Customer.create(req.body).then(() => {
        res.send("POST done");
        next();
    }).catch ((err) => {
        return next(new errors.InvalidContentError(err));
    });
}

export const updateCustomer = (req, res, next) => {
    Customer.findOneAndUpdate(
        {"_id" : new ObjectId(req.params.contactId)},
        req.body,
        {new: true}
    ).then((customer, err) => {
        if(customer === null) {
            throw err;
        }
        res.json(customer);
        next();
    }).catch((err) => {
        return next(new errors.ResourceNotFoundError("There is no such resource"));
    });
}

export const deleteCustomer = (req, res, next) => {
    let id = req.params.contactId;
    Customer.deleteOne(
        {"_id" : new ObjectId(id)}
    ).then((customer, err) => {
        res.send(`DELETE ${id} Succesfull`);
        next();
    }).catch((err) => {
        return next(new errors.ResourceNotFoundError("There is no such resource"));
    });
}
