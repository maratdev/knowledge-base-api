"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = require("./config");
const logger_1 = __importDefault(require("../utils/logger"));
const sequelize = new sequelize_1.Sequelize(config_1.config.db.name, config_1.config.db.user, config_1.config.db.password, {
    host: config_1.config.db.host,
    port: config_1.config.db.port,
    dialect: 'postgres',
    logging: (msg) => logger_1.default.debug(msg),
});
exports.default = sequelize;
