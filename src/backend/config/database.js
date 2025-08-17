import oracledb from "oracledb";

import dotenv from "dotenv";

dotenv.config();

export const dbPool = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    connectionString: process.env.DB_CONNECTION_STRING,
    poolMin: +process.env.DB_POOL_MIN,
    poolMax: +process.env.DB_POOL_MAX,
    poolIncrement: +process.env.DB_POOL_INCREMENT,
    outFormat: oracledb.OUT_FORMAT_OBJECT, // oracledb.OBJECT
};
