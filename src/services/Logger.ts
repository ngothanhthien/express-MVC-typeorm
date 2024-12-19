import { createLogger, format, transports } from 'winston'
import { DiscordTransportStream } from '@/plugins/winston'

const discordWebhookUrl: string = process.env.EXCEPTION_WEBHOOK_URL || ''

if (!discordWebhookUrl) {
    throw new Error('DISCORD_WEBHOOK_URL is not defined in environment variables.')
}

const logger = createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.printf(({ level, message, timestamp, ...meta }) => {
            const metaString = Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ''
            return `${timestamp} [${level}]: ${message} ${metaString}`
        })
    ),
    transports: [
        new transports.Console(),
        new DiscordTransportStream({ webhookUrl: discordWebhookUrl, level: 'error' })
    ],
    exitOnError: false,
})

process.on('unhandledRejection', (error: any) => {
    logger.error('Unhandled promise rejection', { error: error.stack || error })
})

export default logger
