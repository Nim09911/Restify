import restify from 'restify';
import mongoose from "mongoose";

import {config} from "./config.js";
import {Routes} from './routes/routes.js';

const server = restify.createServer();
Routes(server);

// Middleware
server.use(restify.plugins.bodyParser({requestBodyOnGet: true}));

server.listen(config.PORT, () => {
  mongoose.connect(
    config.MONGODB_URI, 
    { useNewUrlParser: true }
  );
});

const db = mongoose.connection;
db.on('error', (error) => console.log(error));

db.once('open', () => {
  console.log(`Server started on ${config.PORT}...`);
});
