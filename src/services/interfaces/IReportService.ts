import { ReportFilter, ReportState } from "../../model/Report";
import Report from "../../model/Report";
import User from "../../model/User";

export interface IReportService {
    createReport(title: string, description: string, user: User): Promise<Report>;
    getReport(id: number): Promise<Report>;
    getReportList(filter: ReportFilter): Promise<Array<Report>>;
    changeReportState(reportId: number, state: ReportState): Promise<void>;
    assignReport(policeId: number, reportId: number): Promise<void>;
}