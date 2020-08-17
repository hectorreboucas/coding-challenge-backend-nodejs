import { Model, Table, AutoIncrement, PrimaryKey, Column } from "sequelize-typescript";

export interface ReportI {
    id?: number;
    title: string;
    description: string;
    state: ReportState;
    userId: number;
    policeId: number;
    createdAt: Date;
    assignedAt: Date;
    resolvedAt: Date;
}

@Table({
    tableName: "report",
    timestamps: true
})
export default class Report extends Model implements ReportI {
    @AutoIncrement
    @PrimaryKey
    @Column
    id?: number;
    @Column
    title!: string;
    @Column
    description!: string;
    @Column
    state!: ReportState;
    @Column
    userId!: number;
    @Column
    policeId!: number;
    @Column
    createdAt!: Date;
    @Column
    assignedAt!: Date;
    @Column
    resolvedAt!: Date;
}

export enum ReportState {
    UNASSIGNED = "UNASSIGNED",
    ASSIGNED = "ASSIGNED",
    RESOLVED = "RESOLVED"
}

export class ReportFilter {
    state?: ReportState;
    userId?: number;
    policeId?: number;
}