import { fastify } from 'fastify'
import { JsonResponse } from './json_response.js'
import { Database } from './database.js'

const server = fastify()
const body = new JsonResponse()
const database = new Database()

server.get('/', async (request, reply) => {
    return reply.send({})
})

server.get('/videos', async (request, reply) => {
    const videos = await database.getVideos()

    return reply.send(body.ok(videos));
})

server.get('/videos/:id', async (request, reply) => {
    const video = await database.getVideo(request.params.id)

    if (video) {
        return reply.send(body.ok(video))
    }

    return reply.status(404).send(body.notFound())
})

server.post('/videos', async (request, reply) => {
    const video = await database.createVideo(request.body)

    return reply.status(201).send(body.created(video))
})

server.put('/videos/:id', async (request, reply) => {
    const video = await database.updateVideo(request.params.id, request.body)

    return reply.send(body.ok(video))
})

server.delete('/videos/:id', async (request, reply) => {
    await database.deleteVideo(request.params.id)

    return reply.send(body.ok({}))
})

server.put('/videos/:id/activate', async (request, reply) => {
    const video = await database.activateVideo(request.params.id)

    return reply.send(body.ok(video))
})

server.put('/videos/:id/inactivate', async (request, reply) => {
    const video = await database.inactivateVideo(request.params.id)

    return reply.send(body.ok(video))
})

server.listen({ port: 3000 })
