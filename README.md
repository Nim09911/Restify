# RESTify
_A Node.js web service framework optimized for building semantically correct RESTful web services ready for production use at scale. restify optimizes for introspection and performance, and is used in some of the largest Node.js deployments on Earth._\
It has similar syntax and functionalities as express.
<br>

## Setup Server
---
```js
    import restify from 'restify';
    const PORT = 3000;

    const server = restify.createServer();
    server.get('/', (req, res, next) => {
        res.send("GET request succesfull!");
        res.end();
        //! make sure to call next to move
        //! to next code block
        next();
    });

    server.listen(PORT, () => {
        console.log(`Server listening at port ${PORT}...`);
    });
```
## Using next()
---
* Unlike many frameworks where res.send() triggers next() automatically, restify does not do that
* The developer is responsible to call next().
* Normally next() doesn't need any parameters, but can accept them.

## Handler chains
---
* pre - a handler chain executed prior to routing
* use - a handler chain executed post routing
* {httpVerb} - a handler chain executed specific to a route

All accept either a single function, multiple functions, or an array of functions.\
? See more about these in plugins

### server.pre()
* server.pre() is executed before routing.
* server.pres() will execute for an incoming request even if it’s for a route that you did not register.
* Can be useful for logging metrics or for cleaning up the incoming request before routing it.

### server.use()
* server.use() is executed after a route has been chosen to service the request.
* Function handlers attached to server.use() will run for all routes.
* ! restify runs handlers in the order they are mentioned.

## Routing
---
* Basic routing (see Server setup)
* Routing using RegEx
* Hypermedia - Parameterised routing
* Versioned routing
* Protected routing

## Restify-router
---
Helps you write all your routes in one place:

```js
    //routes.js
    import Router from 'restify-router';
    import {getController} from './controller.js';

    export const Routes = (server) => {
        
        const router = new Router.Router();
        router.get('/get', getController);
        // add more routes here
        router.applyRoutes(server);
    }
```
```js
    //controller.js
    export const getController = (req, res, next) => {
        res.send("GET message succesful");
        res.next();
    }
```
```js
    //index.js
    import restify from 'restify';
    import {Routes} from './routes.js';
    const PORT = 3000;

    const server = restify.createServer();
    Routes(server);

    server.listen(PORT, () => {
        console.log(`Server listening at port ${PORT}...`);
    });
```
