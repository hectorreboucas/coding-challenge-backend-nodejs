import { Model, Table, AutoIncrement, PrimaryKey, Column } from "sequelize-typescript";

export interface UserI {
    id?: number;
    name: string;
}

@Table({
    tableName: "user",
    timestamps: true
})

export default class User extends Model implements UserI {
    @AutoIncrement
    @PrimaryKey
    @Column
    id?: number;
    @Column
    name!: string;
}