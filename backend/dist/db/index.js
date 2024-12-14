"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const postgres_1 = __importDefault(require("postgres"));
const postgres_js_1 = require("drizzle-orm/postgres-js");
const secret_1 = require("../secret");
const sql = (0, postgres_1.default)(secret_1.DB_URL);
exports.db = (0, postgres_js_1.drizzle)(sql);
