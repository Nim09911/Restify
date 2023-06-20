import errors from 'restify-errors';
import bcrypt from 'bcryptjs';
import {User} from '../models/users_model.js'
import asyncwrapper from './async_wrapper.js';
import {config} from '../config.js';
import jwt from 'jsonwebtoken'

export const registerUser = (req, res, next) => {
    const {email, password} = req.body;
    const user = new User({
        email: email,
        password: password
    })

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
            // Hash password
            user.password = hash;
            // save user
            user.save().then((user) => {
                res.send(user);
            }).catch((err) => {
                return next(new errors.InternalError(err.message));
            })
        });
    })
}

// function to authenticate users
const authenticate = (email, password) => {
    // .then() is resolve
    // .catch() is reject
    return new Promise( async (resolve, reject) => {
        // Get user by email
        try {
            const user = await User.findOne({email: email});

            // Match password if user found
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if(err) throw err;
                if(isMatch) {
                    resolve(user);
                }
                else {
                    reject("Incorrect password");
                }
            })
        } catch(err) {
            reject("Incorrect username or password");
        }
    })
}

export const authUser = asyncwrapper( async(req, res, next) => {
    const {email, password} = req.body;
    try {
        // Authenticate user
        const user = await authenticate(email, password);
        // create JWT
        const token = jwt.sign({email}, config.JWT_SECRET, {expiresIn: '5m'});
        // iat-issuedAt, exp-expiresIn
        const {iat, exp} = jwt.decode(token);
        
        res.send({email, iat, exp, token});
        next();
    } catch (err) {
        return next(new errors.UnauthorizedError(err));
    }
});