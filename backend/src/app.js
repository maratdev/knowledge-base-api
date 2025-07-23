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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = require("./config/config");
const logger_1 = __importDefault(require("./utils/logger"));
const database_1 = __importDefault(require("./config/database"));
const routes_1 = __importDefault(require("./routes"));
const http_status_codes_1 = require("http-status-codes");
const error_handler_1 = require("./middlewares/error-handler");
const app = (0, express_1.default)();
const PORT = config_1.config.app.port || 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api', routes_1.default);
// Тестовый маршрут
app.get('/ping', (req, res) => {
    res.json({ message: 'pong' });
});
app.use((req, res) => {
    res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ message: 'Express route not found' });
});
app.use(error_handler_1.errorHandler);
process.on('unhandledRejection', (reason) => {
    logger_1.default.error('Unhandled Rejection:', reason);
    process.exit(1);
});
process.on('uncaughtException', (err) => {
    logger_1.default.error('Uncaught Exception:', err);
    process.exit(1);
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield database_1.default.authenticate();
        logger_1.default.info('Database connected successfully');
        app.listen(PORT, () => {
            logger_1.default.info(`Server is running on port ${PORT}`);
        });
    }
    catch (err) {
        logger_1.default.error('Unable to connect to the database');
        logger_1.default.error(err);
        process.exit(1);
    }
}))();
