import fs from 'fs'
import path from 'path'
import crypto from 'crypto'

const envPath = path.resolve(__dirname, '../../.env')

const generateSecret = (): string => {
    return crypto.randomBytes(32).toString('hex')
};

let envFileContent = ''
if (fs.existsSync(envPath)) {
    envFileContent = fs.readFileSync(envPath, { encoding: 'utf-8' })
} else {
    console.log('File .env not found')
}

const jwtSecretRegex = /^JWT_SECRET=.*$/m
const newSecret = generateSecret()

if (jwtSecretRegex.test(envFileContent)) {
    envFileContent = envFileContent.replace(jwtSecretRegex, `JWT_SECRET=${newSecret}`)
} else {
    envFileContent += `\nJWT_SECRET=${newSecret}\n`
}

fs.writeFileSync(envPath, envFileContent, { encoding: 'utf-8' })

console.log('Success generate JWT_SECRET')
