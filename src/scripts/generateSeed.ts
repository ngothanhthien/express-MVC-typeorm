import {AppDataSource} from "@/data-source"
import { candidateSeed } from "@/seeds/candidate"

AppDataSource.initialize().then(async () => {
    await candidateSeed()
    process.exit(0)
}).catch((error) => {
    console.log(error)
    process.exit(1)
})
