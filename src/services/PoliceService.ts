import { IPoliceService } from "./interfaces/IPoliceService";
import { PoliceState } from "../model/Police";
import Police from "../model/Police";
import { ItemNotFound } from "../exceptions/ItemNotFound";


export class PoliceService implements IPoliceService {

    async createPolice(name: string): Promise<Police> {
        let police = new Police({ name, state: PoliceState.FREE });
        await police.save();
        return police;
    }

    async setState(policeId: number, state: PoliceState): Promise<void> {
        const police = await Police.findByPk(policeId);
        if (police == null)
            throw new ItemNotFound();
        police.state = state;
        await police.save();
    }

    async getPolice(id: number): Promise<Police> {
        const result = await Police.findByPk(id);
        if (result == null)
            throw new ItemNotFound();
        return result;
    }

    async getPoliceList(state?: PoliceState): Promise<Police[]> {
        if (state) {
            return Police.findAll({ where: { state: state } });
        } else {
            return Police.findAll();
        }
    }
}