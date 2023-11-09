import { fastify } from 'fastify'
import { DatabaseMemory } from './database_memory.js'
import { JsonResponse } from './json_response.js'

const server = fastify()
const database = new DatabaseMemory()
const body = new JsonResponse()

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

server.listen({ port: 3000 })
