import { Model, Table, AutoIncrement, PrimaryKey, Column } from "sequelize-typescript";

export enum PoliceState {
    FREE = "FREE",
    BUSY = "BUSY"
}

export interface PoliceI {
    id?: number;
    name: string;
    state: PoliceState;
}

@Table({
    tableName: "police",
    timestamps: true
})
export default class Police extends Model implements PoliceI {
    @AutoIncrement
    @PrimaryKey
    @Column
    id?: number;
    @Column
    name!: string;
    @Column
    state!: PoliceState;
}