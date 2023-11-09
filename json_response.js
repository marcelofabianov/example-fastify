export class JsonResponse {
    ok(data) {
        return {
            data,
            status: {
                code: 200,
                message: 'OK',
                success: true,
                timestamp: new Date().toISOString(),
            }
        }
    }

    created(data) {
        return {
            data,
            status: {
                code: 201,
                message: 'Created',
                success: true,
                timestamp: new Date().toISOString(),
            }
        }
    }

    accepted() {
        return {
            code: 202,
            message: 'Accepted',
            success: true,
            timestamp: new Date().toISOString(),
        }
    }

    noContent() {
        return {
            code: 204,
            message: 'No Content',
            success: true,
            timestamp: new Date().toISOString(),
        }
    }

    badRequest() {
        return {
            code: 400,
            message: 'Bad Request',
            success: false,
            timestamp: new Date().toISOString(),
        }
    }

    unauthorized() {
        return {
            code: 401,
            message: 'Unauthorized',
            success: false,
            timestamp: new Date().toISOString(),
        }
    }

    forbidden() {
        return {
            code: 403,
            message: 'Forbidden',
            success: false,
            timestamp: new Date().toISOString(),
        }
    }

    notFound() {
        return {
            code: 404,
            message: 'Not Found',
            success: false,
            timestamp: new Date().toISOString(),
        }
    }

    internalServerError() {
        return {
            code: 500,
            message: 'Internal Server Error',
            success: false,
            timestamp: new Date().toISOString(),
        }
    }
}