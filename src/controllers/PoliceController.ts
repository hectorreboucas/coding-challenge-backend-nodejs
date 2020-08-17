import { Request, Response, NextFunction } from 'express';
import { App } from '../App';
import { PoliceState } from '../model/Police';
import { ItemNotFound } from '../exceptions/ItemNotFound';

export class PoliceController {
    app: App;

    constructor(app: App) {
        this.app = app;
    }

    createPolice = async (req: Request, res: Response, _next: NextFunction) => {
        const { name } = req.body;
        let police = await this.app.createPolice(name);
        res.json(police);
    }

    getPoliceList = async (req: Request, res: Response, _next: NextFunction) => {
        const { state } = req.query;
        let policeList = await this.app.getPoliceList(state as PoliceState);
        res.json(policeList);
    }

    getPolice = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.query;
            let police = await this.app.getPolice(+(id as string));
            if (!police)
                throw new ItemNotFound();
            res.json(police);
        } catch (e) {
            next(e);
        }
    }

}