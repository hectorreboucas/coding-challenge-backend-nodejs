let express = require('express');
import { Application, NextFunction, Request, Response } from 'express';
import { ReportController } from './controllers/ReportController'
import { DependencyManager } from './DepencyManager';
import { PoliceController } from './controllers/PoliceController';
import { UserController } from './controllers/UserController';
import { ItemNotFound } from './exceptions/ItemNotFound';
let swaggerHelper = require('./swaggerHelper');

(async () => {

    let app: Application = express();

    app.use(express.json());

    await DependencyManager.load();

    let service = DependencyManager.app;

    let controllers = {
        "reportController": new ReportController(service),
        "policeController": new PoliceController(service),
        "userController": new UserController(service)
    };

    swaggerHelper.setSwagger(app, "./swagger.yaml", controllers);

    app.use((error: Error, _req: Request, res: Response, _next: NextFunction) => {
        if (error instanceof ItemNotFound) {
            res.status(404);
            res.json({ message: "not found" });
            res.send();
        } else {
            res.status(500);
            res.json({ message: "internal server error" });
            res.send();
        }
    });

    app.listen(3000, () => console.log(`API listening on port ${3000}!`));

})();

