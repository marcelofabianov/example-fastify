import { randomUUID } from 'node:crypto'

export class Database {
    #videos = new Map()

    async getVideos(filters = {}) {
        const videos = Array.from(this.#videos.values())

        if (filters.inactivated === 'true') {
            return videos
        }

        return videos.filter(video => !video.inactivatedAt)
    }

    async getVideo(id) {
        return this.#videos.get(id)
    }

    async createVideo({ title, description, url }) {
        const video = {
            id: randomUUID(),
            title,
            description,
            url,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            inactivatedAt: null
        }

        this.#videos.set(video.id, video)

        return video
    }

    async updateVideo(id, { title, description, url }) {
        const video = this.#videos.get(id)

        if (!video) {
            return null
        }

        const updatedVideo = {
            ...video,
            title,
            description,
            url,
            updatedAt: new Date().toISOString()
        }

        this.#videos.set(id, updatedVideo)

        return updatedVideo
    }

    async deleteVideo(id) {
        const video = this.#videos.get(id)

        if (!video) {
            return null
        }

        const deletedVideo = {
            ...video,
            inactivatedAt: new Date().toISOString()
        }

        this.#videos.set(id, deletedVideo)

        return deletedVideo
    }

    async inactivateVideo(id) {
        const video = this.#videos.get(id)

        if (!video) {
            return null
        }

        const inactivatedVideo = {
            ...video,
            inactivatedAt: new Date().toISOString()
        }

        this.#videos.set(id, inactivatedVideo)

        return inactivatedVideo
    }

    async activateVideo(id) {
        const video = this.#videos.get(id)

        if (!video) {
            return null
        }

        const activatedVideo = {
            ...video,
            inactivatedAt: null
        }

        this.#videos.set(id, activatedVideo)

        return activatedVideo
    }
}