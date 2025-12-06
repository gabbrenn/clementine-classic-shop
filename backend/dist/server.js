"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const logger_1 = require("./config/logger");
const logger_middleware_1 = require("./middleware/logger.middleware");
const error_middleware_1 = require("./middleware/error.middleware");
const routes_1 = __importDefault(require("./routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
const isProduction = process.env.NODE_ENV === 'production';
// Security Middleware
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true,
}));
// Rate Limiting
const limiter = (0, express_rate_limit_1.default)({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutes
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'),
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
});
app.use('/api', limiter);
// Body Parsing Middleware
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '10mb' }));
// Request Logging
app.use(logger_middleware_1.requestLogger);
// API Routes
app.use('/api', routes_1.default);
// Serve Next.js frontend in production
if (isProduction) {
    const frontendPath = path_1.default.join(__dirname, '../../frontend/.next/standalone');
    const frontendPublicPath = path_1.default.join(__dirname, '../../frontend/public');
    const frontendStaticPath = path_1.default.join(__dirname, '../../frontend/.next/static');
    // Serve static files
    app.use('/public', express_1.default.static(frontendPublicPath));
    app.use('/_next/static', express_1.default.static(frontendStaticPath));
    // Proxy all other requests to Next.js
    const { createServer } = require('http');
    const { parse } = require('url');
    const next = require('next');
    const nextApp = next({
        dev: false,
        dir: path_1.default.join(__dirname, '../../frontend'),
    });
    const handle = nextApp.getRequestHandler();
    nextApp.prepare().then(() => {
        app.get('*', (req, res) => {
            const parsedUrl = parse(req.url, true);
            handle(req, res, parsedUrl);
        });
    });
}
else {
    // Error Handling for development
    app.use(error_middleware_1.notFound);
    app.use(error_middleware_1.errorHandler);
}
app.listen(PORT, () => {
    logger_1.logger.info(`🚀 Server is running on port ${PORT}`);
    logger_1.logger.info(`📦 Environment: ${process.env.NODE_ENV || 'development'}`);
    logger_1.logger.info(`🔒 CORS enabled for: ${process.env.CORS_ORIGIN || 'http://localhost:3000'}`);
});
