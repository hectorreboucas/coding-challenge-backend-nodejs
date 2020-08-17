import { ReportState, ReportFilter } from "./model/Report";
import Report from "./model/Report";
import { PoliceState } from "./model/Police";
import Police from "./model/Police";
import { IUserService } from "./services/interfaces/IUserService";
import { IReportService } from "./services/interfaces/IReportService";
import { IPoliceService } from "./services/interfaces/IPoliceService";
import User from "./model/User";

export class App {

    private userService: IUserService;
    private policeService: IPoliceService;
    private reportService: IReportService;

    constructor(userService: IUserService, policeService: IPoliceService, reportService: IReportService) {
        this.userService = userService;
        this.policeService = policeService;
        this.reportService = reportService;
    }

    public async createUser(name: string): Promise<User> {
        let user = await this.userService.createUser(name);
        await this.assignReports();
        return this.userService.getUser(user.id as number);
    }

    public async getUser(id: number): Promise<User> {
        return await this.userService.getUser(id);
    }

    public async getUserList(): Promise<Array<User>> {
        return await this.userService.getUserList();
    }

    public async createPolice(name: string): Promise<Police> {
        let police = await this.policeService.createPolice(name);
        await this.assignReports();
        return this.policeService.getPolice(police.id as number);
    }

    public async getPoliceList(state?: PoliceState): Promise<Array<Police>> {
        return await this.policeService.getPoliceList(state);
    }

    public async getPolice(id: number): Promise<Police> {
        return await this.policeService.getPolice(id);
    }

    public async createReport(title: string, description: string, userId: number): Promise<Report> {
        let user = await this.userService.getUser(userId);
        let report = await this.reportService.createReport(title, description, user);
        await this.assignReports();
        return this.reportService.getReport(report.id as number);
    }

    public async getReportList(filter: ReportFilter): Promise<Array<Report>> {
        return await this.reportService.getReportList(filter);
    }

    public async getReport(id: number): Promise<Report> {
        return await this.reportService.getReport(id);
    }

    public async resolveReport(reportId: number) {
        let report = await this.reportService.getReport(reportId);
        let police = await this.policeService.getPolice(report.policeId);
        await this.reportService.changeReportState(reportId, ReportState.RESOLVED);
        await this.policeService.setState(police.id as number, PoliceState.FREE);
        await this.assignReports();
    }

    protected async assignReports(): Promise<void> {
        let freePolices = await this.policeService.getPoliceList(PoliceState.FREE);
        let unsignedReports = await this.reportService.getReportList({ state: ReportState.UNASSIGNED });
        if (freePolices.length > 0 && unsignedReports.length > 0) {
            for (let police of freePolices) {
                if (unsignedReports.length < 1)
                    break;

                let report = unsignedReports.pop();

                if (report) {
                    await this.reportService.assignReport(police.id as number, report.id as number);
                    await this.policeService.setState(police.id as number, PoliceState.BUSY);
                }
            }
        }
    }
}