import TransportStream from 'winston-transport'
import axios from 'axios'
import { LogEntry } from 'winston'
import FormData from 'form-data'

interface DiscordTransportOptions extends TransportStream.TransportStreamOptions {
    webhookUrl: string
}

class DiscordTransportStream extends TransportStream {
    private webhookUrl: string

    constructor(opts: DiscordTransportOptions) {
        super(opts)
        this.webhookUrl = opts.webhookUrl
    }

    async log(info: LogEntry, callback: () => void): Promise<void> {
        setImmediate(() => {
            this.emit('logged', info);
        });

        const { level, message, ...meta } = info;
        const content = this.formatMessage(level, message, meta);

        if (content.length <= 2000) {
            try {
                await axios.post(this.webhookUrl, { content });
            } catch (err) {
                console.error('Error sending log to Discord:', err)
            }
        } else {
            const truncatedContent = `${content.slice(0, 1995)}...`
            const fileName = `log-${Date.now()}.txt`

            const form = new FormData()
            form.append('content', truncatedContent)
            form.append('file', Buffer.from(content, 'utf-8'), {
                filename: fileName,
                contentType: 'text/plain',
            })

            try {
                await axios.post(this.webhookUrl, form, {
                    headers: form.getHeaders(),
                })
            } catch (err) {
                console.error('Error sending log to Discord with attachment:', err)
            }
        }

        callback()
    }

    private formatMessage(level: string, message: string, meta: Record<string, any>): string {
        let metaString = ''
        if (Object.keys(meta).length > 0) {
            metaString = '\n```json\n' + JSON.stringify(meta, null, 2) + '\n```'
        }
        return `**[${level.toUpperCase()}]**: ${message}${metaString}`
    }
}

export { DiscordTransportStream }
