import { sql } from './sql.js'
import { randomUUID } from 'node:crypto'

export class Database {

    async getVideos() {
        const videos = await sql`
            SELECT id, title, description, url, createdat, updatedat, inactivatedat
            FROM videos
            WHERE deletedat IS NULL
        `

        return videos
    }

    async getVideo(id) {
        const videos = await sql`
            SELECT id, title, description, url, createdat, updatedat, inactivatedat
            FROM videos
            WHERE id = ${id} AND deletedat IS NULL
        `

        return videos[0]
    }

    async createVideo({ title, description, url }) {
        const video = {
            id: randomUUID(),
            title,
            description,
            url,
            createdat: new Date().toISOString(),
            updatedat: new Date().toISOString(),
            inactivatedat: null,
            deletedat: null
        }

        await sql`
            INSERT INTO videos ${sql(video, 'id', 'title', 'description', 'url', 'createdat', 'updatedat', 'inactivatedat', 'deletedat')}
        `

        return video
    }

    async updateVideo(id, { title, description, url }) {
        const video = await this.getVideo(id)

        if (!video) {
            return null
        }

        const updatedVideo = {
            ...video,
            title,
            description,
            url,
            updatedat: new Date().toISOString()
        }

        await sql`
            UPDATE videos
            SET ${sql(updatedVideo, 'title', 'description', 'url', 'updatedat')}
            WHERE id = ${id} AND deletedat IS NULL
        `

        return updatedVideo
    }

    async deleteVideo(id) {
        const video = await this.getVideo(id)

        if (!video) {
            return null
        }

        const deletedVideo = {
            ...video,
            deletedat: new Date().toISOString()
        }

        await sql`
            UPDATE videos
            SET ${sql(deletedVideo, 'deletedat')}
            WHERE id = ${id}
        `

        return true
    }

    async inactivateVideo(id) {
        const video = await this.getVideo(id)

        if (!video) {
            return null
        }

        const inactivatedVideo = {
            ...video,
            inactivatedat: new Date().toISOString()
        }

        await sql`
            UPDATE videos
            SET ${sql(inactivatedVideo, 'inactivatedat')}
            WHERE id = ${id}
        `

        return inactivatedVideo
    }

    async activateVideo(id) {
        const video = await this.getVideo(id)

        if (!video) {
            return null
        }

        const activatedVideo = {
            ...video,
            inactivatedat: null
        }

        await sql`
            UPDATE videos
            SET ${sql(activatedVideo, 'inactivatedat')}
            WHERE id = ${id}
        `

        return activatedVideo
    }
}