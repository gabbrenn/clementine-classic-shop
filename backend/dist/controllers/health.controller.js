"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.healthController = void 0;
exports.healthController = {
    check: async (req, res) => {
        res.json({
            success: true,
            message: 'Server is running',
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
        });
    },
};
