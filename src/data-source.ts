import 'reflect-metadata'
import { DataSource } from 'typeorm'
import dotenv from 'dotenv'

dotenv.config()

if (!process.env.DB_HOST) {
    throw new Error('DB_HOST is not set in .env file');
}

if (!process.env.DB_PORT) {
    throw new Error('DB_PORT is not set in .env file');
}

if (!process.env.DB_USER) {
    throw new Error('DB_USER is not set in .env file');
}

if (!process.env.DB_PASSWORD) {
    throw new Error('DB_PASSWORD is not set in .env file');
}

if (!process.env.DB_NAME) {
    throw new Error('DB_NAME is not set in .env file');
}

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [__dirname + '/models/*.js'],
    migrations: [__dirname + '/migrations/*.js'],
    synchronize: false,
    logging: false,
})
