    require('dotenv').config()
    import http from "http";
    import express from "express";
    import { applyMiddleware, applyRoutes } from "./utilities";
    import commonMiddelwares from "./middlewares/common";
    import staticsResources from "./middlewares/statics";
    import errorsHandlers from "./middlewares/errorHandlers";
    import routes from "./routes";
    const sqlStorage = require('sql_storage_system')


    const router = express();
    applyMiddleware(commonMiddelwares, router);
    applyRoutes(routes, router);
    // applyMiddleware(staticsResources, router);
    // applyMiddleware(errorsHandlers, router);

    // sqlStorage.sqlSetup(process.env.dbHost, process.env.dbUser, process.env.dbPassword, process.env.dbName);
    // const { hostname = 'localhost' } = process.env;
    // const { port = 3030 } = process.env;
    // const server = http.createServer(router);

    // server.listen(port, () =>
    //   console.log(`Server is running ${hostname}:${port}...`)
    // );

    