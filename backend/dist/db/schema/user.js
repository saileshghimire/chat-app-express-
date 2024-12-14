"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.users = (0, pg_core_1.pgTable)('user', {
    id: (0, pg_core_1.integer)(),
    firstName: (0, pg_core_1.varchar)('first_name'),
    middleName: (0, pg_core_1.varchar)('middle_name'),
    lastname: (0, pg_core_1.varchar)('last_name'),
    email: (0, pg_core_1.varchar)(),
    password: (0, pg_core_1.varchar)(),
    username: (0, pg_core_1.varchar)()
});
