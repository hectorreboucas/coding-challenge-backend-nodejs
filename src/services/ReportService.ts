import { ReportFilter, ReportState } from "../model/Report";
import Report from "../model/Report";
import { IReportService } from "./interfaces/IReportService";
import User from "../model/User";
import { ItemNotFound } from "../exceptions/ItemNotFound";

export class ReportService implements IReportService {

    async createReport(title: string, description: string, user: User): Promise<Report> {
        const report = new Report({
            title,
            description,
            state: ReportState.UNASSIGNED,
            userId: user.id
        });

        await report.save();

        return report;
    }

    async getReport(id: number): Promise<Report> {
        const result = await Report.findByPk(id);
        if (result == null)
            throw new ItemNotFound();

        return result;
    }

    async getReportList(reportFilter: ReportFilter): Promise<Report[]> {
        return await Report.findAll({ where: (reportFilter) as any });
    }

    async changeReportState(reportId: number, state: ReportState) {
        let report = await Report.findByPk(reportId);
        if (report == null) {
            throw new ItemNotFound();
        }

        report.state = state;
        report.resolvedAt = new Date();

        await report.save();
    }

    async assignReport(policeId: number, reportId: number): Promise<void> {
        let report = await Report.findByPk(reportId);
        if (report == null) {
            throw new ItemNotFound();
        }

        report.state = ReportState.ASSIGNED;
        report.assignedAt = new Date();
        report.policeId = policeId;

        await report.save();
    }
}