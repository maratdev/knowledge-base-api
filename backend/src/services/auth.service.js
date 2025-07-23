"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const user_model_1 = require("../models/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AppError_1 = require("../middlewares/errors/AppError");
const config_1 = require("../config/config");
class AuthService {
    static register(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const existing = yield user_model_1.User.findOne({ where: { email } });
            if (existing) {
                throw new AppError_1.BadRequestError('User already exists');
            }
            const passwordHash = yield bcrypt_1.default.hash(password, 10);
            return yield user_model_1.User.create({ email, passwordHash });
        });
    }
    static login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.User.findOne({ where: { email } });
            if (!user) {
                throw new AppError_1.BadRequestError('Invalid credentials');
            }
            const valid = yield bcrypt_1.default.compare(password, user.passwordHash);
            if (!valid) {
                throw new AppError_1.BadRequestError('Invalid credentials');
            }
            const token = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email }, config_1.config.jwt.secret, { expiresIn: '1d' });
            return { token };
        });
    }
}
exports.AuthService = AuthService;
