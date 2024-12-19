import express from 'express'
import routes from './routes'
import bodyParser from 'body-parser'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import dotenv from 'dotenv'
import errorHandlerMiddleware from '@/middlewares/errorHandler'
import { AppDataSource } from "@/data-source"
import http from 'http'
dotenv.config()

AppDataSource.initialize().then(() => {
    console.log('Database connected')
}).catch((error) => {
    console.log(error)
    process.exit(1)
})


const app = express()
const port = process.env.PORT || 3000

app.use(morgan('dev'))
app.use(helmet())
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/public', express.static('public'))

app.use('/', routes)
app.use(errorHandlerMiddleware)

const server = http.createServer(app)
server.timeout = 15000

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})
