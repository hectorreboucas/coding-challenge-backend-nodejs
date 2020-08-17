import { ReportService } from "./services/ReportService";
import { UserService } from "./services/UserService";
import { PoliceService } from "./services/PoliceService";
import { App } from "./App";
import { IReportService } from "./services/interfaces/IReportService";
import { IUserService } from "./services/interfaces/IUserService";
import { sequelize } from "./database";

export class DependencyManager {
    static reportService: IReportService;
    static userService: IUserService;
    static policeService: PoliceService;
    static app: App;

    static async load() {
        await sequelize.authenticate();
        await sequelize.sync();
        DependencyManager.reportService = new ReportService();
        DependencyManager.userService = new UserService();
        DependencyManager.policeService = new PoliceService();
        DependencyManager.app = new App(DependencyManager.userService, DependencyManager.policeService, DependencyManager.reportService);
    }
}