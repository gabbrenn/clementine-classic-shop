"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const logger_1 = require("./logger");
const prismaClientSingleton = () => {
    return new client_1.PrismaClient({
        log: [
            {
                emit: 'event',
                level: 'query',
            },
            {
                emit: 'event',
                level: 'error',
            },
            {
                emit: 'event',
                level: 'info',
            },
            {
                emit: 'event',
                level: 'warn',
            },
        ],
    });
};
const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();
if (process.env.NODE_ENV !== 'production') {
    globalThis.prismaGlobal = prisma;
}
// Log Prisma queries in development
if (process.env.NODE_ENV === 'development') {
    prisma.$on('query', (e) => {
        logger_1.logger.debug({ query: e.query, params: e.params }, 'Prisma Query');
    });
}
prisma.$on('error', (e) => {
    logger_1.logger.error({ target: e.target, message: e.message }, 'Prisma Error');
});
exports.default = prisma;
