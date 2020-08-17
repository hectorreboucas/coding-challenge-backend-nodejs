const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
import { Application } from 'express';


exports.setSwagger = (app: Application, swaggerFile: string, controllers: any) => {
    const document = YAML.load(swaggerFile);
    app.use('/', swaggerUi.serve)
    app.get('/', swaggerUi.setup(document, false));
    buildRoutes(app, document, controllers);
}


function buildRoutes(app: any, document: any, controllerDic: any): void {
    for (let pathName in document.paths) {
        let path = document.paths[pathName];
        let controllerName = path["x-controller"];
        let controller = controllerDic[controllerName];
        for (let method in path) {
            if (["get", "post", "put", "delete"].includes(method)) {
                console.log(method);
                console.log(pathName);
                console.log(controller[path[method].operationId]);
                app[method](pathName, controller[path[method].operationId]);
            }
        }
    }
}