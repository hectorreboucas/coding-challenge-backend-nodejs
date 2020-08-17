import { ReportState } from "../src/model/Report";
import { ReportService } from "../src/services/ReportService";
import { UserService } from "../src/services/UserService";
import { PoliceService } from "../src/services/PoliceService";
import { App } from "../src/App";
import { PoliceState } from "../src/model/Police";
import { Sequelize } from "sequelize-typescript";
import User from "../src/model/User";
const sequelize = new Sequelize({ validateOnly: true, models: ['../src/model'] });

describe('Application', function () {
    let app: App;
    let user: User;

    describe('Report and Police creation', function () {

        beforeAll(async () => {
            await sequelize.authenticate();
            await sequelize.sync();
            let reportService = new ReportService();
            let userService = new UserService();
            let policeService = new PoliceService();
            app = new App(userService, policeService, reportService);
            user = await app.createUser("user1");
            await app.createPolice("police1");
        });

        it('report state should be ASSIGNED', async function () {
            let report = await app.createReport("title1", "description1", user.id as number);
            expect(report.state).toEqual(ReportState.ASSIGNED.toString());
        });

        it('report state should be UNASSINED', async function () {
            let report = await app.createReport("title2", "description1", user.id as number);
            expect(report.state).toEqual(ReportState.UNASSIGNED.toString());
        });

        it('police state should be BUSY', async function () {
            let police = await app.createPolice("police2");
            expect(police.state).toEqual(PoliceState.BUSY.toString());
        });

        it('police state should be FREE', async function () {
            let police = await app.createPolice("police3");
            expect(police.state).toEqual(PoliceState.FREE.toString());
        });


        /*afterAll(async () => {
            await db.collection("report").deleteMany({ title: { $in: ["title1", "title2", "title3"] } });
            await db.collection("police").deleteMany({ name: { $in: ["police1", "police2", "police3"] } });
            await db.collection("user").deleteMany({ name: { $in: ["user1"] } });
            await mongoClient.close();
        });*/

    });

});
