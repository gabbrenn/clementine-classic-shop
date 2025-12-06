"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const health_routes_1 = __importDefault(require("./health.routes"));
const router = (0, express_1.Router)();
// API Routes
router.use('/health', health_routes_1.default);
// Add more routes here as they are created
// router.use('/auth', authRoutes);
// router.use('/products', productRoutes);
// router.use('/users', userRoutes);
// router.use('/orders', orderRoutes);
exports.default = router;
