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
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedAdmin = void 0;
const user_model_1 = require("../modules/users/user.model");
const adminData = {
    name: "hasan",
    username: "admin",
    email: "hasan@gmail.com",
    role: "Admin",
    password: "1111",
};
const seedAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ role: "Admin" });
    if (user) {
        return;
    }
    yield user_model_1.User.create(adminData);
});
exports.seedAdmin = seedAdmin;
