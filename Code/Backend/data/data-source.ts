import { DataSource, DataSourceOptions } from "typeorm";

export const dataSourceOptions:DataSourceOptions={
    type: 'mysql',
    host: process.env.DB_HOST,
    //host:'localhost',
    port: 3306,
    username: process.env.MYSQL_USER,
    //username:'root',
    password: process.env.MYSQL_ROOT_PASSWORD,
    //password:'Database2233',
    database: process.env.MYSQL_DATABASE,
    //database:'restaurants',
    entities: ['dist/src/typeorm/entities/**/*.js'],
    migrations: ['dist/data/migrations/*.js'],
}
const dataSource=new DataSource(dataSourceOptions);
export default dataSource;
