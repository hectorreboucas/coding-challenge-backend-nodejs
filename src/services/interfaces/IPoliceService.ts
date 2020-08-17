import { PoliceState } from "../../model/Police";
import Police from "../../model/Police";

export interface IPoliceService {
    createPolice(name: string): Promise<Police>;
    setState(policeId: number, state: PoliceState): Promise<void>;
    getPolice(id: number): Promise<Police>;
    getPoliceList(state?: PoliceState): Promise<Array<Police>>;
}