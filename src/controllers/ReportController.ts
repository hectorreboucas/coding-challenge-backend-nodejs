import { Request, Response, NextFunction } from 'express';
import { App } from '../App';
import { ItemNotFound } from '../exceptions/ItemNotFound';

export class ReportController {
    app: App;

    constructor(app: App) {
        this.app = app;
    }

    getReport = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let { id } = req.query;
            let report = await this.app.getReport(+(id as string));
            if (!report)
                throw new ItemNotFound();
            res.json(report);
            res.send();
        } catch (e) {
            next(e);
        }
    }

    getReportList = async (req: Request, res: Response, _next: NextFunction) => {
        let filter = req.query;
        let reportList = await this.app.getReportList(filter);
        res.json(reportList);
        res.send();
    }

    createReport = async (req: Request, res: Response, _next: NextFunction) => {
        try {
            const { title, description, userId } = req.body;
            let report = await this.app.createReport(title, description, userId);
            res.json(report);
            res.send();
        } catch (e) {
            console.log(e);
            res.status(404);
            res.send();
        }
    }

    resolveReport = async (req: Request, res: Response, _next: NextFunction) => {
        try {
            const { reportId } = req.body;
            let report = await this.app.resolveReport(reportId);
            res.json(report);
            res.send();
        } catch (e) {
            console.log(e);
            res.status(404);
            res.send();
        }
    }
}