import { Sequelize } from "sequelize-typescript";


export const sequelize = new Sequelize(
    process.env.PGDATABASE as string,
    process.env.PGUSER as string,
    process.env.PGPASSWORD as string,
    {
        host: process.env.PGHOST as string,
        dialect: "postgres",
        models: [__dirname + '/model']
    }
)