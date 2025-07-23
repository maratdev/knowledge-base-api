"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthSchema = void 0;
const zod_1 = require("zod");
exports.AuthSchema = zod_1.z.object({
    email: zod_1.z.string().nonempty('Email is required').email(),
    password: zod_1.z.string().min(6, 'Password must be at least 6 characters')
});
